import { Messages } from "../helpers/messages.js"
import User from "../models/user.js"

const getUser = async ( req, res, next ) => {
  try {
    const user = await User.findById( req.params.id )
    if ( ! user ) return res.status(404).json({
      status: 404,
      message: Messages.userNotFound
    })

    res.getUser = user
    next()
  } catch( err ) {
    res.status(500).json({
      status: 500,
      message: err.message ? err.message : Messages.failed
    })
  }
}

export default getUser