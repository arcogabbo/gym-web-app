//REQUIRE
const express=require('express')
const app=express()
const db=require('./models/db.js')
const cors=require('cors')
const cookie_parser=require('cookie-parser')
const file_upload = require('express-fileupload');

const PORT=8000

//STATIC CONTENT

app.use(express.static('static'))
app.set('view engine', 'ejs')
app.use(cookie_parser())
app.use(file_upload())

//MIDDLEWARE

app.use(require('body-parser').json()) //support to json
app.use(require('body-parser').urlencoded({ extended: true })) // support encoded bodies)

//ROUTERS
app.use(require('./routes/user_router.js'))
app.use(require('./routes/client_router.js'))
app.use(require('./routes/admin_router.js'))
app.use(require('./routes/book_router.js'))

//se nessuna richiesta viene soddisfatta allora rispondo con 404
app.use((req,res,next)=>{
	res.status(404).send("Page Not Found")
	next()
})


//INIT FUNCTIONS

app.listen(PORT,() => {
		console.log("in ascolto")
		//mi connetto solo una volta
		//con la pool la prima query si connettera' al db automaticamente
		//db.connect()
	}
)

//CLOSING FUNCTIONS

process.on('SIGINT',()=>{
	console.log("\nRicevuto SIGINT, chiudo il db e termino in pace...")
	//mi disconnetto all'uscita
	db.close()
	process.exit(0)
})