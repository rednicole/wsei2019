// TODO:
// 1) dokonczyc funkcjonalnsoc 2, 3 channels
// 2) zformatowac wizualnie i dodac animacje
// 3) odtwarzaj wszystkie kanaly naraz (nowy guzik)


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

const channel1 = [];
let channel1Start = 0;
let channel1Playing = false;
let channel1Timeouts = [];

const channel2 = [];
let channel2Start = 0;
let channel2Playing = false;

const channel3 = [];
let channel3Start = 0;
let channel3Playing = false;

document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    document.addEventListener('keydown', kewPressed);
    document
        .querySelector('#btnPlayChannel1')
        .addEventListener('click', playChannel1);
    document
        .querySelector('#btnRecordChannel1')
        .addEventListener('click', onBtnRecordChannel1Click);
    document.addEventListener('keydown', kewPressed);

    document
        .querySelector('#btnPlayChannel2')
        .addEventListener('click', playChannel2);
    document
        .querySelector('#btnRecordChannel2')
        .addEventListener('click', onBtnRecordChannel2Click);
    document.addEventListener('keydown', kewPressed);

    document
        .querySelector('#btnPlayChannel3')
        .addEventListener('click', playChannel3);
    document
        .querySelector('#btnRecordChannel3')
        .addEventListener('click', onBtnRecordChannel3Click);
}

// function recordChannel1() {
//     channel1Start = Date.now();

// }

// function createStopBtn() {
//     const stopRecordingBtn = document.createElement('button');
//     stopRecordingBtn.id = 'stopRecordingChannel1';
//     stopRecordingBtn.innerHTML = 'Stop recording Channel 1';
//     document.querySelector('#btnRecordChannel1').replaceWith(stopRecordingBtn);
//     stopRecordingBtn.addEventListener('click', stopRecordingChannel1);
// }

function onBtnRecordChannel1Click() {
    if (channel1Start > 0) {
        channel1Start = 0;
        document.querySelector('#btnRecordChannel1').innerHTML = 'Record Channel 1';
    } else {
        channel1Start = Date.now();
        document.querySelector('#btnRecordChannel1').innerHTML = 'Stop recording Channel 1';
    }
}

function onBtnRecordChannel2Click() {
    if (channel2Start > 0) {
        channel2Start = 0;
        document.querySelector('#btnRecordChannel2').innerHTML = 'Record Channel 2';
    } else {
        channel2Start = Date.now();
        document.querySelector('#btnRecordChannel2').innerHTML = 'Stop recording Channel 2';
    }
}

function onBtnRecordChannel3Click() {
    if (channel3Start > 0) {
        channel3Start = 0;
        document.querySelector('#btnRecordChannel3').innerHTML = 'Record Channel 3';
    } else {
        channel3Start = Date.now();
        document.querySelector('#btnRecordChannel3').innerHTML = 'Stop recording Channel 3';
    }
}

function playChannel1(el) {
    if (!channel1Playing) {
        channel1.forEach(el => {
            channel1Timeouts.push(setTimeout(() => {
                playSound(el.sound);
            }))
        }, el.time)
        document.querySelector('#btnPlayChannel1').innerHTML = 'Stop playing Channel 1';
    } else {
        channel1Timeouts.forEach(handle => clearTimeout(handle));
        channel1Timeouts = [];
        document.querySelector('#btnPlayChannel1').innerHTML = 'Play Channel 1';
    }
    channel1Playing = !channel1Playing;
}

function playChannel2(el) {
    channel2.forEach(el => {
        setTimeout(() => {
            playSound(el.sound);
        })
    }, el.time)
}

function playChannel3(el) {
    channel3.forEach(el => {
        setTimeout(() => {
            playSound(el.sound);
        })
    }, el.time)
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
    if (channel1Start) {
        addToChannel1(sound);
    } else if (channel2Start) {
        addToChannel2(sound);
    } else if (channel3Start) {
        addToChannel3(sound);
    }
}



function addToChannel1(sound) {
    channel1.push({
        time: Date.now() - channel1Start,
        sound: sound
    });
}

function addToChannel2(sound) {
    channel2.push({
        time: Date.now() - channel2Start,
        sound: sound
    });
}

function addToChannel3(sound) {
    channel3.push({
        time: Date.now() - channel3Start,
        sound: sound
    });
}

function playSound(sound) {
    const a = document.querySelector('#' + sound);
    if (a) {
        a.currentTime = 0;
        a.play();
    }
}

// console.log(channel1);