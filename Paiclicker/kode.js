let pai = document.getElementById("pai");
pai.addEventListener("click", paiclick)

let paitotal=0;
let paipersekund=0;

let clikers=0;
let clickerscost=10;

let bestefar=0;
let bestefarcost=100;

function paiclick(){
    paitotal=paitotal+1;

    document.getElementById("paicurrent").innerText = "Pai: "+ paitotal
}