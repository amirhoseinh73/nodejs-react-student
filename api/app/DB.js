import mongoose from "mongoose"
import { DB_URL } from "./config.js"

export const dbConnection = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect( DB_URL )
  const DB = mongoose.connection
  DB.on( "error", (err) => console.error(err) )
  DB.once( "open", () => console.log( "Connected to DB" ) )
}