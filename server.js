let Express = require("express");
let app = Express();

app.use(Express.static("./dist"));

app.listen(3000, () => console.log("Roger Roger :)"));
