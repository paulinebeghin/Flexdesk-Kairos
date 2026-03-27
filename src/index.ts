import express from 'express';
import cors from 'cors';
// Importe tes routes ici (adapte le chemin selon ton projet)
import routerSpace from './routes/space.route';
import routerBooking from './routes/booking.routes';
import routerAuth from './routes/auth.routes';


const app = express();
const PORT = 3000;

// Middlewares indispensables
app.use(cors()); // Autorise les requêtes du Front-end
app.use(express.json()); // Permet de lire le JSON envoyé dans le Body (important pour Insomnia !)

// Déclaration de tes routes
app.use('/api/spaces', routerSpace);
app.use('/api/bookings', routerBooking);
app.use('/api/auth', routerAuth);

// Route de test rapide
app.get('/', (req, res) => {
  res.send('Le serveur Kairos est en ligne ! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});