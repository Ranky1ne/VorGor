let descSwich = 1;

const query =(type,query,arg)=>{
    return new Promise((resolve, reject) => { 
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if (arg === undefined){
            const result = this.responseText;
            const results = JSON.parse(result);
            resolve (results);
            } else {
                resolve()
            }
        }}
    xhttp.open(type,query,true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(arg)
    
   
    })
}

const CarrierCustomerSlice =(arg)=>{
    const block=document.createElement('div'),
        string1=document.createElement('h1'),
        string2 = document.createElement('h6'),
        string3 = document.createElement('h6'),
        string4 = document.createElement('h6'),
        volume = document.createElement('h2');
    
        block.className ='car-card';
        string1.className = 'card-title';
        string2.className = 'card-subtitle';
        string3.className = 'card-subtitle-2';
        string4.className = 'card-subtitle-3';
        volume.className = 'card-volume';
    
    const indBr = arg['Перевозчик'].indexOf(','),
    indBr2 = arg['Заказчик'].indexOf(',');
    if (indBr === -1){
        textString3 = document.createTextNode('Перевозчик: '+ arg['Перевозчик']);
    } else {
        textString3 = document.createTextNode('Перевозчик: '+ arg['Перевозчик'].slice(0, (indBr)));
    }

    if (indBr2 === -1){
        textString2 = document.createTextNode('Заказчик: '+ arg['Заказчик']);
    } else {
        textString2 = document.createTextNode('Заказчик: '+ arg['Заказчик'].slice(0, (indBr2)));
    }
    textString1 = document.createTextNode('№: '+ arg['Номер машины']);
    textString4 = document.createTextNode('Вид материала: '+ arg['Сырье']);
    textVolume = document.createTextNode('Объем, м3: '+ arg['Объем, м3']);

    string1.appendChild(textString1);
    string2.appendChild(textString2);
    string3.appendChild(textString3);
    string4.appendChild(textString4);
    volume.appendChild(textVolume);

    block.appendChild(string1);
    block.appendChild(string2);
    block.appendChild(string3);
    block.appendChild(string4);
    block.appendChild(volume)

    return block;
}

async function loadCars (regex){
    const results = await query('GET','/carsData');
    document.getElementById('main').innerHTML = '';

    function createTable(elem){
        document.getElementById('main').insertAdjacentHTML('afterbegin',`<button class="main-car-button" id="car${elem.id}" ondblclick="moveCar(${elem.id})"></button>`)
        const block = CarrierCustomerSlice(elem);
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
    descSwich = 1;
}

async function loadCarOnObject (regex){
    const results = await query('GET','/carsData');
    document.getElementById('main').innerHTML = '';
    function createTable(elem){
        document.getElementById('main').insertAdjacentHTML('afterbegin',`<button class="main-car-button" id="car${elem.id}" ondblclick="moveCarBack(${elem.id})"></button>`)
        const blockButt = document.createElement('div');
        blockButt.className = 'print-butt';
        blockButt.innerHTML = `<button class="print-btn" onclick="printFile(${elem.id},${elem.orderId},${elem['Объем, м3']})">Печать</button>`;

        const block = CarrierCustomerSlice(elem);
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
                    createTable(elem);
                } 
                else if (data === ''){
                createTable(elem);
            }
        }
    })
    descSwich = 0;
}

async function moveCar(carId){
    await query('POST','/moveCars',`{"carId": ${carId}}`);
    loadCars()    
}

async function moveCarBack(carId){
    await query('POST','/moveCarsBack',`{"carId": ${carId}}`);
    loadCarOnObject()    
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


async function printFile (carId,orderId, volume) {
    const allCarsData = await query('GET','/carsData');
    const term = window.open(`/printTTN?carId=${carId}&orderId=${orderId}&volume=${volume}`);
}


$('.btn').on('click',function(){
    let currTab = $(this).index();

    $('.btn').removeClass('active');
    $(this).addClass('active');

})
