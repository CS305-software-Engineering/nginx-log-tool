from os import access
import sys
sys.path.append('src/collector')
from utility.threads import threaded
import requests
import random
import re
import pickle
from file_read_backwards import FileReadBackwards
from datetime import datetime 
# these are the imports needed 
class nginxCollectionAgent:
    """Constructor"""
    def __init__(self):
        self.data={} # the data dictionary storing all values. 
       
        self.collectorFunctions=[ 
            self.getHttpConnectionsMetrics, # for stub status metrics
            self.getAccessLogs # for 
        ]  # the functions which will be used to extract data
        self.meta={
            'stubStatusUrl':'http://127.0.0.1/nginx_status',
            'accessLogPath':'/var/log/nginx/access.log',
            'storePath':'src/collector/collectionAgent/store.pkl'
        } # variables to store important paths and urls as meta deta. 
        latestMetrics={
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
        } # this is the initial state of data that will be stored , and this is updated as we parse the logs. 
        store=open(self.meta['storePath'],'wb') # this is persistent data store, to store variables which need to be seen even after server stops. 
        pickle.dump(latestMetrics,store) # storing the data in the store. 
        store.close()
        
    """Get Stub Status Metrics"""
    @threaded
    def getHttpConnectionsMetrics(self):
        try:
            stubData=requests.get(self.meta['stubStatusUrl'])
            try: 
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
        with FileReadBackwards(self.meta['accessLogPath'],encoding='utf-8') as f: # reading the file backwards till the lines which are generated in the last one minute. 
            for line in f:
                accessLogData={}
                for value in line.split('?'):
                    pair=value.split('*')
                    accessLogData[pair[0].strip()]=pair[1]
                # we parse the access, 

                #Converting time to unix timestamp format
                timestamp=datetime.strptime(accessLogData['time_local'],'%d/%b/%Y:%H:%M:%S %z').timestamp()
                
                if timestamp<latestMetrics['timeStamp']: ## Reading till last read log
                    break
                accessLogsList.append(accessLogData)
        self.extractMetrics(accessLogsList,latestMetrics)
    """Extract metrics and add to metric data object"""
    def extractMetrics(self, accessLogList,latestMetrics):
        for logs in accessLogList:
            methodString=logs['http_method'].lower()+'Methods' #http_method count metric update
            latestMetrics[methodString]+=1
            statusXString='httpStatus'+logs['status'][0]+'xx' # http_count metric data
            latestMetrics[statusXString]+=1
            if logs['status']=='403' or logs['status']=='404' or logs['status']=='500' or logs['status']=='502' or logs['status']=='503' or logs['status']=='504':
                statusString='httpStatus'+logs['status'] # http_Status count
                latestMetrics[statusString]+=1
            if logs['status']=='499':
                latestMetrics['httpStatusDiscarded']+=1
            ########## Protocol Version
            protocolData=logs['protocol'].split('/')
            if protocolData[1]=='1.1':
                latestMetrics['protocolHttp_v1_0']+=1
            elif protocolData[1]=='1.0':
                latestMetrics['protocolHttp_v0_9']+=1
            elif protocolData[1]=='0.9':
                latestMetrics['protocolHttp_v1_1']+=1
            elif protocolData[1]=='2':
                latestMetrics['protocolHttp_v2']+=1
        for key in latestMetrics:
            self.data[key]=latestMetrics[key]
    
    # @threaded
    # def getNginxWorkersMetrics(self):



    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()## joining all the threads to wait for completion
        print('threads completed')
        
        return self.data

agent=nginxCollectionAgent()
# print(agent.setData())

