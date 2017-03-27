// Colors
var colorBg = "#f8f8f8";
var colorBorder = "#a1a1a1";
var colorRed = "#F7977A";
var colorYellow = "#FFF79A"
var colorGreen = "#82CA9D";

function scoreColor(score) {
	var scoreColor;
	if (score.indexOf(".")!=-1) // check if score is imdb rating
		score = score * 10; // convert to metascore
	if (score <= 39) { scoreColor = colorRed; };
	if (score > 39 && score <= 60) { scoreColor = colorYellow; };
	if (score > 60) { scoreColor = colorGreen; };
	return scoreColor;
}

(function() {
	$('a[href*="imdb.com"]').each(function() { // Every link that contains "imdb.com"
		var imdbLink = $(this); // The actual link element
		var imdbUrl = $(this).attr("href"); // The URL
		var imdbID = imdbUrl.match("tt\\d{7}"); // The imdb id
		// imdbID = imdbID[0].replace(/\//g, ""); // Trimming slashes

		chrome.extension.getURL("images/imdb.png");

	  var sUrl = 'https://www.omdbapi.com/?i=' + imdbID + '&type=movie&tomatoes=true'
		$.ajax(sUrl, {
		    complete: function(p_oXHR, p_sStatus){
	        oData = $.parseJSON(p_oXHR.responseText);
	        $('<span />', {
		        class: "imdb-info",
		        html:  '('+oData.Year+')' + 
		        			' <img style="vertical-align: middle;" src="'+chrome.extension.getURL("img/imdb-small.png")+'"> <span style="background: '+scoreColor(oData.imdbRating)+'">'+oData.imdbRating+'</span>' +
		        			' <img style="vertical-align: middle;" src="'+chrome.extension.getURL("img/metacritic-small.png")+'"> <span style="background: '+scoreColor(oData.Metascore)+'">'+oData.Metascore+'</span>' +
		        			' '+oData.Genre+''
		      }).css({
		      	"background": colorBg,
		      	"border": "1px solid " + colorBorder,
		      	"border-radius": "1px",
		      	"margin": "0px 5px"
		      }).insertAfter(imdbLink);
		    }
		});
	});

})();