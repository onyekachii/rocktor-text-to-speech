# Rocktor's Text-To-Speech with Highlighter

A simple angular component which implements a text reader as well as word highlighting. A big advantage of this implementation is that it can also read text from HTML markup and avoid reading HTML entities. This feature successfully solves the problem of reading and highlighting unwanted text (html tags and entities).

## Features

* Text-to-Speech reader
* Accepts HTML markup and entitites
* Highlighter
* Auto scrolling

## Installation/Setup and Usage

* Install npm package
```bash
npm i rocktor-text-to-speech-and-highlighter-angular
```
* Ensure RocktorTextToSpeechModule is impoerted in root module or component
* On your component.html file:
```html
<app-text-reader [text]="textToRead"></app-text-reader>
``` 
Optional attributes:
* controlHorizontalPosition: Sets the horizontal position of the media control buttons. Values include HorizontalPosition.center, HorizontalPosition.left and HorizontalPosition.right.
```typescript
import { HorizontalPosition } from ...
...
...
...
controlPosition = HorizontalPosition.center;
```
```html
<app-text-reader [text]="textToRead" [controlHorizontalPosition]="controlPosition"></app-text-reader>
```
* showHighlight: a boolean value to activate or deactivate highlighting
* highlightStyle: styles highlighted word. Only three css properties (shown below) are should to be set as they reset after text after reader stops.
```typescript
highlightStyle = "font-size: 20em; font-weight: 700; color: blue";
```