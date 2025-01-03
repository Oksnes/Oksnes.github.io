let upgrp1 = document.getElementById("upgrp1b")
let upgrp2 = document.getElementById("upgrp2b")
let buybp1 = document.getElementById("buybp1b")
let buybp2 = document.getElementById("buybp2b")

let points = 10;
let pointspersec = 0;


upgrp1.addEventListener("click", buyupgrp1)
upgrp2.addEventListener("click", buyupgrp2)
buybp1.addEventListener("click", buybuybp1)
buybp2.addEventListener("click", buybuybp2)

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
    if (points>=priceb1 && boughtb1<4){
        points=points-priceb1
        priceb1=priceb1*2.25
        pointspersec=pointspersec*2
        boughtb1=boughtb1+1
        buyable1bought=true
        document.getElementById("buybp1b").innerText= "Cost: " + Math.floor(priceb1) + " Points"

        document.getElementById("boughtbuybp1").innerText="Bought ("+boughtb1+"/5)"
    } else if (points>=priceb1 && boughtb1==4){
        points=points-priceb1
        priceb1=priceb1*2.25
        pointspersec=pointspersec*2
        boughtb1=boughtb1+1

        document.getElementById("boughtbuybp1").innerText="Maxed (5/5)"
        document.getElementById("buybp1").style.backgroundColor="lightgreen"
        document.getElementById("buybp1b").style.display="none"
    }

    if (upgrade2bought==true && buyable1bought==true){
        document.getElementById("buybp2").style.display="block"
    }
}
let priceb2=150
let boughtb2=0
function buybuybp2(){
    if (points>=priceb2){
        points=points-priceb2
        priceb2=priceb2*3.2
        pointspersec=pointspersec*3
        boughtb2=boughtb2+1

        document.getElementById("buybp2b").innerText= "Cost: " + Math.floor(priceb2) + " Points"
        document.getElementById("boughtbuybp2").innerText="Bought ("+boughtb2+"/inf)"
        document.getElementById("buybp2").style.backgroundColor="lightblue"
    }
}

setInterval(myTimer,100); //10 times a second so everything updates faster

function myTimer(){
    points=points+pointspersec/10 //divided by 10 because everything goes faster

    document.getElementById("pointsdisplay").innerText= "Points: " + Math.floor(points)
    document.getElementById("pointspersecdisplay").innerText= pointspersec+" points/s"
}