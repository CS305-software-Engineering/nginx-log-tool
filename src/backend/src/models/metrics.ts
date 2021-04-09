// TODO update the types of all the different metrics
export interface IMetricsDesc {
    "source": String,
    "name": String,
    "method": String,
    "id": Number,
}

export interface IOSMetrics {
    desc: IMetricsDesc;
}

export interface INGINXMetrics {
    desc: IMetricsDesc;
}

export interface IOSStaticMetrics {
    desc: IMetricsDesc;

}

export interface INGINXStatisMetrics {
    desc: IMetricsDesc;
}


export default interface IMetrics {
    osMetrics: IOSMetrics;
    nginxMetrics: INGINXMetrics;
}