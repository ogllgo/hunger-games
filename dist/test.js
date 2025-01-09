"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_color_1 = __importDefault(require("cli-color"));
const noise_1 = require("./noise");
function test() {
    let failedTests = 0;
    let tests = 0;
    let testNoise = new noise_1.Perlin((0, noise_1.hash)(Date.now()));
    let testFailed = false;
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
        console.log(`${cli_color_1.default.green("[•]")} Perlin Noise Test Succeeded!`);
    }
    else {
        console.log(`${cli_color_1.default.red("[X]")} Perlin Noise Test Failed - different generations (${x}, ${y} and ${lastX}, ${lastY}) give the same result (${thisNoise} and ${lastNoise})!`);
        failedTests++;
    }
    testFailed = false;
    tests++;
    let lastHash;
    for (let i = 0; i < 100; i++) {
        x = Math.floor(Math.random() * 100);
        y = Math.floor(Math.random() * 100);
        thisHash = (0, noise_1.hash)(x, y);
        if (thisHash === lastHash && x !== lastX && y !== lastY) {
            testFailed = true;
            break;
        }
        lastHash = thisHash;
        lastX = x;
        lastY = y;
    }
    if (!testFailed) {
        console.log(`${cli_color_1.default.green("[•]")} Hash2 Test Succeeded!`);
    }
    else {
        console.log(`${cli_color_1.default.red("[X]")} Hash2 Test Failed - different hashes (${x}, ${y} and ${lastX}, ${lastY}) give the same result (${thisHash}, ${lastHash})!`);
        failedTests++;
    }
    testFailed = false;
    tests++;
    lastHash = -Infinity;
    for (let i = 0; i < 100; i++) {
        x = Math.floor(Math.random() * 100);
        thisHash = (0, noise_1.hash)(x);
        if (thisHash === lastHash && x !== lastX) {
            testFailed = true;
            break;
        }
        lastHash = thisHash;
        lastX = x;
    }
    if (!testFailed) {
        console.log(`${cli_color_1.default.green("[•]")} Hash Test Succeeded!`);
    }
    else {
        console.log(`${cli_color_1.default.red("[X]")} Hash Test Failed - different hashes (${x} and ${lastX}) give the same result (${thisHash}, ${lastHash})!`);
        failedTests++;
    }
    testFailed = false;
    tests++;
    if (failedTests != 0) {
        console.log(cli_color_1.default.red(`Failed ${failedTests}/${tests} tests.`));
    }
    else {
        console.log(cli_color_1.default.green(`Succeeded all ${tests} tests.`));
    }
}
test();
//# sourceMappingURL=test.js.map