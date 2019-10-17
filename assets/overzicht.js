let dagen;

function init (){
    console.log('init')
    $.get( "https://beire-coole-bites-api.herokuapp.com/api/day/alldays", function( data ){
        dagen = data;
        finished()
    })
}

function finished(){
    let week = document.getElementById("week")
    dagen.forEach(d => {
        let dag = document.createElement('div');
        let naam = document.createElement('div');
        let personen = document.createElement('div');
        

        dag.setAttribute('class', 'dag');
        naam.setAttribute('class', 'dagNaam');

        naam.innerHTML = d.dayName;

        d.listPersons.forEach(p => {
            let persoon = document.createElement('div');
            persoon.innerHTML = p
            personen.appendChild(persoon)
        });


        dag.appendChild(naam)
        dag.appendChild(personen)
        week.appendChild(dag)
        personen.setAttribute('class', 'personen');
        
    });
}

window.onload = init();