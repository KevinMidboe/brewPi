type ESRelation = 'eq' | 'lt' | 'gt';

interface IESHit {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: IESSource;
}

interface IESSource {
  temperature: number;
  humidity: number;
  location: string;
  severity: string;
  message: string;
  '@timestamp': string;
  sessionID: string;
}

export default interface ESTelemetry {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: ESRelation;
    };
    max_score: null;
    hits: Array<IESHit>;
  };
  aggregations: {
    data: {
      buckets: [
        {
          maxValue: {
            value: number;
          };
          key_as_string: string;
          key: number;
          doc_count: number;
        }
      ];
    };
  };
}
