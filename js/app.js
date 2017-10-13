var juego = {
			init: function () {
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
				console.log("Init listo");
				this.verificaTablero(columna);
				console.log("Fin");
			}, // FIN INIT
			
			
			verificaTablero: function (columna) {
						this.buscaIguales(columna);
						//return;
			} , //FIN VERIFICA TABLERO
			
			
			buscaIguales: function (columna) {
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
				console.log(tableroIguales);
				if (tableroIguales[0].length || tableroIguales[1].length || tableroIguales[2].length || tableroIguales[3].length|| tableroIguales[4].length) {
					
					setTimeout(this.ocultaIguales,1000,columna,tableroIguales);
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
				console.log(columna,tableroIguales);
				//juego.ordenaTablero();
			}, //FIN ELIMINA IGUALES
			
			ordenaTablero: function () {
				var indiceAleatorio;
				var imagen;
				for (i=1;i<8;i++) { 																																			// RECORRE COLUMNA POR COLUMNA
					col = ".col-"+i;
					if ($(col).length<5) {																																 // PREGUNTA SI LA LA COLUMNA TIENE IMAGENES BORRADAS
						for (j=4;j>=0;j--) {  																																// RECORRE FILA POR FILA
							fila = ".fil-" + j;
							if ($(col).find(fila).find("img").length==0) {												//PREGUNTA SI LA CASILLA ESTA VACIA
								for (k=j-1;k<=0;k--) { 																									// RECORRE CASILLA POR CASILLA HASTA QUE ENCUENTRA UNA NO VACIA
									filaSup = ".fil-" + k;
									if ($(col).find(filaSup).find("img").length) {
										contenido1 = $(col).find(filaSup).find("img");
										
										}//FIN IF	
									}// FIN FOR
								}// FIN IF							
							}//FIN FOR
						} // FIN IF
					}// FIN FOR				
				} //FIN ORDENA TABLERO		
			};//FIN JUEGO
			juego.init();


















