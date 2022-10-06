import { PatientStruct } from './patientStruct';
import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';


export class PatientController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("patient");
    }


@Transaction(true)
public async addPatient(ctx:Context,param:string):Promise<Object>{
    const params = JSON.parse(param);
    const exist = await this.get(ctx,params.id);
    if(exist){
        throw new Error("The patient  with id:"+params.id+" already exists");
        }
    
    const patient:PatientStruct={
        type:"patient",
        id:params.id,
        nome:params.nome,
        cognome:params.cognome
    };
    return Promise.all([
    await ctx.stub.putState('patient'+'-'+patient.id, Buffer.from(JSON.stringify(patient)))
    ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
}



@Transaction()
public async deletePatient(ctx: Context, param: string): Promise<Object> {
    const params = JSON.parse(param);
    const exists= await this.get(ctx, params.id);
    if (!exists) {
        throw new Error(`The patient ${params.id} does not exist`);
    }
    return Promise.all([
        await ctx.stub.deleteState('patient-'+params.id)
       ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});

    }

}

