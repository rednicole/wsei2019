document.addEventListener('DOMContentLoaded', appStart);

let ctx;
let video;

function appStart() {
    const canvas = document.querySelector('#plotno');
    ctx = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
            video = document.querySelector('#player');
            video.srcObject = mediaStream;
            video.addEventListener('loadedmetadata', () => {
                video.play();
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                animuj();
            })
        })
}

function animuj() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    ctx.drawImage(video, 0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, width, height);
    // zmienPixeleNaCzarnoBiale(imageData);
    greenBox(imageData);
    ctx.putImageData(imageData, 0, 0);

    requestAnimationFrame(animuj);
}

function zmienPixeleNaCzarnoBiale(pixs) {
    for (let i = 0; i < pixs.data.length; i += 4) {
        const r = pixs.data[i];
        const g = pixs.data[i + 1];
        const b = pixs.data[i + 2];
        const alpha = pixs.data[i + 3];

        const avg = (r + g + b) / 3;
        pixs.data[i] = avg;
        pixs.data[i + 1] = avg;
        pixs.data[i + 2] = avg;
        pixs.data[i + 3] = alpha;
    }
}

function greenBox(pixs) {
    for (let i = 0; i < pixs.data.length; i += 4) {
        let r = pixs.data[i];
        let g = pixs.data[i + 1];
        let b = pixs.data[i + 2];
        let alpha = pixs.data[i + 3];

        const limit = 15;
        if (r < limit && g < limit && b < limit) {
            r = 0;
            g = 200;
            b = 0;
        }

        pixs.data[i] = r;
        pixs.data[i + 1] = g;
        pixs.data[i + 2] = b;
        pixs.data[i + 3] = alpha;
    }
}