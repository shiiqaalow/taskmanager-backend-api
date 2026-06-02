import mongoose from 'mongoose'

export const taskSchema = new mongoose.Schema({
    title: { type: String, required:true },
    description: String,
    dueDate: Date,
    status:{
        type: String,
        enum: ['pending','in-progress','completed'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        required: true
    }
},{timestamps: true})

export const Task = mongoose.model('Task',taskSchema)