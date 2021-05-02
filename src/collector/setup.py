import re
import os
import sys

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
        file=open('input.txt', 'r+')
        text=file.read()
        file.close()
    except IOError:
        print("Unable to read configuration file")  
    x=text.find('log_format')
    y=text[x:].find(';')
    # print(text[x],text[x+y])
    text=text[:x]+logFormat+text[x+y+1:]
    file=open('input.txt','w+')
    x=text.find('access_log')
    y=text[x:].find(';')
    # print(text[x],text[x+y])
    text=text[:x]+accessLog+text[x+y+1:]
    file=open('input.txt','w+')
    file.write(text)
    file.close()
    return
    # print('it runs')  
def restartNginx():
    data=os.popen("systemctl restart nginx")
    print(data.read())
    return

if os.geteuid() != 0:
    os.execvp('sudo', ['sudo', 'python3'] + sys.argv)
else:
    setNginxConfig()
    restartNginx()
    