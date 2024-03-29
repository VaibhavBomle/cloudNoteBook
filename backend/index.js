const connectToDb = require(`./db`);
const express = require(`express`)
var cors = require('cors')
connectToDb();
const app = express();
const port = 3001
app.use(cors())

app.use(express.json())
// Available Routes
app.use(`/api/auth`,require(`./routes/auth`));
app.use(`/api/notes`,require(`./routes/notes`));


// app.get('/', (req, res) => {
//   res.send('Hello World!!!!!');
// })


app.listen(port, () => {
  console.log(`Cloud Notebook Backend listening on port at http://localhost: ${port}`);
})