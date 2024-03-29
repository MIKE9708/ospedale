import axios from "./axios";

export async function getDoctors(token){


    try {
        let res = await axios.get('/listDoctors/',
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

export async function getPatients(token){

    try {
        let res = await axios.get('/listPatients/',
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

export async function getAdmins(token){

    try {
        let res = await axios.get('/getAdminList/',
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

export async function removeAdmin(id,token){
    let obj = {id:id};
    try {
        let res = await axios.post('/removeAdmin',JSON.stringify(obj),
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

export async function updatePatient(data,token){
    try {
        let res = await axios.post('updatePatient/',JSON.stringify(data),
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


export async function updateDoctor(data,token){
    try {
        let res = await axios.post('updateDoctor/',JSON.stringify(data),
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


export async function removePatients(id,token){
    let obj = {id:id,role:"patient"};
    try {
        let res = await axios.post('deleteUser/',JSON.stringify(obj),
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

export async function removeDoctor(id,token){
    let obj = {id:id,role:"doctor"};
    try {
        let res = await axios.post('/deleteUser/',JSON.stringify(obj),
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
// #######################################################################OK###############################################################################
export async function addUser(obj,token){

    try {
        let res = await axios.post('/addUser/',JSON.stringify(obj),
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

export async function addAdmin(obj,token){

    try {
        let res = await axios.post('/addAdmin/',JSON.stringify(obj),
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


export async function activateAccount(obj){
    try {
        let res = await axios.post('/activateAdminAccount/',JSON.stringify(obj),
            {
                headers: { 'Content-Type': 'application/json' },
                //withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}


export async function resetPassword(obj){
    try {
        let res = await axios.post('/resetPassword/',JSON.stringify(obj),
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


export async function recoverCredentials(obj){
    try {
        let res = await axios.post('/recoverCredentials/',JSON.stringify(obj),
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

export async function logout_fun(){
    try{
        let res = await axios.get(`/Logout` ,
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

export async function login(obj){
    try {
        let res = await axios.post('/Login/',JSON.stringify(obj),
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


export async function refreshToken(){

    try{
        let res = await axios.get('/adRefresh/',{withCredentials: true});
        return res;
    }

    catch (err) {
        //console.log(err)
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