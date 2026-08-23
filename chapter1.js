const character=JSON.parse(sessionStorage.getItem('miraculousCharacter')||'null');
if(!character||!character.name||character.traits?.length!==3) location.replace('index.html');

const $=id=>document.getElementById(id);
$('stats-name').textContent=character.name;

const log=$('story-log');
const choices=$('choices');
let step=0;

const scenes=[
{title:'THE DAY AFTER',text:[
`The next morning, Paris has a new rumor.`+
``,
`You wake before your alarm. For a few seconds, you don't know why. Then you remember the crack in the street. The light. The symbol. The man who grabbed your shoulder and told you not to move closer.`,
`Your phone is already buzzing. Messages. News alerts. Videos. Everybody seems to have an opinion, and none of them agree.`,
`One thing is missing from almost every story: the blue-white light you saw beneath the pavement.`,
`You get ready for school anyway. Whatever happened yesterday, the rest of the world seems determined to call it a normal accident.`],
choices:['Check your phone first.','Get ready without looking at it.','Look outside before leaving.']},
{title:'THE PHONE',text:[
`Your phone screen is crowded with notifications.`,
`Text App: 6 unread messages.`,
`Pictures: 1 new image.`,
`Notes: unchanged.`,
`Music: your saved songs are waiting.`,
`The one new picture is a screenshot from a local news clip. Someone has circled the same section of pavement where you saw the light.`,
`Under the image, someone has typed: “Did anyone else see what was under there?”`,
`You almost reply. Then you notice the screenshot was posted at 2:13 A.M.`,
`You don't know why that bothers you.`,
`Maybe because you were awake at 2:13.`],
choices:['Save the picture.','Reply to the post.','Leave it alone.']},
{title:'THE WALK TO SCHOOL',text:[
`The walk to school feels different today.`,
`Not because the streets changed. They didn't.`,
`Because now you are looking for things you used to ignore.`,
`A maintenance truck is parked beside a storm drain. Two workers are talking quietly. One points toward the pavement and the other immediately stops talking when they notice you.`,
`Across the street, a newspaper stand is displaying the same headline in three different versions.`,
`UNKNOWN INFRASTRUCTURAL INCIDENT.`,
`UNEXPLAINED SEISMIC EVENT.`,
`MYSTERY SHAKING REPORTED ACROSS PARIS.`,
`Nobody has an answer.`],
choices:['Watch the maintenance workers.','Read the newspaper headlines.','Keep going to school.']},
{title:'SCHOOL — FIRST PERIOD',text:[
`The classroom is louder than usual.`,
`Everyone is talking about yesterday.`,
`One student insists the crack was caused by construction. Another says it was an earthquake. Someone else says they saw a monster.`,
`You keep your thoughts to yourself.`,
`The teacher begins class.`,
`For ten minutes, everything is ordinary.`,
`Then the lights flicker.`,
`Once.`,
`Twice.`,
`A third time.`,
`The room goes dark.`,
`When the emergency lights come on, there is a strange sound from the hallway.`],
choices:['Go into the hallway.','Stay in the classroom.','Ask the teacher what that sound was.']},
{title:'THE HALLWAY',text:[
`The hallway is empty.`,
`Too empty.`,
`You walk toward the sound.`,
`It is not footsteps. It is a low humming noise, almost like an electrical current.`,
`The sound is coming from a locked utility door.`,
`You place your hand against it.`,
`Warm.`,
`The humming stops.`,
`Someone speaks behind you.`,
`“You shouldn't be here.”`,
`You turn.`,
`It is the same older man from yesterday.`],
choices:['Ask how he got into the school.','Ask what is behind the door.','Say nothing.']},
{title:'THE STRANGER',text:[
`He doesn't answer your first question.`,
`He looks at you for a long moment, as if checking whether you recognize him.`,
`“You saw it,” he says.`,
`Not a question.`,
`You ask what he means.`,
`“The light.”`,
`Your stomach tightens.`,
`He glances toward the utility door.`,
`“Some things in this city are older than the streets built around them.”`,
`You ask him what the symbol means.`,
`He looks almost angry at the question.`,
`“Forget the symbol.”`,
`Then he walks away.`,
`Before he disappears around the corner, he adds one more thing:`,
`“And whatever you do, don't follow the blue light.”`],
choices:['Follow him.','Open the utility door after he leaves.','Return to class.']},
{title:'LUNCH',text:[
`By lunch, you've heard three different stories about the stranger.`,
`None of them make sense.`,
`You sit with your food while the conversation around you shifts from the incident to normal teenage complaints.`,
`Then someone at your table mentions a power outage from the night before.`,
`“My brother said there was another one near the river.”`,
`Another person answers, “At the same time?”`,
`“Pretty much.”`,
`You look down at your phone.`,
`Your notes app is open. You don't remember opening it.`,
`There is a new line typed beneath yesterday's date:`,
`DO NOT TRUST THE FIRST PERSON WHO OFFERS AN ANSWER.``,
`You stare at the screen.`,
`The note is in your handwriting.`],
choices:['Delete the note.','Leave the note untouched.','Write down the name of the stranger.']},
{title:'AFTER SCHOOL — THE DETOUR',text:[
`When school ends, you don't go straight home.`,
`Not yet.`,
`The crack is still on your mind.`,
`You head toward the city center.`,
`Paris is busy, but there is something strange about the atmosphere. People keep checking their phones. Police cars pass through intersections. A helicopter circles somewhere in the distance.`,
`You reach the street from yesterday.`,
`The crack has been repaired.`,
`Perfectly.`,
`Too perfectly.`,
`There isn't even a scar in the pavement.`,
`You crouch near the curb.`,
`Something is scratched into the stone underneath.`,
`The symbol.`],
choices:['Photograph the symbol.','Touch it.','Search the nearby pavement for more marks.']},
{title:'THE MARK',text:[
`The symbol looks different in daylight.`,
`It isn't paint. It isn't carved deeply enough to be old graffiti. It almost looks like it was pressed into the stone from underneath.`,
`You touch it.`,
`Cold.` ,
`Then warm.` ,
`A pulse runs through your hand.` ,
`The world around you seems to pause for half a second.`,
`A bus freezes in the middle of the street. A bird hangs motionless in the air. A stranger turns their head toward you without moving the rest of their body.`,
`Then everything moves again.`,
`Your hand is shaking.`,
`You pull it away.`],
choices:['Touch the symbol again.','Step away.','Look for the stranger who turned toward you.']},
{title:'THE FIRST CHOICE THAT MATTERS',text:[
`This is not a choice that changes the story.` ,
`Not yet.`,
`But it tells you something about yourself.`,
`You can walk away.`,
`You can investigate.`,
`Or you can pretend none of this is happening.`,
`Whatever you choose, the city keeps moving around you.`,
`The important thing is that you are now paying attention.`],
choices:['Investigate the symbol.','Walk away for now.','Take a minute to think.']},
{title:'THE BOOKSTORE',text:[
`You remember an old bookstore a few blocks away.`,
`If there is anything in this city that might explain a symbol like this, maybe it is there.`,
`The shop is cramped and quiet. The owner is an older woman with silver glasses and a habit of watching customers before speaking to them.`,
`You describe the symbol without drawing it.`,
`She immediately asks, “Where did you see that?”`,
`You hesitate.`,
`“Under the street,” you say.`,
`Her expression changes.`,
`She closes the book in front of her.`,
`“You should leave.”`,
`You ask why.`,
`“Because people have spent a very long time looking for what is under Paris.”`,
`You ask what is under Paris.`,
`She gives you a tired smile.`,
`“That depends on who you ask.”`],
choices:['Ask what she knows about the symbol.','Ask what is under Paris.','Thank her and leave.']},
{title:'THE NOTE',text:[
`Before you leave, she slides a scrap of paper across the counter.`,
`There is a single address on it.`,
`No explanation.`,
`You look up.`,
`She is already reading again.`,
`Outside, you unfold the paper.`,
`The address is for an abandoned service entrance beneath a section of the city near the original crack.`,
`You look back through the window.`,
`The bookstore owner is no longer watching you.`,
`But another person is.`],
choices:['Look for the person outside.','Put the note away.','Return to the street from yesterday.']},
{title:'THE FOLLOWER',text:[
`You turn around.`,
`Nobody.`,
`Just people passing by.`,
`You keep walking.`,
`You turn down a side street.`,
`Still nothing.`,
`Then you hear footsteps behind you.`,
`You stop.`,
`The footsteps stop.`,
`You start again.`,
`They start again.`,
`You reach the service entrance.`,
`The footsteps are gone.`],
choices:['Go inside.','Wait outside.','Check your phone.']},
{title:'THE SERVICE ENTRANCE',text:[
`The door is locked.`,
`You check the address again. Same place.`,
`There is a small metal plate beside the lock.`,
`No numbers.`,
`No words.`,
`Only the same symbol.`,
`You touch it.`,
`Click.`,
`The door unlocks.`],
choices:['Open the door.','Leave and come back later.','Call someone before entering.']},
{title:'BELOW PARIS',text:[
`The stairway descends farther than it should.`,
`The city noise disappears behind you.`,
`No traffic. No voices. No sirens.`,
`Just your footsteps.`,
`The walls are old brick at first. Then stone.`,
`Then something else.`,
`Something smooth and dark.`,
`You reach the bottom.`,
`A hallway stretches ahead.`,
`Every few feet, there is a faded symbol on the wall.`,
`The same symbol.`,
`Over and over.`],
choices:['Follow the symbols.','Inspect the walls.','Go back upstairs.']},
{title:'THE FIRST DOOR',text:[
`The symbols lead to a massive stone door.`,
`There is no handle.`,
`No keyhole.`,
`Only a circular depression in the center.`,
`You place your hand against it.`,
`Nothing happens.`,
`You try again.`,
`A faint pulse answers.`,
`Then another.`,
`A whisper travels through the stone.`,
`Not words.`,
`A sound like someone breathing on the other side.`],
choices:['Press harder.','Step back.','Speak to whoever is there.']},
{title:'SOMETHING ANSWERS',text:[
`The stone door shifts.` ,
`Just an inch.`,
`A line of blue-white light appears around its edge.`,
`You hear something move behind it.`,
`You step backward.`,
`The light disappears.`,
`The door closes again.`,
`For a moment, you think you imagined everything.`,
`Then your phone vibrates.`,
`No signal.`,
`One notification appears anyway:`,
`UNKNOWN: YOU WERE NOT SUPPOSED TO FIND THAT.`],
choices:['Open the message.','Turn the phone off.','Try the door again.']},
{title:'THE WARNING',text:[
`The message has no sender.`,
`No number.`,
`No icon.`,
`Just one sentence.`,
`YOU ARE CLOSER THAN ANYONE HAS BEEN IN YEARS.`,
`Another message appears.`,
`LEAVE.` ,
`You stare at the door.`,
`The hallway behind you is empty.`,
`But somewhere in the darkness, you hear a quiet metallic sound.`,
`Someone else is down here.`],
choices:['Hide and listen.','Run back upstairs.','Stay near the door.']},
{title:'THE ESCAPE',text:[
`You move quickly through the hallway.`,
`The metallic sound follows.`,
`You do not look back.`,
`You reach the stairs.`,
`The door at the top is open.`,
`You push through it and step back onto the street.`,
`Paris hits you all at once.`,
`Traffic. Voices. Wind.`,
`Everything normal again.`,
`You look down at the piece of paper from the bookstore.`,
`The address is still there.`,
`But now there is something written beneath it.`,
`A single word:`,
`WAIT.`],
choices:['Keep the note.','Throw it away.','Write everything down.']},
{title:'EVENING',text:[
`You go home.`,
`You eat.`,
`You answer a few questions.`,
`You try to act normal.`,
`Your phone remains silent for hours.`,
`Then, just before you go to sleep, it lights up.`,
`One new photo.`,
`It is a picture of the stone door beneath Paris.`,
`The picture was taken from the hallway.`,
`Someone was there after you left.`,
`At the bottom of the picture is a message:`,
`TOMORROW.`],
choices:['Save the photo.','Delete the photo.','Add the photo to your notes.']},
{title:'END OF THE FIRST HOUR',text:[
`The night stretches on.`,
`You don't know who is watching.`,
`You don't know what is behind the door.`,
`You don't know what the symbol means.`,
`You don't know why the city seems to be hiding something.`,
`And you definitely don't know why something beneath Paris seems to recognize you.`,
`Tomorrow will answer some of those questions.`,
`But not all of them.`,
`For now, you have one thing you didn't have yesterday: a reason to keep looking.`],
choices:['Continue.']}
];

function render(){
 const s=scenes[step];
 log.innerHTML=`<h2 class="scene-title">${s.title}</h2>`+s.text.map(t=>`<p class="story-entry">${t}</p>`).join('');
 choices.innerHTML='';
 s.choices.forEach((c,i)=>{
  const b=document.createElement('button');
  b.className='choice'; b.type='button'; b.textContent=`${i+1}. ${c}`;
  b.onclick=()=>{ if(step<scenes.length-1){step++;render();} else {choices.innerHTML='<p class="story-entry system">First hour complete. The next section will expand the mystery, characters, exploration, and eventually the path toward the first Miraculous.</p>';}};
  choices.appendChild(b);
 });
 log.scrollTop=0;
}

function openSide(title,html){$('side-title').textContent=title;$('side-content').innerHTML=html;$('side-dialog').showModal()}
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
 if(p==='kwami-book')openSide('Kwami Book','<p><strong>Kwami Book</strong></p><p>No Kwamis discovered yet.</p><p>Every Kwami you meet will be recorded here with its Miraculous, abilities, weapon, and discovered information.</p>');
 if(p==='skill-tree')openSide('Skill Tree','<p><strong>Skill Tree</strong></p><p>Locked.</p><p>Your tree will activate when you obtain your first Miraculous.</p><p>Every level grants 3 Skill Points. Points can be saved, spent on the skill tree, or invested in permanent physical traits.</p>');
 if(p==='quest-book')openSide('Quest Book','<p><strong>Quest Book</strong></p><p>No quests are available yet.</p><p>Quests will be introduced later in the story. Main and side quests will appear here, with rewards shown only when the game intends you to know them.</p>');
});

function phone(tab){
 let html='';
 if(tab==='texts')html='<h3>Text App</h3><p>No new messages.</p><p class="muted">New conversations will appear naturally as the story introduces people.</p>';
 if(tab==='photos')html='<h3>Pictures</h3><p>1 photo saved.</p><p class="muted">A blurry image of the repaired street and the hidden symbol.</p>';
 if(tab==='notes')html='<h3>Notes</h3><p><strong>Yesterday</strong></p><p>Blue-white light. Symbol beneath the street. Stranger told me not to follow it.</p>';
 if(tab==='music')html='<h3>Music</h3><ol><li>Paris at Dawn</li><li>Quiet Streets</li><li>Something Beneath</li><li>Chasing the Unknown</li><li>Midnight Signal</li></ol><p class="muted">These are original in-game music slots. No copyrighted recordings are used.</p>';
 $('phone-content').innerHTML=html;
}
document.querySelectorAll('.phone-tabs button').forEach(b=>b.onclick=()=>phone(b.dataset.phone));

render();
