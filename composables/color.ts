export const generateContrast = (color : string) => {
  const [r, g, b] = color.match(/.{2}/g) || ['0', '0', '0']
  const brightness = Math.round((
      parseInt(parseInt(r, 16).toString(10), 10) * 299
    + parseInt(parseInt(g, 16).toString(10), 10) * 587
    + parseInt(parseInt(b, 16).toString(10), 10) * 114
  ) / 1000)

  const lightColor = Math.round((255 * 299 + 255 * 587 + 255 * 114) / 1000)

  return Math.abs(brightness) < (lightColor / 2) ? '#ffffff' : '#000000'
}

export const hexToRgb = (hex : string) : [r : number, g : number, b : number] => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : [0, 0, 0]
}

export const generateColors = (color: string, shades: number[]) => {
  let useColor = color.replace('#', '')
  return sortShades(shades).map(shade => {
    if (shade === 0) return {
      color: `#${useColor}`, contrast: generateContrast(useColor),
    }

    let additionalColor = 0xff
    let calc = 1 / 100 * shade

    if (shade < 0) {
      additionalColor = 0x00
      calc = -calc
    }

    useColor = useColor.trim().replace('#', '')
    useColor = useColor.length === 6 ? useColor : [...useColor].reduce((all, current) => all + current + current, '')

    const regex = new RegExp(`.{${useColor.length / 3}}`, 'g')
    const rgb = useColor.match(regex) || []
    const rgbCalc = rgb.map(rgbColor => {
      const calculated = Math.round(additionalColor * calc + parseInt(rgbColor, 16) * (1 - calc)).toString(16)
      return calculated.padStart(2, '0')
    })

    const fullColor = rgbCalc.join('')
    const contrast = generateContrast(fullColor)
    return {color: `#${fullColor}`, contrast}
  })
}

export const getShadesWithZero = (shades : number[]) => {
  const newShades = [...shades]
  newShades.push(0)
  return sortShades(newShades)
}

export const sortShades = (shades: number[]) => shades.toSorted((a, b) => a - b)

export const getShadeName = (shade : number) => {
  if (shade === 0) {
    return 'Base'
  }
  return shade > 0 ? `l-${shade}` : `d-${Math.abs(shade)}`
}

const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928
      ? v / 12.92
      : ((v + 0.055) / 1.055) ** 2.4
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

const calculateRatio = (color1: string, color2: string) : number => {
  // calculate the relative luminance
  const [luminance1, luminance2] = [luminance(...hexToRgb(color1)), luminance(...hexToRgb(color2))]

  // calculate the color contrast ratio
  const [bigger, smaller] = luminance1 > luminance2 ? [luminance1, luminance2] : [luminance2, luminance1]
  return (smaller + 0.05) / (bigger + 0.05)
}

type CheckComplianceReturnType = [string, boolean][]

export const checkCompliance = (color1: string, color2: string) : CheckComplianceReturnType => {
  const ratio = calculateRatio(color1, color2)
  return [
    ['AA Normal', ratio < 1 / 4],
    ['AAA Normal', ratio < 1 / 7],
    ['AA Large', ratio < 1 / 3],
    ['AAA Large', ratio < 1 / 4.5],
  ]
}

export const isHex = (color: string) : boolean => {
  const noHash = color.replace('#', '')
  if (![3, 6].includes(color.length)) {
    return false
  }
  return (parseInt(noHash, 16).toString(16) === noHash.toLowerCase())
}
