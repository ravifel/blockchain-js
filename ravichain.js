const crypto = require("crypto"),
  SHA256 = (message) =>
    crypto.createHash("sha256").update(message).digest("hex");

class Block {
  constructor(timestamp = "", data = []) {
    this.timestamp = timestamp;
    this.data = data; //aqui geralmente contem coisas como transações..
    this.hash = this.getHash();
    this.prevHash = "";
    this.nonce = 0;
  }

  //Metodo de mineração (Prova de Trabalho)
  mineration(difficulty) {
    //vamos aumentar o valor do "nonce" até conseguir o HASH que precisamos
    while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
      //vai criar uma matriz vazia com o tamanho da dificuldade "+1"
      //quando juntar isso vai obter uma string consistente em zeros com o tamanho da dificuldade

      this.nonce++; //se não corresponder, continuaremos aumentando o valor do nonce
      this.hash = this.getHash(); //valor do HASH vai ser TUALIZADO
    }
  }

  //função para gerar o HASH
  getHash() {
    return SHA256(
      JSON.stringify(this.data) + this.timestamp + this.prevHash + this.nonce
    );
  }
}

class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString())];
    this.difficulty = 1; //adereço de dificuldade
  }

  //Metodo para pegar o último bloco da cadeia
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  //Metodo para adicionar um bloco
  addBlock(block) {
    block.prevHash = this.getLastBlock().hash; //hash do último bloco
    block.hash = block.getHash(); //recalcular o hash, para o proximo bloco

    block.mineration(this.difficulty); //chamando a mineração, chamando a dificuldade como parametro

    this.chain.push(block); //empurrando o bloco para a cadeia
  }

  //Metodo para saber se o bloco é valido ou não
  isValid(blockchain = this) {
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currentBlock = blockchain.chain[i]; //bloco atual
      const prevBlock = blockchain.chain[i - 1]; //bloco anterior

      //uma blockchain é válida quando o HASH está inalterado
      //e também a prevHash deve ser igual a HAS do bloco anterior
      if (
        currentBlock.hash !== currentBlock.getHash() ||
        currentBlock.prevHash !== prevBlock.hash
      ) {
        var mensagem = "O bloco é v";
        return false; //Não validado
      }

      return true; //Validado
    }
  }
}

//---> criando uma nova cadeia para teste
const RaviRayaneChain = new Blockchain();
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["100,00 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["99,00 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["1,89 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["39,00 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["358,07 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["789,00 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["88,79 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["3579,02 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["4,93 BTC"]));
RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["271,88 BTC"]));
console.log(RaviRayaneChain.chain);
console.log("Mostrando a cadeia de blocos");

//---> verificando se a função é valida/
//---> se for valida vai retornar "true"
console.log(
  RaviRayaneChain.isValid() ? "A cadeia é válida" : "A cadeia não é válida"
);

//---> aqui iremos mudar algum dado do bloco e solicitar a validação (irá dar falso)
// RaviRayaneChain.chain[1].data = ["Alteração de dado"];
// console.log(RaviRayaneChain.chain);
// console.log(
//   RaviRayaneChain.isValid() ? "A cadeia é válida" : "A cadeia não é válida"
// );

//---> testando com a mineração
// const RaviRayaneChain = new Blockchain();
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["100,00 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["200,00 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["300,00 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["39,00 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["358,07 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["789,00 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["88,79 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["3579,02 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["4,93 BTC"]));
// RaviRayaneChain.addBlock(new Block(Date.now().toString(), ["271,88 BTC"]));
// console.log(RaviRayaneChain.chain);
// console.log("Mostrando a cadeia de blocos no teste com a mineração");

//OBSERVAÇÕES -->
//o blockchain é uma lista com os blocos
//então vamos criar uma propriedade chamada "chain" para armazenar os blocos
//o bloco genesis é o bloco inicial da cadeia de blocos
//o bloco Genesis vai manter a cadeia em funcionamento
//
//quando você muda qualquer detalhe de cada coisa em seu bloco (mesmo que pequeno), o HASH vai sair diferente
//isso garante como podemos notar como o bloco é alterado
//isso irá garantir a imutabilidade da cadeia de blocos
