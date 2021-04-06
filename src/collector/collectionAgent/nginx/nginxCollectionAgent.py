import psutil
import sys
sys.path.append('LogTool/')
from utility.threads import threaded
import random
class nginxCollectionAgent():
    def _init_(self):
        self.data={}
        self.collectorFunctions=[ 
            ############### HTTP Methods
            '''Statistics about observed request methods.'''
            self.methodGet,
            self.methodHead,
            self.methodPost,
            self.methodPut,
            self.methodDelete,
            self.methodOptions,
            ############### HTTP Status Codes
            '''Number of requests with HTTP status codes per class.'''
            self.status1xx,
            self.status2xx,
            self.status3xx,
            self.status4xx,
            self.status5xx,
            '''Number of requests with specific HTTP status codes above.'''
            self.status403,
            self.status404,
            self.status500,
            self.status502,
            self.status503,
            self.status504,
            '''Number of requests finalized with status code 499 which is logged when the
               client closes the connection.'''
            self.statusDiscarded,
            ##################
            '''Number of requests using a specific version of the HTTP protocol.'''
            self.httpV0_9,
            self.httpV1_0,
            self.httpV1_1,
            self.httpV2,
        ]
    @threaded
    def methodGet(self):
        self.data['methodGet']=random.randint(0,100)
  
    @threaded
    def methodHead(self):
        self.data['methodHead']=random.randint(0,100)

    @threaded
    def methodPost(self):
        self.data['methodPost']=random.randint(0,100)
    
    @threaded
    def methodPut(self):
        self.data['methodPut']=random.randint(0,100)
    
    @threaded
    def methodDelete(self):
        self.data['methodDelete']=random.randint(0,100)
    
    @threaded
    def methodOptions(self):
        self.data['methodOptions']=random.randint(0,100)
    
    @threaded
    def status1xx(self):
        self.data['status1xx']=random.randint(0,100)
    
    @threaded
    def status2xx(self):
        self.data['status2xx']=random.randint(0,100)

    @threaded
    def status3xx(self):
        self.data['status3xx']=random.randint(0,100)

    @threaded
    def status4xx(self):
        self.data['status4xx']=random.randint(0,100)

    @threaded
    def status5xx(self):
        self.data['status5xx']=random.randint(0,100)

    @threaded
    def status403(self):
        self.data['status403']=random.randint(0,100)
    
    @threaded
    def status404(self):
        self.data['status404']=random.randint(0,100)
    
    @threaded
    def status500(self):
        self.data['status500']=random.randint(0,100)
    
    @threaded
    def status502(self):
        self.data['status502']=random.randint(0,100)
    
    @threaded
    def status503(self):
        self.data['status503']=random.randint(0,100)
    
    @threaded
    def status504(self):
        self.data['status504']=random.randint(0,100)

    @threaded
    def statusDiscarded(self):
        self.data['statusDiscarded']=random.randint(0,100)
    
    @threaded
    def httpV0_9(self):
        self.data['httpV0_9']=random.randint(0,100)

    @threaded
    def httpV1_0(self):
        self.data['httpV1_0']=random.randint(0,100)

    @threaded
    def httpV1_1(self):
        self.data['httpV1_1']=random.randint(0,100)
    
    @threaded
    def httpV2(self):
        self.data['httpV2']=random.randint(0,100)
    

    def setData(self):
        handles=[]
        for i in self.collectorFunctions:
            handles.append(i())
        for thread in handles:
            thread.join()
        print('threads completed')

# print(a.cpuCount())