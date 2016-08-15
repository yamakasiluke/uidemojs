var http = require('http');
function onProxy(req,res) {
  // body...
  var getHeader = function (req) {
    var ret = {};
    for (var i in req.headers) {
      if (!/host|connection/i.test(i)) {
        ret[i] = req.headers[i];
      }
    }
    return ret;
  };

  // 获取请求的路径
  var getPath = function (req) {
    var url = req.url;
    if (url.substr(0, 7).toLowerCase() === 'http://') {
      var i = url.indexOf('/', 7);
      if (i !== -1) {
        url = url.substr(i);
      }
    }
    return url;
  };

  // the post options  
  var optionspost = {
    host:     '192.168.34.235',
    port: 8900,
    path:     getPath(req),
    method:   req.method,
    headers:  getHeader(req)
  };

  if (optionspost.headers['content-type'] != 'application/json') {
    data = require('querystring').stringify(req.body);
    optionspost.headers["Content-Length"] = data.length;
    var reqPost = http.request(optionspost, function (serverFeedback) {  
         if (serverFeedback.statusCode == 200) {  
             var body = "";  
             serverFeedback.on('data', function (data) { body += data; })  
                           .on('end', function () { res.send(200, body); });  
         }  
         else {  
             res.send(500, "error");  
         }  
     });  
       reqPost.write(data + "\n");  
       reqPost.end();  

  }else {
    // Request of JSON data  
    // 接收客户端的JSON数据  
    var reqJosnData = JSON.stringify(req.body);  
    // do the POST call  
    try{

      var reqPost = http.request(optionspost, function(resPost) {  
        console.log(optionspost);

          resPost.setEncoding('utf8');
          resPost.on('data', function(d) {  
              res.write(d);  
              // res.end();
          });  
          resPost.on('end', function(d) {  
              // res.write(d);  
              res.end();
          }); 
         
          resPost.on('error', function(d) {
                res.write({'error':1});
                res.end();
          });  
      });  
    }catch(e){
      console.log(e);
    }

    // write the json data  
    // 发送REST请求时传入JSON数据  
    reqPost.write(reqJosnData);  
    reqPost.end();  
    reqPost.on('error', function(e) {  
        console.error(e);  
    });
  }
}
module.exports = onProxy;


// 启动http服务器
// var server = http.createServer(onProxy);
// server.listen(8080);
// log('proxy server listen on http://127.0.0.1:8080');