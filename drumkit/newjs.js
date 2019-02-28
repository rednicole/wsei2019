const channel1 = [];

const sounds = {
    65: 'boom',
    83: 'clap',
    68: 'hihat',
    70: 'kick',
    71: 'openhat',
    72: 'ride',
    74: 'snare',
    75: 'tink',
    76: 'tom'
}

let channel1Start;

document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    document.addEventListener('keydown', kewPressed);
    document
        .querySelector('#btnPlayChannel1')
        .addEventListener('click', playChannel1);
    document
        .querySelector('#btnRecordChannel1')
        .addEventListener('click', recordChannel1);
}

function recordChannel1() {
    channel1Start = Date.now();
}

function playChannel1(el) {
    channel1.forEach(el => {
        setTimeout(()=>{
            playSound(el.sound);
        })
    }, el.time)
    // console.log(channel1);
}

// function kewPressed(e) {
//     switch(e.keyCode) {
//         case 65: {
//             const a = document.querySelector('#boom');
//             a.play();
//             break;
//         }
//         case 83: {
//             const a = document.querySelector('#clap');
//             a.play();
//             break;
//         }
//         case 68: {
//             const a = document.querySelector('#hihat');
//             a.play();
//             break;
//         }
//         case 70: {
//             const a = document.querySelector('#kick');
//             a.play();
//             break;
//         }
//         case 71: {
//             const a = document.querySelector('#openhat');
//             a.play();
//             break;
//         }
//         case 72: {
//             const a = document.querySelector('#ride');
//             a.play();
//             break;
//         }
//         case 74: {
//             const a = document.querySelector('#snare');
//             a.play();
//             break;
//         }
//         case 75: {
//             const a = document.querySelector('#tink');
//             a.play();
//             break;
//         }
//         case 76: {
//             const a = document.querySelector('#tom');
//             a.play();
//             break;
//         }
//     }
// }


// const sounds = [
//     [65, 'boom'],
//     [83, 'clap']
// ]

// function kewPressed(e) {
//     let sound = sounds.find((el) => {
//         return e.keyCode == el[0]
//     })
//     const a = document.querySelector('#'+sound[1]);
//     a.play();
// }



function kewPressed(e) {
    const sound = sounds[e.keyCode];
    playSound(sound);
    addToChannel1(sound);
}

function addToChannel1(sound) {
    channel1.push({
        time: Date.now() - channel1Start,
        sound: sound
    });
}

function playSound(sound) {
    const a = document.querySelector('#'+sound);
    if (a) {
        a.currentTime = 0;
        a.play();
    }
}
console.log(channel1);