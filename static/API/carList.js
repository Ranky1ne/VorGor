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

async function loadCarList(){
const results =  await query('GET','/carsData');
const th=document.createElement('th');
const tr=document.createElement('tr');
const td=document.createElement('th');

}
// function loadCarList (){
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function(){
//         document.getElementsByClassName('list').innerHTML = '';
//         if(this.readyState == 4 && this.status == 200){
//             let result = this.responseText;
//             let results = JSON.parse(result);
//             console.log(results)  
//             let data = $_GET(['carList']);   
//             document.querySelector('#carId').value = data;
//             console.log(data)
//             results.forEach(elem => {
//                 if(data == elem.orderId){
//                     if (elem['Номер машины'] !== null){
//                         let box = document.createElement('div');
//                         box.setAttribute("id",`car-boxList-${elem.id}`)
//                         box.className = 'car-boxList';
//                         document.querySelector(`.list`).appendChild(box)
//                         document.querySelector(`#car-boxList-${elem.id}`).insertAdjacentHTML("beforeend", '<tr class="headerTable"><td>Номер машины</td><td>Объем, м³</td></tr>')
//                         let row = document.createElement('tr');
//                         row.innerHTML = `<td cosplan="2">${elem['Марка машины']}</td><td cosplan="2">${elem['Номер машины']}</td><td cosplan ="2">${elem['Объем, м3']}</td>`
//                         document.querySelector(`#car-boxList-${elem.id}`).appendChild(row);
//                         row = document.createElement('div');
//                         row.className = 'deleteBut';
//                         row.innerHTML = ` <form  class="deleteCar" id="deleteBut${elem.id}"  action="/deleteCar" method="post">`
//                         document.querySelector(`#car-boxList-${elem.id}`).appendChild(row);
//                         document.querySelector(`#deleteBut${elem.id}`).innerHTML = `<input type="hidden" name="carOrderId" id="carOrderId${elem.orderId}" value="${elem.orderId}"><input name="deleteCar" type="hidden" value="${elem.id}"><button class="btn" >Удалить</button>`;
                       
//                     }
//                 }
//             })
//         }
//     }
//     xhttp.open('GET','/carsData',true);
//     xhttp.send()
// };

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