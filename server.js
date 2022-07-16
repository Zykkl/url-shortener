let express = require('express');
let { Deta } = require('deta')
let app = express();
let dotenv = require('dotenv');
dotenv.config()

const { makeid } = require('./functions/makeId.js')
const deta = Deta(process.env.PROJECT_KEY)
const db = deta.Base(process.env.DB_NAME)

app.use(express.urlencoded());
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api/shorten', async (req, res) => {
    let url = req.body.url
    let id = makeid(6)
    await db.put({ url: url, key: id })
    res.status(200).send('200 OK')
})

app.get('/:id', async (req, res) => {
    let id = req.params.id
    let url = await db.get(id)
    res.redirect(url.url)
})

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`));