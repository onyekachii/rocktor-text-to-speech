import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { HTMLEntities } from '../../html-entities';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-text-reader',
  templateUrl: './text-reader.component.html',
  styleUrls: ['./text-reader.component.css']
})
export class TextReaderComponent implements OnChanges, OnDestroy, OnInit, AfterViewChecked {
  synth: any;
  pauseValue: boolean = false;
  @Input() text!: string;
  @Input() controlHorizontalPosition: HorizontalPosition = HorizontalPosition.left;
  @Input() showHighlight: boolean = true;
  @Input() highlightStyle: string = "font-size: larger; font-weight: bolder";
  textarea: any;
  valueTxt!: string;
  revisedText!: string;  
  window: Window = window;
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  showControls: boolean = false;
  @ViewChild('lessonnotearea') lessondiv!: ElementRef;
  public get isAndroid() : boolean {
    return this.getDeviceType() === Device.Android;
  }
  get controlPosition(): string {
    let val = this.controlHorizontalPosition == 0 ? "center" : this.controlHorizontalPosition == 1 ? "start" : "end"
    return `display: flex; justify-content: ${val};`
  }
    
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.synth = window.speechSynthesis;
    this.window.addEventListener('beforeunload', () => {
      this.stopReading();
    });
    this.valueTxt = this.text;

  }
  ngAfterViewChecked(): void {
    this.textarea = this.lessondiv?.nativeElement;    
    this.checkText();
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    this.stopReading();
    window.removeEventListener('beforeunload', () => {
      this.stopReading();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes) {
      try {
        this.stopReading();
        this.valueTxt = this.text;
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  stopReading(): void {
    try {
      if (this.synth?.speaking) {
        this.synth.cancel();
      }
      let highlightDiv = document.getElementById('highlighted-word');
      if(highlightDiv){
        highlightDiv.style.fontSize = 'inherit';
        highlightDiv.style.fontWeight = 'inherit';
      }
      if(this.pauseValue)
        this.pauseValue = false
    }
    catch (e) {
      console.log('error when stopping text reader:', e);

    }
    this.cdr.detectChanges();
  }

  read() {
    if (this.synth.speaking)
      return;

    this.revisedText = HTMLEntities.cleanuphtml(this.valueTxt);
    let spiltLength = 4000;
    const chunks = this.isAndroid ? this.chunkText(this.revisedText, spiltLength) : [this.revisedText];
    if (this.valueTxt !== '') {
      this.speakChunksSequentially(chunks, spiltLength);
    }
    this.cdr.detectChanges();
  }

  pause(): void {
    if (this.synth.speaking) {
      this.synth.pause();
      this.togglePause();
      this.cdr.detectChanges();
    }
  }

  continue() {
    this.synth.resume();
    this.togglePause();
    this.cdr.detectChanges();
  }
  private togglePause() {
    this.pauseValue = !this.pauseValue
  }

  private highlight(index: number, charLength: number) {
    //if(!this.isAndroid)
    {
      let rep = this.valueTxt.substring(index, index + charLength);
      let rep2 = `<span id='highlighted-word' class="rocktor-highlight" style='${this.highlightStyle}'>${rep}</span>`;      
      let val = this.valueTxt.substring(0, index) + rep2 + this.valueTxt.substring(index + charLength);
      this.textarea.innerHTML = val;
      let highlightDiv = document.getElementById('highlighted-word');
      if (!this.isScrolledIntoView(highlightDiv))
        highlightDiv?.scrollIntoView();
    }    
  }

  private isScrolledIntoView(el: any) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
  }

  private chunkText(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
      let end = start + chunkSize;
      chunks.push(text.slice(start, end));
      start = end;
    }
    return chunks;
  }

  private speakChunksSequentially(chunks: string[], splitLength: number, index: number = 0): void {
    if (index >= chunks.length) {
      this.stopReading();
      return;
    }
    let mainStartIndex = splitLength * index;
    const utterThis = new SpeechSynthesisUtterance(chunks[index]);
    this.setVoice(utterThis);

    utterThis.onboundary = (event) => {
      if (event.name === 'word') {
        this.highlight(event.charIndex + mainStartIndex, event.charLength);
      }
    };

    utterThis.onend = () => {
      index++;
      this.speakChunksSequentially(chunks, splitLength, index);
      this.cdr.detectChanges();
    };

    utterThis.onerror = (event) => {
      this.synth.cancel();
      this.cdr.detectChanges();
      console.log('text-to-speech error:', event);
    };

    this.synth.speak(utterThis);
  }
  private setVoice(utterThis:SpeechSynthesisUtterance) {
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(voice => voice.name === 'Microsoft Hazel - English (United Kingdom)');
    if (voice) {
      utterThis.voice = voice;
      utterThis.lang = 'en-GB';
    }
    else {
      voice = voices.find(voice => voice.name === 'Microsoft Susan - English (United Kingdom)');
      if (voice) {
        utterThis.voice = voice;
        utterThis.lang = 'en-GB';
      }
      else {
        voice = voices.find(voice => voice.name === 'Microsoft Mark - English (United States)');
        if (voice) {
          utterThis.voice = voice;
          utterThis.lang = 'en-US';
        }
        else {
          utterThis.voice = voices[0];
        }
      }
    }
    return utterThis.voice;
  }
  private getDeviceType(){
    const userAgent = window.navigator.userAgent;
    if (/Windows NT|Macintosh|Linux/i.test(userAgent)){
      return Device.PC;    
    } else if (/iOS|iPhone|iPad/i.test(userAgent)) {
      return Device.IOS;
    } else {
      return Device.Android;
    }
  }
  private checkText(){        
    if(this.text){
      let decodedtxt = (HTMLEntities.cleanuphtml(this.text)).replace(/\s/g, '');      
      this.showControls = decodedtxt?.length > 1;
    }
  }
   
}
enum Device{
  PC,
  Android,
  IOS
}
export enum HorizontalPosition{
  center,
  left,
  right
}
