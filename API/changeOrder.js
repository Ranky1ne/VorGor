'use strict'
var myRequest = new XMLHttpRequest();
var requestURL = './dataChange.json';
myRequest.open('GET', requestURL);
myRequest.responseType = 'json';
myRequest.send();
myRequest.onload = function() {
    var data = myRequest.response;
    document.querySelector('#changerId').value = data[0].id;
    document.querySelector('#changeCustomer').value = data[0].Заказчик;
    document.querySelector('#changeCarrier').value = data[0].Перевозчик;
    document.querySelector('#changeVolume').value = data[0].Объем;
    document.querySelector('#changeRawMaterial').value = data[0].Сырье;
    document.querySelector('#changeEtc').value = data[0]['и тд.'];



}