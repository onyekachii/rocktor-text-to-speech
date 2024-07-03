import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RocktorTextToSpeechModule } from '../../projects/custom-library/src/lib/custom-library.module';
import { HorizontalPosition } from '../../projects/custom-library/src/lib/text-reader/text-reader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RocktorTextToSpeechModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  textToRead = '<p>kennedy of the East. Because he is the king in the North. The fucking &nbsp;&nbsp;&nbsp;North.</p>';
  controlPosition = HorizontalPosition.center;
  showHighlight = true;
  highlightStyle = "font-size: larger; font-weight: bolder; color: blue";
}
