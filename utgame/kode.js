let upgrp1 = document.getElementById("upgrp1b")
let upgrp2 = document.getElementById("upgrp2b")
let buybp1 = document.getElementById("buybp1b")
let buybp2 = document.getElementById("buybp2b")
let rebirthlayer = document.getElementById("rebirthdisplay")

let points = 10;
let pointspersec = 0;
let rebirth = 0
let possiblerebirth = 1


upgrp1.addEventListener("click", buyupgrp1)
upgrp2.addEventListener("click", buyupgrp2)
buybp1.addEventListener("click", buybuybp1)
buybp2.addEventListener("click", buybuybp2)
rebirthlayer.addEventListener("click", doARebirth)

function buyupgrp1(){
    if (points>=10){
        points=points-10
        pointspersec=1
        document.getElementById("boughtupgrp1").innerText="Maxed (1/1)"
        document.getElementById("upgrp1").style.backgroundColor="lightgreen"
        document.getElementById("upgrp1b").style.display="none"
        document.getElementById("upgrp2").style.display="block"
        document.getElementById("buybp1").style.display="block"
    }
}
let upgrade2bought=false
function buyupgrp2(){
    if (points>=15){
        points=points-15
        pointspersec=pointspersec*2.5
        upgrade2bought=true
        document.getElementById("boughtupgrp2").innerText="Maxed (1/1)"
        document.getElementById("upgrp2").style.backgroundColor="lightgreen"
        document.getElementById("upgrp2b").style.display="none"
    }

    if (upgrade2bought==true && buyable1bought==true){
        document.getElementById("buybp2").style.display="block"
    }
}
let buyable1bought=false
let boughtb1=0
let priceb1=35
function buybuybp1(){
    if (points>=priceb1){
        points=points-priceb1
        priceb1=priceb1*2.25
        pointspersec=pointspersec*2
        boughtb1=boughtb1+1
        buyable1bought=true

        document.getElementById("buybp1b").innerText= "Cost: " + formatPoints(priceb1) + " Points"
        document.getElementById("buybp1").style.backgroundColor="lightblue"
        document.getElementById("boughtbuybp1").innerText="Bought ("+boughtb1+"/5)"
        if (boughtb1==5){
            document.getElementById("boughtbuybp1").innerText="Maxed (5/5)"
            document.getElementById("buybp1").style.backgroundColor="lightgreen"
            document.getElementById("buybp1b").style.display="none"
        }
    } 

    if (upgrade2bought==true && buyable1bought==true){
        document.getElementById("buybp2").style.display="block"
    }
}
let priceb2=150
let boughtb2=0
let buyable2bought=false
function buybuybp2(){
    if (points>=priceb2){
        points=points-priceb2
        priceb2=priceb2*3.5
        pointspersec=pointspersec*3
        boughtb2=boughtb2+1
        buyable2bought=true
        document.getElementById("rlayer").style.display="block"

        document.getElementById("buybp2b").innerText= "Cost: " + formatPoints(priceb2) + " Points"
        document.getElementById("boughtbuybp2").innerText="Bought ("+boughtb2+"/10)"
        document.getElementById("buybp2").style.backgroundColor="lightblue"
        if (boughtb2==10){
            document.getElementById("boughtbuybp2").innerText="Maxed (10/10)"
            document.getElementById("buybp2").style.backgroundColor="lightgreen"
            document.getElementById("buybp2b").style.display="none"
        }
    } 
}

function doARebirth(){
 //ADD STUFF HERE
}

const formatPoints = n => {
    if (n < 1e3) return n.toFixed(1);
    if (n >= 1e3 && n<1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n<1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n<1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

setInterval(myTimer,100); //10 times a second so everything updates faster

function myTimer(){
    points=points+pointspersec/10 //divided by 10 because everything goes faster
    possiblerebirth=1+Math.log10(points)^0.3

    document.getElementById("pointsdisplay").innerText= "Points: " + formatPoints(points)
    document.getElementById("pointspersecdisplay").innerText= formatPoints(pointspersec)+" points/s"
    document.getElementById("rebirthdisplay").innerText= "Rebirth for: "+ possiblerebirth+ " points"
}