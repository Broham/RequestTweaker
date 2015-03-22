$(function(){
	var counter = 0;
	chrome.devtools.network.onRequestFinished.addListener(
	    function(request) {
	    	var req = request.request;
	    	var displayUrl = req.url;
	    	if(req.url.length > 100){
	    		displayUrl = req.url.subString(0,97) + "...";
	    	}
	    	$("#requests").append("<div class='req" + counter + "'>" + req.method + " - " + displayUrl + "</div>");
	    	var headerInfo = "";
	    	$.each(req.headers, function(index, value){
	    		headerInfo += value.name + ": " + value.value + "<br/>";
	    	});
	    	$("#details").append("<div class='req" + counter + "'>" + headerInfo + "</div>");
	    	counter++;
	});
	$("#requests").on("mouseover", "div", function(){
		$("#details div").hide();
		var classSelector = "." + $(this).attr("class");
		$(classSelector).show();
	});
	$("#filter input").keyup(function(){
		var searchText = $(this).val();
		$(".requests div").hide();
		$(".requests div:contains('" + searchText + "')").show();
	});
});