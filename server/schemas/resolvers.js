const { User } = require('../models')

const resolvers = {
    Query: {
        // get all users 
        users: async() => {
            return User.find()
            .select('-__v -password')
            .populate('savedBooks');
        },

        user: async(parent, args) => {
            const params = args?args._id:args.username
            return User.findOne({ params })
                .select('-__v -password')
                .populate('savedBooks')
        }
    }
}

module.exports = resolvers;