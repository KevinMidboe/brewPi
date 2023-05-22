import type IESTelemetry from './interfaces/IESTelemetry';
import type IChartFrame from './interfaces/IChartFrame';

const TELEMETRY_ENDPOINT = 'REPLACE_WITH_ES_HOST/brewlogger-*/_search';
const ES_APIKEY = '***REMOVED***';

function dateToESString(date: Date) {
  return date.toISOString();
}

const buildLatestQuery = (place: string) => {
  return {
    sort: [{ '@timestamp': { order: 'desc', mode: 'max' } }],
    query: {
      bool: {
        filter: [
          {
            match_all: {}
          },
          {
            match_phrase: {
              'location.keyword': place
            }
          },
          {
            match_phrase: {
              'message.keyword': 'Sensor readings'
            }
          }
        ]
      }
    },
    size: 1
  };
};

function buildQuery(field: String, from: Date, to: Date, interval: String) {
  const fromDateString: string = dateToESString(from);
  const toDateString: string = dateToESString(to);

  return {
    aggs: {
      data: {
        date_histogram: {
          field: '@timestamp',
          fixed_interval: interval,
          time_zone: 'Europe/Oslo',
          min_doc_count: 1
        },
        aggs: {
          maxValue: {
            max: {
              field: field
            }
          }
        }
      }
    },
    size: 0,
    fields: [
      {
        field: '@timestamp',
        format: 'date_time'
      }
    ],
    script_fields: {},
    stored_fields: ['*'],
    _source: {
      excludes: []
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            match_all: {}
          },
          {
            match_phrase: {
              'location.keyword': 'inside'
            }
          },
          {
            range: {
              '@timestamp': {
                gte: toDateString,
                lte: fromDateString,
                format: 'strict_date_optional_time'
              }
            }
          }
        ],
        should: [],
        must_not: []
      }
    }
  };
}

function roundInterval(interval) {
  switch (true) {
    case interval <= 500:
      return '100ms';
    case interval <= 5e3:
      return '1s';
    case interval <= 7500:
      return '5s';
    case interval <= 15e3:
      return '10s';
    case interval <= 45e3:
      return '30s';
    case interval <= 18e4:
      return '1m';
    case interval <= 45e4:
      return '5m';
    case interval <= 12e5:
      return '10m';
    case interval <= 27e5:
      return '30m';
    case interval <= 72e5:
      return '1h';
    case interval <= 216e5:
      return '3h';
    case interval <= 864e5:
      return '12h';
    case interval <= 6048e5:
      return '24h';
    case interval <= 18144e5:
      return '3d';
    case interval < 36288e5:
      return '30d';
    default:
      return '1y';
  }
}

function calculateInterval(from, to, interval, size) {
  if (interval !== 'auto') {
    return interval;
  }
  const dateMathInterval = roundInterval((from - to) / size);
  // const dateMathIntervalMs = toMS(dateMathInterval);
  // const minMs = toMS(min);
  // if (dateMathIntervalMs !== undefined && minMs !== undefined && dateMathIntervalMs < minMs) {
  //   return min;
  // }
  return dateMathInterval;
}

function parseTempResponse(data: IESTelemetry): IChartFrame[] {
  return data?.aggregations?.data?.buckets.map((bucket) => {
    return {
      value: bucket?.maxValue?.value,
      key_as_string: bucket?.key_as_string,
      key: bucket?.key
    };
  });
}

function parseLatestResponse(data: IESTelemetry) {
  return data?.hits?.hits[0]?._source;
}

export function fetchTemperature(
  from: Date,
  to: Date,
  size: number = 50,
  fetch: Function
): Promise<IChartFrame[]> {
  const fromMS = from.getTime();
  const toMS = to.getTime();
  const interval = calculateInterval(fromMS, toMS, 'auto', size);
  const fieldName = 'temperature';
  const esSearchQuery = buildQuery(fieldName, from, to, interval);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${ES_APIKEY}`
    },
    body: JSON.stringify(esSearchQuery)
  };

  return fetch(TELEMETRY_ENDPOINT, options)
    .then((resp) => resp.json())
    .then(parseTempResponse);
}

export function fetchHumidity(
  from: Date,
  to: Date,
  size: number = 50,
  fetch: Function
): Promise<IChartFrame[]> {
  const fromMS = from.getTime();
  const toMS = to.getTime();
  const interval = calculateInterval(fromMS, toMS, 'auto', size);
  const fieldName = 'humidity';
  const esSearchQuery = buildQuery(fieldName, from, to, interval);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${ES_APIKEY}`
    },
    body: JSON.stringify(esSearchQuery)
  };

  return fetch(TELEMETRY_ENDPOINT, options)
    .then((resp) => resp.json())
    .then(parseTempResponse);
}

export function fetchPressure(
  from: Date,
  to: Date,
  size: number = 50,
  fetch: Function
): Promise<IChartFrame[]> {
  const fromMS = from.getTime();
  const toMS = to.getTime();
  const interval = calculateInterval(fromMS, toMS, 'auto', size);
  const fieldName = 'pressure';
  const esSearchQuery = buildQuery(fieldName, from, to, interval);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${ES_APIKEY}`
    },
    body: JSON.stringify(esSearchQuery)
  };

  return fetch(TELEMETRY_ENDPOINT, options)
    .then((resp) => resp.json())
    .then(parseTempResponse);
}

export function getLatestInsideReadings(fetch: Function) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${ES_APIKEY}`
    },
    body: JSON.stringify(buildLatestQuery('inside'))
  };

  return fetch(TELEMETRY_ENDPOINT, options)
    .then((resp) => resp.json())
    .then(parseLatestResponse);
}

export function getLatestOutsideReadings(fetch: Function) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${ES_APIKEY}`
    },
    body: JSON.stringify(buildLatestQuery('outside'))
  };

  return fetch(TELEMETRY_ENDPOINT, options)
    .then((resp) => resp.json())
    .then(parseLatestResponse);
}
