const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const IngredientType = require("./ingredient_type")
const Ingredient = require('../models/Ingredient')
const CocktailType = require("./cocktail_type");
const UserType = require("./user_type");
const CocktailService = require("../services/cocktail");


const Cocktail = require('../models/cocktail')

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    currentUser: {
      type: UserType,
      resolve(parentValue, arg, req) {
        return req.user;
      },
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve() {
        return Ingredient.find({});
      },
    },
    cocktails: {
      type: new GraphQLList(CocktailType),
      resolve() {
        return Cocktail.find({});
      },
    },
    cocktail: {
      type: CocktailType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Cocktail.findById(id);
      },
    },
    ingredient: {
      type: IngredientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Ingredient.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
