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
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

//read templates
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
  );
  const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
  );
  const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
  );

//read File synchronously for api
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
    const { query, pathname } = url.parse(req.url, true)
    //const pathName = req.url;
    //res.end('Response from server');

    // console.log(req.url);
    // console.log(url.parse(req.url,true));

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });
      
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        //PRODUCT
    }else if(pathname === '/product'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });
        //console.log(query);
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);

        //API
    } else if(pathname === '/api'){

        // //This way of accessing file everytime and sending data to server is not efficient as the data doesnt change for every request
        // //Instead we can use sync file read at beginning and solve this problem

        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
        //     const dataObj = JSON.parse(data);

        //     //setting header
        //     res.writeHead(200,{
        //         'Content-type':'application/json'
        //     })

        //     //we send data as dataobj is not accepted by node js in res.end function
        //     res.end(data);
        // });

        //setting header
        res.writeHead(200,{
            'Content-type':'application/json'
        })
        //we send data as dataobj is not accepted by node js in res.end function
        res.end(data);


        //Page Not Found
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