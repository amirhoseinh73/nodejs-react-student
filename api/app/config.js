import dotenv from 'dotenv';
import express from "express"

dotenv.config()

export const app = express()

export const DB_URL = process.env.DB_URL || ""

export const PORT = process.env.APP_PORT || 4000