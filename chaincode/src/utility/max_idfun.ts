import { RecordStruct } from '../subcontract/record/recordStruct';

export function get_max(data:[RecordStruct],param:string):string{
    var max_id:number =0;
    for(var i=0; i<data.length;i++){

        var elem:RecordStruct = data[i];

        if(parseInt(elem[param]) > max_id){
            max_id = parseInt(elem[param]);
        }
    }
    max_id += 1;
    return max_id.toString();
}


export function validate_record_data(my_data:RecordStruct,data:[RecordStruct]):boolean{
    var res = false;
    for(var elem of data){

        if( my_data.personalData['cf'] == elem.personalData['cf'] ){
            res = true;
            break;
        }
        else if(my_data.personalData['number'] == elem.personalData['number']){
            res = true;
            break;            
        }
    }
    return res;
}