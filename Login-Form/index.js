const http=require("http")
const fs=require("fs")
const {parse}=require("querystring")

let server=http.createServer((req,res)=>{
    if(req.method==="POST"){
if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
    let body=""
    req.on("data",(chunk)=>{
        body+=chunk;
        console.log(body)
    })
    req.on("end",()=>{
        let result=parse(body)
        res.end(JSON.stringify(result))

    })
}

    else{
        res.end(null)
    }
    

    }
    
    else{
        if(req.url==="/" || req.url==="/home"){
            res.writeHead(200,"okey",{"content-type":"text/html"})
            let html=fs.readFileSync("./index.html","utf-8")
            res.end(html)
        }
        else if(req.url==="/style"){
            res.writeHead(200,"okey",{"content-type":"text/css"})
            let css=fs.readFileSync("./style.css","utf-8")
            res.end(css)
        }
        else{
            res.end("page not found")
        }
    }
})

server.listen(5000,(err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("server is running on port 5000");
    }
})