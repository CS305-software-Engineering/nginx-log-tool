import psutil
import sys
sys.path.append('LogTool/')
import random
from utility.threads import threaded

class nginxCollectionAgent():
    def __init__(self):
        self.data={}
        self.collectorFunctions=[ 
            self.cpuUsage,
            self.cpuCount
        ]
    @threaded
    def connectionsAccepted(self):
        self.data['connectionsAccepted']=psutil.cpu_percent(1)
    #number of connections accepted till this time.     

    @threaded
    def connectionsDropped(self):
        self.data['connectionsDropped']=psutil.cpu_count()
        return
     #number of connections dropped till this time.     

    @threaded
    def activeConnections(self):
        self.data['connectionsActive']=random.randint(0,100)
        return
    # number of active connections right now
    
    @threaded
    def currentConnections(self):
        self.data['currentConnections']=random.randint(0, 100)

    # number of connections right now

    @threaded
    def idleConnections(self):
        self.data['idleConnections']=random.randint(0, 100)
        return

    # number of idle connections right now 

    @threaded
    def requestCount(self):
         self.data['requestCount']=random.randint(0, 100)

    # number of requests that have been sent till now. 


    @threaded
    def currentRequests(self):
         self.data['currentRequests']=random.randint(0, 100)

    # number of currently active requests that are  reading and writing.     

    @threaded
    def readingRequests(self):
         self.data['readingRequests']=random.randint(0, 100)

    # number of currently active reading headers requests .     
    @threaded
    def writingRequests(self):
         self.data['writingRequests']=random.randint(0, 100)

    # number of currently active writing requests to clients.    

    @threaded
    def malformedRequets(self):
         self.data['malformedRequets']=random.randint(0, 100)

    #number of malformed requests till now. 

    @threaded
    def malformedRequets (self):
         self.data['']=random.randint(0, 100)

    @threaded
    def bodyBitesSent(self):
         self.data['bodyBitesSent']=random.randint(0, 100)

    # number of bytes sent to the client without counting the response headers. 

    


    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()
        print('threads completed')

