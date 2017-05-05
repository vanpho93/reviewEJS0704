const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const parser = bodyParser.urlencoded({ extended: false });
const app = express();
app.listen(3000, () => console.log('Server started'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/images/background'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`)
});

const upload = multer({ storage }).single('hinhdaidien');

app.post('/admin/addProduct', (req, res) => {
    upload(req, res, err => {
        const { name, desc, idVideo } = req.body;
        const { filename } = req.file;
        arrProducts.push(new Product(name, desc, filename, idVideo));
        res.send('THEM_THANH_CONG');
    });
});

app.get('/', (req, res) => res.render('index_dark', { mang: arrProducts }));

app.get('/admin', (req, res) => res.render('admin', { mang: arrProducts }));

app.get('/xoa/:index', (req, res) => {
    const { index } = req.params;
    arrProducts.splice(index, 1);
    res.redirect('/admin');
});

app.get('/sua/:index', (req, res) => {
    const { index } = req.params;
    res.render('update', arrProducts[index]);
});



app.post('/addmin/updateProduct', parser, (req, res) => {
    const { name, desc, image, idVideo, id } = req.body;
    const pr = new Product(name, desc, image, idVideo, id);
    const index = arrProducts.findIndex(e => e.id == id);
    arrProducts[index] = pr;
    res.redirect('/admin');
});

class Product {
    constructor(name, desc, image, idVideo, id) {
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.idVideo = idVideo;
        this.id = id
    }
}

const arrProducts = [
    new Product('React Native', 'It is a Facebook javascript lib!', '16500156_th.jpg', '213831476', 1),
    new Product('NodeJS', 'Develop by Rald, using V8 engine of chrome', '18058390_th.jpg', '18058390', 2)
];