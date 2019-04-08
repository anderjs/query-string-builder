
/**
 * 
 * @param {interface} model
 * @property {readonly string} search The current search paramter for append '?'
 * @property {readonly array} data contains the key, and values from the parameters.
 * @property {readonly bool} encode if encodes if true, returns a urlEncoded. 
 * @throws {Error} if property validation of @array data.model
 * @returns {readony object}
 */ 
const createUrlParameters = (model) => {
  const { search, data, encode } = model;
  const urlParameters = new Map();
  const searchStr = search + '?';
  data.forEach((parameter) => {
    if(parameter.validation === undefined || typeof parameter.validation === 'boolean') {
      urlParameters.set(parameter.key, [parameter.key, parameter.value]);
    } else {
      throw new Error('Invalid assignament of validation property must be boolean');
    }
  });
  return Object.freeze({
    url: joinUrlParameters(searchStr, urlParameters), 
    encodeUrl: encode ? encodeURI(joinUrlParameters(searchStr, urlParameters)) : null,
    collection: urlParameters,
    get (key) { return getUrlParam(key, urlParameters) },
    remove () { return  removeUrlParam(key, {...model}) },
    set (props, value) { return setUrlParam({...props}, {...model}) },
    forEach (callback) { for(let i = 0; i < data.length; i++) { callback({...data[i]}, i, [...data]); }},
    keys() { return keysUrlParams([...data]) },
    values() { return valuesUrlParams([...data]) },
  });
};


/**
 * 
 * @param {string} searchStr the current search of the previous @function createUrlParameters
 * @param {map} dict the dictionary to eval.
 * @description 
 * Joins all current Map Object to a single url with the current parameters for build SearchURLParams.
 * @returns string
 */
function joinUrlParameters (searchStr, dict) {
  let url = '';
  let i = 0;
  dict.forEach(([key, value]) => {
    i += 1;
    const valueWithOutSpaces = value.replace(/ /gi, "+");
    if(i < dict.size) {
      url = url.concat(`${key}=${valueWithOutSpaces}&`);
    } else {
      url = url.concat(`${key}=${valueWithOutSpaces}`);
    }
  });
  return searchStr + url; 
};

/**
 * @function getUrlParam 
 * @description extract a value from the Map Object UrlParams, and returns
 * An Object with the parameter and key.
 * @param {string} key 
 * @param {map} dict 
 * @example
 * getUrlParam('newsfeed', new Map(['newsfeed', 'venezuela'])) 
 * output: { parameter: 'newsfeed', key: 'Venezuela'}
 */
function getUrlParam (key, dict) {
  if(dict.has(key)) {
    const value = (dict.get(key));
    return Object.freeze({
      parameter: value[0],
      key: value[1]
    });
  }
  return Object.freeze({
    parameter: null,
    key: null
  });
};

/**
 * @description
 * Removes a current object from the url params collection.
 * @example
 * removeUrlParam('samsung')
 * @param {string} key 
 * @param {object} model 
 */
function removeUrlParam (key, model) {
  const { data } = model;
  if(data.some((value) => value.key === key)) {
    const dataWithOutRemovedKey = data.filter((element) => {
      return element.key !== key;
    });
    return createUrlParameters({...model, data: dataWithOutRemovedKey });
  }
  return createUrlParameters({...model });
}

/**
 * @description
 * sets or modifies an existing url key param from the existing one.
 * Also, can be used for add a new url parameter to our collection.
 * @example
 * setUrlParam('brands', 'google analytics', model)
 * output: { key: 'brands'}
 * @param {string} key 
 * @param {any} value 
 * @param {object} model 
 * @returns {function}
 */
function setUrlParam (key, value, model) {
  const { data } = model;
  if(!data.some((value) => value.key === key)) {
    if(!typeof key === 'string') {
      throw new Error('Key and value must be a string');
    }
    const dataWithNewKey = data.concat({
      key: key,
      value: typeof value !== 'string' ? value.toString() : value
    });
    return createUrlParameters({...model,  data: dataWithNewKey });
  }
  const dataWithModifyKey = data.map((value) => {
    if(value.key === key) {
      return {...value, key: !typeof value === 'string' ? value.toString() : value };
    }
    return value;
  });
  return createUrlParameters({...model, data: dataWithModifyKey });
}

function keysUrlParams(urlParams) {
  let keys = [];
  for(let urlParam of urlParams) {
    keys.push(urlParam.key);
  }
  return keys[Symbol.iterator]();
};

function valuesUrlParams(urlParams) {
  let values = [];
  for(let urlParam of urlParams) {
    values.push(urlParam.value);
  }
  return values[Symbol.iterator]();
}

module.exports = {
  createUrlParameters
};