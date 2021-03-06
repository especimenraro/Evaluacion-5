var juego = {
			init: function () {
				this.tiempo = 120;
				this.temporizador = 0;
				this.oculta = 0;
				this.elimina = 0;
				this.puntaje = 0;
				this.movimientos = 0;
				setInterval(function () {
					color = $(".main-titulo").css("color");
					if (color == "rgb(220, 255, 14)") {
						$(".main-titulo").css("color","rgb(255, 255, 255)");
						 } else {
						 	$(".main-titulo").css("color","rgb(220, 255, 14)");
						 	}				
				},500); // FIN SET INTERVAL PARA COLOR DE MAIN TITULO
				
				$(".btn-reinicio").on("click",function () {
					clearInterval(juego.temporizador);
					$(".panel-score").css("width","25%");		
					$(".panel-tablero").slideDown();
					juego.puntaje = 0;
					juego.movimientos = 0;
					$("#movimientos-text").html(juego.movimientos.toString());
					$("#score-text").html(juego.puntaje.toString());
					juego.tiempo = 120;
				if ($(".btn-reinicio").html()=="Iniciar") {
					$(".btn-reinicio").html("Re-Iniciar");
					} 
					$(".col-1").empty();
					$(".col-2").empty();
					$(".col-3").empty();
					$(".col-4").empty();
					$(".col-5").empty();
					$(".col-6").empty();
					$(".col-7").empty();
					columna = juego.iniciaTablero();
					juego.asignaEvento(columna);
					juego.temporizador = setInterval(juego.timer,1000);
				
				}); // FIN EVENTO CLICK BOTON REINICIO			
				
				
			}, // FIN INIT
			
			timer: function () {
				cuenta = juego.tiempo;
				minuto = Math.ceil(cuenta/60)-1;
				segundo = cuenta-60*(Math.ceil(cuenta/60)-1)-1;
				if (segundo.toString().length == 1) {
					segundoTexto = "0"+segundo;
					}
					else {
						segundoTexto = segundo;
					}
					tiempoTexto = "0" + minuto.toString() +":"	+ segundoTexto;
					$("#timer").html(tiempoTexto);
					cuenta--;
					juego.tiempo = cuenta;	
					if (cuenta == 0) {juego.stopGame();}
			}, // FIN TIMER
			
			stopGame: function () {
				clearInterval(juego.temporizador);
				clearInterval(juego.oculta);
				clearInterval(juego.elimina);
				$(".panel-tablero").slideUp();
				$(".panel-score").css("width","100%");						
			}, // FIN STOP GAME
			
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
										juego.movimientos++;
										$("#movimientos-text").html(juego.movimientos.toString());
										fila_drag = Number(ui.draggable.attr("class").substr(7,1));
										col_drag = Number(ui.draggable.parent().parent().attr("class").substr(4,1));
										fila_drop = Number(this.getAttribute("class").substr(4,1));
										col_drop = Number(this.parentNode.getAttribute("class").substr(4,1));
										
										if (col_drag==col_drop-1 || col_drag==col_drop+1 || col_drag == col_drop ) {
											if (fila_drag==fila_drop-1 || fila_drag == fila_drop+1 || fila_drag == fila_drop) {
												col_dest= "." + this.parentNode.getAttribute("class");
												fila_dest = "." 		+		this.getAttribute("class").substr(0,5);
												obj_origen = ui.draggable.attr("src");
												obj_dest = $(col_dest).find(fila_dest).find("img").attr("src");
												//$(col_dest).find(fila_dest).append(ui.draggable);
												ui.draggable[0].src=obj_dest;
												$(col_dest).find(fila_dest).find("img")[0].src=obj_origen;
												ui.draggable.draggable({revert: "valid"});
												for (i=0;i<7;i++) {
													indiceCol = i+1;
													objeto = ".col-"+indiceCol;
													columna[i] = $(objeto);
												}
												juego.verificaTablero(columna);
											} // FIN IF DE FILAS			
											else {ui.draggable.draggable({revert: "valid"});}							
										} // FIN IF DE COLUMNAS
										else {ui.draggable.draggable({revert: "valid"});}
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
				juego.verificaTablero(columna);
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
								juego.puntaje++;
								$("#score-text").html(juego.puntaje.toString());
								figurasIguales = [];
								cuenta=0;
								indice = -1;
								} else {
									figurasIguales = [];
									cuenta=0;
									indice = -1;				
								}// FIN ELSE		
						} //FIN FOR		COLUMNAS
						if (cuenta>=2) {
							lineaIguales = figurasIguales.concat(lineaIguales);
							juego.puntaje++;
							$("#score-text").html(juego.puntaje.toString());
							}
						cuenta=0;
						indice = -1;
						tableroIguales.push(lineaIguales); 
						lineaIguales = [];
						figurasIguales = [];
				}//FIN FOR		FILAS	
				
				if (tableroIguales[0].length || tableroIguales[1].length || tableroIguales[2].length || tableroIguales[3].length|| tableroIguales[4].length) {
					
					juego.oculta = setTimeout(juego.ocultaIguales,500,columna,tableroIguales);
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
				juego.elimina = setTimeout(juego.eliminaIguales,500,columna,tableroIguales);
				
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
					juego.asignaEvento(columna);
					juego.verificaTablero(columna);
				} // FIN RELLENA TABLERO		
			};//FIN JUEGO
			juego.init();


















