const express =  require('express'),
cors = require('cors'),
app = express();

app.set('port',process.env.PORT || 9000);
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(express.static('public'));
const Router = require('./Router/RouteController');
app.get('/',(req,res)=>{
        res.send('backend working...')
})
Router(app);

app.listen(app.get('port'),()=>{
        console.log('server running on port '+app.get('port'));
})