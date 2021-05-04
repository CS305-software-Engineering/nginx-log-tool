#!/bin/bash
sudo apt-get --purge remove collector
sudo dpkg -i collector_0.1-1_amd64.deb
currpath=`pwd`
source /opt/venvs/collector/bin/activate
cd /opt/venvs/collector/lib/python3.8/site-packages/collector/
cd init
python setup.py
cd ..
cd dataProcessor
cd $currpath