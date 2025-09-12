import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

import { UserStore } from '../store/user.store';
import { ProductStore } from '../../products/store/product.store';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CurrencyPipe, NgOptimizedImage],
  template: `
    <section class="wrap">
      <div class="stack">
        <!-- Profil -->
        @if (user()) {
          <mat-card class="profile-card radius">
            <mat-card-header>
              <mat-card-title>Profil</mat-card-title>
              <div class="spacer"></div>
              <span class="role-chip" [class.producer]="isProducer()" [class.admin]="isAdmin()">
                {{ user()!.role }}
              </span>
            </mat-card-header>

            <mat-card-content class="profile-content">
              <img
                class="profilPicture radius"
                ngSrc="/profilPicture/customerMale.png"
                width="270"
                height="350"
                alt="Photo de profil"
              />
              <div class="details">
                <p><strong>Email :</strong> {{ user()!.email }}</p>
                <p><strong>Nom :</strong> {{ user()!.lastName }}</p>
                <p><strong>Prénom :</strong> {{ user()!.firstName }}</p>
              </div>
            </mat-card-content>

            <mat-card-actions align="end">
              <button mat-stroked-button (click)="editProfile()">Modifier le profil</button>
            </mat-card-actions>
          </mat-card>
        } @else {
          <p class="error">{{ error() }}</p>
        }

        @if (isProducer()) {
          <mat-card class="products-card radius">
            <mat-card-header>
              <mat-card-title>Mes produits</mat-card-title>
              <div class="spacer"></div>
              <button mat-flat-button color="primary">
                <mat-icon>add</mat-icon>
                Ajouter un produit
              </button>
            </mat-card-header>

            <mat-card-content>
              @if (productsLoading()) {
                <p>Chargement…</p>
              } @else {
                <div class="products-grid">
                  @for (p of products(); track p.id) {
                    <mat-card class="product-item radius">
                      <img class="thumb" width="160" height="120" alt="{{ p.productName }}" />
                      <div class="product-info">
                        <h4>{{ p.productName }}</h4>
                        <p class="muted">{{ p.price | currency: 'EUR' }}</p>
                      </div>
                      <div class="product-actions">
                        <button mat-icon-button><mat-icon>edit</mat-icon></button>
                        <button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
                      </div>
                    </mat-card>
                  } @empty {
                    <p class="muted">Aucun produit pour le moment.</p>
                  }
                </div>
              }
            </mat-card-content>
          </mat-card>
        }
      </div>
    </section>
  `,
  styles: `
    .wrap {
      min-height: 100dvh;
      margin-top: -7dvh;
      display: grid;
      place-items: start center;
      padding: 24px;
    }
    .stack {
      width: min(1100px, 100%);
      display: grid;
      gap: 24px;
    }

    /* ---- Profil ---- */
    .profile-card {
      margin: 0 auto;
      width: min(820px, 100%);
    }
    .profile-content {
      display: grid;
      grid-template-columns: 270px 1fr;
      gap: 24px;
      align-items: start;
    }
    .profilPicture {
      width: 270px;
      height: 350px;
      object-fit: cover;
    }
    .details {
      display: grid;
      gap: 10px;
      align-content: start;
    }
    .role-chip {
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 0.85rem;
      text-transform: capitalize;
      background: var(--color-surface-2, #eef2f5);
    }
    .role-chip.producer {
      background: #e6f6ea;
      color: #207d47;
    }
    .role-chip.admin {
      background: #fde7e7;
      color: #b3261e;
    }

    /* ---- Produits ---- */
    .products-card {
      width: min(1100px, 100%);
      margin: 0 auto;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
    }
    .product-item {
      display: grid;
      grid-template-columns: 160px 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 12px;
    }
    .thumb {
      width: 160px;
      height: 120px;
      object-fit: cover;
      border-radius: 12px;
    }
    .product-info h4 {
      margin: 0 0 4px 0;
      font-size: 1rem;
    }
    .muted {
      color: #6b7280;
    }
    .product-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    /* ---- Utils ---- */
    .radius {
      border-radius: 16px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .error {
      color: #b3261e;
      text-align: center;
    }
    @media (max-width: 720px) {
      .profile-content {
        grid-template-columns: 1fr;
      }
      .profilPicture {
        width: 100%;
        height: auto;
      }
    }
  `,
})
export class ProfilPage {
  private readonly userStore = inject(UserStore);
  private readonly productStore = inject(ProductStore); // ← crée/branche ce store si besoin

  user = computed(() => this.userStore.user());
  error = computed(() => this.userStore.error());
  loading = computed(() => this.userStore.loading());
  isProducer = computed(() => this.user()?.role === 'producer');
  isAdmin = computed(() => this.user()?.role === 'admin');

  products = computed(() => this.productStore.myProducts());
  productsLoading = computed(() => this.productStore.myProductIsLoading());

  editProfile() {
    /* ouvre un dialog ou navigue vers /users/edit */
  }

  // createProduct() { this.productStore.openCreateDialog?.(); }
  // editProduct(p: any) { this.productStore.openEditDialog?.(p); }
  // deleteProduct(p: any) { this.productStore.delete?.(p.id); }
}
