const mongoose = require(`mongoose`);
const mongoURL = "mongodb://localhost:27017/iNotebook?readPreference=primary&appName=MongoDB&directConnection=true&tls=false";

const connectToMongo =() =>{
    mongoose.connect(mongoURL,()=>{
        console.log("Connected to Mongo Successfully")
    })
}

module.exports = connectToMongo
