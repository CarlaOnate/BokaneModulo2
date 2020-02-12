const {model, Schema} = require('mongoose')

const reservationSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  startDate:String,
  endDate:String,
  numDays:Number,
  totalPrice:Number,
  numAdult:Number,
  numChild:Number,
  room:{
    type: String,
    enum: ['Carla Room', 'Dova Room', 'Avenu Place']
  },
  digitalPayment: {
      type: Boolean,
      default:false
  }
},{
timestamps: true,
versionKey: false
})


module.exports = model('Reservation', reservationSchema)