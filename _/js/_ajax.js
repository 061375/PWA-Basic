/** 
 * Ajax
 * /_/js/_ajax.js
 * @author Jeremy Heminger <contact@jeremyheminger.com>
 * @version 1.0.0
 *
 * 
 *
 * json
 * html
 * text
 * buildURL
 *
 * */
 class Ajax {
 	/** 
 	 * comment
 	 * @param {String} option if defined this will be that base url
 	 * */
 	constructor(baseurl) {
 		this.baseurl = '';
 		if(typeof baseurl !== 'undefined')
 			this.baseurl = baseurl;

 	}
 	/** 
 	 * comment
 	 * @param {String}
 	 * @param {Function}
 	 * */
 	json(url, payload, callback, showerror) {
 		url = this.buildUrl(url);
 		let data = new FormData();
 		data.append('data',JSON.stringify(payload));
 		fetch(url, { 
 			headers: { "Content-Type": "application/json; charset=utf-8" },
 			method: "POST",
 			body: data
 		})
		    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
		    .then(response => {
		        callback(response);
		    })
		    .catch(err => {
		        if(undefined === showerror || showerror){
		        	alert("Error: "+err);
		        }else{
		        	return false;
		        }
		    });
 	}
 	/** 
 	 * comment
 	 * @param {String}
 	 * @param {Function}
 	 * */
 	html(url, callback) {
 		url = this.buildUrl(url);
 		fetch(url, { headers: { "Content-Type": "text/html; charset=utf-8" }})
 			.then(res => res.text()) 
		    .then(response => {
		        callback(response);
		    })
		    .catch(err => {
		        alert("Error: "+err)
		    });
 	}
 	/** 
 	 * comment
 	 * @param {String}
 	 * @param {Function}
 	 * */
 	text(url, callback) {
 		url = this.buildUrl(url);
 		fetch(url, { headers: { "Content-Type": "text/plain; charset=utf-8" }})
 			.then(res => res.text()) 
		    .then(response => {
		        callback(response);
		    })
		    .catch(err => {
		        alert("Error: "+err)
		    });
 	}
 	/** 
 	 * comment
 	 * */
 	 buildUrl(url, callback) {
 	 	
 	 	url = this.baseurl+url;

 	 	if(DEBUGGING)
 	 		url += '?v=10'+Math.random() * 1000;

 	 	return url;
 	 }
 }