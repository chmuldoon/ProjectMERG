const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  cocktails: {
    type: [Schema.Types.ObjectId],
    ref: 'cocktail'
  }
});
IngredientSchema.statics.findDrinks = function(id){
  return this.findById(id)
    .populate("cocktails")
    .then(ingredient => ingredient.cocktails)
}

module.exports = Ingredient = mongoose.model("ingredient", IngredientSchema);
