// function to map timewindow string to its value in milli seconds
export function timewindowMapFunc(twMap: Map<String, number>) {
    // 1 hr. timewindow
    twMap.set('1h', 3600000);
    // 4 hrs. timewindow
    twMap.set('4h', 14400000);
    // 1 day. timewindow
    twMap.set('1d', 86400000);
    // 2 day timewindow
    twMap.set('2d', 172800000);
    // 1 week timewindow
    twMap.set('1w', 604800000);
}

// function to map granularity string to its value in milli seconds
export function granularityMapFunc(granulMap: Map<String, number>) {
    // 1 min. granularity
    granulMap.set('1m', 60000);
    // 5 mins. granularity
    granulMap.set('5m', 300000);
    // 30 mins. granularity
    granulMap.set('30m', 1800000);
    // 1 hr. granularity
    granulMap.set('1h', 86400000);
    // 4 hrs. granularity
    granulMap.set('4h', 345600000);
}

export function tw2GranulMapFunc(tw2Granul: Map<String, String>) {
    // 1 hr. -> 1 min.
    tw2Granul.set('1h', '1m');
    // 4 hrs. -> 5 mins.
    tw2Granul.set('4h', '5m');
    // 1 day. -> 30 mins.
    tw2Granul.set('1d', '30m');
    // 2 day -> 1 hr.
    tw2Granul.set('2d', '1h');
    // 1 week -> 4 hrs.
    tw2Granul.set('1w', '4h');
}

// initialize all maps
const tw2Granul = new Map<String, String>();
tw2GranulMapFunc(tw2Granul);
const twMap = new Map<String, number>();
timewindowMapFunc(twMap);
const granulMap = new Map<String, number>();
granularityMapFunc(granulMap);

export { tw2Granul, twMap, granulMap };