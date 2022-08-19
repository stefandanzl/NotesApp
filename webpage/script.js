

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
    // Form fields, see IDs above

    var params = document.querySelector('#textfield').innerText;//.value;
    // if (!params){
    //     params = "";
    // }
    
    console.log("textfeld: ", params);

   // var text = JSON.stringify(params);

    var obj = new Object();
    obj.text = params//text;
    //var jsonString = obj;
    var jsonString= JSON.stringify(obj);
    // const params = {
    //     email: document.querySelector('#loginEmail').value,
    //     password: document.querySelector('#loginPassword').value
    // }

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://api.danzl.it/writenotes/')
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

}

function read(){

    console.log("READ");
}


function empty() {
    console.log("Cleared");
    document.getElementById("textfield").innerText = "";
    
    }


window.onload = empty;




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
