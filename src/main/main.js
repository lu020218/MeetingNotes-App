'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { exportWord } from '@/common/office'

const Store = require('electron-store')
const url=require('url')

const isDevelopment = process.env.NODE_ENV !== 'production'

const store = new Store()
console.log('path:', app.getPath('userData'))


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 400,
    minHeight: 800,
    width: 400,
    height: 800,
    frame: false,
    backgroundColor: '#00000000',
    transparent: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    console.log(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  ipcMain.on('window-close', () => {
    console.log('app close')
    app.exit()
  })

  ipcMain.on('save-file-dialog', (event, path) => {
    dialog.showOpenDialog(win, {
      title: '选择保存文件夹',
      defaultPath: path,
      properties: ['openDirectory']
    }).then ( result => {
      console.log(result.canceled)
      console.log(result.filePaths)
      event.returnValue = result.filePaths
    })
  })

  ipcMain.on('set-store', (event, key, value) => {
    store.set(key, value)
  })

  ipcMain.on('get-store', (event, key) => {
    let value = store.get(key)
    event.returnValue = value
  })

  ipcMain.on('export-word', (event, filePath, notes_data) => {
    console.log(notes_data)
    exportWord(filePath, JSON.parse(notes_data))
    win.webContents.send('notes-saved')
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    console.log('app quite close')
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  protocol.registerFileProtocol('atom', (request, callback) => {
    const filePath = url.fileURLToPath('file://' + request.url.slice('atom://'.length))
    callback(filePath)
  })

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
