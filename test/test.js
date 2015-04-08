var assert    = require('assert');
var request   = require('request');
var $         = require('jquery');
var data      = require('./data');

var http = function( options, callback ){
  request( options, function( error, res, body ){
    return callback( error, body );
  });
};

if ( process.browser ){
  http = function( options, callback ){
    options.crossDomain = true;
    return $.ajax( options );
  };
}

var resource = require('../')({
  http: http
});

describe ('Resource', function(){
  it ('resource( string )', function(){
    var url = 'http://localhost:8000/api';
    var api = resource( url );
    assert.equal( api.url, url );
  });

  it ('resource( object )', function(){
    var url = 'http://localhost:8000/api';
    var api = resource({ url: url });
    assert.equal( api.url, url );
  });

  it ('resource( string )( string )( string )( string )', function(){
    var a = resource()('/users')(27);
    assert.equal( a.url, '/users/27');
    assert.equal( a('addresses').url, '/users/27/addresses' );
    assert.equal( a.url, '/users/27');
  });

  it ('resource( string )( string, { sub_resources } )', function(){
    var api = resource('api');
    var users = api( 'users', {
      addresses: 'addresses'
    });

    assert.equal( api.url, 'api' );
    assert.equal( users.url, 'api/users' );
    assert.equal( users(27).addresses.url, 'api/users/27/addresses' );
    assert.equal( users.url, 'api/users' );
    assert.equal( users(27).addresses.url, 'api/users/27/addresses' );
    assert.equal( users(27).addresses.getUrl(), 'api/users/27/addresses' );
  });

  describe('Http', function(){
    var api = resource('http://localhost:3011/api');
    api.users = api('users');

    it('users.get(callback)', function( done ){
      api.users.get( function( error, results ){
        assert( !error, error );
        data.users.forEach( function( user, i ){
          assert.equal( user.id, results[ i ].id );
        });
        done();
      });
    });

    it('users.get(id, callback)', function( done ){
      api.users.get( 2, function( error, result ){
        assert( !error, error );
        assert.equal( data.users[2].id, result.id );
        done();
      });
    });

    it('user.get(callback)', function( done ){
      var bill = api.users(1);
      bill.get( function( error, result ){
        assert( !error, error );
        assert.equal( data.users[1].id, result.id );
        done();
      });
    });
  });
});