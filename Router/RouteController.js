const { Auth } = require('../controllers/Auth');
const eventsController = require('../controllers/eventsController');
const loginController = require('../controllers/loginController');
const {newTeacher,fetchAllteachers,delTeacher} = require('../controllers/teachersController');
const classController = require('../controllers/classController');
const studentController = require('../controllers/studentController')
const { default: axios } = require('axios');
const Router = app =>{

   app.post('/login',loginController.getUserDetails,loginController.checkValidity,loginController.sendStatus);
   app.post('/checkuser',Auth.checkToken,Auth.checkUser,Auth.send);
   app.post('/event',eventsController.newEvents,eventsController.sendEventSuccess);
   app.post('/fetchevents',eventsController.fetchAllevents);
   app.post('/newteacher',newTeacher);
   app.get('/allteachers',fetchAllteachers);
   app.post('/allteachers',fetchAllteachers);
   app.delete('/delteacher/:id',delTeacher);
   app.post('/newclass',classController.new);
   app.get('/allclasses',classController.allClasses);
   app.get('/teachersClass/:teacherId',classController.sendTeacherClass);
   app.post('/newstudent',studentController.newStudent);


}
module.exports = Router