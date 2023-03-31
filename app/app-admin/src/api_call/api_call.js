import axios from "./axios";

export async function getDoctors(){


    try {
        let res = await axios.get('/Admin/listDoctors/',
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

export async function getPatients(){


    try {
        let res = await axios.get('/Admin/listPatients/',
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

export async function removePatients(id){
    let obj = {id:id,role:"patient"};
    try {
        let res = await axios.post('/Admin/deleteUser/',JSON.stringify(obj),
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

export async function removeDoctor(id){
    let obj = {id:id,role:"doctor"};
    try {
        let res = await axios.post('/Admin/deleteUser/',JSON.stringify(obj),
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
// #######################################################################OK###############################################################################
export async function addAdmin(obj){

    try {
        let res = await axios.post('/Admin/addAdmin/',JSON.stringify(obj),
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


export async function checkCode(code){
    try{
        let res = await axios.get(`/checkCode/ad/${code}` ,
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
        let res = await axios.post('/Admin/activateAdminAccount/',JSON.stringify(obj),
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