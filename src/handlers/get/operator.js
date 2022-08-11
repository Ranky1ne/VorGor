import { _dirname } from "../../../dirname.js"; 


export const operator = (request,response) => {
    if (request.session.loggedin) {
    _dirname(response,'/static/html/operator.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}