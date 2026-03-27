import express, { Router, Request, Response } from 'express';
import { register, login } from '../controlleur/auth.controller';

const routerAuth: Router = express.Router();

routerAuth.post('/register', register);
routerAuth.post('/login', login);

export default routerAuth;