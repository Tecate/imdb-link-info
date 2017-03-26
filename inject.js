(function() {

	function metascoreColor(metascore) {
		if (metascore <= 39) { return "red"; }
		if (metascore > 39 && metascore <= 60) { return "yellow"; }
		if (metascore > 60) { return "green"; }
	}

	$('a[href*="imdb.com"]').each(function() { // Every link that contains "imdb.com"
		var imdbLink = $(this); // The actual link element
		var imdbUrl = $(this).attr("href"); // The URL
		var imdbID = imdbUrl.match("tt\\d{7}"); // The imdb id
		// imdbID = imdbID[0].replace(/\//g, ""); // Trimming slashes

	  var sUrl = 'https://www.omdbapi.com/?i=' + imdbID + '&type=movie&tomatoes=true'
		$.ajax(sUrl, {
		    complete: function(p_oXHR, p_sStatus){
	        oData = $.parseJSON(p_oXHR.responseText);
	        $('<span />', {
		        class: "imdb-info",
		        html:  '('+oData.Year+')' + 
		        			' ['+oData.imdbRating+']' +
		        			' [<span style="color: '+metascoreColor(oData.Metascore)+'">'+oData.Metascore+'</span>]' +
		        			' {'+oData.Genre+'}'
		      }).css({
		      	"background": "#f8f8f8",
		      	"border": "1px solid #a1a1a1",
		      	"border-radius": "1px",
		      	"margin": "0px 5px"
		      }).insertAfter(imdbLink);
		    }
		});
	});

})();