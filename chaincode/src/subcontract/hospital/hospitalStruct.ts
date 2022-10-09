import {Object,Property} from 'fabric-contract-api';


@Object()
export class HospitalStruct{
    @Property()
    public readonly type: string = "hospital"
    @Property()
    public id:string;
    @Property()
    public  nome:string;
    @Property()
    public  adminId:string;
    @Property()
    public citta:string;
    constructor(id:string,nome:string,citta:string,adminId:string){
        this.id=id;
        this.nome=nome;
        this.citta=citta;
        this.adminId = adminId;
    }
}



