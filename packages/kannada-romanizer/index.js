import Sanscript from '@indic-transliteration/sanscript';

const KANNADA_REGEX = /[\u0C80-\u0CFF]/;

/**
 * Appends Romanized English next to Kannada text.
 * @param {string} text - The Kannada text (e.g., "ಗಿಳಿ")
 * @param {boolean} wordByWord - If true, appends translation next to each word.
 * @returns {string} - Formatted string: "ಗಿಳಿ(gili)"
 */
export function withRoman(text, wordByWord = false) {
    if (!text || typeof text !== 'string') return "";

    // If there is no Kannada script in the text, return as is.
    if (!KANNADA_REGEX.test(text)) {
        return text;
    }

    const hasEnglish = /[a-zA-Z]/.test(text);

    if (wordByWord || hasEnglish) {
        // Mixed text: Inline replace only Kannada words
        return text.replace(/[\u0C80-\u0CFF]+/g, (match) => {
            const roman = Sanscript.t(match, 'kannada', 'itrans').toLowerCase();
            return `${match}(${roman})`;
        });
    }

    // Pure Kannada string: Transliterate the entire string at once
    const romanized = Sanscript.t(text, 'kannada', 'itrans').toLowerCase();
    return `${text}(${romanized})`;
}

