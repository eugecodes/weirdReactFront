export class FileModel {
  name: string;
  data: string;

  constructor(file: { name: string; data: string }) {
    this.name = file.name;
    this.data = file.data;
  }

  download() {
    const url = window.URL.createObjectURL(new Blob([this.data]));

    const link = document.createElement("a");
    link.href = url;
    link.download = this.name;

    document.body.appendChild(link);

    link.click();

    link.parentNode?.removeChild(link);
  }
}
