var connection = require("../config/connection.js");

function sqlhelper(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  insertOne: function(table, col, val, callback){
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += col.toString();
    queryString += "VALUES (";
    queryString += sqlhelper(val.length);
    queryString += ") ";

    connection.query(queryString, val, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result)
    });
  },
  updateOne: function(table, objColVals, condition, callback) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if err {
        throw err;
      }
      callback(result);
    });
  }
}

module.exports = orm;
