import sys
import time
sys.path.append('src/collector')
from utility.threads import threaded
from collectionAgent.nginx.nginxCollectionAgent import  nginxCollectionAgent
from collectionAgent.system.systemCollectionAgent import systemCollectionAgent
import persistqueue
import requests
from dotenv import load_dotenv
import os
from pathlib import Path
from pathlib import Path
import time
load_dotenv(verbose=True)
env_path =Path('../') / '.env'
load_dotenv(dotenv_path=env_path)

class dataProcessor():
    def __init__(self):
        self.nginxCollector=nginxCollectionAgent()
        self.systemCollector=systemCollectionAgent()
        self.maxReqSize=1000
        self.getDataFinished=True
    
    def addData(self):
        data={
            'timestamp':time.time(),
            'nginxDynamicMetrics':self.nginxCollector.setData(),
            'osDynamicMetrics':self.systemCollector.setData()
        }
        queue=persistqueue.FIFOSQLiteQueue('src/collector/dataProcessor/database', auto_commit=True)# accessing the queue. 
        queue.put(data) # putting the data into the persist queue. 
    
    @threaded
    def getData(self):
        self.getDataFinished=False
        queue=persistqueue.FIFOSQLiteQueue('src/collector/dataProcessor/database', auto_commit=True)
        # here the chunks of number of requests are sent to the database. 
        while(queue.size>0):
            data=[]
            cnt=0
            while(queue.size>0 and cnt<self.maxReqSize):
                data.append(queue.get())
                cnt+=1
        
        
        #API call
        try:
            response=requests.post('http://nginx-log-tool.herokuapp.com/aapi/agent/dyn',json=data, headers={
                'Authorization':'Bearer '+os.environ.get("TOKEN")
            }) 
            print(data[0])
        except:
            print('request failed')
            for i in data:
                queue.put(i)
        self.getDataFinished=True

if __name__ == "__main__":
    processor=dataProcessor()
    ## Initial run
    while(1):
        processor.addData()
        if(processor.getDataFinished==True):
            processor.getData()  
        time.sleep(10)
    


    


    
    
    
    
    