'use strict';
const electron = require('electron');

const path = require('path');

const app = electron.app;

const nativeImage = electron.nativeImage;

const Tray = electron.Tray;

const Menu = electron.Menu;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

  return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	//
	var imgPath = path.join(__dirname, './icon.png')
	var img = require('electron').nativeImage.createFromPath(imgPath)
  var tray = new Tray(imgPath);
	// var tray = new Tray(nativeImage.createFromPath(imgPath))
  const contextMenu = Menu.buildFromTemplate([
    {label: 'show', click: function(){mainWindow.show()}},
    {label: 'hide', click: function(){
      mainWindow.restore();
      mainWindow.hide();
    }},
    {role: 'minimize'}
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);

	setInterval(function(){tray.setImage(imgPath)},1000);
	// setInterval(function(){tray.setImage(nativeImage.createFromPath(imgPath))},1000);
});
