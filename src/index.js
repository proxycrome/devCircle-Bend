import app from "./server.js";
import databaseConnection from './database/index.js';
import client from './database/linkesIndex.js';
const port = process.env.PORT || 6000;

databaseConnection.getConnect();
client.connect();


app.listen(port, () => {
    console.log(`Server connected at http://localhost:${port}`);
})