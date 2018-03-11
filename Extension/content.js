/// when the extension is first loaded it intializes songTitleOld, artistNameOld, and albumTitleOld 
/// so the first execution of the loop executes as expected
var songTitleOld = 
	document.getElementsByClassName("Marquee__wrapper__content")[0].innerHTML;

var artistNameOld = 
	document.getElementsByClassName("nowPlayingTopInfo__current__artistName")[0].innerHTML;

var albumTitleOld = 
	document.getElementsByClassName("nowPlayingTopInfo__current__albumName")[0].innerHTML;

/// Checks every 1.5 seconds for change in song/ artist/ album 
var check = function()
{
		var songTitle = 
			document.getElementsByClassName("Marquee__wrapper__content")[0].innerHTML;

		var artistName = 
			document.getElementsByClassName("nowPlayingTopInfo__current__artistName")[0].innerHTML;

		var albumTitle = 
			document.getElementsByClassName("nowPlayingTopInfo__current__albumName")[0].innerHTML;

		/// a variable has changed so write to the filesystem
		if ( songTitle !== songTitleOld || artistName !== artistNameOld || albumTitle !== albumTitleOld)
		{
				// Pass Variable to Native Messaging Host to write to the text file
		}
		
		/// nothing has changed so check again in 1.5 seconds
		else 
		{
				var songTitleOld = songTitle;
				var artistNameOld = artistName;
				var albumTitleOld = albumTitle;
				setTimeout(check, 1500); 
		}
}