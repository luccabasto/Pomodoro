(function() {
    
    const iBody = document.body;
    const workDurationInput = document.getElementById('work-duration');
    const restDurationInput = document.getElementById('rest-duration');
    const timerTime = document.getElementById('i-timer-time');
    const circleProgress = document.querySelector('.circle-progress');
    

    let workDuration = parseInt(workDurationInput.value) * 60;
    let restDuration = parseInt(restDurationInput.value) * 60;
    let remainingTime = workDuration;
    let isPaused = true;
    let isWorking = true;
    let intervalID;

    const completedSessionsElement = document.getElementById('timer-completed-sessions');
    let completedSessions = 0;


    /**Carregamento de page **/

    window.addEventListener('load', () => {
        iBody.classList.add('page-loaded');

        workDuration = parseInt(workDurationInput.value) * 60;
        restDuration = parseInt(restDurationInput.value) * 60;
    });


    /** button Começar */

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {

        
        isPaused = false;

        iBody.classList.add('timer-running');

        if(isWorking) {
            iBody.classList.remove('time-paused');
        }
        else{
            iBody.classList.add('rest-mode');
            iBody.classList.add('timer-paused');
        }

        if(!intervalID) {
            intervalID = setInterval(updateTimer, 1000);
        }

        
    });

    /** Pause button -- manutenção */ 

    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.addEventListener('click', () => {
        isPaused = true;

        iBody.classList.remove('timer-running');
        iBody.classList.add('timer-paused');
    });

    /** Settings **/
     
    const btnToggleSettings = document.getElementById('btn-icon__Config');
    const btnCloseSettings = document.getElementById('i-close-settings');
   
    function setBodySettings(){
        iBody.classList.toggle('settings-active');
    }

    function toggleSettings(event) {
        if (event.type === 'click') {
            setBodySettings();

    } else if (event.type === 'keydown' && event.keyCode === 27) {
        iBody.classList.remove('settings-active');
    }
}

    btnToggleSettings.addEventListener('click', toggleSettings);
    btnCloseSettings.addEventListener('click', toggleSettings);
    document.addEventListener('keydown', toggleSettings);

    /** Work / reset settings **/

    workDurationInput.addEventListener('change', () => { 
        workDuration = parseInt(workDurationInput.value) * 60;
        if (isWorking) {
            remainingTime = workDuration;
            updateProgress();
        }
    });
    
    restDurationInput.addEventListener('change', () => { 
        restDuration = parseInt(restDurationInput.value) * 60; 
        if (isWorking) {
            remainingTime = workDuration;
            updateProgress();
        }
    });
    

    /* Update Timer*/

    function updateTimer(){

        let playAlarm;
        const workFinished = new Audio ("sounds/sucess-audio.mp3");
        //Adicionar áudios posteriormente. 
        const restFinished = new Audio ("sounds/erro-audio.mp3");


        if(!isPaused) {
            remainingTime--;

            if(remainingTime <=0){
                isWorking = !isWorking;
                remainingTime = isWorking ? workDuration : restDuration;

                if(!isWorking){
                    iBody.classList.add('rest-mode');
                    iBody.classList.remove('timer-running');

                    completedSessions++;
                    completedSessionsElement.textContent = completedSessions;
                }

                else {
                    iBody.classList.remove('rest-mode');
                    iBody.classList.add('timer-running');
                }

                playAlarm = isWorking ? restFinished : workFinished;
                playAlarm.play();

                isPaused = false;
                iBody.classList.remove('timer-work-active');

            }

            document.title = timerTime.textContent = formatTime(remainingTime);

            updateProgress();
        }
    }

    /** Update progress */ 

    function updateProgress(){
        const radius = 45;
        const circumference = 2 * Math.PI * radius;

        const totalDuration = isWorking ? workDuration : restDuration;
        const dashOffset = circumference * remainingTime / totalDuration;

        circleProgress.style.strokeDashoffset = dashOffset;
        timerTime.textContent = formatTime(remainingTime);

    }

    function formatTime(seconds){
        const minutes = Math.floor(seconds /60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2,'0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateProgress();


})();