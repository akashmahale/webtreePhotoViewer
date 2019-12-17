import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
})
export class ViewerPage implements OnInit {

  image: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.image = this.router.getCurrentNavigation().extras.state.img;
        console.log(this.image);
      }
    });
  }

  ngOnInit() {
    console.log(this.image);
   }

}
