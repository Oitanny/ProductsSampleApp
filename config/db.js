//file for database connection

const mongoose = require('mongoose') //importing mongoose
const dbConfig = require('./dbconfig') // locating dbconfig which has my server's url for connection to mongo database

//defining connectDB's work
//An asynchronous function is any function that delivers its result asynchronously –
// for example, a callback-based function or a Promise-based function.
const connectDB = async () => {
    try {
        //mongoose helps us connect node to mongo database
        const conn = await mongoose.connect(dbConfig.database, {
            //what happens if connected
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "Auction_App",

        })
        //prinitng this message in our console after successful connection
        console.log(`Connected to MongoDB database: ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
        process.exit(1) //server stops 
    }

}
//exporting connectDB function for other files to use
module.exports = connectDB