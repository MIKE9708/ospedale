import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { AdminHospitalStruct } from './adminHospitalStruct';


export class AdminHospitalController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("doctor");
    }


    @Transaction(true)
    public async addAdminHospital(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(exist){
            throw new Error("The doctor  with id:"+params.id+" already exists");
            }
        
        const adminHospital:AdminHospitalStruct={
            type:"adminHospital",
            id:params.id,
            nome:params.nome,
            cognome:params.cognome
        };
        return Promise.all([
        await ctx.stub.putState('adminHospital'+'-'+adminHospital.id, Buffer.from(JSON.stringify(adminHospital)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


    
    @Transaction()
    public async deleteAdminHospital(ctx: Context, param: string): Promise<Object> {
        const params = JSON.parse(param);
        const exists= await this.get(ctx, params.id);
        if (!exists) {
            throw new Error(`The admin of the hospital ${params.id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('adminHospital-'+params.id)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
   
    }

}
