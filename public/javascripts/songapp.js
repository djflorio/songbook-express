var song = {
    title: "Javasong",
    author: "Dan Florio",
    content: {
        sections: [
            {
                lines: [
                    {
                        wordblocks: [
                            {
                                chord: "G",
                                word: "I"
                            },
                            {
                                chord: "Am",
                                word: "am"
                            },
                            {
                                chord: "F",
                                word: "cool"
                            }
                        ]
                    },
                    {
                        wordblocks: [
                            {
                                chord: "C",
                                word: "You"
                            },
                            {
                                chord: "",
                                word: "are"
                            },
                            {
                                chord: "",
                                word: "not"
                            }
                        ]
                    }
                ]
            },
            {
                lines: [
                    {
                        wordblocks: [
                            {
                                chord: "G",
                                word: "He"
                            },
                            {
                                chord: "Am",
                                word: "is"
                            },
                            {
                                chord: "F",
                                word: "really"
                            },
                            {
                                chord: "",
                                word: "cool"
                            }
                        ]
                    },
                    {
                        wordblocks: [
                            {
                                chord: "C",
                                word: "You"
                            },
                            {
                                chord: "",
                                word: "are"
                            },
                            {
                                chord: "",
                                word: "not"
                            }
                        ]
                    }
                ]
            }
        ]
        
    }
};

$(document).ready(function() {
    
    populateSong();
    
    $(document).on("keydown", ".wordblock__word", function(e) {
        switch(e.keyCode) {
            case 32:
                e.preventDefault();
                var loc = $(this).attr("id");
                var word = $(this).text();
                addWordBlock(loc, word);
                break;
        }
    });
    
});

function addWordBlock(loc, word) {
    locArray = loc.split("-");
    var sIndex = locArray[1];
    var lIndex = locArray[2];
    var wIndex = locArray[3];
    
    var line = song.content.sections[sIndex].lines[lIndex];
    line.wordblocks.splice(parseInt(wIndex) + 1, 0, {
        chord: "",
        word: ""
    });
    var nextWord = '#w-' + sIndex + '-' + lIndex + '-' + (parseInt(wIndex) + 1);
    
    updateWord(loc, word);
    populateSong();

    $(nextWord).focus();
}

function updateWord(loc, word) {
    loc = loc.split("-");
    var sIndex = loc[1];
    var lIndex = loc[2];
    var wIndex = loc[3];
    
    song.content.sections[sIndex].lines[lIndex].wordblocks[wIndex].word = word;
}

function populateSong() {
    
    var toAdd = '';
    var sections = song.content.sections;
    
    for (var i = 0; i < sections.length; i++) {
        toAdd += '<div id="s' + i + '" class="song-section">'
        var lines = sections[i].lines;
        for (var j = 0; j < lines.length; j++) {
            var wordblocks = lines[j].wordblocks;
            for (var k = 0; k < wordblocks.length; k++) {
                toAdd += '<span class="wordblock">';
                toAdd += '<span id="c-' + i + '-' + j + '-' + k + '" class="wordblock__chord" contenteditable>' + wordblocks[k].chord + '</span>';
                toAdd += '<span id="w-' + i + '-' + j + '-' + k + '" class="wordblock__word" contenteditable>' + wordblocks[k].word + '</span>';
                toAdd += '</span>';
            }
            toAdd += '<br>';
        }
        toAdd += '</div>';
    }
    
    
    $('#paper__content').html(toAdd);
}