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
const option = (e) => showNumbers(e.target.innerText)
const setnum = (e) => selectNumbers(e.target.innerText)
circle[0].addEventListener('click',option,false)
circle[1].addEventListener('click',option,false)

function showNumbers(escolha){
    game.player.option=escolha
    game.bot.option= (escolha=='Par')? 'Ímpar' : 'Par'
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
    content.innerHTML=`<div class='txt'> </div><div class='txt'> </div><div class='img'> </div> </div> <div class='img'></div><div class='show'></div>`
    content.classList.remove('flex')
    content.classList.add('grid')
    function img(value,index,time) {
        setTimeout(() => {
            document.querySelectorAll('.img')[index].innerHTML=`<div class='up dur05'><img src="midia/${value}dedos.png" style='transform: ${(index==0)? '': 'rotateY(180deg) '} rotateZ(90deg) ;'></div>`
        }, time);
    }
    function txt(value,index,time) {
        setTimeout(() => {
            document.querySelectorAll('.txt')[index].innerText=value
            document.querySelectorAll('.txt')[index].classList.add('up')
            document.querySelectorAll('.txt')[index].classList.add('dur1')
        }, time);
    }
    const win = () => {
        document.querySelector('.show').innerHTML='Você venceu!'
        
    }
    const lose = () =>{
        document.querySelector('.show').innerHTML='Você perdeu!'
    }
    txt(game.player.option,0,1000)
    txt(game.bot.option,1,2000)
    img(game.player.number,0,2700)
    img(game.bot.number,1,2700)
    let soma = game.player.number + game.bot.number
    if(soma % 2 == 0){
        setTimeout(() => {
            (game.player.option == 'Par')? win() : lose()
        }, 3300);
    }else{
        setTimeout(() => {
            (game.player.option == 'Ímpar')? win() : lose()
        }, 3300);
    }
}


