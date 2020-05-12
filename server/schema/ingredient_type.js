const mongoose = require("mongoose");
const graphql = require("graphql");
const CocktailType = require("./cocktail_type");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql;
const Cocktail = require("../models/cocktail");

const IngredientType = new GraphQLObjectType({
  name: "IngredientType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    img: { type: GraphQLString },
    cocktails: {
      type: new GraphQLList(CocktailType),
      resolve(parentValue) {
        return parentValue.cocktails.map(c => Cocktail.findById(c))
      }
    }
  }),
});
module.exports = IngredientType