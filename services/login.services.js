// services/authService.js
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export async function login(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return false; // Pengguna tidak ditemukan
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return false; // Kata sandi tidak cocok
        }

        return true; // Berhasil login
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error('Failed to login');
    }
}
