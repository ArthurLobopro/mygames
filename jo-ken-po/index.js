let player = 0
let bot = 0
const opcoes = {
    caminho: [ 'midia/pedra.svg','midia/papel.svg','midia/tesoura.svg'],
    texto: ['JO','KEN','PO']
}
const content = document.getElementById('content')
function lercookie(){
    const cook = document.cookie
    if(cook==''){
        criaCookie()
    }else{
        let date = document.cookie.indexOf('placar')
        let x = cook.indexOf('x',date)
        player=Number(cook.substring(7,x))
        bot = Number(cook.substring(x+1,cook.length))
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
    document.getElementById('player').innerText=player
    document.getElementById('bot').innerText=bot
}
function randint(min,max){
    return Math.floor(Math.random() * (max-min+1)) + min
}
function jogada(valor){
    const jogadas = ['pedra','papel','tesoura']
    const jogador = valor
    const computador = jogadas[randint(0,2)]
    jokenpo()
    setTimeout(() => {
        resultado(jogador,computador)
    }, 4000);
}
function jokenpo(){
    content.innerHTML=`
    <div id="jokenpo-animation">
        <div class='img'></div>
        <div class='img'></div>
        <div class='img'></div>
        <div class='txt'></div>
        <div class='txt'></div>
        <div class='txt'></div>
    </div>`
    img(0,500)
    txt(0,1000)
    img(1,1500)
    txt(1,2000)
    img(2,2500)
    txt(2,3000)
    function img(value,time) {
        setTimeout(() => {
            document.querySelectorAll('div.img')[value].innerHTML=`<img src="${opcoes.caminho[value]}" class='up'>`
        }, time);
    }
    function txt(value,time) {
        setTimeout(() => {
            document.querySelectorAll('div.txt')[value].innerHTML=`<span class='show'>${opcoes.texto[value]}</span>`
        }, time);
    }
}
function resultado(jogador,computador){
    let msg = 'Você '
    const win = () => {
        msg += 'GANHOU!!!'
        player++
        criaCookie(player,bot)
    }
    const lose = () =>{
        msg += 'PERDEU!!!'
        bot++
        criaCookie(player,bot)
    }
    const empate = () =>{
        msg = 'EMPATE!!!'
    }
    if(jogador==computador){
        empate()
    }else{
        switch(jogador){
            case 'pedra':
                (computador=='tesoura') ? win() : lose()
                break
            case 'papel':
                (computador=='pedra') ? win() : lose()
                break
            case 'tesoura':
                (computador=='papel') ? win() : lose()
        }
    }
    content.innerHTML=`
    <div id='result'>
        <div class='grid3'>
            <div class='player'>Você <img src="midia/${jogador}.svg"></div>
            <div class='vs'>X</div>
            <div class='pc'><img src="midia/${computador}.svg"> Bot</div>
            <div class='result'><span class="msg">${msg}</span></div>
            <button onclick='restart()'>Jogar outra vez</button>
        </div>
    </div>`
    placar()
}
function restart(){
    content.innerHTML=`
    <div id="escolha">Escolha sua jogada:</div>
    <div id="options">
        <div class="circle" onclick="jogada('pedra')">
            <img src="midia/pedra.svg" alt="Pedra" title="Pedra">
        </div>
        <div class="circle" onclick="jogada('papel')">
            <img src="midia/papel.svg" alt="Papel" title="Papel">
        </div>
        <div class="circle" onclick="jogada('tesoura')">
            <img src="midia/tesoura.svg" alt="Tesoura" title="Tesoura">
        </div>
    </div>`
}