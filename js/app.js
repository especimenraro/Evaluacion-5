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
			}, // FIN INIT
			
			
			verificaTablero: function (columna) {
						this.buscaIguales(columna);
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
					
					var a = setTimeout(this.eliminaIguales,1000,columna,tableroIguales);
					} // FIN IF
				else { return;}
			}, // FIN BUSCA IGUALES
			
			eliminaIguales: function (columna,tableroIguales) {
				console.log("entro");
				
				for (i=0;i<tableroIguales.length;i++) {
					for (j=0;j<tableroIguales[i].length;j++) {
						if (tableroIguales[i].length) {	
							filaImagen = 4-i;
							imagen = '.imagen-'+filaImagen;
							columna[tableroIguales[i][j]].find(imagen).slideUp("slow","linear");			}
					}//FIN FOR				
				}//FIN FOR
			} //FIN ELIMINA IGUALES
			};//FIN JUEGO
			juego.init();


















