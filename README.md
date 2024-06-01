# MP Spaceship 🚀

### Link do projeto rodando na Vercel: https://mp-spaceship-game.vercel.app/

<br>

**MP SpaceShip** foi o primeiro projeto que realizei, é um daqueles joguinhos de nave onde você obviamente controla uma nave e seu objetivo é eliminar seus oponentes.

Sua nave é a nave azul, você pode controlá-la com **W**, **S**, **A** e **D** ou com as **setinhas do teclado**, não é possível jogar esse jogo pelo celular, ao menos que você conecte um teclado nele. Antes de iniciar o jogo, temos 3 níveis de dificuldade que podemos escolher, sendo eles: **Fácil**, **Médio** e **Difícil**.

Todo o jogo roda em cima de um único **HTML**, não possui nenhum tipo de rota para outros arquivos, tudo é manipulado e criado diretamente na DOM.

#### Vou explicar o jogo baseado na dificuldade Normal, onde as variáveis ​​possuem seus valores padrão:

Criei um ambiente onde há uma certa semelhança com o espaço, pensei em criar um arquivo .SCSS para animar a cena mas usei **particles.js** para isso, essa lib me ajudou a criar as "estrelas" que ficam andando aleatoriamente ao redor do cenário.

Você tem **100%** de vida e a cada dano que você sofre você perde **5%** dela até chegar a **0%** onde o game over é executado, a música de fundo para e um botão aparece para recarregar o jogo. Ao fazer isso, sua última dificuldade jogada é salva e você pode jogar novamente ou não. O valor de dificuldade padrão ao entrar pela primeira vez é normal, não é possível jogar o jogo sem escolher uma dificuldade, mas, se você ainda conseguir remover o valor de entrada, a Promise cairá em rekect e o forçará a escolher uma dificuldade da mesma maneira.

Você atira com a **barra de espaço** e pausa e/ou retoma o jogo com a tecla **Esc**, seu projétil tem o dobro da velocidade do seu inimigo e cada tiro que você acerta conta **1** de vida do seu oponente, você ganha **10 pontos** em sua pontuação ao derrotar um inimigo quando a vida dele chega a **0**. A cada **100 pontos** um som é tocado.

Quando sua base recebe dano, um som de explosão é emitido e ela pisca em vermelho duas vezes. Quando sua vida chega a 15%, outro som também é tocado e ele também pisca em vermelho até o jogo terminar.

O movimento da sua nave é suficiente, os inimigos são gerados na tela a cada **2 segundos**.

#### Melhorias que quero fazer no futuro, como atualizações:

- Melhor sistema de pontuação para cada dificuldade disputada;
- Mudando de nível, a cada 40 inimigos derrotados, por exemplo, a dificuldade aumenta;
- Dê ao jogador um menu de personalização para alterar as cores e o cenário do jogo.
