const express = require("express");
const redis = require("redis");
const { Product, Related, Feature, Style, Photo, SKU } = require("./models");

const app = express();
let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient(6379);
}

// echo redis errors to the console
client.on("error", err => {
  console.log("Error: " + err);
});

app.get("/loaderio-bb60c0a8dc0c0eaf8d83f532a2dda91f.html", (req, res) => {
  res.send("loaderio-bb60c0a8dc0c0eaf8d83f532a2dda91f");
});

app.get("/products/list", async (req, res) => {
  //TODO: the additional queries for page and count
  try {
    const productsListKey = "products:list";

    return client.get(productsListKey, (err, productsList) => {
      if (productsList) {
        return res.json(JSON.parse(productsList));
      } else {
        return Product.findAll({ limit: 5 })
          .tap(products => {
            client.setex(productsListKey, 3600, JSON.stringify(products));
          })
          .then(products => {
            res.json(products);
          });
      }
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* id, name, slogan, description, category, default_price, features[{}] */
app.get("/products/:product_id", async (req, res) => {
  try {
    const idDetailKey = `${req.params.product_id}:details`;
    return client.get(idDetailKey, async (err, product) => {
      if (product) {
        return res.json(JSON.parse(product));
      } else {
        const product = await Product.findByPk(req.params.product_id);
        const features = await Feature.findAll({
          where: { product_id: req.params.product_id },
          attributes: ["feature", "value"]
        });
        product.dataValues["features"] = features;
        client.setex(idDetailKey, 3600, JSON.stringify(product));
        res.json(product);
      }
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* style_id, name, original_price, sale_price, default, photos[{}], skus{}*/
app.get("/products/:product_id/styles", async (req, res) => {
  try {
    const idStyleKey = `${req.params.product_id}:styles`;
    return client.get(idStyleKey, async (err, styles) => {
      if (styles) {
        return res.json(JSON.parse(styles));
      } else {
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
        client.setex(idStyleKey, 3600, JSON.stringify(results));
        res.json(results);
      }
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

/* array of related ids */
app.get("/products/:product_id/related", async (req, res) => {
  try {
    const idRelatedKey = `${req.params.product_id}:related`;
    return client.get(idRelatedKey, async (err, related) => {
      if (related) {
        return res.json(JSON.parse(related));
      } else {
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
        client.setex(idRelatedKey, 3600, JSON.stringify(results));
        res.json(results);
      }
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
