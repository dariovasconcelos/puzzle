var piezasGame, piezasInCol, anchoTablero, altoTablero;

window.onload=function () {
	setUpTablero();
	setUpPiezas();
}

function setPiezas (a){
	piezasTotales=a;
	piezasInCol=Math.sqrt(a);

	piezasGame = a;
	creaZonasTab();
	creaPiezas();
}

function setUpTablero() {
	var altoVentana=$(window).height();
	altoTablero=$("#tablero").height();
	
	var anchoVentana=$("#zonaTablero").width();
	anchoTablero=$("#tablero").width();

	// Lo hacemos cuadrado
	$("#tablero").height(anchoTablero);
	// Lo centramos
	var topFinal=(altoVentana/2)-(altoTablero/2);
	var leftFinal=(anchoVentana/2)-(anchoTablero/2);
 	$("#tablero").css("top",+topFinal+"px")
 	$("#tablero").css("left",+leftFinal+"px")
}

function creaZonasTab() {
	var acumula='';
	for(var i=1; i<=piezasGame; ++i){
		var div='<div class="tabPieza" id="e'+i+'" data-pieza="'+i+'"></div>';
		acumula+=div;
	}

	$("#tablero").html(acumula);

	var piezasInCol=Math.sqrt(piezasGame);
	var percentWH=100/piezasInCol;
	$(".tabPieza").css("width",percentWH+"%");
	$(".tabPieza").css("height",percentWH+"%");

}

function setUpPiezas() {
	var altoVentana=$(window).height();
	altoTablero=$("#piezas").height();
	
	var anchoVentana=$("#zonaPiezas").width();
	anchoTablero=$("#piezas").width();

	// Lo hacemos cuadrado
	$("#piezas").height(anchoTablero);
	// Lo centramos
	var topFinal=(altoVentana/2)-(altoTablero/2);
	var leftFinal=(anchoVentana/2)-(anchoTablero/2);
 	$("#piezas").css("top",+topFinal+"px")
 	$("#piezas").css("left",+leftFinal+"px")
}

function creaPiezas() {
	var obtiene='';
	for(var i=1; i<=piezasGame; ++i){
		var div='<div class="Pieza" id="p'+i+'" data-pieza="'+i+'" onmousedown="mousePress(event)" onmouseup="mouseUp(event)"></div>';
		obtiene+=div;
	}

	$("#piezas").html(obtiene);

	var percentWH=100/piezasInCol;
	$(".Pieza").css("width",percentWH+"%");
	$(".Pieza").css("height",percentWH+"%");

	$(".Pieza").css("background-size",setBGSize(piezasInCol)+"px");
	setBackgrounds();
}

function setBackgrounds() {
	var colCount=0;
	var rowCount=0;
	var arrToUse=$(".Pieza").get();
	for(var i in arrToUse){
		// console.log("Row",rowCount,"Column",colCount);
		var newX=setPosition(piezasInCol)*colCount;
		var newY=setPosition(piezasInCol)*rowCount;
		$(arrToUse[i]).css("background-position",newX+"%"+" "+newY+"%");

		if (colCount==piezasInCol-1) {
			colCount=0;
			rowCount++;
		}else{
			colCount++;
		}
	}
	desordenaPiezas();
}


var piezaSelected;
function mueveMouse(e) {
		var getPiezas=piezaSelected;
		var mouseX=e.clientX;
		var mouseY=e.clientY;

		var calculaX=(mouseX-getPiezas.offsetWidth/2)-$("#piezas").get()[0].offsetLeft;
		var calculaY=(mouseY-getPiezas.offsetHeight/2)-$("#piezas").get()[0].offsetTop;
		getPiezas.style.left=(calculaX)+"px";
		getPiezas.style.top=(calculaY)+"px";        
    console.log(mouseX,mouseY);
	} 


function mousePress(e) {
		
	$(".Pieza").css("z-index",50);
	var getPiezas=e.target;
	piezaSelected=getPiezas;
	$(getPiezas).css("z-index",999);
	// e.target.setAttribute("data-left",e.target.offsetLeft);
	// e.target.setAttribute("data-top",e.target.offsetTop);
	document.querySelector("#wrapper").addEventListener("mousemove",mueveMouse);
}

    
function mouseUp(e) {
	document.querySelector("#wrapper").removeEventListener("mousemove",mueveMouse);

	// 
	var targetX=$("#zonaTablero").get()[0].offsetLeft+ $("#tablero").get()[0].offsetLeft + $("#e1").get()[0].offsetLeft + $(piezaSelected).get()[0].offsetWidth/2;
	var targetY=$("#zonaTablero").get()[0].offsetTop+ $("#tablero").get()[0].offsetTop + $("#e1").get()[0].offsetTop + $(piezaSelected).get()[0].offsetHeight/2;
}

window.onresize=function (argument) {
	setUpTablero();
	setUpPiezas();
	creaPiezas();
}

// Helpers
function setBGSize(piezasInCol) {
	var anchoNuevoBG=$(".Pieza").width()*piezasInCol;
	return anchoNuevoBG;
}
function setPosition(piezasInCol) {
	var pos=100/(piezasInCol-1);
	return pos;
}

function desordenaPiezas() {

	var arrToUse=$(".Pieza").get();
	for(var i in arrToUse){
		var randomX=Math.round(Math.random()*$("#tablero").width());
		var randomY=Math.round(Math.random()*$("#tablero").height());
		if (randomX>$("#tablero").width()/2) {
			randomX=randomX-$(".Pieza").width();
		}

		if (randomY>$("#tablero").height()/2) {
			randomY=randomY-$(".Pieza").height();
		}

		$(arrToUse[i]).css("left",randomX+"px");
		$(arrToUse[i]).css("top",randomY+"px");
	}
}
