import express from 'express';
import cors from "cors"
import bodyParser from "body-parser"
import multer from "multer"
import userRoutes from "./users.js";
import { app } from '../config.js';

app.use(express.json())

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

const forms = multer();

app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoutes)