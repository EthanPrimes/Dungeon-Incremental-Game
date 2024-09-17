// Variable definitions go here

// This one tells us how much pureE is required to reach the next g-rank
let essenceRanking = [100, 300, 500, 1000, 2000, 4000, 7000, 10000, 15000];

// This one tells us the cost to fix a crack in the core and the subsequence capacity
let crackRepairCosts = [[175,400],[350,1000],[800,4000],[3000,10000],[7500,20000]];

// This array tells us the cost and effects of buying cultivation techniques
// [cost, activeGain, passiveGain, purifyStrength]
let cultivationTechniques = [[250,2,1,3],[750,4,3,9],[2500,7,5,27],[7500,10,8,81]];

// This contains all our game data
let state = {
  'pureE':0,
  'maxAmbientE':20,
  'earthE':0,
  'fireE':0,
  'waterE':0,
  'airE':0,
  'celestialE':0,
  'infernalE':0,
  'ambientE':0,
  'capacity':200,
  'essencePerClick':1,
  'essencePerSecond':1,
  'purificationPerClick':1,
  'timeBetweenText':5,
  'cultivationLevel':1,
  'passiveEssence':0,
  'moss': 1,
  'mossCost':20,
  'worm': 0,
  'wormCost':150,
  'mole':0,
  'moleCost':500,
  'snake':0,
  'snakeCost':2500,
  'time': 0,
  "rank":"g0",
  "text":0,
  "cracks":5,
  "textCountdown":0,
  'location':'A drab cave',
  "choice": {
    "name": "",
    "result": 0
  },
};

// This calculates the total amount of essence the player has in their core; it's a sum of the pure essence plus all the other essence types
function total(input="none") {
  if (input === "pure") {
    return state.pureE + state.earthE + state.fireE + state.waterE + state.airE + state.celestialE + state.infernalE;
  } else {
    return state.earthE + state.fireE + state.waterE + state.airE + state.celestialE + state.infernalE;
  }
}

// This keeps track of how long the game has been going
function gameTimer() {
  setInterval(
    function(){state.time += 1},1000);
}

// This keeps track of how much text has been added to the first column
function endOfEvent() {
  state.textCountdown = state.timeBetweenText;
  state.text += 1;
}

// This updates all displayed essence-related values
function updateEssence() {
  document.getElementById('ambientEId').innerHTML = state.ambientE;
  document.getElementById('capacityId').innerHTML = state.capacity;
  document.getElementById('pureEId').innerHTML = state.pureE;
  document.getElementById('waterEId').innerHTML = state.waterE;
  document.getElementById('earthEId').innerHTML = state.earthE;
  document.getElementById('fireEId').innerHTML = state.fireE;
  document.getElementById('airEId').innerHTML = state.airE;
  document.getElementById('celestialEId').innerHTML = state.celestialE;
  document.getElementById('infernalEId').innerHTML = state.infernalE;
  document.getElementById('totalEId').innerHTML = (total() + state.pureE);
  document.getElementById('EPSOutput').innerHTML = (state.essencePerSecond);
  document.getElementById('maxAmbientEID').innerHTML = state.maxAmbientE;
}

// This updates all mob-related values
function updateMobStuff() {
  document.getElementById('mossAmount').innerHTML = state.moss;
  document.getElementById('mossCost').innerHTML = state.mossCost;
  document.getElementById('wormAmount').innerHTML = state.worm;
  document.getElementById('wormCost').innerHTML = state.wormCost;
  document.getElementById('moleAmount').innerHTML = state.mole;
  document.getElementById('moleCost').innerHTML = state.moleCost;
  document.getElementById('snakeAmount').innerHTML = state.snake;
  document.getElementById('snakeCost').innerHTML = state.snakeCost;
}

// This randomly selects earth or water essence to collect; as the dungeon core starts within a damp cave, it can accrue either earth or water essence, but no other types
function gainEssence(callStyle='normal') {
  let upper;
  if (callStyle === 'normal') {
    upper = state.essencePerClick;
  } else {
    upper = callStyle;
  }
  for(let i = 0; i < upper; i++) {
    let a = Math.random()*5;
    if (state.capacity === total('pure')) {
      text = true;
      break;
    }
    if (state.ambientE > 0 && total() + state.pureE + 1 <= state.capacity) {
      state.ambientE -= 1;
      if (a <= 1) {
        state.waterE += 1;
      } else {
        state.earthE += 1;
      }
    }
  }
  updateEssence();
  if (total("pure") >= state.capacity) {
    document.getElementById('essenceButton').disabled = true;
    if (callStyle === 'normal') {
      addText("your core is full of essence");
    }
  }
}
// This handles buying mobs
function buy(mob) {
  // buying moss
  if (state.pureE >= state.mossCost && mob === "moss") {
    state.moss += 1;
    state.pureE -= state.mossCost;
    document.getElementById("mossAmount").innerHTML = state.moss;
    state.mossCost = Math.floor(state.mossCost * 1.5);
    document.getElementById("mossCost").innerHTML = state.mossCost;
  }
  // buying worms
  if (state.pureE >= state.wormCost && mob === "worm") {
    state.worm += 1;
    state.pureE -= state.wormCost;
    document.getElementById("wormAmount").innerHTML = state.worm;
    state.wormCost = Math.floor(state.wormCost * 1.5);
    document.getElementById("wormCost").innerHTML = state.wormCost;
  }
  // buying moles
  if (state.pureE >= state.moleCost && mob === "mole") {
    state.mole += 1;
    state.pureE -= state.moleCost;
    document.getElementById("moleAmount").innerHTML = state.mole;
    state.moleCost = Math.floor(state.moleCost * 1.5);
    document.getElementById("moleCost").innerHTML = state.moleCost;
  }
  //buying snakes
  if (state.pureE >= state.snakeCost && mob === "snake") {
    state.snake += 1;
    state.pureE -= state.snakeCost;
    document.getElementById("snakeAmount").innerHTML = state.snake;
    state.snakeCost = Math.floor(state.snakeCost * 1.5);
    document.getElementById("snakeCost").innerHTML = state.snakeCost;
  }
  // Renaming the cave
  if (state.location === "A drab cave" && state.moss >= 3) {
    state.location = "A mossy cave";
    document.getElementById('location').innerHTML = state.location;
  } else if (state.location === "A mossy cave" && state.worm + state.mole >= 6 && state.mole > 0) {
    state.location = "A flourishing cave";
    document.getElementById('location').innerHTML = state.location;
  } else if (state.location === "A flourishing cave" && state.snake > 0) {
    state.location = "A noisy cave";
    document.getElementById('location').innerHTML = state.location;
  }
  // Finishing the job; updating the final values
  calculateEPS();
  state.maxAmbientE = 15 + 5 * state.essencePerSecond;
  updateEssence();
  if (state.capacity > total("pure")) {
    document.getElementById('essenceButton').disabled = false;
  }
}

// Calculates essencePerSecond added to ambientE; this determines how quickly the ambient essence in the cave increases
function calculateEPS() {
  state.essencePerSecond = state.moss + 5 * state.worm + 20 * state.mole + 100 * state.snake;
}

// Upgrades cultivation the next level
function upgradeCultivation() {
  if (state.pureE >= cultivationTechniques[state.cultivationLevel - 1][0]) {
    state.pureE -= cultivationTechniques[state.cultivationLevel - 1][0];
    document.getElementById('EPCOutput').innerHTML = cultivationTechniques[state.cultivationLevel - 1][1];
    document.getElementById('PEPSOutput').innerHTML = cultivationTechniques[state.cultivationLevel - 1][2];
    document.getElementById('PPCOutput').innerHTML = cultivationTechniques[state.cultivationLevel - 1][3];
    state.essencePerClick = cultivationTechniques[state.cultivationLevel - 1][1];
    state.passiveEssence = cultivationTechniques[state.cultivationLevel - 1][2];
    state.purificationPerClick = cultivationTechniques[state.cultivationLevel - 1][3];
    state.cultivationLevel += 1;
    if (state.cultivationLevel == 2) {
      document.getElementById('cultivationLevel').innerHTML = 'II';
      document.getElementById('cultivationUpgradeP').innerHTML = cultivationTechniques[state.cultivationLevel - 1][0];
    } else if (state.cultivationLevel == 3) {
      document.getElementById('cultivationLevel').innerHTML = 'III';
      document.getElementById('cultivationUpgradeP').innerHTML = cultivationTechniques[state.cultivationLevel - 1][0];
    } else if (state.cultivationLevel == 4) {
      document.getElementById('cultivationLevel').innerHTML = 'IV';
      document.getElementById('cultivationUpgradeP').innerHTML = cultivationTechniques[state.cultivationLevel - 1][0];
    } else if (state.cultivationLevel == 5) {
      document.getElementById('cultivationLevel').innerHTML = 'V';
      document.getElementById('cultivationUpgrade').style.display = 'none';
    }
    updateEssence();
    document.getElementById('essenceButton').disabled = false;
  }
}

// This function purifies essence, taking tainted essence and generating pure essence
function purify() {
  if (total() > 0) {
    // It selects which one randomly based on frequency
    // This part could really use optimization
    for(let i = 0; i < state.purificationPerClick; i++) {
      let num = Math.floor(total() * Math.random())+1;
      r = [state.earthE, state.waterE, state.fireE, state.airE, state.celestialE, state.infernalE];
      if (total() <= 0) {
        break;
      } else if (num <= r[0]) {
        state.earthE -= 1;
      } else if (num <= r[0] + r[1]) {
        state.waterE -= 1;
      } else if (num <= r[0] + r[1] + r[2]) {
        state.fireE -= 1;
      } else if (num <= r[0] + r[1] + r[2] + r[3]) {
        state.airE -= 1;
      } else if (num <= r[0] + r[1] + r[2] + r[3] + r[4]) {
        state.celestialE -= 1;
      } else {
        state.infernalE -= 1;
      }
      state.pureE += 1;
    }
    updateEssence();
  }
}

// This function handles the levels of ambient essence in the cave
function iterateEssence() {
  setInterval(
    function(){
      calculateEPS();
      // Iterates up ambientE
      state.ambientE += state.essencePerSecond;
      if (state.ambientE >= state.passiveEssence) {
        gainEssence(state.passiveEssence);
      } else {
        gainEssence(state.ambientE);
        state.ambientE = 0;
      }
      // Fixing ambientE if it's too high
      if (state.ambientE > state.maxAmbientE) {
        state.ambientE = state.maxAmbientE;
      }
      updateEssence();
    },1000);
}

// This function repairs cracks in the core and changes associated variables
function repairCore() {
  let completed = false;
  if (crackRepairCosts[5 - state.cracks][0] <= state.pureE) {
    state.pureE -= crackRepairCosts[5 - state.cracks][0];
    state.capacity = crackRepairCosts[5 - state.cracks][1];
    if(state.cracks > 1) {
      document.getElementById("coreRepairP").innerHTML = `${crackRepairCosts[6 - state.cracks][0]}`;
    } else {
      document.getElementById('coreRepair').style.display = "none";
    }
    completed = true;
  }
  if (completed) {
    state.cracks -= 1;
    if (state.cracks > 1) {
      addText(`a crack in your crystal core shivers, then vanishes as essence repairs it. you feel your power and capacity grow. there are ${state.cracks} cracks left`);
    } else if (state.cracks === 1) {
      addText(`a crack in your crystal core shivers, then vanishes as essence repairs it. you feel your power and capacity grow. there is 1 crack left`);
    } else if (state.cracks === 0) {
      addText(`the final crack in your crystal core shivers, then vanishes as essence repairs it. you feel your power and capacity grow dramatically. your core is a flawless diamond`);
    }
    document.getElementById('essenceButton').disabled = false;
  }
  updateEssence();
}

// This function tells us the result of an optionButton click
function optionFunction(input) {
  state['choice']['result'] = input;
  document.getElementById("option1").style.display = "none";
  document.getElementById("option2").style.display = "none";
}

// This function adds text to the "text" span
function addText(input) {
  let container = document.getElementById('text');
  let para = document.createElement("p");
  let node = document.createTextNode(input);
  para.appendChild(node);
  document.getElementById("text").insertBefore(para,container.firstChild);
}

// The function that runs the main loop. In the future, the player's rank will be able to advance beyond "g9," but currently this function just calls 'gRanks'
function main () {
  if (state.rank[0] === "g") {
    gRanks();
  }
}

// Initializers:
// This sets the total essence capacity of the player's core to the set value
document.getElementById('capacityId').innerHTML = state.capacity;

// This increments the amount of free-floating essence
iterateEssence();

// This begins the game clock
gameTimer();

// This runs the main function every second
setInterval(main,1000);