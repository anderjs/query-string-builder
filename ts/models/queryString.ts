import { joinUrlParameters } from '../utils/utils';

interface QueryItem {
  key: string,
  value: string,
  validation?: boolean
};

interface Model {
  search: string,
  data: QueryItem [],
  encode: boolean
};

export { QueryItem, Model  };