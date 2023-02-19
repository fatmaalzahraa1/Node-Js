// var http = require('http');
// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World');
// }).listen(7777);

// console.log('Server running at http://127.0.0.1:8081/');

const express=require('express');
const fs=require("fs")
const app=express(); // factory function 
const cors=require('cors')


// var data=[{name:"ahmed",age:22},
// {name:"ali",age:22},
// {name:"negm",age:22},
// {name:"sayed",age:22}] //db
app.use(cors()); // why cors any thing need to talk out of my range  to my i accept 
app.use(function(req,res,next) // midlware 
{
console.log("hi in midelware") // logic 
next();
})



app.use(express.urlencoded({extended:true}))

app.get('/getregister',function(req,res)
{
        let html=fs.readFileSync("register.html",'utf-8');
        res.send(html);
})

app.post('/register',function(req,res)
{
    let data=JSON.parse(fs.readFileSync("users.txt",'utf-8'))
    console.log(req.body)
    if(req.body.user==''){
        res.status(424).send("error:” {username} is required”")
    }else if(req.body.pass==''){
        res.status(424).send("error:” {password} is required”")
    }else if(req.body.name==''){
        res.status(424).send("error:” {name} is required”")
    }else{
        data.push(req.body);
        fs.writeFileSync("users.txt",JSON.stringify(data));
        res.send("user was registered successfully");
    }
})

app.get('/getlogin',function(req,res)
{
    let html=fs.readFileSync("index.html",'utf-8');
    res.send(html);
})

app.use(express.urlencoded({extended:true}))
app.post('/setlogin',function(req,res)
{
    let data=JSON.parse(fs.readFileSync("users.txt",'utf-8'))
    console.log(req.body)
    data.forEach(user => {
        if(user.user == req.body.user && req.body.user!=''){
            if(user.pass == req.body.pass && req.body.pass){
                res.send("{message: logged in successfully, profile:{name:”"+user.name+"”}}");
            }else{
                res.status(424).send("{error:”invalid credentials”}");
            }
        }else{
            res.status(424).send("{error:”invalid credentials”}");
        }
    });
})

app.get('/index',function(req,res)
{
        let html=fs.readFileSync("index.html",'utf-8');
        res.send(html);
})
app.get('/data/:id',function(req,res)
{
    res.send(data[parseInt(req.params.id)])
})

app.put("/data/:id",function(req,res)
{
    console.log(req.body);
    data[parseInt(req.params.id)].name=req.body.name;

    res.send(JSON.stringify(data));
})
app.delete('/data/:id',function(req,res)
{
    data.splice(parseInt(req.params.id)-1,1);
    res.send(JSON.stringify(data));
})
app.listen(7777,function()
{
    console.log('hi...')
})