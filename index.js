
const express = require('express');
const path = require('path');  //to set the views path
const port = 8000;

//adding the mongoose setup file 
const db = require('./config/mongoose');

//importing Collection which has defined schema
const Contact = require('./models/contact');




const app = express();

app.set('view engine', 'ejs'); //sets the template engine to ejs
app.set('views', path.join(__dirname, 'views')); // sets the views path

//Middle-ware-1
app.use(express.urlencoded()); //Middleware acts as a parser
app.use(express.static('assets')); 


//create-middleware
/*
Test Middleware
// middle-ware-2
app.use(function(req,res,next){
    req.myname = "pranav";
    console.log("Middleware 2 has been called");

    next();
});

// middle-ware-3
app.use(function(req,res,next){
    console.log(req.myname);
    console.log("Middleware 3 has been called");
    next();
});

*/





var contactList = [
    {
        name: 'saurabh',
        phone: '12345667'

    }
    ,
    {
        name: 'Bear',
        phone: '12435345'

    }
    ,
    {
        name: 'Coding Ninjas',
        phone: '233333333'
    }


]

//Note here as we dont have to write which type of file we want like text html as mentioned in the http earlier
//Switch also not needed to render multiple pages, default case is also managed
app.get('/', function (req, res) {

    /*
    // console.log(req.myname);//Test middleware
    return res.render('home', 
    {
     title: "My Contacts List",
     contactlist: contactList
    });
    */


    //Fetching data from db
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts');
            return;
        }

        return res.render('home',{
            title: "Contacts List",
            contactlist:contacts
        })
    });

});

app.get('/practice', function (req, res) {

    return res.render('practice', { title: "Let us Play with EJS" });

});

app.post('/create-contact',function(req,res){
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone:req.body.phone
    //     }
    // );
    ////contactList.push(req.body);
    // return res.redirect('/');
   //// return res.redirect('back');



   //Storing into contact_list_db********

   //create Contact / define contact details
   Contact.create({
    name:req.body.name,
    phone:req.body.phone

   },function(err,newContact){ //if err occurs while submitting details
    if(err){
        console.log('error in creating a contact!');
        return;
    }


    // console.log(newContact); //printing Record
    return res.redirect('back'); //redirecting to the caller page
   });

});



// function deletecontact(req){
//     let temp = contactList.filter(function(data){
//         return (req.name !==data.name);
//     });

//     contactList = temp;
    
// } //Different Approach followed by me




app.get('/delete-contact',function(req,res){
    /*
    // console.log(req.query.phone);
    let phone = req.query.phone
    let contactIndex = contactList.findIndex(function(contact){
        return contact.phone == phone;
    });
   if(contactIndex != -1){
    contactList.splice(contactIndex,1);
   }

   return res.redirect('back');

   */


   //delete-contact from contacts_list_db
   
   //get the id from query in the ul
   let id = req.query.id;

   //find the contact in the database using id and delete
   Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting an object from databse');
        return;
    }

    return res.redirect('back');
   })
})









app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the app', err);
        return;
    }

    console.log('Yup! Express app is running on Port: ', port);


})