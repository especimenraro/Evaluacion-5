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
				var figurasIguales = [];
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
							else if (cuenta==1) {
								indice=-1;
								flag =0;
								inicio = figurasIguales.length-1;
								finaliza = figurasIguales.length;
								for (k=inicio;k<finaliza;k++) {figurasIguales.pop();}
								cuenta=0;
							} else if (cuenta>=2 && flag==0)   {
								flag = 1;
								indice++;
								cuenta=0;
								}// FIN ELSE		
						} //FIN FOR		COLUMNAS
						longitud = figurasIguales.length
						if (longitud<3) {
							for (k=0;k<longitud;k++) {
								figurasIguales.pop();}}
						console.log(figurasIguales,"Cuenta:",cuenta);
						indice = -1;
						cuenta=0;
						for (k=0;k<figurasIguales.length;k++) {figurasIguales.pop();}
				}//FIN FOR		FILAS	
			} //FIN VERIFICA TABLERO
			};//FIN JUEGO
			juego.init();