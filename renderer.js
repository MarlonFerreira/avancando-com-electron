const { remote } = require('electron')
const Mousetrap = require('mousetrap')
const path = require('path')
const mainWindow = remote.BrowserWindow.getFocusedWindow()

let minimizar = document.getElementById('minimizar')
let maximizar = document.getElementById('maximizar')
let fullscreen = document.getElementById('fullscreen')
let fechar = document.getElementById('fechar')


minimizar.addEventListener('click', function (event) {
    event.preventDefault()
    //alert('clicou em minimizar')
    mainWindow.minimize()
})

maximizar.addEventListener('click', function (event) {
    event.preventDefault()
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
        maximizar.textContent = 'maximizar'
    }
    else {
        mainWindow.maximize()
        maximizar.textContent = 'restaurar'
    }
})

fullscreen.addEventListener('click', function (event) {
    event.preventDefault()
    mainWindow.setFullScreen(!mainWindow.isFullScreen())
})

fechar.addEventListener('click', function(event){
    event.preventDefault()
    mainWindow.close()
})

let getgif = document.getElementById('getgif')
getgif.addEventListener('click', function(event){
    event.preventDefault()

    httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function() {
        if(httpRequest.status === 200){
            let response = JSON.parse(httpRequest.response)
            let imgUrl = response.data.image_url
            document.getElementById('showgif').innerHTML = `<img src="${imgUrl}">`
        }
    }
    httpRequest.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=YyXyB2muO6E3dRUDJxka8CWPg63Z1WDT')
    httpRequest.send()

})

let notification = document.getElementById('notification')

notification.addEventListener('click', function(event){
    event.preventDefault()

    let notification = new Notification('Minha notificacao', {
        body: 'Esta e uma notificacao',
        icon: path.join(__dirname, 'tray.png')
    })

    notification.onclick = function(){
        alert('Clicado com sucesso')
    }
})

Mousetrap.bind('up up down down left right t', function(){
    alert('WIN')
})