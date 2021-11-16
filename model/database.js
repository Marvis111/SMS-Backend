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
/*
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
*/
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
    HomeAddress:{type:String,required:true},
    Password:{
        type:String,
        required:true
    },
})
const teachers = mongoose.model('teachers',teachersSchema);
//class
const classSchema = mongoose.Schema({
    CName:{type:String,required:true,unique:true},
    CCategory:{type:String,required:true},
    CQuotes:{type:String,required:true},
    numOfStudents:{type:Number,},
    ClassTeachers:{type:Array,required:true,},
    MainTeacher:{type:String,required:true},
})
const Class = mongoose.model('Class',classSchema);
//studens
const studentSchema = mongoose.Schema({
    FNames:{type:String,required:true},
    EAddress:{type:String,required:true},
    Gender:{type:String,required:true},
    ParentsName:{type:String,required:true},
    ParentsNo:{type:String,required:true},
    Class:{type:String,required:true},
    Category:{type:String,required:true},
    classId:{type:String,required:true},
    profileImg:{type:String,required:true},
    Password:{type:String,required:true}
})
const Student = mongoose.model('Student',studentSchema);
//EVNETS
const eventSchema = mongoose.Schema({
    //Etitle,Etype,Edate)
    ETitle:{type:String,required:true},
    EType:{type:String,required:true},
    EDate:{type:String,required:true},
});
const Events = mongoose.model('Events',eventSchema);

module.exports = {
    Events,
    admin,
    Student,
    teachers,
    Class
}

