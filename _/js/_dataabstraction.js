/** 
 * dataAbstraction
 * /_/js/_dataabstraction.js
 * Basically just a wrapper between the application and Local Forager
 * @author Jeremy Heminger <contact@jeremyheminger.com>
 * @version 1.0.0
 *
 * 
 *
 * set
 * get
 *
 * */
 class dataAbstraction {
 	/** 
 	 * comment
 	 * */
 	 constructor() {

 	 }
 	 /** 
 	  * set
 	  * @param {String}
 	  * @param {Mixed}
 	  * @param {Function}
 	  * */
 	  set(_key,value,callback) {
 	  		localforage.setItem(_key, value).then(function (value) {
                if(typeof callback === 'function')
                	callback(value);
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
                if(typeof callback === 'function')
                	callback(false);
            });
 	  }
 	  /** 
 	   * get
 	   * @param {String}
 	  	* @param {Function}
 	   * */
 	   get(_key,callback) {
 	   		localforage.getItem(_key).then(function(value) {
 	   			if(typeof callback === 'function')
 	   				callback(value);
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
                if(typeof callback === 'function')
                	callback(false);
            });
 	   }
 }