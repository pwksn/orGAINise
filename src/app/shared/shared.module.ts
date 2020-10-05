import { SoundEffectService } from './sound-effects.service';
import { NgModule } from "@angular/core";
import { LocationService } from './location.service';

@NgModule({
    providers: [
        LocationService,
        SoundEffectService
    ]
})
export class SharedModule {}