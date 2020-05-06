import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videoForm: FormGroup;
  videoLink: string;
  videoName: string;
  constructor(private fb: FormBuilder, private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      link: ['', Validators.required]
    });
  }

  startExtraction() {
    console.log(this.videoForm.value);
    this.videoService.extractVideo(this.videoForm.get('link').value).subscribe((res: any) => {
      if (res) {
        const metaArr = res.split('<meta');
        const refinedArr = metaArr.slice(1, metaArr.length - 2);
        let videoInfo = '';
        refinedArr.forEach(elem => {
          if (elem.indexOf('og:video:secure_url') !== -1) {
            videoInfo = elem;
          }
        });
        console.log(videoInfo);
        this.videoLink = videoInfo.split('content="')[1].split('"')[0];
        const videoNameArr = this.videoLink.split('?')[0].split('/');
        this.videoName = videoNameArr[videoNameArr.length - 1];
        console.log(this.videoLink, this.videoName);
      }
    }, err => {
      console.log(err);
    });
  }


  downloadImage() {
    this.videoService.downloadVideo(this.videoLink).subscribe(res => {
      const urlCreator = window.URL || window.webkitURL;
      const videoUrl = urlCreator.createObjectURL(res);
      const tag = document.createElement('a');
      console.log(res);
      tag.href = videoUrl;
      tag.download = this.videoName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }, err => {

    });
  }

}
