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
import time
load_dotenv(verbose=True)
env_path =Path('../') / '.env'
load_dotenv(dotenv_path=env_path)

class dataProcessor():
    """Constructor"""
    def __init__(self):
        self.nginxCollector=nginxCollectionAgent() # Nginx Collection Agent Instance
        self.systemCollector=systemCollectionAgent() # System Collection Agent Instance
        self.maxReqSize=1000 # Maximum permissible metric sets to be sent in a single request
        self.getDataFinished=True # Whether a getData instance is running or not
    
    """Add data into the data queue"""
    def addData(self):
        
        data={
            'timestamp':time.time()*1000, ## unix timestamp format as to when metric was calculated
            'nginxDynamicMetrics':self.nginxCollector.setData(), # Nginx Dynamic Metric object collected
            'osDynamicMetrics':self.systemCollector.setData() # System Dynamic Metric object collected
        }
        queue=persistqueue.FIFOSQLiteQueue('src/collector/dataProcessor/database', auto_commit=True)# accessing the queue. 
        queue.put(data) # putting the data into the persist queue. 
    
    """Get Data from data queue"""
    @threaded
    def getData(self):
        self.getDataFinished=False
        queue=persistqueue.FIFOSQLiteQueue('src/collector/dataProcessor/database', auto_commit=True)
        # here the chunks of number of requests are sent to the database. 
        while(queue.size>0):
            data=[]
            cnt=0
            while(queue.size>0 and cnt<self.maxReqSize): #while queue is not empty and request size has not exceeded
                data.append(queue.get())
                cnt+=1
        
        
        #API call
        try:
            response=requests.post('http://nginx-log-tool.herokuapp.com/aapi/agent/dyn',json=data, headers={
                'Authorization':'Bearer '+os.environ.get("TOKEN") # access_token obtained via API_KEY
            }) 
            print(response.text)
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
        time.sleep(60)
    


    

    
    
    