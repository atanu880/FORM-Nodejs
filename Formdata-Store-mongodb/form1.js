const http=require("http")
const fs=require("fs")
const{parse}=require("querystring") //string to number converted
const {MongoClient}=require("mongodb")

http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){

 //read data

let body=""
req.on("data",(chunk)=>{
    body+=chunk
})

//end the req-res cycle

req.on("end",()=>{
    let result=parse(body)
    async function db(){
    let client=await MongoClient.connect("mongodb://127.0.0.1:27017")
    await client.db("UserDB").collection("user").insertOne(result)
    }
    db()
    res.end("data stored to mongodb successfully")
})
        }
    }
    else{
        if(req.url==="/" || req.url==="/home"){
            let html=fs.createReadStream("./form1.html","utf-8")
            html.pipe(res)
        }
           
        else if(req.url==="/style"){
            let css=fs.createReadStream("./style.css","utf-8")
            css.pipe(res)
        }

        else{
            res.end("page is not found")
        }}
    }).listen(5000,(err)=>{
        if(err)console.log(err);
        console.log("server is running on port 5000");
    })
    


