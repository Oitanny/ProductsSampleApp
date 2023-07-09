//main file for backend


//importing all necessary packages 
const express= require('express')
const morgan= require('morgan')
const cors=require('cors')
const connectDB=require('./config/db')
const passport=require('passport')
const bodyParser= require('body-parser')
const routes=require('./routes/index')



//calling function for connecting
//as soon as we start the program it starts to connect with database
connectDB()

//?
const app=express()
app.use(express.json())
app.set("view engine", "hbs")
app.use(express.static(__dirname + '/public'));
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
} 

//?
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(routes)
app.use(passport.initialize())
require('./config/passport');
(passport)


//setting the port to run this locally or(for some other hosting service)

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
