const edge = require('edge')
const path = require('path')
const fs = require('fs')

var dllPath = path.join('E:\\Work\\meeting-notes\\MeetingNotes-App', 'MeetingNotesClassLib.dll')

var dotnetFunction = null

if (fs.existsSync(dllPath)) {
    // 1. use defalut mode
    dotnetFunction = edge.func(dllPath)
}
else {
    console.log('dll path does not exist')
}

exports.add = function (parameter) {
     if (dotnetFunction !== null) {
         return dotnetFunction(parameter, true)
     } else {
         return 'dotnetFunction is null'
     }
 }