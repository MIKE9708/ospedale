import axios from './axios_secondary'


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