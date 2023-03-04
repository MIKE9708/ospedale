"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_record_data = exports.get_max = void 0;
function get_max(data, param) {
    var max_id = 0;
    for (var i = 0; i < data.length; i++) {
        var elem = data[i];
        if (parseInt(elem[param]) > max_id) {
            max_id = parseInt(elem[param]);
        }
    }
    max_id += 1;
    return max_id.toString();
}
exports.get_max = get_max;
function validate_record_data(my_data, data) {
    var res = false;
    for (var elem of data) {
        if (my_data.personalData['cf'] == elem.personalData['cf']) {
            res = true;
            break;
        }
        else if (my_data.personalData['number'] == elem.personalData['number']) {
            res = true;
            break;
        }
    }
    return res;
}
exports.validate_record_data = validate_record_data;
//# sourceMappingURL=max_idfun.js.map