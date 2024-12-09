let pai = document.getElementById("pai");
pai.addEventListener("click", paiclick);

let clickershop = document.getElementById("clickershop");
clickershop.addEventListener("click", buyclicker);

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

let paitotal=0;
let paipersekundbase=0;

let clickmultiplier = 0;
let totalmultiplier = 1;

let clickers=0;
let clickerscost=10;

let bestefarer=0;
let bestefarcost=100;

let hvete=0;
let hvetecost=1500;

function paiclick(){
    paitotal=paitotal+(1+clickmultiplier)*totalmultiplier

    document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
}

function buyclicker(){
    if (paitotal>=clickerscost){
        clickers=clickers+1
        paitotal=paitotal-clickerscost
        clickerscost=Math.floor(clickerscost*1.12);
        paipersekundbase=paipersekundbase+0.5
        
        document.getElementById("clickerstall").innerText = "CLICKERS: "+ clickers
        document.getElementById("clickershowcost").innerText = "COST: " + clickerscost
        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("paipersecond").innerText = "Making: "+ paipersekund + " pies/s"
    }
}

function buygrandpa(){
    if (paitotal>=bestefarcost){
        bestefarer=bestefarer+1
        paitotal=paitotal-bestefarcost
        bestefarcost=Math.floor(bestefarcost*1.15)
        paipersekundbase=paipersekundbase+3
        
        document.getElementById("grandpastall").innerText = "GRANDPAS: "+ bestefarer
        document.getElementById("grandpashowcost").innerText = "COST: " + bestefarcost
        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("paipersecond").innerText = "Making: "+ paipersekund + " pies/s"
    }

}

function buyhvete(){
    if (paitotal>=hvetecost){
        hvete=hvete+1
        paitotal=paitotal-hvetecost
        hvetecost=Math.floor(hvetecost*1.17)
        paipersekundbase=paipersekundbase+25
        
        document.getElementById("hvetetall").innerText = "HVETEMEL: "+ hvete
        document.getElementById("hveteshowcost").innerText = "COST: " + hvetecost
        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("paipersecond").innerText = "Making: "+ paipersekund + " pies/s"
    }

}


function buybetterclicks(){
    if (paitotal>=10){
        clickmultiplier=clickmultiplier+1
        paitotal=paitotal-10
        upgrade1.removeEventListener("click", buybetterclicks)

        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("betterclickscost").innerText = "BOUGHT!"
        document.getElementById("betterclicksshop").style.display="none"
        document.getElementById("upgradeshop1").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buygreatclicks(){
    if (paitotal>=200){
        clickmultiplier=clickmultiplier+4
        paitotal=paitotal-200
        upgrade1.removeEventListener("click", buygreatclicks)

        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("greatclickscost").innerText = "BOUGHT!"
        document.getElementById("greatclicksshop").style.display="none"
        document.getElementById("upgradeshop2").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}

function buyamazingclicks(){
    if (paitotal>=5000){
        totalmultiplier=totalmultiplier*2
        paitotal=paitotal-5000
        upgrade1.removeEventListener("click", buyamazingclicks)

        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("amazingclickscost").innerText = "BOUGHT!"
        document.getElementById("amazingclicksshop").style.display="none"
        document.getElementById("upgradeshop3").style.background= "linear-gradient(rgb(78, 104, 105),rgb(67, 171, 179))"
    }
}


setInterval(myTimer, 1000);

function myTimer(){
    let paipersekund = (paipersekundbase*totalmultiplier)
    paitotal=paitotal+paipersekund

    document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
    document.getElementById("paipersecond").innerText = "Making: "+ paipersekund + " pies/s"
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        paitotal=paitotal+10000
        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
    }
}