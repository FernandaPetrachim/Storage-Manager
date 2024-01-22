const validadacaoVendas = (req, res, next) => {
  const itemsSold = req.body;
  if ((itemsSold.every((item) => item.productId)) === false) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if ((itemsSold.every((item) => item.quantity <= 0)) === true) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if ((itemsSold.every((item) => item.quantity)) === false) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
    
module.exports = validadacaoVendas;