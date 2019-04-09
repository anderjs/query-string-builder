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
    url: parseQueryParameters(searchProperty, mapOfParameters), 
    collection: mapOfParameters,
    get (key) { 
      return getQueryParameter(key, mapOfParameters) 
    },
    remove (key) { 
      return  removeQueryParameter(key, {...properties}) 
    },
    set (props) { 
      return setQueryParameter({...props}, {...properties}) 
    },
    forEach (callback) { 
      for(let i = 0; i < queries.length; i++) { 
        callback({...queries[i]}, i, [...queries]); 
      }
    },
    keys() { 
      return keysQueryParametersIterator([...queries]) 
    },
    values() { 
      return valuesQueryParametersIterator([...queries]) 
    },
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

module.exports = {
  createUrlParameters
};