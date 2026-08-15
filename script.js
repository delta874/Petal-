/* =================================
   PINK PETALS
   Paper Lantern Studios
================================= */

let affection = 0;
let friendship = 0;
let money = 0;
let energy = 100;
let day = 1;
let location = "Academy Gate";

let current = 0;

let typingTimer = null;
let typing = false;


/* =================================
   STORY
================================= */

const story = [

    {
        name: "",
        text:
        "Cherry blossoms drift through the spring air as you stand before the gates of Paper Lantern Academy.",

        location: "Academy Gate",

        choices: [
            {
                text: "Enter the academy",
                affection: 0,
                friendship: 0,
                next: 1
            }
        ]
    },


    {
        name: "",
        text:
        "Students hurry between classes while pink petals dance in the breeze.",

        location: "Courtyard",

        choices: [
            {
                text: "Walk toward the courtyard",
                affection: 0,
                friendship: 0,
                next: 2
            }
        ]
    },


    {
        name: "",
        text:
        "Someone suddenly crashes into you. Books scatter across the stone path.",

        location: "Courtyard",

        choices: [
            {
                text: "Help pick up the books",
                affection: 5,
                friendship: 5,
                next: 3
            },

            {
                text: "Apologize quickly",
                affection: 2,
                friendship: 2,
                next: 4
            }
        ]
    },


    {
        name: "Aster",

        text:
        "Ah! I'm so sorry! I wasn't looking where I was going!",

        location: "Courtyard",

        choices: [
            {
                text: "It's okay.",
                affection: 5,
                friendship: 5,
                next: 5
            },

            {
                text: "You seem nervous.",
                affection: 8,
                friendship: 3,
                next: 5
            }
        ]
    },


    {
        name: "Aster",

        text:
        "No, no, it's my fault. I get distracted way too easily.",

        location: "Courtyard",

        choices: [
            {
                text: "Don't worry about it.",
                affection: 5,
                friendship: 5,
                next: 5
            }
        ]
    },


    {
        name: "Aster",

        text:
        "Thanks for helping me. Most people would've just walked by.",

        location: "Courtyard",

        choices: [
            {
                text: "I couldn't leave you like that.",
                affection: 10,
                friendship: 5,
                next: 6
            },

            {
                text: "Anyone would've helped.",
                affection: 5,
                friendship: 8,
                next: 6
            }
        ]
    },


    {
        name: "Aster",

        text:
        "I'm Aster. Maybe we'll see each other around campus?",

        location: "Courtyard",

        choices: [
            {
                text: "I'd like that.",
                affection: 10,
                friendship: 5,
                next: 7
            },

            {
                text: "See you around.",
                affection: 5,
                friendship: 8,
                next: 7
            }
        ]
    },


    {
        name: "",

        text:
        "The bell rings across campus. Your first day at Paper Lantern Academy has officially begun.",

        location: "Main Building",

        choices: [
            {
                text: "Continue",
                affection: 0,
                friendship: 0,
                next: 8
            }
        ]
    },


    {
        name: "",

        text:
        "🌸 End of Demo 🌸",

        location: "Academy",

        choices: []
    }

];


/* =================================
   UPDATE HUD
================================= */

function updateHUD() {

    document.getElementById("affection").textContent =
        affection;

    document.getElementById("friendship").textContent =
        friendship;

    document.getElementById("money").textContent =
        money;

    document.getElementById("energy").textContent =
        energy;

    document.getElementById("day").textContent =
        day;

    document.getElementById("location").textContent =
        location;
}


/* =================================
   TYPEWRITER
================================= */

function typeText(text) {

    clearInterval(typingTimer);

    const dialogue =
        document.getElementById("dialogue");

    dialogue.textContent = "";

    let i = 0;

    typing = true;


    typingTimer = setInterval(() => {

        dialogue.textContent +=
            text.charAt(i);

        i++;


        if (i >= text.length) {

            clearInterval(typingTimer);

            typing = false;
        }

    }, 25);
}


/* =================================
   RENDER SCENE
================================= */

function renderScene() {

    const scene =
        story[current];


    /* =============================
       LOCATION
    ============================= */

    location =
        scene.location || "Academy";


    /* =============================
       CHARACTER NAME
    ============================= */

    const nameBox =
        document.getElementById("name");


    if (scene.name === "") {

        nameBox.style.display =
            "none";

    } else {

        nameBox.style.display =
            "inline-block";

        nameBox.textContent =
            scene.name;
    }


    /* =============================
       CHAPTER TEXT
    ============================= */

    const chapter =
        document.getElementById("chapter-text");


    if (chapter) {

        chapter.textContent =
            `Day ${day} • ${location}`;
    }


    /* =============================
       DIALOGUE
    ============================= */

    typeText(scene.text);


    /* =============================
       CHOICES
    ============================= */

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";


    scene.choices.forEach(choice => {

        const button =
            document.createElement("button");


        button.textContent =
            choice.text;


        button.onclick = () => {

            /* =====================
               ADD RELATIONSHIP
            ===================== */

            affection +=
                choice.affection || 0;

            friendship +=
                choice.friendship || 0;


            /* =====================
               MOVE STORY
            ===================== */

            current =
                choice.next;


            updateHUD();

            renderScene();

        };


        choices.appendChild(button);

    });


    updateHUD();
}


/* =================================
   FALLING CHERRY BLOSSOMS
================================= */

function createPetal() {

    const petal =
        document.createElement("div");


    petal.className =
        "petal";


    petal.textContent =
        "🌸";


    petal.style.left =
        Math.random() * 100 + "vw";


    petal.style.fontSize =
        (14 + Math.random() * 14) + "px";


    petal.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    document
        .getElementById("game")
        .appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 11000);
}


/* =================================
   START PETALS
================================= */

setInterval(
    createPetal,
    450
);


/* =================================
   START GAME
================================= */

updateHUD();

renderScene();
