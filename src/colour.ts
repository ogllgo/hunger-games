import { Colour } from "./utils";

function generateDistinctColors(numColors: number): Colour[] {
    const colors: Colour[] = [];
    const randomSeed = Math.floor(Math.random() * 360);
    for (let i = 0; i < numColors; i++) {
        const hue = (i * (50 * randomSeed / numColors) + randomSeed) % 360;  // Distribute hue evenly around the color wheel
        const col = new Colour(0, 0, 0);
        const saturation = 60 + (Math.random() * 40);
        const lightness = 50 + (Math.random() * 30); 
        const hueOffset = Math.floor(Math.random() * 10);
        col.setHSL((hue + hueOffset) % 360, saturation, lightness);
        colors.push(col);
    }

    return colors;
}

async function colour() {
    let colours: Colour[] = generateDistinctColors(20);
    console.log(`Colours: ${colours.map(ele => ele.text(ele.getHex().slice(0, 7)))}`);
    
}
colour();