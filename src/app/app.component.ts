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
  textToRead = '<p>A simple angular component which implements a text reader as well as word highlighting.' +
  ' A big advantage of this implementation is that it can also read text from HTML markup and avoid reading HTML entities.' +
  ' This feature successfully solves the problem of reading and highlighting unwanted text (html tags and entities).</p>';
  controlPosition = HorizontalPosition.center;
  showHighlight = true;
  highlightStyle = "font-size: larger; font-weight: bolder; color: blue";
}
