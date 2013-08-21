function TraceListCtrl($scope) {
  $scope.traces_fake = [
    { 
      "name": "CND Trace",
      "steps": [
        {
          "type": "Ping",
          "name": "Google DNS",
          "settings": "8.8.8.8",
          "status": "passed",
          "statusMessage": "Ping succeeded." 
        }
      ]
    },
    { "name": "TMG Trace" }
  ];    

  $scope.orderProp = 'name';

  $scope.traces = {};

  var source = new EventSource('/traces');
    source.addEventListener('new', function(e) {   
      $scope.$apply(function() {        
        var trace = JSON.parse(e.data);
        $scope.traces[trace.name] = trace;
      });
     }, false);
     source.addEventListener('update', function(e) {   
      $scope.$apply(function() {        
        var trace = JSON.parse(e.data);
        var steps = $scope.traces[trace.name].steps;
        $scope.traces[trace.name].steps[stepIndex(steps, trace.steps[0].name)] = trace.steps[0];
      });
    }, false);
}