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

export const getNotes = getNotesFromJson
export const getScreentShotDir = getScreentShotDirectory
export const getImageBase64 = getImageFileBase64