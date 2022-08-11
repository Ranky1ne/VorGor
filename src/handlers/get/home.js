import { _dirname } from "../../../dirname.js"; 


export const home = (request,response) => {
    if (request.session.loggedin) {
    _dirname(response,'/static/html/home.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}