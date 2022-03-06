const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // get all users 
        users: async() => {
            return User.find()
            .select('-__v -password')
            .populate('savedBooks');
        },
        // get a single user by username or by id
        user: async(parent, args) => {
            const params = args?args._id:args.username
            return User.findOne({ params })
                .select('-__v -password')
                .populate('savedBooks')
        },
        // get the current users credentials from the logged in session token
        me: async(parents, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password')
                    .populate('savedBooks');

                return userData;
            }

            throw new AuthenticationError('User is not logged in')
        }
    },

    Mutation: {
        // add a new user and sign a token to that user
        createUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // find a user by their email address,check the password and sign a token to that user once verified
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){ throw new AuthenticationError('Incorrect user email') }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){throw new AuthenticationError('Incorrect user password')}

            const token = signToken(user);
            return { token, user }
        },
        // save a book according to the book schema to the savedBooks array in the user model
        saveBook: async(parent, { books }, context) => {
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: books }},
                    { new: true, runValidators: true }
                ).populate('savedBooks')

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        // delete a book from the savedBooks array in the user model, according to the provided bookId
        deleteBook: async(parent, { bookId }, context) => {
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } }},
                    { new: true }
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!')
        }
    }
}

module.exports = resolvers;