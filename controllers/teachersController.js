const {teachers} = require('../model/database');
const bcrypt = require('bcrypt');
const teacherController = {
    newTeacher: async (req,res,next) =>{
        try {
            const {FName,PNumber,}= req.body;
            const teacherPwd = PNumber.slice(7) + FName;
           const hashedPwd = await bcrypt.hash(teacherPwd,10);
           const newTeacher = await teachers.create({
               ...req.body,Password:hashedPwd
        });
        res.message = {success:true};
        } catch (error) {
            console.log(error);
            res.message = error.message;
        }
        res.send(res.message);
    },
    fetchAllteachers: async (req,res) =>{
        try{
            const allTeachers = await teachers.find({});
            res.message = allTeachers;
        }catch(error){
            res.message = error.message;
        }
        res.json(res.message,undefined,2);
    },
    delTeacher: async (req,res) =>{
        const teacherId = req.params.id
        try {
            const delRes = await teachers.deleteOne({_id:teacherId});
            res.message = {success:true,message:'Teacher Successfully deleted!.'}
        } catch (error) {
            res.message = {success:false,message:error.message}
        }
        res.json(res.message);
    }
    
}

module.exports = teacherController;