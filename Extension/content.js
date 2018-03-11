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
		window.requestFileSystem(window.PERSISTENT, 2 * 1024, writeSong);
		function writeSong(fs) 
		{
			fs.root.getFile('song.txt', {create: true}, function(fileEntry) {

				// Create a FileWriter object for our FileEntry (log.txt).
				fileEntry.createWriter(function(fileWriter) {
			
				  fileWriter.onwriteend = function(e) {
					console.log('Write completed.');
				  };
			
				  fileWriter.onerror = function(e) {
					console.log('Write failed: ' + e.toString());
				  };
			
				  // Create a new Blob and write it to log.txt.
				  var blob = new Blob([songTitle], {type: 'text/plain'});
			
				  fileWriter.write(blob);
			
				}, errorHandler);
			
			  }, errorHandler);
		}

		window.requestFileSystem(window.PERSISTENT, 2 * 1024, writeArtist);
		function writeArtist(fs) 
		{
			fs.root.getFile('artist.txt', {create: true}, function(fileEntry) 
			{

				// Create a FileWriter object for our FileEntry (log.txt).
				fileEntry.createWriter(function(fileWriter) 
				{
			
				  fileWriter.onwriteend = function(e) 
				  {
					console.log('Write completed.');
				  };
			
				  fileWriter.onerror = function(e) 
				  {
					console.log('Write failed: ' + e.toString());
				  };
			
				  // Create a new Blob and write it to log.txt.
				  var blob = new Blob([artistName], {type: 'text/plain'});
			
				  fileWriter.write(blob);
			
				}, errorHandler);
			
			  }, errorHandler);
		}

		
		window.requestFileSystem(window.PERSISTENT, 2 * 1024, writeAlbum);
		function writeAlbum(fs) 
		{
			/// album
			fs.root.getFile('album.txt', {create: true}, function(fileEntry) {

				// Create a FileWriter object for our FileEntry (log.txt).
				fileEntry.createWriter(function(fileWriter) {
			
				  fileWriter.onwriteend = function(e) {
					console.log('Write completed.');
				  };
			
				  fileWriter.onerror = function(e) {
					console.log('Write failed: ' + e.toString());
				  };
			
				  // Create a new Blob and write it to log.txt.
				  var blob = new Blob([albumTitle], {type: 'text/plain'});
			
				  fileWriter.write(blob);
			
				}, errorHandler);
			
			  }, errorHandler);
		}
		
		/// write to the text files here
		/// C:\Users\[YOUR WINDOWS USERNAME HERE]\AppData\Local\Google\Chrome\User Data\Default\File System
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