import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
import { HospitalStruct } from "./hospitalStruct";
import { ContractExtension } from '../../utility/contractExtension';


export class HospitalController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("doctor");
    }


    @Transaction(true)
    public async addHospital(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist = await this.get(ctx,params.id);
        if(exist){
            throw new Error("The doctor  with id:"+params.id+" already exists");
            }
        
        const hospital:HospitalStruct={
            type:"hospital",
            id:params.id,
            nome:params.hospitalName,
            citta:params.citta,
            adminId:params.adminId
        };
        return Promise.all([
        await ctx.stub.putState('hospital'+'-'+hospital.id, Buffer.from(JSON.stringify(hospital)))
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


    
    @Transaction()
    public async deleteHospital(ctx: Context, param: string): Promise<Object> {
        const params = JSON.parse(param);
        const exists= await this.get(ctx, params.id);
        if (!exists) {
            throw new Error(`The hospital ${params.id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('hospital-'+params.id)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    
   
    }

}
