class AppController {

	constructor() {
		this._apps = document.querySelectorAll(".apps");
		console.log(this._apps);
	}

	change(id){
		this._apps.forEach(app => {
			if(app.id == id){
				app.classList.remove('hidden');
			}else{
				app.classList.add('hidden');
			}
		});
	}
}
