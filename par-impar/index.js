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
const get = id => document.getElementById(id)
const option = (e) => showNumbers(e.target.innerText)
const setnum = (e) => selectNumbers(Number(e.target.innerText))
circle[0].addEventListener('click',option,false)
circle[1].addEventListener('click',option,false)
const button = document.querySelector('button')
    button.onclick = newgame

const hideAll = () => {
    for(let e of document.querySelectorAll("#content > div")){
        e.style.display="none"
    }
}

function showNumbers(escolha){
    game.player.option=escolha
    game.bot.option= (escolha=='Par')? 'Ímpar' : 'Par'
    hideAll()
    get("fase2").style.display=""
    const number = document.querySelectorAll('.number')
    for(let e of number){
        e.onclick = setnum
    }
}

function selectNumbers(num){
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    game.player.number=num
    game.bot.number=randint(0,5)
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
    const win = () => 'Você venceu!'
    const lose = () => 'Você perdeu!'
    
    let soma = game.player.number + game.bot.number
    function verifica(){
        if(soma % 2 == 0){
            return(game.player.option == 'Par')? win() : lose()
        }else{
            return(game.player.option == 'Ímpar')? win() : lose()
        }
    }
    
    hideAll()
    get("fase3").style.display=""
    
    get("result").innerHTML = verifica()

    txt(game.player.option,0,1000)
    txt(game.bot.option,1,2000)
    img(game.player.number,0,2700)
    img(game.bot.number,1,2700)
    setTimeout(() => {
        document.querySelector('.show').classList.remove('hidden')
    }, 3000);
    setTimeout(() => {
        button.classList.remove('hidden')
        get("result").classList.remove('hidden')
    }, 4000);
}

function newgame(){
    const elements = document.querySelectorAll(".txt, .img")
    for(let e of elements){ e.innerHTML="" }
    button.classList.add('hidden')
    get("result").classList.add('hidden')
    hideAll()
    get("fase1").style.display=""
}