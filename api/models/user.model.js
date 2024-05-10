import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fsupport.hubstaff.com%2Fprofile-pictures-for-hubstaff-talent%2F&psig=AOvVaw1HDmU6YrE5v9itPaC_BZLU&ust=1710644134693000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCPspTk94QDFQAAAAAdAAAAABAE"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;