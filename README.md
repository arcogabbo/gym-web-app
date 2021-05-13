## CrossFit Web App
This is a project of mine to help those CrossFit fitness centers who still uses an agenda to take bookings and other things such as certificates and subscriptions.
In addition to booking, athletes can customize their own profile and add pages to a custom diary based on their activity.

## Web App setup
Create a file named config.js like the one below in the utility folder:
```js
const config={
	name: 'YOUR DB NAME',
	user:'YOUR DB USER',
	pw:'changemebeforeproduction',
	host:'127.0.0.1',
	connection_limit:10,
	debug:false,
	secret_key:'abcdef',
	path_to_images:"ABSOLUTE PATH TO IMAGE FOLDER",
	max_file_size_in_bytes:2*1024*1024
}

module.exports=config
```

Download `materialize.min.css` and `materialize.min.js` from their website and put them respectively on `static/css` and `static/js` folders

Now import the schema into your relational database (i personally used MariaDB)

Place an image named `image.png` inside a `static/images` folder you have to create.

Run the server via `node server.js` or if you want to use nodemon for development run `npm run dev`

## Endpoints
RESTful API documentation can be found on routes folder.
