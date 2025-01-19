let riktigeSvar = 0
document.getElementById("skjema").addEventListener("submit", oppgaverFunksjon);

function oppgaverFunksjon(event){
  event.preventDefault()

  let oppgave1 = document.querySelector("#oppgave1").value;
  let oppgave2 = document.querySelector("#oppgave2").value;
  let oppgave3 = document.querySelector("#oppgave3").value;
  let oppgave4 = document.querySelector("#oppgave4").value;

  if (oppgave1=="Aluminium"||oppgave1=="aluminium"){
    riktigeSvar=riktigeSvar+1
  }

  if (oppgave2==25){
    riktigeSvar=riktigeSvar+1
  }

  if (oppgave3==235||oppgave3==235.6){
    riktigeSvar=riktigeSvar+1
  }

  if (oppgave4=="Palladium"||oppgave4=="palladium"){
    riktigeSvar=riktigeSvar+1
  }
  document.getElementById("poengsum").innerText= "Poengsum: " + riktigeSvar+"/4"
  riktigeSvar=0
}