db.transaction(function (tx) {
  //取得關鍵字查詢內容
  var sSql="select * from industd";
  tx.executeSql(sSql, [], function (tx, results) {
    console.log(results);
  } 
});