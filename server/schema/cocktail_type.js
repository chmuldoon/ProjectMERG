const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql;
// const Cocktail = mongoose.model("cocktail");
const Cocktail = require("../models/cocktail")
const IngredientType = require("./ingredient_type")
const Ingredient = require("../models/Ingredient");

const CocktailType = new GraphQLObjectType({
  name: "CocktailType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    instructions: { type: GraphQLString },
    glass: { type: GraphQLString },
    ingredients: { type: new GraphQLList(GraphQLString) },
    measurements: { type: new GraphQLList(GraphQLString) },
    using: { type: new GraphQLList(GraphQLString) },
    photo: { type: GraphQLString },
    using2: { 
      type: new GraphQLList(require('./ingredient_type')),
      //look up why this couldnt be just IngredientType imported earlier
      //probably something about closures etc 
      resolve(parentValue){
        return parentValue.using2.map(i => Ingredient.findById(i))
      }
    }
    // using2: {
    //   type: new GraphQLList(IngredientType),
    //   resolve(parentValue) {
    //     return parentValue.using2.map(i => Ingredient.findById(i))
    //   }
    // }
  }),
});

module.exports = CocktailType;
