export enum e_metricCategory {}

export enum e_aggrFunc {
    sum = 'sum',
    avg = 'avg',
}

export enum e_typeSys {
    os = 'os',
    nginx = 'nginx',
}

export interface ITSMetricsReq {
    to: Number;
    from: Number;
    metric: String;
    combine_fn?: String | null;
    aggr_fn: String | null;
    granularity: String;
    agentId: String;
}

export interface IMetricDesc {
    source?: String;
    name: String;
    id?: Number;
    value: any;
    category?: String;
    type: String;
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
