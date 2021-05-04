import os
from datetime import datetime
import threading
import time

class loggerClass: 
    def __init__(self, filePath): 
        self.logFilePath=filePath
        self.rw_lock=threading.Lock()
    def log(self,log): 
        file=open(self.logFilePath, 'a')
        while self.rw_lock.locked():
            time.sleep(0.1)
            continue
        self.rw_lock.acquire()
        file.write(str(datetime.now())+' : '+log+ '\n')
        file.close()
        self.rw_lock.release()
        return

logger=loggerClass('../logs/logs.txt')


        