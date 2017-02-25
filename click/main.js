//*[@id="guid-124981"]/div/ul/li[4]/div/div[6]/a
// 处理XPath

$.fn.extend({
  xpathEvaluate:function (xpathExpression) {
	$this = this.first(); 

	xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

	result = [];
	while (elem = xpathResult.iterateNext()) {
	  result.push(elem);
	}

	$result = jQuery([]).pushStack( result );
	return $result;
  }
});

$(function() {
    
    var a = setInterval(function () {
      console.log("开始");
      
      // 点击抢红包
        $(document).xpathEvaluate('//*[@id="guid-124981"]/div/ul/li[4]/div/div[6]/a').click();
        
        // 点击再来一次
      //   var b = setInterval(function () {
      //     $(document).xpathEvaluate('/html/body/div[11]/div[4]/div[2]/div[1]').click();
      // }, 2000);
    }, 3000);

});


