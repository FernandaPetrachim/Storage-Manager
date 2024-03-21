
</head>
<body>
  <h1><strong>Bem-vindo ao repositório do projeto Store Manager API</strong></h1>
  <p>Este projeto faz parte do currículo do curso de Desenvolvimento Full Stack da Trybe. O Store Manager é uma plataforma de gestão de estoque e vendas projetada para ajudar lojas a gerenciar seus produtos e registros de vendas. Ele oferece endpoints para listar, cadastrar, atualizar e excluir produtos e vendas.</p>
  <p>O backend da aplicação foi desenvolvido usando Node.js e Express.js, enquanto o banco de dados utilizado é o MySQL. A aplicação disponibiliza uma API RESTful que permite aos usuários realizar operações CRUD (Create, Read, Update, Delete) em produtos e vendas.</p>
  <h2><strong>Tecnologias Utilizadas</strong></h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MySQL</li>
    <li>Docker</li>
    <li>JavaScript</li>
    <li>Mocha</li>
  </ul>
  <h2><strong>Testes</strong></h2>
  <p>Os métodos de testes no projeto incluem:</p>
  <ul>
    <li>A implementação de testes que validam o funcionamento de cada rota da API.</li>
    <li>Os testes foram desenvolvidos utilizando a biblioteca Mocha.</li>
    <li>Não é necessário executar o Docker Compose para que os testes funcionem, pois cada teste é isolado utilizando stubs (mocks).</li>
  </ul>
  <p>Para executar os testes, siga estas etapas:</p>
  <ol>
    <li>Abra o terminal na raiz do projeto.</li>
    <li>Execute o comando:</li>
  </ol>
<code>npm test</code>

  <p>Verifique a saída dos testes no seu terminal.</p>
  <p>O projeto possui uma cobertura de testes de 100% das funções criadas. Para verificar isso, você pode executar o seguinte comando:</p>
<code>npm run test:coverage</code>

  <h2><strong>Rotas Essenciais e Critérios de Desenvolvimento</strong></h2>
 Critérios para desenvolvimento:

Explore as rotas essenciais desta API, operações de CRUD e funcionalidades de pesquisa para uma administração eficaz de vendas e produtos.

1.Listar Produtos
Endpoint: GET /products e GET /products/:id Descrição: GET /products retorna todos os produtos ordenados por ID crescente. GET /products/:id retorna apenas o produto com o ID especificado. Testes: Deve ser testado a funcionalidade de listagem de todos os produtos e de um produto específico.

2.Listar Vendas
Endpoint: GET /sales e GET /sales/:id Descrição: GET /sales retorna todas as vendas ordenadas por saleId e productId. GET /sales/:id retorna apenas a venda com o ID especificado. Testes: Devem garantir que as vendas sejam realizadas corretamente e que a ordem de classificação seja conforme especificada.

3.Cadastrar Produtos
Endpoint: POST /products Descrição: Cria um novo produto no banco de dados com base nos dados fornecidos no corpo da requisição. Testes: Devem validar se o produto foi criado corretamente no banco de dados.

4.Validações para o Cadastro de Produtos
Descrição: Deve retornar mensagens de erro para requisições com dados inválidos. Testes: Devem garantir que as validações ocorram corretamente.

5.Cadastrar Vendas
Endpoint: POST /sales Descrição: Cria uma nova venda no banco de dados com base nos dados fornecidos no corpo da requisição. Testes: Devem validar se a venda é criada corretamente no banco de dados.

6.Validações para o Cadastro de Vendas
Descrição: Deve retornar mensagens de erro para requisições com dados inválidos. Testes: Devem garantir que as validações ocorram corretamente.

7.Atualizar um Produto
Endpoint: PUT /products/:id Descrição: Atualiza as informações de um produto com o ID especificado no banco de dados. Testes: Devem garantir que as informações do produto sejam atualizadas corretamente.

8.Deletar um Produto
Endpoint: DELETE /products/:id Descrição: Remove um produto com o ID especificado do banco de dados. Testes: Devem garantir que o produto seja removido corretamente do banco de dados.

9.Excluir uma venda
Endpoint: DELETE /sales/:id Descrição: Remove uma venda com o ID especificado do banco de dados.

10.Atualizar a Quantidade de um Produto em uma Venda
Endpoint: /sales/:saleId/products/:productId/quantity Descrição: Atualiza a quantidade de um produto vendido na venda especificada.

11.Pesquisar Produtos
Endpoint: GET /products/search Descrição: Retorna todos os produtos no banco de dados que contenham o termo especificado em seus nomes. Testes: Devem garantir que a pesquisa funcione corretamente, incluindo casos em que nenhum produto seja encontrado.

  <h2><strong>Contato</strong></h2>
  <p>Email: fernanda_petrachim@hotmail.com</p>
  <h2><strong>Contribuição</strong></h2>
  <p>Este projeto foi desenvolvido durante o meu curso na Trybe com base no projeto 'Store Manager'. A Trybe é uma escola de programação que tem compromisso com o sucesso profissional. O projeto 'Store Manager' faz parte do módulo de Back-End e envolve a criação de uma API com Express, Node, Docker e MySQL.</p>
  <h2><strong>Licença</strong></h2>
  <p>Código Aberto (código aberto)</p>
  <p>Este projeto é de código aberto e está disponível para toda a comunidade. Fique à vontade para explorar, clonar e contribuir para o projeto.</p>
</body>
</html>
