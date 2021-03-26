import sys
sys.path.append('LogTool/')
import collectionAgent.system.systemCollectionAgent as systemCollector
import time
import csv

class dataSaver():
        def __init__(self):
            self.collector=systemCollector()
        
        def addData(self, lock):
            lock.acquire()
            storage=open('LogTool/localStorage/storage.csv', 'a')
            writer=csv.writer(storage)
            writer.writerow(self.collector.data.values())
            storage.close()
            lock.release()



