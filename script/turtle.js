var c;
var ctx;
var len;
var angle;
var lwidth;
var x = 0;
var y = 0;
var a = 0;
var deg;

function move(length){
	transformCords(length);
	ctx.moveTo(x,y);
}

function line(length){
	ctx.moveTo(x,y);
	transformCords(length);
	ctx.lineTo(x,y);
	ctx.stroke();
}


function changeAngle(value){
	a = a + Number(value);
}

function changeColor(){
	ctx.beginPath();
	var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
	var btn = document.getElementById("colorButton");
	if(btn != null){
		btn.style.color = color;
	}
	ctx.strokeStyle = color;
}

function changeLineWidth(l){
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineWidth = l;
}

function transformCords(length){
	x = x + Math.cos(a*Math.PI/180) * length;
	y = y - Math.sin(a*Math.PI/180) * length;
	a = a % 360;
}
