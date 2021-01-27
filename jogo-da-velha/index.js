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
let jogar = () => jogada(String(event.target.id)[3])
function jogada(player,alerta=true) {
    if(game.status[player-1]==''){
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
        document.getElementById(`div${player}`).removeEventListener('click',jogar,false) 
        if(disp==true && have_winner==false){
            bot()
            verifica()
        }
    }else{
        (alerta==true) ? alert('Jogada inválida') : null
    }
}
function bot() {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    let jbot = randint(1,9)
    if(game.status[jbot-1]==''){
        game.status[jbot-1]='o'
        draw(jbot,'o')
        document.getElementById(`div${jbot}`).removeEventListener('click',jogar,false) 
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
      let elem = document.getElementById(`div${i+1}`)
      elem.addEventListener('click',jogar,false) 
      elemEvt.push(elem)
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