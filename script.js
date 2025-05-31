const bgm = document.getElementById('bgm');
const codec = document.getElementById('codec');
const dialogBox = document.getElementById('dialogBox');
const nextButton = document.getElementById('nextButton');
const voiceBars = document.getElementById('voiceBars');

const leftCharacter = document.getElementById('leftCharacter');
const rightCharacter = document.getElementById('rightCharacter');

// Simple conversation
const conversation = [
  { speaker: 'Snake', text: "Otacon, come in. Do you read me?" },
  { speaker: 'Otacon', text: "Loud and clear, Snake. What’s your status?" },
  { speaker: 'Snake', text: "I’ve infiltrated the base. I’ll begin the mission." },
  { speaker: 'Otacon', text: "Be careful. There are genome soldiers all over the place." },
  { speaker: 'Snake', text: "I’ve got a bad feeling about this..." },
  { speaker: 'Otacon', text: "Snake? Snake?! Snaaaake!" }
];

let currentLine = 0;

// Create voice bars
for (let i = 0; i < 20; i++) {
  const bar = document.createElement('div');
  voiceBars.appendChild(bar);
}

function typeWriter(text, i = 0) {
  if (i < text.length) {
    dialogBox.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 30);
  }
}

function showNextLine() {
  dialogBox.innerHTML = "";
  if (currentLine < conversation.length) {
    const line = conversation[currentLine];
    typeWriter(line.text);

    // Play codec sound
    codec.currentTime = 0;
    codec.play();

    // Switch character focus
    if (line.speaker === 'Snake') {
      leftCharacter.src = "snake.png";
      rightCharacter.src = "otacon.png";
    } else {
      leftCharacter.src = "otacon.png";
      rightCharacter.src = "snake.png";
    }

    currentLine++;
  } else {
    dialogBox.innerHTML = "End of transmission.";
    nextButton.disabled = true;
  }
}

nextButton.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
  }
  showNextLine();
});
