let apiKey = "K88041880488957";

// Wolfram alpha
let appid = "KUHEUJ-XVAHWYUTEQ";
let url = `http://api.wolframalpha.com/v1/simple?appid=${appid}&input=`;

search = "What+airplanes+are+flying+overhead";
ending = "%3F&background=333333&foreground=white";

urlFinal = `${url}${search}${ending}`;

const output = document.getElementById("output");

output.src = urlFinal;

Tesseract.recognize("text.png")
    .progress(function (message) {
        console.log(message);
    })
    .then(function (result) {
        console.log(result["text"]);
    });

function newImage() {
    newSearch = document.getElementById("search").value.replace(/\s/g, "+");
    newSearch = newSearch.replace(/\+/g, "%2B");
    urlFinal = `${url}${newSearch}${ending}`;
    console.log(urlFinal);
    output.src = urlFinal;
}

// FOR GETTING THE CAMERA STUFF
// Use p5js to get live feed (if you can do rear camera)
// Then save it as "text.png"
// Run the tesseract
// Create new url

let capture;
let canvas;

function setup() {
    canvas = createCanvas(480, 360);
    canvas.id('canvas');
    //capture = createCapture(VIDEO);
    options = {
        video: {
            facingMode: {
                exact: "environment"
            }
        }
    }
    capture = createCapture(options);
    capture.hide();
}

function takePhoto() {
    var imageURI = document.getElementById('canvas').toDataURL("image/jpg");
    Tesseract.recognize(imageURI)
        .progress(function (message) {
            console.log(message);
        })
        .then(function (result) {
            let text = result["text"];
            document.getElementById("search").value = text;
            console.log(result["text"]);
        });
}

function draw() {
    background(0);
    let img = copy(
        capture,
        0,
        0,
        40,
        40,
        0,
        0,
        width,
        (width * capture.height) / capture.width
    );
    image(img, 0, 0, width, height);
}
