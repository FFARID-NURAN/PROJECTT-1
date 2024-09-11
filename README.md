<!DOCTYPE html>
<html lang="en" {IF CLASSES}class="classes"{/IF}>
<html lang="en-US">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Random Quote Machine</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        <link href="./styles.css" rel="stylesheet" />
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="./index.js"></script>
    </head>
    <body>
        <div class="container">
            <h1 class="text-center"><code>Random Quote Machine</code></h1>
            <div class="flex">
                <div id="quote-box">
                    <p class="prompt-string top"><code>[user@wisdom ~]$ quote</code></p>
                    <div class="stdout">
                            <div id="text">
                                <code>&quot;If you expect to continue learning all your life, you will be teaching yourself much of the time.&quot;</code>
                            </div>
                        <div id="author"><code>-- Richard Hamming</code></div>
                    </div>
                    <p class="prompt-string bottom"><code><span id="prompt">[user@wisdom ~]$ </span><span id="cursor">I</span></code></p>
                    <div class="clickable">
                        <a id="tweet-quote" href="https://twitter.com/intent/tweet">
                            <div class="twitter-icon">
                                [<i class="fab fa-twitter"></i>]
                            </div>
                        </a>
                        <button id="new-quote"><code>[NEW QUOTE]</code></button>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </body>
</html>



* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
  font-family: 'Roboto', sans-serif;
}

body {
  width: 100%;
  background-color: black;
  color: rgb(0, 255, 0);
}

.container {
  width: 100%;
}

h1 {
  margin-top: 1rem;
  text-align: center;
  font-size: 4rem;
}

.flex {
  display: flex;
  justify-content: center;
  margin-top: 20vh;
  font-size: 2rem;
}

#quote-box {
  width: 40rem;
}

#author {
  margin-right: 1rem;
  text-align: right;
}

.prompt-string.bottom code span#cursor {
  background-color: rgb(0, 255, 0);
}

.clickable {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  font-size: 3rem;
  color: white;
}

.clickable a {
  background-color: rgb(0, 255, 0);
  color: black;
  width: 6rem;
  text-align: center;
}

#new-quote {
  border: 0;
  background-color: rgb(0, 255, 0);
  font-weight: bold;
}

.clickable a:hover, #new-quote:hover {
  background-color: green;
  cursor: pointer;
}




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


















