var fade=function(node){
	var level=1;	
	var step=function(){
		var hex=level.toString(16);
		node.style.backgroundColor="#FFFF"+hex+hex;
		if(level<15){
			level++;
			setTimeout(step,100);
		}

	};
	setTimeout(step,100);
}


for(var i;i<nodes.length;i++){
nodes[i].onclick=function(){
alert(i);
};
}


// 变成

var helper=function(i){
	return function(e){
		alert(i);
	};
};
var  i;
for(var i;i<nodes.length;i++){
nodes[i].onclick=helper;
}

Function.method('inherits',function(Parent){
	this.prototype=new Parent();
	return this;
});