var button=document.getElementById('button');

function addEvent(el, eventName, handler) {
	el.data={events:[]};
	el.data.events.push({handler:handler,ename:eventName});
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}

// 这里参考jquery，可以把参数存入到元素的属性中

function triggerEvent(el, eventName, options) {
  	if(eventName!==undefined){
	  	trigger(el,eventName,options);
	}
	else{
		el.data.events.map(data=>{
			trigger(el,data.eventName,options);
		});
	}

}

function trigger(el, eventName, options){
	var event;
	options=options||{};
    if (window.CustomEvent) {
      event = new CustomEvent(eventName, options);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, options);
    }
    el.dispatchEvent(event);
}

// Add an event listener.
addEvent(button, 'click', function(e) {
  button.innerHTML = e.detail;
});

addEvent(button, 'click', function(e) {
	alert("click2");
});

window.addEventListener('resize',function(e){
	// console.log("resize");
	triggerEvent(button, 'click', {
	  detail: 'Display on trigger...'
	});
});

// Trigger the event.
// triggerEvent(button, 'click', {
//   detail: 'Display on trigger...'
// });

// 绑定多个事件
// 获取绑定的事件