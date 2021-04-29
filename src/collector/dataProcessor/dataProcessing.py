from pathlib import Path
import time
import sys
sys.path.append('../')
from collectionAgent.nginx.nginxCollectionAgent import nginxCollectionAgent
from collectionAgent.system.systemCollectionAgent import systemCollectionAgent
import threading
import os
from dotenv import load_dotenv
import requests
import persistqueue

load_dotenv(verbose=True)
env_path = Path('../') / '.env'
load_dotenv(dotenv_path=env_path)

def threaded(fn):
    def wrapper(*args, **kwargs):
        thread = threading.Thread(target=fn, args=args, kwargs=kwargs)
        thread.start()
        return thread
    return wrapper


class dataProcessor():
    """Constructor"""
    def __init__(self):
        self.nginxCollector = nginxCollectionAgent()
        self.systemCollector = systemCollectionAgent()
        self.maxReqSize = 1000
        self.getDataFinished = True

    def addData(self): # this is the function which is adding the data to the persist queue. 
        temp1=self.nginxCollector.setData()
        temp2=self.systemCollector.setData()
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
            'dataProcessor/database', auto_commit=True) # invoking the queue. 
        queue.put(data)  # putting the data into the persist queue.

    @threaded
    def getData(self):
        self.getDataFinished = False
        queue = persistqueue.FIFOSQLiteQueue(
            'dataProcessor/database', auto_commit=True)
        # here the chunks of number of requests are sent to the database.
        while(queue.size > 0):
            data = []
            cnt = 0
            while(queue.size > 0 and cnt < self.maxReqSize):
                data.append(queue.get())
                cnt += 1

        # API call
        try:
            response = requests.post('http://nginx-log-tool.herokuapp.com/aapi/agent/dyn', json={'data':data}, headers={
                'Authorization': 'Bearer '+os.environ.get("TOKEN")
            }) # this is  the posting api call to the backend. 
            print(data[0])
            print(response.text)
        except:
            print('request failed')
            for i in data:
                queue.put(i)
        self.getDataFinished = True

if __name__ == "__main__":
    processor = dataProcessor()
    # Initial run
    while(1):
        processor.addData()
        if(processor.getDataFinished == True):
            processor.getData()
        time.sleep(60)
