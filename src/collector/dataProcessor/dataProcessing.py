from pathlib import Path
import time
import sys
sys.path.insert(0,'../')
from collectionAgent.nginx.nginxCollectionAgent import nginxCollectionAgent
from collectionAgent.system.systemCollectionAgent import systemCollectionAgent
import threading
import os
from dotenv import load_dotenv
import requests
import persistqueue
from utility.logger import logger
import json
load_dotenv(verbose=True)
env_path = Path('../') / '.env'
load_dotenv(dotenv_path=env_path)
import random
def threaded(fn):
    def wrapper(*args, **kwargs):
        thread = threading.Thread(target=fn, args=args, kwargs=kwargs)
        thread.start()
        return thread
    return wrapper

def testData():
    nginxmetrics=["httpStatus1xx",
    "httpStatus2xx",
    "httpStatus3xx",
    "httpStatus4xx",
    "httpStatus5xx",
    "httpStatus403",
    "httpStatus404",
    "httpStatus500,",
    "httpStatus502",
    "httpStatus503",
    "httpStatus504",
    "protocolHttp_v1_0",
    "protocolHttp_v0_9",
    "protocolHttp_v1_1",
    "protocolHttp_v2",
    "getMethods",
    "headMethods",
    "postMethods",
    "putMethods",
    "deleteMethods",
    "optionsMethods",
    "connectionAccepted",
    "connectionsDropped",
    "activeConnections",
    "currentConnections",
    "memoryRss",
    "memoryVms",
    "memoryRss_pct",
    "workersCount",
    "workersFdsCount",
    "IoKiloBytesRead",
    "IoKiloBytesWrite"]
    osmetrics=[
   "userCPU",
   "systemCPU",
   "idleCPU",
    "rss",
    "vms"
    "virtualMemoryTotal",
    "virtualMemoryUsed",
    "virtualMemoryAll",
    "virtualMemoryCached",
    "virtualMemoryBuffers",
    "virtualMemoryFree",
    "virtualMemoryPercent",
    "virtualMemoryAvailable",
    "totalSwapMemory",
    "usedSwapMemory",
    "freeSwapMemory",
    "percentFreeSwapMemory"];
    nginx={}
    os={}
    for metric in nginxmetrics: 
        nginx[metric]=random.randint(0,50)
    for metric in nginxmetrics: 
        os[metric]=random.randint(0,50)
    
    return nginx, os

class dataProcessor():
    """Constructor"""
    def __init__(self):
        self.nginxCollector = nginxCollectionAgent()
        self.systemCollector = systemCollectionAgent()
        self.maxReqSize = 1000
        self.getDataFinished = True

    def addData(self): # this is the function which is adding the data to the persist queue. 
        # nginxStatus=os.popen('systemctl is-active nginx').read()
        temp1, temp2=testData()
        for i in temp1:
            temp1[i]={
                'value':temp1[i]
            }
        for j in temp2:
            temp2[j]={
                'value':temp2[j]
            }
        

        data = {
                'timestamp': time.time()*1000,
                'nginxDynamicMetrics': temp1,
                'osDynamicMetrics': temp2
        }
        
            # accessing the queue.
        queue = persistqueue.FIFOSQLiteQueue(
            './database', auto_commit=True) # invoking the queue. 
        queue.put(data)  # putting the data into the persist queue
       
    @threaded
    def getData(self):
        self.getDataFinished = False
        queue = persistqueue.FIFOSQLiteQueue(
            './database', auto_commit=True)
        # here the chunks of number of requests are sent to the database.
        data = []
        while(queue.size > 0):
            cnt = 0
            while(queue.size > 0 and cnt < self.maxReqSize):
                data.append(queue.get())
                cnt += 1
        # API call
        sent=False
        try:
            response = requests.post('https://nginx-log-tool.herokuapp.com/aapi/agent/dyn/', json={'data':data}, headers={
                'Authorization': 'Bearer '+os.environ.get("TOKEN")
            }) # this is  the posting api call to the backend. 
            
            response=json.loads(response.text)
            
            if(response['error']=="False"):
                logger.log("Successfully sent the data")
                sent=True
            else: 
                logger.log(response["message"])

        except:
            logger.log("api failed")

        if(sent==False): 
            for i in data:
                queue.put(i)
                
        self.getDataFinished = True

def main():
        processor = dataProcessor()
        # Initial run
        while(1):
            processor.addData()
            if(processor.getDataFinished == True):
                processor.getData()
            time.sleep(60)
main()