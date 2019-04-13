#####
  Query String Build Library
#####

####
  How, and when we can use this useful and simpe library?
####

```

  Often you need to construct tedious url parameters with the BrowserAPI new URLSearchParams
  But also, mutating, and confusing when we use "append", so, after that using .toString()
  But here, we can use to build simple url libraries, and encodes automatically the url

```

##
  Examples and how to use the queryStringBuilder library.
##

```
  const queryStringBuilder = require('query-string-builder');
```

##
  Building the queryString object.
##

```
  const queryString = queryStringBuilder.build({
    search: 'q',
    queries: [
      { key: 'newsfeed', value: 'USA', validation: 1 === 1 },
      { key: 'about', value: 'javascript' }
    ],
    encode: true
  });
  console.log(queryString);
```
##

##
```
  Note there's an extra property of object queries called 'validation',
  If you're using react, or angular, maybe you're building filters like amazon,
  So, you want to validate if a filter is selected, in validation you can do something like this.

  { key: 'products', value: 'comes from the data or state..', validation: clicked? }

  Validation is optional, you can ommit from construct with queries property in the method .build({});
  Validation must be boolean.

  { url: 'q?newsfeed=USA&about=javascript',
  urlEncode: 'q%3Fnewsfeed%3DUSA%26about%3Djavascript',
  collection:
   Map {
     'newsfeed' => [ 'newsfeed', 'USA' ],
     'about' => [ 'about', 'javascript' ] },
  get: [Function: get],
  remove: [Function: remove],
  set: [Function: set],
  forEach: [Function: forEach],
  keys: [Function: keys],
  values: [Function: values],
  share: [Function: share] 
  }
```

####
  Methods
####

```
  There's a useful methods after call queryString.build, these properties are readonly properties that offers
  Inmutability. 
  Methods available: 
  get, remove, set, forEach, keys, vlues, share
```

###
  get(key: string) => object { key: string, value: string }
  description: Get a current parameter of the queryString object builded.
###

```
  queryString.get('newsfeed');

  return value: { key: 'newsfeed', value: 'USA' }
```

###
  set(value: object) => new queryString object re-build.
  properties of parameter: 
  key: string,
  value: string, 
  validation: boolean,
###

```
  queryString.set({
    key: 'date',
    value: '2019-04-05',
    validation: Boolean(true)
  });

  return value: 

  { url: 'q?newsfeed=USA&about=javascript&date=2019-04-05',
  urlEncode: 'q%3Fnewsfeed%3DUSA%26about%3Djavascript...',
  collection:
   Map {
     'newsfeed' => [ 'newsfeed', 'USA' ],
     'about' => [ 'about', 'javascript' ],
     'date' => ['date', '2019-04-05'] 
    },
  get: [Function: get],
  remove: [Function: remove],
  set: [Function: set],
  forEach: [Function: forEach],
  keys: [Function: keys],
  values: [Function: values],
  share: [Function: share] 
  }
```

###
  remove(key: string) => new queryString object re-build.
###

```
  queryString.remove('about');
  
  return value:

  { url: 'q?newsfeed=USA&date=2019-04-05',
  urlEncode: 'q%3Fnewsfeed%3DUSA...',
  collection:
   Map {
     'newsfeed' => [ 'newsfeed', 'USA' ],
     'date' => ['date', '2019-04-05'] 
    },
  get: [Function: get],
  remove: [Function: remove],
  set: [Function: set],
  forEach: [Function: forEach],
  keys: [Function: keys],
  values: [Function: values],
  share: [Function: share] 
  }
```

###
  forEach(query?: { key, value, validation }, index?, queriesArr?) => callback
###

```
  queryString.forEach(query => {
    console.log(query.key + 'iterating...');
  });

  log value:
  'newsfeed iterating'
  'date iterating'
```

###
  values => ArrayIterator { }
  description: Returns a [Symbol.Iterator] of the queryParameters values.
###


```
  const iterator = queryString.values();
  console.log(iterator.next().value);
  console.log(iterator.next().value);

  log value:

  'USA'
  '2019-04-05'
```

###
  keys => ArrayIterator { }
  description: Returns a [Symbol.Iterator]  of the queryParameters keys.
###

```
  const iterator = queryString.keys();
  console.log(iterator.next().value);
  console.log(iterator.next().value);
  
  log value:

  'newsfeed',
  'date'
```

###
  share(hostname: string) => string
  description: appends an url with the queryParameters.
###

```
  Maybe you click copy "url link from somewhere" and you want to automatically return the url.
  queryString.share("https://www.google.com");

  return value:

  https://wwww.google.com/q?newsfeed=USA&date=2019-04-05;
```