const pool = require("../config/dbConnect");

// GET /staty -- get all as centroids
const vsechnyStatyNazev = (req, res, next) => {
  console.log("get all");
  const queryStaty = {
    text: "SELECT json_build_object('type', 'FeatureCollection', 'features', json_agg(ST_AsGeoJSON(t.*)::json)) as geojson FROM (SELECT id, cntr_iso, ST_Centroid(geom) FROM european_countries) AS t"
  };
  pool
    .query(queryStaty)
    .then((response) => {
      if (response.rows.length == 0) {
        res.send("Databáze je prázdná");
      }
      res.send(response.rows[0].geojson);
    })
    .catch((err) => {
      console.log("get all error: " + err);
      res.send(err);
    });
};

// GET /staty/:id
const vybranyStatNazev = (req, res, next) => {
  console.log("get single");
  const queryStat = {
    text: "SELECT ST_AsGeoJSON(t.*) as geojson FROM (SELECT id, cntr_iso, country, capital, cap_coord, wikipedia, area_categ, pop_categ, geom FROM european_countries) AS t WHERE id = $1;",
    values: [req.params.id]
  };
  pool
    .query(queryStat)
    .then((response) => {
      if (response.rows.length == 0) {
        res.send("Stát v databázi neexistuje.");
      }
      res.send(response.rows[0].geojson);
    })
    .catch((err) => {
      console.log("get single error: " + err);
      res.send(err);
    });
};

module.exports = { vsechnyStatyNazev, vybranyStatNazev };
