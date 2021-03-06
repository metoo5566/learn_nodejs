const querystring = require("querystring");

const query = "id=2&name=tongyi&from=北京";
const query2 = "id:2/name:tongyi/from:北京";
const queryEscape = "id%3D2%26name%3Dtongyi%26from%3D%E5%8C%97%E4%BA%AC";
const queryObj = { id: "2", name: "tongyi", from: "北京" };

console.log(querystring.parse(query));
console.log(querystring.escape(query));
console.log(querystring.unescape(queryEscape));
console.log(querystring.stringify(queryObj, ":", "/"));
// console.log(querystring.parse(query2, '/', ':'))
const newQuery = querystring.stringify(queryObj, null, null, {
  encodeURIComponent(string) {
    return querystring.unescape(string);
  },
});
console.log(newQuery);
