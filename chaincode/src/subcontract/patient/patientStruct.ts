import {Object,Property} from 'fabric-contract-api';


@Object()
export class PatientStruct{
    @Property()
    public readonly type: string = "patient"
    @Property()
    public id:string;
    @Property()
    public  nome:string;
    @Property()
    public cognome:string;
    //@Property()
    //public doctorId:string;
    constructor(id:string,nome:string,cognome:string,/*doctorId:string*/){
        this.id=id;
        this.nome=nome;
        this.cognome=cognome;
        //this.doctorId=doctorId;
    }
}
