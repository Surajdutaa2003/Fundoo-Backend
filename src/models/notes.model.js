import { description } from "@hapi/joi/lib/base";
import mongoose from "mongoose";
const noteSchema=new  mongoose.Schema({
    userId:{type:mongoose.SchemaType.ObjectID,ref:"User",require:true},
    title:{type:String,require:true},
    description:{type:String,require:true},

},{timestamps:true});