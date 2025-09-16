const http = require("http");

const server = http.createServer((req, res)=>{
const url = req.url;
const method = req.method;

console.log("server created here...")
if(req.url == "/"){
    res.setHeader("Content-Type", "text/html");
    res.end(
        `
        <form action="/message" method="POST">
        <label>Name:</label>
        <input type="text" name="username"></input>
        <button type="submit" >Add</button>
        </form>
        `
    )


}
else{
    if(req.url == "/message"){
        res.setHeader("Content-Type", "text/html");

        let dataChaunks = [];

        req.on("data", (chunks)=>{
            console.log(chunks);
            dataChaunks.push(chunks);
        })

        req.on("end", ()=>{
            let combinedBuffer = Buffer.concat(dataChaunks);
            console.log(combinedBuffer.toString());
            let value = combinedBuffer.toString().split("=")[1];
            console.log(value);


        })
    }
}

})


server.listen(3000, ()=>{
    console.log("server is running...")
})




