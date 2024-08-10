import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getDocxToHtml, getViewerDetails, googleCheckSubscription, iframeIsLoaded, IFrameReloader, isLocalFile, replaceLocalUrl, ViewerType } from 'docviewhelper';

@Component({
  selector: 'angular-docx-viewer',
  templateUrl: './angular-docx-viewer.component.html',
  styleUrls: ['./angular-docx-viewer.component.scss'],
})
export class AngularDocxViewerComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @Output() loaded: EventEmitter<void> = new EventEmitter();
  @Input() url: any = '';
  @Input() queryParams = '';
  @Input() viewerUrl = '';
  @Input() googleCheckInterval = 3000;
  @Input() googleMaxChecks = 5;
  @Input() disableContent: 'none' | 'all' | 'popout' | 'popout-hide' = 'none';
  @Input() googleCheckContentLoaded = true;
  @Input() viewer: ViewerType = 'google';
  @Input() overrideLocalhost = '';
  @ViewChildren('iframe') iframes?: QueryList<ElementRef> = undefined;

  public fullUrl?: SafeResourceUrl = undefined;
  public externalViewer = false;
  public docHtml = '';
  public configuredViewer: ViewerType = 'google';
  private checkIFrameSubscription?: IFrameReloader = undefined;
  private shouldCheckIframe = false;
  constructor(private domSanitizer: DomSanitizer, private ngZone: NgZone) {}

  ngOnDestroy(): void {
    if (this.checkIFrameSubscription) {
      this.checkIFrameSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    if (this.shouldCheckIframe) {
      const iframe = this.iframes?.first?.nativeElement as HTMLIFrameElement;
      if (iframe) {
        this.shouldCheckIframe = false;
        this.reloadIframe(iframe);
      }
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (
      changes &&
      changes['viewer'] &&
      changes['viewer'].currentValue !== changes['viewer'].previousValue
    ) {
      if (
        this.viewer !== 'google' &&
        this.viewer !== 'office' &&
        this.viewer !== 'mammoth' &&
        this.viewer !== 'pdf' &&
        this.viewer !== 'url'
      ) {
        console.error(
          `Unsupported viewer: '${this.viewer}'. Supported viewers: google, office, mammoth and pdf`
        );
      }
      this.configuredViewer = this.viewer;
    }

    if (
      (changes['url'] &&
        changes['url'].currentValue !== changes['url'].previousValue) ||
      (changes['viewer'] &&
        changes['viewer'].currentValue !== changes['viewer'].previousValue) ||
      (changes['viewerUrl'] &&
        changes['viewerUrl'].currentValue !==
          changes['viewerUrl'].previousValue)
    ) {
      let viewerDetails = getViewerDetails(
        this.url,
        this.configuredViewer,
        this.queryParams,
        this.viewerUrl
      );
      this.externalViewer = viewerDetails.externalViewer;
      if (
        viewerDetails.externalViewer &&
        this.overrideLocalhost &&
        isLocalFile(this.url)
      ) {
        const newUrl = replaceLocalUrl(this.url, this.overrideLocalhost);
        viewerDetails = getViewerDetails(
          newUrl,
          this.configuredViewer,
          this.queryParams,
          this.viewerUrl
        );
      }
      this.docHtml = '';
      if (this.checkIFrameSubscription) {
        this.checkIFrameSubscription.unsubscribe();
      }
      if (!this.url) {
        this.fullUrl = undefined;
      } else if (
        viewerDetails.externalViewer ||
        this.configuredViewer === 'url' ||
        this.configuredViewer === 'pdf'
      ) {
        this.fullUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          viewerDetails.url
        );
        // see:
        // https://stackoverflow.com/questions/40414039/google-docs-viewer-returning-204-responses-no-longer-working-alternatives
        // hack to reload iframe if it's not loaded.
        // would maybe be better to use view.officeapps.live.com but seems not to work with sas token.
        if (
          this.configuredViewer === 'google' &&
          this.googleCheckContentLoaded
        ) {
          this.ngZone.runOutsideAngular(() => {
            // if it's not loaded after the googleIntervalCheck, then open load again.
            const iframe = this.iframes?.first
              ?.nativeElement as HTMLIFrameElement;
            if (iframe) {
              this.reloadIframe(iframe);
            } else {
              this.shouldCheckIframe = true;
            }
          });
        }
      } else if (this.configuredViewer === 'mammoth') {
        this.docHtml = await getDocxToHtml(this.url);
      }
    }
  }

  private reloadIframe(iframe: HTMLIFrameElement) {
    this.checkIFrameSubscription = googleCheckSubscription();
    this.checkIFrameSubscription.subscribe(
      iframe,
      this.googleCheckInterval,
      this.googleMaxChecks
    );
  }

  iframeLoaded() {
    const iframe = this.iframes?.first?.nativeElement as HTMLIFrameElement;
    if (iframe && iframeIsLoaded(iframe)) {
      this.loaded.emit(undefined);
      if (this.checkIFrameSubscription) {
        this.checkIFrameSubscription.unsubscribe();
      }
    }
  }
}
