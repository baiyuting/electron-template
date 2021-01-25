const {app, BrowserWindow} = require('electron')

if (require('electron-squirrel-startup')) return;

app.disableHardwareAcceleration() // 当在虚拟机中安装时，页面显示空白，此时需要本代码禁用硬件加速 https://github.com/electron-userland/electron-forge/issues/1955 https://github.com/electron/windows-installer/pull/367


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
    const path = require("path")
    win.loadFile(path.join(__dirname, 'index.html'))

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
