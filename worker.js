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