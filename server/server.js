/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const _ = require('lodash');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/todos', (req, res) => {
  const db = router.db;
  if (Array.isArray(req.body)) {
    req.body.forEach((element) => {
      insertTodo(db, 'todos', element);
    });
  } else {
    insertTodo(db, 'todos', req.body);
  }
  res.sendStatus(200);

  function insertTodo(db, collection, data) {
    const table = db.get(collection);

    // data.idのtodoが存在しなければ新たに作成する
    if (_.isEmpty(table.find({ id: data.id }).value())) {
      table.push(data).write();
    } else {
      table
        .find({ id: data.id })
        .assign(_.omit(data, ['id']))
        .write();
    }
  }
});

server.put('/todos', (req, res) => {
  const db = router.db;
  if (Array.isArray(req.body)) {
    req.body.forEach((element) => {
      updateTodo(db, 'todos', element);
    });
  } else {
    updateTodo(db, 'todos', req.body);
  }
  res.sendStatus(200);

  function updateTodo(db, collection, data) {
    const table = db.get(collection);

    // data.idのtodoが存在する場合のみ、todoの中身を更新する
    if (_.isEmpty(table.find({ id: data.id }).value())) {
      return;
    } else {
      table
        .find({ id: data.id })
        .assign(_.omit(data, ['id']))
        .write();
    }
  }
});

server.delete('/todos', (req, res) => {
  if (!req.query.id) {
    res.sendStatus(400);
    return;
  }
  const db = router.db;
  if (Array.isArray(req.query.id)) {
    req.query.id.forEach((id) => {
      deleteTodo(db, 'todos', id);
    });
  } else {
    deleteTodo(db, 'todos', req.query.id);
  }
  res.sendStatus(200);

  function deleteTodo(db, collection, id) {
    const table = db.get(collection);

    // data.idのtodoが存在する場合のみ、todoを削除する
    if (_.isEmpty(table.find({ id: id }).value())) {
      return;
    } else {
      table.remove({ id: id }).write();
    }
  }
});

server.use(router);
server.listen(8080, () => {
  console.log('JSON Server is running');
});
