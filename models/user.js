const {Schema, model, Types } = require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
return re.test(email)};

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:false,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        require:true,
        lowercase:true,
        unique:true,
        validate: [validateEmail, 'Please enter a valid email address'],
       // must match a valid email addreess (look into mongoose validators)
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref:'thoughts'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref:'friends',
    }
    ],

});
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('user',userSchema);
module.exports = User;