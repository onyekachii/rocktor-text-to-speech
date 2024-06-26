import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RocktorTextToSpeechModule } from '../../projects/custom-library/src/lib/custom-library.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RocktorTextToSpeechModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rocktor-text-to-speech';
  textToRead = 'kennedy of the East. Because he is the king in the North. The fucking North.';
}
