const game = {
    status: [
        '','','',
        '','','',
        '','',''
    ],
    stsClass: [

    ],
}
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
    document.getElementById(`${id}`).innerHTML=`<img src='midia/${src}.png' class='show${src}'>`
}
function verifica() {
    const sts = game.status
    for(i=0;i<9;i+=3){
        if(sts[i] == sts[i+1] && sts[i] == sts[i+2] && (sts[i]!='')){
            console.log('victory1')
        }
    }
    for(i=0;i<3;i++){
        if(sts[i] == sts[i+3] && sts[i] == sts[i+6] && (sts[i]!='')){
            console.log('victory2')
        }
    }
    if(sts[0] == sts[4] && sts[0] == sts[8] && (sts[0]!='')){
        console.log('victory3')
    }
    if(sts[2] == sts[4] && sts[2] == sts[6] && (sts[0]!='')){
        console.log('victory4')
    }
}
function zera_status(){
    for(i in game.status){
        game.status[i]=''
    }
}