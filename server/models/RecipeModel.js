import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    recipeOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeOwner: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeFrame: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, required: true },
    },
    ingredients: [{ type: String, required: true }],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", RecipeSchema);
export default RecipeModel;
