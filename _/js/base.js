window.onload = function() {
	
	console.log('localforage is: ', localforage);

	document.getElementById('container').style.height = window.innerHeight+'px';

	ajax = new Ajax();
	db = new dataAbstraction();
	app = new Application();

	db.get('installed',function(data) {

		if(null === data) {
			app.getInstall();
		}else{
			app.getApp();
		}
	});
	
}