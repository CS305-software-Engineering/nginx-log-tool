import psutil

class systemCollectionAgent():
    def __init__(self):
        self.data={}
    def cpuUsage():
        x=psutil.Process()
        return (x.cpu_percent())       
    
a=systemCollectionAgent
print(a.cpuUsage())