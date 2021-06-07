//db setup

require("dotenv").config()
const mongoose = require("mongoose")
const mongoAtlasUrl = process.env.MONGODB_URL


mongoose
  .connect(mongoAtlasUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(function () {
    console.log("Connected to DB...")
  })
  .catch(function (err) {
    console.log(err)
  }
)

const db = mongoose.connection

db.on("error", (err) => console.error("MongoDB connection error!", err))
db.once("open", () => console.log("MongoDB is now connected! @ ", mongoAtlasUrl))


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
})

userSchema.methods.validPassword = function (pwd) {
  return this.password === pwd
}

const User = mongoose.model("User", userSchema)

const findUserByName = async (name) => {
  let result = await User.findOne({ username: name })
  return result
}

const findUserById = async (id) => {
  let result = await User.findOne({ _id: id })
  return result
}

const addUser = async (newUser) => {
  let result = await newUser.save()
  return result.username + " succesfully added to database!"
}


// General db functions

const closeDb = async () => await db.close({ force: true })

const searchByFragment = async (model, attribute, fragment) => await model.find({ [attribute]: new RegExp(`.*${fragment}.*`, "i") })

module.exports = {
  closeDb,
  searchByFragment,
  Garden,
  User,
  addGarden,
  listGardens,
  deleteGardenByName,
  findGardenByAddress,
  findGardenByName,
  findUserByName,
  findUserById,
  addUser
}
