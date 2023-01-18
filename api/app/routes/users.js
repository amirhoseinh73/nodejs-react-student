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
    return res.status(200).json({
      status: 200,
      message: Messages.success,
      data: users
    })
  } catch( err ) {
    return res.status(500).json({
      status: 500,
      message: Messages.failed
    })
  }
})

// get user
router.get("/:id", getUser, async ( req, res ) => {
  try {
    const user = await res.user
    return res.status(200).json({
      status: 200,
      message: Messages.success,
      data: user
    })
  } catch( err ) {
    return res.status(404).json({
      status: 404,
      message: err.message ? err.message : Messages.failed
    })
  }
})

// create user
router.post("/", async ( req, res ) => {

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const state = req.body.state
  const address = req.body.address
  const acceptedRules = req.body.acceptedRules

  try {
    if (
      !acceptedRules ||
      address.length < 5 ||
      state.length < 2 ||
      !validateEmail(email) ||
      firstName.length < 3 ||
      lastName.length < 3
    ) throw Messages.wrongData

  const user = new User({
    firstname: firstName,
    lastname: lastName,
    email: email,
    state: state,
    address: address
  })

    const newUser = await user.save()
    return res.status(201).json({
      status: 201,
      message: Messages.userCreated,
      data: newUser
    })
  } catch(err) {
    return res.status(400).json({
      status: 400,
      message: err.message ? err.message : Messages.failed
    })
  }
})

export default router