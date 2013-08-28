angular.module('filters',['utils'])
  .filter('traceFilter', function(utils){

    return function(input, query){
      if(!query) return input;
      if((query.text == "") && (query.environment == "") && (query.status == "")) return input;

      var result = [];

      angular.forEach(input, function(trace){
        if(utils.compareStr(trace.name, query.text) &&
           utils.compareStr(trace.name, query.environment) &&
           utils.compareStr(trace.status, query.status))
          result.push(trace);          
      });
      return result;
    };
  });