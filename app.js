const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const axios=require('axios')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine','ejs');

const data={
    shortlink:"",
    message:""
}

app.get('/',(req,res)=>{
    res.render("index.ejs",{data});
})

app.post('/getshorturl',(req,res)=>{
    let link=req.body.link
    axios.post('https://api-ssl.bitly.com/v4/shorten', {
        domain: "bit.ly",
        long_url: link
    },
    {
        headers:{
            "Content-Type" : "application/json",
            "Host" : "api-ssl.bitly.com",
            "Authorization" : "Bearer"+" "+"643b0f8280c36408c0ce2d2316752781aa358d6a"
        }
    }).then(result=>{
        data.shortlink=result.data.id,
        data.message=""
        res.redirect('/')
    })
    .catch(err=>{
        data.shortlink="",
        data.message="Your link does not exist"
        res.redirect('/')
    })
})

app.listen(5000,()=>{
    console.log("Application start at port 5000")
})