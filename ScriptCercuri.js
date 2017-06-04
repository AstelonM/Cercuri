window.onload=ProiectCercuri;

var raza=10;
var offsetX=10;
var offsetY=10;
var cercuri=[];
var convexCerc=[];
var convexPunct=[];
var moment=0;
var A;

function ProiectCercuri()
{
	var panza=document.getElementById("panza");
	var butonCoord=document.getElementById("butoncoord");
	var actiune=document.getElementById("actiune");
	var descriere=document.getElementById("descriere");
	var coordX=document.getElementById("coordx");
	var coordY=document.getElementById("coordy");
	var mouseDa=document.getElementById("da");
	var mouseNu=document.getElementById("nu");
	mouseDa.checked=true;
	coordX.value="";
	coordY.value="";
	descriere.innerHTML="Dati coordonatele punctelor, ori prin casetele de mai sus, ori dand click pe zona din stanga. Dupa aceea, apasati butonul 'Jarvis' March'."
	panza.addEventListener("click",deseneaza);
	butonCoord.addEventListener("click",deseneaza);
	actiune.addEventListener("click",jarvisMarch);
	actiune.innerHTML="Jarvis' March";
	mouseDa.addEventListener("change",coordDa);
	mouseNu.addEventListener("change",coordNu);
	panza.addEventListener("mouseenter",pornireDiv);
	panza.addEventListener("mousemove",mutareDiv);
	panza.addEventListener("mouseleave",oprireDiv);
}

function Cerc(cX,cY)
{
	this.x=cX;
	this.y=cY;
	this.toString=function()
	{
		return "("+this.x+";"+this.y+")";
	}
}

function Pereche(c1,c2)
{
	this.p1=c1;
	this.p2=c2;
}

function distanta(a,b)
{
	return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function distanta2(x,y,b)
{
	return Math.sqrt((x-b.x)*(x-b.x)+(y-b.y)*(y-b.y));
}

function orientare(c1,c2,c3)
{
	return (c2.x-c1.x)*(c3.y-c1.y)-(c3.x-c1.x)*(c2.y-c1.y);
}

function culoare()
{
	var optiuni="0123456789ABCDEF";
	var c="#";
	for(var i=0;i<6;i++)
		c+=optiuni[Math.floor(Math.random()*16)];
	return c;
}

function pornireDiv()
{
	var coordonate=document.getElementById("coordonate");
	coordonate.style.position="absolute";
	coordonate.style.display="block";
}

function oprireDiv()
{
	var coordonate=document.getElementById("coordonate");
	coordonate.style.position="static";
	coordonate.style.display="none";
}

function mutareDiv(e)
{
	var x=e.pageX;
	var y=e.pageY;
	var coordonate=document.getElementById("coordonate");
	var xx=x+10;
	coordonate.style.left=xx+"px";
	coordonate.style.top=y+"px";
	x-=offsetX;
	y-=offsetY;
	coordonate.innerHTML="X: "+x+"<br>Y: "+y;
}

function coordDa()
{
	panza.addEventListener("mouseenter",pornireDiv);
	panza.addEventListener("mousemove",mutareDiv);
	panza.addEventListener("mouseleave",oprireDiv);
}

function coordNu()
{
	panza.removeEventListener("mouseenter",pornireDiv);
	panza.removeEventListener("mousemove",mutareDiv);
	panza.removeEventListener("mouseleave",oprireDiv);
}

function deseneaza(e)
{
	if(moment!=0&&moment!=1)
		return;
	var panza=document.getElementById("panza");
    var ctx=panza.getContext("2d");
	var x,y;
	if(e.target.id=="panza")
    {
		x=e.pageX-offsetX;
		y=e.pageY-offsetY;
		var n=cercuri.length;
		if(moment==0)
		{
			if(x<=raza||y<=raza||x>=panza.width-raza||y>=panza.height-raza)
			{
				var h=panza.height-raza;
				var w=panza.width-raza;
				alert("Coordonatele trebuie introduse cu X intre "+raza+" si "+w+", iar Y intre "+raza+" si "+h+" exclusiv.");
				return;
			}
			var n=cercuri.length;
			for(var i=0;i<n;i++)
				if(distanta2(x,y,cercuri[i])<=2*raza+1)
				{
					alert("Cercurile trebuie sa fie disjuncte.");
					return;
				}
		}
	}
	else
	{
		var coordx=document.getElementById("coordx");
		var coordy=document.getElementById("coordy");
		x=parseInt(coordx.value);
		y=parseInt(coordy.value);
		if(isNaN(x)||isNaN(y))
		{
			alert("Coordonatele trebuie sa fie numere, nu altceva.");
			coordx.value="";
			coordy.value="";
			return;
		}
		if(moment==0)
		{
			if(x<=raza||y<=raza||x>=panza.width-raza||y>=panza.height-raza)
			{
				var h=panza.height-raza;
				var w=panza.width-raza;
				alert("Coordonatele trebuie introduse cu X intre "+raza+" si "+w+", iar Y intre "+raza+" si "+h+" exclusiv.");
				coordx.value="";
				coordy.value="";
				return;
			}
			var n=cercuri.length;
			for(var i=0;i<n;i++)
				if(distanta2(x,y,cercuri[i])<=2*raza+1)
				{
					alert("Cercurile trebuie sa fie disjuncte.");
					coordx.value="";
					coordy.value="";
					return;
				}
		}
		else
		{
			if(x<=0||y<=0||x>=panza.width||y>=panza.height)
			{
				alert("Coordonatele trebuie introduse cu X intre 0 si "+panza.height+", iar Y intre 0 si "+panza.width+" exclusiv.");
				coordx.value="";
				coordy.value="";
				return;
			}
		}
		coordx.value="";
		coordy.value="";
	}
	ctx.beginPath();
	var punct=new Cerc(x,y);
	if(moment==0)
	{
		cercuri.push(punct);
		var stil=culoare();
		ctx.fillStyle=stil;
		ctx.arc(x, y, raza, 0, 2*Math.PI);
		ctx.fill();
		ctx.strokeStyle="#000000";
		ctx.stroke();
	}
	else if(moment==1)
	{
		ctx.strokeStyle="red";
		ctx.moveTo(x,y);
		ctx.lineTo(x+5,y+5);
		ctx.stroke();
		ctx.moveTo(x,y);
		ctx.lineTo(x+5,y-5);
		ctx.stroke();
		ctx.moveTo(x,y);
		ctx.lineTo(x-5,y+5);
		ctx.stroke();
		ctx.moveTo(x,y);
		ctx.lineTo(x-5,y-5);
		ctx.stroke();
		A=punct;
		moment=2;
		var butonCoord=document.getElementById("butoncoord");
		butonCoord.removeEventListener("click",deseneaza);
		panza.removeEventListener("click",deseneaza);
	}
}

function jarvisMarch()
{
	if(cercuri.length<=0)
	{
		alert("Este necesar cel putin un cerc");
		return;
	}
	while(convexCerc.length>0)
	{
		convexCerc.pop();
		convexPunct.pop();
	}
	if(cercuri.length==1)
	{
		convexCerc.push(cercuri[0]);
	}
	else
	{
		var panza=document.getElementById("panza");
		var ctx=panza.getContext("2d");
		var a, n=cercuri.length;
		var min=panza.width+1;
		for(var i=0;i<n;i++)
			if(cercuri[i].x<min)
			{
				min=cercuri[i].x;
				a=cercuri[i];
			}
		var k=0, valid=true;
		convexCerc.push(a);
		while(valid)
		{
			var pivot;
			var ii=k;
			do
			{
				i++;
				if(i>=n)
					i=0;
				pivot=cercuri[i];
			}while(pivot==convexCerc[k]);
			for(var i=0;i<n;i++)
			{
				if(orientare(convexCerc[k],pivot,cercuri[i])<0)
					pivot=cercuri[i];
			}
			if(pivot!=convexCerc[0])
			{
				k++;
				a=pivot;
				convexCerc.push(a);
				if(convexCerc.length>cercuri.length)
				{
					alert("convexCerc e mai mare decat cercuri...");
					return;
				}
			}
			else
				valid=false;
		}
		for(var i=0;i<convexCerc.length;i++)
		{
			var c1=convexCerc[i], c2;
			if(i+1!=convexCerc.length)
			{
				c2=convexCerc[i+1];
			}
			else
			{
				c2=convexCerc[0];
			}
			var sgn;
			if(c1.x==c2.x)
			{
				sgn=-1;
			}
			else if(c1.y==c2.y)
			{
				if(c1.x<c2.x)
					sgn=-1;
				else
					sgn=1;
			}
			else
			{
				if(c1.x<c2.x)
					sgn=-1;
				else
					sgn=1;
			}
			var alfa=Math.atan((c1.y-c2.y)/(c2.x-c1.x));
			var x3=c1.x+sgn*raza*(Math.cos(Math.PI/2-alfa));
			var y3=c1.y+sgn*raza*(Math.sin(Math.PI/2-alfa));
			var x4=c2.x+sgn*raza*(Math.cos(Math.PI/2-alfa));
			var y4=c2.y+sgn*raza*(Math.sin(Math.PI/2-alfa));
			convexPunct.push(new Pereche(new Cerc(x3,y3),new Cerc(x4,y4)));
			ctx.beginPath();
			ctx.strokeStyle="black";
			ctx.moveTo(x3,y3);
			ctx.lineTo(x4,y4);
			ctx.stroke();
		}
	}
	moment=1;
	var descriere=document.getElementById("descriere");
	descriere.innerHTML="Dati coordonatele punctului A (la fel ca la cercuri) si apoi apasati butonul 'Verificare A'.";
	var actiune=document.getElementById("actiune");
	actiune.removeEventListener("click",jarvisMarch);
	actiune.innerHTML="Verificare A";
	actiune.addEventListener("click",verificareA);
	var butonFisier=document.getElementById("butonfisier");
	butonFisier.removeEventListener("click",deseneaza);
	document.getElementById("fisierinput").disabled=true;
}

function verificareA()
{
	if(moment!=2)
		return;
	if(cercuri.length>1)
	{
		var descriere=document.getElementById("descriere");
		var n=convexCerc.length;
		for(var i=0;i<n;i++)
		{
			var d=distanta(cercuri[i],A);
			if(d<=raza)
			{
				moment=3;
				if(d==raza)
					descriere.innerHTML="A se afla pe acoperirea convexa";
				else
					descriere.innerHTML="A se afla in interiorul acoperirii convexe";
				return;
			}
			if(i+1<n)
			{
				var o=orientare(convexPunct[i].p1,convexPunct[i].p2,A);
				if(o==0)
				{
					moment=3;
					descriere.innerHTML="A se afla pe acoperirea convexa";
					return;
				}
				if(o<0)
				{
					moment=3;
					break;
				}
			}
			else
			{
				var o=orientare(convexPunct[i].p1,convexPunct[0].p2,A);
				if(o==0)
				{
					moment=3;
					descriere.innerHTML="A se afla pe acoperirea convexa";
					return;
				}
				if(o<0)
				{
					moment=3;
					break;
				}
			}
		}
		if(moment==2)
		{
			descriere.innerHTML="A se afla in interiorul acoperirii convexe";
			moment=3;
		}
		else
			descriere.innerHTML="A se afla in exteriorul acoperirii convexe";
	}
	else
	{
		var d=distanta(cercuri[0],A);
		var descriere=document.getElementById("descriere");
		if(d<=raza)
		{
			moment=3;
			if(d==raza)
				descriere.innerHTML="A se afla pe acoperirea convexa";
			else
				descriere.innerHTML="A se afla in interiorul acoperirii convexe";
			return;
		}
		descriere.innerHTML="A se afla in exteriorul acoperirii convexe";
		moment=3;
	}
}