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
}

//criando uma nova cadeia para teste
const RaviChain = new Blockchain();
RaviChain.addBlock(new Block(Date.now().toString(), ["Hello", "World"]));
console.log(RaviChain.chain);

//o blockchain é uma lista com os blocos
//então vamos criar uma propriedade chamada "chain" para armazenar os blocos
//o bloco genesis é o bloco inicial da cadeia de blocos
//o bloco Genesis vai manter a cadeia em funcionamento
