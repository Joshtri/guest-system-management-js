// controllers/homeController.ts

import { login } from "../services/login.services.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export async function loginPage(req, res){
    try {
        res.render('login');
    } catch (error) {
        console.error("Error fetching guest detail:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


export async function loginProcess (req, res) {
    try {
        // Get the password and divisi_name from the request body
        const { password, email } = req.body;

        // Find the user in the database based on divisi_name
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Save user information in session
            req.session.user = {
                id: user._id,
                email: user.email,
                role: user.role, // Menyimpan role pengguna ke sesi
                nama_lengkap: user.nama_lengkap // Menyimpan nama lengkap pengguna ke ses
            };

            res.redirect('/adm/dashboard');
        } else {
            res.send("Invalid password");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Login failed");
    }
};
