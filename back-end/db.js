const mongoose  =require('mongoose');
const mongoURI = "mongodb://localhost:27017/learnwithus";

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      family: 4,
  }).then(()=> {
        console.log("connected to mongoose successfully");
    }).catch(e=>console.log(`not connected ${e}`))
}

module.exports = connectToMongo;