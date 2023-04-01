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
    console.log(token);

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
                //withCredentials: true
            }
        );
        return res;
    }

    catch(err){

        return {error:err};
    }
}