const lerPlacar = name =>{
    if(localStorage[name] == undefined){
        criaPlacar(name)
    }else{
        const data = JSON.parse(localStorage[name])
        let player,bot 
        ({player, bot} = data)
        console.log(game);
        //game.placar.player = player
        //game.placar.bot = bot
        placar()
    }
}
const criaPlacar = name => {
    let data = game.placar
    let json = JSON.stringify(data)
    localStorage[name] = json
}
const placar = () => {
    document.getElementById('player').innerText= game.placar.player
    document.getElementById('bot').innerText= game.placar.bot
}
export { placar, criaPlacar, lerPlacar }