let pai = document.getElementById("pai");
pai.addEventListener("click", paiclick);

let clickershop = document.getElementById("clickershop");
clickershop.addEventListener("click", buyclicker);

let berriesshop = document.getElementById("berriesshop");
berriesshop.addEventListener("click", buyberries);

let bestefarshop = document.getElementById("bestefarshop");
bestefarshop.addEventListener("click", buygrandpa);

let hveteshop = document.getElementById("hveteshop");
hveteshop.addEventListener("click", buyhvete);

let upgrade1 = document.getElementById("betterclicksshop");
upgrade1.addEventListener("click", buybetterclicks);

let upgrade2 = document.getElementById("greatclicksshop")
upgrade2.addEventListener("click", buygreatclicks)

let upgrade3 = document.getElementById("amazingclicksshop")
upgrade3.addEventListener("click", buyamazingclicks)

let upgrade4 = document.getElementById("walkingstickshop")
upgrade4.addEventListener("click", buywalkingstick)

let upgrade5 = document.getElementById("rollingpinshop")
upgrade5.addEventListener("click", buyrollingpin)

let upgrade6 = document.getElementById("timespeedshop")
upgrade6.addEventListener("click", buytimespeed)

let upgrade7 = document.getElementById("logarithmshop")
upgrade7.addEventListener("click", buylogarithm)

let paitotal=Math.floor(0); //denne er for kjøping
let paipersekundbase=0;

let eating = new Audio("media/eatingsfx.mp3");
let eatinglouder = new Audio("media/eatingsfxhigher.mp3")
let eatingquiet = new Audio("media/eatingsfxlower.mp3")
let soundchoice = 3

let totalclicks = 0;
let highestpie = 0;
let totalpie = 0; //denne er for stats
let buyablesbought = 0;

let clickmultiplier = 1; //multiplier av musen DIN
let totalmultiplier = 1; //multiplier av ALT SAMMEN
let timespeed = 1;
let logarithmboost = 0

let clickers=0; //total av clickers
let clickerscost=25; //hvor mye de koster

let berries=0;
let berriescost=50;

let bestefarer=0;  //total af bestefar
let bestefarcost=100;  //hvor mye de koster
let bestefarboost=0;  //base boost
let bestefarboosted=1;  //får å multiplisere boosten

let hvete=0; //total of wheat
let hvetecost=1500;  //hvor mye de koster
let hveteboost=0; //base boost
let hveteboosted=1; //får å multiplisere boosten

function paiclick(){

    if (logarithmboost==0) {
        paitotal=paitotal+(1*clickmultiplier)*totalmultiplier //denne er for kjøping
        totalpie=totalpie+(1*clickmultiplier)*totalmultiplier //denne er for stats
        totalclicks = totalclicks+1;
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("statsclick").innerText = "Clicks: "+ totalclicks
        document.getElementById("statstotalscore").innerText = "Total pies: "+ Math.floor(totalpie)
    } else if (logarithmboost==1){
        paitotal=paitotal+((1*clickmultiplier)*totalmultiplier)*(1+Math.log10(paitotal)) //denne er for kjøping
        totalpie=totalpie+((1*clickmultiplier)*totalmultiplier)*(1+Math.log10(paitotal)) //denne er for stats
        totalclicks = totalclicks+1;
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("statsclick").innerText = "Clicks: "+ totalclicks
        document.getElementById("statstotalscore").innerText = "Total pies: "+ Math.floor(totalpie)
    }


    soundchoice = Math.floor(Math.random(3))
    if (soundchoice==0){
        eating.play()
    } else if (soundchoice==1) {
        eatinglouder.play()
    } else if (soundchoice==2){
        eatingquiet.play()
    } else {
        eating.play()
    }


    if (highestpie<=paitotal) {
        highestpie=paitotal;
        document.getElementById("statshighscore").innerText= "Highest pie: "+ Math.floor(highestpie)
    }
}

function buyclicker(){
    if (paitotal>=clickerscost){
        clickers=clickers+1
        paitotal=paitotal-clickerscost
        clickerscost=Math.floor(clickerscost*1.35);
        clickmultiplier=clickmultiplier*1.05
        buyablesbought=buyablesbought+1
        
        document.getElementById("clickerstall").innerText = "CLICKERS: "+ clickers
        document.getElementById("clickershowcost").innerText = "COST: " + Math.floor(clickerscost)
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("statsbought").innerText = "Buyables bought: "+ buyablesbought
    }
}

function buyberries(){
    if (paitotal>=berriescost){
        berries=berries+1
        paitotal=paitotal-berriescost
        berriescost=Math.floor(berriescost*1.5)
        totalmultiplier=totalmultiplier*1.1
        buyablesbought=buyablesbought+1
        
        document.getElementById("berriestall").innerText = "BERRIES: "+ berries
        document.getElementById("berriesshowcost").innerText = "COST: " + Math.floor(berriescost)
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("statsbought").innerText = "Buyables bought: "+ buyablesbought
    }
}

function buygrandpa(){
    if (paitotal>=bestefarcost){
        bestefarer=bestefarer+1
        paitotal=paitotal-bestefarcost
        bestefarcost=Math.floor(bestefarcost*1.15)
        bestefarboost=bestefarboost+3
        buyablesbought=buyablesbought+1
        
        document.getElementById("grandpastall").innerText = "GRANDPAS: "+ bestefarer
        document.getElementById("grandpashowcost").innerText = "COST: " + Math.floor(bestefarcost)
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("statsbought").innerText = "Buyables bought: "+ buyablesbought
    }
}

function buyhvete(){
    if (paitotal>=hvetecost){
        hvete=hvete+1
        paitotal=paitotal-hvetecost
        hvetecost=Math.floor(hvetecost*1.17)
        hveteboost=hveteboost+25
        buyablesbought=buyablesbought+1
        
        document.getElementById("hvetetall").innerText = "WHEAT: "+ hvete
        document.getElementById("hveteshowcost").innerText = "COST: " + Math.floor(hvetecost)
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("statsbought").innerText = "Buyables bought: "+ buyablesbought
    }
}


function buybetterclicks(){
    if (paitotal>=10){
        clickmultiplier=clickmultiplier+1
        paitotal=paitotal-10
        upgrade1.removeEventListener("click", buybetterclicks)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("betterclickscost").innerText = "BOUGHT!"
        document.getElementById("betterclicksshop").style.display="none"
        document.getElementById("upgradeshop1").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buygreatclicks(){
    if (paitotal>=200){
        clickmultiplier=clickmultiplier+3
        paitotal=paitotal-200
        upgrade2.removeEventListener("click", buygreatclicks)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("greatclickscost").innerText = "BOUGHT!"
        document.getElementById("greatclicksshop").style.display="none"
        document.getElementById("upgradeshop2").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buyamazingclicks(){
    if (paitotal>=5000){
        totalmultiplier=totalmultiplier*2
        paitotal=paitotal-5000
        upgrade3.removeEventListener("click", buyamazingclicks)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("amazingclickscost").innerText = "BOUGHT!"
        document.getElementById("amazingclicksshop").style.display="none"
        document.getElementById("upgradeshop3").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buywalkingstick(){
    if (paitotal>=7500){
        bestefarboosted=bestefarboosted*2
        paitotal=paitotal-7500
        upgrade4.removeEventListener("click", buywalkingstick)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("walkingstickcost").innerText = "BOUGHT!"
        document.getElementById("walkingstickshop").style.display="none"
        document.getElementById("upgradeshop4").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buyrollingpin(){
    if (paitotal>=10000){
        hveteboosted=hveteboosted*2
        paitotal=paitotal-10000
        upgrade5.removeEventListener("click", buyrollingpin)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("rollingpincost").innerText = "BOUGHT!"
        document.getElementById("rollingpinshop").style.display="none"
        document.getElementById("upgradeshop5").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buytimespeed(){
    if (paitotal>=50000){
        timespeed=timespeed*1.5
        paitotal=paitotal-50000
        upgrade6.removeEventListener("click", buytimespeed)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("timespeedcost").innerText = "BOUGHT!"
        document.getElementById("timespeedshop").style.display="none"
        document.getElementById("upgradeshop6").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buylogarithm(){
    if (paitotal>=1000000){
        logarithmboost=logarithmboost+1;
        paitotal=paitotal-1000000
        upgrade7.removeEventListener("click", buylogarithm)

        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("logarithmcost").innerText = "BOUGHT!"
        document.getElementById("logarithmshop").style.display="none"
        document.getElementById("upgradeshop7").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}


let timer =1000/timespeed
setInterval(myTimer, timer);

function myTimer(){
    if (logarithmboost==0){
        paipersekundbase = ((bestefarboost*bestefarboosted) + (hveteboost*hveteboosted))
        let paipersekund = (paipersekundbase*totalmultiplier)
        paitotal=paitotal+paipersekund  //denne er for kjøping
        totalpie=totalpie+paipersekund  //Denne er for stats
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("paipersecond").innerText = "Making: "+ Math.floor(paipersekund *timespeed) + " pies/s"
        document.getElementById("statstotalscore").innerText = "Total pies: "+ Math.floor(totalpie)
    } else if (logarithmboost==1) {
        paipersekundbase = ((bestefarboost*bestefarboosted) + (hveteboost*hveteboosted))*(1+Math.log10(paitotal))
        let paipersekund = (paipersekundbase*totalmultiplier)
        paitotal=paitotal+paipersekund  //denne er for kjøping
        totalpie=totalpie+paipersekund  //Denne er for stats
        document.getElementById("paicurrent").innerText = "Pies: "+ Math.floor(paitotal)
        document.getElementById("paipersecond").innerText = "Making: "+ Math.floor(paipersekund *timespeed) + " pies/s"
        document.getElementById("statstotalscore").innerText = "Total pies: "+ Math.floor(totalpie)
    }



    if (highestpie<=paitotal) {
        highestpie=paitotal;
        document.getElementById("statshighscore").innerText= "Highest pie: "+ Math.floor(highestpie)
    }
}