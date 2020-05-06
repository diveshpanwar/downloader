import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imageForm: FormGroup;
  imageLink: string;
  imageName: string;
  constructor(private fb: FormBuilder, private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      link: ['', Validators.required]
    });
  }

  startExtraction() {
    console.log(this.imageForm.value);
    this.imageService.extractImage(this.imageForm.get('link').value).subscribe((res: any) => {
      if (res) {
        const metaArr = res.split('<meta');
        const refinedArr = metaArr.slice(1, metaArr.length - 2);
        let imageInfo = '';
        refinedArr.forEach(elem => {
          if (elem.indexOf('og:image') !== -1) {
            imageInfo = elem;
          }
        });
        this.imageLink = imageInfo.split('content="')[1].split('"')[0];
        const imageNameArr = this.imageLink.split('?')[0].split('/');
        this.imageName = imageNameArr[imageNameArr.length - 1];
        console.log(this.imageLink, this.imageName);
      }
    }, err => {
      console.log(err);
    });
  }


  downloadImage() {
    this.imageService.downloadImage(this.imageLink).subscribe(res => {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(res);
      const tag = document.createElement('a');
      console.log(res);
      tag.href = imageUrl;
      tag.download = this.imageName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }, err => {

    });
  }

}
