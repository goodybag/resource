# Resource.js

> Create HTTP API clients with ease

__Usage:__

```javascript
var $         = require('jquery');
var resource  = requrie('resource')({
  // Must provide your own http interface
  http: $.ajax
});

// Setup your api
var api = resource('http:/localhost:3000/api');
api.users = api('users');
api.books = api('books');

api.users.get(123, function( error, user ){
  
});

var bob = api.users(123);

bob.put( { interest: ['Having fun'] }, function( error, user ){
  
});
```

__Install:__

```
bower install resource
npm install resource
```

## Docs COMING SOON!