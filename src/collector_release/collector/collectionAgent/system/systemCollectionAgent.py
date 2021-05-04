from  psutil import Process
import psutil
import sys
import os
sys.path.insert(0,'../../')
from utility.threads import threaded
from utility.logger import logger
class systemCollectionAgent():
    def __init__(self):
        self.data={}
        self.collectorFunctions=[ 
            self.agentMemoryInfo,
            self.virtualMemory,
            self.cpu,
            self.swap
        ]
        self.process=Process(os.getpid())
        self.val=1024*1024
    @threaded
    def agentMemoryInfo(self):
        """
        agent memory info   
        controller.agent.mem.rss
        controller.agent.mem.vms
        """
        mem_info = self.process.memory_info()
        self.data['rss']=mem_info.rss/self.val
        self.data['vms']=mem_info.vms/self.val
    
    @threaded
    def virtualMemory(self):
        """ virtual memory """
        virtual_memory = psutil.virtual_memory()
        self.data['virtualMemoryTotal']=virtual_memory.total/self.val
        self.data['virtualMemoryUsed']=(virtual_memory.total - virtual_memory.available)/self.val
        self.data['virtualMemoryAll']=virtual_memory.used/self.val
        self.data['virtualMemoryCached']=virtual_memory.cached/self.val
        self.data['virtualMemoryBuffers']=virtual_memory.buffers/self.val
        self.data['virtualMemoryFree']=virtual_memory.free/self.val
        self.data['virtualMemoryPercent']=virtual_memory.percent
        self.data['virtualMemoryAvailable']=virtual_memory.available/self.val


    @threaded
    def cpu(self):
        """ cpu """
        try:
            cpuTimes = psutil.cpu_times_percent(1)
            self.data['userCPU']=(cpuTimes.user + cpuTimes.nice)
            self.data['systemCPU']=cpuTimes.system + cpuTimes.irq + cpuTimes.softirq
            self.data['idleCPU']=cpuTimes.idle
        except:
            logger.log("error accessing cpu percent")
        return  

        
    @threaded
    def swap(self):
        """ swap memory details """
        try:
            swapMemory = psutil.swap_memory()
            self.data['totalSwapMemory']=swapMemory.total/self.val
            self.data['usedSwapMemory']=swapMemory.used/self.val
            self.data['freeSwapMemory']=swapMemory.free/self.val
            self.data['percentFreeSwapMemory']=swapMemory.percent
        except:
            logger.log("error getting swap memory details")
            
        return
        
    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()
        return self.data

        