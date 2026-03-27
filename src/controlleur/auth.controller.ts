import db from '@/lib/db';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // On hache le mot de passe pour la sécurité
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "Utilisateur créé !", userId: user.id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Chercher l'utilisateur par son email
        const user = await db.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // 2. Comparer le mot de passe envoyé avec le haché en base
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // 3. Créer le Token JWT (valide 24h)
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'secret_temporaire_123', // Utilise une variable d'env en prod
            { expiresIn: '24h' }
        );

        // 4. Envoyer le token au client (Insomnia/Frontend)
        return res.json({
            message: "Connexion réussie",
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });

    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};