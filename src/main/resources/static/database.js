//Query

function addquaderno() {		
	let id=document.getElementById("libadd").value;	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/creaQuaderno?titolo="+id+"&pubblico="+true, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			quaderniLibreria();
		}
	};
}

function restoreQ(id) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/ripristinaQuaderno?titolo="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			quaderniCestino();
		}
	};
}

function restoreN(id) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/ripristinaNota?id="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			quaderniCestino();
		}
	};
}

function removeQ(id) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/deleteQuaderno?titolo="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			quaderniCestino();
		}
	};
}

function removeN(id) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/deleteNota?id="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			quaderniCestino();
		}
	};
}

function deletenota(id,t) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/spostaNelCestinoNota?id="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			if(t==0){
				noterecenti();
 			}
			if(t==1){
				cercalenote(document.querySelector('input[name="cerca_input"]').value);
			}
			if(t==2){
				quaderniLibreria();
			}
			if(t==4){
				getNoteByNote();
			}
		}
	};
}

function deleteQ(id,t) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/spostaNelCestinoQuaderno?titolo="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			if(t==3){
				quaderniLibreria();
 			}
			if(t==4){
				quaderniCestino();
			}
 		}
	};
}

function changevis(id,t) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/changeVisibility?id="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			if(t==0){
				noterecenti();
 			}
			if(t==1){
				if(!document.querySelector('input[name="cerca_input"]').val===""){
					cercalenote(document.querySelector('input[name="cerca_input"]').value);
				}			
				else{
					cercalenote(document.querySelector('input[name="cerca_input_mobile"]').value);
				}
			}
			if(t==2){
				quaderniLibreria();
			}
			if(t==4){
				getNoteByNote();
			}
 		}
	};
}

function changevisQ(id,t) {	
    var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/changeVisibilityQ?titolo="+id, true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			if(t==3){
				quaderniLibreria();
 			}
 		}
	};
}

//picks
function pick4different(x){
	const s= new Array();
	for(var i=x.length-1;i>=0;i--){
		if(!x[i].cestinato){
			s.push(x[i]);
		}
		if(s.length>3){
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
		if(x[i].quaderno!==null&&x[i].quaderno.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1&&!x[i].cestinato){
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
		blocco.setAttribute("id",x[i].id);
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
				if(x[i].quaderno==null){
					titoloquaderno.textContent=" ";
				}
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
				nota.appendChild(icona);
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
	if(b==null){
		return b;
	}
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
					img.classList.add("opt-mt2");	
				}
				else{
					img.setAttribute("id","s"+i);
				}
				img.setAttribute("name","ellipsis-horizontal-outline");
			container1.appendChild(img);
		container.appendChild(container1);
			//contenuto
			var ifr = document.createElement('iframe');
			ifr.setAttribute("id","nota"+y[i].id);
			var data = y[i].contenuto;
			decode(ifr,data);
			container.appendChild(ifr);
				//lista
				var listcontainer= document.createElement("div");
				listcontainer.classList.add("dropdown");	
					var list= document.createElement("ul");
					list.classList.add("list");
					if(id_=="nps65"){
						list.classList.add("listbar-nso");	
						list.classList.add("listbar-sot");	
						list.setAttribute("id","droplist-nso"+i);
					}
					else{
						list.classList.add("listbar-ns");	
						list.setAttribute("id","droplist-ns"+i);						
					}
						if(id_=="nps65"){
							var contatta= document.createElement("li");	
							contatta.classList.add("contatta");	
							contatta.textContent="Contatta";
							list.appendChild(contatta);
							var copia= document.createElement("li");	
							copia.classList.add("copy");
							copia.textContent="Crea una copia";
							list.appendChild(copia);
						}
						else{
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
						}
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
		console.log(y);
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
	//elimino esistenti
	var e = document.getElementById("q35");
    var child = e.lastElementChild; 
    while (child) {
    	e.removeChild(child);
        child = e.lastElementChild;
    }
	//creo
	for(let i=0;i<quaderni.length;i++){
		if(!quaderni[i].cestinato){
			//container
			var container= document.createElement("div");
			container.classList.add("container-blocchi");
			container.setAttribute("id",quaderni[i].titolo);
			//parte quaderno	
			var quaderno= document.createElement("div");
			quaderno.classList.add("quaderno");
				var titoloQ= document.createElement("p");
				titoloQ.classList.add("nunito");	
				titoloQ.classList.add("titoloQ");
				titoloQ.textContent=quaderni[i].titolo;
				quaderno.appendChild(titoloQ);
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
						list.classList.add("listbar-nl");
					list.classList.add("list");
					list.setAttribute("id","droplist-ns"+i);
						//elementi in lista
						var PDF= document.createElement("li");	
						PDF.classList.add("visibility-q");	
						PDF.textContent="Rendi Pubblico";
						if(quaderni[i].pubblico){
							PDF.textContent="Rendi Privato";
						}
						list.appendChild(PDF);
						var elim= document.createElement("li");	
						elim.classList.add("elimina-q");	
						elim.textContent="Elimina";
						list.appendChild(elim);
				dropdown.appendChild(list);
				quaderno.appendChild(dropdown);
			var c=0;	
			let boolean=false;		
			for(let j=0;j<note.length;j++){
				var noteN;
				if(j==0){
					//container note
					noteN= document.createElement("div");
					noteN.classList.add("menu-aperti2");
					noteN.classList.add("note");
					noteN.setAttribute("id","nl"+i);
				}
				if(note[j].quaderno==quaderni[i].titolo&&!note[j].cestinato){
					boolean=true;
					c++;
					//creo note container e le aggiungo al quaderno container corrente
					var containerblocchi= document.createElement("div");
					containerblocchi.classList.add("container-blocchi");
					containerblocchi.setAttribute("id",note[j].id);
						var nota= document.createElement("div");
						nota.classList.add("nota");
						nota.setAttribute("id","nl"+j);
							var toflex=document.createElement("div");
							toflex.classList.add("toflex");
								var titoloN= document.createElement("p");
								titoloN.classList.add("ns-tendina");
								titoloN.classList.add("nunito");
								titoloN.textContent=note[j].titolo;
								toflex.appendChild(titoloN);
								var optionsN= document.createElement("ion-icon");
								optionsN.classList.add("opt-mt");
								optionsN.classList.add("opt-nota");
								optionsN.setAttribute("id","l"+j);
								optionsN.setAttribute("name","ellipsis-horizontal-outline");
								toflex.appendChild(optionsN);
							nota.appendChild(toflex);
								//Contenuto
								var ifr = document.createElement('iframe');
								ifr.setAttribute("id","nota"+note[j].id);
								var data = note[j].contenuto;
								decode(ifr,data);
								nota.appendChild(ifr);
								//Droplist
								var dropdownN= document.createElement("div");
								dropdownN.classList.add("dropdown");
								dropdownN.classList.add("dropdown1");
									var listN= document.createElement("ul");
									listN.classList.add("listbar-ns");
									listN.classList.add("list");
									listN.setAttribute("id","droplist-nl"+j);
										//elementi in lista
										var spostaN= document.createElement("li");	
										spostaN.classList.add("sposta");	
										spostaN.textContent="Sposta in..";
										listN.appendChild(spostaN);
										var vis= document.createElement("li");	
										vis.classList.add("visibility-l");
										vis.textContent="Rendi pubblica";
										if(note[j].pubblico){	
											vis.textContent="Rendi privata";
										}
										listN.appendChild(vis);
										var PDFN= document.createElement("li");	
										PDFN.classList.add("esporta");	
										PDFN.textContent="Esporta in PDF";
										listN.appendChild(PDFN);
										var elimN= document.createElement("li");	
										elimN.classList.add("elimina-l");	
										elimN.textContent="Elimina";
										listN.appendChild(elimN);
								dropdownN.appendChild(listN);
						containerblocchi.appendChild(dropdownN);
						containerblocchi.appendChild(nota);	
					noteN.appendChild(containerblocchi);
				}
				if(j==note.length-1&&noteN!=null&&c>0){
					container.appendChild(quaderno);
					container.appendChild(noteN);
					contN.textContent="( "+c+" note )";
					document.getElementById("q35").appendChild(container);
				}
			}
			if(!boolean){
				contN.textContent="( "+c+" note )";
				container.appendChild(quaderno);
				document.getElementById("q35").appendChild(container);

			}
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

///// Trash Page
function sezioneTrash(quaderni,note){
	//elimino esistenti
	var e = document.getElementById("q35");
    var child = e.lastElementChild; 
    while (child) {
    	e.removeChild(child);
        child = e.lastElementChild;
    }
	//creo
	//note che hanno un quaderno cestinato
	for(let i=0;i<quaderni.length;i++){
		if(quaderni[i].cestinato){
			//container
			var container= document.createElement("div");
			container.classList.add("container-blocchi");
			container.setAttribute("id",quaderni[i].titolo);
			//parte quaderno	
			var quaderno= document.createElement("div");
			quaderno.classList.add("quaderno");
				var titoloQ= document.createElement("p");
				titoloQ.classList.add("nunito");	
				titoloQ.classList.add("titoloQ");
				titoloQ.textContent=quaderni[i].titolo;
				quaderno.appendChild(titoloQ);
				var contN= document.createElement("p");
				contN.classList.add("conteggio-note");
				contN.classList.add("riferimenti");
				contN.classList.add("nunito");
				quaderno.appendChild(contN);
				var restoreQ = new Image();
            	restoreQ.src = "icon/restore_from_trash_black_24dp.png";
				restoreQ.classList.add("restore-quaderno");
				quaderno.appendChild(restoreQ);
      			var removeQ = new Image();
            	removeQ.src = "icon/delete_forever_black_24dp.png";
				removeQ.classList.add("delete-quaderno");
				quaderno.appendChild(removeQ);
				var c=0;
			for(let j=0;j<note.length;j++){
				var noteN;
				if(j==0){
					//container note
					noteN= document.createElement("div");
					noteN.classList.add("menu-aperti2");
					noteN.classList.add("note");
				}
				if(note[j].quaderno==quaderni[i].titolo&&note[j].cestinato){
					c++;
					//creo note container e le aggiungo al quaderno container corrente
					var containerblocchi= document.createElement("div");
					containerblocchi.classList.add("container-blocchi");
					containerblocchi.setAttribute("id",note[j].id);
						var nota= document.createElement("div");
						nota.classList.add("nota");
							var toflex=document.createElement("div");
							toflex.classList.add("toflex");
								var titoloN= document.createElement("p");
								titoloN.classList.add("ns-tendina");
								titoloN.classList.add("nunito");
								titoloN.textContent=note[j].titolo;
								toflex.appendChild(titoloN);
								var restoreN = new Image();
				            	restoreN.src = "icon/restore_from_trash_black_24dp.png";
								restoreN.classList.add("restore-nota");
								toflex.appendChild(restoreN);
				      			var removeN = new Image();
				            	removeN.src = "icon/delete_forever_black_24dp.png";
								removeN.classList.add("delete-nota");
								toflex.appendChild(removeN);
							nota.appendChild(toflex);
							//Contenuto
							var ifr = document.createElement('iframe');
							ifr.setAttribute("id","nota"+note[j].id);
							var data = note[j].contenuto;
							decode(ifr,data);
							
							nota.appendChild(ifr);			
						containerblocchi.appendChild(nota);	
					noteN.appendChild(containerblocchi);
				}
				if(j==note.length-1&&noteN!=null&&c>0){
					container.appendChild(quaderno);
					container.appendChild(noteN);
					contN.textContent="( "+c+" note )";
					document.getElementById("q35").appendChild(container);
				}
			}
		}
	}
	
	//quaderni cestinati senza note 
	for(let i=0;i<quaderni.length;i++){
		let entra=false;
		if(quaderni[i].cestinato){
			for(let j=0;j<note.length;j++){
				if(note[j].quaderno==quaderni[i].titolo&&note[j].cestinato){
					entra=true;
				}
			}
			if(!entra){
				//container
				var container= document.createElement("div");
				container.classList.add("container-blocchi");
				container.setAttribute("id",quaderni[i].titolo);
				//parte quaderno	
				var quaderno= document.createElement("div");
				quaderno.classList.add("quaderno");
					var titoloQ= document.createElement("p");
					titoloQ.classList.add("nunito");	
					titoloQ.classList.add("titoloQ");
					titoloQ.textContent=quaderni[i].titolo;
					quaderno.appendChild(titoloQ);
					var contN= document.createElement("p");
					contN.classList.add("conteggio-note");
					contN.classList.add("riferimenti");
					contN.classList.add("nunito");
					quaderno.appendChild(contN);
					var restoreQ = new Image();
	            	restoreQ.src = "icon/restore_from_trash_black_24dp.png";
					restoreQ.classList.add("restore-quaderno");
					quaderno.appendChild(restoreQ);
	      			var removeQ = new Image();
	            	removeQ.src = "icon/delete_forever_black_24dp.png";
					removeQ.classList.add("delete-quaderno");
					quaderno.appendChild(removeQ);
				container.appendChild(quaderno);
			document.getElementById("q35").appendChild(container);
			}
		}
	}
	var entra1=false;
	//note singole cestinate con quaderno non cestinato
	for(let j=0;j<note.length;j++){
		if(j==0){
			var noteN;
			//container note
			noteN= document.createElement("div");
			noteN.classList.add("menu-aperti2");
			noteN.classList.add("note");
		}
		for(let i=0;i<quaderni.length;i++){
			if(note[j].cestinato&&note[j].quaderno==quaderni[i].titolo&&!quaderni[i].cestinato){
				entra1=true;
				//creo note container e le aggiungo al quaderno container corrente
				var containerblocchi= document.createElement("div");
				containerblocchi.classList.add("container-blocchi");
				containerblocchi.setAttribute("id",note[j].id);
					var nota= document.createElement("div");
						nota.classList.add("nota");
							var toflex=document.createElement("div");
							toflex.classList.add("toflex");
								var titoloN= document.createElement("p");
								titoloN.classList.add("ns-tendina");
								titoloN.classList.add("nunito");
								titoloN.textContent=note[j].titolo;
								toflex.appendChild(titoloN);
								var restoreN = new Image();
				            	restoreN.src = "icon/restore_from_trash_black_24dp.png";
								restoreN.classList.add("restore-nota");
								toflex.appendChild(restoreN);
				      			var removeN = new Image();
				            	removeN.src = "icon/delete_forever_black_24dp.png";
								removeN.classList.add("delete-nota");
								toflex.appendChild(removeN);
							nota.appendChild(toflex);
							//Contenuto
							var ifr = document.createElement('iframe');
							ifr.setAttribute("id","nota"+note[j].id);
							var data = y[i].contenuto;
							decode(ifr,data);
				
							nota.appendChild(ifr);
					containerblocchi.appendChild(nota);	
				noteN.appendChild(containerblocchi);
			}
		}
		if(j==note.length-1&&entra1){
			document.getElementById("q35").appendChild(noteN);
		}
	}
	//note singole senza quaderno
	var entra2=false;
	for(let j=0;j<note.length;j++){
		if(j==0){
			var noteN;
			//container note
			noteN= document.createElement("div");
			noteN.classList.add("menu-aperti2");
			noteN.classList.add("note");
		}
		if(note[j].cestinato&&(note[j].quaderno==null||note[j].quaderno==""||note[j].quaderno==undefined)){
			entra2=true;
			//creo note container e le aggiungo al quaderno container corrente
			var containerblocchi= document.createElement("div");
			containerblocchi.classList.add("container-blocchi");
			containerblocchi.setAttribute("id",note[j].id);
				var nota= document.createElement("div");
					nota.classList.add("nota");
						var toflex=document.createElement("div");
						toflex.classList.add("toflex");
							var titoloN= document.createElement("p");
							titoloN.classList.add("ns-tendina");
							titoloN.classList.add("nunito");
							titoloN.textContent=note[j].titolo;
							toflex.appendChild(titoloN);
							var restoreN = new Image();
			            	restoreN.src = "icon/restore_from_trash_black_24dp.png";
							restoreN.classList.add("restore-nota");
							toflex.appendChild(restoreN);
			      			var removeN = new Image();
			            	removeN.src = "icon/delete_forever_black_24dp.png";
							removeN.classList.add("delete-nota");
							toflex.appendChild(removeN);
						nota.appendChild(toflex);
						//contenuto
						var ifr = document.createElement('iframe');
						ifr.setAttribute("id","nota"+note[j].id);
						var data = note[j].contenuto;
						decode(ifr,data);
				
						nota.appendChild(ifr);
					containerblocchi.appendChild(nota);	
				noteN.appendChild(containerblocchi);
		}
		if(j==note.length-1&&entra2){
			document.getElementById("q35").appendChild(noteN);
		}
	}
	
}
function getNoteCest(quaderni){
	var xhttp = new XMLHttpRequest();
  	
	xhttp.open("GET","/getNotePersonali", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var note=JSON.parse([this.response]);
			sezioneTrash(quaderni,note);			
 		}
	};
}

function quaderniCestino(){
	var xhttp = new XMLHttpRequest();

	xhttp.open("GET","/getQuaderniPersonali", true);
 	xhttp.send();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			var quaderni=JSON.parse([this.response]);
			getNoteCest(quaderni);
   		 }
  	};
}

//Note page
function quaderniNote(y){
	//elimino esistenti
	var e = document.getElementById("q35");
    var child = e.lastElementChild; 
    while (child) {
    	e.removeChild(child);
        child = e.lastElementChild;
    }

	for(let i=0;i<y.length;i++){
		if(!y[i].cestinato){
			var container= document.createElement("div");
			container.classList.add("container");
			container.setAttribute("id",y[i].id);
			container.setAttribute("style", "margin-bottom: 40px; overflow-x: auto;");
				//nota
				var container1= document.createElement("div");
				container1.classList.add("container1");
					//titolo quaderno
					var tit=document.createElement("h4");
					tit.classList.add("quaderno-titolo");
					tit.classList.add("nunito");
					tit.classList.add("elem");	
					tit.textContent=y[i].titolo;			
					container1.appendChild(tit);
					//titolo nota			
					var quad=document.createElement("h5");
					quad.classList.add("nota-titoloquaderno");
					quad.classList.add("nunito");
					quad.classList.add("elem");	
					quad.setAttribute("style","color: grey;");
					quad.textContent=y[i].quaderno;	
					container1.appendChild(quad);
					//immagine menu
					var img=document.createElement("ion-icon");
					img.classList.add("opt-mt1");
					img.classList.add("opt-mt");
					img.setAttribute("id","s"+i);
					img.setAttribute("name","ellipsis-horizontal-outline");
				container1.appendChild(img);
			container.appendChild(container1);
				//contenuto
				var ifr = document.createElement('iframe');
				ifr.setAttribute("id","nota"+y[i].id);
				var data = y[i].contenuto;
				decode(ifr,data);
				
			container.appendChild(ifr);	
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
						vis.classList.add("visibility-n1");
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
						elim.classList.add("elimina-n1");	
						elim.textContent="Elimina";
						list.appendChild(elim);
				listcontainer.appendChild(list);
			container.appendChild(listcontainer);
			document.getElementById("q35").appendChild(container);
		}
	}
}

function getNoteByNote(){
	var xhttp = new XMLHttpRequest();
  	
	xhttp.open("GET","/getNotePersonali", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var note=JSON.parse([this.response]);
			quaderniNote(note);
 		}
	};
}

function getDatiUtente(){
	var xhttp = new XMLHttpRequest();
  	
	xhttp.open("GET","/getDatiUtenti", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var utente=JSON.parse([this.response]);
			datiUtente(utente);
 		}
	};
}

function datiUtente(utente){
	document.getElementById("nome_utente_profilo").innerHTML = "<h1><b>Benvenuto " + utente.nome + "</b></h1>";
	var emailUtente = (utente.email).substring((utente.email).indexOf('@'), (utente.email).length);
	document.getElementById("email_utente").setAttribute("value", "*****"+emailUtente);
	document.getElementById("email_utente").setAttribute("placeholder", utente.email);
	document.getElementById("password_utente").setAttribute("value", utente.password);
}

function getNotePubblicate(){
	var xhttp = new XMLHttpRequest();
  	
	xhttp.open("GET","/getNotePubblicate", true);
	xhttp.send();
 	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var note=JSON.parse([this.response]);
			notePubblicate(note);
 		}
	};
}

function notePubblicate(y){
	//elimino esistenti
	var e = document.getElementById("note_pubblicate");
    var child = e.lastElementChild; 
    while (child) {
    	e.removeChild(child);
        child = e.lastElementChild;
    }

	for(let i=0;i<y.length;i++){
		if(!y[i].cestinato && y[i].pubblico){
			var container= document.createElement("div");
			container.classList.add("container");
			container.setAttribute("id",y[i].id);
			container.setAttribute("style", "margin-bottom: 40px; overflow-x: auto;");
				//nota
				var container1= document.createElement("div");
				container1.classList.add("container1");
					//titolo quaderno
					var tit=document.createElement("h4");
					tit.classList.add("quaderno-titolo");
					tit.classList.add("nunito");
					tit.classList.add("elem");	
					tit.textContent=y[i].titolo;			
					container1.appendChild(tit);
					//titolo nota			
					var quad=document.createElement("h5");
					quad.classList.add("nota-titoloquaderno");
					quad.classList.add("nunito");
					quad.classList.add("elem");	
					quad.setAttribute("style","color: grey;");
					quad.textContent=y[i].quaderno;	
					container1.appendChild(quad);
					//immagine menu
					var img=document.createElement("ion-icon");
					img.classList.add("opt-mt1");
					img.classList.add("opt-mt");
					img.setAttribute("id","s"+i);
					img.setAttribute("name","ellipsis-horizontal-outline");
				container1.appendChild(img);
			container.appendChild(container1);
				//contenuto
				var ifr = document.createElement('iframe');
				ifr.setAttribute("id","nota"+y[i].id);
				var data = y[i].contenuto;
				decode(ifr,data);
				
			container.appendChild(ifr);	
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
						vis.classList.add("visibility-n1");
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
						elim.classList.add("elimina-n1");	
						elim.textContent="Elimina";
						list.appendChild(elim);
				listcontainer.appendChild(list);
			container.appendChild(listcontainer);
			document.getElementById("note_pubblicate").appendChild(container);
		}
	}
}