var express = require('express');
var data    = require('./data');
var server  = module.exports = express();

server.use( function( req, res, next ){
  res.setHeader('Access-Control-Allow-Origin',      req.headers['origin'] || '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  res.setHeader('Access-Control-Expose-Headers', req.headers['access-control-request-headers']);

  // intercept OPTIONS method, this needs to respond with a zero length response (pre-flight for CORS).
  if (req.method === 'OPTIONS') return res.send(200);

  next();
});

server.use( require('body-parser').json() );
server.use( require('body-parser').urlencoded({ extended: true }) );

server.get( '/api/users', function( req, res ){
  res.json( data.users );
});

server.use( '/api/users/:id', function( req, res, next ){
  req.user = data.users[ req.params.id ];

  if ( !req.user ){
    return res.status(404).send();
  }

  next();
});

server.get( '/api/users/:id', function( req, res ){
  res.json( req.user );
});

server.get('/api/users/:id/things', function( req, res ){
  res.json( data.userThings[ req.user.id ] );
});