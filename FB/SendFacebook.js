const request=require('request');

/**
 * Clase para envio de mensajes a facebook
 * @class
 */
class SendFacebook{

	/**
	 * @constructor
	 * @param {Array|Object} messages - Arreglo de objetos de mensajes
	 * @param {String} token - Token de facebook
	 */
	constructor(messages, token){
		this.token = token
		this.messages = messages
	}

	/**
	 * Envio de mensajes a Facebook
	 * @function
	 */
	send(){
		const _this = this
		return new Promise(function (resolve, reject){
			let results = []
			async function for_sync(array, index=0){
				if(array.length == index){
					return resolve(results)
				}
				let rs = await _this.request_facebook(array[index])
				results.push(rs)
				index++
				for_sync(array, index)
			}
			
			for_sync(_this.messages)
		})
	}

	/**
	 * Hacer request para responder mensaje de Facebook
	 * @function
	 * @private
	 * @param {Object} message - Objeto de tipo respuesta para facebook
	 */
	request_facebook(message){
		const _this = this
		return new Promise(function(resolve, reject){
			request({
				url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + _this.token ,
				json : true,
				body : message.getStruct(),
				timeout : 60000,
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				}
			},function(err,response,body){
				if(err){
					reject(err)
				}
				resolve(body)
			})
		})
	}

	/**
	 * @ignore
	 */
   static enviar(mensaje,token){
 // console.log("SendFacebbok pe",configFB);
		request({
			url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + token ,
			json : true,
			body : mensaje,
			timeout : 60000,
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
						}
		},function(err,response,body){
			if(err){
				console.log(err);
				return;
			}
			console.log(body);
			console.log("mensaje enviado");
		});
	}
}

module.exports = SendFacebook;
