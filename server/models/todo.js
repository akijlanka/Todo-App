var mongoose=require('mongoose');
var Todos=mongoose.model('Todos', {
    text:{
        type:String,
        required: true,
        minlength:1,
        trim:true,
        message:"validation faild"
    },
    completed:{
        type:Boolean,
        default: false
    },
  completedAt:{
      type:Number,
      default: false
  }  
});

module.exports={Todos};
