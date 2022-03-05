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
        // get the current users credentials form the logged in session
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
        createUser: async(parent, args, context) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){ throw new AuthenticationError('Incorrect user email') }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){throw new AuthenticationError('Incorrect user password')}

            const token = signToken(user);
            return { token, user }
        },
        saveBook: async(parent, args, context) => {
            
        }
    }
}

module.exports = resolvers;