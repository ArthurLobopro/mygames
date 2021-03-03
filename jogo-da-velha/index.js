// Classes dificuldade
class Easy{
    randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    play(game){
        let jbot = randint(0,8)
        if(game.status[jbot]==''){
            return jbot
        }else{
            this.play(game)
        }
    }
}
class Normal extends Easy{
    // "Inteligencia" do bot, faz verificações em todos os angulos
    vertical = (str,game) =>{
        const sts = game.status
        for(i of range(0,3)){
            if(sts[i]== str && sts[i+3] == str && sts[i+6] == '' ) { return i+6 }
            if(sts[i]== str && sts[i+3] == ''  && sts[i+6] == str) { return i+3 }
            if(sts[i]== ''  && sts[i+3] == str && sts[i+6] == str) { return i }
        }
        return ''
    }
    horizontal = (str,game) =>{
        const sts = game.status
        for(i of range(0,7,3)){
            if(sts[i] == str && sts[i+1] == str && sts[i+2] == '') { return i+2 }
            if(sts[i] == str && sts[i+1] == '' && sts[i+2] == str) { return i+1 }
            if(sts[i] == '' && sts[i+1] == str && sts[i+2] == str) { return i }
        }
        return  ''
    }
    diagonal = (str,game) =>{
        const sts = game.status
        if (sts[0] == str && sts[4] == str && sts[8] == '')  { return 8 }
        if (sts[0] == str && sts[4] == ''  && sts[8] == str) { return 4 }
        if (sts[0] == ''  && sts[4] == str && sts[8] == str) { return 0 }
        if (sts[2] == str && sts[4] == str && sts[6] == '')  { return 6 }
        if (sts[2] == str && sts[4] == ''  && sts[6] == str) { return 4 }
        if (sts[2] == ''  && sts[4] == str && sts[6] == str) { return 2 }
        return ''
    }
    play(game){
        let jbot = this.vertical('o',game)
        jbot = (jbot==='') ? this.horizontal('o',game) : jbot
        jbot = (jbot==='') ? this.diagonal('o',game) : jbot
        jbot = (jbot==='') ? this.vertical('x',game) : jbot
        jbot = (jbot==='') ? this.diagonal('x',game) : jbot
        jbot = (jbot==='') ? this.horizontal('x',game) : jbot
        //Caso não há possibilidades nem de ganhar ou evitar a derrota, o bot faz uma jogada aleatória.
        jbot = (jbot==='') ? randint(0,8) : jbot
        return jbot
    }
}
// Variáveis Globais
const get = id => document.getElementById(id)
const game = {
    status: ['','','','','','','','',''],
    placar: {
        player: 0,
        bot: 0
    },
    difficulty: undefined,
    getDifficulty: (difficulty) => {
        return difficulty == 'facil' ? new Easy() : new Normal()
    }
}
const msg = document.getElementById('msg')
const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
const range = (min,max,pass=1) => {
    let array = []
    for(i = min;i<max;i+=pass){
        array.push(i)
    }
    return array
}
const jogar = event => jogadaPlayer(String(event.target.id)[3])
let bot
// Função do jogo
function jogadaPlayer(player,alerta=true) {
    if(game.status[player-1]==''){
        removeEventAll()
        game.status[player-1]='x'
        draw(player,'x')
        let have_winner = verifica()
        let disp = false
        for(let i of game.status){
            if(i==''){
                disp=true
                break
            }
        }
        console.log(game.status);
        document.getElementById(`div${player}`).removeEventListener('click',jogar,false) 
        if(disp==true && have_winner==false){
            jogadaBot()
            verifica()
        }
        setTimeout(() => {
            addEventAll()
        }, 4000)
    }else{
        (alerta==true) ? alert('Jogada inválida') : null
    }
}
function draw(id,src) {
    document.getElementById(`div${id}`).innerHTML=`<img src='midia/${src}.png' class='show${src}'>`
}
function jogadaBot() {
    let jbot = bot.play(game)
    if(game.status[jbot]==''){
        game.status[jbot]='o'
        console.log(game.status);
        draw(jbot+1,'o')
        document.getElementById(`div${jbot+1}`).removeEventListener('click',jogar,false) 
    }else{
        jogadaBot()
    }
}
// Validação de vitórias.
function verifica() {
    const sts = game.status
    let have_winner = false
    //Verifica se há algum vencedor na horizontal
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
        for(let i of sequence){
            document.getElementById(`div${i}`).innerHTML=`<img src='midia/red-x.png'>`
        }
        game.placar.player++
        placar()
        msg.innerHTML=`Você venceu!<br>`
    }else if(winner=='o'){
        for(let i of sequence){
            document.getElementById(`div${i}`).innerHTML=`<img src='midia/red-o.png'>`
        }
        game.placar.bot++
        placar()
        msg.innerHTML=`Você perdeu!<br>`
    }else if(winner=='en'){
        msg.innerHTML=`Empate!!<br>`
    }
    get('submit-button').classList.toggle('invisible')
    criaPlacar()
    removeEventAll()
}
function newgame(){
    for(let i in game.status){
        game.status[i]=''
        document.getElementById(`div${Number(i)+1}`).innerHTML=''
    }
    msg.innerHTML=''
    get('submit-button').classList.toggle('invisible')
    addEventAll()
}

// Detecção de cliques
const addEventAll = () => {
    for(let i in game.status){
        if (game.status[i]=='') {
            i = Number(i)
            get(`div${i+1}`).onclick = jogar
        }
    }
}
const removeEventAll = () => {
    for(let i in game.status){
        i = Number(i)
        get(`div${i+1}`).onclick = null
    }
}
// Salvar placar com local storage
function lerPlacar(){
    if(localStorage.bot == undefined && localStorage.player == undefined){
        criaPlacar()
    }else{
        let player,bot 
        ({player, bot} = localStorage)
        game.placar.player = player
        game.placar.bot = bot
        placar()
    }
}
function criaPlacar(){
    localStorage.player = game.placar.player
    localStorage.bot = game.placar.bot
}
function placar(){
    document.getElementById('player').innerText= game.placar.player
    document.getElementById('bot').innerText= game.placar.bot
}
// Salvar dificuldade
function lerDificuldade(){
    if(localStorage.difficulty == undefined){
        criarDificuldade('normal')
    }else{
        let difficulty
        ( { difficulty } = localStorage)
        game.difficulty = difficulty
        bot = game.getDifficulty(difficulty)
        get(difficulty).checked = true
    }
}
function criarDificuldade(dificuldade){
    localStorage.difficulty = dificuldade
    game.difficulty = dificuldade
    lerDificuldade()
}
// Detecção de eventos 
const img_config = document.querySelector('section > img')
img_config.onclick = () => {
    get('game').classList.toggle('invisible')
    get('config').classList.toggle('invisible')
}
const difficulty_config = document.querySelectorAll('#config input')
for(let i of difficulty_config){
    i.onclick = event => {
        criarDificuldade(event.target.value)
    }
}