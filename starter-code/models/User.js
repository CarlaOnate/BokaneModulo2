const {model, Schema} = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
    name: String,
    email: String,
    googleID: String,
    image: {type: String, default:'https://res.cloudinary.com/dxxdamndt/image/upload/v1581191809/user_r0fq7p.png'},
    role: {
        type: String,
        enum: ["ADMIN", "GUEST"],
        default: "GUEST"
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.plugin(PLM, {usernameField: 'email' })

module.exports = model('User', userSchema)
