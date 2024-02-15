# :construction: README em construção ! :construction:

Projeto de Gerenciamento de Produtos e Vendas
Este é um projeto de uma API para gerenciar produtos e vendas em um sistema de comércio. Abaixo está uma explicação detalhada de cada requisito implementado.

Endpoints da API
1. Listagem de Produtos
Endpoint GET /products e /products/:id para listar todos os produtos e um produto específico por ID, respectivamente.
Os produtos são ordenados de forma crescente pelo campo id.
2. Listagem de Vendas
Endpoint GET /sales e /sales/:id para listar todas as vendas e uma venda específica por ID, respectivamente.
As vendas são ordenadas de forma crescente pelo campo saleId, e em caso de empate, também são ordenadas de forma crescente pelo campo productId.
3. Cadastro de Produtos
Endpoint POST /products para cadastrar um novo produto.
O corpo da requisição deve conter o nome do produto.
4. Validações para o Cadastro de Produtos
O endpoint de cadastro de produtos retorna mensagens de erro para requisições com dados inválidos.
5. Cadastro de Vendas
Endpoint POST /sales para cadastrar uma nova venda.
As vendas são salvas nas tabelas sales e sales_products.
É possível cadastrar a venda de vários produtos através de uma mesma requisição.
6. Validações para o Cadastro de Vendas
O endpoint de cadastro de vendas retorna mensagens de erro para requisições com dados inválidos.
7. Atualização de Produto
Endpoint PUT /products/:id para atualizar um produto específico por ID.
O corpo da requisição é validado de acordo com o cadastro de produtos.
8. Exclusão de Produto
Endpoint DELETE /products/:id para excluir um produto específico por ID.
9. Exclusão de Venda (Bônus)
Endpoint DELETE /sales/:id para excluir uma venda específica por ID.
10. Atualização da Quantidade de um Produto em uma Venda (Bônus)
Endpoint PUT /sales/:saleId/products/:productId/quantity para atualizar a quantidade de um produto vendido em uma venda específica.
O corpo da requisição contém o novo valor da quantidade.
11. Pesquisa de Produtos
Endpoint GET /products/search para pesquisar produtos por nome.
A aplicação retorna uma matriz de produtos que contenham o termo de busca no nome.
Se nenhum nome satisfizer a busca, a aplicação retorna um array vazio.

-->
