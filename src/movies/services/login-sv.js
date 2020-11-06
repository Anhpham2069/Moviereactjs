import axios from 'axios'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

const KEY_JWT = 'vccorp_2020';
const USER = 'trieunt';
const PASS = 'reactjst3h';

const PAYLOAD = {
    iss : "http://t3h-edu.herokuapp.com/",
    aud : "http://t3h-edu.herokuapp.com/",
    iat : 1356999524,
    nbf : 1357000000
  }
  const createToken = () =>{
      const token = jwt.sign(PAYLOAD,KEY_JWT);
      return token;
  }
  export const loginUser = async (user,pass) =>{
    pass = md5(`${KEY_JWT}|||${pass}`);
    const token = createToken();
    const response = await axios({
    url:`https://cors-anywhere.herokuapp.com/http://t3h-edu.herokuapp.com/api/learning/v1/login`,
    method: 'POST',
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "Authorization": `${token}`
      },
      data: {username: user, password: pass}
    });
    const result = await response.status === 200 ? await response.data: {};
    return result; 
}
export const saveTokenLogin = (token) =>{
    if(token !== undefined && token !== null && token !== ''){
        localStorage.setItem('token', JSON.stringify(token))
    }
}
export const removeTokenLogin = () =>{
    localStorage.removeItem('token')
}
export const getTokenLogin = () =>{
    return localStorage.getItem('token')
}
export const decodeTokenLogin = () =>{
    const token = getTokenLogin();
    let decodeToken = null
    if(token !== undefined && token !== null && token !== ''){
        decodeToken = jwt.verify(JSON.parse(token),KEY_JWT)
    }
    return decodeToken;
}
export const getUserName = () =>{
    const inforUser = decodeTokenLogin();
    let username = null;
    if(inforUser!==null){
        username = inforUser.username;
    }
    
    return username;
}
export const isLogin = () =>{
    const token = getTokenLogin();
    if(token !== undefined && token !== null && token !== ''){
        return true;
    }
    return false;

}