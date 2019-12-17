import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/services/image.service';
import { Image } from 'src/interface/image';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  images: Image[] = [];
  select = 10;
  imageBS = new BehaviorSubject(this.images);
  loading;

  constructor(
    private image: ImageService,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router
  ) {

    // Subscribing to changes for Image list

    this.imageBS.subscribe(data => {
      this.images = data;
      this.loading !== undefined ? this.loading.dismiss() : this.loading = undefined;
    });
  }

  ngOnInit() {

    // Initial API call to fetch Images

    this.image.getImages().subscribe((data: Image[]) => {
      this.imageBS.next(data);
    });
  }

  // Present Filter Options Prompt

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Filter',
      inputs: [
        {
          name: 'page',
          placeholder: 'Page',
          type: 'number',
          min: 0,
          max: 50
        },
        {
          name: 'limit',
          placeholder: 'Limit',
          type: 'number',
          min: 0,
          max: 100
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data) => {

            // Checking Entered Parameters

            if (data.page === '') {
              this.messageToast('Page Entered is empty!');
              return;
            }

            if (data.limit === '') {
              this.messageToast('Limit Entered is empty!');
              return;
            }

            if (data.page < 0) {
              this.messageToast('Page Entered is less than 0!');
              return;
            }

            if (data.limit < 0) {
              this.messageToast('Limit Entered is less than 0!');
              return;
            }

            if (data.page > 50) {
              this.messageToast('Page Entered is greater than 50');
              return;
            }

            if (data.limit > 100) {
              this.messageToast('Limit Entered is greater than 100');
              return;
            }

            console.log(data.page, data.limit);
            this.loading = await this.loadingController.create({
              message: 'Loading'
            });
            await this.loading.present();

            // API call to get Images based on the parameters

            this.image.getImages(data.page, data.limit).subscribe((images: Image[]) => {
              this.imageBS.next(images);
            });

          }
        }
      ]
    });

    await alert.present();
  }

  async messageToast(x) {
    const toast = await this.toastController.create({
      message: x,
      duration: 3000
    });
    toast.present();
  }

  openDetailsWithQueryParams(data) {
    const navigationExtras: NavigationExtras = {
      state: {
        img: data
      }
    };
    this.router.navigate(['viewer'], navigationExtras);
  }
}
