import { RecordController } from './../record/recordController';
import { DoctorController } from './../doctor/doctorController';
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
        cognome:params.cognome,
        doctorId:params.doctorId
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

@Transaction()
public async getFreePatient(ctx: Context): Promise<Object> {
    
    const patients:any = await this.getAll(ctx);
    let freePatients = patients.filter( (val) => val.doctorId===undefined )
    
    return { status: Status.Success , message:freePatients };
    
    }

@Transaction()
public async setFreePatients(ctx: Context,doctorId:string): Promise<void> {
    
    const patients:any = await this.getAll(ctx);
    let freePatients = patients.filter( (val) => val.doctorId===doctorId )
    
    for (const asset of freePatients){
        asset.doctorId=undefined;
        await ctx.stub.putState('patient'+'-'+asset.Id, Buffer.from(JSON.stringify(asset)))
        .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
        }
    }

@Transaction()
public async assignDoctor(ctx: Context,param:string): Promise<Object> {

    const params = JSON.parse(param);
    const doctorClass = new DoctorController();
    const recordClass = new RecordController();
    const doctor = await doctorClass.get(ctx,params.doctorId);
    const patient:any = await this.get(ctx,params.patientId);

    if( !patient || !doctor ){
        throw new Error(`The doctor or patient  does not exist`);
    }

    recordClass.reassignPatient(ctx,params.doctorId,params.patientId);
    //doctorClass.addPatient(ctx,params.doctorId,params.patientId);
    patient.doctorId = params.doctorId;

    return Promise.all([
    await ctx.stub.putState('patient'+'-'+patient.Id, Buffer.from(JSON.stringify(patient)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }
    
    



}

