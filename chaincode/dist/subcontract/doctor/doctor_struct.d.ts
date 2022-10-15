export declare class DoctorStruct {
    readonly type: string;
    id: string;
    nome: string;
    cognome: string;
    patients: [];
    idHospital: string;
    constructor(id: string, nome: string, cognome: string, idHospital: string, patients: []);
}
