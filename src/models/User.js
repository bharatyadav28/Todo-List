import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter the valid email",
    ],
  },
  name: {
    type: String,
    required: true,
    minLength: [3, "Name cannot be less than 3 chars"],
    maxLength: [11, "Name cannot be more than 11 chars"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password cannot be less than 6 chars"],
    // maxLength: [100, "Password cannot be more than 50 chars"],
  },
});

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
