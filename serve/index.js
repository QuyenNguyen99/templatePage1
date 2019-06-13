const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
// const query = require('query');
const port = 3000

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.on('uncaughtException', function (err) {
  console.error("Node NOT Exiting...", err);
});
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  var limit = req.query.limit || 3;
  var offset = req.query.offset || 0;
  var sql = "select * from category_news limit " + limit + " offset " + offset;
  // console.log('/',sql);
  var rs = {};
  connection.query(sql, function (error, results, fields) {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql1 \n');
    for (var item of results) {
      item.id = item.id_category;
      item.menuchinh = item.main_menu;
      item.tieude = item.title_category;
      item.trangthai = item.status;
    }
    rs.list = results;
    if(rs.list && rs.total) {
      res.send(rs);
    }
  });
  connection.query("select count(*) as total from category_news", function (error, results, fields) {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql1 \n');
    rs.total = results[0].total;
    if(rs.list && rs.total) {
      res.send(rs);
    }
  });
});

app.get('/search',(req, res) => {
  console.log(req.query.search);
  var sqlSearch = "select * from category_news where title_category like '%" + req.query.search + "%'";
  connection.query(sqlSearch, function (error, results, fields) {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql1 \n');
    for (var item of results) {
      item.id = item.id_category;
      item.menuchinh = item.main_menu;
      item.tieude = item.title_category;
      item.trangthai = item.status;
    }
    res.send(results);
    console.log(results);
  });
})

//lấy thông tin từ bảng ki click edit
app.get('/contactview', (req, res) => {
  var sqlView = "select * from category_news where id_category =" + req.query.id;
  connection.query(sqlView, function (error, results, fields) {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql \n');
    console.log(results);
    res.send(results && results.length ? results[0] : {});
  });
});

app.post('/contactupdate', (req, res) => { // convert data from serve to toad for mysql
  var sqlUpdate = "UPDATE category_news SET `title_category` = '" + req.body.attributes.title + "', `parent`='" + req.body.attributes.parent + "' WHERE `id_category` =" + req.body.id_category;
  // console.log('contactupdate', sql);
  connection.query(sqlUpdate, (error, results, fields) => {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql \n');
    res.send(results);
  })
})

app.post('/contactadd', (req, res) => {
  console.log(req.body);
  var sqlAdd = "INSERT INTO category_news (title_category, parent, main_menu, status) VALUES ('" + req.body.attributes.tieude + "', '" + req.body.attributes.parent + "', '" + req.body.attributes.menuchinh + "', '" + req.body.attributes.trangthai + "')";
  console.log(sqlAdd);
  connection.query(sqlAdd, function (error, results, fields) {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql1 \n');
    res.send(results);
    console.log(results)
  });
});

app.delete('/contactdelete/:id_category', (req, res) => {
  var sqlDelete = "delete from category_news where `id_category` = " + req.params.id_category;
  console.log(req.params)
  connection.query(sqlDelete, function (error, results, fields) {
    if (!!error) console.log('err mysql');
    else console.log('successful mysql1 \n');
    res.send({
      success:true,
    });
  });
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'data'
});

connection.connect(function (err) {
  if (!!err) console.log('er');
  else console.log("Connected!!!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))