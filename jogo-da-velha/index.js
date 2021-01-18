const game = {
    o: 'midia/o.png',
    x:'midia/x.png',
    status: [
        '','','',
        '','','',
        '','',''
    ],
}
function jogada(player) {
    if(game.status[player]==''){
        game.status.player='x'
        draw(3,game.x)
        setTimeout(bot(), 3000);
    }else{
        alert('Jogada inválida')
    }
}
function bot() {
    function randint(min,max){
        return Math.floor(Math.random() * (max-min+1)) + min
    }
    let bot = randint(0,9)
    if(game.status[bot]==''){
        game.status[bot]='o'
        draw(bot,game.o)
    }else{
        bot()
    }
}
function draw(id,src) {
    const div = document.getElementById(id)
    const o = `<img src='${src}' class='show'>`
    div.innerHTML=o
}
function zera_status(){
    for(i in game.status){
        game.status=''
    }
}