import {Object,Property} from 'fabric-contract-api';


@Object()
export class AdminHospitalStruct{
    @Property()
    public readonly type: string = "adminHospital"
    @Property()
    public id:string;
    @Property()
    public  nome:string;
    @Property()
    public cognome:string;
    constructor(id:string,nome:string,cognome:string){
        this.id=id;
        this.nome=nome;
        this.cognome=cognome;
    }
}