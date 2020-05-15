import {Component, OnInit} from '@angular/core';
import {Rivalry} from './rivalry';
import {RivalryService} from './rivalry.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rivalries',
  templateUrl: './rivalries.component.html'
})
export class RivalriesComponent implements OnInit {
  rivalries: Rivalry[];

  constructor(private rivalryService: RivalryService) {
  }

  ngOnInit(): void {
    this.rivalryService.getRivalries().subscribe((rivalries) => (this.rivalries = rivalries));
  }

  displayDate(rivalry: Rivalry) {
    console.log(rivalry);
  }

  delete(rivalry: Rivalry): void {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
          this.rivalryService.delete(rivalry.id).subscribe(() => {
            this.rivalries = this.rivalries.filter((r) => r !== rivalry);
            swal.fire(
              'User Removed',
              `User ${rivalry.rivalryname} removed successfully!`,
              'success'
            );
          });
        }
      });
  }

}
