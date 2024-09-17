/*
This is a simple game based on the "Dungeon Born" series of books. It's an incremental game like Cookie Clicker, but instead of gathering cookies you gather "essence," the units of power in the books.

I plan on making a lot of changes and updates to this, especially when it comes to readability and optimization. Part of the reason I coded this was to re-teach myself HTML, JavaScript, and CSS, so parts of the code are rocky for now.

This file is named 'gRanks' as a reference to a level of power within the series.
*/

function gRanks() {
  // This part keeps track of the text outputs in the left column, and ensures that too many don't post at once
  if (state.textCountdown > 0) {
    state.textCountdown -= 1;
  }

  // Leveling up ranks

  // We first get the current rank number, a measure of the player's power
  rankNumber = parseInt(state.rank[1]);

  // This computes how much pure essence you have stored, and uses that to determine if you can rank up
  if (state.pureE >= essenceRanking[rankNumber] && state.textCountdown <= 0) {
    state.rank = "g" + (rankNumber + 1);

    // We modify the rank here
    document.getElementById("rankDisplay").innerHTML = "g-rank-" + (rankNumber + 1);

    // We update the player so they know they ranked up
    if (state.rank === "g1") {
      addText('you feel a change within yourself; your accumulated essence has made you a g-rank-' + (rankNumber + 1) + ' dungeon core. Thomas moves closer to you. "Well done! You gathered enough pure essence to go up a rank! The higher your rank, the more powerful you are and the more abilities you unlock. Make sure to save up plenty of pure essence to keep increasing in rank."');
    } else {
      addText("you feel a change within yourself; your accumulated essence has made you a g-rank-" + (rankNumber + 1) + " dungeon core");
    }
    state.textCountdown = state.timeBetweenText;
  }

  // The next section is the text that will be displayed in the early game pertaining to different stages of development
  if (total("pure") >= 10 && (state.text === 0) && state.textCountdown <= 0) {
    addText('you hear a voice echoing through the darkness');
    endOfEvent();
  }
  if (total("pure") >= 20 && state.text === 1 && state.textCountdown <= 0) {
    addText('you sense a nearby source of light ... and essence');
    endOfEvent();
  }
  if (total("pure") >= 30 && state.text === 2 && state.textCountdown <= 0) {
    addText('a glowing blue ball appears above you. "Hello," it says. "I\'m here to help you. But first, you need to purify your essence."');
    endOfEvent();
    document.getElementById("purifyButton").style.display = "block";
  }
  if (state.pureE >= 30 && state.text === 3 && total("essence") === 0 && state.textCountdown <= 0) {
    addText('"Very good," it says. "I am Thomas, your dungeon wisp. My job is to help you grow as we share essence."');
    endOfEvent();
  }
  if (state.text === 4 && state.textCountdown <= 0) {
    addText('"Next you need to begin expanding your influce," the wisp explains. "I\'ll give you power to grow more moss; that\s what you\'ve been taking essence from. I\'ll also show you how to grow a few basic mobs."');
    endOfEvent();
    updateMobStuff();
    document.getElementById('dungeonMobs').style.display = "block";
    document.getElementById('ambientEPS').style.display = "block";
    document.getElementById('activeEPC').style.display = "block";
    document.getElementById('passiveEPS').style.display = "block";
    document.getElementById('purificationStrength').style.display = "block";
  }
  if (state.text === 5 && total("pure") >= 150 && state.textCountdown <= 0) {
    addText('"Your core is nearly full of essence," Thomas says. "But we can increase your essence capacity by fixing the cracks in your core. It will take a lot of essence, but it will be worth it."');
    endOfEvent();
    
    // Activate button for fixing core.
    document.getElementById('coreRepair').style.display = "block";
  }
  if (state.text === 6 && total("pure") >= 201 && state.textCountdown <= 0) {
    addText('Thomas zooms around excitedly. "You\'re growing stronger! I\'ve helped you unlock a new ability. Devoting some essence to practice, you\'ll be able to cultivate faster and soon you\'ll be pulling in essence automatically! You\'ll learn how to purify essence more easily, too."');
    endOfEvent();
    document.getElementById('cultivationUpgrade').style.display = "block";
  }
  if (state.rank === "g9" && !state.done) {
    addText("Congratulations! You've reached the current maximum level! I'm going to add the f-ranks soon, and I'll keep working on the game for a while. Merry Christmas!");
    state.done = true;
  }
}