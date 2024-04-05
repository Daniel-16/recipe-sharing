import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
});

NewsLetterSchema.pre("save", async function (next) {
  const email = this.email;
  const findMail = await NewsLetterModel.findOne({ email });
  try {
    if (findMail) {
      const subscribed = new Error(
        "Sorry, you're already subscribed! Stay tuned for more updates!"
      );
      return next(subscribed);
    }
  } catch (error) {
    throw new Error(error);
  }
  next();
});

const NewsLetterModel = mongoose.model("NewsLetter", NewsLetterSchema);
export default NewsLetterModel;
