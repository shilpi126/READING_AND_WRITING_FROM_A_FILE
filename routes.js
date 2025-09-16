
const fs = require("fs");
const routesHandler = (req,res) => {


console.log("server created here...")
if(req.url == "/"){
    res.setHeader("Content-Type", "text/html");
    res.end(
        `
        <form action="/message" method="POST">
        <label>Name:</label>
        <input type="text" name="username"/>
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
            //console.log(chunks);
            dataChaunks.push(chunks);
        })

        req.on("end", ()=>{
            let combinedBuffer = Buffer.concat(dataChaunks);
            //console.log(combinedBuffer.toString());
            let value = combinedBuffer.toString().split("=")[1];
            console.log(value);
            
           
            fs.writeFile("formValues.txt", value , (err)=>{
                
                 res.statusCode = 302;//redirect
                 res.setHeader("Location","/")
                 res.end();
            });
         


        })
    }else{
        if(req.url == "/read"){
 fs.readFile("formValues.txt", (err, data)=>{
                
                console.log(data.toString());
                res.end(`<h1>${data.toString()}</h1>`);
            });
        }
           
    }
}
}


const anotherFunction = () =>{
    console.log("This is test function.")
}


module.exports.handler = routesHandler;
module.exports.testFunction = anotherFunction;