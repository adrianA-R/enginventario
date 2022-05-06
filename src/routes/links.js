const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("links/");
});

router.get("/addC", isLoggedIn, async (req, res) => {
  const products = await pool.query("SELECT * FROM products");
  res.render("links/", { products });
});

router.post("/add", async (req, res) => {
  const { name, code, price, amount, img, description } = req.body;
  const newLink = {
    name,
    code,
    price,
    amount,
    img,
    description,
  };
  await pool.query("INSERT INTO products set ?", [newLink]);
  req.flash("success", "Artículo agregado exitosamente");
  res.redirect("/links");
});

router.post("/addC", async (req, res) => {
  const { name, code, price, type, amount, description, products_id } = req.body;
  const newLink = {
    name,
    code,
    price,
    type,
    amount,
    description,
    products_id,
  };
  await pool.query("INSERT INTO components set ?", [newLink]);
  req.flash("success", "Artículo agregado exitosamente");
  res.redirect("/links");
});

router.get("/", isLoggedIn, async (req, res) => {
  const products = await pool.query("SELECT * FROM products");
  const components = await pool.query("SELECT * FROM components");
  res.render("links/list", {  products, components });
});

router.get("/components/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  products = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  components = await pool.query("SELECT * FROM components WHERE products_id = ?", [id]);
  res.render("links/components", {  products, components });
});

router.get("/general", isLoggedIn, async (req, res) => {
  const products = await pool.query("SELECT * FROM products");
  const components = await pool.query("SELECT * FROM components");
  res.render("links/general", {  products, components });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM components WHERE products_id = ?", [id]);
  await pool.query("DELETE FROM products WHERE ID = ?", [id]);
  req.flash("success", "Eliminado exitosamente");
  res.redirect("/links");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const products = await pool.query("SELECT * FROM products WHERE id = ?", [
    id,
  ]);
  console.log(products);
  res.render("links/edit", { product: products[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, code, price, amount, img, description } = req.body;
  const newLink = {
    name,
    code,
    price,
    amount,
    img,
    description,
  };
  await pool.query("UPDATE products set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Editado y guardado");
  res.redirect("/links");
});

router.get("/deleteC/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM components WHERE ID = ?", [id]);
  req.flash("success", "Eliminado exitosamente");
  res.redirect("/links");
});

router.get("/editC/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const components = await pool.query("SELECT * FROM components WHERE id = ?", [
    id,
  ]);
  res.render("links/editC", { com: components[0] });
});

router.post("/editC/:id", async (req, res) => {
  const { id } = req.params;
  const { name, code, price, type, amount, description, products_id } = req.body;
  const newLink = {
    name,
    code,
    price,
    type,
    amount,
    description,
    products_id,
  };
  await pool.query("UPDATE components set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Editado y guardado");
  res.redirect("/links");
});

router.get("/change/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const products = await pool.query("SELECT * FROM products WHERE id = ?", [
    id,
  ]);
  res.render("links/change", { products, id });
});

router.post("/change/:id", async (req, res) => {
  const { id } = req.params;
  const { products_id } = req.body;
  const newLink = { products_id };
  await pool.query("UPDATE components set ? WHERE components.id = ?", [
    newLink,
    id,
  ]);
  req.flash("success", "Editado y guardado");
  res.redirect("/links");
});

module.exports = router;
