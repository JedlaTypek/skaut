const svisti = [
    "Jirka",
    "Honza",
    "Franta",
    "Filip M.",
    "Oliver",
    "Štěpán",
    "Vojta",
    "David",
    "Filip Š.",
    //"Noe",
    "Metoděj",
    "Max"
]

// value je procento (v desetinnem cislu) peněz, které ukradne
// chance je v procentech
const chances = [
    [ // bez ochrance
        {value: 1, chance: 1},
        {value: 0.9, chance: 2},
        {value: 0.8, chance: 3},
        {value: 0.7, chance: 4},
        {value: 0.6, chance: 5},
        {value: 0.5, chance: 8},
        {value: 0.4, chance: 10},
        {value: 0.3, chance: 20},
        {value: 0.2, chance: 15},
        {value: 0.1, chance: 12},
        {value: 0, chance: 20}
    ],
    [ // s ochrancem
        {value: 0.5, chance: 1},
        {value: 0.45, chance: 2},
        {value: 0.4, chance: 3},
        {value: 0.35, chance: 4},
        {value: 0.3, chance: 5},
        {value: 0.25, chance: 5},
        {value: 0.2, chance: 10},
        {value: 0.15, chance: 10},
        {value: 0.1, chance: 5},
        {value: 0.05, chance: 5},
        {value: 0, chance: 50}
    ]
]

let index;
reset();

function koloStart(){
    let checkboxes = seznamDeti.querySelectorAll('input[type="checkbox"]:checked');
    if(checkboxes.length === 0){
        errorMessage.innerText = "Označ alespoň jednoho sviště."
    } else{
        let oznaceniSvisti = []
        checkboxes.forEach((checkbox) => {
            oznaceniSvisti.push(checkbox.value)
        });
        main.innerHTML = ""
        const vylosovanoTemplate = vylosovano.content.cloneNode(true)
        vylosovanoTemplate.getElementById('okraden').innerText = oznaceniSvisti[0]
        main.appendChild(vylosovanoTemplate)
        let animaceNadpisu = setInterval(function(){
            okraden.innerText = oznaceniSvisti[index]
            index = (index + 1) % oznaceniSvisti.length
        }, 60)
        setTimeout(() => {
            clearInterval(animaceNadpisu)
            okraden.innerText = getRandomItem(oznaceniSvisti)
        }, 1000);
    }
}

function okradeni(){
    let money = document.getElementById('penize').value;
    let ochrance = document.getElementById('ochrance').checked ? 1 : 0
    document.getElementById('form2').remove()
    document.getElementById('button2').remove()
    const konecTemplate = konec.content.cloneNode(true)
    konecTemplate.getElementById('ukradeno').innerText = Math.round(money * pickChance(chances, ochrance));
    main.appendChild(konecTemplate);
}

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function pickChance(chances, ochrance){ //ochrance je proměnná, která nabývá hodnoty 0 pokud nemá ochránce a hodnoty 1 pokud má
    let arrayChances = []
    chances[ochrance].forEach((data) => {
        for(let i = 0; i < data.chance; i++){
            arrayChances.push(data.value);
        }
    });
    return(getRandomItem(arrayChances));
}

function animaceNadpisu(poleNadpisu) {
    okraden.innerText = poleNadpisu[index];
    index = (index + 1) % poleNadpisu.length;
}

function reset(){
    index = 0
    main.innerHTML = ""
    const losovani = document.getElementById('losovani')
    const losovaniClone = losovani.content.cloneNode(true)
    main.appendChild(losovaniClone)
    svisti.forEach(svist => {
        const diteClone = dite.content.cloneNode(true)
        let checkbox = diteClone.querySelector("input")
        checkbox.setAttribute("id", svist)
        checkbox.setAttribute("value", svist)
        let label = diteClone.querySelector("label")
        label.setAttribute("for", svist)
        label.innerText = svist
        seznamDeti.appendChild(diteClone)
    })     
    oznacVse.addEventListener('click', () => {
        const checkboxes = seznamDeti.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = oznacVse.value === 'true');
        oznacVse.value = oznacVse.value === 'true' ? 'false' : 'true';
        oznacVse.innerText = oznacVse.value === 'true' ? "Označ vše" : "Označ nic";
    });
}
