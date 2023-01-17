import { Messages } from "../helpers/messages.js"
import User from "../models/user.js"

const getUser = async ( req, res, next ) => {
  let user

  try {
    user = await User.findById( req.params.id )
    if ( ! user ) return res.status(404).json(Messages.userNotFound)
  } catch( err ) {
    res.status(500).json(err)
  }

  res.getUser = user
  next()
}

export default getUser