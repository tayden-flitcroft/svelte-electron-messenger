// @ts-ignore
const path = require('path')

const { app, BrowserWindow } = require('electron')
const IS_DEV = process.env.NODE_ENV === 'development'

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 750,
		webPreferences: {
			nodeIntegration: true
		}
	})

	win.loadURL(
		IS_DEV
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../dist/index.html')}` // Electron app works when built locally but does not work when built on server
	)

	win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
