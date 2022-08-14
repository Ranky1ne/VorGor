import { _dirname } from "../../../dirname.js"; 


export const carList = (request,response) => {
    if (request.session.loggedin && request.session.username == 'admin') {
    _dirname(response,'/static/html/carList.html');
} else if(request.session.loggedin ){
    // Not logged in
    _dirname(response,'/static/html/carList.html');
  } else {
    response.redirect('/')
  }
}