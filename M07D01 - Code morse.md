---
marp: true
---

## Objectifs

Ecrire dans la console SOS en morse (3 bips longs, 3 bips courts, 3 bips longs) de 3 manière différente :
- Avec des callbacks uniquement
- Avec des promesses uniquement
- Avec des async/await uniquement

Un bip long prend 0.5s alors qu'un bip court prend 0.1s.

## Manipulation

### Callback

```typescript{style="font-size: 14pt"}
sosCallback() {
    this.bipCourt(() => {
      this.bipCourt(() => {
        this.bipCourt(() => {
          this.bipLong(() => {
            this.bipLong(() => {
              this.bipLong(() => {
                this.bipCourt(() => {
                  this.bipCourt(() => {
                    this.bipCourt(() => {
                      console.log("STOP");
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  bipLong(callback: Function) {
    // jouez un bip sonore long d'une seconde
    console.log("Bip long");
    setTimeout(callback, 1000);
  }
  
  bipCourt(callback: Function) {
    // jouez un bip sonore court d'une dixième de seconde
    console.log("Bip court");
    setTimeout(callback, 100);
  }
```

Note : Il y a moyen de faire beaucoup plus optimisé mais l'objectif ici est de grossir le trait pour montrer à quel point les promesses et async await sont un confort d'écriture et de lecture

### Promesses

```typescript{style="font-size: 14pt"}
sosPromesses() {
    this.bipCourtPromesse()
      .then(() => this.bipCourtPromesse())
      .then(() => this.bipCourtPromesse())
      .then(() => this.bipLongPromesse())
      .then(() => this.bipLongPromesse())
      .then(() => this.bipLongPromesse())
      .then(() => this.bipCourtPromesse())
      .then(() => this.bipCourtPromesse())
      .then(() => this.bipCourtPromesse())
      .then(() => console.log("STOP"));
  }

  bipLongPromesse(): Promise<void> {
    return new Promise((resolve, reject) => {
      // jouez un bip sonore long d'une seconde
      console.log("Bip long");
      setTimeout(() => resolve(), 1000);
    });
  }
  
  bipCourtPromesse(): Promise<void> {
    return new Promise((resolve, reject) => {
      // jouez un bip sonore long d'une seconde
      console.log("Bip court");
      setTimeout(() => resolve(), 100);
    });
  }
```

### async/await

```typescript{style="font-size: 14pt"}
async sosAsyncAwait() {
    await this.bipCourtPromesse();
    await this.bipCourtPromesse();
    await this.bipCourtPromesse();
    await this.bipLongPromesse();
    await this.bipLongPromesse();
    await this.bipLongPromesse();
    await this.bipCourtPromesse();
    await this.bipCourtPromesse();
    await this.bipCourtPromesse();
    console.log("STOP");
  }
```

```html{style="font-size: 14pt"}
<button (click)="sosCallback()">SOS Callback</button>
<button (click)="sosPromesses()">SOS Promesses</button>
<button (click)="sosAsyncAwait()">SOS Async/await</button>
```