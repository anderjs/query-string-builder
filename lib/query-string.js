/**
 * @function createQueryParameters
 * @param [interface] properties
 * @property [string] search The current search prop for append to url. "search?"
 * @property [array] queries The queries model based on { key, value, validation }
 * @property [boolean] encode, returns encode if true.
 * @returns [<readonly>object]
 */


const createQueryParameters = (properties) => {
  const { search, queries, encode } = properties;
  const mapOfParameters = new Map();
  const searchProperty = search + '?';
  queries.forEach((query) => {
    if(query.validation === undefined || typeof query.validation === 'boolean') {
      if(query.validation !== false) {
        mapOfParameters.set(query.key, [query.key, query.value]);
      }
    } else {
      throw new Error('Invalid assignament of validation property must be boolean');
    }
  });
  return Object.freeze({
    /**
     * @typedef string
     * @description The url property of all concatenation of the build object.
     */
    url: parseQueryParameters(searchProperty, mapOfParameters),

    /**
     * @typedef boolean
     * @descriptio The url encode property of all concatenation of the build object, null if encode is false.
     */
    urlEncode: encode ? encodeURIComponent(parseQueryParameters(searchProperty, mapOfParameters)) : null,
    
    /**
     * @typedef Map
     * @description The map collection this is where all properties are built in.
     */
    collection: mapOfParameters,
    
    /**
     * @typedef function
     * @param [string] key
     * @description Get a piece of the queryString with an object { key, value, validation }
     * This return an instance of a new QueryString object, instead of mutating the existing one.
     * @returns [object]
     */
    get (key) { 
      if(typeof key === 'string') return getQueryParameter(key, mapOfParameters);
      throw new Error('Key must be a string value'); 
    },
    
    /**
     * @typedef function
     * @param [string] key 
     * @description Removes a piece of the queryString with an object.
     * This return an instance of a new QueryString object, instead of mutating the existing one.
     * @returns [object]
     */
    remove (key) { 
      if(typeof key === 'string') return  removeQueryParameter(key, {...properties});
      throw new Error('Key must be a string value');
    },
    
    /**
     * @typedef function
     * @description
     * ```
     *  Set a new piece of the queryString with a object.
     *  This return an instance of a new QueryString object, instead of mutating the existing one.
     * ```
     * @param [object] props
     * @property {string} key
     * @property {any} value
     * @property {boolean?} validation
     */
    set (props) { 
      return setQueryParameter({...props}, {...properties}) 
    },

    /**
     * @typedef method
     * @param [function] callback
     * @description
     * ```
     *  Iterates over the queryString properties, giving a callback with
     * Current object of each parameter of queryString, index, an entire array.
     * ``` 
     * @returns [void]
     */
    forEach (callback) { 
      for(let i = 0; i < queries.length; i++) { 
        callback({...queries[i]}, i, [...queries]); 
      }
    },

    /**
     * @iterator
     */
    keys() { 
      return keysQueryParametersIterator([...queries]) 
    },

    /**
     * @iterator
     */
    values() { 
      return valuesQueryParametersIterator([...queries]) 
    },

    /**
     * @typedef hostname [string]
     * @example
     * share('https://localhost:3000') output: 'https://localhost:3000/q?queryStringExample=works'
     */
    share(hostname) {
      if(typeof hostname === 'string') return hostname + '/' + parseQueryParameters(searchProperty, mapOfParameters);
      throw new Error('Hostname must be a string');
    }
  });
};



function parseQueryParameters (searchProperty, mapOfParameters) {
  let url = '';
  let index = 0;
  mapOfParameters.forEach(([key, value]) => {
    index += 1;
    const valueWithOutSpaces = value.replace(/ /gi, "+");
    if(index < mapOfParameters.size) {
      url = url.concat(`${key}=${valueWithOutSpaces}&`);
    } else {
      url = url.concat(`${key}=${valueWithOutSpaces}`);
    }
  });
  return searchProperty + url; 
};


function getQueryParameter (key, mapOfParameters) {
  if(mapOfParameters.has(key)) {
    const value = (mapOfParameters.get(key));
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


function removeQueryParameter (key, properties) {
  const { queries } = properties;
  if(queries.some((value) => value.key === key)) {
    const queriesWithOutRemovedKey = queries.filter((query) => {
      return query.key !== key;
    });
    return createQueryParameters({...properties, queries: queriesWithOutRemovedKey });
  }
  return createQueryParameters({...properties });
}


function setQueryParameter (queryParameter, properties) {
  const { queries } = properties;
  const { key, value, validation } = queryParameter;
  if(!queries.some((query) => query.key === key)) {
    if(!typeof key === 'string') {
      throw new Error('Key and value must be a string');
    }
    const queriesWithNewKey = queries.concat({
      key: key,
      value: typeof value !== 'string' ? value.toString() : value
    });
    return createQueryParameters({...properties, queries: queriesWithNewKey });
  }
  const queriesWithRenewKey = queries.map((query) => {
    if(query.key === key) {
      return {...query, key: !typeof query.key === 'string' ? query.key.toString() : query.key };
    }
    return query;
  });
  return createUrlParameters({...properties, queries: queriesWithRenewKey });
}

function keysQueryParametersIterator (queries) {
  let keys = [];
  for(let query of queries) {
    keys.push(query.key);
  }
  return keys[Symbol.iterator]();
};

function valuesQueryParametersIterator (queries) {
  let values = [];
  for(let query of queries) {
    values.push(query.value);
  }
  return values[Symbol.iterator]();
}


const queryString = Object.freeze({
  build(properties) {
    return createQueryParameters({...properties})
  }
});

module.exports = queryString;