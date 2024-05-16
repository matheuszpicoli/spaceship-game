﻿# MP SpaceShip 🚀

### Link do projeto rodando na Vercel: https://mp-spaceship-game.vercel.app/

<br>

**MP SpaceShip** foi o primeiro projeto que de fato realizei, ele é um dos aqueles joguinhos de navinha onde você controla obviamente uma nave e o seu objetivo é eliminar os seus oponentes.

A sua nave é a nave azul, você pode controlar ela com **W**, **S**, **A** e **D** ou com as **setinhas do teclado**. Antes de começar o jogo, temos 3 níveis de dificuldade que podemos escolher, sendo eles: **Fácil**, **Médio** e **Difícil**.

O jogo inteiro roda em cima de um único **HTML**, não possui nenhum tipo de rota para outros arquivos, tudo é manipulado e criado diretamente na DOM.

#### Irei explicar o jogo baseado na dificuldade Normal, onde as variáveis possuem os seus valores padrões vamos assim dizer:

Criei um ambiente onde há uma certa semelhança com o espaço, pensei em criar um arquivo .SCSS para fazer a animação do cenário mas utilizei o **particles.js** para isso, ele me ajudou a criar as "estrelas" que ficam andando aleatoriamente ao redor do cenário.

Você possui **100%** de vida e a cada dano que você leva você perde **5%** dela até chegar em **0%** onde o game over é executado, a música de fundo para e um botão aparece para recarregar o jogo. Ao fazer isso, a sua última dificuldade jogada fica salva e você pode jogar com ela novamente ou não. O valor padrão da dificuldade ao entrar pela primeira vez é a normal, não é possível jogar o jogo sem escolher uma dificuldade, mas, se mesmo assim você conseguir tirar o valor do input a Promise vai cair no reject e ela vai te obrigar a escolher uma dificuldade da mesma forma.

Você atira com a **barra de espaço** e pausa e/ou despausa o jogo com a tecla **Esc**, o seu projétil tem o dobro da velocidade do seu inimigo e cada tiro que acerta desconta **1** de vida do seu adversário, você ganha **10 pontos** em sua pontuação ao derrotar um inimigo quando a vida do mesmo chega em **0**, a cada **100 pontos** um som é reproduzido.

Quando a sua base recebe dano, um som de explosão é reproduzido e a mesma pisca 2 vezes em vermelho. Quando a sua vida chega em 15%, um outro som também é reproduzido e ela também fica piscando em vermelho até dar game over.

A movimentação da sua nave é o suficiente, inimigos são gerados em tela a cada **2 segundos**.

#### Melhorias que quero fazer futuramente, como atualização:

1. Sistema de melhor pontuação (best) em cada dificuldade jogada;
2. Alteração de níveis, a cada 40 inimigos derrotados por exemplo a dificuldade aumenta;
3. Dar ao jogador um menu de personalização para alteração das cores e do cenário do jogo.
