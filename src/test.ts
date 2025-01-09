import colour from "cli-color";
import { Perlin, hash } from "./noise";
function test() {
    let failedTests: number = 0;
    let tests: number = 0;

    let testNoise: Perlin = new Perlin(hash(Date.now()));
    let testFailed: boolean = false;
    let lastNoise;
    let lastX, lastY;
    let x, y;
    let thisNoise, thisHash;
    for (let i = 0; i < 100; i++) {
        x = Math.floor(Math.random() * 100);
        y = Math.floor(Math.random() * 100);
        thisNoise = testNoise.noise(x, y);
        if (thisNoise === lastNoise && x !== lastX && y !== lastY) {
            testFailed = true;
            break;
        }
        lastNoise = thisNoise;
        lastX = x;
        lastY = y;
    }
    if (!testFailed) {
        console.log(`${colour.green("[•]")} Perlin Noise Test Succeeded!`);
    } else {
        console.log(`${colour.red("[X]")} Perlin Noise Test Failed - different generations (${x}, ${y} and ${lastX}, ${lastY}) give the same result (${thisNoise} and ${lastNoise})!`);
        failedTests++;
    }
    testFailed = false;
    tests++;
    let lastHash;
    for (let i = 0; i < 100; i++) {
        x = Math.floor(Math.random() * 100);
        y = Math.floor(Math.random() * 100);
        thisHash = hash(x, y);
        if (thisHash === lastHash && x !== lastX && y !== lastY) {
            testFailed = true;
            break;
        }
        lastHash = thisHash;
        lastX = x;
        lastY = y;
    }
    if (!testFailed) {
        console.log(`${colour.green("[•]")} Hash2 Test Succeeded!`);
    } else {
        console.log(`${colour.red("[X]")} Hash2 Test Failed - different hashes (${x}, ${y} and ${lastX}, ${lastY}) give the same result (${thisHash}, ${lastHash})!`);
        failedTests++;
    }
    testFailed = false;
    tests++;
    
    lastHash = -Infinity;
    for (let i = 0; i < 100; i++) {
        x = Math.floor(Math.random() * 100);
        thisHash = hash(x);
        if (thisHash === lastHash && x !== lastX) {
            testFailed = true;
            break;
        }
        lastHash = thisHash;
        lastX = x;
    }
    if (!testFailed) {
        console.log(`${colour.green("[•]")} Hash Test Succeeded!`);
    } else {
        console.log(`${colour.red("[X]")} Hash Test Failed - different hashes (${x} and ${lastX}) give the same result (${thisHash}, ${lastHash})!`);
        failedTests++;
    }
    testFailed = false;
    tests++;

    if (failedTests != 0) {
        console.log(colour.red(`Failed ${failedTests}/${tests} tests.`));
    } else {
        console.log(colour.green(`Succeeded all ${tests} tests.`));
    }
}
test();