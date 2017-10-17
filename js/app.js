var juego = {
			init: function () {
				columna = this.iniciaTablero();
				this.asignaEvento(columna);
				
				
				
			}, // FIN INIT
			
			asignaEvento: function (columna) {
				for (i=0;i<columna.length;i++) {
					for (j=0;j<5;j++) {
						claseImagen = ".imagen-" + j;
						claseDiv = ".fil-" + j;
						
						columna[i].find(claseImagen).draggable({
						containment: ".panel-tablero",
						snap: ".imagen-0, .imagen-1, .imagen-2, .imagen-3, .imagen-4",
						snapMode: "inner",
						revert: "invalid"});		// FIN DRAGGABLE
						
						columna[i].find(claseDiv).droppable({
							drop: function (e,ui) {
										
										col_dest= "." + this.parentNode.getAttribute("class");
										fila_dest = "." 		+		this.getAttribute("class").substr(0,5);
										obj_origen = ui.draggable[0].src;
										obj_dest = $(col_dest).find(fila_dest).find("img")[0].src;
										//$(col_dest).find(fila_dest).append(ui.draggable);
										ui.draggable[0].src=obj_dest;
										$(col_dest).find(fila_dest).find("img")[0].src=obj_origen;
										ui.draggable.draggable({revert: "valid"})
							} //FIN DROP
							
							});// FIN DROPPABLE						
						
					} // FIN FOR
				} // FIN FOR
				
			}, // FIN ASIGNA EVENTO
			
			iniciaTablero: function () {
				var columna = new Array;
				var tablero = new Array;
				var indiceAleatorio;			
				for (i=0;i<7;i++) {
					indiceCol = i+1;
					objeto = ".col-"+indiceCol;
					columna[i] = $(objeto);
					for (j=0;j<5;j++) {						
						indiceAleatorio = Math.round(3*Math.random()+1);
						imagen = "./image/"+indiceAleatorio+".png";					
						columna[i].append('<div class=fil-'  + j + '><img src="'+imagen+'" class="imagen-'+j+'" ></div>');	
						//columna[i].find(".imagen-"+j).draggable();
						
					}//FIN FOR
							
				}//FIN FOR
				console.log("Inicio");
				//juego.verificaTablero(columna);
				return columna;
			}, // FIN INICIA TABLERO
			
			verificaTablero: function (columna) {
						juego.buscaIguales(columna);
						//return;
			} , //FIN VERIFICA TABLERO
			
			
			buscaIguales: function (columna) {
				console.log("Busca Iguales");
				var figurasIguales = [];
				var lineaIguales = [];
				var tableroIguales = [];
				var cuenta = 0;
				var indice = -1;
				for (fila=4;fila>=0;fila--) {
						for (i=0;i<columna.length-1;i++) {
							actual = columna[i].find(".imagen-"+fila).attr("src");
							siguiente = columna[i+1].find(".imagen-"+fila).attr("src");			
							if (actual == siguiente) {
								indice++;	
								figurasIguales[indice] = i;
								figurasIguales[indice+1] = i+1;	
								cuenta++;		
								flag = 0;
							} //FIN IF
							else if (cuenta>=2) {
								lineaIguales = figurasIguales.concat(lineaIguales);
								figurasIguales = [];
								cuenta=0;
								indice = -1;
								} else {
									figurasIguales = [];
									cuenta=0;
									indice = -1;				
								}// FIN ELSE		
						} //FIN FOR		COLUMNAS
						if (cuenta>=2) {lineaIguales = figurasIguales.concat(lineaIguales);}
						cuenta=0;
						indice = -1;
						tableroIguales.push(lineaIguales); 
						lineaIguales = [];
						figurasIguales = [];
				}//FIN FOR		FILAS	
				
				if (tableroIguales[0].length || tableroIguales[1].length || tableroIguales[2].length || tableroIguales[3].length|| tableroIguales[4].length) {
					
					setTimeout(juego.ocultaIguales,1000,columna,tableroIguales);
					//return;
					} // FIN IF
				else { return;}
			}, // FIN BUSCA IGUALES
			
			ocultaIguales: function (columna,tableroIguales) {
				console.log("Oculta");
				for (i=0;i<tableroIguales.length;i++) {
					for (j=0;j<tableroIguales[i].length;j++) {
						if (tableroIguales[i].length) {	
							filaImagen = 4-i;
							imagen = '.imagen-'+filaImagen;
							objetoImagen = columna[tableroIguales[i][j]].find(imagen);
							objetoImagen.slideUp("slow","linear");	
								}
					}//FIN FOR				
				}//FIN FOR
				setTimeout(juego.eliminaIguales,1000,columna,tableroIguales);
				
				//return;
			}, //FIN OCULTA IGUALES
			
			eliminaIguales: function (columna,tableroIguales) {
				console.log("Elimina");				
				for (i=0;i<tableroIguales.length;i++) {
					for (j=0;j<tableroIguales[i].length;j++) {
						if (tableroIguales[i].length) {	
							filaImagen = 4-i;
							imagen = '.imagen-'+filaImagen;
							objetoImagen = columna[tableroIguales[i][j]].find(imagen);
							objetoImagen.remove();
								}
					}//FIN FOR				
				}//FIN FOR
				
				juego.ordenaTablero();
			}, //FIN ELIMINA IGUALES
			
			ordenaTablero: function () {
				console.log("Ordena");
				var indiceAleatorio;
				var imagen;
				for (i=1;i<8;i++) { 																																			// RECORRE COLUMNA POR COLUMNA
					col = ".col-"+i;
					if ($(col).find("img").length<5) {																																 // PREGUNTA SI LA LA COLUMNA TIENE IMAGENES BORRADAS
						for (j=4;j>=0;j--) {  																																// RECORRE FILA POR FILA
							fila = ".fil-" + j;
							if ($(col).find(fila).find("img").length==0 && j) {												//PREGUNTA SI LA CASILLA ESTA VACIA
								for (k=j-1;k>=0;k--) { 																									// RECORRE CASILLA POR CASILLA HASTA QUE ENCUENTRA UNA NO VACIA
									filaSup = ".fil-" + k;
									if ($(col).find(filaSup).find("img").length) {
										contenido = $(col).find(filaSup).find("img");
										$(col).find(fila).append(contenido);
										clase = "imagen-"+j;
										$(col).find(fila).find("img").attr("class",clase);
										 $(col).find(filaSup).find("img").remove();
										 k=0;
										}//FIN IF	
									}// FIN FOR
								}// FIN IF							
							}//FIN FOR
						} // FIN IF
					}// FIN FOR				
					juego.rellenaTablero();
				}, //FIN ORDENA TABLERO
				
				rellenaTablero: function () {
					console.log("Rellena");
					var indiceAleatorio;
					var imagen;
					var columna = [];
					for (i=1;i<8;i++) { 																																			// RECORRE COLUMNA POR COLUMNA
					col = ".col-"+i;
					if ($(col).find("img").length<5) {																																 // PREGUNTA SI LA LA COLUMNA TIENE IMAGENES BORRADAS
						for (j=4;j>=0;j--) {  																																// RECORRE FILA POR FILA
							fila = ".fil-" + j;
							if ($(col).find(fila).find("img").length==0) {												//PREGUNTA SI LA CASILLA ESTA VACIA
										indiceAleatorio = Math.round(3*Math.random()+1);
										imagen = "./image/"+indiceAleatorio+".png";					
										$(col).find(fila).append('<img src="'+imagen+'" class="imagen-'+j+'" >');				
								}// FIN IF							
							}//FIN FOR
						} // FIN IF
					}// FIN FOR				
					for (i=0;i<7;i++) {
					indiceCol = i+1;
					objeto = ".col-"+indiceCol;
					columna[i] = $(objeto);
					}
					juego.verificaTablero(columna);
				} // FIN RELLENA TABLERO		
			};//FIN JUEGO
			juego.init();


















