const criarConexao = require('./criarConexao');

const findAll1 = async () => {
  const [produto] = await criarConexao.execute('SELECT * FROM products ORDER BY id');
  return produto;
};

const findId1 = async (productId) => {
  const [[produto]] = await criarConexao.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return produto;
};
const inserirProduto1 = async (name) => {
  const [product] = await criarConexao.execute('INSERT INTO products (name) VALUES (?)', [name]);
  const { insertId } = product;
  return insertId;
};
const atualizar = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const params = [name, id];

  const [product] = await criarConexao.execute(query, params);

  return product;
};
const deleteProduto = async (id) => {
  try {
    const [result] = await criarConexao.execute('DELETE FROM products WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      // Produto excluído com sucesso
      return { success: true, message: 'Produto excluído com sucesso' };
    } 
    return { success: false, message: 'Nenhum produto encontrado com o ID fornecido' };
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return { success: false, message: 'Erro ao excluir produto' };
  }
};

module.exports = {
  findId1,
  findAll1,
  inserirProduto1,
  atualizar,
  deleteProduto,
};