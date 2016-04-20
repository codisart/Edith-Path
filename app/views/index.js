/* jshint jquery: true */
'use strict';

const IpcRenderer = require('electron').ipcRenderer;
const Shell = require('electron').shell;
var Remote = require('remote');
var Dialog = Remote.require('dialog');
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
			.attr('class', 'valid-path icon-teal')
			.html(path);

		$('#folders-to-add-list').prepend(folderElementHtml);
	}
}

IpcRenderer.on('data-folders', function(event, folders) {
	var arrayLength = folders.length;
	var foldersListHtml = $('#folders-list').empty();

	if(arrayLength > 0) {
		for (var i = 0; i < arrayLength; i++) {
			var folderElementHtml = $('<li/>');

			if(folders[i].exists) {
				folderElementHtml
                    .attr('class', 'valid-path icon-teal')
                    .dblclick( function() {
                        var thisFolder = $(this).html() + '/' + '.';
                        Shell.showItemInFolder(thisFolder);
                    });
			} else {
				folderElementHtml
                    .attr('class', 'invalid-path icon-red');
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
	var folderPath = Dialog.showOpenDialog({ properties: [ 'openDirectory']});

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
