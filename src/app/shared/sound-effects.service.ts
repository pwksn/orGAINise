import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SoundEffectService {

    private audio = new Audio();

    public playBellRing() {
        this.audio.src = "../../assets/bell-ring-effect.mp3";
        this.audio.load();
        this.audio.play();
    }
}