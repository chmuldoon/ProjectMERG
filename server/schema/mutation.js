const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = require("./user_type");
const mongoose = require("mongoose");

// const User = require("../models/user")
const User = mongoose.model('user')
const AuthService = require("../services/auth");
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
    addIngredient: {
      type: UserType,
      args: {
        ingId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { ingId, userId }) {
        return User.addIngredient(ingId, userId);
      },
    },
    addMustHave: {
      type: UserType,
      args: {
        ingId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { ingId, userId }) {
        return User.addMustHave(ingId, userId);
      },
    },
    removeIngredient: {
      type: UserType,
      args: {
        ingId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { ingId, userId }) {
        return User.removeIngredient(ingId, userId);
      },
    },
    removeMustHave: {
      type: UserType,
      args: {
        ingId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { ingId, userId }) {
        return User.removeMustHave(ingId, userId);
      },
    },
  },
});

module.exports = mutation;
