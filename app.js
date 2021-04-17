const express = require("express")
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 70;

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For Serving Static Files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set("views", path.join(__dirname, 'views')); // Set the view Directory

// ENDPOINT
app.get('/', (req, res) => {
    const params = {  }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {  }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });
    // res.status(200).render('home.pug', params);
})



//START THE SERVER
app.listen(port, () => {
    console.log(`This application has started successfully on port ${port}`)
})
