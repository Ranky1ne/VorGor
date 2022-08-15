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

 async function ttn(){
    const now = new Date();
    const [carId, orderId, volume ] =  $_GET(['carId','orderId','volume']);
    const carsData =await query('GET','/carsData');
    const orderData = await query('GET','/homeData');
    let hour,minutes;
    if(now.getHours()<10){
         hour='0'+now.getHours();
    } else {
         hour=now.getHours();
    }
    if(now.getMinutes()<10){
        minutes='0'+now.getMinutes();
   } else {
        minutes=now.getMinutes();
   }
    const date = hour + ':'+ minutes +' '+ now.getDate()+ '/' + (now.getMonth()+1)+ '/' + now.getFullYear();
    const car = carsData.filter(elem =>{
       if (elem.id == carId){ 
        return elem;
        }
    })
    const order = orderData.filter(elem =>{
        if (elem.id == orderId){ 
         return elem;
         }
     })
     if (order[0]['Объем'] == 0 ){
        document.body.textContent ='';
       
        return  alert('Заявка выполнена.');
    }
     const numberTTN = orderData.filter(elem =>{
        if (elem['НомерТТН'] !== null){ 
         return elem;
         }
     })
    console.log(carsData, volume, car[0], order, numberTTN);  
    document.getElementById('date-for-pirnt').textContent= date;   
    document.getElementById('date-for-pirnt1').textContent= date; 
    document.getElementById('date-for-pirnt2').textContent= date; 
    document.getElementById('date-for-pirnt3').textContent= now.getDate()+ '/' + (now.getMonth()+1)+ '/' + now.getFullYear();  
    document.getElementById('date-for-pirnt10').textContent= now.getDate()+ '/' + (now.getMonth()+1)+ '/' + now.getFullYear();  
    document.getElementById('date-for-pirnt4').textContent= date;  
    document.getElementById('date-for-pirnt5').textContent= date;  
    document.getElementById('date-for-pirnt6').textContent= date;  
    document.getElementById('date-for-pirnt7').textContent= date;      
    document.getElementById('date-for-pirnt8').textContent= date;  
    document.getElementById('date-for-pirnt9').textContent= date;               
    document.getElementById('rawMaterial').textContent= order[0]['Сырье'];
    document.getElementById('customer1').textContent= order[0]['Заказчик'];
    document.getElementById('numberTTN').textContent= numberTTN[0]['НомерТТН'];
    document.getElementById('volumeCar').textContent= volume;
    document.getElementById('volumeCar1').textContent= volume;
    document.getElementById('volumeCar2').textContent= volume;
    document.getElementById('volumeCar3').textContent= volume;
    document.getElementById('adress').textContent= order[0]['Адрес'];
    document.getElementById('carNumber').textContent= car[0]['Номер машины'];
    document.getElementById('carrier').textContent= order[0]['Перевозчик'];
    document.getElementById('carMark').textContent= car[0]['Марка машины']
    order[0].printId === 'delivery'?
     (document.getElementById('printId').textContent= 'ДОСТАВКА',
     document.getElementById('customer').textContent= order[0]['Заказчик'])
      : document.getElementById('printId').textContent= 'САМОВЫВОЗ';
     
    await query('POST','/dataPrinting',`{"carId": ${carId}, "orderId": ${orderId},"volume": ${volume},"numberTTN": ${numberTTN[0]['НомерТТН']}}`);
    // window.print();  

}

window.onafterprint = ()=>{
    //  window.close()
}

