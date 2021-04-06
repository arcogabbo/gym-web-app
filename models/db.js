const mysql=require('mysql')
const config=require('../utility/config.js')

var opzioni={
	host:config.host,
	user:config.user,
	password:config.pw,
	database:config.name,
	connection_limit:config.connection_limit
}

var connection=mysql.createPool(opzioni)

module.exports = {
	query:async (q,params)=>{
		var promessa=new Promise((resolve,reject)=>{
			connection.query(q,params,(err,result,status)=>{
				//se ho un errore dal db faccio la reject
				if(err) return reject(err)
				
				if(result.length || result.affectedRows)
				{
					//il risultato esiste
					resolve(result)
				}else{
					//risultato vuoto
					reject("No data found/updated")
				}
			})
		})

		try
		{
			var result=await promessa
			return result
		}catch(e)
		{
			console.log("REJECT DAL DB: "+e)
		}
	},

	close:()=>{
		connection.end()
	},

	get_connection:()=>{
		return connection
	},

	options:opzioni
}