const {model, Schema} = require('mongoose')

const activitySchema = new Schema({

  name: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  numPeople: {
    type: Number,
    default: 1,
  },
  typeAct: {
    type: String,
    enum: ['kayak', 'climbing', 'waterski']
  },
  time:{
    type: String,
  }

})


module.exports = model('Activity', activitySchema)