var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema (
    {
        "username": {type: String},
        "email": {type: String},
        "isVerified": { type: Boolean, default: false },
        "password": {type: String},
        "first_name": {type: String},
        "last_name": {type: String},
        "dob": {type: Date},
        "measurements": [
            {
                "sensor_id": {type: String},
                "timestamp" : {type: Date},
                "sensor_reading": {type: Number}
            }
        ]
    }
);


module.exports = mongoose.model('User', UserSchema);