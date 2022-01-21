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


function pickbytitolo(x,text){
	const nomi= new Array();
	const s= new Array();
	for(var i=0;i<x.length;i++){
		//se il titolo della nota ha il testo della searchbar e non è cestinato
		if(x[i].titolo.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&!x[i].cestinato){
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
		if(x[i].quaderno.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&!x[i].cestinato){
			nomi.push(x[i].quaderno.toLocaleLowerCase());
			s.push(x[i]);
		}
	}
	return s;
}

function pickbyautore(x,text){
	const nomi= new Array();
	const s= new Array();
	for(var i=0;i<x.length;i++){
		//se il titolo della nota ha il testo della searchbar e non è cestinato
		if(x[i].creato_da.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&!x[i].cestinato){
			nomi.push(x[i].creato_da.toLocaleLowerCase());
			s.push(x[i]);
		}
	}
	return s;
}
//Home
function creablocchinoterecenti(s){
	//massimo 4, scarta i cestinati, ed evita i doppioni
	let x=pick4different(s);
	//rimuovo gli esistenti
	var e = document.getElementById("nr-sel");
    var child = e.lastElementChild; 
    while (child) {
    	e.removeChild(child);
        child = e.lastElementChild;
    }
	//creo i nuovi cercati
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
	autoheight();
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

function enlighttext(b,wt,text){
	if(b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase())!==-1){
		let arr=new Array();
		let string1="";
		//token
		for(var h=0;h<text.length;h++){
			string1+="§";
		}
		let tmp;
		if (b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) != -1){
			tmp=wt.substring(b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()),b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase())+text.length);
		}
		while (b.indexOf(tmp) != -1) {
			arr.push(tmp);
			b = b.replace(tmp,string1);
			if (b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) != -1){
				tmp=wt.substring(b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()),b.toLocaleLowerCase().indexOf(text.toLocaleLowerCase())+text.length);
			}
		}
  		while (b.indexOf(string1) != -1) {
    		b = b.replace(string1, '<span style="color:red;">' + arr[0] + '</span>');
			arr.shift();
  		}
	}
	return b;
}

function notericerca(y,text,id_){
	for(let i=0;i<y.length;i++){
		var container= document.createElement("div");
		container.classList.add("container");
		container.setAttribute("id",y[i].id);
			//nota
			var container1= document.createElement("div");
			container1.classList.add("container1");
				//titolo quaderno
				var tit=document.createElement("h4");
				tit.classList.add("quaderno-titolo");
				tit.classList.add("nunito");
				tit.classList.add("elem");	
				let wt=y[i].titolo;
				let b=y[i].titolo;			
				$(tit).html(enlighttext(b,wt,text));
				container1.appendChild(tit);
				//titolo nota			
				var quad=document.createElement("h5");
				quad.classList.add("nota-titoloquaderno");
				quad.classList.add("nunito");
				quad.classList.add("elem");	
				quad.setAttribute("style","color: grey;");
				wt=y[i].quaderno;
				b=y[i].quaderno;			
				$(quad).html(enlighttext(b,wt,text));
				container1.appendChild(quad);
				//autore
				if(id_=="nps65"){
					var creatoda=document.createElement("h5");
					creatoda.classList.add("nota-autore");
					creatoda.classList.add("nunito");
					creatoda.classList.add("elem");	
					creatoda.setAttribute("style","color: grey;");
					wt=y[i].creato_da;
					b=y[i].creato_da;			
					$(creatoda).html("Pubblicato da "+enlighttext(b,wt,text));
					container1.appendChild(creatoda);
				}
				//immagine menu
				var img=document.createElement("ion-icon");
				img.classList.add("opt-mt1");
				img.classList.add("opt-mt");
				if(id_=="nps65"){
					img.setAttribute("id","so"+i);
				}
				else{
					img.setAttribute("id","s"+i);
					
				}
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
					if(id_=="nps65"){
						list.classList.add("listbar-nso");	
						list.setAttribute("id","droplist-nso"+i);
					}
					else{
						list.classList.add("listbar-ns");	
						list.setAttribute("id","droplist-ns"+i);						
					}
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
						PDF.textContent="Esporta in PDF";
						list.appendChild(PDF);
						var elim= document.createElement("li");	
						elim.classList.add("elimina");	
						elim.textContent="Elimina";
						list.appendChild(elim);
				listcontainer.appendChild(list);
			container.appendChild(listcontainer);
			document.getElementById(id_).appendChild(container);
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
		let y=pickbytitoloquaderno(x,text);
		
		//rimuovo i cloni facendo un merge
		for(let i=0;i<z.length;i++){
	 		if(y.indexOf(z[i]) == -1){
	   	 		y.push(z[i]);
			}
		}
		if(t=="Online"){
			let s=pickbyautore(x,text);
			for(let i=0;i<s.length;i++){
 				if(y.indexOf(s[i]) == -1){
   	 				y.push(s[i]);
				}
			}
		}
	
		//creo le note personali
		if(t=="Personali"){
			notericerca(y,text,"nps27");
		}
		//creo le note online
		else{
			notericerca(y,text,"nps65");
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

///// Library Page
function quaderniLib(quaderni,note){
	for(let i=0;i<quaderni.length;i++){
		if(!quaderni[i].cestinato){
			//container
			var container= document.createElement("div");
			container.classList.add("container-blocchi");
			//parte quaderno	
			var quaderno= document.createElement("div");
			quaderno.classList.add("quaderno");
				var titoloQ= document.createElement("p");
				titoloQ.classList.add("nunito");
				titoloQ.textContent=quaderni[i].titolo;
				quaderno.appendChild(titoloQ);
				var tendina= document.createElement("ion-icon");
				tendina.classList.add("qs-tendina");
				tendina.setAttribute("name","chevron-forward-outline")
				quaderno.appendChild(tendina);
				var contN= document.createElement("p");
				contN.classList.add("conteggio-note");
				contN.classList.add("riferimenti");
				contN.classList.add("nunito");
				quaderno.appendChild(contN);
				var options= document.createElement("ion-icon");
				options.classList.add("opt-mt");
				options.classList.add("opt-mtsq");
				options.setAttribute("id","s"+i);
				options.setAttribute("name","ellipsis-horizontal-outline");
				quaderno.appendChild(options);
				//Droplist
				var dropdown= document.createElement("div");
				dropdown.classList.add("dropdown");
					var list= document.createElement("ul");
					list.classList.add("listbar-ns");
					list.classList.add("list");
					list.setAttribute("id","droplist-ns"+i);
						//elementi in lista
						var PDF= document.createElement("li");	
						PDF.classList.add("esporta");	
						PDF.textContent="Esporta in PDF";
						list.appendChild(PDF);
						var elim= document.createElement("li");	
						elim.classList.add("elimina");	
						elim.textContent="Elimina";
						list.appendChild(elim);
				dropdown.appendChild(list);
				quaderno.appendChild(dropdown);
			var c=0;
			//creo quaderno container
			for(let j=0;j<note.length;j++){
				if(note[j].titolo==quaderni[i].titolo){
					c++;
					//creo note container e le aggiungo al quaderno container corrente
				
				}
			}
			contN.textContent="( "+c+" note )";
			container.appendChild(quaderno);
		}
	}
}





function getNoteLib(quaderni){
	var xhttp = new XMLHttpRequest();
  	
	xhttp.open("GET","/getNotePersonali", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var note=JSON.parse([this.response]);
			quaderniLib(quaderni,note);			
 		}
	};
}

function quaderniLibreria(){
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET","/getQuaderniPersonali", true);
 	xhttp.send();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			var quaderni=JSON.parse([this.response]);
			getNoteLib(quaderni);
   		 }
  	};
}