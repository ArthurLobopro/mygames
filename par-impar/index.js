const game = {
    player: {
        number: '',
        option: '',
    },
    bot: {
        number: '',
        option: '',
    }
}
const circle = document.querySelectorAll('.circle')
const content = document.getElementById('content')
const option = (e) => showNumbers(e.target.value)
const setnum = (e) => selectNumbers(e.target.innerText)
circle[0].addEventListener('click',option,false)
circle[1].addEventListener('click',option,false)

function showNumbers(escolha){
    game.player.option=escolha
    game.bot.option= (escolha=='par')? 'impar' : 'par'
    document.getElementById('escolhas').innerHTML=`
    <div class="number">0</div>
    <div class="number">1</div>
    <div class="number">2</div>
    <div class="number">3</div>
    <div class="number">4</div>
    <div class="number">5</div>`
    const number = document.querySelectorAll('.number')
    for(i of number){
        i.addEventListener('click',setnum,false)
    }
}
function selectNumbers(num){
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    game.player.number=num
    game.bot.number=randint(0,5)
    content.innerHTML=`
    <div class='up'>
    <span style='animation: up 0.5s'>${game.player.option}</span>
    <img src='midia/${num}dedos.png' style="transform: rotate(90deg);">
    </div>
    <img src='midia/${game.bot.number}dedos.png' class='rotateL'>`
    
}


