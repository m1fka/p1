const body = document.querySelector('body');

let goLoading = 0;
let OpenheaderOnOff = true;

const headerOnOff = document.querySelector('.on-off');
const On = document.querySelector('.on-off .on');
const Off = document.querySelector('.on-off .off');
const headerRunner = document.querySelector('.on-off .runner');


headerOnOff.addEventListener('click', () => {
    if (OpenheaderOnOff) {
        OpenheaderOnOff = false;

        body.classList.toggle('change');

        On.classList.toggle('open_on-off');
        Off.classList.toggle('open_on-off');
        headerRunner.classList.toggle('open_on-off');

        if (goLoading == 0) {

            goLoading = 1;
        }
        else {

            goLoading = 0;
        }
        setTimeout(() => {
            if (goLoading == 1) {
                setTimeout(() => {
                    if (goLoading == 1) {
                        setTimeout(() => {
                            if (goLoading == 1) {
                                changePage()
                            }
                        }, 600)
                    }
                }, 600)
            }
        }, 600)

        setTimeout(() => {
            OpenheaderOnOff = true;
        }, 1000)
    }
})


function changePage() {
    window.location.href = 'index.html'
}


//бургер
let ClickBurger = true;
let OpenBurger = false;

const burger = document.querySelector('.burger');
const menuBurger = document.querySelector('.menuBurger');
const menuBurgerUl = document.querySelector('.menuBurger ul');
const contMain = document.querySelector('.contMain');
const contBox = document.querySelector('.cont-box');

burger.addEventListener('click', () => {
    if (ClickBurger) {
        ClickBurger = false;

        if (OpenBurger) {
            OpenBurger = false;

            burger.classList.remove('open');
            menuBurger.classList.remove('open');
            menuBurger.classList.add('close');
            menuBurgerUl.classList.remove('open');
            menuBurgerUl.classList.add('close');

            contMain.classList.remove('blur');
            contBox.classList.remove('blur');
        }
        else {
            OpenBurger = true;

            burger.classList.add('open');
            menuBurger.classList.add('open');
            menuBurger.classList.remove('close');
            menuBurgerUl.classList.add('open');
            menuBurgerUl.classList.remove('close');

            contMain.classList.add('blur');
            contBox.classList.add('blur');
        }

        setTimeout(() => {
            ClickBurger = true;
        }, 1000)
    }
});




//container

document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});
document.addEventListener('touchend', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});


// Предотвращаем зумирование

document.addEventListener('gesturestart', (event) => {
    event.preventDefault(); 
});

//допИнфо перезагрузка страницы
const reload = document.querySelector('.dop-info svg');

reload.addEventListener('click', () => {
    location.reload();
})







// аватар телеграма
const avatarTelegram = document.querySelector('.avatarTelegram img');
// window.onload = () => {
avatarTelegram.src = sessionStorage.getItem('avatarTelegram');
// }

if (sessionStorage.length == 0) {

    // getUserProfilePhoto();
    sessionStorage.setItem('avatarTelegram', 'style/avatar-notDefined.png');
    avatarTelegram.src = sessionStorage.getItem('avatarTelegram');

}



//танцы


const audio = document.querySelector('#audio');
const audioOn = document.querySelector('.audio-on');


// Создаем аудиоконтекст
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioContext.destination);

// Настроим анализатор
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

audioOn.addEventListener('click', () => {
    audioContext.resume().then(() => {
        audio.play();
        animate();
    });
});

let ratateTg = 0;
function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(dataArray);

    // Получаем среднее значение частот
    const average = dataArray.reduce((a, b) => a + b) / bufferLength;

    // Изменяем размер дива в зависимости от среднего значения
    // const scale = 1 + average / 256; // Нормируем значение
    const scale = 1 + average / 10; // Нормируем значение
    // avatarTelegram.style.transform = `rotate(${360}deg)`;
    ratateTg+=1;

    avatarTelegram.style.transform = `scale(${scale}) rotate(${ratateTg}deg)`;

}