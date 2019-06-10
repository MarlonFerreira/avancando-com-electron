const { app, BrowserWindow, Tray, Menu, globalShortcut } = require('electron')
const url = require('url')
const path = require('path')
//const http = require('http')

let mainWindow

if (process.env.NODE_ENV === 'development') {
    require('electron-reload')(__dirname)
}

app.setAppUserModelId('com.schoolofnet.electon-curso')

app.on('ready', createWindow)

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        eight: 600,
        webPreferences: {
            //enableRemoteModule: false,
            //preload: path.join(app.getAppPath(), 'renderer.js')
            nodeIntegration: true
        }
    })

    let file = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    })

    mainWindow.loadURL(file)

    mainWindow.on('maximize', () => console.log('Maximizado'))
    mainWindow.on('resize', () => console.log('tamanho alterado'))

    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Mostrar aplicativo', 
            click: function(){
                mainWindow.show()
            }
        },
        {
            label: 'Sair', click: function(){
                app.isQuiting = true
                app.quit()
            }
        }
    ])

    let tray = new Tray(path.join(__dirname, 'tray.png'))
    tray.setContextMenu(contextMenu)

    mainWindow.on('minimize', function(event){
        event.preventDefault()
        mainWindow.hide()
    })

    mainWindow.on('close', function(event){
        if(!app.isQuiting){
            event.preventDefault()
            mainWindow.hide()
        }
    })

    tray.on('click', function(){
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })

    mainWindow.on('show', function(){
        tray.setHighlightMode('always')
    })

    globalShortcut.register('CommandOrControl+x', function(){
        console.log('Quem disse que voce pode recortar isso?')
    })

    globalShortcut.register('Alt+a', function(){
        console.log('Foi precionado alt+a')
    })

    // http.get({
    //     hostname: 'api.giphy.com',
    //     port: 80,
    //     path: '/v1/gifs/random?api_key=YyXyB2muO6E3dRUDJxka8CWPg63Z1WDT'
    // }, function(res){
    //     let output

    //     res.on('data', function(chunk){
    //         output += chunk
    //     })

    //     res.on('end', function(){
    //         let response = output.replace(/^undefined/, '')
    //         response = JSON.parse(response)
    //         console.log(response.data.image_url)
    //     })
    // })

    //mainWindow.webContents.openDevTools()
}




