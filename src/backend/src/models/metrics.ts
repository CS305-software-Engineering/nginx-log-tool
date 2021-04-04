// TODO update the types of all the different metrics
export interface IOSMetrics {

}

export interface INGINXMetrics {

}

export interface IOSStaticMetrics {

}

export interface INGINXStatisMetrics {
    
}


export default interface IMetrics {
    osMetrics: IOSMetrics;
    nginxMetrics: INGINXMetrics;
}