const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const request = require("request");



const app = express()
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public/css"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));
app.get("/",function(req,res){
    // res.sendFile("running upto server")
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;


    const data = {
        members:[
            {
             email_address:email,
              status : "subscribed",
              merge_field:{
                FNAME:firstName,
                LNAME:lastName
              }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/4bcf3cbb34";
    const options = {
        method:"POST",
        auth :"Namraa :47db56c9423f8595f57e66d2d3e42af5-us21 "
    }
  
    const request =  https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();
   

//   console.log("your post has been recieved")
});
app.get("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server is running on port 3000");
});


//API key
// 47db56c9423f8595f57e66d2d3e42af5-us21

//List id
// 4bcf3cbb34