const app = require("./app/src/app");
const PORT = process.env.port;

app.listen(PORT, () => console.log(`we are on http://localhost/${PORT}`));
 