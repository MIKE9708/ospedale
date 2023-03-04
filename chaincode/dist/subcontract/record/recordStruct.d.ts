export declare class RecordStruct {
    readonly type: string;
    id: string;
    doctorId: string;
    personalData: {
        cf: string;
        name: string;
        surname: string;
        birth: string;
        weight: number;
        height: number;
        number: string;
        nation: string;
    };
    info: {
        pastMedicalProblems: string;
        allergies: string;
        medicinesTaken: string;
    };
    constructor(id: string, doctorId: string, personalData: {
        cf: string;
        name: string;
        surname: string;
        birth: string;
        weight: number;
        height: number;
        number: string;
        nation: string;
    }, info: {
        personalData: {
            name: string;
            surname: string;
            birth: string;
            weight: number;
            height: number;
            number: string;
            nation: string;
        };
        pastMedicalProblems: string;
        allergies: string;
        medicinesTaken: string;
    });
}
