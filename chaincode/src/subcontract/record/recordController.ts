import { Status } from '../../utility/asset';
import { Context,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { get_max } from '../../utility/max_idfun';
import { RecordStruct } from './recordStruct';
import { validate_record_data } from '../../utility/max_idfun';

export class RecordController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("record");
    }

    @Transaction(true)
    public async addRecord(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id) as RecordStruct;
        const personaldata = params;
        
        if(exist.id != undefined ){
            throw new Error("Error data's not found");
        }
        
        const record:RecordStruct={
            type:"record",
            id:params.id,
            doctorId:"",
            personalData:{
                cf:personaldata.cf,
                name:personaldata.name,
                surname:personaldata.surname,
                birth:"",
                weight:personaldata.weight,
                height:personaldata.height,
                nation:"",
                number:personaldata.number,
                
            },
            info:{
                pastMedicalProblems:"",
                allergies:"",
                medicinesTaken:""
            }
        };
        return Promise.all([
        await ctx.stub.putState('record'+'-'+record.id, Buffer.from(JSON.stringify(record)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

    @Transaction(true)
    public async getPatientData(ctx:Context,id:string):Promise<Object>{
    	const record = await this.get(ctx,id);
	return {status:Status.Success,message:record};
    }
	    

    @Transaction(true)
    public async updateRecord(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(!exist){
            throw new Error("The record  with id:"+params.id+" does not exists");
            }
        let updatedRecord:any=exist;

        for(const key in updatedRecord){
            updatedRecord[key]=params[key]?(params[key]):(updatedRecord[key]);

          }
        return Promise.all([
        await ctx.stub.putState('record'+'-'+updatedRecord.id, Buffer.from(JSON.stringify(updatedRecord)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

    @Transaction(true)
    public async updateRecordPersonalData(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(!exist){
            throw new Error("The record  with id:"+params.id+" does not exists");
            }
        let updatedRecord:any=exist;

        updatedRecord["personalData"]["cf"] = params["cf"];
        updatedRecord["personalData"]["name"] = params["name"];
        updatedRecord["personalData"]["surname"] = params["surname"];
        updatedRecord["personalData"]["number"] = params["number"];

        
        return Promise.all([
        await ctx.stub.putState('record'+'-'+updatedRecord.id, Buffer.from(JSON.stringify(updatedRecord)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

    @Transaction(true)
    public async deleteRecord(ctx: Context, id: string): Promise<Object> {
        //const params = JSON.parse(param);
        const exists= await this.get(ctx, id) as RecordStruct;
        if (exists == undefined) {
            throw new Error(`The record ${id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('record-'+id)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});

    }


    @Transaction(true)
    public async freeAllPatient(ctx:Context, doctorId:string) : Promise<void> {

        const patientsRecord : any = JSON.parse(await this.getAll(ctx));
        const patientRecord = patientsRecord.filter( (val:any) => val.doctorId === doctorId);
        for (const asset of patientRecord){
            asset.doctorId=undefined;
            await ctx.stub.putState('patient'+'-'+asset.Id, Buffer.from(JSON.stringify(asset)))
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
            }
    }

    @Transaction(true)
    public async freeSinglePatient(ctx:Context, doctorId:string,patientId:string) : Promise<Object> {

        var patientRecord : any = await this.get(ctx,patientId);
        if ( patientRecord.doctorId !== doctorId){
            throw new Error("Operazione fallita");
        }
        patientRecord.doctorId="";
        
        return Promise.all([
        await ctx.stub.putState('record'+'-'+patientRecord.id, Buffer.from(JSON.stringify(patientRecord)))])
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }
    





    @Transaction(true)
    public async getFreePatient(ctx:Context) : Promise<Object> {

        const patientsRecord : any = JSON.parse( await this.getAll(ctx) );
        const patientRecord = patientsRecord.filter( (val:any) => val.doctorId === undefined || val.doctorId === '');
    
        return {status: Status.Success , message:patientRecord};
    }

    @Transaction(true)
    public async reassignPatient(ctx:Context, doctorId: string,patientId:string) : Promise<void> {

        var patientRecord : any = await this.get(ctx,patientId) ;
        //var patientRecord = patientsRecord.filter( (val:any) => val.doctorId == '') ;

        patientRecord.doctorId = doctorId;


        await ctx.stub.putState('record'+'-'+patientRecord.id, Buffer.from(JSON.stringify(patientRecord)));
    }

}
