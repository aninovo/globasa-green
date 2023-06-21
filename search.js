

/* tests */
/*
function simpleSearch(line, dictionary) {
    var words = separateWords(line);
    var words_found = [];
    var langs = ['glb','eng','spa','epo'];
    for (const word of words)
        for (const lang of langs)
            if (dictionary.index[lang][word])
                words_found.push({ headword: word, lang: lang});
    return words_found;
}

function smartSearch(line, dictionary, lang) {
    var words = separateWords(line);
    var words_found = [];
    var langs = ['glb', lang];
    for (const word of words)
        for (const lang of langs)
            if (dictionary.index[lang][word])
                words_found.push({ headword: word, lang: lang });
    return words_found;
}
*/

function smartSearch(line, dictionary) {
    const MAX = 250;
    var words = separateWords(line);
    var words_found = [];
    // var lang = 'glb'; -- not needed when searching in dictionary.words
    for (const word of words)
        for (var i = 0; i < word.length & i < MAX; i++) // start
            for (var j = i; j < word.length; j++)   // end
            {
                var sub = word.substring(i, j+1);
                // if (dictionary.index[lang][word]) -- use index to search in languages other than Globasa
                if (dictionary.words[sub])
                    words_found.push(sub);// root
                if (dictionary.words['-'+sub])
                    words_found.push('-'+sub);// suffix
                if (dictionary.words[sub+'-'])
                    words_found.push(sub+'-');// prefix
            }
    return words_found;
}

function foreignSearch(word, dictionary, lang) {
    var results = [];
    if (dictionary.index[lang] == null)
        return results;
    var i = dictionary.index[lang][word];
    if (i == null)
        return results;
    for (term in i) {
        if (dictionary.words[term])
            results.push(term);
    }
    return results;
}

function translationLookup(word, dictionary, lang) {
    if (dictionary.words[word] == null || dictionary.words[word].translation[lang] == null)
        return '?';
    return dictionary.words[word].translation[lang];
}

function partOfSpeechLookup(word, dictionary) {
    if (dictionary.words[word] == null || dictionary.words[word].wordClass == null) // null or undefined
        return '-';
    return dictionary.words[word].wordClass;
}

function separateWords(line) {
    return line.replace(',', ' ').replace('.', ' ').split(' ');
}
