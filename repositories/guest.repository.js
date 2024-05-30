import Guest from '../models/guest.model.js';

class GuestRepository {
  async findById(id) {
    return Guest.findById(id).exec();
  }
  
  async findAll() {
    return Guest.find({}).exec();
  };

}

export default new GuestRepository();
