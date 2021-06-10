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
// stretch goals yet to be added: 
// Tree of knowledge
// Personal mind map
// games
// adjustable color scheme

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  dateSignedUp: String,
  students: [{
    id: String,
    student: {
      name: String,
      nicknames: [String],
      photo: mongoose.Mixed,
      gender: String,
      about: String,
      studyingSince: String,
      lessonHistory: [{
        title: String,
        date: String,
        comments: String,
        homework: String,
        resources: [{
          title: String,
          date: String,
          content: mongoose.Mixed
        }]
      }], 
      allResources: [{
        title: String,
        date: String,
        content: mongoose.Mixed
      }],
      milestones: [{
        title: String,
        date: String,
        comments: String,
        resources: [{
          title: String,
          content: mongoose.Mixed
        }]
      }]
    }
  }],
  payments: {
    remainingHoursPaid: Number,
    totalHoursStudied: Number,
    paymentHistory: [{
      date: String,
      totalHours: Number,
      totalDollars: Number,
      receipt: mongoose.Mixed
    }]
  },
  settings: {
    billing: {
      existingPaymentMethods: [{  // will have to be updated to match stripe format
        id: String,
        cardNumber: String
      }],
      recurringPayments: [{
        startDate: String,
        frequency: Number,    // payment frequency in Months
        amount: Number
      }]
    },
    colorScheme: {
      type: String, 
      default: 'default'
    },
    contact: {
      emails: [String],
      phoneNumbers: [Number],
      addresses: [String]
    }
  }
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
