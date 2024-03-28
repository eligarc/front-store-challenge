import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {

  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {},
    });
  }

}
