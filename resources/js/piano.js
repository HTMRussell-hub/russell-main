// Setup Audio Context for sound synthesis
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const noteFrequencies = {
  'C': 261.63,
  'C#': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'A': 440.00,
  'A#': 466.16,
  'B': 493.88,
  'HIGH-C': 523.25
};

function playTone(noteName) {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const freq = noteFrequencies[noteName] || 440;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.8);
}

// The keys and notes variables store the piano keys
const keys = ['c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key', 'high-c-key', 'c-sharp-key', 'd-sharp-key', 'f-sharp-key', 'g-sharp-key', 'a-sharp-key'];
const notes = [];
keys.forEach(function(key){
  notes.push(document.getElementById(key));
});

let lastLyric = document.getElementById('column-optional');

// Define song lines, expected sequences, and lyrics layout changes
const songLines = [
  {
    // Line 1: G G A G C B
    expected: ['G', 'G', 'A', 'G', 'C', 'B'],
    apply: function() {
      document.getElementById('word-one').innerHTML = 'HAP-';
      document.getElementById('letter-note-one').innerHTML = 'G';
      document.getElementById('word-two').innerHTML = 'PY';
      document.getElementById('letter-note-two').innerHTML = 'G';
      document.getElementById('word-three').innerHTML = 'BIRTH-';
      document.getElementById('letter-note-three').innerHTML = 'A';
      document.getElementById('word-four').innerHTML = 'DAY';
      document.getElementById('letter-note-four').innerHTML = 'G';
      document.getElementById('word-five').innerHTML = 'TO';
      document.getElementById('letter-note-five').innerHTML = 'C';
      document.getElementById('word-six').innerHTML = 'YOU';
      document.getElementById('letter-note-six').innerHTML = 'B';
      lastLyric.style.display = 'none';
    }
  },
  {
    // Line 2: G G A G D C
    expected: ['G', 'G', 'A', 'G', 'D', 'C'],
    apply: function() {
      document.getElementById('word-one').innerHTML = 'HAP-';
      document.getElementById('letter-note-one').innerHTML = 'G';
      document.getElementById('word-two').innerHTML = 'PY';
      document.getElementById('letter-note-two').innerHTML = 'G';
      document.getElementById('word-three').innerHTML = 'BIRTH-';
      document.getElementById('letter-note-three').innerHTML = 'A';
      document.getElementById('word-four').innerHTML = 'DAY';
      document.getElementById('letter-note-four').innerHTML = 'G';
      document.getElementById('word-five').innerHTML = 'TO';
      document.getElementById('letter-note-five').innerHTML = 'D';
      document.getElementById('word-six').innerHTML = 'YOU';
      document.getElementById('letter-note-six').innerHTML = 'C';
      lastLyric.style.display = 'none';
    }
  },
  {
    // Line 3: G G G E C B A
    expected: ['G', 'G', 'G', 'E', 'C', 'B', 'A'],
    apply: function() {
      document.getElementById('word-one').innerHTML = 'HAP-';
      document.getElementById('letter-note-one').innerHTML = 'G';
      document.getElementById('word-two').innerHTML = 'PY';
      document.getElementById('letter-note-two').innerHTML = 'G';
      document.getElementById('word-three').innerHTML = 'BIRTH-';
      document.getElementById('letter-note-three').innerHTML = 'G';
      document.getElementById('word-four').innerHTML = 'DAY';
      document.getElementById('letter-note-four').innerHTML = 'E';
      document.getElementById('word-five').innerHTML = 'DEAR';
      document.getElementById('letter-note-five').innerHTML = 'C';
      document.getElementById('word-six').innerHTML = 'TRA-';
      document.getElementById('letter-note-six').innerHTML = 'B';
      lastLyric.style.display = 'inline-block';
      document.getElementById('word-optional').innerHTML = 'CY';
      document.getElementById('letter-note-optional').innerHTML = 'A';
    }
  },
  {
    // Line 4: F F E C D C
    expected: ['F', 'F', 'E', 'C', 'D', 'C'],
    apply: function() {
      document.getElementById('word-one').innerHTML = 'HAP-';
      document.getElementById('letter-note-one').innerHTML = 'F';
      document.getElementById('word-two').innerHTML = 'PY';
      document.getElementById('letter-note-two').innerHTML = 'F';
      document.getElementById('word-three').innerHTML = 'BIRTH';
      document.getElementById('letter-note-three').innerHTML = 'E';
      document.getElementById('word-four').innerHTML = 'DAY';
      document.getElementById('letter-note-four').innerHTML = 'C';
      document.getElementById('word-five').innerHTML = 'TO';
      document.getElementById('letter-note-five').innerHTML = 'D';
      document.getElementById('word-six').innerHTML = 'YOU!';
      document.getElementById('letter-note-six').innerHTML = 'C';
      lastLyric.style.display = 'none';
    }
  }
];

let currentLineIndex = 0;
let userCurrentSequence = [];

function keyReturn(event) {
  event.target.style.backgroundColor = '';
}

function keyPlay(event) {
  event.target.style.backgroundColor = 'blue';
  
  const noteName = event.target.getAttribute('data-note') || event.target.parentElement.getAttribute('data-note');
  if (noteName) {
    playTone(noteName);
    
    const targetLine = songLines[currentLineIndex];
    const expectedNote = targetLine.expected[userCurrentSequence.length];
    let normalizedNote = noteName === 'HIGH-C' ? 'C' : noteName;
    
    if (normalizedNote === expectedNote) {
      userCurrentSequence.push(normalizedNote);
      
      if (userCurrentSequence.length === targetLine.expected.length) {
        currentLineIndex++;
        userCurrentSequence = [];
        
        if (currentLineIndex < songLines.length) {
          songLines[currentLineIndex].apply();
        } else {
          document.getElementById('demo').innerHTML = 'Song complete! Click Reset to play again.';
        }
      }
    } else {
      userCurrentSequence = [];
    }
  }
};

let assignEvents = function(note) {
  note.onmousedown = keyPlay;
  note.onmouseup = keyReturn;
};

notes.forEach(assignEvents);

// Reset button handler
let startOver = document.getElementById('fourth-next-line');
startOver.onclick = function() {
  currentLineIndex = 0;
  userCurrentSequence = [];
  songLines[0].apply();
  document.getElementById('demo').innerHTML = 'Play the correct notes in order to progress automatically!';
}