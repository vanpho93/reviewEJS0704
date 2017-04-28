const express = require('express');

const app = express();
app.listen(3000, () => console.log('Server started'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index_dark', { mang: arrProducts }));

class Product {
    constructor(name, desc, image, idVideo) {
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.idVideo = idVideo;
    }
}

const arrProducts = [
    new Product('React Native', 'It is a Facebook javascript lib!', '16500156_th.jpg', '213831476'),
    new Product('NodeJS', 'Develop by Rald, using V8 engine of chrome', '18058390_th.jpg', '18058390')
];