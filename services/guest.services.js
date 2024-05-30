import guestRepository from '../repositories/guest.repository.js';

class GuestService {
  async detailGuest(id) {
    const guest = await guestRepository.findById(id);
    if (!guest) {
      throw new Error("Guest not found");
    }
    return guest;
  }

  async getAllGuest(){
    const guests = await guestRepository.findAll();

    if(guests.length === 0) throw new Error("no guest found.")
        return guests;
  }
}

export default new GuestService();
