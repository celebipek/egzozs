const express = require('express');
const mongoose = require('mongoose')
const path = require("path")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('./models/user');

const app = express();
app.use(bodyParser.json()); // JSON verilerini işleme
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


(async () => {
    try {
        await mongoose.connect('mongodb+srv://celebi:123321@cluster0.vpq6vel.mongodb.net/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
        console.log("mongodb bağlantısı kuruldu.");
    }
    catch(err) {
        console.log(err);
    }
})();






app.get('/', (req, res) => {
    res.render('index');
}); 
app.get('/urunler', (req, res) => {
    res.render('./sections/urunler');
}); 
app.get('/urun', (req, res) => {
    res.render('./sections/urun');
}); 
app.get('/login', (req, res) =>{
    res.render('./sections/login')
})
app.get('/signup', (req, res) =>{
    res.render('./sections/signup')
})


app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // Kullanıcı veritabanında kontrol edilmeli ve aynı kullanıcı adına sahip bir kullanıcı daha önce kayıtlı değilse yeni bir kullanıcı oluşturulmalı

  
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400);
      throw new Error("email adresi kullanılıyor");
    }
  
    //Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password: ", hashedPassword);
    // const user = await User.create({
    //   email,
    //   password: hashedPassword,
    // });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user = new User({
    email: req.body.email,
    password: req.body.password //hashedPassword yap ileride
  });

  await user.save();

    res.redirect('/login')
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Kullanıcı bilgilerini kontrol edin ve geçerli bir kullanıcı ise JWT oluşturun ve kullanıcıya gönderin
    const user = await User.findOne({ email, password });
  
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı.' });
    }
    // const isSuccess = await bcrypt.compare(req.body.password, user.password);
    // if(!isSuccess) {
    //     return res.status(400).send("hatalı email ya da parola");
    // }
    const token = jwt.sign({ email: user.email }, 'asdasdas', { expiresIn: '1h' });
    // res.status(200).json({ token });
    res.redirect('/')
  });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test Sürümü http://localhost:${PORT} adresinde çalışıyor.`);
});