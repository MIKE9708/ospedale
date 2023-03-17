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
    let obj = {id:id};
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