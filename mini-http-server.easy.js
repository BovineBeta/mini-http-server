console.time('start WebServer need time');var libHttp=require('http');var libUrl=require('url');var libFs=require("fs");var libPath=require("path");var funGetContentType=function(filePath){var contentType="";var ext=libPath.extname(filePath);switch(ext){case".html":contentType="text/html";break;case".js":contentType="text/javascript";break;case".css":contentType="text/css";break;case".gif":contentType="image/gif";break;case".jpg":contentType="image/jpeg";break;case".png":contentType="image/png";break;case".ico":contentType="image/icon";break;default:contentType="application/octet-stream"}return contentType}var funWebSvr=function(req,res){var reqUrl=req.url;console.log(reqUrl);var pathName=libUrl.parse(reqUrl).pathname;if(libPath.extname(pathName)==""){pathName+="/"}if(pathName.charAt(pathName.length-1)=="/"){pathName+="index.html"}var 

filePath=libPath.join("./WebRoot",pathName);//更改WebRoot为欲放置网页文件的folder的路径

libFs.exists(filePath,function(exists){if(exists){res.writeHead(200,{"Content-Type":funGetContentType(filePath)});var stream=libFs.createReadStream(filePath,{flags:"r",encoding:null});stream.on("error",function(){res.writeHead(404);res.end("<h1>404 Read Error</h1>")});stream.pipe(res)}else{res.writeHead(404,{"Content-Type":"text/html"});res.end("<h1>404 Not Found</h1>")}})}var webSvr=libHttp.createServer(funWebSvr);webSvr.on("error",function(error){console.log(error)});

var port=1234;//在这里设置端口号

webSvr.listen(port,function(){console.log('WebServer running at http://127.0.0.1:'+port+'/');console.timeEnd('start WebServer need time')});
