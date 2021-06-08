const express = require("express")
const { findUserByName, addUser, User } = require("../models/db")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router = express.Router()

// ----------------------------------- SIGNUP -----------------------------------

router.post("/signup", 
  async (req, res) => {
    // if someone is already logged in, prompt them to logout first
    if (req.isAuthenticated()) {
      return res.json({isAlreadyLoggedIn: true})
    }
    
    let body = req.body
    console.log('req body: ', body)

    body.password = await bcrypt.hash(body.password, 10)
    body.dateSignedUp = new Date()
    
    let newUser = new User(body)

    await addUser(newUser)
    console.log("New user has been added: ", newUser)

    res.json({
      message: `
      You have successfuly signed up ${body.username}! 
      You will be logged in and directed to our home page.
      `
    })
  }
)

// ----------------------------------- LOGIN -----------------------------------

router.post("/login",
  // check if someone is already logged in
  (req, res, next) => {
    // if someone is already logged in, send back {isAlreadyLoggedIn: true}
    if (req.isAuthenticated()) {
      res.json({isAlreadyLoggedIn: true})
    } 
    // move to authentication middleware if no one is logged in
    else {
      console.log("about to log in")
      next() 
    }
  },
  // authentication middleware. sends a status code 401 if auth fails
  passport.authenticate("local"),
  // if authentication passes, the next function has access to req.user
  (req, res) => {
    res.json({username: req.user.username})
  }
)

// ----------------------------------- GET LOGGED IN USER -----------------------------------

router.get("/getloggedinuser",
  // check if someone is already logged in
  (req, res,) => {res.json({user: req.user})}
)

// ----------------------------------- LOGOUT -----------------------------------

router.get("/logout", 
  function (req, res) {
    let username = req.user?.username || 'nobody'
    let logoutResult = undefined
    let isLoggedOutNow = undefined

    console.log("is someone currently logged in? ", req.isAuthenticated())

    // logout if someone was logged in, log to console if nobody was logged in
    if (req.isAuthenticated()) {
      req.logOut() 
    }
    else {
      console.log("/user/logout was fetched, but no one was logged in")
    }

    // set the value of logoutResult to be logged
    if (req.isAuthenticated()) {
      logoutResult = `user ${username} is logged in still :(`
    }
    else {
      logoutResult = `${username} is logged out!`
    }  

    console.log("logout result: ", logoutResult)

    // send response with boolean of logout success
    isLoggedOutNow = !req.isAuthenticated()
    res.json({isLoggedOutNow})
  }
)

// ------------------------------------ UPDATE USER---------------------------------

// Update a user by id
router.put('/edit/:id', 
  async (req, res) => {
    let userToUpdate = req.body
    try {
      let data = await User.findByIdAndUpdate(req.params.id, userToUpdate);
      console.log("Updated User", data)
      res.redirect('/home');
    }
    catch(err) {
      console.log(err)
      if (err.code === 11000) {
        res.status(409).send('User ' + userToUpdate.name + ' already exists');      
      }
      else {
        res.sendStatus(500)
      }
    }
  }
)

// -------------------- check if user name is available --------------------

router.post('/check-is-name-free', 
  async (req, res) => {
    let reqName = req.body.nameData
    let isNameFree = await checkIsNameFree(reqName)
    console.log('isNameFree: ', isNameFree)

    res.json({result: isNameFree})
  }
)

// --------------------------- functions -------------------------------------
async function checkIsNameFree(desiredName) {
  let searchResult = await findUserByName(desiredName)
  return searchResult?.username !== desiredName
  
}

module.exports = router