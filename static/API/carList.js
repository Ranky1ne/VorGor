 function $_GET(arr) {
    let res = [];
    for (let key in arr) {  
    let p = window.location.search;
    p = p.match(new RegExp(arr[key] + '=([^&=]+)'));
    let a = p ? p[1] : false;
    res.push(a);
    }
    return res
}
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

async function loadCarList(regex){
    let value = document.getElementById('site-search').value;
    value = value.toUpperCase();
    value.replace(/\s/g,'');
    regex = new RegExp(`${value}`, 'g');
    const results =  await query('GET','/carsData');
    const data = $_GET(['carList']);
    document.querySelector(`.list`).innerHTML='';
    function createTable(arg) {let box = document.createElement('table');
        box.setAttribute("id",`car-boxList-${arg.id}`)
        box.className = 'car-boxList';
        document.querySelector(`.list`).appendChild(box);
        document.querySelector(`#car-boxList-${arg.id}`).insertAdjacentHTML("beforeend", '<tr class="headerTable"><th>Марка машины</th><th>Номер машины</th><th>Объем, м³</th></tr>')
        document.querySelector(`#car-boxList-${arg.id}`).insertAdjacentHTML("beforeend", `<tr class="headerTable"><td cosplan="2">${arg['Марка машины']}</td><td cosplan="2">${arg['Номер машины']}</td><td cosplan ="2">${arg['Объем, м3']}</td></tr>`)
        document.querySelector(`#car-boxList-${arg.id}`).insertAdjacentHTML("beforeend", `<button class="btn" onclick="deleteCar(${arg.id},${arg.orderId})" >Удалить</button>`)
    }
    results.forEach(elem => {
        if(data == elem.orderId){
            if (elem['Номер машины'] !== null){
                if (elem['Номер машины'].replace(/\s/g,'').match(regex)){
                    createTable(elem);
                } 
                else if (value === ''){
                    createTable(elem);
            }
       
            }
        }
    })
}

function addCar(){
    const carNumber = document.getElementById('carNumber').value;
    const carVolume = document.getElementById('carVolume').value;
    const carMark = document.getElementById('carMark').value;
    if(carNumber.match(/[A-zА-я]{1}\s[0-9]{3}\s[A-zА-я]{2}\s[0-9]{2}/)){
    const xhttp = new XMLHttpRequest();
    const carId = $_GET(['carList'])
    xhttp.onreadystatechange = function(){
       
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('tableList').innerHTML = "";
           
            loadCarList();

        }
    }
    xhttp.open('POST','/addCar',true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(`{"carId": ${carId},"carNumber": "${carNumber.toUpperCase()}", "carVolume": ${carVolume}, "carMark": "${carMark.toUpperCase()}"}`)
    } else {
        alert('Номер машины должен быть "x 000 xx 00"')
    }
}

async function deleteCar(carId, orderId ){
    await query ('POST','/deleteCar',`{"carId": ${carId},"carOrderId": ${orderId}}`);
    loadCarList ();
}

function searchCars(){
    let data = document.getElementById('site-search').value;
    data = data.toUpperCase();
    data.replace(/\s/g,'');
    const regex = new RegExp(`${data}`, 'g');

    if(data !== '' ){
        loadCarList (regex)
    }  else {
        loadCarList ('')
    }
}