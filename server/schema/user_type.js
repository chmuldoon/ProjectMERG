const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;
const IngredientType = require("./ingredient_type");
const CocktailType = require("./cocktail_type");
const CocktailService = require('../services/cocktail')

const Ingredient = require('../models/Ingredient')
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve(parentValue) {
        return parentValue.ingredients.map((c) => Ingredient.findById(c));
      },
    },
    
    mustHave: {
      type: new GraphQLList(IngredientType),
      resolve(parentValue) {
        return parentValue.mustHave.map((c) => Ingredient.findById(c));
      },
    },
    cocktails: {
      type: new GraphQLList(CocktailType),
      resolve(parentValue) {
        return CocktailService.listMaker(parentValue.ingredients, parentValue.mustHave);
      },
    },
  },
});

module.exports = UserType;
