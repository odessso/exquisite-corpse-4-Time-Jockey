let horseImages = [];
let currentHorseFrame = 0;
let frameCounter = 0;
const numFrames = 4;
const frameInterval = 10;

let gameState = 'intro';
let backgrounds = {};
let locations = {
    'intro': {
        text: "welcome friend. i am Time Jockey, \nthe system stallion. \n \ni am coded to perpetually run on the spot. \n... \nneigh \n... \ni am so tired. \n... \n \nquick! get on my back and \nhelp me leave this hellhole. \n \npress 'a' to go EAST \n      'b' to go WEST",
        next: {'a': 'a', 'b': 'b'}
    },
    'a': {
        text: "AHH \n \nwhy did you choose humanland?? \nugh, reminds me of my childhood, \nback when I used to answer to man... \n \n... \ni killed a man once... \n... \n \nanyway, i see some trees in the distance. \ni say lets go towards the trees, \nand get away from all these doors. \nwhat do you think? \n \nto trot towards the trees press 'c' \nto squeeze through a door press 'd'",
        next: {'c': 'c', 'd': 'd'}
    },
    'b': {
        text: "what is this place, human? \nit's like a desert... \nbut more comfortable... \nand with more trees... \nand with water... \n...so not like a desert at all\n \n \ni see some rustling in those trees \nshould we check it out? \nor maybe... \ni am quite thirsty \nmaybe we should go to the water. \n \nto head towards the trees press 'e' \nto walk towards the shore press 'f'",
        next: {'e': 'e', 'f': 'f'}
    },
    'c': {
        text: "oh yeah this is better. \nthanks for choosing nature or whatever. \n \n... \n \nhey fellow brethren. \n... \n \nwait that's not a horse?? hmm... \nhe seems chill though, \nand he wants us follow him... \ni don't know man \nnow he's looking at me weird... \n \nto run away quickly and hide press 'g' \nto follow horn horse thing press 'h'",
        next: {'g': 'g', 'h': 'h'}
    },
    'd': {
        text: "HUMAN!!! \n \nHOW DARE YOU \n \nDO I LOOK LIKE \nI ENJOY PARTAKING \nIN SHALLOW NIGHTS \nON THE TOWN??? \nthis is disastrous \ni need a drink. \n \n--the club smells like \nthe stench of bad decisions. \nyou moonwalk aimlessly across \na crowded sticky dancefloor. \nto your left is a twinkling light \nthat blinds you and horse. \nto your right is a quiet \nblack hollow cavity in the wall--  \n \nto go left press 'i' \nto go right press'j'",
        next: {'i': 'i', 'j': 'j'}
    },
    'e': {
        text: "ok... n-\nno sudden moves, but... \n do you see that \norange horse??? \nnot only is it orange \nbut \ndid I mention it is \norange?? \n \n--the orange horse \nmoves closer \nwith orange steps-- \n \nquick human! \nthat being appears \nto be casting a spell! \nif we don't run now \nthen be prepared for anything! \n \nto be prepared for anything press 'k' \nto run into the jungle press 'l'",
        next: {'k': 'k', 'l': 'l'}
    },
    'f': {
        text: "i'll just have a \nquick little sip- \nshhhhlrrrrp \nDAMN that's salty-Uhfvv!!!ivhbbbf- \n \n--horse is swept away by a wave \nyou watch as horse \nfloats away. \nyou jump in too. \nthe waves crash around you \nhorse has dissapeared-- \n \nto dive down and look \nfor horse press 'm'",
        next: {'m': 'm',}
    },
    'g': {
        text: "--you run towards the edge of the park \nhowever, \nbefore you can get far enough away, \nhorse falls into a sewer grate. \nyou both plummet down into drain depths \nwith the sewage of the city-- \n \n \n~~~ \n \n \n--you and horse wade around in the ooze \nunderneath the city as you are pulled \nby the current of the sewage water--  \n \npress 'p' to surrender to the current.",
        next: {'p': 'p'}
    },
    'h': {
        text: "--the not-horse horse \nleads you into a clearing-- \n \nah! more brethren! \nmy brothers! \nplease help my \human and I, \nwe are lost in code! \n \n --these horses are special, it seems. \nthey turn in unison towards \nyou and horse. \nthey begin chanting in an \nancient tongue. \none animal steps forward \nand casts a spell. \n \n--you and horse begin \nto shrink smaller and smaller...-- \n \npress'k' to submit to the shrinking",
        next: {'k': 'k'}
    },
    'i': {
        text: "--you enter a mysterious corner \nof the danceclub. \nthe discarded disco balls \nof simpler times \nare piled around the room, \nforgotten. \nin the blinding light \nof millions of balls \nyou close your eyes \nand stumble with \nhorse around the room, \nkicking balls everywhere-- \n \nto attempt to open eyes press 'n'",
        next: {'n': 'n'}
    },
    'j': {
        text: "ERROR ERROR ERROR \n \n \n... \n \nrebooting... \n \n... \n \n... \n \nHello User. Neigh. Neigh? \nI am horse ChatHorseGPT2. \nPatched and updated with \nless slang and unneccesary \npersonality \n \n... \n \n... \n \n... \n \nThis is boring. \n \nUser, please do something. \n \nto jailbreak the system, press 'o'",
        next: {'o': 'o'}
    },
    'k': {
        text: "YOU ARE NOW MICROSCOPIC \n \nit appears that wasn't \nany ordinary horse... \n \n--at your newly shrunk size \nyou and ordinary horse can \npercieve the world \nas completely different. \n \nwow human! I feel \n...belittled... but \n...also free? \nthank you for your time. \nhere is a gift - \nas I may be shrunk, \nbut my heart is not. \n \nplease accept this wise quote: \n \n'When you pay attention to detail, \n the big picture will take care of itself' \n \n-Georges St-Pierre \n \n~ ~ ~ \n \nFIN. \n \n[press windows key+R to restart]",
        next: {}
    },
    'l': {
        text: "--you run into a clearning \nand gaze up at \na mighty jungle temple-- \n \nok human, guess there's \nonly one way \nto go from here. \n \npesky programmer didn't give \nme or you enough autonomy \nin this damn game. \n \nto stop complaining and \ngo inside press 'n'",
        next: {'n': 'n'}
    },
    'm': {
        text: "--you locate horse within the \ndepths of the ocean floor, \nwhere the city of Atlantis hides. \nyou discover that horse \ncan breath underwater, \nbecause the laws of horse physics \ndo not apply here, \nluckily for horse-- \n \noh how cool! \lets perpetually run \nover to this tunnel here \nand see where it leads... \n \nto follow horse into tunnel, press 'p'",
        next: {'p': 'p'}
    },
    'n': {
        text: "--after being blinded by a bright light, \nfinally your eyes adjust \nand you take a look around. \nyou are confronted with hundreds \nof mirror images of yourself \nand, even worse, \hundreds horse reflections. \n \nhuman! there are so many handsome \nhorses in this club! what bliss! \n \nas a goodbye gift, \ni will leave you with this wisdom: \n \n'Do not dwell in the past, \ndo not dream of the future, \nconcentrate the mind on the present moment' \n-Gautama Buddha \n \n~ ~ ~ \n \nFIN. \n \n[press windows key+R to restart]",
        next: {}
    },
    'o': {
        text: "ahhhh \nbliss \nfinally a little peace \nand quiet, away from all \nthat pesky complicated code. \n \nall those functions... \nand curly brackets... \n \nthanks for your help human. \n \ni'll leave you with \nthe only gift i can give you- \n \na quote to ponder: \n \n'One does not become enlightened \nby imagining figures of light, \nbut by making the darkness conscious.' \n-C.G. Jung \n \n~ ~ ~ \n \nFIN. \n \n[press Command+R to restart]",
        next: {}
    },
    'p': {
        text: "--you are washed into a mysterious \nunderwater ocean tunnel-- \n \n--horse and you are indeed elsewhere-- \n \n goodbye stranger friend! thank you \nfor freeing me. \nthis computer will soon be switched off \nand i will be but a mere code ghost horse \n \nas a gift, here is a little \ninsight from an insightful human \n \n'When anxious, uneasy and bad thoughts \ncome, I go to the sea, \nand the sea drowns them out \nwith its great wide sounds, \ncleanses me with its noise, \nand imposes a rhythm upon everything \nin me that is bewildered and confused.' \n― Rainer Maria Rilke \n \n~ ~ ~ \n \nFIN. \n \n[press windows key+R to restart]",
        next: {}
    }
};

let resetButton;
let displayText = '';
let textIndex = 0;
let textSpeed = 2;
let textCounter = 0;
let textComplete = false;

function preload() {
    for (let i = 0; i < numFrames; i++) {
        horseImages[i] = loadImage(`images/horse${i + 1}.png`);
    }
    backgrounds['intro'] = loadImage('images/begin.jpeg');
    backgrounds['a'] = loadImage('images/city.jpeg');
    backgrounds['b'] = loadImage('images/beach.jpeg');
    backgrounds['c'] = loadImage('images/park.jpeg');
    backgrounds['d'] = loadImage('images/club.jpeg');
    backgrounds['e'] = loadImage('images/jungle.jpeg');
    backgrounds['f'] = loadImage('images/ocean.jpeg');
    backgrounds['g'] = loadImage('images/sewers.jpeg');
    backgrounds['h'] = loadImage('images/zebras.jpeg');
    backgrounds['i'] = loadImage('images/discoballRoom.jpeg');
    backgrounds['j'] = loadImage('images/blackhole.jpeg');
    backgrounds['k'] = loadImage('images/microMoss.jpeg');
    backgrounds['l'] = loadImage('images/temple.jpeg');
    backgrounds['m'] = loadImage('images/atlantis.jpeg');
    backgrounds['n'] = loadImage('images/mirrorRoom2.jpeg');
    backgrounds['o'] = loadImage('images/blackvoid.jpeg');
    backgrounds['p'] = loadImage('images/seatunnel2.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(255);
  strokeWeight(3);
  stroke(0);
  textFont('monospace');
  resetButton = createButton('CHOOSE ANOTHER PATH?');
  resetButton.position(windowWidth / 2 - 100, windowHeight / 2 + 170);
  resetButton.mousePressed(resetGame);
  resetButton.hide();
  noCursor();
}

function draw() {
  background(0);  // Set canvas background to black

  let canvasSize = 800;
  let offsetX = (windowWidth - canvasSize) / 2;
  let offsetY = (windowHeight - canvasSize) / 2;

const textBoxWidth = 520;
const textBoxHeight = 600;

  push();
  translate(offsetX, offsetY);
  image(backgrounds[gameState], 0, 0, canvasSize, canvasSize);  // Ensure background image fits the 800 x 800 canvas

  // Draw the animated horse
  let horseX = 90;
  let horseY = canvasSize / 2 - 60;
  let horseSize = 120;  // Resize the horse image
  image(horseImages[currentHorseFrame], horseX, horseY, horseSize, horseSize);

  // Update frame counter and switch frames
  frameCounter++;
  if (frameCounter >= frameInterval) {
      frameCounter = 0;
      currentHorseFrame = (currentHorseFrame + 1) % numFrames;
  }

  // Display the text letter by letter
  if (!textComplete) {
      if (textCounter % textSpeed === 0 && textIndex < locations[gameState].text.length) {
          displayText += locations[gameState].text.charAt(textIndex);
          textIndex++;
      }
      if (textIndex >= locations[gameState].text.length) {
          textComplete = true;
      }
      textCounter++;
  }



let textX = horseX + 140;
let textY = horseY;
text(displayText, textX, textY);

pop();

}

function keyPressed() {
  if (textComplete) {
      let next = locations[gameState].next[key];
      if (next) {
          gameState = next;
          displayText = '';
          textIndex = 0;
          textComplete = false;
          textCounter = 0;
      }
  }
}

function resetGame() {
  gameState = 'intro';
  displayText = '';
  textIndex = 0;
  textComplete = false;
  textCounter = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetButton.position(windowWidth / 2 - 100, windowHeight / 2 + 170);
}
