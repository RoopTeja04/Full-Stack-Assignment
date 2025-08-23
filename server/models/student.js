const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const StudentSchema = new mongoose.Schema({

    firstName: { type: String, required:true },
    lastName: { type: String, required:true } ,
    emailID: { type: String, required:true } ,
    password: { type: String, required:true } ,
    score: { type: Number, default:0 },
    attempt: { type:Number, default:0 }

})

StudentSchema.pre("save", async function (next) {

    if(!this.isModified("password")){
        return next();
    }

    const Hash = await bycrypt.genSalt(10);

    this.password = await bycrypt.hash(this.password, Hash);

    next();
    
})

module.exports = mongoose.model("student", StudentSchema);