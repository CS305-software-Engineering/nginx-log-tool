# Nginx Log Tool

A usefull tool to monitor performance in realtime and troubleshoot applications running on Nginx web servers.

## Project Design Overview
**Nginx log tool** contains three components:
* [**`Collection Agent`**](src/collectionAgent): Install this package on the system where Nginx instance is running to track the metrics and metadata.
  
* [**`Web App`**](src/frontend): A web UI for visualization and analysis of data fetched from the host system using collection agent.
  
* [**`Backend`**](src/backend): Core component that encompasses metrics collection, a database and APIs to seamlessly interact with collection agent and webapp.

Have a look at our [Wiki page](https://github.com/CS305-software-Engineering/nginx-log-tool/wiki) for a comprehensive project description.
