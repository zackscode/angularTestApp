angular.module('AngularTestApp', []).controller('Main', function($scope) {
  const rows = [];
  console.log('=========== HELLO FROM CONTROLLER ===========');

  const ws = new WebSocket('ws://localhost:7770');

  ws.onopen = function open() {
    ws.send('init');
  };

  ws.onmessage = function incoming(message) {
    let nameData;
    try {
      nameData = JSON.parse(message.data);
      if (rows.length < 100) {
        rows.push(nameData);
        console.log(rows);

      } else {
        rows.shift();
        rows.push(nameData);
        console.log(rows);

      }
    } catch (e) {
      console.log('malformed message');
    }
    if (nameData) {
      // console.log(JSON.stringify(nameData));
      $scope.rows = rows;
    }
  };

});
