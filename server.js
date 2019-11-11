const express = require("express");
const { Product, Related, Feature, Style, Photo, SKU } = require("./models");

const app = express();

app.get("/products/list", async (req, res) => {
  //TODO: the additional queries for page and count
  try {
    const products = await Product.findAll({ limit: 5 });
    res.json(products);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* id, name, slogan, description, category, default_price, features[{}] */
app.get("/products/:product_id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.product_id);
    const features = await Feature.findAll({
      where: { product_id: req.params.product_id },
      attributes: ["feature", "value"]
    });
    product.dataValues["features"] = features;
    res.json(product);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* style_id, name, original_price, sale_price, default, photos[{}], skus*/
app.get("/products/:product_id/styles", async (req, res) => {
  try {
    const results = {
      product_id: req.params.product_id,
      results: []
    };
    const styles = await Style.findAll({
      where: {
        productId: req.params.product_id
      },
      attributes: { exclude: ["productId"] }
    });

    for (let i = 0; i < styles.length; i++) {
      const style = styles[i].dataValues;
      const temp = {
        style_id: style.id,
        name: style.name,
        original_price: style.original_price,
        sale_price: style.sale_price,
        "default?": style.default_style
      };
      const photos = await Photo.findAll({
        where: { styleId: styles[i].dataValues.id },
        attributes: { exclude: ["id", "styleId"] }
      });
      temp["photos"] = photos;
      const skus = await SKU.findAll({
        where: { styleId: styles[i].dataValues.id },
        attributes: { exclude: ["id", "styleId"] }
      });
      const skusObj = skus.reduce((acc, cur) => {
        const { dataValues } = cur;
        acc[dataValues.size] = dataValues.quantity;
        return acc;
      }, {});
      temp["skus"] = skusObj;
      results.results.push(temp);
    }
    res.json(results);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* array of related ids */
app.get("/products/:product_id/related", async (req, res) => {
  try {
    const related = await Related.findAll({
      where: {
        current_product_id: req.params.product_id
      },
      attributes: ["related_product_id"]
    });
    const results = [];
    for (let i = 0; i < related.length; i++) {
      results.push(related[i]["related_product_id"]);
    }
    res.json(results);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
