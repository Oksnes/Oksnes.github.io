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
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks DU VANT"
        score=score+1
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir DU TAPTE"
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
        liv=liv-1
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks UAVGJORT"
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir DU VANT"
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
        score=score+1
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks DU TAPTE"
        liv=liv-1
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir UAVGJORT"
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
    }
}


