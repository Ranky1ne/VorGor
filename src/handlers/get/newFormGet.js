import { _dirname } from "../../../dirname.js"; 


export const newFormGet = (request,response) => {
    if (request.session.loggedin) {
    _dirname(response,'/static/html/newForm.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}