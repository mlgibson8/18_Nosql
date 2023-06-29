const {Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./reactions');

const thoughtsSchema = new Schema(
{
    thoughtText:{
        type:String,
        require:true,              
        minlength:1,
        maxlength:280,
        unique:false,
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
        unique:false, 
    },
       
    reactions:  
     // Array of nested documents created with the reactionSchema
    [reactionSchema],
},
    {
        toJSON:{
            getters:true,
            virtuals:true,
        },
        id:false,
    },
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtsSchema
.virtual('reactionCount')
//getter
.get(function(){
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thoughts = model('thoughts',thoughtsSchema);
module.exports = Thoughts;