const openDatabase = require('websql');

const data = require('./db');
const { industd, indurel, induexl, induattr, indumap } = data;
const db = openDatabase('std.db', '1.0', '稅務子類', 5 * 1024 * 1024);
function init() {
  db.transaction(function (tx) {
    //載入分類資料
    var len=industd.length;
    tx.executeSql("DROP TABLE IF EXISTS industd");
    tx.executeSql("CREATE TABLE IF NOT EXISTS industd (revid integer, indid, indlevel integer, indname, inddesc, indtype, parentid, indmark)");
    for (var i=0; i<len; i=i+8) {
      var sSql="INSERT INTO industd select "+industd[i]+",'"+industd[i+1]+"',"+industd[i+2]+",'"+industd[i+3]+"','"+industd[i+4]+"','"+industd[i+5]+"','"+industd[i+6]+"','"+industd[i+7]+"'";
      tx.executeSql(sSql);
    }
    //載入階層關係
    len=indurel.length;
    tx.executeSql("DROP TABLE IF EXISTS indurel");
    tx.executeSql("CREATE TABLE IF NOT EXISTS indurel (revid integer, indid, pid, plevel)");
    for (var i=0; i<len; i=i+4) {
      var sSql="INSERT INTO indurel select "+indurel[i]+",'"+indurel[i+1]+"','"+indurel[i+2]+"',"+indurel[i+3];
      tx.executeSql(sSql);
    }
    //載入不包括資料
    len=induexl.length;
    tx.executeSql("DROP TABLE IF EXISTS induexl");
    tx.executeSql("CREATE TABLE IF NOT EXISTS induexl (revid integer, indid, exlitem)");
    for (var i=0; i<len; i=i+3) {
      var sSql="INSERT INTO induexl select "+induexl[i]+",'"+induexl[i+1]+"','"+induexl[i+2]+"'";
      tx.executeSql(sSql);
    }
    //載入同業利潤標準資料
    len=induattr.length;
    tx.executeSql("DROP TABLE IF EXISTS induattr");
    tx.executeSql("CREATE TABLE IF NOT EXISTS induattr (revid integer, indid, y, a1, a2, a3, a4, a5)");
    for (var i=0; i<len; i=i+8) {
      var sSql="INSERT INTO induattr select "+induattr[i]+",'"+induattr[i+1]+"',"+induattr[i+2]+",'"+induattr[i+3]+"','"+induattr[i+4]+"','"+induattr[i+5]+"','"+induattr[i+6]+"','"+induattr[i+7]+"'";
      tx.executeSql(sSql);
    }
    //載入新舊版對照資料
    len=indumap.length;
    tx.executeSql("DROP TABLE IF EXISTS indumap");
    tx.executeSql("CREATE TABLE IF NOT EXISTS indumap (revid integer, indid, trevid integer, tindid, tmark, haslink)");
    for (var i=0; i<len; i=i+6) {
      var sSql="INSERT INTO indumap select "+indumap[i]+",'"+indumap[i+1]+"',"+indumap[i+2]+",'"+indumap[i+3]+"','"+indumap[i+4]+"',"+indumap[i+5]+"";
      tx.executeSql(sSql);
    }
  });
}

init();

