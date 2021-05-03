## CrossFit Web App
This is a project of mine to help those CrossFit fitness centers who still uses an agenda to take books and other things such as certificates and submissions.
In addition to books athletes can customize their profile and add pages to a custom diary based on their activity.

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

Now import the schema into your relational database (i personally used MariaDB)

Run the server via `node server.js` or if you want to use nodemon for development run `npm run dev`

## Endpoints
RESTful API documentation can be found on routes folder.