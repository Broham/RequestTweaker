	chrome.devtools.panels.create("Request Tweaker",
	    "octo.png",
	    "panel/panel.html",
	    function(panel) {
	      	$("#requests").html("test");
			chrome.devtools.network.onRequestFinished.addListener(
			    function(request) {
			    	var req = request.request;
			    	//$("#requests").append(req.method + " - " + req.url + "<br/>");
			});
	    }
	);
		// chrome.devtools.panels.create('EditThisCookie', 'img/icon_32x32.png', 'devtools/panel.html');
