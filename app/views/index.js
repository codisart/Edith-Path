/* jshint jquery: true */
'use strict';

const IpcRenderer = require('electron').ipcRenderer;
var remote = require('remote');
var dialog = remote.require('dialog');
window.$ = window.jQuery = require('jquery');

var foldersToAdd = [];

document.ondragover = document.ondrop = function(e) {
  e.preventDefault();
  return false;
};

function addFolder(path) {
	if(path) {
		foldersToAdd.push(path);

		var folderElementHtml = $('<li/>');

		folderElementHtml
			.attr('class', 'valid-path')
			.html(path);

		$('#folders-to-add-list').prepend(folderElementHtml);
	}
}

IpcRenderer.on('data-folders', function(event, folders) {
  console.log(folders);
	var arrayLength = folders.length;
	var foldersListHtml = $('#folders-list').empty();

	if(arrayLength > 0) {
		for (var i = 0; i < arrayLength; i++) {
			var folderElementHtml = $('<li/>');
			// var iconHtml = $('<i/>')
			//     .attr('class', 'md-icon dp48');

			if(folders[i].isValidDirectory) {
				// iconHtml.html('check_circle');
				folderElementHtml.attr('class', 'valid-path');
			} else {
				// iconHtml.html('error');
				folderElementHtml.attr('class', 'invalid-path');
			}

			folderElementHtml
				.html(folders[i].path);
				// .prepend(iconHtml);
			$('.loader').hide();
			foldersListHtml.prepend(folderElementHtml);
		}
	} else {
		foldersListHtml.after($('<p/>').html('Error'));
	}
});

$('.choose-folder').on('click', function() {
	var folderPath = dialog.showOpenDialog({ properties: [ 'openDirectory']});

	if(folderPath.length > 0){
		addFolder(folderPath[0]);
	}
});

$('.folder-input button').on('click', function() {
	IpcRenderer.send('add-folders', foldersToAdd);
	$('.loader').show();
	$('#folders-to-add-list').empty();
	return false;
});

$('#holder').on("drop", function(event) {
    event.preventDefault();
	event.stopPropagation();
    console.log('success');
	var folderPath = event.originalEvent.dataTransfer.files[0].path;

	addFolder(folderPath);
});

$('.refresh-list').on("click", function() {
	IpcRenderer.send('refresh-folders', true);
	$('.loader').show();
});
