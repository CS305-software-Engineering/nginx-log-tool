import psutil
import sys
sys.path.append('LogTool/')
from utility.threads import threaded

class systemCollectionAgent():
    def __init__(self):
        self.data={}
        self.collectorFunctions=[ 
            self.cpuUsage,
            self.cpuCount
        ]
    @threaded
    def cpuUsage(self):
        self.data['cpuPercent']=psutil.cpu_percent(1)
        print('a')

    @threaded
    def cpuCount(self):
        self.data['cpuCount']=psutil.cpu_count()
        print('b')
    
    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()
        print('threads completed')

# print(a.cpuCount())