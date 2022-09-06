const { lookup } = require("dns");

//const root = "https://api.danzl.it";
const root = "http://localhost:8081";

function show_alert_text(message){

    //let alert_text = document.createElement("div");

    alert_text.innerText = message;
    //alert_text.setAttribute("id", "alert_text");
    //document.getElementById("contento").appendChild(alert_text);
    

    setTimeout(function() {
        console.log("Callback Funktion wird aufgerufen");
        alert_text.innerText = "";
        //alert_text.remove();    
    }, 3000);




}



function save() {
   
   if (loaded){
    // Form fields, see IDs above
    var todos = document.querySelector('#todos').innerText;

    var text = document.querySelector('#textfield').innerText;//.value;
    
    var calendar = document.querySelector('#calendar').innerText;
    // if (!params){
    //     params = "";
    // }
    
    console.log("textfeld: ", text);

   // var text = JSON.stringify(params);

    var obj = new Object();
    obj.todos = todos;
    obj.text = text;
    obj.calendar = calendar;

    //var jsonString = obj;
    var jsonString= JSON.stringify(obj);
    // const params = {
    //     email: document.querySelector('#loginEmail').value,
    //     password: document.querySelector('#loginPassword').value
    // }

    const xhr = new XMLHttpRequest()
    xhr.open('POST', root + '/writenotes/')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(jsonString) // Make sure to stringify
    // console.log("String:",JSON.stringify(params) )
    
    // http.onload = function() {
    //     // Do whatever with response
    //     alert("Antwort: ", http.response)
    // }


    xhr.onerror = function () {
        console.log("** An error occurred during the transaction");
        show_alert_text("CONNECTION ERROR");
      };


    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.response);
                // console.log(xhr.responseText);
                // alert("Antwort: ",xhr.responseText);
                //var antwort = JSON.parse(xhr.responseText);
                //alert("Save Successful!");
                //console.log("Input: ", antwort.input);

                show_alert_text("SAVE SUCCESSFUL");

            }
        }
    };

}}

function read(){

    console.log("READ");
}



function update() {
    // Form fields, see IDs above
    if (loaded){
    var todos = document.querySelector('#todos').innerText;

    var text = document.querySelector('#textfield').innerText;//.value;
    
    var calendar = document.querySelector('#calendar').innerText;


    var obj = new Object();
    obj.todos = todos;
    obj.text = text;
    obj.calendar = calendar;

    //var jsonString = obj;
    var jsonString= JSON.stringify(obj);


    const xhr = new XMLHttpRequest()
    xhr.open('POST', root +'/saveorganizer')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(jsonString) // Make sure to stringify


    xhr.onerror = function () {
        console.log("** An error occurred during the transaction");
        show_alert_text("CONNECTION ERROR");
      };


    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.response);


                show_alert_text("SAVE SUCCESSFUL");

            }
        }
    };
    }
}





var prev_todos = "";
var prev_text = "";
var prev_calendar = "";









function reload() {

    console.log("Cleared");
    document.getElementById("textfield").innerText = "";
    
    const xhr = new XMLHttpRequest()
    var jsonString = new Object();
    
    xhr.open('POST', root+'/getorganizer')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(jsonString))

    xhr.onerror = function () {
        console.log("** An error occurred during the transaction");
        show_alert_text("CONNECTION ERROR");
      };


    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.response);

                var response = JSON.parse(xhr.response)
                document.getElementById("todos").innerText = response.todos;
                document.getElementById("calendar").innerText = response.calendar;

                // show_alert_text("SAVE SUCCESSFUL");
                loaded = true;

                prev_todos = document.querySelector('#todos').innerText;
                prev_text = document.querySelector('#textfield').innerText;
                prev_calendar = document.querySelector('#calendar').innerText;

            }
        }
    };



    }

var loaded = false;

window.onload = reload;





var fc = 0;

var bg = 0;
var sd = 0;

var music = new Audio('https://stream.srg-ssr.ch/m/rsj/mp3_128');




function playMusic(){
if (sd ==0){
  
  music.play();
  sd = 1;
  }
else {music.pause();
sd = 0;}
}



function fokus(){
    console.log("focustest");
    if (fc == 0){
        document.getElementById("left").style.visibility = "hidden";
        document.getElementById("right").style.visibility = "hidden";
        fc = 1;
    }
    else{
        document.getElementById("left").style.visibility = "visible";
        document.getElementById("right").style.visibility = "visible";
        fc = 0;
    
    }
    }








let worker = new Worker(
    `data:text/javascript,

    
    var doUpdate = false;


    function checkChange(){

        console.log("CHECK CHANGE");

        if (document.querySelector('#todos').innerText != prev_todos){doUpdate = true;}

        if (document.querySelector('#todos').innerText != prev_text){doUpdate = true;}
        
        if (document.querySelector('#calendar').innerText != prev_calendar){doUpdate = true;}
        
        if (doUpdate){
            save();
            update();
            doUpdate = false;
        }


    }


    function timer(){
        checkChange();
        setInterval(timer,5000);

    }
    onmessage = function(){    //This will be called when worker.postMessage is called in the outside code.
        
        timer();
        
        //let foo = event.data;    //Get the argument that was passed from the outside code, in this case foo.
        //let result = functionThatTakesLongTime(foo);    //Find the result. This will take long time but it doesn't matter since it's called in the worker.
        //postMessage(result);    //Send the result to the outside code.
    };
    `
);

// worker.onmessage = function(event){    //Get the result from the worker. This code will be called when postMessage is called in the worker.
//     alert("The result is " + event.data);
// }

//           worker.postMessage();    //Send foo to the worker (here foo is just some variable that was defined somewhere previously).







// // Infinity loop
// function loop(){


// checkChange();

// setTimeout(loop(),5000);



// // var todos = document.querySelector('#todos').innerText;
// // var text = document.querySelector('#textfield').innerText;
// // var calendar = document.querySelector('#calendar').innerText;




// }

// loop();


document.addEventListener("visibilitychange", () => {
    console.log(document.visibilityState);
    save();
    // Modify behavior…
  })

