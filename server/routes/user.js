require('dotenv').config()
const express = require("express")
const { findUserByName, addUser, User } = require("../models/db")
const bcrypt = require("bcrypt")
const passport = require("passport")
const fetch = require('node-fetch')
const {google} = require('googleapis')
const fs = require("fs")
const formidable = require('formidable');
const router = express.Router()

// authorizing google API calls
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLOUD_ID,
  process.env.GOOGLE_CLOUD_SECRET,
)

oauth2Client.setCredentials({ 
  refresh_token: process.env.GOOGLE_CLOUD_REFRESH_TOKEN 
})

// define google drive instance
const gDrive = google.drive({ version: 'v3', auth: oauth2Client })

// ------------------------ INITIATE GOOGLE OATH2 CLIENT -----------------------------------
// (one-time setup, no longer needed)

// router.get('/oath-client', (req, res) => {
//   let redirect_uri = "http://localhost:3000/api/user/receive-token"
//   let scope = 'https://www.googleapis.com/auth/drive.file'

//   let authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' 
//     + `client_id=${process.env.GOOGLE_CLOUD_ID}&` 
//     + `redirect_uri=${redirect_uri}&` 
//     + `response_type=code&` 
//     + `scope=${scope}&` 
//     + `access_type=offline`

//   res.redirect(authUrl)
//   // after user gives consent, the router block just below will handle the auth code, and get the 
//   // final tokens needed to call the API
// })

// // ------------------------- RECEIVE GOOGLE ACCESS AND REFRESH TOKENS ------------------------
// // (one-time setup, no longer needed)

// router.get("/receive-token", async (req, res) => {
//   let code = req.query.code
//   let redirect_uri = "http://localhost:3000/api/user/receive-token"

//   console.log("GET /api/user/receive-token")
//   console.log('auth code: ', code)

//   let url = "https://oauth2.googleapis.com/token?" 
//     + `client_id=${process.env.GOOGLE_CLOUD_ID}&`
//     + `client_secret=${process.env.GOOGLE_CLOUD_SECRET}&`
//     + `code=${code}&`
//     + `redirect_uri=${redirect_uri}&`
//     + 'grant_type=authorization_code'

//   let response = await fetch(url, {method: 'POST'})
//   let resObject = await response.json()

//   console.log('first-time auth tokens resObject: ', resObject)

//   // save tokens to permanent storage - MONGODB??

//   res.redirect("http://localhost:4444/")
// })

// --------------------------- UPLOAD PHOTO OR VIDEO TO GOOGLE DRIVE ----------------------

router.post('/google-drive-upload', async (req, res) => {
  const form = formidable({ keepExtensions: true, multiples: true })

  console.log('before parse block ran!')
  let isSuccessful 

  try {
    form.parse(req, async (err, fields, files) => {
      console.log('files: ', files)
      // define internal filepath and MIME type for the incoming file
      let newFile = files?.file
      let newFileType = newFile?.type
      let newFilePath = newFile?.path
  
      // handle potential errors first
      if (err) console.log(err)
      if (!newFilePath) console.log('no filePath')
      if (!newFile?.size) console.log('file size 0')
      if (err || !newFile?.size) return isSuccessful = false
  
      // build data for gDrive.files.create() 
      let requestBody = {
        name: newFile?.name,
        mimeType: newFileType
      }
      let media = {
        mimeType: newFileType,
        body: fs.createReadStream(newFilePath)
      }
  
      console.log('requestBody: ', requestBody)
      console.log('media: ', media)
  
      // make files.Create() request
      let driveUpload = await gDrive.files.create({ requestBody, media })
  
      console.log('drive upload response:', driveUpload)
  
      // new file id 
      let newFileId = driveUpload?.data?.id
  
      // set permissions for public access
      await gDrive.permissions.create({
        fileId: newFileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        }
      })
  
      // get public view link
      let getLink = await gDrive.files.get({
        fileId: newFileId,
        fields: 'webViewLink',
      })
      let webViewLink = getLink?.data?.webViewLink
      console.log('view link response:', webViewLink)

      // add webviewlink to appropriate mongo document

      // set success
      return isSuccessful = true

  
    })



    // return response
    res.json({ success: isSuccessful })
    

  }
  catch(err) {
    console.log("drive upload error: ", err)
    res.json({ success: false })
  }
})

// ----------------------------------- SIGNUP -----------------------------------

router.post("/signup", 
  async (req, res) => {
    // if someone is already logged in, prompt them to logout first
    if (req.isAuthenticated()) {
      return res.json({ isAlreadyLoggedIn: true })
    }
    
    let body = req.body

    body.password = await bcrypt.hash(body.password, 10)
    body.dateSignedUp = new Date().toString()
    body.students = []
    body.payments = {
      remainingHoursPaid: 0,
      totalHoursStudied: 0,
      paymentHistory: []
    }
    body.settings = {
      billing: {
        existingPaymentMethods: [],
        recurringPayments: []
      },
      colorScheme: 'default',
      contact: {
        emails: body.emails,
        phoneNumbers: body.phoneNumbers,
        addresses: body.addresses
      }
    }
    
    let newUser = new User(body)
    await addUser(newUser)
    
    console.log("New user has been added: ", body.username)

    res.json({
      message: `
      Thanks for signing up ${body.username}! 
      You will be logged in and directed to my home page.
      `
    })
  }
)


// ----------------------------------- GET ONE USER ----------------------------

router.get('/single-user/:username',
  async (req, res) => {
    try { res.json({ user: await User.findOne({ username: req.params.username }) }) }

    catch(err) {console.log(`Error getting user ${req.params.username}:`, err)}
  }
)
// ----------------------------------- LOGIN -----------------------------------

router.post("/login",
  // authentication middleware. sends a status code 401 if auth fails
  passport.authenticate("local"),
  // if authentication passes, the next function has access to req.user
  (req, res) => {
    res.json({ user: req.user })
  }
)

// ----------------------------------- GET LOGGED IN USER -----------------------------------

router.get("/getloggedinuser",
  // check if someone is already logged in
  (req, res,) => {res.json({ user: req.user })}
)

// ----------------------------------- LOGOUT -----------------------------------

router.get("/logout", 
  function (req, res) {
    let username = req.user?.username || 'nobody'
    let isLoggedOutNow = undefined

    console.log("is someone currently logged in? ", req.isAuthenticated())

    // logout if someone was logged in, log to console if nobody was logged in
    if (req.isAuthenticated()) req.logOut() 
    else console.log("/user/logout was fetched, but no one was logged in")
    
    // log the success of logout  
    console.log('user', req.isAuthenticated() ? `${username} logged in still` : `${username} logged out`)

    // send response with boolean of logout success
    isLoggedOutNow = !req.isAuthenticated()
    res.json({ isLoggedOutNow })
  }
)

// ------------------------------------ UPDATE USER---------------------------------

// Update a user by id
router.put('/edit/:id', async (req, res) => {
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
})

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