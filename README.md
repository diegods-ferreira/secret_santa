<h1 align="center">Amigo Secreto</h1>
<h6 align="center">Uma pequena aplicação criada utilizando Node.js no back-end e ReactJS no front-end. Essa aplicação é um gerenciador de Amigos Secretos!</h6>
<br>
<br>
<h2>Índice</h2>
<ul>
  <li><a href="#inicio">Início</a></li>
  <li><a href="#back-end">Back-end</a></li>
  <li><a href="#front-end">Front-end</a></li>
  <li><a href="#prints">Prints</a></li>
</ul>
<br>
<br>
<h1 id="inicio">Início</h1>
<p>
  Para executar essa aplicação em sua máquina será necessário ter o <code>yarn</code>, <code>git</code> e o banco de dados PostgreSQL instalados. Garantindo que possui esses dois requisitos, siga o passo a passo:
</p>
<h4>Passo 1</h4>
<p>Clone esse repositório utilizando o comando <code>git clone</code>.</p>
<h4>Passo 2</h4>
<p>Crie o banco de dados no PostgreSQL com o nome <strong>secret_santa</strong>.</p>

<br>

<h1 id="back-end">Back-end</h1>
<p>
  Para executar o back-end em sua máquina siga o passo a passo:
</p>
<h4>Passo 1</h4>
<p>Dentro da pasta <code>back-end/</code> execute o comando <code>yarn</code></p>
<h4>Passo 2</h4>
<p>Dentro da pasta <code>back-end/</code> abra o arquivo <code>./knexfile.ts</code> e altere os dados de conexão com o banco de dados.</p>
<h4>Passo 3</h4>
<p>Faça o mesmo processo do passo anterior no arquivo <code>./src/database/connection.ts</code>.</p>
<h4>Passo 4</h4>
<p>Depois, execute o comando <code>yarn knex:migrate</code> para que a estrutura do banco de dados seja criada.</p>
<h4>Passo 5</h4>
<p>Por fim, execute o comando <code>yarn dev</code> para executar o back-end.</p>

<br>

<h1 id="front-end">Front-end</h1>
<p>
  Para executar o front-end em sua máquina siga o passo a passo:
</p>
<h4>Passo 1</h4>
<p>Dentro da pasta <code>front-end/</code> execute o comando <code>yarn</code></p>
<h4>Passo 2</h4>
<p>Execute o comando <code>yarn start</code> e aguarde até que o seu navegador abra na aba da aplicação.</p>
<br>
<p>É isso! Pode testar :)</p>

<br>
<br>

<h1 id="prints">Prints</h1>
<p>Estão alguns prints da aplicação sendo executada.</p>
<br>
<p align="center">Criando novo Amigo Secreto</p>
<p align="center">
  <img src="https://imgur.com/oFgRzd4.gif" width="90%">
</p>
<br>
<br>
<p align="center">Adicionando participantes ao Amigo Secreto</p>
<p align="center">
  <img src="https://imgur.com/KDYDWes.gif" width="90%">
</p>
<br>
<br>
<p align="center">Removendo um participantes do Amigo Secreto</p>
<p align="center">
  <img src="https://imgur.com/wpDMR2B.gif" width="90%">
</p>
<br>
<br>
<p align="center">Editando um participantes do Amigo Secreto</p>
<p align="center">
  <img src="https://imgur.com/VRMXmd3.gif" width="90%">
</p>
<br>
<br>
<p align="center">Fazendo o sorteio do Amigo Secreto</p>
<p align="center">
  <img src="https://imgur.com/xQSC0UQ.gif" width="90%">
</p>
<br>
<br>
<p align="center">Verificando e-mails enviados na console do back-end</p>
<p align="center">
  <img src="https://imgur.com/5J8fxDX.gif" width="90%">
</p>