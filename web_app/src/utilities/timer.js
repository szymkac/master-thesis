class Timer {
    constructor(onDone, onUpdate, secondJump = 1) {
        this.timer = null;
        this.secondsCounter = 0;
        this.secondsLimit = 0;
        this.started = false;
        this.secondJump = secondJump;
        this.onDone = onDone;
        this.onUpdate = onUpdate;
    }

    startTimer = seconds => {
        this.secondsLimit = seconds;
        this.secondsCounter = 0;
        this.timer = setInterval(() => {
            this.secondsCounter++;
            if (typeof this.onUpdate === "function")
                this.onUpdate(this.secondsCounter)
            if (this.secondsCounter > this.secondsLimit)
                this.endTimer();
        }, 1000 * this.secondJump);
    }

    endTimer = () => {
        clearInterval(this.timer)
        if (typeof this.onDone === "function")
            this.onDone()
    }

    clear = () => {
        clearInterval(this.timer);
    }
}

export default Timer;