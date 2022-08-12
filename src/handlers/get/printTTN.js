import { _dirname } from "../../../dirname.js"; 


export const printTTN = (request,response) => {
    if (request.session.loggedin) {
    _dirname(response,'/static/html/printTTN.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}