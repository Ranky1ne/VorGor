'use strict'
function data(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let result = this.responseText;
            let results = JSON.parse(result);
            results.forEach(elem => {
                if(elem.id !== 531){
                document.querySelector('.container').appendChild(document.createElement('div')).className = 'javaScrip';
                let wor = document.createElement('table');
                wor.className= `orderPage${elem.id}`;
                wor.innerHTML =`<div class="tableCss" id="tableCss${elem.id}">
                <form  class="deleteOrder"  id="deleteOrder${elem.id}" action="/delete" method="post">`
                document.querySelector('[class~="javaScrip"]:last-of-type ').appendChild(wor);
                document.querySelector(`#tableCss${elem.id}`).insertAdjacentHTML('beforeend', `<form  class="changeOrder"  id="changeOrder${elem.id}" action="/changeForm" method="get">`) 
                document.querySelector(`#tableCss${elem.id}`).insertAdjacentHTML('beforeend', ` <form  class="carList"  id="carList${elem.id}" action="/carList" method="get">`)
                document.querySelector(`#deleteOrder${elem.id}`).innerHTML = `<input name="deleteOrder" type="hidden" value="${elem.id}"><button class="btn"  ondblclick="submit">Удалить</button>`;
                document.querySelector(`#changeOrder${elem.id}`).innerHTML = `<input name="changeOrder" type="hidden" value="${elem.id}"><input class="btn" type="submit" value="Изменить">`;
                document.querySelector(`#carList${elem.id}`).innerHTML = `<input name="carList" type="hidden" value="${elem.id}"><input class="btn" type="submit" value="Машины">`;
                let orderData = document.createElement('div')
                    orderData.setAttribute("id", `orderData${elem.id}`);
                    document.querySelector(`.orderPage${elem.id}`).appendChild(orderData);
                for( let key in elem){
                    if(key !== 'id' && key !== 'printId'  && key !== 'НомерТТН' && elem.id !== 531){
                    let row = document.createElement('tr');
                    row.innerHTML = `<td cosplan="2">${key}</td><td cosplan ="2">${elem[key]}</td>`
                    document.querySelector(`#orderData${elem.id}`).appendChild(row);
                    } else if(key === 'printId'){
                        if (elem[key] === 'delivery' ){
                            let row = document.createElement('tr');
                        row.innerHTML = `<td cosplan="2">Тип печати</td><td cosplan ="2">Доставка</td>`
                    document.querySelector(`#orderData${elem.id}`).appendChild(row);
                        } else if(elem[key] === 'pickup' ){ 
                            let row = document.createElement('tr');
                        row.innerHTML = `<td cosplan="2">Тип печати</td><td cosplan ="2">Самовывоз</td>`
                        document.querySelector(`#orderData${elem.id}`).appendChild(row);}
                    }
                }   
        }})
        }
    }
    xhttp.open('GET','/homeData',true);
    xhttp.send()
  };
  
      
