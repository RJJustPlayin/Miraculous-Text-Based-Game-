const traits = [
  'Brave','Curious','Determined','Loyal','Independent','Compassionate','Clever','Patient','Ambitious','Calm',
  'Bold','Honest','Playful','Disciplined','Resourceful','Protective','Fearless','Observant','Adaptable','Confident',
  'Creative','Persistent','Kind','Strategic','Adventurous','Selfless','Competitive','Thoughtful','Rebellious','Focused',
  'Optimistic','Cautious','Charismatic','Practical','Empathetic','Resilient','Inventive','Daring','Reliable','Mysterious',
  'Leader','Free-Spirited','Analytical','Passionate','Tactical','Patiently Bold','Witty','Vigilant','Tenacious','Open-Minded'
];

const state = { name:'', age:16, traits:[], level:1, xp:0, coins:0, energy:100, textColor:'#e7e7e7', sound:true };

const traitPool = document.getElementById('trait-pool');
const traitCount = document.getElementById('trait-count');
const startButton = document.getElementById('start-button');
const creationError = document.getElementById('creation-error');
const creationScreen = document.getElementById('creation-screen');
const gameScreen = document.getElementById('game-screen');
const storyLog = document.getElementById('story-log');
const choices = document.getElementById('choices');

traits.forEach((trait, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'trait';
  button.textContent = trait;
  button.dataset.trait = trait;
  button.dataset.index = index;
  button.addEventListener('click', () => toggleTrait(trait, button));
  traitPool.appendChild(button);
});

function toggleTrait(trait, button) {
  if (state.traits.includes(trait)) {
    state.traits = state.traits.filter(t => t !== trait);
    button.classList.remove('selected');
  } else {
    if (state.traits.length >= 3) return;
    state.traits.push(trait);
    button.classList.add('selected');
  }
  traitCount.textContent = `${state.traits.length} / 3`;
  startButton.disabled = state.traits.length !== 3 || !document.getElementById('player-name').value.trim();
  creationError.hidden = true;
}

document.getElementById('player-name').addEventListener('input', e => {
  startButton.disabled = state.traits.length !== 3 || !e.target.value.trim();
});

document.getElementById('character-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('player-name').value.trim();
  const age = Number(document.getElementById('player-age').value);
  if (!name || state.traits.length !== 3 || age < 10 || age > 30) {
    creationError.textContent = 'Complete your name, age, and choose exactly three traits.';
    creationError.hidden = false;
    return;
  }
  state.name = name;
  state.age = age;
  beginGame();
});

function beginGame() {
  creationScreen.hidden = true;
  gameScreen.hidden = false;
  updateStats();
  appendStory(`Welcome, ${state.name}.`, 'system');
  appendStory('Paris is waiting. Your story has not been written yet — this is the foundation screen for Chapter 1.');
  appendStory('Your three traits have been recorded. The system will use them later to determine your first Miraculous.', 'system');
  renderChoice('Begin your story', () => appendStory('Chapter 1 will begin here.', 'system'));
}

function appendStory(text, type='') {
  const entry = document.createElement('p');
  entry.className = `story-entry ${type}`;
  entry.textContent = text;
  storyLog.appendChild(entry);
  entry.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function renderChoice(label, handler) {
  const button = document.createElement('button');
  button.className = 'choice';
  button.type = 'button';
  button.textContent = label;
  button.addEventListener('click', handler);
  choices.appendChild(button);
}

function updateStats() {
  document.getElementById('stats-name').textContent = state.name || 'Player';
  document.getElementById('stats-level').textContent = `Level ${state.level}`;
  document.getElementById('stat-xp').textContent = `${state.xp} / 100`;
  document.getElementById('stat-coins').textContent = state.coins;
  document.getElementById('stat-energy').textContent = `${state.energy} / 100`;
  document.getElementById('stat-miraculous').textContent = 'Undiscovered';
}

document.getElementById('open-stats').addEventListener('click', () => document.getElementById('stats-panel').classList.remove('closed'));
document.getElementById('close-stats').addEventListener('click', () => document.getElementById('stats-panel').classList.add('closed'));

const settingsDialog = document.getElementById('settings-dialog');
document.getElementById('settings-toggle').addEventListener('click', () => settingsDialog.showModal());
document.getElementById('close-settings').addEventListener('click', () => settingsDialog.close());

document.getElementById('text-color').addEventListener('input', event => {
  state.textColor = event.target.value;
  document.documentElement.style.setProperty('--text', state.textColor);
});

document.getElementById('sound-toggle').addEventListener('click', event => {
  state.sound = !state.sound;
  event.currentTarget.textContent = state.sound ? '🔊' : '🔇';
  event.currentTarget.setAttribute('aria-pressed', String(state.sound));
});

// The actual personality-to-Miraculous compatibility table will be added with the story data.
// Keeping it separate prevents UI code from silently inventing story rules.
