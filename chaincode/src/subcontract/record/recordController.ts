import { Status } from '../../utility/asset';
import { Context,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { RecordStruct } from './recordStruct';

export class RecordController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("record");
    }

    @Transaction(true)
    public async addRecord(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(exist){
            throw new Error("The record  with id:"+params.id+" already exists");
            }
        
        const record:RecordStruct={
            type:"record",
            id:params.id,
            doctorId:params.doctorId,
            patientId:params.patientId,
            info:{
                personalData:{
                    name:params.name,
                    surname:params.surname,
                    birth:params.birth,
                    weight:params.weight,
                    height:params.height,
                    nation:params.nation,
                    number:params.number
                },
                pastMedicalProblems:params.pastMedicalProblems,
                allergies:params.allergies,
                medicinesTaken:params.medicinesTaken
            }
        };
        return Promise.all([
        await ctx.stub.putState('record'+'-'+record.id, Buffer.from(JSON.stringify(record)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

    @Transaction(true)
    public async updateRecord(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(!exist){
            throw new Error("The record  with id:"+params.id+" does not exists");
            }
        let updatedRecord:any=exist;
        /*
        updatedRecord.info.personalData.name=params.name?(params.name):(updatedRecord.info.personalData.name);
        updatedRecord.info.personalData.surname=params.surname?(params.surname):(updatedRecord.info.personalData.surname);
        updatedRecord.info.personalData.birth=params.birth?(params.birth):(updatedRecord.info.personalData.name);
        updatedRecord.info.personalData.weight=params.weight?(params.weight):(updatedRecord.info.personalData.name);
        updatedRecord.info.personalData.height=params.height?(params.height):(updatedRecord.info.personalData.height);
        updatedRecord.info.personalData.nation=params.nation?(params.nation):(updatedRecord.info.personalData.nation);
        updatedRecord.info.personalData.number=params.number?(params.number):(updatedRecord.info.personalData.number);
        updatedRecord.pastMedicalProblems=params.pastMedicalProblems?(params.pastMedicalProblems):(updatedRecord.pastMedicalProblems);
        updatedRecord.medicinesTaken=params.medicinesTaken?(params.medicinesTaken):(updatedRecord.medicinesTaken);
        updatedRecord.allergies=params.allergies?(params.allergies):(updatedRecord.allergies);
        */
        for(const key in updatedRecord){
            if(typeof updatedRecord[key]==='object'&&!Array.isArray(updatedRecord[key])){
                console.log("ok");
                for(const key2 in updatedRecord[key]){
                    updatedRecord[key][key2]=params[key2]?(params[key2]):(updatedRecord[key][key2])
                }
            }
            else updatedRecord[key]=params[key]?(params[key]):(updatedRecord[key]);

          }
        return Promise.all([
        await ctx.stub.putState('record'+'-'+updatedRecord.id, Buffer.from(JSON.stringify(updatedRecord)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }



    @Transaction()
    public async deleteRecord(ctx: Context, id: string): Promise<Object> {
        //const params = JSON.parse(param);
        const exists= await this.get(ctx, id);
        if (!exists) {
            throw new Error(`The record ${id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('record-'+id)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});

    }


}