(function() {

    const iBody = document.body;
    const workDurationInput = document.getElementById('work-duration');
    const restDurationInput = document.getElementById('rest-duration');
    const timerTime = document.getElementById('i-timer-time');

    let workDuration = parseInt(workDurationInput.value) * 60;
    let restDuration = parseInt(restDurationInput.value) * 60;
    let remainingTime = workDuration;
    let isPaused = true;
    let isWorking = true;
    let intervalID;



    /**Carregamento de page **/

    window.addEventListener('load', () => {
        iBody.classList.add('page-loaded');
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

    /* Update Timer*/

    function updateTimer(){
        if(!isPaused) {
            remainingTime--;

            if(remainingTime <=0){
                isWorking = !isWorking;
                remainingTime = isWorking ? workDuration : restDuration;

                if(!isWorking){
                    iBody.classList.add('rest-mode');
                    iBody.classList.remove('timer-running');
                }

                else {
                    iBody.classList.remove('rest-mode');
                    iBody.classList.add('timer-running');
                }

                isPaused = false;
                iBody.classList.remove('timer-work-active');

            }

            console.log(remainingTime);
        }
    }

})();