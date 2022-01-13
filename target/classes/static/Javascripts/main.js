function generaPDF(titolo,testo){
	var doc = new jsPDF();
	doc.text(10, 10,testo);
	doc.save(titolo);
}

function esportaPDF(obj){
	if(obj.target.classList.contains("esportanota")){
		var x=document.getElementsByClassName("notaveloce-titolo");
		var y=document.getElementsByClassName("textarea-nv");
		generaPDF(x[0].value,y[0].value);
	}
}

function svuotanv(obj){
	if(obj.target.classList.contains("svuotanota")){
		var x=document.getElementsByClassName("textarea-nv");
		var y=document.getElementsByClassName("notaveloce-titolo");
		x[0].value="";
		y[0].value="";
	}	
}

function eliminanotarc(obj){
	if(obj.target.classList.contains("elimina")){
		obj.target.parentNode.parentNode.parentNode.remove();
	}	
}


function menulaterale(obj){
	if(obj.target.classList.contains("icon-menu")||obj.target.classList.contains("cross-menulaterale")){
		var y=document.getElementsByClassName("menulaterale");
		if(y[0].classList.contains("show")){
			y[0].classList.remove("show");
			y[0].style.visibility = 'hidden';
		}
		else{
			y[0].classList.toggle("show");
			y[0].style.visibility = 'visible';		
		}
	}
}

function optmenu(obj){
	var x=document.getElementsByClassName("list");
	
	//click esterno chiudi tutti
	if(!obj.target.classList.contains("opt-mt")&&!obj.target.classList.contains("list")){
		for(var i=0;i<x.length;i++){
			if(x[i].classList.contains("show")){
				x[i].classList.remove("show");
				x[i].style.visibility= "hidden";
			}
		}
	}
	else{	
		//l'utente ha cliccato un menu a tendina
		for(var i=0;i<x.length;i++){
			var l=document.getElementById("droplist-n"+obj.srcElement.id).id;
			let w=document.getElementById("droplist-n"+obj.srcElement.id);
  			if(x[i].id==l){
				//attiva
				if(!x[i].classList.contains("show")){
					document.getElementById("droplist-n"+obj.srcElement.id).classList.toggle("show");
					x[i].style.visibility= "visible";
				}
				//disattiva
				else {
					document.getElementById("droplist-n"+obj.srcElement.id).classList.remove("show");
					x[i].style.visibility= "hidden";
				}
			}
			else{
				//chiudi comunque gli altri aperti
				if(x[i].classList.contains("show")){
					x[i].classList.remove("show");
					x[i].style.visibility= "hidden";
				}
			}
		}
	}
}

function menuatendina(obj){
	//Sezione home
	if(obj.target.classList.contains("opt-nr-tendina")){
		var x= document.getElementsByClassName("note-recenti");
		//attiva
		if(!x[0].classList.contains("show")){
			x[0].style.visibility = 'visible';
			obj.target.setAttribute("name","chevron-forward-outline");
			x[0].classList.toggle("show");
		}
		//disattiva
		else {
			x[0].style.visibility = 'hidden';
			obj.target.setAttribute("name","chevron-down-outline");
			x[0].classList.remove("show");
		}
	}
	//Sezione search
	else if( obj.target.classList.contains("opt-nsoffline-tendina")||
	    obj.target.classList.contains("opt-nsonline-tendina")){
		if(obj.target.classList.contains("opt-nsoffline-tendina")){
			var x= document.getElementsByClassName("note-personali-container");
		}
		else if(obj.target.classList.contains("opt-nsonline-tendina")){
			var x= document.getElementsByClassName("note-online-container");
		}
		//attiva
		if(x[0].classList.contains("show")){
			x[0].style.visibility = 'visible';
			x[0].classList.remove("show");
			obj.target.setAttribute("name","chevron-down-outline");
		}
		//disattiva
		else {
			x[0].style.visibility = 'hidden';
			x[0].classList.toggle("show");
			obj.target.setAttribute("name","chevron-forward-outline");
			x[0].style.height= 0+"%";
		}
	}
	//Sezione library
	else if(obj.target.classList.contains("qs-tendina")){
		var x=document.getElementsByClassName("menu-aperti2");
		if(obj.target.getAttribute("name")=="chevron-forward-outline"){
			for(var i=0;i<x.length;i++){
				if(x[i].id==obj.target.id){
					x[i].style.visibility = 'hidden';
					x[i].classList.toggle("show");
					obj.target.setAttribute("name","chevron-down-outline");
					x[i].style.height= 0+"%";
				}
			}
		}
		else{
			for(var i=0;i<x.length;i++){
				if(x[i].id==obj.target.id){
					x[i].style.visibility = 'visible';
					x[i].classList.remove("show");
					obj.target.setAttribute("name","chevron-forward-outline");
					let w= document.getElementsByClassName("nota");
					let z=0;
					for(let j=0;j<w.length;j++){
						if(w[j].id==obj.target.id){
							z++;
						}
					}
					x[i].style.height= (25*z)+"%";
				}
			}
		}
	}
}

function resizeMenu(){
	var x=document.getElementsByClassName("menu-aperti");
	var t=0;
	for(var i=0;i<x.length;i++){
		if(x[i].classList.contains("show")){
			t++;
		}
	}
	t=2-t;
	var z;
	switch(t){
		case 1: z="70%";break;
		case 2: z="45%";break;
		default: z="0px";
	}
	for(var i=0;i<x.length;i++){
		if(!x[i].classList.contains("show")){
			x[i].style.height=z;
		}
	}
	
}

function newquaderno(obj){
	if(obj.target.classList.contains("container-new-quaderno")||
	   obj.target.classList.contains("new-quaderno")){
		document.getElementById("b-menu").style.visibility="visible";
	}
	else if(obj.target.classList.contains("layout-newquaderno")){
		document.getElementById("b-menu").style.visibility="hidden";
	}
}

function autoheight(){
	let w=document.getElementsByClassName("note-recenti");
	let z=document.getElementsByClassName("notaveloce-container2");
	let y=document.getElementsByClassName("notarecente-container");
	let x=document.getElementsByClassName("notaveloce-container");
	if(w.length>0){
		if(w[0].classList.contains("show")){
			if(y.length>0){
				x[0].style.height=465-(70*y.length)-(3-y.length)+"px";
				z[0].style.height=x[0].offsetHeight-80+"px";
			}
			else if(x.length>0){
				x[0].style.height="480px";
				z[0].style.height="400px";
			}
		}
		else{
			x[0].style.height="480px";
			z[0].style.height="400px";
		}
	}
}

function moveto(obj){
	if(obj.target.classList.contains("movetosearch")){
		window.location.href="Search.html";
	}
	if(obj.target.classList.contains("movetolibrary")){
		window.location.href="Library.html";
	}
	if(obj.target.classList.contains("movetotrash")){
		window.location.href="Trash.html";	
	}
}

function login(obj){
	if(obj.target.classList.contains("exit-button-p")){
		var x=document.getElementsByClassName("profilo-ml");;
		x[0].innerHTML="Accedi";
		x[0].classList.toggle("login");
		var y=document.getElementsByClassName("accedi-ml");
		y[0].style.bottom= "0px";
		var z=document.getElementsByClassName("bottom-container-exit");
		z[0].style.opacity= 0;
		
	}
	else if(obj.target.classList.contains("login")){
		obj.target.classList.remove("login");
		obj.target.innerHTML="Profilo";
		var y=document.getElementsByClassName("accedi-ml");
		y[0].style.bottom= "50px";
		var z=document.getElementsByClassName("bottom-container-exit");
		z[0].style.opacity= 1;
	}
}



window.onload = function(){
	if(document.location.pathname==="/"){
		noterecenti();
	}
}

window.onclick = function(obj){
	//tutte
	menulaterale(obj);
	
	//quasi tutte
	optmenu(obj);
	menuatendina(obj);
	
	//funzioni
	moveto(obj);
	newquaderno(obj);
	svuotanv(obj);
	eliminanotarc(obj);
	esportaPDF(obj);
	login(obj);
	
	
		
	//home
	autoheight();
	
	//search
	resizeMenu();
}


			
