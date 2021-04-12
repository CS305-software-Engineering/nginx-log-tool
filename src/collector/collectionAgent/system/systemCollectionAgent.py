import psutil
import sys
sys.path.append('src/collector')
from utility.threads import threaded

class systemCollectionAgent():
    def __init__(self):
        self.data={}
        self.collectorFunctions=[ 
            self.cpuUsage
        ]
    @threaded
    def cpuUsage(self):
        self.data['cpuPercent']=psutil.cpu_percent(1)
        

    @threaded
    def cpuCount(self):
        self.data['cpuCount']=psutil.cpu_count()
        
    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()
       
        return self.data
# print(a.cpuCount())