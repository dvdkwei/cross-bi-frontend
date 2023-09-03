import { Color } from "@tremor/react"

type useColorsOptions = {
  quantity: number,
  shouldRandomize: boolean
}

export const useColors = (options?: useColorsOptions) => {
  const colors = [
    'blue', 'amber', 'cyan', 
    'violet', "slate", "pink", "rose",
    "red", "orange", "yellow",
    "lime", "green", "emerald",
    "teal", "cyan", "sky", "indigo",
    "violet", "purple", "fuchsia", 
  ] as Color[];

  if (options) {
    const optionisedColors: Color[] = [];
    if (options.shouldRandomize) {
      for (let i = 0; i < options.quantity; i++) {
        let newColor = colors[Math.floor(Math.random() * (colors.length - 1))];
        do {
          newColor = colors[Math.floor(Math.random() * (colors.length - 1))];
        } while (optionisedColors.includes(newColor))
        optionisedColors.push(newColor);
      }
    }
    return optionisedColors;
  }

  return colors;
}