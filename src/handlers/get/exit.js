import { query } from "../../repository/query.js";
import { connection } from "../../repository/connection.js";

export const exit = async (request, response) => {
    if (request.session.loggedin) {
        
    request.session.loggedin = false;
    request.session.username = '';
    console.log(request.session.loggedin, request.session.username)
    } 
   
    response.redirect('/')
   
    
}
