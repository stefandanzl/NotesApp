var express = require("express");
var app = express();
var fs = require("fs");

process.env.TZ = "Europe/Vienna"

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/readnotes", function (req, res) {
  
   //SUCHEN
  function search(ld, items_count) {
    //var last_datum = last_datum;
    var items_count = items_count;

    var last_datum = new Date(ld);

    var year = last_datum.getFullYear();

    var month = last_datum.getMonth();
    console.log("JAHR:", year, " ,MONAT:", month);

    for (let y = year; y >= 2021; y--) {
      for (let m = month; m >= 0; m--) {
        var mh = m + 1;
        var mhs = "";
        if (mh < 10) {
          mhs = "0" + mh.toString();
        } else {
          mhs = mh;
        }
        var path = "./notes/" + y + "-" + mhs + ".json";

        console.log(">>", path);

        if (fs.existsSync(path)) {
          console.log("exists");

          var data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

          console.log("readFile");
          var content = JSON.parse(data);
          console.log(content.array);
          var l = content.array.length;


          // wenn Arrayposition in Arraybereich
          for (var d = 0; d < l; d++) {

               console.log("ITEM ",d);
            if (content.array[d].datum < ld){
              //parseInt(last_datum.getTime())) {
              //console.log("RETURN saved",ld-content.array[d].datum ,"++++", ld, "++++++",d);
              var json = {};
              json.y = y;
              json.m = mhs;
              json.d = d;
              console.log("RETURN ", json);
              return JSON.stringify(json);
            }


          }



        }
      }

      month = 11;
    }
  }

  function grab(location, items_count, ld) {
    console.log("grab");
    var location = JSON.parse(location);
    path = "./notes/" + location.y + "-" + location.m + ".json";
    console.log(path);
    var payload = [];
    var ic = items_count;
    var d = location.d;
    var last_datum = ld;

    const reee = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

    var data = JSON.parse(reee);

    for (var i = ic; i > 0; i--) {

      

      if (d < data.array.length) {
        if (last_datum == data.array[d]){
         
         
         return
        }
         payload.push(data.array[d]);
        console.log("readfile: ", data.array[d]);
        last_datum = data.array[d].datum
        d++;
        
      } 
      //if month was read entirely and next one has to be read
      else {
        
         //Hier muss last_date manuell geändert werden, da sonst immer das selbe, spätere Monat durchsucht wird!
  /*       var prev_month = last_datum.getMonth() - 1;
         if (prev_month >= 0) {
            var year = last_datum.getFullYear()
         }
         else {
            prev_month = 11;
            var year = last_datum.getFullYear()-1;
         }

*/
         //var ld = new Date(prev_month + ' 01,'+ year +' 00:00:00');

         var loc = search(last_datum,ic);
         if (loc){
        const location = JSON.parse(loc);
        
        // date.month is 0 based --> to get previous month nothing is added or subtracted!
      //  prev_month = last_datum.getMonth();
      //  prev_month >= 10 ? prev_month = prev_month : prev_month = "0" +prev_month.toString();
      

        path = "./notes/" + location.y + "-" + location.m + ".json";
        if (fs.existsSync(path)){
        const reee = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

        data = JSON.parse(reee);
        d = location.d;
        }
      }
   }
    
   //CODE
   
   
   
   }

    return payload;
  }


  //////////// ENTRYPOINT /////////////
console.log("REQUESTBODY",req.body);

  if (!req.body.last_datum) {
    var now = new Date();
    var last_datum = now.getTime();
  } else {
    //var last_datum = new Date();
    
    var last_datum = req.body.last_datum;
    

  }
  console.log("datum = " + last_datum);

  if (!req.body.items_count) {
    var items_count = 10;
  } else {
    var items_count = req.body.items_count;
  }
  console.log(items_count);

  //SUCHEN

  const location = search(last_datum, items_count);

  console.log("location: " + location, "!!");

  //ANTWORTEN
  if (location) {
    var payload = grab(location, items_count, last_datum);
  }
  const json_payload = new Object();
  if (!payload) {
    //console.log("Database AAAAAH");
    var payload = "Database Error!";
    json_payload.error = payload;
  }
  else{
   json_payload.array = payload;
  }
  
  res.end(JSON.stringify(json_payload)); //JSON.stringify(data));
});





app.post("/writenotes", function (req, res) {
  const now = new Date();

  var day = now.getDate(); // 24
  if (day < 10) {
    day = "0" + day.toString();
  }
  var month = now.getMonth(); // 10 (Month is 0-based, so 10 means 11th Month)
  month = month + 1;
  if (month < 10) {
    month = "0" + month.toString();
  }
  var year = now.getFullYear(); // 2020

  var hour = now.getHours();
  if (hour < 10) {
    hour = "0" + hour.toString();
  }
  var minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute.toString();
  }
  var second = now.getSeconds();
  if (second < 10) {
    second = "0" + second.toString();
  }


  const nDate = new Date().toLocaleString('en-US', {
   timeZone: 'Europe/Vienna'
 });
 
 console.log(nDate);


  console.log("body: ", req.body);
  console.log("text: ", req.body.text);
  //console.log("umbruch: ","t\ne\ns\nt");
  var data = JSON.stringify(req.body);

  const path = "./notes/" + year + "-" + month + ".json";

  var output = new Object();

  //   output.date = year + "-" + month + "-" + day;
  //   output.time = hour + ":" + minute + ":" + second;
  //   output.text = req.body.input;

  output.datum = now.getTime();
  output.text = req.body.text;

  var jsonString = JSON.stringify(output);

  try {
    if (fs.existsSync(path)) {
      //file exists

      //   fs.appendFile(path,writer , function (err) {
      //    if (err) throw err;
      //    console.log('File is appended successfully.');
      //  });

      fs.readFile(path, function read(err, data) {
        if (err) {
          throw err;
        }
        var content = JSON.parse(data);

        if (content.array[0].text!=output.text && output.text)
{
        //kein push
        content.array.unshift(output);
        var jsonObjString = JSON.stringify(content);

        console.log(content);

        fs.writeFile(path, jsonObjString, function (err) {
          if (err) throw err;
          console.log("File is appended successfully.\n\n\n\n");
        });
      }
      });
    } else {
      var jsonObj = new Object();
      jsonObj.array = [output];
      var jsonObjString = JSON.stringify(jsonObj);
      fs.writeFile(path, jsonObjString, function (err) {
        if (err) throw err;
        console.log("File is created successfully.\n\n\n\n");
      });
    }
  } catch (err) {
    console.error(err);
  }

  //console.log( "data: ",data );
  res.end("Time: " + hour + ":" + minute + ":" + second); //JSON.stringify(data));
});







app.post("/saveorganizer", function (req, res) {

  var data = req.body;

  const path = "./organizer.json";

  var output = new Object();

  output.todos = data.todos;
  output.calendar = data.calendar;

  var jsonObjString = JSON.stringify(output);

  try {

        fs.writeFile(path, jsonObjString, function (err) {
          if (err) throw err;
          console.log("File is appended successfully.\n\n\n\n");
        });
      }
catch (err) {
    console.error(err);
  }

  //console.log( "data: ",data );
  res.end("Organizer saved!"); //JSON.stringify(data));
});







app.post("/getorganizer", function (req, res) {

  const path = "./organizer.json";

  var output = new Object();


  try {
    if (fs.existsSync(path)) {

      var data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });

        var content = JSON.parse(data);
        
        output.todos = content.todos;
        output.calendar = content.calendar;

    } 
  } catch (err) {
    console.error(err);
  }


  // output.datum = now.getTime();

  res.end(JSON.stringify(output)); 
});






var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
