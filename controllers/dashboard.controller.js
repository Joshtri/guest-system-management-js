
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function dashboardController(req, res) {
    try {
    const userData = req.session.user;
      const url = new URL(req.url, `http://${req.headers.host}`);
      const id = url.pathname.split('/').pop();
      if (!id) {
        return res.status(400).send("Bad Request");
      }
  
      const title = "Dashboard Page"
    //   const guest = await guestService.detailGuest(id);
      res.render('dashboard', { title, user: userData});
 
    } catch (err) {
      console.error("Error fetching guest detail:", err);
      res.status(500).send("Internal Server Error");
    }
}

export async function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Logout failed");
        }
        res.redirect('/'); // Redirect ke halaman login setelah logout
    });
}