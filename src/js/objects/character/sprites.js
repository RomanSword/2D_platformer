import rightRunSprite from '../../../images/character/right/run.png'
import rightRunStartSprite from '../../../images/character/right/runStart.png'
import rightStandSprite from '../../../images/character/right/stand.png'

import leftRunSprite from '../../../images/character/left/run.png'
import leftRunStartSprite from '../../../images/character/left/runStart.png'
import leftStandSprite from '../../../images/character/left/stand.png'

import { getImage } from '../../utils'

const scaleMultiplier = 1.5

const standConfig = {
  scaleMultiplier,
  name: 'stand',
  width: 29.55,
  fpms: 40,
  lastReverseFrame: null
}

const runStartConfig = {
  scaleMultiplier,
  name: 'runStart',
  width: 50,
  fpms: 3,
  lastReverseFrame: 8
}

const runConfig = {
  scaleMultiplier,
  name: 'run',
  width: 57.5,
  fpms: 3,
  lastReverseFrame: null
}

const processImage = async ({ config, image }) => {
  const uploadedImage = await getImage(image)
  const frames = parseInt(uploadedImage.width / config.width) - 1

  return { ...config, image: uploadedImage, frames }
}

export default async () => {
  return {
    right: {
      run: await processImage({ config: runConfig, image: rightRunSprite }),
      runStart: await processImage({ config: runStartConfig, image: rightRunStartSprite }),
      stand: await processImage({ config: standConfig, image: rightStandSprite })
    },
    left: {
      run: await processImage({ config: runConfig, image: leftRunSprite }),
      runStart: await processImage({ config: runStartConfig, image: leftRunStartSprite }),
      stand: await processImage({ config: standConfig, image: leftStandSprite })
    }
  }
}
