import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  nama_lengkap: {
    type: String, 
    required: true,
  },
  asal: {
    type: String,
    required: true,
  },
  keperluan: {
    type: String, 
    required: true,
  },
  orang_dituju: {
    type: String, 
    required: true,
  },
  no_hp: {
    type: String, 
    required: true,
  },

  signature:{
    type: String
  }
}, { timestamps: true });
const Guest = mongoose.model('Guest', GuestSchema);

export default Guest;
