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



export async function getDoctorPatients(id,token){


    try {
        let res = await axios.get('/Dottore/' + id + '/Pazienti',
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


export async function unfollowPatient(id , token) {
    try {
        let res = await axios.get('/Dottore/DeleteRecord/' + id ,
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