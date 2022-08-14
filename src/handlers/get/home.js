import { _dirname } from "../../../dirname.js"; 


export const home = (request,response) => {
    if (request.session.loggedin) {
      console.log(request.session.loggedin, request.session.username)
    _dirname(response,'/static/html/home.html');
} else {
    // Not logged in
    response.redirect('/')
  }
}