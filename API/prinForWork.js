
 
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

let now = new Date();
now= now.toString();
let dottDel= now.indexOf('G');
now = now.slice(0,dottDel-1);



function ttn(){

    
    
    let xhttp = new XMLHttpRequest();
  
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let carId = $_GET(['carId'])
                let result = this.responseText;
                let results = JSON.parse(result);
               
                results.forEach(elem => {
                    
                    if(carId == elem.id){
                        for(let key in elem){
                            let carData = [];
                         carData.push(elem[key]) ;
                        
                            
                        }
                        document.getElementById('date-for-pirnt').textContent= now;
                        document.getElementById('volumeCar').textContent= `${carData[4]}`;
                        setTimeout(window.print(),1000)
                       
                    }
                })
            }}
        
            xhttp.open('GET','/carListData',true);
            xhttp.send()
        

            
}

// window.onafterprint = ()=>{
//     window.close()
//    }

