const mongoose = require("mongoose");
//will add a function that takes in a list of ingredients 
//and outputs a list of cocktails
const Ingredient = mongoose.model('ingredient')
const Cocktail = mongoose.model("cocktail");
// const Igredient = require('../models/Ingredient')

async function _userCocktails(list, mustHave){
  if (list.length == 0) return [];
  let range = mustHave.length > 0 ? mustHave : list
  let output = []
  let outputHelper = {}
  // console.log(list)
  let objs = await Ingredient.find( { _id : { $in: range}})
  let cocktails = objs.map(i => i.cocktails)
  cocktails.forEach((c) => {
    output = output.concat(c);
  });
  output = output.map(c => c.toString())

  return [...new Set(output)]
  
}

function listMaker(list, mustHave){
  return _userCocktails(list, mustHave)
    .then((total) => {
      return total.map((c) => Cocktail.findById(c));
    }); 
}
module.exports = { listMaker };
