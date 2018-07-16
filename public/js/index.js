/* 
 *  FruityUI - An UI for FruityRazer
 *  Copyright (C) 2018 Eduardo Almeida
 * 
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 * 
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu, Notification } = require('electron');

const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');

const ElectronStore = require('electron-store');

const localStorage = new ElectronStore();

const { join: joinPath } = require('path');
const { exec } = require('child_process');

const appRootDir = require('app-root-dir');

const FruityRazer = require('./FruityRazerLegacy');

let fruityRazerProcess;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);

    //  mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function createMenu() {
    const template = [
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },
        {
            role: 'window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        }
    ];

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        })

        // Edit menu
        template[1].submenu.push(
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' }
                ]
            }
        )

        // Window menu
        template[2].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' }
        ]
    };

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function restoreDevicesState() {
    FruityRazer.getDeviceList(devices => {
        devices.filter(d => d.connected).forEach(d => {
            const s = localStorage.get('device:' + d.shortName);

            if (s) {
                const settings = (s.raw) ? JSON.parse(s.raw) : s;

                FruityRazer.sendLightingMessage(d.shortName, settings, success => {
                    if (success) {
                        const notification = new Notification({
                            title: '🐍 Settings Loaded!',
                            body: d.fullName,
                            silent: true
                        });

                        notification.show();
                    }
                });
            }
        });
    });
}

app.on('ready', function () {
    createWindow();
    createMenu();
    restoreDevicesState();

    electron.powerMonitor.on('resume', () => {
        restoreDevicesState();
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {
    if (mainWindow === null)
        createWindow();
});

app.on('quit', () => {
    if (fruityRazerProcess)
        fruityRazerProcess.kill();
})

ipcMain.on('STORAGE_GET_DATA', (event, arg) => {
    const val = localStorage.get(arg.key);

    event.sender.send('STORAGE_GET_DATA_RESPONSE', val);
});

ipcMain.on('STORAGE_SET_DATA', (event, arg) => {
    localStorage.set(arg.key, arg.value);
});

const execPath = (!isDev) ?
    joinPath(path.dirname(appRootDir.get()), 'bin') :
    joinPath(appRootDir.get(), 'resources', 'mac');

fruityRazerProcess = exec(`${joinPath(execPath, 'FruityRazer.app/Contents/MacOS/FruityRazer')}`);