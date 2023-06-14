import edge from 'electron-edge-js'
//const path = require('path')
const fs = require('fs')
const Store = require('electron-store')

var dllPath = 'E:\\Work\\meeting-notes\\MeetingNotes-App\\MeetingNotesClassLib.dll'

export class dotnetService {
    constructor() {
        if (fs.existsSync(dllPath)) {
            let getInstanceFunc = edge.func({
                assemblyFile: dllPath,
                typeName: 'MeetingNotesClassLib.Startup',
                methodName: 'GetInstance'
            })
    
            let payload = {
    
            }
    
            getInstanceFunc(payload, function(error, result) {
                console.log('Instance:' + result)
                this.Instance = result
            })
            this.dllPath = dllPath
        } else {
            this.Instance = null
            this.dllPath = null
        }
    }

    getInstance() {
        return this.Instance
    }

    stopRecorder() {
        let stopFunc = edge.func({
            assemblyFile: this.dllPath,
            typeName: 'MeetingNotesClassLib.Startup',
            methodName: 'Stop'
        })

        let payload = {

        }

        let res = null
        stopFunc(payload, function(error, result) {
            console.log('Stop:' + result)
            res = result
        })

        return res
    }

    screenCapture() {
        let screenFunc = edge.func({
            assemblyFile: this.dllPath,
            typeName: 'MeetingNotesClassLib.Startup',
            methodName: 'ScreenCapturePng'
        })

        const store = new Store()
        let payload = {
            savePath: store.get('savedir.tempDir')
        }

        let res = null
        screenFunc(payload, function(error, result) {
            console.log('screenFunc:' + result)
            res = result
        })

        return res
    }
}
