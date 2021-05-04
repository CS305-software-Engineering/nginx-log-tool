#!/bin/bash
set -e
var1="$1"
start="start"
stop="stop"
if [[ $1 == $start ]];then
    output=pid.txt
    home=`pwd`
    source /opt/venvs/collector/bin/activate
    cd /opt/venvs/collector/lib/python3.8/site-packages/collector/dataProcessor/
    python dataProcessing.py &
    deactivate
    cd $home
    pwd
    echo $! | tee $output
    echo 'Nginx Collector started successfully!!!'
elif [[ $1 == $stop ]];then
    pid=$(pgrep -f '/opt/venvs/collector')
    # echo $pid
    sudo kill -9 $pid
    sudo rm pid.txt
    echo 'NginxCollector Successfully Stopped'
else
    echo 'invalid command'
fi
