'use strict';
const electron = require('electron');

const path = require('path');

const app = electron.app;

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
  const tray = new Tray(path.join(__dirname, './icon.png'));
  console.log('tray', tray);
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Show', click: function(){mainWindow.show()}},
		{label: 'Hide', click: function(){
      mainWindow.hide();
    }},
    {role: 'minimize'},
		{role: 'quit'}
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);

});
