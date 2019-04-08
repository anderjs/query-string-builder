import { QueryItem, Model } from './models/queryString';
import { joinUrlParameters } from './utils/utils';

const createUrlParameters = (model: Model): object => {
  const { search, data, encode } = model;
  const urlParameters = new Map();
  const searchStr: string = search + '?';
  data.forEach((parameter: QueryItem) => {
    if(parameter.validation === undefined) {
      if(!parameter.validation) {
        urlParameters.set(parameter.key, [parameter.key, parameter.value]);
      } 
    }
  });
  const libFunctions: object = {
    url: joinUrlParameters,
    encodeUrl: encode ? encodeURI(joinUrlParameters(searchStr, urlParameters)) : null,
    collection: urlParameters,
  };

  return Object.freeze(libFunctions);
};

export { createUrlParameters };