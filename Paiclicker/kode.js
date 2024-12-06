let pai = document.getElementById("pai");
pai.addEventListener("click", paiclick)

let clickershop = document.getElementById("clickershop")
clickershop.addEventListener("click", buyclicker)

let bestefarshop = document.getElementById("bestefarshop")
bestefarshop.addEventListener("click", buygrandpa)

let hveteshop = document.getElementById("hveteshop")
hveteshop.addEventListener("click", buyhvete)

let paitotal=0;
let paipersekund=0;

let clickers=0;
let clickerscost=10;

let bestefarer=0;
let bestefarcost=100;

let hvete=0;
let hvetecost=1500;

function paiclick(){
    paitotal=paitotal+1;

    document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
}

function buyclicker(){
    if (paitotal>=clickerscost){
        clickers=clickers+1
        paitotal=paitotal-clickerscost
        clickerscost=Math.floor(clickerscost*1.2);
        paipersekund=paipersekund+0.5
        
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
        bestefarcost=Math.floor(bestefarcost*1.2)
        paipersekund=paipersekund+3
        
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
        hvetecost=Math.floor(hvetecost*1.2)
        paipersekund=paipersekund+25
        
        document.getElementById("hvetetall").innerText = "HVETEMEL: "+ hvete
        document.getElementById("hveteshowcost").innerText = "COST: " + hvetecost
        document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
        document.getElementById("paipersecond").innerText = "Making: "+ paipersekund + " pies/s"
    }

}

setInterval(myTimer, 1000);

function myTimer(){
    paitotal=paitotal+paipersekund

    document.getElementById("paicurrent").innerText = "Pies: "+ paitotal
    document.getElementById("paipersecond").innerText = "Making: "+ paipersekund + " pies/s"
}