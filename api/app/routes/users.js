import express from "express"
import { Messages } from "../helpers/messages.js"
import getUser from "../middlewares/getUser.js"
import User from "../models/user.js"
import { validateEmail } from "../helpers/validations.js"

const router = express.Router()

// get all users
router.get("/", async ( req, res ) => {
  try {
    const users = await User.find()
    res.status(200).json( respSC( users ) )
  } catch( err ) {
    res.status(500).json( err )
  }
})

// get user
router.get("/:id", getUser, async ( req, res ) => {
  try {
    const user = await res.user
    res.status(200).json( user )
  } catch( err ) {
    res.status(404).json( err )
  }
})

// create user
router.post("/", async ( req, res ) => {

  console.log("hi");
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const state = req.body.state
  const address = req.body.address
  const acceptedRules = req.body.acceptedRules

  console.log(req.body)
  try {
    if (
      !acceptedRules ||
      address.length < 5 ||
      state.length < 2 ||
      !validateEmail(email) ||
      lastname.length < 3 ||
      firstname.length < 3
    ) throw Messages.wrongData

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    state: state,
    address: address
  })

    const newUser = await user.save()
    return res.status(201).json(newUser)
  } catch(err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

export default router