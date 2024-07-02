import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: String,
  },
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z\s]*$/]
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  coins: {
    type: Number,
    required: true,
    min: 0
  },
  userType: {
    type: String,
    required: true
  },
  image: { type: String },
});

let User = mongoose.model('User', userSchema);

export default User;
