// services/authService.js
import bcrypt from 'bcrypt';
import UserRepository from '../models/user.model.js';

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }
}

export default UserRepository;