var deg;
var x;
var y;
var a;
var svg;
var d;

window.onload = function(){
	deg = document.getElementById("deg");
	svg = document.getElementById("mySVG");
	
	a = 0;
	x = 0;
	y = 300;
	
	d = 'M0 300'; 
}

function addPoint(length){
	transformCords(length);
	d += ' L' + x + ' ' + y; 
}
function changeAngle(value){
	a = a + Number(value);
	
}
function transformCords(length){
	x = x + Math.cos(a*Math.PI/180) * length;
	y = y - Math.sin(a*Math.PI/180) * length;
	a = a % 360;
}

function koch(){
	
	createKochLine(600,deg.value);
	var path = createPath();
	var animate = createAnimate(path);

	path.appendChild(animate);
	svg.appendChild(path);
	animate.beginElement();
}

function createKochLine(length,deg){	
	if(deg == 0){
		addPoint(length);
	}
	else{
		createKochLine(length/3,deg-1);
		changeAngle(60);
		createKochLine(length/3,deg-1);
		changeAngle(-120);
		createKochLine(length/3,deg-1);
		changeAngle(60);
		createKochLine(length/3,deg-1);
	}
}

function createPath(){
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

	path.setAttributeNS(null, "d", d);
	path.setAttributeNS(null, "stroke", "black"); 
	path.setAttributeNS(null, "stroke-width", 3);  
	path.setAttributeNS(null, "stroke-dasharray", totalLength(path)); 
	path.setAttributeNS(null, "stroke-dashoffset", 0); 
	path.setAttributeNS(null, "opacity", 1);  
	path.setAttributeNS(null, "fill", "none");

	return path;
}

function createAnimate(path){
	var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");

	animate.setAttributeNS(null, "attributeName", "stroke-dashoffset");
	animate.setAttributeNS(null, "begin", "kochBtn.click"); 
	animate.setAttributeNS(null, "values", totalLength(path) + '; 0');  
	animate.setAttributeNS(null, "dur", '10s');  
	animate.setAttributeNS(null, "repeatCount", "1");
	animate.setAttributeNS(null, "fill", "freeze");
	animate.setAttributeNS(null, "calcMode", "linear");
	
	return animate;
}

function totalLength(path){
	return Math.round(path.getTotalLength());
}
