#!/usr/bin/env node
const app  = require('./app');
const config = require('./env.config');
const debug = require("debug")('phoenix:server');
//config.initRefreshSecret();
const tls = require('spdy'); // HTTP2 + HTTPS (HTTP2 over TLS)
const fs = require('fs');
let helmet = require('helmet');
const ocsp = require('ocsp');
const https = require('https')
const http = require('http');
const cors = require('CORS');
const { Http2ServerRequest } = require('http2');
global.TextEncoder = require("util").TextEncoder; 

const key_file = process.env.KEY_FILE || config["key-file"]
const cert_file = process.env.CERT_FILE || config["cert-file"]
const dh_strongfile = process.env.DH_STRONGFILE || config["dh-strongfile"]

const options = {
    key: fs.readFileSync(key_file),
    cert: fs.readFileSync(cert_file),
    dhparam: fs.readFileSync(dh_strongfile)
}
app.use(helmet());

/* Imprlementing the cors */
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin" , "*")
    res.header("Access-Control-Allow-Headers" , "Origin , X-Requested-with , Content-Type , Accept")
    if (req.method =="OPTIONS")
    {
        req.header["Access-Control-Allow-Origin"] = "*";
        req.header["Access-Control-Allow-Headers"] = "Special-Request-Header";
        req.header["Access-Control-Allow-Methods"] = ["GET","PUT","POST","PATCH","DELETE"];
        req.header["Access-Control-Allow-Credentials"] = true;
        

        res.sendStatus(200);
    }else
    {
        next();
    }
});

/****** 
 * Despite fully knowing its importance We decided to comment it since it caused too much problems and errors
 ****** /


//var ocspCache = new ocsp.Cache();



/*server.on('OCSPRequest', function(cert, issuer, callback) {
    ocsp.getOCSPURI(cert, function(err, uri) {
        if (err) return callback(error);
        var req = ocsp.request.generate(cert, issuer);
        var options = {
            url: uri,
            ocsp: req.data
        };
        ocspCache.request(req.id, options, callback);
    });
});
var sslSessionCache = {};
server.on('newSession', function(sessionId, sessionData, callback) {
    sslSessionCache[sessionId] = sessionData;
    callback();
});
server.on('resumeSession', function (sessionId, callback) {
    callback(null, sslSessionCache[sessionId]);
});*/


const PORT = process.env.PORT || 443

httpServer.listen( 80 , (error) => {
    if (error)
    {
        console.log("something is up, maybe ...",error);
    }else
    {
        console.log("Running on port: " , 80);
    }
});

const server = tls.createServer(options, app);
server.listen(PORT, (error) => {
    if (error)
    {
        console.log("something is up, maybe ...",error);
    }else
    {
        console.log("Running on port: " , PORT);
    }
  });