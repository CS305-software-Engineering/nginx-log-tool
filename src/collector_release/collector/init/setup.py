import os
import sys
import requests
from dotenv import load_dotenv
from pathlib import Path
import json
import time
sys.path.insert(0,'../')
from utility.logger import logger
load_dotenv(verbose=True)
env_path = Path('../') / '.env'
load_dotenv(dotenv_path=env_path)

def storeEnv(name, value):
    file=open('../.env','w+')
    file.write(name+"="+value+"\n")
    file.close()
    return

def setNginxConfig(): 
    logFormat="""log_format complete 'site*$server_name? server*$host?dest_port*$server_port?  dest_ip*$server_addr?'
                           'src*$remote_addr?  src_ip*$realip_remote_addr? user*$remote_user? '
                           'time_local*$time_local? protocol*$server_protocol? status*$status? '
                           'bytes_out*$bytes_sent? bytes_in*$upstream_bytes_received? '
                           'http_referer*$http_referer? http_user_agent*$http_user_agent? '
                           'nginx_version*$nginx_version? http_x_forwarded_for*$http_x_forwarded_for? '
                           'http_x_header*$http_x_header? uri_query*$query_string? uri_path*$uri? '
                           'http_method*$request_method? upstream_response_time*$upstream_response_time? '
                            'cookie*$http_cookie? request_time*$request_time? category*$sent_http_content_type? https*$https?'
    			'remote_addr*$remote_addr? remote_user*$remote_user?'
                        'request*$request? body_bytes_send*$body_bytes_sent?'
                        'upstream_adder*$upstream_addr? upstream_status*$upstream_status?'
                        'upstream_response_length*$upstream_response_length? upstream_cache_status*$upstream_cache_status?'
                        'http_referer*$http_referer? http_user_agent*$http_user_agent';"""
    accessLog="access_log /var/log/nginx/access.log complete;"  
    try:
        file=open('/etc/nginx/nginx.conf', 'r+')
        text=file.read()
        file.close()
    except IOError:
        logger.log("Unable to read configuration file")  
        print("Please try again,  ")
        exit()
    x=text.find('log_format')
    y=text[x:].find(';')
    text=text[:x]+logFormat+text[x+y+1:]
    file=open('input.txt','w+')
    x=text.find('access_log')
    y=text[x:].find(';')
    text=text[:x]+accessLog+text[x+y+1:]
    file=open('input.txt','w+')
    file.write(text)
    file.close()
    logger.log('nginx.conf set successfully!!')
    return 1

def restartNginx():
    try: 
        os.popen("systemctl restart nginx")
        return 1
    except: 
        logger.log("Unable to restart the server.")
        print("Error restarting nginx, please check if you have nginx server installed.")
        exit()
    
def setupAgent():
    APIKEY=input("please enter  your API, available on website: ")
    hostname=os.popen("hostname").read()
    ip=os.popen("hostname -I | awk '{print $1'}").read()
    data={
        "api_key": APIKEY, 
        "agentDesc":{
            "host": hostname, 
            "uid":ip
        }
    }
    response = requests.post('https://software-engineering-308707.el.r.appspot.com/aapi/agent/init', json=data)
    try: 
        storeEnv('TOKEN',json.loads(response.text)['token'])
        return 1
    except: 
        print("There is an error getting token please check your api key and start the setup once again, please again follow the steps.")
        exit()


def initialSetup(): 
    if os.geteuid() != 0:
        os.execvp('sudo', ['sudo', 'python3'] + sys.argv)
    else:
        x=0
        x+=setNginxConfig()
        x+=restartNginx()
        x+=setupAgent()
        if(x==3): 
            print("Yeyyyyy, Agent is setup, just run the collector now, to see real time metrics")
initialSetup()  