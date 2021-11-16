
const {teachers,Class, Student} = require('../model/database');

const classController = {
    new: async (req,res)=>{
        const {CName,CCategory,CQuotes,ClassTeacher,AssistantClassTeacher} = req.body;
        console.log(req.body);
        try {
            const classTeacherDetail = await teachers.findOne({_id:ClassTeacher});
            const AssClassTeacherDet = await teachers.findOne({_id:AssistantClassTeacher});
            const ClassTeachers = [
                {name:classTeacherDetail.FName+' '+classTeacherDetail.LName,id:classTeacherDetail._id},
                {name:AssClassTeacherDet.FName+' '+AssClassTeacherDet.LName,id:AssClassTeacherDet._id}
        ]
        const resp = await Class.create({CName,CCategory,CQuotes,ClassTeachers,
            numOfStudents:0,MainTeacher:ClassTeachers[0].id});
        res.data = {success:true,message:"Class Successfully created!."}
        res.send(res.data);
        } catch (error) {
            if(error.code === 11000){
                res.data = {success:false,message:"Class Already exist"}
            }
            res.data = {success:false,message:"Error: "+error.message}
            res.send(res.data);
        }
    },
    allClasses:async (req,res)=>{
        try {
            const classes = await Class.find({});
            res.send(classes);
        } catch (error) {
            if (error) {
                res.send({error:error.message});
            }
        }
    },
    sendTeacherClass:async (req,res)=>{
        const {teacherId} = req.params;
        const teacherClassDetails = await Class.findOne({MainTeacher:teacherId});
        const classStudents = teacherClassDetails != null? await Student.find({classId:teacherClassDetails._id}):null;
        if (teacherClassDetails !== null) {
            const {CName,CCategory,_id,ClassTeachers,numOfStudents} = teacherClassDetails
                res.message = {
                    success:true,
                    details:{
                        CName,CCategory,classId:_id,ClassTeachers,numOfStudents,classStudents
                    }
                }
        } else {
            res.message = {
                success:false,
                details:null
            }
            
        }
        res.json(res.message,undefined,2);
    }   
}

module.exports = classController