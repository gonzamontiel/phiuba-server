var mongoose = require('mongoose');

/**
 * Representa un departamento
 */
var Schema = mongoose.Schema;
var cathedraSchema = new Schema({
    courseCode: String,
    teachers: String,
    seats: Number,
    availablePlans: String,
    availablePlanCodes: [String],
    schedule: [{
        day: {type: String},
        from: {type: String},
        to: {type: String},
        type: {type: String},
        classroomCode: {type: String}
    }]
});
cathedraSchema.index({courseCode: 1}); // To search by code

cathedraSchema.methods.getConditions = function() {
    return {courseCode: this.courseCode};
};

cathedraSchema.methods.getDescription = function() {
    // var locations = {
    //     "PC": "https://www.google.com.ar/maps/place/Facultad+de+Ingenier%C3%ADa+de+la+Universidad+de+Buenos+Aires+(Sede+PC)/@-34.617529,-58.3705057,17z/data=!4m12!1m6!3m5!1s0x95bcca98f0058631:0x98688c83fc192f2e!2sFacultad+de+Ingenier%C3%ADa+de+la+Universidad+de+Buenos+Aires+(Sede+PC)!8m2!3d-34.617529!4d-58.368317!3m4!1s0x95bcca98f0058631:0x98688c83fc192f2e!8m2!3d-34.617529!4d-58.368317",
    //     "LH": "https://www.google.com.ar/maps/place/FIUBA+-+Las+Heras/@-34.5888647,-58.3995514,17z/data=!4m12!1m6!3m5!1s0x95bcca98e2a754e5:0x24e3bacec70c7a6d!2sFIUBA+-+Las+Heras!8m2!3d-34.5888647!4d-58.3973627!3m4!1s0x95bcca98e2a754e5:0x24e3bacec70c7a6d!8m2!3d-34.5888647!4d-58.397362",
    //     "CU": "https://www.google.com.ar/maps/place/Ciudad+Universitaria+de+Buenos+Aires/@-34.5421289,-58.4466336,17z/data=!4m12!1m6!3m5!1s0x95bcb43f484b6f0f:0x445926222f7a265e!2sCiudad+Universitaria+de+Buenos+Aires!8m2!3d-34.5421289!4d-58.4444449!3m4!1s0x95bcb43f484b6f0f:0x445926222f7a265e!8m2!3d-34.5421289!4d-58.4444449"
    // }
    return "";
};

module.exports = mongoose.model('Cathedra', cathedraSchema);
