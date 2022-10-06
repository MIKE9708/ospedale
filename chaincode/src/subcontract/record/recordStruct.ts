import { Object, Property, Info } from 'fabric-contract-api';

@Object()
export class RecordStruct{
    @Property()
    public readonly type: string = "record"
    @Property()
    public id:string;
    @Property()
    public  doctorId:string;
    @Property()
    public patientId:string;
    @Property()
    public info:{
        personalData:{
            name:string,
            surname:string,
            birth:string,
            weight:number,
            height:number,
            number:string,
            nation:string
        }
        pastMedicalProblems:[string],
        allergies:[string],
        medicinesTaken:[string]
    };

    constructor(id:string,doctorId:string,patientId:string,info:{
        personalData:{
            name:string,
            surname:string,
            birth:string,
            weight:number,
            height:number,
            number:string,
            nation:string
        }
        pastMedicalProblems:[string],
        allergies:[string],
        medicinesTaken:[string]})
    {
        this.id=id;
        this.doctorId=doctorId;
        this.patientId=patientId;
        this.info=info;
    }
}