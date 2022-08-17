import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const resizeDir: string = path.join(__dirname, '..', '..', 'resize')
const imageDir: string = path.join(__dirname, '..', '..', 'images')

const isResizeDirExits = (): boolean => {
  if (fs.existsSync(resizeDir)) {
    return true
  } else {
    return false
  }
}

const createResizeDir = (): boolean => {
  if (isResizeDirExits()) {
    return true
  } else {
    fs.mkdir(resizeDir, (err) => {
     // console.log(`[-] Error : ${err}`)
    })
    return createResizeDir()
  }
}

const isResizeFileExits = async (name: string, height: number, width: number): Promise<boolean> => {
  try {
    const imageResized: string = path.join(
      resizeDir,
      name.concat('_', height.toString(), '_', width.toString(), '.jpg')
    )
    const originalImage: string = path.join(imageDir, name.concat('.jpg'))

    if (fs.existsSync(imageResized)) {
      return true
    } else {
      if (
        await sharp(originalImage).resize({ height: height, width: width }).toFile(imageResized)
      ) {
        return true
      } else {
        return false
      }
    }
  } catch (err) {
    return false
  }
}

const resizeUtil = async (name: string, height: number, width: number): Promise<boolean> => {
  try {
    let isResized: boolean = await isResizeFileExits(name, height, width)

    if (createResizeDir()) {
      isResized = await isResizeFileExits(name, height, width)
      return isResized
    }

    return isResized
  } catch (err) {
   // console.log(` Error : ${err}`)
    return false
  }
}

export default resizeUtil
