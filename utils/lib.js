const E = "earring";
const N = "necklace";
const B = "bracelet";
const A = "anklechain";
const R = "ring";

const sortAndFilterAllProducts = (req) => {
  const page = req.query.page || 1;
  const newPageValue = Number(page);
  const productsPerPage = 6;

  let getSorted = {};
  let findProducts;

  // search params
  const msg = req.query.msg;
  const n = req.query.n;
  const e = req.query.e;
  const r = req.query.r;
  const b = req.query.b;
  const a = req.query.a;
  const sort = req.query.sort;

  if (sort === "minprice") getSorted = { price: 1 };
  else if (sort === "maxprice") getSorted = { price: -1 };
  else if (sort === "a-z") getSorted = { productName: 1 };
  else if (sort === "z-a") getSorted = { productName: -1 };

  if (e === E || n === N || r === R || b === B || a === A) {
    findProducts = {
      $or: [
        { category: n },
        { category: e },
        { category: r },
        { category: b },
        { category: a },
      ],
    };
  } else {
    findProducts = {};
  }

  return { newPageValue, productsPerPage, getSorted, findProducts };
};

module.exports = { E, N, B, A, R, sortAndFilterAllProducts };
