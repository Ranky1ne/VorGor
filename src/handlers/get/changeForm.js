import { _dirname } from "../../../dirname.js"; 


export const changeForm = (request,response) => {
    if (request.session.loggedin && request.session.username == 'admin') {
    _dirname(response,'/static/html/changeForm.html');
    } else if(request.session.loggedin ){
      response.redirect('/home');
    } else {
    // Not logged in
    response.redirect('/')
  }
}