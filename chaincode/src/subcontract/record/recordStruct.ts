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
    public personalData:{
        name:string,
        surname:string,
        birth:string,
        weight:number,
        height:number,
        number:string,
        nation:string
    }
    @Property()
    public info:{
        pastMedicalProblems:[string],
        allergies:[string],
        medicinesTaken:[string]
    };

    constructor(id:string,doctorId:string,
        personalData:{
            name:string,
            surname:string,
            birth:string,
            weight:number,
            height:number,
            number:string,
            nation:string
            },
        info:{
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
        this.personalData=personalData;
        this.info=info;
    }
}