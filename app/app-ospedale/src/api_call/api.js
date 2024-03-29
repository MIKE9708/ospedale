import axios from "./axios";

export  async function login(data){
    try{
        let res=await axios.post('/Login',JSON.stringify(data),
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
            }

    catch (err) {

        return {error:err};
    }
}

export  async function logout_fun(){
    try{
        let res=await axios.get('/Logout',
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log(res);
        return res;
            }

    catch (err) {

        return {error:err};
    }
}


// per avere il token se refresho la pagina

export async function refreshToken(){

    try{
        let res = await axios.get('/refresh/',{withCredentials: true});
        return res;
    }

    catch (err) {

        return {error:err};
    }
}



export async function getDoctorPatients(id,token,role){

    const obj = {role:role}

    try {
        let res = await axios.post('/Dottore/' + id + '/Pazienti',JSON.stringify(obj),
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}


export async function getFreePatients(token){
    
    try {
        let res = await axios.get('/Dottore/freePatients',
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}



export async function updateRecord(id ,obj,token){

    try {
        let res = await axios.post('/Dottore/UpdateRecord/' + id ,JSON.stringify(obj),
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }

    
}


export async function unfollowPatient(obj , token) {
    try {
        let res = await axios.post('/Dottore/UnfollowPatient/' ,JSON.stringify(obj),
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}


export async function addPatient ( data, token ){
   
    try {
        let res = await axios.post('/Dottore/followPatient' ,JSON.stringify(data),
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}


export async function  getPatient(token){
    try {
        let res = await axios.get('/Record/',
            {
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}

export async function recoverCredentials(email){
    try{
        let res = await axios.post('/recoverCredentials' ,JSON.stringify({email:email}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        );
        return res;
    }
    catch(err){

        return {error:err};
    }
}

export async function checkCode(code){
    try{
        let res = await axios.get(`/checkCode/${code}` ,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        );
        return res;
    }
    catch(err){

        return {error:err};
    }
}

export async function resetPassword(body){
    try{
        let res = await axios.post('/resetPassword' ,JSON.stringify(body),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        );
        return res;
    }
    catch(err){

        return {error:err};
    }
}

export async function device_code_check(data){
    try{
        let res = await axios.post('/checkDeviceCode/',JSON.stringify(data),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
    }

    catch (err) {
        //console.log(err)
        return {error:err};
    }
}