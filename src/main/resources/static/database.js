function getNote(){
	var xhttp = new XMLHttpRequest();
  	
	xhttp.open("GET","/getNote", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var x=JSON.parse([this.response]);
			console.log(x[0].titolo+" entra");
			getQuaderni();
 		}
	};
}

function getQuaderni(){
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET","/getQuaderni", true);
 	xhttp.send();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			var x=JSON.parse([this.response]);
			console.log(x[0].titolo +" entra2");
			log();
   		 }
  	};
}

function pick4different(x){
	const nomi= new Array();
	const s= new Array();
	for(var i=x.length-1;i>=0;i--){
		if(!nomi.includes(x[i].titolo)&&!x[i].cestinato){
			nomi.push(x[i].titolo);
			s.push(x[i]);
		}
		if(nomi.length>3){
			break;
		}
	}
	return s;
}
//Home
function creablocchinoterecenti(s){
	//massimo 4, scarta i cestinati, ed evita i doppioni
	let x=pick4different(s);

	for(var i=0;i<x.length;i++){
		var blocco= document.createElement("div");
		blocco.classList.add("notarecente-container");
		//nota
			var nota= document.createElement("div");
			nota.classList.add("notarecente-container-attributi");
				var titolonota= document.createElement("h4");
				titolonota.classList.add("notarecente-titolo");
				titolonota.classList.add("nunito");	
				titolonota.textContent=x[i].titolo;
				nota.appendChild(titolonota);
				var titoloquaderno=document.createElement("h5");
				titoloquaderno.classList.add("notarecente-titoloquaderno");
				titoloquaderno.classList.add("nunito");
				titoloquaderno.textContent=x[i].quaderno;
				nota.appendChild(titoloquaderno);
				var data=document.createElement("h5");
				data.classList.add("notarecente-data");
				data.classList.add("nunito");
				data.textContent=x[i].ultima_modifica;
				nota.appendChild(data);	
			blocco.appendChild(nota);	
		//lista options
			var bloccolista= document.createElement("div");
			bloccolista.classList.add("dropdown");
				var icona= document.createElement("ion-icon");
				icona.classList.add("opt-mt");
				icona.classList.add("opt-mt-nr");
				icona.setAttribute("id","r"+i);
				icona.setAttribute("name","ellipsis-horizontal-outline");
				bloccolista.appendChild(icona);
				var lista= document.createElement("ul");
				lista.classList.add("list");
				lista.classList.add("listbar-nr");
				lista.setAttribute("id","droplist-nr"+i);
					var sposta= document.createElement("li");
					sposta.classList.add("sposta-nr");
					sposta.textContent="Sposta in..";
					lista.appendChild(sposta);
					var visib= document.createElement("li");
					visib.classList.add("visibility-nr");
					if(x[i].pubblico){
						visib.textContent="Rendi Privata";
					}
					else{
						visib.textContent="Rendi Pubblica";						
					}
					lista.appendChild(visib);
					var pdf= document.createElement("li");
					pdf.classList.add("pdf-nr");
					pdf.textContent="Esporta in PDF";					
					lista.appendChild(pdf);
					var elim= document.createElement("li");
					elim.classList.add("elimina-nr");
					elim.textContent="Elimina nota";
					lista.appendChild(elim);
			bloccolista.appendChild(lista)
		blocco.appendChild(bloccolista);
		
	var container= document.getElementsByClassName("note-recenti");
	container[0].appendChild(blocco);
	}
}

function noterecenti() {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("GET","/getNotePersonali", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var x=JSON.parse([this.response]);
			creablocchinoterecenti(x);
 		}
	};
}

/////Search page

function pickbytitolo(x,text){
	const nomi= new Array();
	const s= new Array();
	for(var i=0;i<x.length;i++){
		//se il titolo della nota ha il testo della searchbar e non è cestinato
		if(x[i].titolo.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&!nomi.includes(x[i].titolo.toLocaleLowerCase())&&!x[i].cestinato){
			nomi.push(x[i].titolo.toLocaleLowerCase());
			s.push(x[i]);
		}
	}
	return s;
}

function pickbytitoloquaderno(x,text){
	const nomi= new Array();
	const s= new Array();
	for(var i=0;i<x.length;i++){
		//se il titolo della nota ha il testo della searchbar e non è cestinato
		if(x[i].quaderno.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&
		  !nomi.includes(x[i].quaderno.toLocaleLowerCase())&&!x[i].cestinato){
			nomi.push(x[i].quaderno.toLocaleLowerCase());
			s.push(x[i]);
		}
	}
	return s;
}

function pickbycontenuto(x,text){
	const nomi= new Array();
	const s= new Array();
	for(var i=0;i<x.length;i++){
		//se il contenuto della nota ha il testo della searchbar e non è cestinato
		if(x[i].contenuto.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&
		  !nomi.includes(x[i].contenuto.toLocaleLowerCase())&&!x[i].cestinato){
			nomi.push(x[i].contenuto.toLocaleLowerCase());
			s.push(x[i]);
		}
	}
	return s;
}

function notepersonali(y){
	for(let i=0;i<y.length;i++){
		var container= document.createElement("div");
		container.classList.add("container");
			//nota
			var container1= document.createElement("div");
			container1.classList.add("container1");
				//titolo quaderno
				var quad=document.createElement("h4");
				quad.classList.add("quaderno-titolo");
				quad.classList.add("nunito");
				quad.classList.add("elem");	
				quad.textContent=y[i].quaderno;
				container1.appendChild(quad);
				//titolo nota			
				var nota=document.createElement("h5");
				nota.classList.add("nota-titoloquaderno");
				nota.classList.add("nunito");
				nota.classList.add("elem");	
				nota.setAttribute("style","color: grey;");
				nota.textContent=y[i].titolo;
				container1.appendChild(nota);
				//immagine menu
				var img=document.createElement("ion-icon");
				img.classList.add("opt-mt");	
				img.setAttribute("id","s"+i);
				img.setAttribute("name","ellipsis-horizontal-outline");
				container1.appendChild(img);
		container.appendChild(container1);
			//contenuto
			var cont= document.createElement("h5");
			cont.classList.add("nota-contenuto");
			cont.classList.add("nunito");
			cont.textContent=y[i].contenuto;
			container.appendChild(cont);

			//lista
			var listcontainer= document.createElement("div");
			listcontainer.classList.add("dropdown");	
				var list= document.createElement("ul");
				list.classList.add("list");		
				list.classList.add("listbar-ns");	
				list.setAttribute("id","droplist-ns"+i);
					var sposta= document.createElement("li");	
					sposta.classList.add("sposta");	
					sposta.textContent="Sposta in..";
					list.appendChild(sposta);
					var vis= document.createElement("li");	
					vis.classList.add("visibility");
					vis.textContent="Rendi pubblica";
					if(y[i].pubblico){	
						vis.textContent="Rendi privata";
					}
					list.appendChild(vis);
					var PDF= document.createElement("li");	
					PDF.classList.add("esporta");	
					PDF.textContent="Sposta in..";
					list.appendChild(PDF);
					var elim= document.createElement("li");	
					elim.classList.add("elimina");	
					elim.textContent="Sposta in..";
					list.appendChild(elim);
			listcontainer.appendChild(list);
		container.appendChild(listcontainer);
		document.getElementById("nps27").appendChild(container);
	}
}

function noteonline(y){
	for(let i=0;i<y.length;i++){
		var container= document.createElement("div");
		container.classList.add("container");
			//nota
			var container1= document.createElement("div");
			container1.classList.add("container1");
				//titolo quaderno
				var quad=document.createElement("h4");
				quad.classList.add("quaderno-titolo");
				quad.classList.add("nunito");
				quad.classList.add("elem");	
				quad.textContent=y[i].quaderno;
				container1.appendChild(quad);
				//titolo nota			
				var nota=document.createElement("h5");
				nota.classList.add("nota-titoloquaderno");
				nota.classList.add("nunito");
				nota.classList.add("elem");	
				nota.setAttribute("style","color: grey;");
				nota.textContent=y[i].titolo;
				container1.appendChild(nota);
				//autore
				var creatoda=document.createElement("h5");
				creatoda.classList.add("nota-autore");
				creatoda.classList.add("nunito");
				creatoda.classList.add("elem");	
				creatoda.setAttribute("style","color: grey;");
				creatoda.textContent="Pubblicato da "+y[i].creato_da;
				container1.appendChild(creatoda);
				//immagine menu
				var img=document.createElement("ion-icon");
				img.classList.add("opt-mt1");	
				img.setAttribute("id","so"+i);
				img.setAttribute("name","ellipsis-horizontal-outline");
			container1.appendChild(img);
		container.appendChild(container1);
			//contenuto
			var cont= document.createElement("h5");
			cont.classList.add("nota-contenuto");
			cont.classList.add("nunito");
			cont.textContent=y[i].contenuto;
			container.appendChild(cont);
				//lista
				var listcontainer= document.createElement("div");
				listcontainer.classList.add("dropdown");	
					var list= document.createElement("ul");
					list.classList.add("list");		
					list.classList.add("listbar-nso");	
					list.setAttribute("id","droplist-nso"+i);
						var sposta= document.createElement("li");	
						sposta.classList.add("sposta");	
						sposta.textContent="Sposta in..";
						list.appendChild(sposta);
						var vis= document.createElement("li");	
						vis.classList.add("visibility");
						vis.textContent="Rendi pubblica";
						if(y[i].pubblico){	
							vis.textContent="Rendi privata";
						}
						list.appendChild(vis);
						var PDF= document.createElement("li");	
						PDF.classList.add("esporta");	
						PDF.textContent="Sposta in..";
						list.appendChild(PDF);
						var elim= document.createElement("li");	
						elim.classList.add("elimina");	
						elim.textContent="Sposta in..";
						list.appendChild(elim);
				listcontainer.appendChild(list);
			container.appendChild(listcontainer);
			document.getElementById("nps65").appendChild(container);
	}
}

function nps(x,text,t){
	var assegnato=false;
	//rimuovo tutti i suoi child
	var e = document.getElementById("nps65");
	if(t=="Personali"){
		e = document.getElementById("nps27");
	}
	var child = e.lastElementChild; 
	while(child) {
    	e.removeChild(child);
    	child = e.lastElementChild;
    }

	if(text!=""){
		//selezione delle note
		let z=pickbytitolo(x,text);	
		let w=pickbytitoloquaderno(x,text);
		let y=pickbycontenuto(x,text);
		//rimuovo i cloni facendo un merge
		for(let i=0;i<z.length;i++){
	 		if(y.indexOf(z[i]) == -1){
	   	 		y.push(z[i]);
			}
		}
		for(let i=0;i<w.length;i++){
 			if(y.indexOf(w[i]) == -1){
   	 			y.push(w[i]);
			}
		}
		//rimuovo le stesse note con più pagine
		for(let i=0;i<y.length;i++){
			for(let j=0;j<y.length;j++){
				if(i!=j&&y[i].titolo==y[j].titolo&&y[i].quaderno==y[j].quaderno){
					y.splice(i,1);
				}
			}
		}
		
		//creo le note personali
		if(t=="Personali"){
			notepersonali(y);
		}
		//creo le note online
		else{
			noteonline(y);
		}
		document.getElementById("rif-"+t).textContent=" ( riferimenti "+y.length+" )";
		assegnato=true;
	}
	if(!assegnato){
		document.getElementById("rif-"+t).textContent=" ( riferimenti "+0+" )";
	}
}

function notesearch(text,t) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("GET","/getNote"+t, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var x=JSON.parse([this.response]);
			nps(x,text,t);
 		}
	};
}

function cercalenote(txt){
	if(txt!=null){
		//note e quaderni personali
		notesearch(txt,"Personali");
		//note e quaderni online
		notesearch(txt,"Online");
	}
}

