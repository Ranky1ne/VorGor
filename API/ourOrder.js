'use strict'
function data(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let result = this.responseText;
            let results = JSON.parse(result);
            document.querySelector('.order').innerHTML = `<div class="allOrders"></div>`;
            results.forEach(elem => {
                document.querySelector('.allOrders').appendChild(document.createElement('div')).className = 'javaScrip';
                let wor = document.createElement('table');
                wor.className= `orderPage${elem.id}`;
                wor.innerHTML =`<div class="tableCss${elem.id}">
                <form  class="deleteOrder"  id="deleteOrder${elem.id}" action="/delete" method="post">`
                document.querySelector('.javaScrip').appendChild(wor);
                document.querySelector(`.tableCss${elem.id}`).insertAdjacentHTML('beforeend', `<form  class="changeOrder"  id="changeOrder${elem.id}" action="/changeForm" method="get">`) 
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
    }
    xhttp.open('GET','/homeData',true);
    xhttp.send()
  };
  
      
