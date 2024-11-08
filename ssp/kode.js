let img_stein = document.querySelector(".stein")
let img_saks = document.querySelector(".saks")
let img_papir = document.querySelector(".papir")

img_stein.addEventListener("click", valgStein);
img_saks.addEventListener("click", valgSaks);
img_papir.addEventListener("click", valgPapir);

// let liv = 3;
let valgbruker = "";
let score = 0;
let motstanderscore = 0;
// let streak = 0;
let runde = 0;


function valgStein(){
    valgbruker="stein"
    console.log(valgbruker);
    sjekkResultat();
}


function valgSaks(){
    valgbruker="saks"
    console.log(valgbruker);
    sjekkResultat();
}

function valgPapir(){
    valgbruker="papir"
    console.log(valgbruker);
    sjekkResultat();
}

function sjekkResultat() {
    let valgDatamaskin = Math.floor(Math.random() * 3);
    let arrayValg = ["stein", "saks", "papir"];
    valgDatamaskin = arrayValg[valgDatamaskin];

    let resultat ="";

    if (valgbruker == valgDatamaskin) {
        resultat = "Uavgjort!";
        document.body.style.background = "darkblue"

    } else if (valgbruker == "stein" && valgDatamaskin == "saks" || 
        valgbruker == "saks" && valgDatamaskin == "papir" || 
        valgbruker == "papir" && valgDatamaskin == "stein") {
        resultat = "Spelaren vant!";
        document.body.style.background = "linear-gradient(rgb(44, 231, 44), rgb(15, 106, 15))"
        score=score+1;

    } else {
        resultat = "Datamaskina vant!";
        motstanderscore++;
        document.body.style.background = "linear-gradient(rgb(208, 42, 36), rgb(92, 8, 8))";
    }
    runde++;
    document.getElementById("scores").innerHTML = "Score bruker: " + score + " motstander score: " + motstanderscore
    document.getElementById("tekstboks").innerHTML = resultat + " (Spelaren valte " + valgbruker + ", datamaskina valte " + valgDatamaskin + ")"; 
    if (runde >= 3){
        if (score > motstanderscore) {
            document.getElementById("spillvalg").innerHTML ="DU VANT <br> trykk på space for å starte på nytt"
        }
        else if (score === motstanderscore){
            document.getElementById("spillvalg").innerHTML ="UAVGJORT <br> trykk på space for å starte på nytt"
        }
        else if (score < motstanderscore) {
            document.getElementById("spillvalg").innerHTML ="DU TAPTE <br> trykk på space for å starte på nytt"
        }
        img_stein.removeEventListener("click", valgStein);
        img_saks.removeEventListener("click", valgSaks);
        img_papir.removeEventListener("click", valgPapir);
    }
}


document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        reset();
    }
}

function reset() {
    valgbruker = "";
    score = 0;
    motstanderscore = 0;
    runde = 0;

    document.body.style.background="rgb(109, 105, 105)"

    let imgStein = document.createElement("img");
    let imgSaks = document.createElement("img");
    let imgPapir = document.createElement("img");
    imgStein.src = "stein.svg";
    imgSaks.src = "saks.svg";
    imgPapir.src = "papir.svg";

    imgStein.style.width = "400px";
    imgSaks.style.width = "400px";
    imgPapir.style.width = "300px";

    imgStein.style.margin="20px"
    imgSaks.style.margin="20px"
    imgPapir.style.margin="20px"

    imgStein.style.transition = "transform 0.3s ease-in-out;"
    imgSaks.style.transition = "transform 0.3s ease-in-out;"
    imgPapir.style.transition = "transform 0.3s ease-in-out;"

    imgStein.style.filter = "drop-shadow(0 0 10px rgb(255, 255, 255));"
    imgSaks.style.filter = "drop-shadow(0 0 10px rgb(255, 255, 255));"
    imgPapir.style.filter = "drop-shadow(0 0 10px rgb(255, 255, 255));"

    imgStein.style.cursor ="pointer"
    imgSaks.style.cursor ="pointer"
    imgPapir.style.cursor ="pointer"
    // imgStein.setAttribute("class", stein)
    document.getElementById("spillvalg").innerHTML= ""
    document.getElementById("spillvalg").appendChild(imgStein);
    document.getElementById("spillvalg").appendChild(imgSaks);
    document.getElementById("spillvalg").appendChild(imgPapir);

    imgStein.addEventListener("click", valgStein);
    imgSaks.addEventListener("click", valgSaks);
    imgPapir.addEventListener("click", valgPapir);
}