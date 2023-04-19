# 🐭 Classificação e Pesquisa de Pokémons 🐍
[![NPM](https://img.shields.io/github/license/Alamito/sortPokeAPI-Nodejs)](https://github.com/Alamito/sortPokeAPI-Nodejs/blob/main/LICENSE)

# 📜 Sobre o projeto 📜
<p align="justify">
Projeto final da disciplina de Classificação e Pesquisa de Dados do Curso de Engenharia da Computação na UFRGS, no qual foi desenvolvido uma aplicação que faz a classificação e pesquisa de Pokémons a partir da PokéAPI.<br> 
A API (Aplication Programming Interface) é composta por 1008 pokémons e apresenta um conjunto de informações bastante sólido e específico acerca de cada um deles, armazenando seus nomes; tipos primário e secundário; experiência (XP); altura; peso; habilidades; movimentos; entre outros. Além disso, vale destacar que cada pokémon recebe uma chave de identificação numérica (ID) - de 1 a 1008.<br>
A partir disso, foram desenvolvidos 4 sistemas de busca e classificação dos Pokémons: (1) buscar Pokémon pelo nome ou prefixo; (2) listar os Pokémons mais FORTES contra um tipo específico; (3) listar os Pokémons mais FRACOS contra um tipo específico; e (4) adicionar um novo Pokémon.
</p>
<p align = "justify"><em>A descrições das funcionalidades foram retiradas do relatório entregue ao professor da disciplina.</em></p>

### BUSCAR POKÉMON PELO NOME OU PREFIXO
<p align="justify">
O usuário é capaz de informar o nome de um pokémon (ou simplesmente seu prefixo) e, a partir disso, a aplicação irá exibir os atributos dos personagens requisitados.<br>
Os nomes dos Pokémons foram colocados em uma estrutura de dados denominada de Árvore TRIE, que é uma estrutura do tipo árvore ordenada que pode ser usada para armazenar um array associativo em que as chaves são cadeias de caracteres, assim, por exemplo, essa estrutura pode ser utilizada para realizar o auto-complete de palavras.
</p>

### LISTAR POKÉMONS FORTES OU FRACO CONTRA UM TIPO ESPECÍFICO
<p align="justify">
Nos dois casos, o usuário deverá informar um tipo de pokémon. A partir daí, a manipulação dos dados ocorrerá de forma distinta para cada função escolhida. Caso deseje-se saber quais pokémons são fortes contra o tipo informado, a aplicação exibirá tais personagens, fazendo uma busca nas fraquezas desse tipo. O mesmo ocorre para encontrar os pokémons mais fracos. Entretanto, nessa situação, a busca é feita nas forças.
</p>

### ADICIONAR UM NOVO POKÉMON
<p align="justify">
O usuário poderá informar o nome; os tipos primário e secundário; o XP; a altura; e o peso do novo pokémon. Se tal nome já existir, seus dados são alterados. Caso contrário, uma nova linha é inserida no fim de um arquivo que contém os atributos de todos os pokémons com os dados do novo Pokémon.
</p>

# 🎥 Apresentação do projeto 🎥
<p align="justify">
A seguir está representada a aplicação, onde foram testadas as quatro funcionalidades:
</p>

https://user-images.githubusercontent.com/102616676/232909140-b5e6fbe1-9eed-4172-aa05-a467fe6c0b06.mp4

# 🧬 Tecnologias utilizadas 🧬
- JavaScript/Node.JS;
- Módulos Node: Axios, FileSystem, Line-Reader, Readline e Readline-Sync;

# ⏯ Como executar o projeto ⏯

### Requisitos
- Node.JS e NPM.

```bash
# clonar repositório
git clone https://github.com/Alamito/sortPokeAPI-Nodejs.git

# entrar no diretório do programa
cd "sortPokeAPI-Nodejs"

# baixar os módulos node
npm i

# inicializar o Front-end
node main.js
```

# ✍️ Autores ✍️
Alamir Bobroski Filho 
- www.linkedin.com/in/alamirdev

Guilherme Rafael Terres

<p align = "center"><em>"O poder não vem do conhecimento mantido, mas do conhecimento compartilhado"</em></p> <p align = "center">Bill Gates</p>

