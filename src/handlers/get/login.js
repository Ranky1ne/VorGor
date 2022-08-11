import { _dirname } from "../../../dirname.js"; 


export const login = (request,response) => {
    _dirname(response,'/static/html/login.html');
}