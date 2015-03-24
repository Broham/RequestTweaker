$(function(){
	var requests = {};
	var counter = 0;
	chrome.devtools.network.onRequestFinished.addListener(
	    function(request) {
	    	var req = request.request;
	    	var displayUrl = req.url;
	    	// if(req.url.length > 60){
	    	// 	displayUrl = req.url.substring(0,57) + "...";
	    	// }
	    	$("#requests").append("<div data-value='req" + counter + "'>" + req.method + " - " + displayUrl + "</div>");
	    	var headerInfo = "";
	    	$.each(req.headers, function(index, value){
	    		headerInfo += value.name + ": " + value.value + "<br/>";
	    	});
	    	$("#details").append("<div class='req req" + counter + "'>" + headerInfo + "</div>");
	    	requests["req"+ counter] = req;
	    	counter++;
	});
	$("#requests").on("mouseover", "div", function(){
		$(".req").hide();
		var classSelector = "." + $(this).data("value");
		$(classSelector).show();
	});

	$("#requests").on("click", "div", function(){
		$(".req").hide();
		buildEditPanel($(this).data("value"));
		$(".edit").show();
	});

	$("#filter input").keyup(function(){
		var searchText = $(this).val();
		$("#requests div").hide();
		$("#requests div:contains('" + searchText + "')").show();
	});

	$("#exit").click(function(){
		$(".edit").hide();
	});

	function buildEditPanel(reqNum){
		var req = requests[reqNum];
		var panelHtml = "";
		$("#edit-panel").empty();
		// $("#edit-panel").show();
		panelHtml += "<h3>" + req.method + "</h3>";
		panelHtml += "<h4>Cookies:</h4>";
		$.each(req.cookies, function(index, cookie){
			panelHtml += "<div class='data qs'><span class='name'>" + cookie.name + "</span> <input type='text' value='" + cookie.value + "' /></div>";
		});

		panelHtml += "<br/>";

		panelHtml += "<h4>Headers:</h4>";
		$.each(req.headers, function(index, header){
			panelHtml += "<div class='data header'><span class='name'>" + header.name + "</span> <input type='text' value='" + header.value +  "' /></div>";
		});

		panelHtml += "<br/>";

		panelHtml += "<h4>Query String:</h4>";
		$.each(req.queryString, function(index, qs){
			panelHtml += "<div class='data cookie'><span class='name'>" + qs.name + "</span> <input type='text' value='" + qs.value + "' /></div>";
		});
		$("#edit-panel").append(panelHtml);
	}
});