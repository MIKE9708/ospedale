import { PatientController } from './../patient/patientController';
import { RecordController } from './../record/recordController';
import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
import { DoctorStruct } from "./doctor_struct";
import { ContractExtension } from '../../utility/contractExtension';

export class DoctorController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("doctor");
    }


    @Transaction(true)
    public async addDoctor(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(exist){
            throw new Error("The doctor  with id:"+params.id+" already exists");
            }
        
        const doctor:DoctorStruct={
            type:"doctor",
            id:params.id,
            patients:[],
            idHospital:params.idHospital,
            nome:params.nome,
            cognome:params.cognome
        };
        return Promise.all([
        await ctx.stub.putState('doctor'+'-'+doctor.id, Buffer.from(JSON.stringify(doctor)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


    
    @Transaction()
    public async deleteDoctor(ctx: Context, param: string): Promise<Object> {
        
        const patientClass = new PatientController();
        const params = JSON.parse(param);
        const exists= await this.get(ctx, params.id);

        if (!exists) {
            throw new Error(`The doctor ${params.id} does not exist`);
        }
         
        patientClass.setFreePatients(ctx,params.id);

        return Promise.all([
            await ctx.stub.deleteState('doctor-'+params.id)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
   
    }

    @Transaction()
    public async getMyPatientsRecord(ctx:Context, id: string) : Promise<Object> {
        const exists = await this.get(ctx,id);
        const patients_record = new RecordController();
        let res : any = await patients_record.getAll(ctx);
        if( !exists ){
            throw new Error(`The doctor ${id} does not exist`);

        }
        res = res.filter( elem => elem.doctorId === id );
        return {status:Status.Success , message: res};


    }
    
    /*
    @Transaction()
    public async addPatient(ctx:Context, doctorId: string, patientId: string) : Promise<Object> {
        
        const exists : any = await this.get(ctx,doctorId);

        exists.patients = [... exists.patients , patientId ];
        return {status:Status.Success , message:"Operazione effettuata"};
    }
    */

}
