if ( typeof module === "object" && module && typeof module.exports === "object" ){
  var isNode = true, define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require, exports, module){
  module.exports.overload = require('leFunc');

  module.exports.queryParams = function( data, urlEncode ){
    if (typeof data !== "object") return "";
    var params = "?";
    for (var key in data){
      if ([null, undefined, ""].indexOf(data[key]) > -1) continue;
      if (Array.isArray(data[key])){
        for (var i = 0, l = data[key].length; i < l; ++i){
          params += key + (urlEncode ? "%5B%5D=" : "[]=" ) + data[key][i] + "&";
        }
      } else {
        params += key + "=" + data[key] + "&";
      }
    }
    return params.substring(0, params.length - 1);
  };

  module.exports.defaults = function( a, b ){
    a = a || {};

    for ( var k in b ){
      if ( !(k in a) ) a[ k ] = b[ k ];
    }

    return a;
  };

  module.exports.extend = function( target ){
    var k, source;
    var sources = [].slice.call( arguments, 1 );

    while ( sources.length ){
      source = sources.shift();

      if ( !source ) continue;

      for ( k in source ){
        target[ k ] = source[ k ];
      }
    }

    return target;
  };

  return module.exports;
});