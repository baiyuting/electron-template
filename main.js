const {app, BrowserWindow} = require('electron')

if (require('electron-squirrel-startup')) return;

/**
 * 更新代码
 */
function update_electron() {
    const isDev = require('electron-is-dev')
    if (!isDev) {
        // 不是在开发环境中
        const {app, autoUpdater, dialog} = require('electron')
        const server = 'http://localhost:8080'
        const url = `${server}/message_pushing`

        autoUpdater.setFeedURL({url})
        // 每次启动时检查一次
        autoUpdater.checkForUpdates()

        autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
            autoUpdater.quitAndInstall()
        })

        autoUpdater.on('error', message => {
            dialog.showMessageBox({
                type: 'info',
                message: "应用更新出错",
                detail: message
            })
        })

    }

}

/**
 * 自启动逻辑
 */
function autoStart() {
    app.setLoginItemSettings({
        openAtLogin:true
    })
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow).then(update_electron).then(autoStart)// 创建好窗口之后执行更新程序、设置自启动

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
