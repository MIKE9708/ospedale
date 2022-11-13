import { RecordController } from './../record/recordController';
import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
import { DoctorStruct } from "./doctor_struct";
import { ContractExtension } from '../../utility/contractExtension';

export class DoctorController extends ContractExtension{
    constructor(){
        super("doctor");
    }

    @Transaction(true)
    public async InitLedger( ctx:Context ) : Promise <void> {
        
        const doctor : { type:"doctor",id:string,patients:string[],nome:string,cognome:string }[] = [
            
            {
                type:"doctor",
                id:"2",
                patients:["4"],
                nome:"Luca",
                cognome:"Sarchese"
            },

            {
                type:"doctor",
                id:"3",
                patients:[],
                nome:"Mario",
                cognome:"Rossi"
            }
        ];

        const patient : 
        { 
            type:"record",
            id:string,
            doctorId:string,
            personalData:{
                cf:string,
                name:string,
                surname:string,
                birth:string,
                weight:number,
                height:number,
                number:string,
                nation:string,
                nascita: string
            },
            info:{
                pastMedicalProblems:string,
                allergies:string,
                medicinesTaken:string
            } 

        }[] = 
        
        [
            {
                type:"record",
                id:"4",
                doctorId:"2",
                personalData:{
                    cf:"GNINRC89S12F158P",
                    name:"Enrico",
                    surname:"Gini",
                    birth:"12/11/1989",
                    weight:72.6,
                    height:1.80,
                    number:"3267178194",
                    nation:"Italia",
                    nascita:"Messina"
                },
                info:{
                    pastMedicalProblems:"",
                    allergies:"Celiachia,Polvere",
                    medicinesTaken:""
                }
            },

            {
                type:"record",
                id:"5",
                doctorId : '',
                personalData:{
                    cf:"MRLMRA72S12C351G",
                    name:"Mario",
                    surname:"Merola",
                    birth:"12/11/1972",
                    weight:60.00,
                    height:1.60,
                    number:"3267173424",
                    nation:"Italia",
                    nascita:"Catania"
                },
                info:{
                    pastMedicalProblems:"Diabete tipo 1",
                    allergies:"Pesche",
                    medicinesTaken:"Insulina Lispro"
                }
            }

        ];

    for (const asset of doctor){

        await ctx.stub.putState('doctor'+'-'+ asset.id, Buffer.from(JSON.stringify(asset)));

        }

    for (const asset of patient){

            await ctx.stub.putState('record'+'-'+ asset.id, Buffer.from(JSON.stringify(asset)));
    
        }
    
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
            nome:params.nome,
            cognome:params.cognome
        };
        return Promise.all([
        await ctx.stub.putState('doctor'+'-'+doctor.id, Buffer.from(JSON.stringify(doctor)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


    
    @Transaction(true)
    public async deleteDoctor(ctx: Context, param: string): Promise<Object> {
        
        const recordClass = new RecordController();
        const params = JSON.parse(param);
        const exists= await this.get(ctx, params.id);

        if (!exists) {
            throw new Error(`The doctor ${params.id} does not exist`);
        }
        
        recordClass.freePatient(ctx,params.doctorId);
        
        return Promise.all([
            await ctx.stub.deleteState('doctor-'+params.id)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
   
    }

    @Transaction(true)
    public async getMyPatientsRecord(ctx:Context, id: string) : Promise<Object> {
        const exists = await this.get(ctx,id);
        const patients_record = new RecordController();
        let res : any = JSON.parse( await patients_record.getAll(ctx) );
        if( !exists ){
            throw new Error(`The doctor ${id} does not exist`);

        }
        if(res.length > 0) {
            res = res.filter( (elem:any) => elem.doctorId === id );
            return {status:Status.Success , message: res};
        }
        else return {status:Status.Success , message: []};


    }
    
    
    @Transaction(true)
    public async addPatient(ctx:Context, param:string) : Promise<Object> {
        
        const params = JSON.parse(param);
        const recordClass = new RecordController(); 
        await recordClass.reassignPatient(ctx,params.doctorId,params.patientId);
        const exists : any = await this.get(ctx,params.doctorId);
        if(!exists){
            throw new Error("The doctor does not exitsts");
        }
        let  updatedValue :any = exists;
        updatedValue.patients = [ ... exists.patients, params.patientId ];


        return Promise.all([ await ctx.stub.putState('doctor-'+params.doctorId, Buffer.from(JSON.stringify(updatedValue)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }
    

}
