//db setup

require("dotenv").config()
const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .catch((err) => console.log(err))

const db = mongoose.connection

db.on("error", (err) => console.error("MongoDB connection error!", err))
db.once("open", () => console.log("MongoDB is now connected!"))

// User model and functions

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  dateSignedUp: String
})

userSchema.methods.validPassword = function (pwd) {
  return this.password === pwd
}

const User = mongoose.model("User", userSchema)

const findUserByName = async (name) => await User.findOne({ username: name })

const findUserById = async (id) => await User.findOne({ _id: id })

const addUser = async (newUser) => await newUser.save()

// General db functions

const closeDb = async () => await db.close({ force: true })

const searchByFragment = async (Model, attribute, fragment) => await Model.find({ [attribute]: new RegExp(`.*${fragment}.*`, "i") })

module.exports = {
  closeDb,
  searchByFragment,
  User,
  findUserByName,
  findUserById,
  addUser
}
