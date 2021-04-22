import React from "react";
import { render } from "react-dom";
import { createUseStyles, ThemeProvider, useTheme } from "react-jss";
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

var mimeTypes = {
     "html": "text/html",
     "jpeg": "image/jpeg",
     "jpg": "image/jpeg",
     "png": "image/png",
     "js": "text/javascript",
     "css": "text/css"};

http.createServer((request, response)=>{
    var pathname = url.parse(request.url).pathname;
    var filename : string;
    if(pathname === "/"){
        filename = "myTest.html";
    }
    else
        filename = path.join(process.cwd(), pathname);

    try{
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        response.writeHead(200, {'Content-Type':mimeType});
        fileStream.pipe(response);
    }
    catch(e) {
            console.log('File not exists: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
    }
    return;
    }
}).listen(5000);

//import myTest from 'myTest.html'
var changeValue = require('/myTest.html');
const useStyles = createUseStyles({
  wrapper: {
    padding: 40,
    background: ({ theme }) => theme.background,
    textAlign: "left"
  },
  title: {
    font: {
      size: 40,
      weight: 900
    },
    color: ({ theme }) => theme.color
  },
  link: {
    color: ({ theme }) => theme.color,
    "&:hover": {
      opacity: 0.5
    }
  }
});


const Comp = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Hello React-JSS!</h1>
      <a
        className={classes.link}
        traget="_blank"
      >
        See docs
      </a>
     fs.readFile('/myTest.html', function (err, html) {

         http.createServer(function(request, response) {
                      response.writeHeader(200, {"Content-Type": "text/html"});
                      response.write(html);
                      response.end();
                  }).listen(PORT)


     });
    </div>
  );
};

const myHtmlTest = () => {
    return (
        <div dangerouslySetInnerHTML={ {_html: myTest} } />
    );
}

const theme = {
  background: "#f7df1e",
  color: "#24292e"
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Comp />
  </ThemeProvider>
);

render(<App />, document.getElementById("root"));
