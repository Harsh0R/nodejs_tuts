const http = require("http");
const fs = require("fs")
const url = require('url')

const app = http.createServer((req, res) => {
    const log = `data : ${Date.now()}\n url : ${req.url} Mathod : ${req.method} \n\n`
    const myUrl = url.parse(req.url , true);
    console.log("MyUrl ==> " , myUrl);
    fs.appendFile("data.text" , log , (err , data) => {
        switch (myUrl.pathname) {
            case "/":
                res.end("Home Page")
                break;
            case "/about":
                const qp = myUrl.query.name;
                res.end(`This is About Page ==> Hello : ${qp}`)
                break;
            case "/signup":
                if (req.method === "GET") {
                    res.end("Fill this sign up form.")
                }else if (req.method === "POST") {
                    res.end("Success")    
                }
            default:
                res.end("404 Not Found")
                break;
        }
    })
//   console.log("In Server");
//   res.end("Server Page");
});

app.listen(8000 , () => {console.log("Server is reunning...")})