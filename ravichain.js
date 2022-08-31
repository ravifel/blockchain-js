const crypto = require("crypto"),
  SHA256 = (message) =>
    crypto.createHash("sha256").update(message).digest("hex");

class Block {
  constructor(timestamp = "", data = []) {
    this.timestamp = timestamp;
    this.data = data; //aqui geralmente contem coisas como transações..
    this.hash = this.getHash();
    this.prevHash = "";
  }

  //função para gerar o HASH
  getHash() {
    return SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString())];
  }

  //Metodo para pegar o último bloco da cadeia
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  //Metodo para adicionar um bloco
  addBlock(block) {
    block.prevHash = this.getLastBlock().hash; //hash do último bloco
    block.hash = block.getHash(); //recalcular o hash, para o proximo bloco

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
        return false; //Não validado
      } else {
        return true; //Validado
      }
    }
  }
}

//criando uma nova cadeia para teste
const RaviChain = new Blockchain();
RaviChain.addBlock(new Block(Date.now().toString(), ["100,00 BTC"]));
console.log(RaviChain.chain);
console.log("Mostrando a cadeia de blocos");

//verificando se a função é valida/
//se for valida vai retornar "true"
console.log(RaviChain.isValid());
console.log("Validação da cadeia (TRUE)");

//aqui iremos mudar algum dado do bloco e solicitar a validação (irá dar falso)
RaviChain.chain[1].data = ["Alteração de dado"];
console.log(RaviChain.chain);
console.log(RaviChain.isValid());
console.log("Validação da cadeia (FALSE)");

//OBSERVAÇÕES -->
//o blockchain é uma lista com os blocos
//então vamos criar uma propriedade chamada "chain" para armazenar os blocos
//o bloco genesis é o bloco inicial da cadeia de blocos
//o bloco Genesis vai manter a cadeia em funcionamento
//
//quando você muda qualquer detalhe de cada coisa em seu bloco (mesmo que pequeno), o HASH vai sair diferente
//isso garante como podemos notar como o bloco é alterado
//isso irá garantir a imutabilidade da cadeia de blocos
