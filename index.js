const fs = require("fs");

// //Synchronous blocking code
// //Read from a file
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// //write to a file
// const textOut = `This is what we know about avacado: ${textIn}`;
// fs.writeFileSync('./txt/output.txt' ,textOut);
// console.log('File Write sucessful');

//asynchronous non blocking code
// fs.readFile("./txt/start.txt", "utf-8",(err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//       fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//         console.log(data3);
//         fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err=>{});
//       });
//   });
// });

// console.log('file being read');


///////////
//Server
const http = require('http');

const server = http.createServer((req,res) => {
    const pathName = req.url;
    //res.end('Response from server');

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is overview');
    }else if(pathName === '/product'){
        res.end('This is Product');
    }else{
        //fallback content
        res.writeHead(404,{
            'Content-type' : 'text/htm',
            'my-own-header':'hello header'
        });
        res.end('Page not Found !!');
    }
});

//listen to server
server.listen(8000,'127.0.0.1',() => {
    //executes when the server starts listening
    console.log('Server listenting on localhost:8000');
});