const {Student,Class} = require('../model/database')
const bcrypt = require('bcrypt')
const studentController = {
    newStudent: async (req,res) =>{
        const {numOfStudents,classId,FNames,ParentsNo} = req.body;
        const stdPwd = ParentsNo.slice(7) + FNames;
        const stdHashedPwd = await bcrypt.hash(stdPwd,10);
        try{
            const newStudent = await Student.create({...req.body,profileImg:'avatar.png',Password:stdHashedPwd});
            const classUpdate = await Class.updateOne({_id:classId},{$set:{numOfStudents:numOfStudents + 1}});
            res.message = {success:true,message:"Student Added Successfully!",studentId:newStudent._id}
        }catch(err){
            res.message = {success:false,message:err.message}
        }
        res.json(res.message,undefined,2);
    }
}
module.exports = studentController