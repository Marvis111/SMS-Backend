const { Auth } = require('../controllers/Auth');
const eventsController = require('../controllers/eventsController');
const loginController = require('../controllers/loginController');
const {newTeacher,fetchAllteachers,delTeacher} = require('../controllers/teachersController');

const Router = app =>{

   app.post('/login',loginController.getUserDetails,loginController.checkValidity,loginController.sendStatus);
   app.post('/checkuser',Auth.checkToken,Auth.checkUser,Auth.send);
   app.post('/event',eventsController.newEvents,eventsController.sendEventSuccess);
   app.post('/fetchevents',eventsController.fetchAllevents);
   app.post('/newteacher',newTeacher);
   app.post('/allteachers',fetchAllteachers);
   app.delete('/delteacher/:id',delTeacher);
}
module.exports = Router