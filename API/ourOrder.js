'use strict'
var myRequest = new XMLHttpRequest();
var requestURL = '../data.json';
myRequest.open('GET', requestURL);
myRequest.responseType = 'json';
myRequest.send();
myRequest.onload = function() {
    async function render (){
    const data = myRequest.response;
 
    document.querySelector('.order').innerHTML = `<div class="allOrders"></div>`;
    data.forEach(elem => {
        document.querySelector('.allOrders').appendChild(document.createElement('div')).className = 'javaScrip';
        let wor = document.createElement('table');
        wor.className= `orderPage${elem.id}`;
        wor.innerHTML =`<div class="tableCss${elem.id}">
        <form  class="deleteOrder"  id="deleteOrder${elem.id}" action="/delete" method="post">`
        document.querySelector('.javaScrip').appendChild(wor);
        document.querySelector(`.tableCss${elem.id}`).insertAdjacentHTML('beforeend', `<form  class="changeOrder"  id="changeOrder${elem.id}" action="/changeForm" method="post">`) 
        document.querySelector(`.tableCss${elem.id}`).insertAdjacentHTML('beforeend', ` <form  class="carList"  id="carList${elem.id}" action="/carList" method="get">`)
        document.querySelector(`#deleteOrder${elem.id}`).innerHTML = `<input name="deleteOrder" type="hidden" value="${elem.id}"><input class="btn" type="submit" value="Delete">`;
        document.querySelector(`#changeOrder${elem.id}`).innerHTML = `<input name="changeOrder" type="hidden" value="${elem.id}"><input class="btn" type="submit" value="Change">`;
        document.querySelector(`#carList${elem.id}`).innerHTML = `<input name="carList" type="hidden" value="${elem.id}"><input class="btn" type="submit" value="Car">`;
        for( let key in elem){
            let row = document.createElement('tr');
            row.innerHTML = `<td cosplan="2">${key}</td><td cosplan ="2">${elem[key]}</td>`
            document.querySelector(`.orderPage${elem.id}`).appendChild(row);
        }
    
        
    })

    
    }
render();
}

