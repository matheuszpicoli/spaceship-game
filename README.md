# MP Spaceship 🚀

### Link do projeto rodando na Vercel:

🔗 | [Clique aqui para ver o projeto em execução](https://mp-spaceship-game.vercel.app/)

## 🚨 Sobre

- **MP SpaceShip** foi o primeiro projeto que realizei, é um daqueles joguinhos de nave onde você obviamente controla uma nave e seu objetivo é eliminar seus oponentes.

- Sua nave é a azul e seus inimigos são as naves brancas. Antes de iniciar o jogo, temos 3 (três) níveis de dificuldade que podemos escolher, sendo eles: **Fácil**, **Médio** e **Difícil**.

- Todo o jogo roda em cima de um único **HTML**, não possui nenhum tipo de rota para outros arquivos, tudo é manipulado e criado diretamente na DOM.

<div align="center">

![MPSpaceShip](./documentation/documentationPhoto1.png)

</div>

> **Observações:** não é possível jogar esse jogo pelo celular, ao menos que você conecte um teclado nele.

## 🕹️ Como jogar
- **Movimentação:** <kbd>W</kbd>, <kbd>S</kbd>, <kbd>A</kbd>, <kbd>D</kbd> ou <kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>←</kbd>, <kbd>→</kbd> (setas do teclado)
- **Atirar:** <kbd>Espaço</kbd>
- **Pausar o jogo:** <kbd>Esc</kbd>

<div align="center">

![Como jogar](./documentation/documentationPhoto2.png)

</div>

> **Observações:** um modal aparece informando ao jogador como jogar, ele é fechado automaticamente em 8 (oito) segundos ou pode simplesmente ser fechado clicando em "_Certo_" ou pressionando a tecla <kbd>Esc</kbd>.

## 🎯 Funcionamento do jogo
Você é uma nave espacial que precisa eliminar o máximo de naves inimigas que conseguir, você tem uma arma que ao colidir com o seu adversário, faz com que ele perca 1 (um) de dano de sua vida máxima. O funcionamento do jogo varia de acordo com a dificuldade seleciona pelo jogador:

<div align="center">

![Dificuldades](./documentation/documentationPhoto3.png)

</div>

### Fácil
- Nessa dificuldade, as naves inimigas são eliminadas mais fácil, apenas 3 (três) tiros são necessários para derrotá-las e adicionar pontos em sua pontuação final.
- Sua nave é mais rápida e seus inimigos são mais devagar. A cadência de tiro da sua arma é bem maior em relação as outras dificuldades, fazendo com que os inimigos sejam eliminados mais rapidamente, em consequência, as naves inimigas aparecem na tela em menos tempo, 1 (um) segundo é o tempo necessário para gerar uma outra nave no cenário.

### Normal
- Essa é a dificuldade padrão que vem no jogo quando se joga pela primeira vez, a experiência mais equilibrada entre o fácil e o difícil.
- Aqui os inimigos possuem 5 (cinco) vidas e os tiros da sua nave têm o dobro da velocidade deles, por padrão, ao tomar dano, você perde 5% de 100% da sua vida (o que só se muda de fato no difícil). Os inimigos são gerados na tela a cada 2 (dois) segundos.

### Difícil
- A dificuldade para jogadores mais experientes. Aqui você possui menos vidas (apenas 80%), sua nave e os seus tiros são mais devagar e as naves inimigas possuem 7 (sete) vidas e são mais rápidas, além de você perder 10% de vida ao receber dano, ou seja, aqui você recebe mais dano o que é um diferencial dessa dificuldade.
- É gerado um novo inimigo na tela a cada 3 (três) segundos.

<div align="center">
<small>
Imagem ilustrativa de quando você toma dano
</small>

![Imagem ilustrativa do dano do jogo](./documentation/documentationPhoto5.png)

</div>

> Observações: quando a sua vida chega em 15%, um alerta sonoro é emitido e a sua vida começa a pulsar em vermelho.
---

### Pausar o jogo
- Você pode pausar o jogo a qualquer momento, basta pressionar a tecla <kbd>Esc</kbd> do seu teclado e apertar novamente para retomar o jogo exatamente de onde parou.

<div align="center">

![Pausar o jogo](./documentation/documentationPhoto4.png)

</div>

---

### Fim de jogo
- A tela de fim de jogo aparece quando a sua vida chega em 0%, a música para e a tela aparece. Simples.
- Para sair dessa tela, basta clicar no botão "_Fim de Jogo_".

<div align="center">

![Tela de fim de jogo](./documentation/documentationPhoto6.png)

</div>

## ⛏️ Ferramentas utilizadas
- [Gulp](https://gulpjs.com/)
- [SCSS](https://sass-lang.com/)
- [SweetAlert](https://sweetalert.js.org/)
- [Particles JS](https://vincentgarreau.com/particles.js/)

## 💻 Como executar o projeto na minha máquina?
- Esse projeto não exige muitas configurações, só de você baixar o ZIP ele já vai funcionar tranquilamente.
- Recomendo a extensão "_Live Server_" do [Visual Studio Code](https://code.visualstudio.com/) para executar esse projeto, basta baixar a extensão e pressionar <kbd>Alt</kbd> + <kbd>L</kbd> + <kbd>O</kbd> (ou <kbd>⌥</kbd> + <kbd>L</kbd> + <kbd>O</kbd> no Mac). Se preferir também, basta pressionar <kbd>F5</kbd> e selecionar um navegador para rodar o projeto.

### Detalhe caso queira mudar algo no CSS
- Caso queira mudar algo no CSS, nesse projeto é utilizado o pré-processador SCSS para as folhas de estilização e é necessário rodar um comando para transformar esse código em CSS tradicional, para que o navegador possa interpretar.
- Abra o terminal da sua IDE ou do seu sistema operacional na raíz da aplicação e execute o seguinte comando:

```Shell
PS C:\spaceshipGame gulp watch
```

> Isso fará com que a configuração do _Gulp_ em _gulpfile.js_ pegue o código SCSS presente no arquivo "_**src/scss/index.scss**_" e faça o processo descrito acima.

- Lembre de colocar novas folhas de estilo (caso crie) nesse arquivo com a seguinte sintaxe:

```SCSS
@import "./caminhoDoArquivo.scss";
```

- O Gulp está configurado para monitorar apenas esse arquivo, então todas as vezes que for salvar um arquivo SCSS, lembre de salvar o arquivo aqui também. É só dar <kbd>Ctrl</kbd> + <kbd>S</kbd> (ou <kbd>⌘</kbd> + <kbd>S</kbd> no Mac) em index.scss (mesmo que você já tenha importado o arquivo lá).

- Essa mensagem irá aparecer no seu terminal quando as alterações forem salvas com sucesso:

```Shell
PS C:\spaceshipGame gulp watch
[17:03:04] Using gulpfile C:\spaceshipGame\gulpfile.js
[17:03:04] Starting 'watch'...
[17:03:13] Starting 'styleSheet'...
[17:03:13] Finished 'styleSheet' after 221 ms
```
