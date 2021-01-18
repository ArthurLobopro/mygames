const game = {
    status: [
        '','','',
        '','','',
        '','',''
    ],
}
let jogar = () => jogada(String(event.target.id)[3])
function jogada(player,alerta=true) {
    if(game.status[player-1]==''){
        game.status[player-1]='x'
        draw(player,'x')
        let disp = false
        for(i of game.status){
            if(i==''){
                disp=true
                break
            }
        }
        document.getElementById(`div${player}`).removeEventListener('click',jogar,false) 
        if(disp==true){
            bot()
            verifica()
        }else{
            verifica()
        }
        console.log(game.status)
    }else{
        (alerta==true) ? alert('Jogada inválida') : null
    }
}
function bot() {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    let jbot = randint(1,9)
    console.log(jbot)
    if(game.status[jbot-1]==''){
        game.status[jbot-1]='o'
        draw(jbot,'o')
    }else{
        bot()
    }
}
function draw(id,src) {
    document.getElementById(`div${id}`).innerHTML=`<img src='midia/${src}.png' class='show${src}'>`
}
function verifica() {
    const sts = game.status
    for(i=0;i<7;i+=3){
        if(sts[i] == sts[i+1] && sts[i] == sts[i+2] && (sts[i]!='')){
            console.log('victory1')
            win(sts[i],[i+1,i+2,i+3])
        }
    }
    for(i=0;i<3;i++){
        if(sts[i] == sts[i+3] && sts[i] == sts[i+6] && (sts[i]!='')){
            console.log('victory2')
            win(sts[i],[i+1,i+4,i+7])
        }
    }
    if(sts[0] == sts[4] && sts[0] == sts[8] && (sts[0]!='')){
        console.log('victory3')
        win(sts[0],[1,5,9])
    }
    if(sts[2] == sts[4] && sts[2] == sts[6] && (sts[2]!='')){
        console.log('victory4')
        win(sts[2],[3,5,7])
    }
}
function zera_status(){
    for(i in game.status){
        game.status[i]=''
    }
}
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
function win(winner,sequence){
    const msg = document.getElementById('msg')
    if(winner=='x'){
        for( i of sequence){
            document.getElementById(`div${i}`).innerHTML=`<img src='midia/red-x.png'>`
        }
        msg.innerText='Você venceu!'
    }else{
        for( i of sequence){
            document.getElementById(`div${i}`).innerHTML=`<img src='midia/red-o.png'>`
        }
        msg.innerText='Você perdeu!'
    }
    removeEventAll()
}
addEventAll()