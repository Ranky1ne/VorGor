import { _dirname } from "../../../dirname.js"; 


export const changeForm = (request,response) => {
    if (request.session.loggedin) {
    _dirname(response,'/static/html/changeForm.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}