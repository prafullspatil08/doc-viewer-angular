import { Component } from '@angular/core';
import { handleFileUpload, ViewerType } from 'docviewhelper';
import { viewers } from '../../projects/angular-docx-viewer/src/data/demo-data';
import { ImageViewerConfig } from '../../dist/angular-docx-viewer/lib/angular-image-viewer/model/angular-image-viewer-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  viewers = viewers;
  selectedViewer = this.viewers[0];
  selectedDoc = this.selectedViewer.docs[0];

  title = 'app';

  images = [
    '/assets/pexels-photo-352093.jpeg',
    'https://i.ytimg.com/vi/nlYlNF30bVg/hqdefault.jpg',
    'https://www.askideas.com/media/10/Funny-Goat-Closeup-Pouting-Face.jpg'
  ];

  imageIndexOne = 0;
  imageIndexTwo = 0;

  config: ImageViewerConfig = {customBtns: [{name: 'print', icon: 'fa fa-print'}, {name: 'link', icon: 'fa fa-link'}]};

  handleEvent(event: CustomEvent | any) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }

  selectViewer(viewerName: ViewerType) {
    if (viewerName !== this.selectViewer.name) {
      this.selectedViewer =
        this.viewers.find((v:any) => v.name === viewerName) || this.viewers[0];
      this.selectedDoc = this.selectedViewer.docs[0];
    }
  }

  getDocExtension(doc: string) {
    const splittedDoc = doc.split('.');
    return splittedDoc[splittedDoc.length - 1];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleFiles(fileInput: any) {
    this.selectedDoc = await handleFileUpload(fileInput);
  }
}
