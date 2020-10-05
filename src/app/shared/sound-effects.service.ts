import { Injectable } from '@angular/core';

@Injectable()
export class SoundEffectService {

    private audio = new Audio();

    playBellRing() {
        this.audio.src = "../../assets/bell-ring-effect.mp3";
        this.audio.load();
        this.audio.play();
    }
}