'use strict'

const officegen = require('officegen')
import * as fs from 'fs'
import path from 'path'


function createOfficeWord(filepath, data) {
    console.log('data:' + data)
    let docx = officegen('docx')

    docx.on('finalize', function(written) {
        console.log('Finished to create a Microsoft Word document.')
    })

    docx.on('error', function(err) {
        console.log('create word doc failed:' + err)
    })
    if (data == null || data.length == 0) {
        return
    }
    
    let pObj = docx.createP()
    pObj.addText('会议笔记', { bold: true, font_face: 'Arial', font_size: 18 })
    pObj.addLineBreak()

    data.forEach(element => {
        if (element == null) {
            return
        }
        element.text.forEach(function(text) {
            pObj = docx.createP()
            if (text.txt.length > 0) {
                pObj.addText(text.txt)
                pObj.addLineBreak()
            }
            
            if (text.note.length > 0) {
                pObj.addText(text.note, {color: 'fd2d2d'})
            }
        })
        if (element.image.length > 0) {
            pObj = docx.createP()
            pObj.addImage(element.image)
            pObj.addLineBreak()
        }
    })

    let d_t = new Date()
    let now = d_t.getFullYear() + d_t.getMonth() + d_t.getMonth() + d_t.getHours() + d_t.getMinutes() + d_t.getSeconds()
    filepath = path.join(filepath, `meeting_notes_${now}.docx`)
    let out = fs.createWriteStream(filepath)

    out.on('error', function(err) {
        console.log('write word file failed:' + err)
    })
    docx.generate(out)
}

export const exportWord = createOfficeWord