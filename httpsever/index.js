const http = require("http");
const fs = require("fs")

const app = http.createServer((req, res) => {
    const log = `data : ${Date.now()}\n url : ${req.url} \n\n`
    fs.appendFile("data.text" , log , (err , data) => {
        switch (req.url) {
            case "/":
                res.end("Home Page")
                break;
            case "/about":
                res.end("about Page")
                break;
            default:
                res.end("404 Not Found")
                break;
        }
    })
//   console.log("In Server");
//   res.end("Server Page");
});

app.listen(8000 , () => {console.log("Server is reunning...")})