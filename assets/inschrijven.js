let dagen;

let menus = {
    menu1: 'Gekookte aardappelen, gebakken kalfslapje met bloemkool in béchamelsaus',
    menu2: 'Tomatensoep, volkoren pasta met gegrilde zalm in roomsaus met prei',
    menu3: 'Erwtensoep, kalkoenlapje met gekookte aardappelen en rodekool met appel',
    menu4: 'Wortelsoep, gebakken kipblokjes met spinazie en puree',
    menu5: 'Pompoensoep, kabeljauw met vissaus, volkoren rijst en gegratineerde courgettes'
}

function init() {
    $('#content').hide();
    $('#loadingDiv').show();
    document.getElementById("submit").addEventListener("click", submit, false);
    $.get("https://beire-coole-bites-api.herokuapp.com/api/day/alldays", function (data) {
        $('#loadingDiv').hide();
        $('#content').show();
        dagen = data;
        done();
    })
}

function done() {
    loadMenus();
    toHtml();
}

function loadMenus() {
    addMenuToDay('maandag', menus.menu1);
    addMenuToDay('dinsdag', menus.menu2);
    addMenuToDay('woensdag', menus.menu2);
    addMenuToDay('donderdag', menus.menu4);
    addMenuToDay('vrijdag', menus.menu5);
}

function toHtml() {
    let week = document.getElementById("week")
    dagen.forEach(d => {
        let dag = document.createElement('div');
        let naam = document.createElement('div');
        let menu = document.createElement('div');
        let radio = document.createElement('input')

        radio.type = 'radio'
        radio.name = 'group1'
        radio.id = 'radio';
        menu.setAttribute('class', 'menu')
        dag.setAttribute('class', 'dag');
        naam.setAttribute('class', 'dagNaam');

        menu.innerHTML = d.menu
        naam.innerHTML = d.dayName;

        dag.appendChild(naam)
        dag.appendChild(menu)
        dag.appendChild(radio)
        week.appendChild(dag)

    });
}

function submit() {
    let gekozenDag;
    if (document.getElementById('voornaam').value === "" || document.getElementById('achternaam').value === "" || document.getElementById('email').value === "") {
        document.getElementById('nietOk').innerHTML = 'vul alle velden in'
    } else {
        document.getElementById('nietOk').innerHTML = ''
        if (!emailIsValid(document.getElementById('email').value)) {
            document.getElementById('emailNietOk').innerHTML = 'vul een geldig email in.'
        }else{
            
            document.getElementById('emailNietOk').innerHTML = ''
            var ele = document.getElementsByName('group1');
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
                    gekozenDag = ele[i].parentElement.firstChild.innerHTML;
                }
            }
    
            let name = document.getElementById('voornaam').value + " " + document.getElementById('achternaam').value
            _ajax_request(`https://beire-coole-bites-api.herokuapp.com/api/day/addPerson?name=${name}&day=${gekozenDag}`,'PUT', function(result) {
                if (result === '200 OK') {
                    alert('ingeschreven!');
                }
            })

        }
        
    }
}

function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
}

function _ajax_request(url, method, callback) {
    return jQuery.ajax({
        url: url,
        type: method,
        success: callback
    });
}

function addMenuToDay(day, menu) {
    var result = dagen.find(obj => {
        return obj.dayName === day
    })

    result.menu = menu;
}






window.onload = init();