// ==========================
// ALASHIA ACADEMY PROTOTYPE
// PART 1 - GAME DATA
// ==========================

// Player

const player = {
    name: "Player",

    stats: {
        charm: 10,
        confidence: 10,
        creativity: 10,
        intelligence: 10
    },

    energy: 100,

    inventory: [],

    journal: [
        "Welcome to Alashia Academy."
    ]
};

// Time System

const gameTime = {
    day: 1,
    period: "Morning"
};

// Characters

const characters = {

    aiden: {
        name: "Aiden",
        affection: 10,
        friendship: 15,
        trust: 10,

        notes: [
            "Seems friendly."
        ]
    },

    ren: {
        name: "Ren",
        affection: 5,
        friendship: 10,
        trust: 15,

        notes: [
            "Prefers quiet places."
        ]
    },

    kai: {
        name: "Kai",
        affection: 0,
        friendship: 5,
        trust: 5,

        notes: [
            "Always busy."
        ]
    }

};

// Locations

const locations = {

    courtyard: {
        name: "Courtyard"
    },

    library: {
        name: "Library"
    },

    cafeteria: {
        name: "Cafeteria"
    },

    artWing: {
        name: "Art Wing"
    },

    dorms: {
        name: "Dorms"
    }

};

// Events

const events = [
    "Rainy Day",
    "Festival",
    "Club Fair",
    "Pop Quiz",
    "Movie Night"
];

// Messages

const messages = [];


 // ==========================
// ALASHIA ACADEMY PROTOTYPE
// PART 2 - TIME & ENERGY SYSTEM
// ==========================

// --------------------------
// TIME PERIODS
// --------------------------

const timePeriods = [
    "Morning",
    "Afternoon",
    "Evening"
];


// --------------------------
// TIME FUNCTIONS
// --------------------------

function getCurrentTime() {
    return gameTime.period;
}


function advanceTime() {

    const currentIndex = timePeriods.indexOf(gameTime.period);

    // If there is another time period today
    if (currentIndex < timePeriods.length - 1) {

        gameTime.period = timePeriods[currentIndex + 1];

        console.log("Time advanced to:", gameTime.period);

        restoreSmallEnergy();

        return;
    }

    // If Evening has ended, start a new day
    startNewDay();
}


// --------------------------
// NEW DAY
// --------------------------

function startNewDay() {

    gameTime.day++;

    gameTime.period = "Morning";

    player.energy = 100;

    console.log("A new day has started!");
    console.log("Day:", gameTime.day);

    addJournalEntry(
        `Day ${gameTime.day} has begun at Alashia Academy.`
    );

}


// --------------------------
// ENERGY SYSTEM
// --------------------------

function useEnergy(amount) {

    if (player.energy < amount) {

        console.log("You don't have enough energy.");

        return false;
    }

    player.energy -= amount;

    console.log(
        `Energy used: ${amount}. Remaining: ${player.energy}`
    );

    return true;
}


function restoreSmallEnergy() {

    player.energy += 10;

    if (player.energy > 100) {
        player.energy = 100;
    }

}


// --------------------------
// SLEEP
// --------------------------

function sleep() {

    console.log("You went to sleep.");

    startNewDay();

}


// --------------------------
// ACTION SYSTEM
// --------------------------

function performAction(actionName, energyCost) {

    if (!useEnergy(energyCost)) {
        return false;
    }

    console.log(
        `Action performed: ${actionName}`
    );

    return true;
}


// --------------------------
// EXAMPLE ACTIONS
// --------------------------

function study() {

    if (!performAction("Studying", 15)) {
        return;
    }

    player.stats.intelligence += 2;

    addJournalEntry(
        "You spent some time studying."
    );

    console.log(
        "Intelligence increased!"
    );

    advanceTime();
}


function relax() {

    if (!performAction("Relaxing", 5)) {
        return;
    }

    player.energy += 20;

    if (player.energy > 100) {
        player.energy = 100;
    }

    console.log(
        "You relaxed and recovered some energy."
    );

    advanceTime();
}


// --------------------------
// BASIC SCHOOL ACTION
// --------------------------

function attendClass() {

    if (!performAction("Attending Class", 10)) {
        return;
    }

    player.stats.intelligence += 1;

    addJournalEntry(
        "You attended class at Alashia Academy."
    );

    console.log(
        "You learned something new."
    );

    advanceTime();
}


// --------------------------
// JOURNAL SYSTEM
// --------------------------

function addJournalEntry(entry) {

    if (!player.journal.includes(entry)) {

        player.journal.push(entry);

        console.log(
            "Journal updated:",
            entry
        );
    }
}


// --------------------------
// INVENTORY SYSTEM
// --------------------------

function addItem(item) {

    if (!player.inventory.includes(item)) {

        player.inventory.push(item);

        console.log(
            `Item obtained: ${item}`
        );

        addJournalEntry(
            `You obtained: ${item}`
        );
    }

}


function removeItem(item) {

    const index = player.inventory.indexOf(item);

    if (index !== -1) {

        player.inventory.splice(index, 1);

        console.log(
            `Item removed: ${item}`
        );

        return true;
    }

    return false;
}


function hasItem(item) {

    return player.inventory.includes(item);

}


// --------------------------
// PLAYER STAT SYSTEM
// --------------------------

function increaseStat(stat, amount) {

    if (player.stats[stat] === undefined) {

        console.log(
            `Stat "${stat}" does not exist.`
        );

        return;
    }

    player.stats[stat] += amount;

    console.log(
        `${stat} increased by ${amount}!`
    );
}


function decreaseStat(stat, amount) {

    if (player.stats[stat] === undefined) {
        return;
    }

    player.stats[stat] -= amount;

    if (player.stats[stat] < 0) {
        player.stats[stat] = 0;
    }

}


// --------------------------
// DEBUG INFORMATION
// --------------------------

function showGameStatus() {

    console.log("===== ALASHIA ACADEMY =====");

    console.log(
        "Day:",
        gameTime.day
    );

    console.log(
        "Time:",
        gameTime.period
    );

    console.log(
        "Energy:",
        player.energy
    );

    console.log(
        "Stats:",
        player.stats
    );

    console.log(
        "Inventory:",
        player.inventory
    );

    console.log(
        "Journal:",
        player.journal
    );

    console.log(
        "===========================");
}

 // ==========================
// ALASHIA ACADEMY PROTOTYPE
// PART 3 - RELATIONSHIP SYSTEM
// ==========================


// --------------------------
// RELATIONSHIP LIMITS
// --------------------------

const relationshipLimits = {
    affection: 100,
    friendship: 100,
    trust: 100
};


// --------------------------
// CHANGE A RELATIONSHIP
// --------------------------

function changeRelationship(characterID, relationshipType, amount) {

    const character = characters[characterID];

    if (!character) {
        console.log("Character not found:", characterID);
        return;
    }

    if (character[relationshipType] === undefined) {
        console.log(
            "Relationship type not found:",
            relationshipType
        );
        return;
    }

    character[relationshipType] += amount;

    // Keep relationship between 0 and 100

    if (character[relationshipType] > 100) {
        character[relationshipType] = 100;
    }

    if (character[relationshipType] < 0) {
        character[relationshipType] = 0;
    }

    console.log(
        `${character.name}'s ${relationshipType} changed by ${amount}.`
    );

    console.log(
        `${relationshipType}: ${character[relationshipType]}`
    );
}


// --------------------------
// AFFECTION
// --------------------------

function changeAffection(characterID, amount) {

    changeRelationship(
        characterID,
        "affection",
        amount
    );

}


// --------------------------
// FRIENDSHIP
// --------------------------

function changeFriendship(characterID, amount) {

    changeRelationship(
        characterID,
        "friendship",
        amount
    );

}


// --------------------------
// TRUST
// --------------------------

function changeTrust(characterID, amount) {

    changeRelationship(
        characterID,
        "trust",
        amount
    );

}


// --------------------------
// GET RELATIONSHIP
// --------------------------

function getRelationship(characterID) {

    const character = characters[characterID];

    if (!character) {
        console.log(
            "Character not found."
        );

        return null;
    }

    return {
        affection: character.affection,
        friendship: character.friendship,
        trust: character.trust
    };

}


// --------------------------
// SHOW RELATIONSHIP
// --------------------------

function showRelationship(characterID) {

    const character = characters[characterID];

    if (!character) {
        console.log(
            "Character not found."
        );

        return;
    }

    console.log(
        "===== RELATIONSHIP ====="
    );

    console.log(
        "Character:",
        character.name
    );

    console.log(
        "❤️ Affection:",
        character.affection + "%"
    );

    console.log(
        "🤝 Friendship:",
        character.friendship + "%"
    );

    console.log(
        "🔐 Trust:",
        character.trust + "%"
    );

    console.log(
        "========================"
    );
}


// --------------------------
// CHARACTER NOTES
// --------------------------

function addCharacterNote(characterID, note) {

    const character = characters[characterID];

    if (!character) {
        return;
    }

    if (!character.notes.includes(note)) {

        character.notes.push(note);

        console.log(
            `New note about ${character.name}: ${note}`
        );
    }
}


// --------------------------
// CHARACTER INTERACTION
// --------------------------

function spendTimeWith(characterID) {

    const character = characters[characterID];

    if (!character) {

        console.log(
            "Character not found."
        );

        return;
    }

    if (!performAction(
        `Spending time with ${character.name}`,
        15
    )) {
        return;
    }


    // Basic relationship increase

    changeFriendship(
        characterID,
        5
    );

    changeAffection(
        characterID,
        2
    );


    addCharacterNote(
        characterID,
        `You spent time with ${character.name}.`
    );


    addJournalEntry(
        `You spent some time with ${character.name}.`
    );


    console.log(
        `You spent time with ${character.name}.`
    );


    advanceTime();
}


// --------------------------
// TALK TO CHARACTER
// --------------------------

function talkToCharacter(characterID) {

    const character = characters[characterID];

    if (!character) {
        return;
    }


    if (!performAction(
        `Talking to ${character.name}`,
        5
    )) {
        return;
    }


    changeFriendship(
        characterID,
        3
    );

    changeTrust(
        characterID,
        2
    );


    console.log(
        `You talked with ${character.name}.`
    );


    advanceTime();
}


// --------------------------
// GIVE GIFT
// --------------------------

function giveGift(characterID, item) {

    const character = characters[characterID];

    if (!character) {
        return;
    }


    if (!hasItem(item)) {

        console.log(
            `You don't have ${item}.`
        );

        return;
    }


    removeItem(item);


    // Basic gift reaction

    changeAffection(
        characterID,
        8
    );

    changeFriendship(
        characterID,
        5
    );


    addCharacterNote(
        characterID,
        `You gave ${character.name} a ${item}.`
    );


    addJournalEntry(
        `You gave ${character.name} a ${item}.`
    );


    console.log(
        `${character.name} received the ${item}.`
    );
}


// --------------------------
// RELATIONSHIP CHECKS
// --------------------------

function hasEnoughAffection(
    characterID,
    requiredAmount
) {

    const character = characters[characterID];

    if (!character) {
        return false;
    }

    return character.affection >= requiredAmount;
}


function hasEnoughFriendship(
    characterID,
    requiredAmount
) {

    const character = characters[characterID];

    if (!character) {
        return false;
    }

    return character.friendship >= requiredAmount;
}


function hasEnoughTrust(
    characterID,
    requiredAmount
) {

    const character = characters[characterID];

    if (!character) {
        return false;
    }

    return character.trust >= requiredAmount;
}


// --------------------------
// ROUTE CHECK
// --------------------------

function canStartRomance(characterID) {

    const character = characters[characterID];

    if (!character) {
        return false;
    }


    const affectionReady =
        character.affection >= 70;

    const trustReady =
        character.trust >= 50;

    const friendshipReady =
        character.friendship >= 60;


    return (
        affectionReady &&
        trustReady &&
        friendshipReady
    );
}


// --------------------------
// RELATIONSHIP LEVEL
// --------------------------

function getRelationshipLevel(characterID) {

    const character = characters[characterID];

    if (!character) {
        return "Unknown";
    }


    const average =
        (
            character.affection +
            character.friendship +
            character.trust
        ) / 3;


    if (average >= 90) {
        return "Soulmate";
    }

    if (average >= 75) {
        return "Very Close";
    }

    if (average >= 50) {
        return "Close Friend";
    }

    if (average >= 25) {
        return "Acquaintance";
    }

    return "Stranger";
}


// --------------------------
// SHOW ALL RELATIONSHIPS
// --------------------------

function showAllRelationships() {

    console.log(
        "===== ALL RELATIONSHIPS ====="
    );


    for (
        const characterID in characters
    ) {

        const character =
            characters[characterID];


        console.log(
            `${character.name}:`
        );

        console.log(
            "❤️ Affection:",
            character.affection + "%"
        );

        console.log(
            "🤝 Friendship:",
            character.friendship + "%"
        );

        console.log(
            "🔐 Trust:",
            character.trust + "%"
        );

        console.log(
            "⭐ Level:",
            getRelationshipLevel(characterID)
        );

        console.log(
            "-----------------------------"
        );
    }
}

 // ==========================
// ALASHIA ACADEMY PROTOTYPE
// PART 4 - PHONE, JOURNAL & INVENTORY
// ==========================


// ==========================
// PHONE SYSTEM
// ==========================

const phone = {

    unlocked: true,

    contacts: [
        "aiden",
        "ren",
        "kai"
    ],

    messages: {},

    notifications: []
};


// --------------------------
// CREATE MESSAGE THREAD
// --------------------------

function createMessageThread(characterID) {

    if (!characters[characterID]) {
        console.log("Character not found:", characterID);
        return;
    }

    if (!phone.messages[characterID]) {

        phone.messages[characterID] = [];

        console.log(
            `Message thread created for ${characters[characterID].name}.`
        );
    }
}


// --------------------------
// SEND MESSAGE
// --------------------------

function sendMessage(characterID, text) {

    if (!characters[characterID]) {
        console.log("Character not found.");
        return;
    }

    createMessageThread(characterID);

    phone.messages[characterID].push({

        sender: "Player",

        text: text,

        day: gameTime.day,

        period: gameTime.period
    });

    console.log(
        `Message sent to ${characters[characterID].name}: ${text}`
    );
}


// --------------------------
// RECEIVE MESSAGE
// --------------------------

function receiveMessage(characterID, text) {

    if (!characters[characterID]) {
        return;
    }

    createMessageThread(characterID);

    phone.messages[characterID].push({

        sender: characters[characterID].name,

        text: text,

        day: gameTime.day,

        period: gameTime.period
    });


    phone.notifications.push({

        type: "message",

        characterID: characterID,

        text: text
    });


    console.log(
        `New message from ${characters[characterID].name}: ${text}`
    );
}


// --------------------------
// READ MESSAGES
// --------------------------

function readMessages(characterID) {

    if (!phone.messages[characterID]) {

        console.log(
            "No messages with this character."
        );

        return;
    }


    console.log(
        `===== ${characters[characterID].name} =====`
    );


    phone.messages[characterID].forEach(
        message => {

            console.log(
                `${message.sender}: ${message.text}`
            );

        }
    );
}


// --------------------------
// CLEAR PHONE NOTIFICATIONS
// --------------------------

function clearNotifications() {

    phone.notifications = [];

    console.log(
        "Phone notifications cleared."
    );
}


// ==========================
// JOURNAL SYSTEM
// ==========================


// Add a journal category

const journal = {

    story: [],

    characters: [],

    locations: [],

    secrets: [],

    events: []
};


// --------------------------
// ADD STORY ENTRY
// --------------------------

function addStoryEntry(text) {

    if (!journal.story.includes(text)) {

        journal.story.push(text);

        console.log(
            "New story entry unlocked."
        );
    }
}


// --------------------------
// ADD CHARACTER ENTRY
// --------------------------

function addCharacterEntry(characterID, text) {

    if (!characters[characterID]) {
        return;
    }

    const entry = {

        characterID: characterID,

        text: text
    };


    const alreadyExists =
        journal.characters.some(
            item =>
                item.characterID === characterID &&
                item.text === text
        );


    if (!alreadyExists) {

        journal.characters.push(entry);

        console.log(
            `New information about ${characters[characterID].name} unlocked.`
        );
    }
}


// --------------------------
// ADD LOCATION ENTRY
// --------------------------

function addLocationEntry(locationID, text) {

    if (!locations[locationID]) {
        return;
    }


    const entry = {

        locationID: locationID,

        text: text
    };


    const alreadyExists =
        journal.locations.some(
            item =>
                item.locationID === locationID &&
                item.text === text
        );


    if (!alreadyExists) {

        journal.locations.push(entry);

        console.log(
            `Location discovered: ${locations[locationID].name}`
        );
    }
}


// --------------------------
// ADD SECRET
// --------------------------

function discoverSecret(secretText) {

    if (!journal.secrets.includes(secretText)) {

        journal.secrets.push(secretText);

        console.log(
            "SECRET DISCOVERED!"
        );
    }
}


// --------------------------
// ADD EVENT TO JOURNAL
// --------------------------

function recordEvent(eventName) {

    if (!journal.events.includes(eventName)) {

        journal.events.push(eventName);

        console.log(
            `Event recorded: ${eventName}`
        );
    }
}


// --------------------------
// SHOW JOURNAL
// --------------------------

function showJournal() {

    console.log(
        "========== JOURNAL =========="
    );


    console.log(
        "STORY:"
    );

    journal.story.forEach(
        entry => console.log("- " + entry)
    );


    console.log(
        "CHARACTERS:"
    );

    journal.characters.forEach(
        entry => {

            console.log(
                `- ${characters[entry.characterID].name}: ${entry.text}`
            );

        }
    );


    console.log(
        "LOCATIONS:"
    );

    journal.locations.forEach(
        entry => {

            console.log(
                `- ${locations[entry.locationID].name}: ${entry.text}`
            );

        }
    );


    console.log(
        "SECRETS:"
    );

    journal.secrets.forEach(
        secret => console.log("- " + secret)
    );


    console.log(
        "EVENTS:"
    );

    journal.events.forEach(
        event => console.log("- " + event)
    );


    console.log(
        "============================="
    );
}


// ==========================
// INVENTORY SYSTEM
// ==========================


// Available items

const items = {

    strawberryTea: {

        name: "Strawberry Tea",

        type: "gift",

        description:
            "A sweet strawberry-flavored drink."
    },


    sketchbook: {

        name: "Sketchbook",

        type: "gift",

        description:
            "A blank sketchbook with thick drawing paper."
    },


    energyDrink: {

        name: "Energy Drink",

        type: "consumable",

        description:
            "Restores some energy."
    },


    schoolBadge: {

        name: "Alashia Academy Badge",

        type: "key",

        description:
            "An official academy badge."
    }

};


// --------------------------
// GIVE ITEM TO PLAYER
// --------------------------

function obtainItem(itemID) {

    if (!items[itemID]) {

        console.log(
            "Item does not exist:",
            itemID
        );

        return;
    }


    const item = items[itemID];


    player.inventory.push(itemID);


    console.log(
        `Obtained: ${item.name}`
    );


    addJournalEntry(
        `You obtained ${item.name}.`
    );
}


// --------------------------
// REMOVE ITEM
// --------------------------

function discardItem(itemID) {

    const index =
        player.inventory.indexOf(itemID);


    if (index === -1) {

        console.log(
            "You don't have that item."
        );

        return;
    }


    player.inventory.splice(
        index,
        1
    );


    console.log(
        `Removed: ${items[itemID].name}`
    );
}


// --------------------------
// CHECK INVENTORY
// --------------------------

function showInventory() {

    console.log(
        "========== INVENTORY =========="
    );


    if (player.inventory.length === 0) {

        console.log(
            "Your inventory is empty."
        );

    } else {

        player.inventory.forEach(
            itemID => {

                const item =
                    items[itemID];

                if (item) {

                    console.log(
                        `🎒 ${item.name}`
                    );

                    console.log(
                        item.description
                    );
                }

            }
        );
    }


    console.log(
        "==============================="
    );
}


// --------------------------
// CHECK IF PLAYER OWNS ITEM
// --------------------------

function ownsItem(itemID) {

    return player.inventory.includes(itemID);

}


// ==========================
// USE ITEMS
// ==========================

function useItem(itemID) {

    if (!ownsItem(itemID)) {

        console.log(
            "You don't have this item."
        );

        return;
    }


    const item = items[itemID];


    if (item.type === "consumable") {

        if (itemID === "energyDrink") {

            player.energy += 30;


            if (player.energy > 100) {
                player.energy = 100;
            }


            discardItem(itemID);


            console.log(
                "You drank the Energy Drink."
            );

            console.log(
                `Energy: ${player.energy}`
            );
        }
    }

}


// ==========================
// GIFT SYSTEM
// ==========================

function giveItemAsGift(
    characterID,
    itemID
) {

    if (!characters[characterID]) {

        console.log(
            "Character not found."
        );

        return;
    }


    if (!ownsItem(itemID)) {

        console.log(
            "You don't have that item."
        );

        return;
    }


    const item = items[itemID];


    if (item.type !== "gift") {

        console.log(
            "This item can't be given as a gift."
        );

        return;
    }


    discardItem(itemID);


    // Basic gift bonus

    changeAffection(
        characterID,
        8
    );


    changeFriendship(
        characterID,
        5
    );


    addCharacterEntry(
        characterID,
        `You gave them a ${item.name}.`
    );


    addJournalEntry(
        `You gave ${characters[characterID].name} a ${item.name}.`
    );


    console.log(
        `${characters[characterID].name} received ${item.name}!`
    );
}


// ==========================
// PHONE CONTACT CHECK
// ==========================

function addPhoneContact(characterID) {

    if (!characters[characterID]) {
        return;
    }


    if (!phone.contacts.includes(characterID)) {

        phone.contacts.push(
            characterID
        );


        console.log(
            `${characters[characterID].name} was added to your contacts.`
        );
    }
}


// ==========================
// PHONE STATUS
// ==========================

function showPhone() {

    console.log(
        "========== PHONE =========="
    );


    console.log(
        "Contacts:"
    );


    phone.contacts.forEach(
        characterID => {

            if (characters[characterID]) {

                console.log(
                    "📱 " +
                    characters[characterID].name
                );
            }

        }
    );


    console.log(
        "Notifications:",
        phone.notifications.length
    );


    console.log(
        "==========================="
    );
}
  // ==========================================
// ALASHIA ACADEMY PROTOTYPE
// PART 5 - CAMPUS MAP, EXPLORATION & EVENTS
// ==========================================


// ==========================================
// CAMPUS MAP
// ==========================================

const campus = {

    currentLocation: "courtyard",

    locations: {

        courtyard: {
            name: "Courtyard",
            description:
                "The central courtyard of Alashia Academy. Students gather here between classes.",
            energyCost: 5
        },

        library: {
            name: "Library",
            description:
                "A quiet library filled with books, study tables, and computers.",
            energyCost: 5
        },

        cafeteria: {
            name: "Cafeteria",
            description:
                "The academy cafeteria. It is usually packed around lunchtime.",
            energyCost: 5
        },

        artWing: {
            name: "Art Wing",
            description:
                "A colorful hallway filled with paintings, sculptures, and student projects.",
            energyCost: 10
        },

        musicHall: {
            name: "Music Hall",
            description:
                "A large performance building where students practice music.",
            energyCost: 10
        },

        scienceLab: {
            name: "Science Lab",
            description:
                "A laboratory used for experiments and engineering projects.",
            energyCost: 10
        },

        dorms: {
            name: "Dorms",
            description:
                "The student dormitories. Each hallway has its own personality.",
            energyCost: 5
        }

    }

};


// ==========================================
// MOVE AROUND CAMPUS
// ==========================================

function travelTo(locationID) {

    const location =
        campus.locations[locationID];


    if (!location) {

        console.log(
            "Location does not exist:",
            locationID
        );

        return;
    }


    if (
        campus.currentLocation === locationID
    ) {

        console.log(
            `You are already at the ${location.name}.`
        );

        return;
    }


    if (
        !useEnergy(location.energyCost)
    ) {

        console.log(
            "You are too tired to travel there."
        );

        return;
    }


    campus.currentLocation =
        locationID;


    console.log(
        `You traveled to the ${location.name}.`
    );


    console.log(
        location.description
    );


    addLocationEntry(
        locationID,
        location.description
    );

}


// ==========================================
// CURRENT LOCATION
// ==========================================

function showCurrentLocation() {

    const location =
        campus.locations[
            campus.currentLocation
        ];


    console.log(
        "========== CURRENT LOCATION =========="
    );


    console.log(
        location.name
    );


    console.log(
        location.description
    );


    console.log(
        "======================================"
    );
}


// ==========================================
// SHOW CAMPUS
// ==========================================

function showCampus() {

    console.log(
        "========== ALASHIA ACADEMY =========="
    );


    for (
        const locationID in campus.locations
    ) {

        const location =
            campus.locations[locationID];


        console.log(
            `${locationID}: ${location.name}`
        );

    }


    console.log(
        "======================================"
    );
}


// ==========================================
// RANDOM EVENTS
// ==========================================

const randomEvents = [

    {
        name: "Rainy Day",

        chance: 0.15,

        description:
            "Rain begins falling across the academy campus.",

        effect: function() {

            addStoryEntry(
                "A sudden rainy day changed the atmosphere around campus."
            );

            console.log(
                "🌧️ Rain is falling across Alashia Academy."
            );
        }
    },


    {
        name: "Club Fair",

        chance: 0.10,

        description:
            "The academy is holding a club fair.",

        effect: function() {

            recordEvent(
                "Club Fair"
            );

            addStoryEntry(
                "The academy held a club fair."
            );

            console.log(
                "🎭 The Club Fair is happening today!"
            );
        }
    },


    {
        name: "Pop Quiz",

        chance: 0.10,

        description:
            "A teacher announces an unexpected pop quiz.",

        effect: function() {

            recordEvent(
                "Pop Quiz"
            );

            player.stats.intelligence += 1;

            console.log(
                "📚 You survived a surprise pop quiz."
            );
        }
    },


    {
        name: "Free Lunch",

        chance: 0.12,

        description:
            "The cafeteria is giving away free food today.",

        effect: function() {

            player.energy += 20;


            if (player.energy > 100) {
                player.energy = 100;
            }


            console.log(
                "🍔 Free lunch restored some energy!"
            );
        }
    },


    {
        name: "Academy Announcement",

        chance: 0.08,

        description:
            "An important announcement is made over the academy speakers.",

        effect: function() {

            addStoryEntry(
                "An important academy announcement was made."
            );

            console.log(
                "📢 An important announcement echoes across campus."
            );
        }
    }

];


// ==========================================
// RANDOM EVENT CHECK
// ==========================================

function checkForRandomEvent() {

    const roll = Math.random();


    let accumulatedChance = 0;


    for (
        const event of randomEvents
    ) {

        accumulatedChance +=
            event.chance;


        if (
            roll <= accumulatedChance
        ) {

            triggerRandomEvent(
                event
            );

            return;
        }
    }


    console.log(
        "Nothing unusual happened."
    );
}


// ==========================================
// TRIGGER RANDOM EVENT
// ==========================================

function triggerRandomEvent(event) {

    console.log(
        "===== RANDOM EVENT ====="
    );


    console.log(
        event.name
    );


    console.log(
        event.description
    );


    recordEvent(
        event.name
    );


    event.effect();


    console.log(
        "========================"
    );
}


// ==========================================
// DAILY EVENT
// ==========================================

function dailyEventCheck() {

    console.log(
        `Checking events for Day ${gameTime.day}...`
    );


    checkForRandomEvent();

}


// ==========================================
// CHARACTER LOCATION SYSTEM
// ==========================================


// Characters can have favorite locations.

const characterLocations = {

    aiden: [
        "courtyard",
        "artWing"
    ],

    ren: [
        "library",
        "scienceLab"
    ],

    kai: [
        "cafeteria",
        "musicHall"
    ]

};


// ==========================================
// CHECK FOR CHARACTER
// ==========================================

function findCharactersAtLocation(
    locationID
) {

    console.log(
        `Looking for students at ${campus.locations[locationID].name}...`
    );


    let foundSomeone = false;


    for (
        const characterID in characterLocations
    ) {

        const locations =
            characterLocations[characterID];


        if (
            locations.includes(locationID)
        ) {

            const character =
                characters[characterID];


            console.log(
                `👤 ${character.name} is here.`
            );


            foundSomeone = true;
        }
    }


    if (!foundSomeone) {

        console.log(
            "Nobody you know is here right now."
        );
    }
}


// ==========================================
// MEET CHARACTER
// ==========================================

function meetCharacter(
    characterID
) {

    const character =
        characters[characterID];


    if (!character) {

        console.log(
            "Character not found."
        );

        return;
    }


    console.log(
        `You met ${character.name}.`
    );


    addPhoneContact(
        characterID
    );


    addCharacterEntry(
        characterID,
        `You met ${character.name} at Alashia Academy.`
    );


    addJournalEntry(
        `You met ${character.name}.`
    );


    changeFriendship(
        characterID,
        2
    );

}


// ==========================================
// LOCATION INTERACTION
// ==========================================

function exploreLocation() {

    const locationID =
        campus.currentLocation;


    const location =
        campus.locations[locationID];


    console.log(
        `You explore the ${location.name}.`
    );


    if (
        locationID === "library"
    ) {

        increaseStat(
            "intelligence",
            1
        );

        addStoryEntry(
            "You explored the academy library."
        );
    }


    if (
        locationID === "artWing"
    ) {

        increaseStat(
            "creativity",
            1
        );

        addStoryEntry(
            "You explored the Art Wing."
        );
    }


    if (
        locationID === "scienceLab"
    ) {

        increaseStat(
            "intelligence",
            1
        );

        addStoryEntry(
            "You explored the Science Lab."
        );
    }


    if (
        locationID === "courtyard"
    ) {

        increaseStat(
            "confidence",
            1
        );

        addStoryEntry(
            "You spent time in the academy courtyard."
        );
    }


    if (
        locationID === "cafeteria"
    ) {

        player.energy += 10;


        if (player.energy > 100) {
            player.energy = 100;
        }


        addStoryEntry(
            "You stopped by the cafeteria."
        );
    }


    if (
        locationID === "musicHall"
    ) {

        increaseStat(
            "charm",
            1
        );

        addStoryEntry(
            "You explored the Music Hall."
        );
    }


    if (
        locationID === "dorms"
    ) {

        addStoryEntry(
            "You explored the academy dorms."
        );
    }


    console.log(
        "Exploration complete."
    );

}


// ==========================================
// CAMPUS ACTION
// ==========================================

function campusAction() {

    if (
        !performAction(
            "Exploring the campus",
            5
        )
    ) {

        return;
    }


    exploreLocation();


    findCharactersAtLocation(
        campus.currentLocation
    );


    checkForRandomEvent();


    advanceTime();

}


// ==========================================
// START NEW DAY
// ==========================================

// Replace the original startNewDay behavior
// with additional campus/event behavior.

const originalStartNewDay =
    startNewDay;


startNewDay = function() {

    originalStartNewDay();


    campus.currentLocation =
        "courtyard";


    dailyEventCheck();

};


// ==========================================
// SPECIAL LOCATION DISCOVERY
// ==========================================

function unlockLocation(
    locationID
) {

    if (
        !campus.locations[locationID]
    ) {

        console.log(
            "That location does not exist."
        );

        return;
    }


    addLocationEntry(
        locationID,
        campus.locations[locationID].description
    );


    console.log(
        `${campus.locations[locationID].name} has been discovered!`
    );

}


// ==========================================
// CAMPUS STATUS
// ==========================================

function showCampusStatus() {

    console.log(
        "========= CAMPUS STATUS ========="
    );


    console.log(
        "Day:",
        gameTime.day
    );


    console.log(
        "Time:",
        gameTime.period
    );


    console.log(
        "Current Location:",
        campus.locations[
            campus.currentLocation
        ].name
    );


    console.log(
        "Energy:",
        player.energy
    );


    console.log(
        "================================="
    );

}


// ==========================================
// END OF PART 5
// ==========================================
console.log("🔥 ALASHIA JS LOADED 🔥");
alert("ALASHIA JAVASCRIPT IS RUNNING!");

