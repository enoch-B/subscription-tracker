import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    name:{
        type: String,
        required:[true,'Subscription Name is required'],
        trim:true,
        minLength: 2,
        maxLength: 100,  
    },
    price:{
        type: Number,
        required:[true,' Price required'],
        min:0,

    },
    currency:{
        type: String,
        enum:['USD','EUR'],
        default:'USD'
    },
    frequency:{
        type: String,
        enum:['daily', 'weekly','monthly', 'yearly']
    },
    catagory:{
        type: String,
        enum: ['sports', 'news','entertainment','technology','other'],
        required:true,
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum:['active', 'cancelled','expired'],
        default: 'active',
    },
    startDate:{
       type: Date,
       required: true,
       validate:{
        valiator:(value)=> value <= new Date(),
        message:"Start Date must be in the past"
       }
    },
    renewalDate:{
       type: Date,
       validate:{
        valiator: function (value) {
           return value > new this.startDate
        },
        message:"Renewal data must be after the start data"
       }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

},{
    timestamps:true
});

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
   const renewalDate= {   
        daily:1,
        weekly: 7,
        monthly: 30,
        yearly:365
    };
     this.renewalDate = new Date(this.startDate);
     this.renewalDate.setDate(this.renewalDate.getData() + renewalPeriods[this.frequency]);
    }

    //auto-update the status if renewal data has passed

    if(this.renewalDate < new Date()){
        this.status='expired';
    }
    next();
})

const Subscription = mongoose.model(Subscription, subscriptionSchema)

export default Subscription;