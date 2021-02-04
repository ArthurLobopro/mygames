const game = {
    status: [
        '','','',
        '','','',
        '','',''
    ],
}
let pplayer = 0
let pbot = 0
const msg = document.getElementById('msg')
const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
const range = (min,max,pass=1) => {
    let array = []
    for(i = min;i<max;i+=pass){
        array.push(i)
    }
    return array
}
let jogar = (event) => jogada(String(event.target.id)[3])
function jogada(player,alerta=true) {
    if(game.status[player-1]==''){
        removeEventAll()
        game.status[player-1]='x'
        draw(player,'x')
        let have_winner = verifica()
        let disp = false
        for(i of game.status){
            if(i==''){
                disp=true
                break
            }
        }
        console.log(game.status);
        document.getElementById(`div${player}`).removeEventListener('click',jogar,false) 
        if(disp==true && have_winner==false){
            bot()
            verifica()
        }
        setTimeout(() => {
            addEventAll()
        }, 4000)
    }else{
        (alerta==true) ? alert('Jogada inválida') : null
    }
}
const vertical = (str) =>{
    const sts = game.status
    for(i of range(0,3)){
        if(sts[i]== str && sts[i+3] == str && sts[i+6] == '' ) { return i+6 }
        if(sts[i]== str && sts[i+3] == ''  && sts[i+6] == str) { return i+3 }
        if(sts[i]== ''  && sts[i+3] == str && sts[i+6] == str) { return i }
    }
    return ''
}
const horizontal = (str) =>{
    const sts = game.status
    for(i of range(0,7,3)){
        if(sts[i] == str && sts[i+1] == str && sts[i+2] == '') { return i+2 }
        if(sts[i] == str && sts[i+1] == '' && sts[i+2] == str) { return i+1 }
        if(sts[i] == '' && sts[i+1] == str && sts[i+2] == str) { return i }
    }
    return  ''
}
const diagonal = (str) =>{
    const sts = game.status
    if (sts[0] == str && sts[4] == str && sts[8] == '')  { return 8 }
    if (sts[0] == str && sts[4] == ''  && sts[8] == str) { return 4 }
    if (sts[0] == ''  && sts[4] == str && sts[8] == str) { return 0 }
    if (sts[2] == str && sts[4] == str && sts[6] == '')  { return 6 }
    if (sts[2] == str && sts[4] == ''  && sts[6] == str) { return 4 }
    if (sts[2] == ''  && sts[4] == str && sts[6] == str) { return 2 }
    return ''
}
function bot() {
    let jbot = vertical('o')
    jbot = (jbot==='') ? horizontal('o') : jbot
    jbot = (jbot==='') ? diagonal('o') : jbot
    jbot = (jbot==='') ? vertical('x') : jbot
    jbot = (jbot==='') ? diagonal('x') : jbot
    jbot = (jbot==='') ? horizontal('x') : jbot
    jbot = (jbot==='') ? randint(0,8) : jbot
    if(game.status[jbot]==''){
        game.status[jbot]='o'
        console.log(game.status);
        draw(jbot+1,'o')
        document.getElementById(`div${jbot+1}`).removeEventListener('click',jogar,false) 
    }else{
        bot()
    }
}
function draw(id,src) {
    document.getElementById(`div${id}`).innerHTML=`<img src='midia/${src}.png' class='show${src}'>`
}
// Validação de vitórias.
function verifica() {
    const sts = game.status
    let have_winner = false
    for(i=0;i<7;i+=3){
        if(sts[i] == sts[i+1] && sts[i] == sts[i+2] && (sts[i]!='')){
            win(sts[i],[i+1,i+2,i+3])
            have_winner=true
        }
    }
    for(i=0;i<3;i++){
        if(sts[i] == sts[i+3] && sts[i] == sts[i+6] && (sts[i]!='')){
            win(sts[i],[i+1,i+4,i+7])
            have_winner=true
        }
    }
    if(sts[0] == sts[4] && sts[0] == sts[8] && (sts[0]!='')){
        win(sts[0],[1,5,9])
        have_winner=true
    }
    if(sts[2] == sts[4] && sts[2] == sts[6] && (sts[2]!='')){
        win(sts[2],[3,5,7])
        have_winner=true
    }
    if(game.status.indexOf('')==-1 && have_winner==false){
        win()
    }
    return have_winner
}

function win(winner='en',sequence){
    if(winner=='x'){
        for( i of sequence){
            document.getElementById(`div${i}`).innerHTML=`<img src='midia/red-x.png'>`
        }
        pplayer++
        placar()
        msg.innerHTML=`Você venceu!<br><button onclick='newgame()'>Jogar outra vez</button>`
    }else if(winner=='o'){
        for( i of sequence){
            document.getElementById(`div${i}`).innerHTML=`<img src='midia/red-o.png'>`
        }
        pbot++
        placar()
        msg.innerHTML=`Você perdeu!<br><button onclick='newgame()'>Jogar outra vez</button>`
    }else if(winner=='en'){
        msg.innerHTML=`Empate!!<br><button onclick='newgame()'>Jogar outra vez</button>`
    }
    criaCookie(pplayer,pbot)
    removeEventAll()
}
function newgame(){
    for(i=0;i<9;i++){
        game.status[i]=''
        document.getElementById(`div${i+1}`).innerHTML=''
    }
    msg.innerHTML=''
    addEventAll()
}
// Detecção de cliques
let elemEvt
function addEventAll(){
    elemEvt = []
    for(i=0;i<9;i++) {
        if (game.status[i]=='') {
            let elem = document.getElementById(`div${i+1}`)
            elem.addEventListener('click',jogar,false) 
            elemEvt.push(elem)
        }
  }
}

function removeEventAll(){
    elemEvt= []
    for(i=0;i<9;i++) {
        let elem = document.getElementById(`div${i+1}`)
        elem.removeEventListener('click',jogar,false) 
        elemEvt.push(elem)
    }
}
// Cookies e Placar
function lercookie(){
    const cook = document.cookie
    if(cook==''){
        criaCookie()
    }else{
        let date = document.cookie.indexOf('placar')
        let x = cook.indexOf('x',date)
        pplayer=Number(cook.substring(7,x))
        pbot = Number(cook.substring(x+1,cook.length))
    }
    placar()
}
function criaCookie(player=0,bot=0){
    let date = new Date()
    date.setMonth(date.getMonth()+1)
    document.cookie=`placar=${player}x${bot};expires=${date};path=./;`
    lercookie()
}
function placar(){
    document.getElementById('player').innerText=pplayer
    document.getElementById('bot').innerText=pbot
}