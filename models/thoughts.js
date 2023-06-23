const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Reactions = require('./reactions');

const thoughtsSchema = new Schema({
    thoughtText:{
        type:String,
        require:true,
        unique:true,       
        minlength:1,
        maxlength:280,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        // use a getter method to format the timestamp on query

        get:createdAtVal => dateFormat(createdAtVal)
    },
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    reactions:[{
        // Array of nested documents created with the reactionSchema
        type:Schema.Types.ObjectId,
        ref:'reactions',
    },
    ],
});

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thoughts = model('Thoughts',thoughtsSchema);
module.exports = Thoughts;