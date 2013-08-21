function TraceListCtrl($scope) {
  $scope.traces_fake = [
    { 
      "name": "CND Trace",
      "status": "failed",
      "steps": [
        {
          "type": "Ping",
          "name": "Google DNS",
          "settings": "8.8.8.8",
          "status": "passed",
          "statusMessage": "Ping succeeded." 
        },
        {
          "type": "Ping",
          "name": "Localhost",
          "settings": "127.0.0.1",
          "status": "passed",
          "statusMessage": "Ping succeeded" 
        },
        {
          "type": "SNMPWalk",
          "name": "Client VPN",
          "settings": "1.0.1.1",
          "status": "failed",
          "statusMessage": "IP not found in IPTable"
        },
        {
          "type": "RFCPing",
          "name": "SAP Server",
          "settings": "89.1.121.20",
          "status": "pending",
          "statusMessage": ""
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