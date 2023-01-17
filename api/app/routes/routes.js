import express from 'express';
// import cors from "cors"
import userRoutes from "./users.js";
import { app } from '../config.js';

app.use(express.json())

// const corsOptions = {
//   origin: '*',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
//   limit: '5000mb'
// }
// app.use(cors(corsOptions)) // Use this after the variable declaration

app.use("/users", userRoutes)