

// require the library
const mongoose = require('mongoose');


//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db',{ //default mongodb uses ipv6 so it is not working for localhost but by adding family=4 it works
    //or we can  set localhost as 127.0.0.1 ipv4 explicitly it will work
    useNewUrlParser: true, //optional 
    useUnifiedTopology: true,//optional
    family: 4 //Use IPv4, skip trying IPv6
});

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));


db.once('open',function(){
    console.log('Successfully connected to the database');
});
