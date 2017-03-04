var button=document.getElementById('button');
	var addEvent=function(node,etype,handle,bol){
		// bol=bol||false;
		if(node.addEventListener){
			node.addEventListener(etype,handle,bol);
		}
		else if(node.attachEvent){
			node.attachEvent('on'+etype,handle);
		}
		else{
			node['on'+etype]=handle;
		}
	};
	var removeEvent=function(node,etype,handle,bol){
		// bol=bol||false;
		if(node.removeEventListener){
			node.removeEventListener(etype,handle,bol);
		}
		else if(node.detachEvent){
			node.detachEvent('on'+etype,handle);
		}
		else{
			node['on'+etype]=null;
		}

	}


	// button.onclick=show; 在dom里面传入this，这样传入event
// onclick=show在html里这样写没用
	function show(node){
		node=(node===undefined? "undefined":node);
		console.log("node:"+node);
	}
var num=1
	var display=function(){
		console.log("event "+num);
		num++;
	}
// add方法同样的事件添加两次，没用，不一样的事件，添加了都会执行；onclick方法后面的会覆盖前面的，但是不会覆盖add
	// addEvent(button,'click',ask,false);
	// addEvent(button,'click',ask,false);

	// button.onclick=show;

	function ask(){
		alert("hah");
	}
// 对一个节点绑定多个事件函数，并且依次执行
	function trigger(node,etype){
		node.getEventListener();
	}

