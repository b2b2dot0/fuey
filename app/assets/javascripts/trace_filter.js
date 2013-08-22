angular.module('filters',['utils'])
  .filter('traceFilter', function(utils){

    return function(input, query){
      if(!query) return input;
      var result = [];

      angular.forEach(input, function(trace){
        if(utils.compareStr(trace.name, query) ||
           utils.compareStr(trace.status, query))
          result.push(trace);          
      });
      return result;
    };
  });