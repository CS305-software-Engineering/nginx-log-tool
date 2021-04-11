import sys
import time
sys.path.append('src/collector')
from utility.threads import threaded
from collectionAgent.nginx.nginxCollectionAgent import  nginxCollectionAgent
from collectionAgent.system.systemCollectionAgent import systemCollectionAgent
import persistqueue
import requests

class dataProcessor():
    def __init__(self):
        self.nginxCollector=nginxCollectionAgent()
        self.systemCollector=systemCollectionAgent()
        self.maxReqSize=1000
        self.getDataFinished=True
    
    def addData(self):
        data={
            'osStaticMetrics':self.nginxCollector.setData(),
            'nginxStaticMetrics':self.systemCollector.setData()
        }
        queue=persistqueue.FIFOSQLiteQueue('src/collector/dataProcessor/database', auto_commit=True)
        queue.put(data)
    
    @threaded
    def getData(self):
        self.getDataFinished=False
        queue=persistqueue.FIFOSQLiteQueue('src/collector/dataProcessor/database', auto_commit=True)
        while(queue.size>0):
            data=[]
            cnt=0
            while(queue.size>0 and cnt<self.maxReqSize):
                data.append(queue.get())
                cnt+=1
            
        #API call
        data=requests.post('http://nginx-log-tool-api.herokuapp.com/agent/static',json=data, headers={
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQG1haWwuY29tIiwiYWdlbnRJZCI6ImNvb2xfbWFjaGluZSIsImlhdCI6MTYxODA1MTg0NX0.AiuHhs8G4RD-hZLDxdH7xlCDDUbdnXKYNVSGZeZQEsI'
        })
        print(data.text)
        self.getDataFinished=True
        data1=requests.get('http://127.0.0.1/nginx_status');
        print(data1.text)



if __name__ == "__main__":
    processor=dataProcessor()
    ## Initial run
    while(1):
        processor.addData()
        if(processor.getDataFinished==True):
            processor.getData()  
        print("witing")   
        time.sleep(1)
    


    


    
    
    
    
    