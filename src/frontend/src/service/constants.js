export const SAVE_USER = "SAVE_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const AUTH_CHECK= "AUTH_CHECK"
export const ADD_INSTANCE = "ADD_INSTANCE"
export const REMOVE_INSTANCE = "REMOVE_INSTANCE"
export const SAVE_TIMESERIES_SEQ = "SAVE_TIMESERIES_SEQ"
export const UPDATE_TIMESERIES_SEQ = "UPDATE_TIMESERIES_SEQ"
export const SAVE_TIME = "SAVE_TIME"
export const CLEAR_TIMESERIES="CLEAR_TIMESERIES"
export const SAVE_NOTIFICATION="SAVE_NOTIFICATION"
export const SAVE_AGENT="SAVE_AGENT"
export const SAVE_GRAPHINIT ="SAVE_GRAPHINIT"
export const SAVE_OS="SAVE_OS"
export const SAVE_NGINX="SAVE_NGINX"
export const ngmetrics = [
    "httpStatus1xx",
    "httpStatus2xx",
    "httpStatus3xx",
    "httpStatus4xx",
    "httpStatus5xx",
    "httpStatus403",
    "httpStatus404",
    "httpStatus500,",
    "httpStatus502",
    "httpStatus503",
    "httpStatus504",
    "protocolHttp_v1_0",
    "protocolHttp_v0_9",
    "protocolHttp_v1_1",
    "protocolHttp_v2",
    "getMethods",
    "headMethods",
    "postMethods",
    "putMethods",
    "deleteMethods",
    "optionsMethods",
    "connectionAccepted",
    "connectionsDropped",
    "activeConnections",
    "currentConnections",
    "memoryRss",
    "memoryVms",
    "memoryRss_pct",
    "workersCount",
    "workersFdsCount",
    "IoKiloBytesRead",
    "IoKiloBytesWrite",
    "userCPU",
    "systemCPU",
    "idleCPU",
    "rss",
    "vms",
    "virtualMemoryTotal",
    "virtualMemoryUsed",
    "virtualMemoryAll",
    "virtualMemoryCached",
    "virtualMemoryBuffers",
    "virtualMemoryFree",
    "virtualMemoryPercent",
    "virtualMemoryAvailable",
    "totalSwapMemory",
    "usedSwapMemory",
    "freeSwapMemory",
    "percentFreeSwapMemory"

];
export const httpStatus=[
    "httpStatus1xx",
    "httpStatus2xx",
    "httpStatus3xx",
    "httpStatus4xx",
    "httpStatus5xx",
    "httpStatus403",
    "httpStatus404",
    "httpStatus500,",
    "httpStatus502",
    "httpStatus503",
    "httpStatus504",
    ];
export const httpProtocols=[
    "protocolHttp_v1_0",
    "protocolHttp_v0_9",
    "protocolHttp_v1_1",
    "protocolHttp_v2"
];

export const httpMethods =[
    "getMethods",
    "headMethods",
    "postMethods",
    "putMethods",
    "deleteMethods",
    "optionsMethods"
];

export const  httpConnections=[
    "connectionAccepted",
    "connectionsDropped",
    "activeConnections",
    "currentConnections"
];

export const workers = [
    "memoryRss",
    "memoryVms",
    "memoryRss_pct",
    "workersCount",
    "workersFdsCount",
    "IoKiloBytesRead",
    "IoKiloBytesWrite"
];

export const CPUInfo=[
   "userCPU",
   "systemCPU",
   "idleCPU",

];

export const AgentInfo =[

    "rss",
    "vms"
];

export const VirtualMemory=[
    "virtualMemoryTotal",
    "virtualMemoryUsed",
    "virtualMemoryAll",
    "virtualMemoryCached",
    "virtualMemoryBuffers",
    "virtualMemoryFree",
    "virtualMemoryPercent",
    "virtualMemoryAvailable",
];

export const SwapMemory=[
    "totalSwapMemory",
    "usedSwapMemory",
    "freeSwapMemory",
    "percentFreeSwapMemory"
];


