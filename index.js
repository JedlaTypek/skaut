const express = require('express')
const app = express()

// nastavení EJS jako šablonovacího systému (templating engine)
app.set('view engine', 'ejs')

// nastavení složky se statickými soubory (přílohy - jpg, css, mp4, ...)
app.use(express.static('public'))

// routa - domovská stránka webu
app.get('/', function (req, res) {
    res.render('index')
})

app.listen(3000) //webserver naslouchá na portu 3000