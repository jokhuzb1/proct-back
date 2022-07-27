import express from 'express';
import productRouter from './routes/products.js';
import database from './db/db.js'

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
let db
database.connect((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => console.log('server is up'))
    db = database.get()
  }
})

app.use('/products', productRouter)

app.get('/', (req, res) => {
  res.sned("welcome to phone shop");
});

app.get('*', (req, res) => {
  res.status(404).json("Page not found")

})
