let descSwich = 1;
function loadCars (regex){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let result = this.responseText;
            let results = JSON.parse(result);
            document.getElementById('main').innerHTML = '';
            function createTable(elem){
                document.getElementById('main').insertAdjacentHTML('afterbegin',`<button class="main-car-button" id="car${elem.id}" ondblclick="moveCar(${elem.id})"></button>`)
                
                    let block = document.createElement('div');
                    let string1 = document.createElement('h1');
                    let string2 = document.createElement('h6');
                    let string3 = document.createElement('h6');
                    let volume = document.createElement('h2');

                    block.className ='car-card';
                    string1.className = 'card-title';
                    string2.className = 'card-subtitle';
                    string3.className = 'card-subtitle-2'
                    volume.className = 'card-volume'

                    let indBr = elem['Перевозчик'].indexOf(',');
                    if (indBr === -1){
                        textString3 = document.createTextNode('Перевозчик: '+ elem['Перевозчик']);
                    } else {
                        textString3 = document.createTextNode('Перевозчик: '+ elem['Перевозчик'].slice(0, (indBr)));
                    }
                    let indBr2 = elem['Заказчик'].indexOf('ИНН');
                    if (indBr2 === -1){
                        textString2 = document.createTextNode('Заказчик: '+ elem['Заказчик']);
                    } else {
                        textString2 = document.createTextNode('Заказчик: '+ elem['Заказчик'].slice(0, (indBr2)));
                    }

                    textString1 = document.createTextNode('№: '+ elem['Номер машины']);
                    textVolume = document.createTextNode('Объем, м3: '+ elem['Объем, м3']);

                    string1.appendChild(textString1);
                    string2.appendChild(textString2);
                    string3.appendChild(textString3);
                    volume.appendChild(textVolume);

                    block.appendChild(string1);
                    block.appendChild(string2);
                    block.appendChild(string3);
                    block.appendChild(volume)
             
                document.getElementById(`car${elem.id}`).appendChild(block);
            }


            results.forEach(elem =>{
                if(elem['Номер машины'] !== null && elem.onObject === 1){
                    let data = document.getElementById('site-search').value;
                    data = data.toUpperCase();
                    data.replace(/\s/g,'');
                    regex = new RegExp(`${data}`, 'g');
                        if (elem['Номер машины'].replace(/\s/g,'').match(regex)){
                            createTable(elem)
                        } 
                     else if (data === ''){
                        createTable(elem)
                    }
                }
            })

        }
    }
    xhttp.open('GET','/carsData',true);
    xhttp.send()
    descSwich = 1;
}
let carData=[];

function loadCarOnObject (regex){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let result = this.responseText;
            let results = JSON.parse(result);
            document.getElementById('main').innerHTML = '';
            function createTable(elem){
                document.getElementById('main').insertAdjacentHTML('afterbegin',`<button class="main-car-button" id="car${elem.id}" ondblclick="moveCarBack(${elem.id})"></button>`)
                    
                    let block = document.createElement('div');
                    let string1 = document.createElement('h1');
                    let string2 = document.createElement('h6');
                    let string3 = document.createElement('h6');
                    let volume = document.createElement('h2');
                    let blockButt = document.createElement('div');

                    block.className ='car-card';
                    string1.className = 'card-title';
                    string2.className = 'card-subtitle';
                    string3.className = 'card-subtitle-2'
                    volume.className = 'card-volume'
                    blockButt.className = 'print-butt';

                    let indBr = elem['Перевозчик'].indexOf(',');
                    if (indBr === -1){
                        textString3 = document.createTextNode('Перевозчик: '+ elem['Перевозчик']);
                    } else {
                        textString3 = document.createTextNode('Перевозчик: '+ elem['Перевозчик'].slice(0, (indBr)));
                    }
                    let indBr2 = elem['Заказчик'].indexOf('ИНН');
                    if (indBr2 === -1){
                        textString2 = document.createTextNode('Заказчик: '+ elem['Заказчик']);
                    } else {
                        textString2 = document.createTextNode('Заказчик: '+ elem['Заказчик'].slice(0, (indBr2)));
                    }

                    textString1 = document.createTextNode('№: '+ elem['Номер машины']);
                    textVolume = document.createTextNode('Объем, м3: '+ elem['Объем, м3']);
                    blockButt.innerHTML = `<button class="print-btn" onclick="printFile(${elem.id},${elem.orderId})">Печать</button>`;

                    string1.appendChild(textString1);
                    string2.appendChild(textString2);
                    string3.appendChild(textString3);
                    volume.appendChild(textVolume);
                 

                    block.appendChild(string1);
                    block.appendChild(string2);
                    block.appendChild(string3);
                    block.appendChild(volume)
                    block.appendChild(blockButt)


                    
                    document.getElementById(`car${elem.id}`).appendChild(block)
            }
            results.forEach(elem =>{
                if(elem['Номер машины'] !== null && elem.onObject === 0){
                    let data = document.getElementById('site-search').value;
                    data = data.toUpperCase();
                    data.replace(/\s/g,'');
                    regex = new RegExp(`${data}`, 'g')   
                        if (elem['Номер машины'].replace(/\s/g,'').match(regex)){
                            createTable(elem)
                        } 
                     else if (data === ''){
                        createTable(elem)
                    }
                }
            })

        }
    }
    xhttp.open('GET','/carsData',true);
    xhttp.send()
    descSwich = 0;
}

function moveCar(carId){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        
        if(this.readyState == 4 && this.status == 200){
            loadCars()
        }}
      
        xhttp.open('POST','/moveCars',true);
        xhttp.setRequestHeader("Content-Type","application/json")
        xhttp.send(`{"carId": ${carId}}`)
      
}

function moveCarBack(carId){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            loadCarOnObject()
        }}
        xhttp.open('POST','/moveCarsBack',true);
        xhttp.setRequestHeader("Content-Type","application/json")
        xhttp.send(`{"carId": ${carId}}`)
      
}

function printFile (carId,orderId) {
    let term = window.open(`/printTTN?carId=${carId}`);
    // let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function(){  
    //     if(this.readyState == 4 && this.status == 200){
    //         let result = this.responseText;
    //         let results = JSON.parse(result);
    //         results.forEach(elem => {
    //             if (carId)
    //         })

    //     }}
    // xhttp.open('GET','/homeData',true);
    // xhttp.send()
}


  


function searchCars(){
    let data = document.getElementById('site-search').value;
    data = data.toUpperCase();
    data.replace(/\s/g,'');
    const regex = new RegExp(`${data}`, 'g')
    
    
    
    if(data !== '' && descSwich === 0){
    loadCarOnObject (regex)
    } else if(data !== '' && descSwich === 1){  
        loadCars(regex)
    } else if(data === '' && descSwich === 0){
        loadCarOnObject ('')
    }  else if(data === '' && descSwich === 1){
        loadCars ('')
    }
}

// TABS

$('.btn').on('click',function(){
    let currTab = $(this).index();

    $('.btn').removeClass('active');
    $(this).addClass('active');

})