import { ViewerType, getbaseUrl } from 'docviewhelper';
export const viewers: {
  name: ViewerType;
  docs: string[];
  custom: boolean;
  acceptedUploadTypes: string;
  viewerUrl?: string;
}[] = [
  {
    name: 'google',
    docs: [
      `${getbaseUrl()}/assets/PowerPoint.pptx`,
      `${getbaseUrl()}/assets/file_example_PPT_250kB.ppt`,
      'https://file-examples.com/storage/fe2356939c62607a6a1903b/2017/10/file-example_PDF_1MB.pdf',
      'https://go.microsoft.com/fwlink/?LinkID=521962',
      'https://calibre-ebook.com/downloads/demos/demo.docx',
      'https://file-examples.com/storage/fe2356939c62607a6a1903b/2017/10/file_example_TIFF_1MB.tiff',
    ],
    custom: true,
    acceptedUploadTypes: '',
  },
  {
    name: 'office',
    docs: [
      `${getbaseUrl()}/assets/firebase.docx`,
      `${getbaseUrl()}/assets/Invoice.xlsx`,
      `${getbaseUrl()}/assets/file_example_PPT_250kB.ppt`,
      `${getbaseUrl()}/assets/powerPoint.pptx`,
    ],
    custom: true,
    acceptedUploadTypes: '',
  },
  {
    name: 'mammoth',
    docs: [`${getbaseUrl()}/assets/file-sample_100kB.docx`],
    custom: false,
    acceptedUploadTypes:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  {
    name: 'pdf',
    docs: [`${getbaseUrl()}/assets/Invoice - Invoice.pdf`],
    custom: false,
    acceptedUploadTypes: 'application/pdf',
  },
  {
    name: 'url',
    docs: [
      // eslint-disable-next-line max-len
      'https://docs.google.com/document/d/1OAOjCCzpsPGAKgV1XLva5oK6GEFO8iANFI40vauYoyg/edit',
      `https://docs.google.com/presentation/d/1yRTEl_Uk2cyaxxYxkA35aFY2opOXLleQ4wopNH8hCWM/edit?usp=sharing`,
    ],
    custom: true,
    acceptedUploadTypes: '',
  },
];
