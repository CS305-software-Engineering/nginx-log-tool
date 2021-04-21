export enum e_metricCategory {}

export enum e_aggrFunc {
    sum = 'sum',
    avg = 'avg',
}

export interface ITSMetricsReq {
    to: Number;
    from: Number;
    metric: String;
    combine_fn: String | null;
    aggr_fn: String | null;
    granularity: String;
    agentId: String;
}

// TODO update the types of all the different metrics
export interface IMetricDesc {
    source?: String;
    name: String;
    id?: Number;
    value: any;
    category?: String;
}

export interface IOSStaticMetrics {
    desc: IMetricDesc;
}

export interface INGINXStaticMetrics {
    desc: IMetricDesc;
}

export default interface ITSMetric {
    timestamp: Date;
    metrics: Array<IMetricDesc>;
}
