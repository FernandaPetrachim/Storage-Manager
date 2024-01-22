const criarConexao = require('./criarConexao');

const findModel1 = async () => {
  const [sales] = await criarConexao.execute(`SELECT
  sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM sales_products AS sp
  INNER JOIN sales AS s
  ON s.id = sp.sale_id
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`);
  return sales;
};
const findIdModel1 = async (id) => {
  const [sales] = await criarConexao.execute(`SELECT
  s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp
  ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.product_id ASC;`, [id]);
  return sales;
}; 

const inserirVendas = async () => {
  const [sales] = await criarConexao.execute('INSERT INTO sales VALUES ()');
  const { insertId } = sales;
  console.log(insertId);
  return insertId;
};

const inserirVendasProduto = async (saleId, productId, quantity) => {
  console.log(saleId, productId, quantity);
  const [sales] = await criarConexao.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  const { insertId } = sales;
  return insertId;
};

const findByIdVendas = async (id) => {
  const [sales] = await criarConexao.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return sales;
};

const findByIdProductVendas = async (id) => {
  const [sales] = await criarConexao.execute(
    'SELECT * FROM sales_products WHERE product_id = ?',
    [id],
  );
  return sales;
};

const findByIdProductAndVendas = async (saleId, productId) => {
  const [sales] = await criarConexao.execute(
    `SELECT
    s.date AS date,
    sp.product_id AS productId,
    sp.quantity AS quantity,
    sp.sale_id AS saleId
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON s.id = sp.sale_id WHERE s.id = ? AND sp.product_id = ?`,
    [saleId, productId],
  );
  return sales;
};

const excluirVendas = async (id) => {
  const [sales] = await criarConexao.execute('DELETE FROM sales WHERE id = ?', [id]);
  return sales;
};

const atualizarVendas = async (vendaId, produtoId, quantidade) => {
  const [sales] = await criarConexao.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantidade, vendaId, produtoId],
  );
  return sales;
};

module.exports = {
  findIdModel1,
  inserirVendas,
  findModel1,
  findByIdVendas,
  findByIdProductVendas,
  inserirVendasProduto,
  findByIdProductAndVendas,
  excluirVendas,
  atualizarVendas,
};