

import mongoose from "mongoose"

//CONNECT TO DB FUNCTION
const connectToDB = async () => {
  const connectionURL = "mongodb://localhost:27017/"

  mongoose.connect(connectionURL)
    .then(() => {
      console.log("Blog DB Connection is successful");      
    })
    .catch(error => console.log(error))
}

export default connectToDB;