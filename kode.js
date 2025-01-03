let button = document.getElementById("specialthing");

let params = "width=495,height=450,left=500,top=200"
let popup
button.onclick = () => {
    popup = window.open("bilder/cat explode.gif", "test", params)
    
}

setInterval(myTimer,100)
let condition=true

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        condition=false
    }
}

function myTimer(){

    if (popup && !popup.closed && condition==true) {
        popup.moveBy(Math.random() * 100 - 50, Math.random() * 100 - 50);
    }
}