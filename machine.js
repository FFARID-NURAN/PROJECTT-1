
$(document).ready(function () {
    let  green= true;
    const str = 'quote';
    let nextChar = 0;

    let blinkId, 
        typeId,
        quotesData,
        currentQuote,
        currentAuthor;

    // set up initial quote
    $('#tweet-quote').attr(
          'href',
          'https://twitter.com/intent/tweet?hashtags=quotes&related=kimjisena&text=' +
            encodeURIComponent('"If you expect to continue learning all your life, you will be teaching yourself much of the time." ' + '-- ' + 'Richard Hamming')
    );

    function getQuotes() {
        return $.ajax({
            headers: {
            Accept: 'application/json'
            },
            url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            success: function (data) {
        if (typeof data === 'string') {
          quotesData = JSON.parse(data);
        }
      }
    });
    }

    function getRandomQuote () {
        return quotesData.quotes[
          Math.floor(Math.random() * quotesData.quotes.length)
        ];
    }

    function getQuote () {
        let randomQuote = getRandomQuote();
      
        currentQuote = randomQuote.quote;
        currentAuthor = randomQuote.author;
      
        $('#tweet-quote').attr(
          'href',
          'https://twitter.com/intent/tweet?hashtags=quotes&related=kimjisena&text=' +
            encodeURIComponent('"' + currentQuote + '" ' + '-- ' + currentAuthor)
        );
    }

    function displayQuote () {
        getQuote();
        console.log('displaying quote...');

        $("#text code").text(
            '"'+ currentQuote + '"'
        );
        $('#author code').text(
            '-- ' + currentAuthor
        );
    }

    function blink () {
        let color =  green ? '#0f0' : '#000';
        green = !green;

        $('.prompt-string.bottom code #cursor').css({
            color,
            backgroundColor: color
        });
    }

    function type () {
        clearInterval(blinkId); // stop blinking, we're typing

        // make sure cursor is visible while we type
        $('.prompt-string.bottom code #cursor').css({
            color: '#0f0',
            backgroundColor: '#0f0'
        });

        if (nextChar < 5) {
            $('.prompt-string.bottom code #prompt').text(
                $('.prompt-string.bottom code #prompt').text() + str[nextChar]
            );

            nextChar++;
            return;
        }
        clearInterval(typeId); // done typing
        displayQuote(); // display new quote
        $('.prompt-string.bottom code #prompt').text('[user@wisdom ~]$ '); // restore prompt string
        nextChar = 0; // get ready to type again
        blinkId = setInterval(blink, 500); // ok, you can blink now
    }

    $('#new-quote').click(() => {
        typeId = setInterval(type, 150);
    });

    blinkId = setInterval(blink, 500);

    getQuotes();
});


