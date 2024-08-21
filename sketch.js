//https://youtu.be/e0dc6pEv1_I

// https://drive.google.com/file/d/1e-dbrzdiyAyqtUlGzzXF8ImO76x57X6V/view?usp=drivesdk


var jogador = { x: 400, y: 300, tamanho: 50 };
var estrelas = [];
var perigos = [];
var pontuacao = 0;
var temporizadorDeSpawnEstrelas = 0;
var temporizadorDeSpawnPerigos = 0;
var velocidadePerigo = 6;
// coordenadas dos botões
var xbotao1 = 10, ybotao1 = 10;
var tela = 1;
var curiosidade = gerarCuriosidade(); // Variável para armazenar a curiosidade matemática

function preload() {
  estrelasft = loadImage("ceu e estrela.jpg");
  musicafundo = loadSound("music.mp3");
  imgt = loadImage("thacylaft.jpeg");
  imag = loadImage("rummenigge.JPG");
  ima = loadImage("estrela.png");
  prg = loadImage("bomba.png")
  ceuft = loadImage("ceuft.avif");
  gm = loadImage("gm.jfif"); 
 cm = loadImage("fundo.avif");
  
}

function setup() {
  createCanvas(800, 600);
  spawnEstrelas(6);
  spawnPerigos(8);
 musicafundo.play();
 musicafundo.loop();
}

function draw() {
  background(220);
  if (tela == 0) {
    jogar();
    atualizarJogo();
  } else if (tela == 1) {
    menu();
  } else if (tela == 2) {
    desenharInstruções();
  } else if (tela == 3) {
    creditos();
  } else if (tela == 4) {
    desenharGameOver();
  }
}

function creditos() {
  background(cm)
  textAlign(LEFT, BASELINE);
  fill(0);
  text("Thácyla Fabricia B. Pontes", 90, 120);
  text("Programadora:", 70, 90);
  text("Rummenigge Rudson Dantas", 90, 400);
  text("Educador:", 70, 370);
  text("Obrigada por jogar!", 450, 520);
  textAlign(CENTER, CENTER);
  fill(0);
  rect(xbotao1, ybotao1, 100, 20, 10);
  textSize(24);
  fill(255);
  text("Menu", xbotao1 + 50, ybotao1 + 15);
  image(imgt,200, 150,150,150)
  image(imag, 200, 430,150,150)
}

function menu() {
  background(estrelasft);
  textAlign(LEFT, BASELINE);
  fill(30, 30, 130);
  rect(60, 100, 140, 40, 15);
  rect(60, 150, 140, 40, 15);
  rect(60, 200, 140, 40, 15);
  fill(220, 220, 220);
  textSize(20);
  text("JOGAR", 95, 130);
  text("INSTRUÇÃO", 75, 180);
  text("CREDITOS", 80, 230);
  fill(50, 50, 119);
  textSize(40);
  textAlign(CENTER, CENTER);
  stroke(255);
  strokeWeight(3);
  text(" O Círculo e as estrelas", 500, 180);
  noStroke()
}

function desenharInstruções(){
 background(cm);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(0);
  text('Instruções:', width / 2, height / 2 - 100);
  textSize(30);
  text('Use as setas do teclado para mover o circulo', width / 2, height / 2 +30);
  text('Colete as estrelas amarelas', width / 2, height / 2 + 60);
  text('Evite colidir com os perigos', width / 2, height / 2 + 90);
  text('Aprenda matematica jogando', width / 2, height / 2 + 120);
  text('Com o mouse aperte em menu para voltar', width / 2, height / 2 + 150);
  rect(xbotao1, ybotao1, 100, 20, 10);
  fill(255);
  text("Menu", xbotao1 + 50, ybotao1 + 15);
}

function mouseClicked() {
  if (mouseX > 60 && mouseX < 200 && mouseY > 100 && mouseY < 140 && tela == 1) {
    tela = 0;
  } else if (mouseX > 60 && mouseX < 200 && mouseY > 150 && mouseY < 190 && tela == 1) {
    tela = 2;
  } else if (mouseX > 60 && mouseX < 200 && mouseY > 200 && mouseY < 240 && tela == 1) {
    tela = 3;
    pontuacao = 0;
  } else if (mouseX > xbotao1 && mouseX < xbotao1 + 100 && mouseY > ybotao1 && mouseY < ybotao1 + 20) {
    if (tela == 0 || tela == 2 || tela == 1 || tela == 3 || tela == 4) {
      tela = 1;
      pontuacao = 0;
      reiniciarJogo() 
    }
  }
}

function jogar() {
  background(ceuft);
  textAlign(CENTER, CENTER);
  fill(0);
  rect(xbotao1, ybotao1, 100, 20, 10);
  textSize(24);
  fill(255);
  text("Menu", xbotao1 + 50, ybotao1 + 15);
}

function atualizarJogo() {
  atualizarJogador();
  exibirJogador();

  // Atualizar e exibir estrelas
  for (var i = estrelas.length - 1; i >= 0; i--) {
    exibirEstrela(estrelas[i]);
    if (coletaEstrela(estrelas[i])) {
      estrelas.splice(i, 1);
      pontuacao += 10;
      spawnEstrelas(1);
    }
  }

  // Atualizar e exibir perigos
  for (var i = perigos.length - 1; i >= 0; i--) {
    atualizarPerigo(perigos[i])
    //perigos[i].atualizar(); // Atualizar movimento
    exibirPerigo(perigos[i])
    //perigos[i].exibir();
    
    //if (jogador.colide(perigos[i])) {
    if (colidePerigo(perigos[i])==true) {
      tela = 4;
    }
  }

  // Exibir pontuação
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(16);
  text('Pontuação: ' + pontuacao, 400, 20);
}

function desenharGameOver() {
  background(gm);
   // Exibir pontuação
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text('Pontuação: ' + pontuacao, width / 2, 40);

  // Exibir o título "Curiosidade Matemática:"
  textSize(24);
  fill(255); 
  text('Curiosidade Matemática:', width / 2, height / 2 + 90);
  
  // Exibir a curiosidade matemática
  textSize(18);
  fill(255);
  textAlign(CENTER, CENTER);
  text(curiosidade, width / 2, height / 2 + 120);
  // Botão de menu
  fill(0); // Cor de fundo do botão (branco)
  rect(xbotao1, ybotao1, 100, 20, 10); // Desenha o retângulo do botão
  fill(255); // Cor do texto do botão (preto)
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Menu", xbotao1 + 50, ybotao1 + 15); // Exibe o texto do botão
}

function reiniciarJogo() {
  jogador = { x: width / 2, y: height / 2, tamanho: 50 };
  estrelas = [];
  perigos = [];
  pontuacao = 0;
  spawnEstrelas(6);
  spawnPerigos(8);
  curiosidade = gerarCuriosidade(); // Atualiza a curiosidade ao reiniciar o jogo
}


function spawnEstrelas(quantidade) {
   const margem = 50;
  for (var i = 0; i < quantidade; i++) {
    var x = random(margem, width - margem);
    var y = random(margem, height - margem);
    estrelas.push({ x: x, y: y, tamanho: 20 });
  }
}

function spawnPerigos(quantidade) {
   const margem = 50;
  for (var i = 0; i < quantidade; i++) {
    var x = random(margem, width - margem);
    var y = random(margem, height - margem);
    perigos.push({ x: x, y: y, tamanho: 30, velocidade: velocidadePerigo });
  }
}

function atualizarJogador() {
   const velocidade = 8;
   if (keyIsDown(LEFT_ARROW)) {
    jogador.x -= velocidade;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    jogador.x += velocidade;
  }
  if (keyIsDown(UP_ARROW)) {
    jogador.y -= velocidade;
  }
  if (keyIsDown(DOWN_ARROW)) {
    jogador.y += velocidade;
  }

  jogador.x = constrain(jogador.x, jogador.tamanho / 2, width - jogador.tamanho / 2);
  jogador.y = constrain(jogador.y, jogador.tamanho / 2, height - jogador.tamanho / 2);
}

function exibirJogador() {
  fill(0, 100, 255);
  ellipse(jogador.x, jogador.y, jogador.tamanho);
}

function coletaEstrela(estrela) {
  var d = dist(jogador.x, jogador.y, estrela.x, estrela.y);
  return d < jogador.tamanho / 2 + estrela.tamanho / 2;
}

function colidePerigo(perigo) {
  var d = dist(jogador.x, jogador.y, perigo.x, perigo.y);
  return d < jogador.tamanho / 2 + perigo.tamanho / 2+10;
}

function exibirEstrela(estrela) {
  fill(255, 215, 0);
  noStroke();
  image(ima,estrela.x, estrela.y, estrela.tamanho,estrela.tamanho);
  
}

function atualizarPerigo(perigo) {
  var angulo = random(TWO_PI);
  perigo.x += cos(angulo) * perigo.velocidade;
  perigo.y += sin(angulo) * perigo.velocidade;

  perigo.x = constrain(perigo.x, 0, width);
  perigo.y = constrain(perigo.y, 0, height);
}

function exibirPerigo(perigo) {
  fill(255, 0, 0);
  noStroke();
  image(prg,perigo.x, perigo.y, perigo.tamanho, perigo.tamanho);
}
// Função para gerar curiosidade matemática
function gerarCuriosidade() {
  const curiosidades = [
    "Os números primos são números maiores que 1 que só podem ser divididos por 1 e por eles mesmos.",
    "O número 2 é o menor número primo e o único número primo par.",
    "Existem infinitos números primos, como provado por Euclides.",
   "Qualquer número dividido por 1 é ele mesmo.",
   "O número 1 é o único número que não é nem par nem ímpar.",
    "O número 0 é o único número que não é nem positivo nem negativo.",
    "O número 5 é o único número primo que termina em 5.",
  "A soma dos ângulos internos de um triângulo é sempre 180 graus.",
    "Qualquer número dividido por 1 é ele mesmo.",
    "O número 10 é a base do sistema decimal, o sistema de numeração mais usado no mundo."
  ];
  const indice = Math.floor(Math.random() * curiosidades.length);
  return curiosidades[indice];
}