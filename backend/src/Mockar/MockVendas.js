const date = '2021-09-09T04:54:29.000Z';
const vendasFromDB1 = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];
const vendasFromModel = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const vendasIdFromDB = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];
const vendasIdFromModel = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

const vendasServiceSuccessoful = {
  status: 'SUCCESSFUL',
  data: vendasFromModel,
};
const vendasIDServiceSuccessoful = {
  status: 'SUCCESSFUL',
  data: vendasFromModel,
};
const vendasIDServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

const novasVendasFromDB = {
  insertId: 4,
};
const inserieVendasMock = {
  status: '201',
  data: { message: 'message' },
};
const novasVendasFromModel = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 5,
    },
  ],
};

const novasVendasServiceSuccessoful = {
  status: 'CREATED',
  data: novasVendasFromModel,
};

const delVendasFromDB = {
  id: 1,
  date,
};

const atualizarVenda = {
  date: ['Date: 2021-09-09T04:54:29.000Z'],
  productId: 1,
  quantity: 10,
  saleId: 1,
};

module.exports = {
  vendasFromDB1,
  vendasIdFromDB,
  vendasFromModel,
  vendasIdFromModel,
  vendasServiceSuccessoful,
  vendasIDServiceSuccessoful,
  vendasIDServiceNotFound,
  novasVendasFromDB,
  novasVendasFromModel,
  novasVendasServiceSuccessoful,
  delVendasFromDB,
  atualizarVenda,
  inserieVendasMock,
};