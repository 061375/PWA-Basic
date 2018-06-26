/** 
 * Application
 * /_/js/_application.js
 * @author Jeremy Heminger <contact@jeremyheminger.com>
 * @version 1.0.0
 *
 * This program siulates a scenario where the PWA would not be able to communicate with the server
 * For this reason there is no actual server-side code.
 * The program looks for the server but doesn't find it and so falls back to the local
 *
 * getInstall
 * getApp
 * setSubmit
 * setSubmitUnsent
 * buildInstall
 * buildApp
 * buildRemoveInstall
 * Install
 * UnInstall
 *
 * */
 class Application {

 	
 	/** 
 	 * 
 	 * */
 	 constructor() {
 	 	// check if there is any content that needs to be sent to the server
 	 	this.setSubmitUnsent();	
 	 }

 	 // ----- GETTERS

		/** 
		* comment
		* */
		getInstall() {
			let $this = this;
			db.get('installtemplate',function(data) {
				if(null === data) {
				  	// program has not yet been installed
				// so get and display install screen
				ajax.html('/_/templates/install.html',function(data) {
					templates['install'] = data;
					db.set('installtemplate',data,function(result){
						$this.buildInstall(data);
					});
				});
			}else{
				templates['install'] = data;
				$this.buildInstall(data);
			}
			});
		}
		/** 
		* comment
		* */
		getApp() {
			let $this = this;
			// the template can be stored locally
			db.get('apptemplate',function(data) {
				// 
				if(null === data) {
				   	// program has not yet been installed
					// so get and display install screen
					ajax.html('/_/templates/app.html',function(data) {
						templates['app'] = data;
						db.set('apptemplate',data,function(result){
							$this.buildApp(data);
						});
					});
				}else{
					templates['app'] = data;
					$this.buildApp(data);
				}
			});
		}


	// ----- SETTERS

		/** 
		 * comment
		 * @param {Event}
		 * */
		 setSubmit(e) {
		 	// get the updated information
		 	let fn = document.getElementById('firstname').value;
		 	let ln = document.getElementById('lastname').value;
		 	// check if there is a connection
		 	if(!ajax.json('/src/ajax/update.php',{fn:fn,ln:ln},function(){
		 		db.set('needsupload',false);
		 	},false)) {
		 		// no connection so save local
		 		db.set('needsupload',true);
		 		db.set('fn',fn);
		 		db.set('ln',ln);
		 	}
		 	document.getElementById('showfirst').innerHTML = 'First Name: '+fn;
			document.getElementById('showlast').innerHTML = 'Last Name: '+ln;
			document.getElementById('names').setAttribute('class','');
			document.getElementById('firstname').value = ''
			document.getElementById('lastname').value = '';
		 }
		 /** 
		  * if there is any content that is in queue to be sent to the server and there is a connection
		  * then send it
		  * */
		  setSubmitUnsent() {
		  	db.get('needsupload',function(data){
		  		if(data) {
		  			// @var {Object}
		  			let payload = {fn:'',ln:''};
		  			// get the fn and ln data 
		      		db.get('fn',function(data){
		      			payload.fn = data;
		      			db.get('ln',function(data){
		      				payload.ln = data;
			 	      		ajax.json('/src/ajax/update.php',payload,function(){
			 	      			// if the data can be uploded then 
			 	      			// the code will get this far
			 	      			db.set('needsupload',false);
			 	      		},false);
			 	      	});
		      		});
		      	}
		  	});
 		}

	// ----- BUILDERS

		/** 
		* comment
		* @param {String}
		* */
		buildInstall(data) {
			let $this = this;
			document.getElementById('content').innerHTML = data;
			document.getElementById('install').addEventListener('click',function(){$this.Install();});
		}
		/** 
		* comment
		* @param {String}
		* */
		buildApp(data) {
			let $this = this;
			document.getElementById('content').innerHTML = data;
			document.getElementById('uninstall').addEventListener('click',function(){$this.UnInstall();});
			document.getElementById('submit').addEventListener('click',function(){$this.setSubmit();});
			var fn, ln;
			db.get('fn',function(data){
				fn = data;
				db.get('ln',function(data){
					ln = data;
					if((undefined !== fn || undefined !== fn) && (null !== fn || null !== fn))
						document.getElementById('names').setAttribute('class','');
					document.getElementById('showfirst').innerHTML = 'First Name: '+fn;
					document.getElementById('showlast').innerHTML = 'Last Name: '+ln;
				});
			});
		}
		/** 
		* comment
		* @param {Function}
		* */
		buildRemoveInstall(callback) {
			document.getElementById('content').innerHTML = '';
			callback();
		}


	// ----- INSTALL  / UNINSTALL

		/** 
		* comment
		* @param {Event}
		* */
		Install(e) {
			var $this = this;
			db.set('needsupload',false);
		  	db.set('installed',true,function(result){
		  		if(result) {
		  			$this.buildRemoveInstall(function(){$this.getApp();});
		  		}
		  	});
		}
		/** 
		* comment
		* @param {Event}
		* */
		UnInstall(e) {
			var $this = this;
			localforage.clear().then(function() {
			    // Run this code once the database has been entirely deleted.
			    console.log('Database is now empty.');
			    $this.buildRemoveInstall(function(){
			    	$this.getInstall();
				});
			}).catch(function(err) {
			    // This code runs if there were any errors
			    console.log(err);
			});
		}
 	}