class AppController {

	constructor() {
		this._apps = document.querySelectorAll(".apps");
		this._appTitulo = document.querySelector("#titulo-app");
	}

	change(id){
		this._apps.forEach(app => {
			if(app.id == id){
				app.classList.remove('hidden');
				this._appTitulo.textContent = app.id.replace('-',' ');

			}else{
				app.classList.add('hidden');
			}
		});
	}
}
