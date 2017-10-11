var juego = {
			init: function () {
				var columna = new Array;
				var indiceAleatorio;			
				for (i=1;i<8;i++) {
					objeto = ".col-"+i;
					columna[i] = $(objeto);
					for (j=0;j<5;j++) {
						indiceAleatorio = Math.round(3*Math.random()+1);
						imagen = "./image/"+indiceAleatorio+".png";					
						columna[i].append('<img src="'+imagen+'" >');	
						
					}//FIN FOR
							
				}//FIN FOR
			} // FIN INIT
			}//FIN JUEGO
			juego.init();