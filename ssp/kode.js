let img_stein = document.getElementById("stein")
let img_saks = document.getElementById("saks")
let img_papir = document.getElementById("papir")

let liv = 3
let score = 0
let streak = 0

img_stein.addEventListener("click", velgStein);
function velgStein(){
    let valg="stein"
    console.log(valg);

    let tilfeldig = Math.floor(Math.random() * 3);
    if (tilfeldig === 0) {
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Stein UAVGJORT"
        document.body.style.background = "darkblue"
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks DU VANT"
        document.body.style.background = "linear-gradient(rgb(44, 231, 44), rgb(15, 106, 15))"
        score=score+1;
        streak = streak+1;
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir DU TAPTE"
        document.body.style.background = "linear-gradient(rgb(208, 42, 36), rgb(92, 8, 8))";
        liv=liv-1
        streak = 0;
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    document.getElementById("streak").innerHTML ="Streak: " + streak
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
        document.getElementById("spillvalg").style.background ="linear-gradient(rgb(140, 36, 77), #362c3a)"
        document.getElementById("spillvalg").style.border ="7.5px solid rgb(73, 19, 69)"
        document.body.style.background = "rgb(59, 5, 33)"
    }
}

img_saks.addEventListener("click", valgSaks);
function valgSaks(){
    let valg="saks"
    console.log(valg);

    let tilfeldig = Math.floor(Math.random() * 3);
    if (tilfeldig === 0) {
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Stein DU TAPTE"
        document.body.style.background = "linear-gradient(rgb(208, 42, 36), rgb(92, 8, 8))";
        liv=liv-1
        streak = 0;
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks UAVGJORT"
        document.body.style.background = "darkblue"
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir DU VANT"
        document.body.style.background = "linear-gradient(rgb(44, 231, 44), rgb(15, 106, 15))"
        score=score+1
        streak = streak+1;
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    document.getElementById("streak").innerHTML ="Streak: " + streak
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
        document.getElementById("spillvalg").style.background ="linear-gradient(rgb(140, 36, 77), #362c3a)"
        document.getElementById("spillvalg").style.border ="7.5px solid rgb(73, 19, 69)"
        document.body.style.background = "rgb(59, 5, 33)"
    }
}

img_papir.addEventListener("click", valgPapir);
function valgPapir(){
    let valg="papir"
    console.log(valg);

    let tilfeldig = Math.floor(Math.random() * 3);
    if (tilfeldig === 0) {
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Stein DU VANT"
        document.body.style.background = "linear-gradient(rgb(44, 231, 44), rgb(15, 106, 15))"
        score=score+1
        streak = streak+1;
    }
    else if (tilfeldig === 1){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Saks DU TAPTE"
        document.body.style.background = "linear-gradient(rgb(208, 42, 36), rgb(92, 8, 8))";
        liv=liv-1
        streak = 0;
    }
    else if (tilfeldig === 2){
        document.getElementById("tekstboks").innerHTML ="Datamaskinen valgte Papir UAVGJORT"
        document.body.style.background = "darkblue"
    }
    document.getElementById("tekstboks2").innerHTML ="Du valgte " + valg
    document.getElementById("liv").innerHTML ="Du har: " + liv + " liv igjen"
    document.getElementById("score").innerHTML ="Score: " + score
    document.getElementById("streak").innerHTML ="Streak: " + streak
    
    if (liv === 0) {
        document.getElementById("spillvalg").innerHTML ="Du er ute av liv"
        document.getElementById("spillvalg").style.background ="linear-gradient(rgb(140, 36, 77), #362c3a)"
        document.getElementById("spillvalg").style.border ="7.5px solid rgb(73, 19, 69)"
        document.body.style.background = "rgb(59, 5, 33)"
    }
}
