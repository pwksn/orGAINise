export class TimerTest {

    readonly timeStart = performance.now();

    constructor(private readonly name: string) {}

    timeStop() {
        const time = performance.now() - this.timeStart;
        console.log('Timer test for: ' + this.name + ', time elapsed: ' + Math.round(time) + ' ms');
    }
}