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

function changeOrder(){
    let xhttp = new XMLHttpRequest();
    let orderId = $_GET(['changeOrder']);
    console.log(orderId)
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let result = this.responseText;
            let results = JSON.parse(result);
            console.log(results[0].id)  
            document.querySelector('#changerId').value = results[0].id;
            document.querySelector('#changeCustomer').value = results[0].Заказчик;
            document.querySelector('#changeCarrier').value = results[0].Перевозчик;
            document.querySelector('#changeVolume').value = results[0].Объем;
            document.querySelector('#changeRawMaterial').value = results[0].Сырье;
            document.querySelector('#changeAdress').value = results[0]['Адрес'];
        }
    }
    xhttp.open('POST','/orderData',true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(`{"changeOrder": ${orderId} }`)
}