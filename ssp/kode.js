let img_stein = document.getElementById("stein")
let img_saks = document.getElementById("saks")
let img_papir = document.getElementById("papir")

let liv = 3
let score = 0

img_stein.addEventListener("click", velgStein);
function velgStein(){
    let valg="stein"
    console.log(valg);

    let tilfeldig = Math.floor(Math.random() * 3);
    if (tilfeldig === 0) {
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Stein UAVGJORT"
        document.body.style.background = "rgb(59, 5, 33)"
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks DU VANT"
        document.body.style.background = "linear-gradient(rgb(11, 206, 11), rgb(11, 142, 11))"
        score=score+1
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir DU TAPTE"
        document.body.style.background = "linear-gradient(rgb(177, 21, 15), rgb(136, 12, 12))";
        liv=liv-1
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
    }
}

img_saks.addEventListener("click", valgSaks);
function valgSaks(){
    let valg="saks"
    console.log(valg);

    let tilfeldig = Math.floor(Math.random() * 3);
    if (tilfeldig === 0) {
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Stein DU TAPTE"
        document.body.style.background = "linear-gradient(rgb(177, 21, 15), rgb(136, 12, 12))";
        liv=liv-1
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks UAVGJORT"
        document.body.style.background = "rgb(59, 5, 33)"
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir DU VANT"
        document.body.style.background = "linear-gradient(rgb(11, 206, 11), rgb(11, 142, 11))"
        score=score+1
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
    }
}

img_papir.addEventListener("click", valgPapir);
function valgPapir(){
    let valg="papir"
    console.log(valg);

    let tilfeldig = Math.floor(Math.random() * 3);
    if (tilfeldig === 0) {
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Stein DU VANT"
        document.body.style.background = "linear-gradient(rgb(11, 206, 11), rgb(11, 142, 11))"
        score=score+1
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks DU TAPTE"
        document.body.style.background = "linear-gradient(rgb(177, 21, 15), rgb(136, 12, 12))";
        liv=liv-1
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir UAVGJORT"
        document.body.style.background = "rgb(59, 5, 33)"
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
    }
}


