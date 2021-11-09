const mongoose = require('mongoose');
const mysql = require('mysql')
const {dbURL} = require('../config/default');
mongoose.connect(dbURL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
});
const db = mongoose.connection;
db.once('open',()=>{
    console.log('successfully conneted to MongoDB');
})
//mysql db
const mysqlConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sms"
});
mysqlConn.connect(err =>{
    if(err){
        console.log('Error connecting to db',err.message)
    }else{
        console.log('successfully connected to Mysql Db')
    }
}); 
//*/
//mongodb schemmas
const adminschema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})
const admin = mongoose.model('admin',adminschema);
//teacher
const teachersSchema = mongoose.Schema({
    FName:{
        type:String,
        required:true
    },
    LName:{
        type:String,
        required:true
    },
    MName:{
        type:String,
        required:true
    },
    EAddress:{
        type:String,
        required:true
    },
    PNumber:{
        type:String,
        required:true
    },
    HQualification:{
        type:String,
        required:true
    },
    SDate:{
        type:String,
        required:true
    },
    AssignedClass:{
        type:String,
        required:false
    },
    Role:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
})
const teachers = mongoose.model('teachers',teachersSchema);





module.exports = {
    mysql:mysqlConn,
    admin,
    teachers
}

