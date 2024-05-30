import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    nama_lengkap: {
        type : String, 
        required : true,
        
    },

    email: {
        type : String, 
        required : true,
        
    },
    
    password:{
        type:String,
        required:true
    },

    role:{
        type: String,
        enum: ['Kepala','pegawai'],
        default: "Kepala",
        required: true
    }

}, {timestamps: true});


const User =  mongoose.model('User', UserSchema);

export default User;