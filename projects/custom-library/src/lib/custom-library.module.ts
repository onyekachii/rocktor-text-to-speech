import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextReaderComponent } from './text-reader/text-reader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [TextReaderComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [TextReaderComponent]
})
export class RocktorTextToSpeechModule { }
