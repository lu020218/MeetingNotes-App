'use strict'

import * as fs from 'fs'

function getImageFileBase64(imgPath)
{
    let imageData = fs.readFileSync(imgPath)
    let imageBase64 = imageData.toString("base64")
    let imagePrefix = 'data:image/png;base64,'

    return imagePrefix + imageBase64
}

function getScreentShotDirectory() {
    return 'E:\\Work\\meeting-notes'
}

function getNotesFromJson(filePath) {
    if (!fs.existsSync(filePath)) 
    {
        console.log('Notes json file is not exist')
        return
    }

    let data = fs.readFileSync(filePath, 'utf8')
    let notes = JSON.parse(data)

    return notes
}

function getImageDataURL(imagePath) {
    let imageData = fs.readFileSync(imagePath)
    let blob = new Blob(imageData, "image/png")
    let reader = new FileReader()
    let dataURL = ''
    reader.readAsDataURL(blob)
    reader.onload = function() {
        var windowURL = window.URL || window.webkitURL
        dataURL = windowURL.createObjectURL(blob)
    }
    return dataURL
}

export const getNotes = getNotesFromJson
export const getScreentShotDir = getScreentShotDirectory
export const getImageBase64 = getImageFileBase64
export const getImageURL = getImageDataURL