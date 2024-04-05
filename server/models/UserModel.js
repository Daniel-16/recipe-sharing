import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const email = this.email;
  const username = this.username;
  const user = await UserModel.findOne({ username, email });
  try {
    if (user) {
      const emailExists = new Error(
        "An account with this username or email already exist!"
      );
      return next(emailExists);
    }
  } catch (error) {
    throw new Error(error);
  }

  //Hash password function
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
