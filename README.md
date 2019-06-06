
[![N|Solid](https://is3-ssl.mzstatic.com/image/thumb/Purple113/v4/75/21/da/7521da8c-5c2c-e8be-b6f7-88ca6b74b723/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-10.png/230x0w.jpg)](https://nodesource.com/products/nsolid)

# Desafio Bravo HURB:

Construa uma API, que responda JSON, para conversão monetária. Ela deve ter uma moeda de lastro (USD) e fazer conversões entre diferentes moedas com cotações de verdade e atuais.

A API deve converter entre as seguintes moedas:

USD
BRL
EUR
BTC
ETH
Ex: USD para BRL, USD para BTC, ETH para BRL, etc...

A requisição deve receber como parâmetros: A moeda de origem, o valor a ser convertido e a moeda final.

Ex: ?from=BTC&to=EUR&amount=123.45

Você pode usar qualquer linguagem de programação para o desafio. Abaixo a lista de linguagens que nós aqui do HU temos mais afinidade:

JavaScript (NodeJS)
Python
Go
Ruby
C++
PHP
Você pode usar qualquer framework. Se a sua escolha for por um framework que resulte em boilerplate code, por favor assinale no README qual pedaço de código foi escrito por você. Quanto mais código feito por você, mais conteúdo teremos para avaliar.

# Tecnologia utilizada 

Linguagem utilizada: NodeJs
Bancos Utilizado: MongoDB, Mongoose
Teste Unitário: Mocha e Supertest
  
### Rodando o sistema

```sh
$ npm install -- Instalar as dependências.
$ npm start -- Rodar o sistema.
$ npm run test -- Executar os testes do sistema.
```

OBS:
Para encerrar o teste unitário pressione CTRL + C no terminal

# Consumindo a api:

Abaixo segue exemplos dos caminhos para utilização da api;
Rota para consultar uma cotação de uma moeda para outra e retornar o valor já com conversão.

ex: htp://localhost:3000/quotation/:coinFrom/:coinTo?/:amount? => htp://localhost:3000/quotation/USD/BRL/500

Essa ação irá salvar no banco de dados MongoDB, para futuras consultas e assim poder gerar uma métrica. Para consultar uma cotação específica, basta colocar o valor page 0 e o ID do documento que está salvo no banco. Para as consultas sem especificar um ID, basta colocar um número de uma página no lugar do ":page", isso fara com que a consulta retorne 10 resultados por página, as páginas começam a ser contadas com o valor 0.
Para solicitar uma consulta siga o exemplo.

ex: http://localhost3000/findQuotation/:page/:id? => http://localhost3000/findQuotation/0/1 (consulta pelo documento salvo no banco com o ID 1), http://localhost3000/findQuotation/0 (consulta os 10 primeiros documentos salvos no banco), http://localhost3000/findQuotation/1 (consulta dos proxímos 10 documentos salvos no banco)

Caso queira remover um dado, basta enviar o ID do documento a ser removido.
ex: http://localhost3000/removeQuotation/:id => http://localhost3000/removeQuotation/1

OBS: Como sabemos que dados são extremamentes necessários, todas as exclusões são lógicas, ao "remover" um documento é setado uma flag ACTIVE = FALSE, isso fará com que os dados que estejam com a flag ACTIVE = FALSE e não retorne em suas consultas.

# Consulta a API awesomeapi cotação: 
https://docs.awesomeapi.com.br/api-de-moedas

### Cotação feita nas sequintes moedas:
|Moeda de origin             |Moeda a ser convertida|
|:---------                  |:---------            | 
|USD (Dólar Comercial)       |BRL                   |
|USDT (Dólar Turismo)        |BRL                   |
|CAD (Dólar Canadense)       |BRL                   |
|AUD (Dólar Australiano)     |BRL                   |
|EUR (Euro)                  |BRL                   |
|GBP (Libra Esterlina)       |BRL                   |
|ARS (Peso Argentino)        |BRL                   |
|JPY (Iene Japonês)          |BRL                   |
|CHF (Franco Suíço)          |BRL                   |
|CNY (Yuan Chinês)           |BRL                   |
|YLS (Novo Shekel Israelense)|BRL                   |
|BTC (Bitcoin)               |BRL                   |
|LTC (Litecoin)              |BRL                   |
|ETH (Ethereum)              |BRL                   |
|XRP (Ripple)                |BRL                   |

### Legendas
|Retorno    |Legenda                 |
|:--------- |:---------              | 
|bid        | Compra                 |
|ask        | Venda                  |
|varBid     | Variação               |
|pctChange  | Porcentagem de Variação|
|high       | Máximo                 |
|low        | Mínimo                 |
