import sys
import threading
sys.path.append('LogTool/')
from utility.threads import threaded
import csv



class dataSender():
    def __init__(self):
        self.postRequestBuffer=[]
    
    @threaded
    def getData(self,lock):
        lock.acquire()
        storage=open('LogTool/localStorage/storage.csv', 'r')
        reader=csv.reader(storage,delimiter=',')
        for row in reader:
            print(row)
            self.postRequestBuffer.append(row)
        storage.close()
        storage=open('LogTool/localStorage/storage.csv', 'w')
        # writer=csv.writer(storage)
        # writer.writerow('')
        storage.write('')
        storage.close()
        lock.release()

        #make API calls. 
        
a=dataSender()
a.getData()
print(a.postRequestBuffer)