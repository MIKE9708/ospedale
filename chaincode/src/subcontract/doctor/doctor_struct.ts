import {Object,Property} from 'fabric-contract-api';


@Object()
export class DoctorStruct{
    @Property()
    public readonly type: string = "doctor"
    @Property()
    public id:string;
    @Property()
    public  nome:string;
    @Property()
    public cognome:string;
    @Property()
    public patients:string[];
    //@Property()
    //public idHospital:string;
    constructor(id:string,nome:string,cognome:string,patients:string[]){
        this.id=id;
        this.nome=nome;
        this.cognome=cognome;
        //this.idHospital=idHospital;
        this.patients=patients;
    }
}