const character = JSON.parse(sessionStorage.getItem('miraculousCharacter') || 'null');
if (!character || !character.name || character.traits?.length !== 3) location.replace('index.html');

const $ = id => document.getElementById(id);
const log = $('story-log');
const choices = $('choices');
let step = 0;
let receivedMiraculous = false;
let mainVillainSeen = false;

const scenes = [
{title:'THE DAY AFTER',text:[`You wake before your alarm.`,'For a few seconds, the room feels completely normal. Then yesterday comes back to you. The crack. The blue-white light. The symbol. The man who told you to stay away.','Your phone is already buzzing.'],choices:['Check your phone.','Get ready without looking at it.','Look out the window first.']},
{title:'SIX UNREAD',text:['Six unread messages. Three news alerts. One photo. One video. One message from an unknown sender.','You open the message first.','There is no number attached. Just four words: **DID YOU SEE IT?**','You stare at the screen.'],choices:['Reply: “See what?”','Save the message.','Delete it.']},
{title:'THE PHOTO',text:['The photo shows yesterday’s street. Police tape. A crowd. Emergency vehicles.','But someone has zoomed in on the pavement.','The symbol is visible. Clearer than you remember.','Under it, someone typed: **This was not an earthquake.**'],choices:['Save the photo.','Zoom in further.','Check who posted it.']},
{title:'THE VIDEO',text:['The video is only eight seconds long.','Seven are useless. The last second is not.','A shadow passes under the pavement as the camera shakes.','Then the blue-white light appears.','You watch it twice.'],choices:['Save the video.','Slow it down.','Send it to your notes.']},
{title:'THE UNKNOWN CALLER',text:['Your phone rings. No caller ID.','You answer.','Silence.','Then a quiet voice says, “Forget what you saw.”','The call ends.'],choices:['Call back.','Block the caller.','Save the number if it appears.']},
{title:'LEAVING HOME',text:['You finally leave for school.','Paris looks normal again. People buy coffee. Buses move. Tourists take pictures.','That normality almost makes yesterday feel unreal.','Almost.'],choices:['Take your usual route.','Take a longer route.','Walk past yesterday’s street.']},
{title:'THE REPAIRED STREET',text:['The crack is gone.','Workers have covered the pavement so perfectly that there is barely a seam.','You stop anyway.','Something about the repair is wrong. Too fast. Too clean.'],choices:['Look at the curb.','Watch the workers.','Keep walking.']},
{title:'THE MAINTENANCE TRUCK',text:['A maintenance truck sits nearby. Two workers talk quietly.','One sees you looking.','The conversation stops immediately.','The older worker closes the truck door.'],choices:['Ask what they repaired.','Pretend you were never watching.','Watch from across the street.']},
{title:'THE SYMBOL AGAIN',text:['A tiny mark is scratched into the curb.','You recognize it immediately.','The same symbol. Smaller this time.','You take a picture before anyone notices.'],choices:['Touch the mark.','Photograph it.','Leave it alone.']},
{title:'SCHOOL GATES',text:['You reach school.','Students are still arguing about yesterday. One says it was a gas line. Another swears it was a monster.','You hear a third student whisper that the city is hiding something.','The bell rings.'],choices:['Join the conversation.','Listen without speaking.','Go straight inside.']},
{title:'FIRST PERIOD',text:['Class starts.','For ten minutes, the teacher talks about something unrelated.','Then the lights flicker.','Once. Twice. Three times.','A strange hum comes from the wall.'],choices:['Watch the lights.','Watch the wall.','Watch everyone else.']},
{title:'THE HUM',text:['The sound gets louder.','A few students look around. Most ignore it.','Then the hum stops.','On the board, a line of chalk has appeared beneath the lesson.','You are sure it was not there before.'],choices:['Look at the chalk.','Ask the teacher.','Say nothing.']},
{title:'THE CHALK MESSAGE',text:['The chalk line isn’t a sentence. It’s a symbol.','The same one.','Your phone buzzes.','UNKNOWN: STOP LOOKING.'],choices:['Take a picture.','Erase the chalk.','Leave it alone.']},
{title:'BETWEEN CLASSES',text:['The hallway is crowded.','You catch sight of the older man from yesterday.','He is not dressed like a teacher.','He is standing beside a locked utility door.'],choices:['Follow him.','Ask what he is doing here.','Keep going.']},
{title:'THE STRANGER',text:['He turns before you speak.','“You saw the light,” he says.','Not a question.','You ask how he knows.','He says, “Because you are not the first person who saw it.”'],choices:['Ask who else saw it.','Ask what the symbol means.','Ask why he is following you.']},
{title:'THE WARNING',text:['He glances toward the camera over the hallway.','“Not here.”','He slips a folded piece of paper into your hand.','“Read this somewhere private.”','Then he disappears into the crowd.'],choices:['Open it immediately.','Wait until lunch.','Put it away.']},
{title:'THE PAPER',text:['You open it in a bathroom stall.','One address. No explanation.','Beneath it: **Do not enter alone.**','The address is nowhere you recognize.'],choices:['Search the address online.','Save it in your notes.','Throw the paper away.']},
{title:'THE SEARCH',text:['You search the address.','An old service entrance. Closed for years.','It is near the same part of Paris where the first crack appeared.','The map shows almost nothing beneath the surface.'],choices:['Save the location.','Look at old photos.','Close the map.']},
{title:'LUNCH',text:['The cafeteria is loud.','A conversation nearby catches your attention.','Someone says a second power outage happened last night.','Another person says it happened at the exact same time as yours.','Nobody knows why.'],choices:['Listen closer.','Ask about the outage.','Ignore them.']},
{title:'THE NOTE APP',text:['You open your notes.','There is a new note you did not write.','**DO NOT TRUST THE FIRST ANSWER.**','The note uses your exact handwriting.'],choices:['Delete it.','Keep it.','Write beneath it: “Who are you?”']},
{title:'THE ANSWER',text:['A blinking cursor appears.','You did not turn it on.','Letters type themselves.','**YOU ARE ASKING THE WRONG QUESTION.**','The note disappears.'],choices:['Write again.','Screenshot the screen.','Close the app.']},
{title:'THE AFTERNOON',text:['Classes drag.','You keep noticing small things: lights flickering, distant sirens, people checking their phones.','Nothing is enough to prove anything.','Everything is enough to make you suspicious.'],choices:['Wait for school to end.','Ask a teacher about the outages.','Look for the stranger.']},
{title:'THE STRANGER IS GONE',text:['You search the hallway. Nothing.','The utility door is still locked.','But there is a new scratch on the metal.','The symbol.'],choices:['Photograph it.','Touch it.','Walk away.']},
{title:'THE DOOR HUMS',text:['You touch the mark.','The door hums once.','You pull your hand back.','A shadow moves underneath the door.','Someone is on the other side.'],choices:['Knock.','Step away.','Listen.']},
{title:'A VOICE',text:['A voice comes through the door.','“You should have left yesterday.”','You recognize it.','The unknown caller.'],choices:['Ask who they are.','Ask what is behind the door.','Say nothing.']},
{title:'THE LOCK',text:['The voice says, “Go home.”','Then the lock clicks.','Not open. Just unlocked.','The choice is suddenly yours.'],choices:['Open it.','Leave it closed.','Call for a teacher.']},
{title:'NO TIME',text:['Before you can choose, the bell rings.','Students flood the hallway.','The lock resets.','Whatever was behind the door is gone.'],choices:['Return to class.','Wait until school ends.','Follow the crowd.']},
{title:'AFTER SCHOOL',text:['You leave school with the folded address in your pocket.','Your phone buzzes again.','Unknown: **TONIGHT.**','No punctuation.'],choices:['Go to the address.','Go home first.','Ask someone to come with you.']},
{title:'THE CITY CENTER',text:['You walk toward the address as evening settles over Paris.','Streetlights flicker on one by one.','The city feels beautiful.','And strangely watchful.'],choices:['Keep moving.','Check the map.','Look behind you.']},
{title:'SOMEONE IS FOLLOWING',text:['You hear footsteps.','You stop.','They stop.','You continue.','They continue.'],choices:['Turn around.','Take a different street.','Keep walking.']},
{title:'THE CHOICE DOESN’T CHANGE THE PATH',text:['You lose the footsteps after a few blocks.','Whatever you chose, the night keeps moving forward.','The address leads you to an old service entrance.','A symbol is carved beside the lock.'],choices:['Touch the symbol.','Try the handle.','Inspect the lock.']},
{title:'THE DOOR OPENS',text:['The handle turns.','The door opens into darkness.','No alarm. No light.','Just stairs leading down.'],choices:['Go inside.','Wait at the entrance.','Call someone first.']},
{title:'BELOW PARIS',text:['The farther down you go, the quieter the city becomes.','Brick gives way to stone.','Stone gives way to something smooth and black.','The walls are marked with symbols.'],choices:['Follow the symbols.','Study the walls.','Go back.']},
{title:'THE FIRST CHAMBER',text:['A circular chamber waits below.','At its center is a broken stone platform.','There are empty spaces shaped like small objects.','One space glows faintly.'],choices:['Approach it.','Search the room.','Stay near the entrance.']},
{title:'THE MEMORY',text:['When you get close, you hear a voice that sounds like it is coming from inside your own head.','“You have returned.”','You have never been here before.','At least, you don’t remember being here.'],choices:['Ask who is speaking.','Ask what “returned” means.','Step away.']},
{title:'THE OLD MARKINGS',text:['The chamber walls show pictures of people wearing strange jewels.','Different animals. Different weapons.','One image shows a small creature beside a human.','You have no idea what it is.'],choices:['Study the creature.','Study the jewel.','Study the weapon.']},
{title:'THE BROKEN BOX',text:['Behind the platform, you find the remains of a damaged box.','Several compartments are empty.','One is sealed.','The symbol is carved into the lid.'],choices:['Touch the lid.','Search around the box.','Leave it alone.']},
{title:'THE KWAMI VOICE',text:['Something shifts inside the box.','A tiny voice says, “Finally.”','You freeze.','The voice continues.','“I was beginning to think nobody would come.”'],choices:['Ask who they are.','Ask them to come out.','Step back.']},
{title:'THE FIRST KWAMI',text:['A tiny glowing creature emerges.','It looks nothing like a person.','Its eyes are bright, curious, and slightly annoyed.','“You took your time.”'],choices:['Ask what it is.','Ask why it knows you.','Ask what the box is.']},
{title:'NO EASY ANSWERS',text:['The Kwami explains only enough to make you more confused.','There are Miraculouses.','There are Kwamis.','The box is a vessel for them.','Some have been lost. Some are hidden. Some are being watched.'],choices:['Ask what a Miraculous does.','Ask who is watching.','Ask why you were chosen.']},
{title:'THE CONNECTION',text:['The Kwami looks at you carefully.','“Your choices matter.”','You remember the three traits you selected when you created your character.','The Kwami seems to know them too.'],choices:['Ask how it knows.','Ask which Miraculous is yours.','Ask if you can choose another.']},
{title:'NOT YOUR CHOICE',text:['“You don’t choose your first Miraculous,” the Kwami says.','“The match is already there.”','It explains that the box responds to who you are, not what is strongest.','You notice a glow coming from one sealed compartment.'],choices:['Ask to see it.','Touch the compartment.','Ask what happens if you refuse.']},
{title:'THE SEALED COMPARTMENT',text:['The glow intensifies.','The stone platform vibrates.','The Kwami backs away.','“It has decided.”','The compartment opens.'],choices:['Reach for the Miraculous.','Wait for the Kwami.','Ask what you are supposed to do.']},
{title:'THE MIRACULOUS',text:['The jewel rises from the compartment.','For a moment, everything else disappears.','The symbol on the wall changes.','The Kwami smiles.','“That one.”'],choices:['Take it.','Ask what it can do.','Take one step back.']},
{title:'THE FIRST TRANSFORMATION',text:['You take the Miraculous.','Energy rushes through you.','The Kwami enters the jewel.','Your clothes begin to change.','You feel stronger. Faster. Lighter.','A weapon appears.','For the first time, you understand what it means to become something other than ordinary.'],choices:['Look at your new form.','Test your weapon.','Ask the Kwami what your power is.']},
{title:'THE POWER',text:['The Kwami tells you the name of your primary power.','The word feels like it belongs to you.','You try it once.','The ability works—but it costs energy.','The meter on your HUD drops noticeably.','The weapon does not.'],choices:['Test the power again.','Put the weapon away.','Ask about the energy limit.']},
{title:'THE TIME LIMIT',text:['The Kwami gives you the first real warning.','“You cannot stay transformed forever.”','You have a limited transformation window.','The first timer is short on purpose.','You will need training and Skill Points to increase it.'],choices:['Ask how to increase the timer.','Ask how training works.','Ask whether the limit can be removed.']},
{title:'THE SKILL TREE',text:['For the first time, the blank Skill Tree appears in your interface.','Only a few nodes are visible.','Transformation Time. Physical Strength. Energy Capacity. Weapon Mastery.','Everything else is locked.'],choices:['Inspect Transformation Time.','Inspect Physical Strength.','Close the Skill Tree.']},
{title:'THREE POINTS',text:['The Kwami explains the rule.','Every level you gain gives you three Skill Points.','Those points are permanent.','You can spend them on the tree, physical traits, or save them for later.'],choices:['Ask about physical traits.','Ask about saving points.','Ask what training unlocks.']},
{title:'THE KWAMI METER',text:['A new meter appears.','Kwami Meter.','It tracks your relationship and connection with your Kwami.','It is empty now, waiting to grow.'],choices:['Ask what raises it.','Ask what it does.','Keep moving.']},
{title:'THE FIRST TEST',text:['A crash shakes the chamber.','Dust falls from the ceiling.','The Kwami looks toward the tunnel.','“We are not alone.”'],choices:['Prepare for combat.','Search for another exit.','Ask who is coming.']},
{title:'THE HALLWAY ATTACK',text:['Three shadowy figures emerge from the tunnel.','They are not normal people.','Their movements are coordinated.','They are searching the chamber.'],choices:['Fight the nearest one.','Stay hidden.','Protect the Kwami.']},
{title:'THE WEAPON TEST',text:['Your weapon feels natural despite never having used it before.','You block one attack.','You move faster than you expected.','You realize the physical abilities are always there while transformed.'],choices:['Use the weapon.','Use the primary power.','Evade and reposition.']},
{title:'ENERGY',text:['You use your power.','The energy bar drops again.','You feel the difference immediately.','The Kwami shouts, “Don’t waste it!”'],choices:['Use the power again.','Fight with the weapon.','Focus on movement.']},
{title:'THE ESCAPE ROUTE',text:['The attackers retreat deeper into the tunnels.','One of them drops a small metal token.','There is a symbol on it.','The same symbol you have been seeing everywhere.'],choices:['Pick up the token.','Leave it.','Ask the Kwami about it.']},
{title:'THE TOKEN',text:['The Kwami recognizes it.','“That is not supposed to be here.”','You ask who brought it.','The Kwami refuses to answer.','Then you hear footsteps above you.'],choices:['Go toward the footsteps.','Stay below.','Prepare your power.']},
{title:'THE RETURN',text:['You follow the tunnel back toward the surface.','The transformation timer is already moving lower.','You feel your body getting heavier.','The Kwami tells you to hurry.'],choices:['Move quickly.','Stop and listen.','Ask what happens when time runs out.']},
{title:'DE-TRANSFORMATION',text:['Your timer reaches its final moments.','Your transformation releases.','You return to normal.','The exhaustion is real.','The Kwami explains that forcing yourself past the limit is not an option.'],choices:['Rest.','Ask how long recovery takes.','Look at the Miraculous.']},
{title:'THE SECRET',text:['The Kwami tells you the Miraculous must stay hidden.','Nobody can know yet.','Not your friends. Not your classmates. Not the stranger.','Especially not the stranger.'],choices:['Promise secrecy.','Ask why the stranger is dangerous.','Ask who else knows.']},
{title:'THE FIRST NIGHT AS A HOLDER',text:['You go home carrying a secret that did not exist yesterday.','The city looks different from your window now.','You can feel the Miraculous even when it is hidden.','Your phone lights up.'],choices:['Check the phone.','Ignore it.','Write everything down.']},
{title:'THE PHOTO',text:['A new photo has arrived.','It shows the same underground chamber.','Someone has circled the stone platform.','Under the image: **YOU WERE NOT THE FIRST.**'],choices:['Save it.','Delete it.','Ask who sent it.']},
{title:'THE NEXT MORNING',text:['You wake knowing yesterday was real.','The transformation.','The Kwami.','The power.','The impossible underground city beneath Paris.','You go to school anyway.'],choices:['Act normal.','Watch for the stranger.','Check the underground location online.']},
{title:'THE STRANGER RETURNS',text:['The older man appears outside school.','He looks directly at you.','For one second, his eyes drop toward where the Miraculous is hidden.','Then he smiles.'],choices:['Approach him.','Avoid him.','Follow him after school.']},
{title:'THE WARNING BECOMES A THREAT',text:['He stops beside the school gate.','“You found it.”','You say nothing.','He nods as if silence was confirmation.','“Then they will come for you.”'],choices:['Ask who “they” are.','Ask how he knows.','Walk away.']},
{title:'THE CITY SHIFTS',text:['A distant explosion echoes through Paris.','Phones across the street light up with alerts.','Police sirens begin to spread.','The stranger does not look surprised.'],choices:['Check the alert.','Watch the stranger.','Get to a safe place.']},
{title:'THE FIRST REAL VILLAIN',text:['A live news feed shows a figure standing above the city.','The figure wears a mask and a dark coat.','Around them, floating fragments of metal circle like satellites.','This is not an accident.','This is a deliberate attack.'],choices:['Keep watching.','Record the broadcast.','Ask the stranger who it is.']},
{title:'THE NAME',text:['The stranger finally answers.','“They call him **The Curator**.”','You ask what he wants.','“Everything that was hidden.”','The stranger looks at your hand.','“Including what you are carrying.”'],choices:['Ask what he knows about the Miraculous.','Ask why the Curator wants them.','Prepare to run.']},
{title:'THE CURATOR’S MESSAGE',text:['Every screen in Paris changes at once.','The Curator appears on televisions, phones, storefronts, everything.','“Paris has been built over secrets,” he says.','“I intend to open them.”','Behind him, the same symbol appears.'],choices:['Keep watching.','Turn the screen away.','Ask the stranger what to do.']},
{title:'THE SECOND ATTACK',text:['The Curator raises one hand.','A wave of strange energy travels across the city.','Windows shake. Lights fail.','Something underground responds.','The same blue-white light returns.'],choices:['Run toward the light.','Get civilians away.','Transform.']},
{title:'THE FIRST HEROIC CHOICE',text:['The Kwami appears beside you.','“You cannot stop him yet.”','You look toward people running through the streets.','You know you have seconds to decide what matters more.'],choices:['Help the civilians.','Chase the Curator.','Protect the Kwami.']},
{title:'THE RESCUE',text:['You use your new abilities carefully.','You pull someone away from falling debris.','You shield another person.','You move faster than you should be able to.','The energy cost is noticeable.'],choices:['Keep helping.','Save energy.','Look for the source of the attack.']},
{title:'THE CURATOR SEES YOU',text:['You look up.','The Curator is standing on a distant rooftop.','For the first time, he looks directly at you.','He smiles.','“So the box chose someone after all.”'],choices:['Confront him.','Hide your identity.','Move out of sight.']},
{title:'THE REVEAL',text:['The Curator lifts a hand.','A wall of energy forms between you.','He is too far away to fight directly.','But the message is clear.','He knows about the Miraculous.','And now he knows you have one.'],choices:['Ask how he knows.','Attack the barrier.','Retreat.']},
{title:'THE CHASE',text:['The Curator disappears into the city.','You follow from rooftop to rooftop as long as your timer allows.','Your movement is faster than anything you have ever experienced.','But the timer keeps counting down.'],choices:['Keep chasing.','Stop before de-transforming.','Use your power to shortcut.']},
{title:'THE LIMIT',text:['Your timer reaches the warning stage again.','The Kwami shouts that you are almost out of time.','You stop the chase.','The Curator is gone.','But you have seen his face.'],choices:['Return to safety.','Look for evidence.','Ask the Kwami what happens next.']},
{title:'THE FIRST CLUE',text:['Back on the street, you find a metal shard from the Curator’s energy barrier.','The symbol is etched into it.','The same symbol is connected to the underground chamber.','The mystery is no longer separate pieces.','It is one story.'],choices:['Keep the shard.','Photograph it.','Tell the stranger.']},
{title:'THE STRANGER’S SECRET',text:['You confront the stranger.','He looks at the shard.','“I knew this day would come.”','You ask if he knew about the box.','“For years.”','You ask why he never told anyone.','He answers, “Because the wrong person would have listened.”'],choices:['Ask who the right person is.','Ask what happened years ago.','Walk away.']},
{title:'THE CURATOR’S TOKEN',text:['Before you leave the area, you notice the metal token you found underground has started glowing.','The Kwami goes silent.','For the first time since meeting you, they look genuinely afraid.','A thin line of light traces the edge of the token.','Then a symbol appears inside it.'],choices:['Show the Kwami.','Hide the token.','Drop it.']},
{title:'A PROMISE TO RETURN',text:['You put the token away.','You are exhausted, confused, and nowhere near ready for everything this city is hiding.','But you know you are going back.','Not because you were ordered to.','Because now you have a choice.','And tomorrow, you will start learning how to use what chose you.'],choices:['Go home.','Ask the Kwami one final question.','Look toward the city.']},
{title:'THE LAST SCENE OF THE HOUR',text:['You return home before the city goes fully dark.','Your first hour as a Miraculous holder has changed everything.','You have a Kwami.','A weapon.','A power.','A limited transformation time.','A hidden chamber beneath Paris.','A stranger who knows too much.','And a villain who has now seen you.','The Curator is looking for the same secrets you found.','Tomorrow, the real story begins.'],choices:['End the first hour.']}
];

function render(){
  const s = scenes[step];
  log.innerHTML = `<h2 class="scene-title">${s.title}</h2>` + s.text.map(t => `<p class="story-entry">${t}</p>`).join('');
  choices.innerHTML = '';
  s.choices.forEach((c,i)=>{
    const b = document.createElement('button');
    b.className='choice'; b.type='button'; b.textContent=`${i+1}. ${c}`;
    b.onclick=()=>{ if(step < scenes.length-1){ step++; applySceneState(step); render(); } else { choices.innerHTML='<p class="story-entry system">First-hour vertical slice complete.</p>'; }};
    choices.appendChild(b);
  });
  if(log.scrollTo) log.scrollTo({top:0,behavior:'smooth'}); else log.scrollTop=0;
}

function applySceneState(index){
  if(index >= 40){ receivedMiraculous=true; if($('stat-miraculous')) $('stat-miraculous').textContent='Discovered'; }
  if(receivedMiraculous && $('kwami-meter')) $('kwami-meter').hidden=false;
  if(receivedMiraculous && $('skill-tree-status')) $('skill-tree-status').textContent='Active';
  if(index >= 60) mainVillainSeen=true;
}

function openSide(title,html){ $('side-title').textContent=title; $('side-content').innerHTML=html; $('side-dialog').showModal(); }
$('close-stats').onclick=()=>$('stats-panel').classList.add('closed');
$('open-stats').onclick=()=>$('stats-panel').classList.remove('closed');
$('sound-toggle').onclick=e=>e.currentTarget.textContent=e.currentTarget.textContent==='🔊'?'🔇':'🔊';
$('settings-toggle').onclick=()=>$('settings-dialog').showModal();
$('close-settings').onclick=()=>$('settings-dialog').close();
$('text-color').oninput=e=>document.documentElement.style.setProperty('--text',e.target.value);
$('phone-button').onclick=()=>{$('phone-dialog').showModal();phone('texts')};
$('close-phone').onclick=()=>$('phone-dialog').close();
$('close-side').onclick=()=>$('side-dialog').close();

document.querySelectorAll('.side-menu button').forEach(b=>b.onclick=()=>{
  const p=b.dataset.panel;
  if(p==='kwami-book') openSide('Kwami Book', receivedMiraculous ? '<p>Your first Kwami has been discovered.</p><p>The book now contains its Miraculous, weapon, primary power, and future upgrade space.</p>' : '<p>No Kwamis discovered yet.</p>');
  if(p==='skill-tree') openSide('Skill Tree', receivedMiraculous ? '<p id="skill-tree-status">Active</p><p>You currently have your first permanent skill tree. Level-ups award 3 Skill Points.</p><p>Transformation Time and physical traits are available as early upgrade paths.</p>' : '<p>The skill tree is blank until you obtain a Miraculous.</p>');
  if(p==='quest-book') openSide('Quest Book','<p>No quests are available yet.</p><p>Quests will be introduced later, with many rewards hidden until discovery.</p>');
});

function phone(tab){
  let html='';
  if(tab==='texts') html='<p><strong>Text App</strong></p><p>No saved contacts yet.</p>';
  if(tab==='photos') html='<p><strong>Pictures</strong></p><p>Your photos from the mystery can appear here.</p>';
  if(tab==='notes') html='<p><strong>Notes</strong></p><p>Your investigation notes will appear here.</p>';
  if(tab==='music') html='<p><strong>Music</strong></p><ol><li>Paris at Dawn</li><li>Quiet Streets</li><li>Something Beneath</li><li>Chasing the Unknown</li><li>Midnight Signal</li></ol><p>These are original in-game music placeholders.</p>';
  $('phone-content').innerHTML=html;
}
document.querySelectorAll('.phone-tabs button').forEach(b=>b.onclick=()=>phone(b.dataset.phone));
render();
