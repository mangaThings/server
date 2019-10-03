const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      validate: {
        validator: function(value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Email must include @ and ."
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre("save", function() {
  this.password = hashPassword(this.password);
  this.email = this.email.toLowerCase();
  next();
});

userSchema.path("email").validate(function(value) {
  return User.findOne({ email: value })
    .then(isFound => {
      if (isFound) return false;
    })
    .catch(err => {
      throw err;
    });
}, "Email already exist");

const User = mongoose.model("User", userSchema);

module.exports = User;
