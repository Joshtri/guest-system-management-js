import guestService from '../services/guest.services.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function detailGuestController(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop();
    if (!id) {
      return res.status(400).send("Bad Request");
    }

    const guest = await guestService.detailGuest(id);
    res.render('detail_guest', { guest });
  } catch (err) {
    console.error("Error fetching guest detail:", err);
    res.status(500).send("Internal Server Error");
  }
}

export async function allGuestController(req, res) {
  try {
    const guests = await guestService.getAllGuest();
    const templatePath = join(__dirname, '../views/data_guest.ejs');
    const template = await readFile(templatePath, 'utf-8');
    res.render('data_guest', { guests });

  } catch (err) {
    console.error("Error fetching guest data:", err);
    res.status(500).send("Internal Server Error");
  }
}
