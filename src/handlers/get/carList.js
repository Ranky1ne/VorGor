import { _dirname } from "../../../dirname.js"; 


export const carList = (request,response) => {
    if (request.session.loggedin) {
    _dirname(response,'/static/html/carList.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}