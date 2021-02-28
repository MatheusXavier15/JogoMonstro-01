new Vue({
  el: "#app",
  data: {
    running: false, //determina se o jogo ta ou não rodando
    playerLife: 100, //vida do jogador 
    monsterLife: 100, //vida do monstro 
    logs: [] //array contendo os registros de jogadas
  },
  computed: {
    hasResult() { //método que verifica continuamente se algum dos jogadores perdeu, retornando o vencedor
      return this.playerLife == 0 || this.monsterLife == 0;
    },
  },
  methods: {

    // método que inicia/refresh o jogo
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = []
    },

    //método que retorna uma valor randomico dentro do interfalo passado  
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },

    //método que faz a cotação do ataque (machuca o monstro ou jogador)
    hurt(atr, min, max, especial, source, target, cls) {
      const plus = especial ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus)
      this[atr] = Math.max(this[atr] - hurt, 0)
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`,cls)
    },

    //método do ataque
    attack(especial) {//recebe o parâmetro especial como true ou false dependendo se o ataque é especial ou não
      this.hurt('playerLife',7,12,false, 'Monstro', 'Player', 'monster');
      if(this.monsterLife>0)
        this.hurt('monsterLife',5,10,especial, 'Jogador','Monstro', 'player');
    },

    //método de cura
    heal(min,max){
        const heal = this.getRandom(min, max)
        this.playerLife= Math.min(this.playerLife + heal, 100)
        this.registerLog(`Jogador ganhou vida de ${heal}`,'player')
    },

    //método que cura e causa dano
    healAndHurt(){
        this.heal(10,15)
        this.hurt('playerLife', 7,12, false, 'Monstro', 'Jogador', 'monster')
    },

    //método que regista os logs
    registerLog(text, cls){
        this.logs.unshift({ text , cls })
    }

  },
  watch: {
      hasResult(value){//quando ouver um resultado, seta o running para false
          if(value) this.running = false
      }
  },
});
