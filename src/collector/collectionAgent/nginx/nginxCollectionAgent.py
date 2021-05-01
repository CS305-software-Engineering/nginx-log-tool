import os
import sys
sys.path.append('../../')
print(sys.path)
from utility.threads import threaded
import requests
import random
import re
import pickle
from file_read_backwards import FileReadBackwards
from datetime import datetime
import time
import psutil
# these are the imports needed 
class nginxCollectionAgent:
    """Constructor"""
    def __init__(self):
        self.data={
            'timeStamp':0.0,
            'getMethods':0,
            'headMethods':0,
            'postMethods':0,
            'putMethods':0,
            'deleteMethods':0,
            'optionsMethods':0,
            'httpStatus1xx':0,
            'httpStatus2xx':0,
            'httpStatus3xx':0,
            'httpStatus4xx':0,
            'httpStatus5xx':0,
            'httpStatus403':0,
            'httpStatus404':0,
            'httpStatus500,':0,
            'httpStatus502':0,
            'httpStatus503':0,
            'httpStatus504':0,
            'httpStatusDiscarded':0,
            'protocolHttp_v1_0':0,
            'protocolHttp_v0_9':0,
            'protocolHttp_v1_1':0,
            'protocolHttp_v2':0,
            "connectionAccepted":0,
            "connectionsDropped":0,
            "activeConnections":0,
            "currentConnections":0,
            'idleConnections': 0, 
            'requestCount': 0, 
            'currentRequest': 0, 
            'readingRequests': 0, 
            'writingRequests':0, 
            
        }
        self.collectorFunctions=[ 
            self.getHttpConnectionsMetrics, # for stub status metrics
            self.getAccessLogs # for 
        ]  # the functions which will be used to extract data
        self.meta={
            'stubStatusUrl':'http://127.0.0.1/nginx_status',
            'accessLogPath':'/var/log/nginx/access.log',
            'storePath':'../store.pkl'
        }
        
 # this is the initial state of data that will be stored , and this is updated as we parse the logs. 
        store=open(self.meta['storePath'],'wb') # this is persistent data store, to store variables which need to be seen even after server stops. 
        pickle.dump(self.data,store) # storing the data in the store. 
        store.close()
        self.zombies=[]
        
    """Get Stub Status Metrics"""

    @threaded
    def getHttpConnectionsMetrics(self):
        try:
            stubData=requests.get(self.meta['stubStatusUrl'])
            try: 
                store=open(self.meta['storePath'], 'rb') #reading the previous persistently stored variable.  
                latestMetrics=pickle.load(store)
                stubStatusRegex = re.compile(r'^Active connections: (?P<connections>\d+)\s+[\w ]+\n'
                        r'\s+(?P<accepts>\d+)'
                        r'\s+(?P<handled>\d+)'
                        r'\s+(?P<requests>\d+)'
                        r'\s+Reading:\s+(?P<reading>\d+)'
                        r'\s+Writing:\s+(?P<writing>\d+)'
                        r'\s+Waiting:\s+(?P<waiting>\d+)') # regex for parsing the stubStatusText. 
                     
                stubMatchings=stubStatusRegex.match(stubData.text) # returns the matchings. 
                httpMetrics={}
                
                for metric in ['connections', 'accepts', 'handled', 'requests', 'reading', 'writing', 'waiting']:
                    httpMetrics[metric] = int(stubMatchings.group(metric))
                
                self.data['connectionAccepted'] = httpMetrics['accepts'] #number of connections accepted till this time.
                self.data['connectionsDropped'] = httpMetrics['accepts']-httpMetrics['handled']# number of connections dropped till this time.
                self.data['activeConnections'] = httpMetrics['connections']-httpMetrics['waiting']# number of active connections right now
                self.data['currentConnections'] = httpMetrics['connections']# number of connections right now
                self.data['idleConnections'] = httpMetrics['waiting']# number of idle connections right now 
                self.data['requestCount'] = httpMetrics['requests']# number of requests that have been sent till now. 
                self.data['currentRequest'] = httpMetrics['reading'] + httpMetrics['writing']# number of currently active requests that are  reading and writing.
                self.data['readingRequests'] = httpMetrics['reading']# number of currently active reading headers requests .
                self.data['writingRequests'] = httpMetrics['writing']# number of currently active writing requests to clients. 
                
            except:
                print('Unable to parse stubStatusText')
        except:
            print("Stub Data not received")
            return 
    """this function will find out the access logs.""" 
    @threaded
    def getAccessLogs(self):
        accessLogsList=[]
        store=open(self.meta['storePath'], 'rb') #reading the previous persistently stored variable.  
        latestMetrics=pickle.load(store)
        store.close()
        new_time_stamp=latestMetrics['timeStamp']
        isset=False
        with FileReadBackwards(self.meta['accessLogPath'],encoding='utf-8') as f: # reading the file backwards till the lines which are generated in the last one minute. 
            for line in f:

                accessLogData={}
                for value in line.split('?'):
                    pair=value.split('*')
                    accessLogData[pair[0].strip()]=pair[1]
                # we parse the access, 

                #Converting time to unix timestamp format
                timestamp=datetime.strptime(accessLogData['time_local'],'%d/%b/%Y:%H:%M:%S %z').timestamp()
                if not isset:
                    new_time_stamp=timestamp
                    isset=True
                if timestamp<=latestMetrics['timeStamp']: ## Reading till last read log
                    break
                accessLogsList.append(accessLogData)
            print('Length ',len(accessLogsList))
            print(latestMetrics['timeStamp'])
        self.extractMetrics(accessLogsList,new_time_stamp)

    """Extract metrics and add to metric data object"""
    def extractMetrics(self, accessLogList,timestamp):
        setup={
            'timeStamp':timestamp,
            'getMethods':0,
            'headMethods':0,
            'postMethods':0,
            'putMethods':0,
            'deleteMethods':0,
            'optionsMethods':0,
            'httpStatus1xx':0,
            'httpStatus2xx':0,
            'httpStatus3xx':0,
            'httpStatus4xx':0,
            'httpStatus5xx':0,
            'httpStatus403':0,
            'httpStatus404':0,
            'httpStatus500,':0,
            'httpStatus502':0,
            'httpStatus503':0,
            'httpStatus504':0,
            'httpStatusDiscarded':0,
            'protocolHttp_v1_0':0,
            'protocolHttp_v0_9':0,
            'protocolHttp_v1_1':0,
            'protocolHttp_v2':0,
        }
        for logs in accessLogList:
            methodString=logs['http_method'].lower()+'Methods' #http_method count metric update
            # print(methodString)  
            setup[methodString]+=1
            statusXString='httpStatus'+logs['status'][0]+'xx' # http_count metric data
            setup[statusXString]+=1
            if logs['status']=='403' or logs['status']=='404' or logs['status']=='500' or logs['status']=='502' or logs['status']=='503' or logs['status']=='504':
                statusString='httpStatus'+logs['status'] # http_Status count
                setup[statusString]+=1
            if logs['status']=='499':
                setup['httpStatusDiscarded']+=1
            ########## Protocol Version
            protocolData=logs['protocol'].split('/')
            if protocolData[1]=='1.1':
                setup['protocolHttp_v1_0']+=1
            elif protocolData[1]=='1.0':
                setup['protocolHttp_v0_9']+=1
            elif protocolData[1]=='0.9':
                setup['protocolHttp_v1_1']+=1
            elif protocolData[1]=='2':
                setup['protocolHttp_v2']+=1
            
        for key in setup:
            self.data[key]=setup[key]

            
    def setWorkers(self):
        store=open(self.meta['storePath'], 'rb') #reading the previous persistently stored variable.  
        latestMetrics=pickle.load(store)
        store.close()
        stream=os.popen("ps xao pid,ppid,command | grep 'nginx[:]'")# command to find out the processes of nginx.
        data=stream.read()
        data=data.split('\n') 
        processes=[]
        zombies=[]
        for line in data:
            grp=re.match(r'\s*(?P<pid>\d+)\s+(?P<parent_pid>\d+)\s+(?P<command>.+)\s*', line)
            if not grp:
                continue
            pid,parent_pid,command=int(grp.group('pid')),int(grp.group('parent_pid')),grp.group('command')
            processes.append(psutil.Process(pid))
            
        """
        memory info

        nginx.workers.mem.rss
        nginx.workers.mem.vms
        nginx.workers.mem.rss_pct
        """
        rss, vms, pct = 0, 0, 0.0
        for p in processes:
            if p.pid in zombies:
                continue
            try:
                mem_info = p.memory_info()
                rss += mem_info.rss
                vms += mem_info.vms
                pct += p.memory_percent()
            except psutil.ZombieProcess:
                self.zombies.append(p.pid)

        self.data['memory.rss']=rss
        self.data['memory.vms']=vms
        self.data['memory.rss_pct']=pct
        self.data['workersCount']=len(processes)

        """nginx.workers.fds_count"""
        fds = 0
        for p in processes:
            if p.pid in self.zombies:
                continue
            try:
                fds += p.num_fds()
            except psutil.ZombieProcess:
                self.handle_zombie(p.pid)
        self.data['workers.fds_count']=fds

        """
        io

        nginx.workers.io.kbs_r
        nginx.workers.io.kbs_w
        """
        # collect raw data
        read, write = 0, 0
        for p in self.processes:
            if p.pid in self.zombies:
                continue
            try:
                io = p.io_counters()
                read += io.read_bytes
                write += io.write_bytes
            except psutil.ZombieProcess:
                self.handle_zombie(p.pid)

        # kilobytes!
        read /= 1024
        write /= 1024

        # get deltas and store metrics
        metric_data={'io.kiloBytesRead': read, 'io.kiloBytesWritten': write}
        for metric_name in metric_data:
            value=metric_data[metric_name]
            value_delta = value - latestMetrics[metric_name]
            self.data['metric_name']= value_delta

    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()## joining all the threads to wait for completion
        print('threads completed')
        store=open(self.meta['storePath'],'wb') # this is persistent data store, to store variables which need to be seen even after server stops. 
        pickle.dump(self.data,store) # storing the latest data in the store. 
        store.close()
        return self.data
        
agent=nginxCollectionAgent()
print(agent.setWorkers())

