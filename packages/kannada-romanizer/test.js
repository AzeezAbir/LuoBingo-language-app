const { withRoman } = require('./index');

console.log("Testing whole string:");
console.log(withRoman("ಗಿಳಿ")); // Expected: ಗಿಳಿ(gili)
console.log(withRoman("ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ")); // Expected: ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ(naanu shaalege hoguttene)

console.log("\nTesting word-by-word:");
console.log(withRoman("ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ", true)); // Expected: ನಾನು(naanu) ಶಾಲೆಗೆ(shaalege) ಹೋಗುತ್ತೇನೆ(hoguttene)

console.log("\nTesting empty/invalid inputs:");
console.log(withRoman(""));
console.log(withRoman(null));
