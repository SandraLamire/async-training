
/* 
Modifier les lignes comme suit pour que nodemon met à jour la console à chaque modif :
  "scripts": {
    "start": "node main.js",
    "dev": "nodemon main.js"
  },
*/

/******************** EXAMPLES **********************************/  

/* CALLBACK */
const wait1sWithCallback = (log1s) => {
    setTimeout(log1s, 1000);
};

const callbackLog1s = () => {
    console.log("CALLBACK : 1 seconde s'est écoulée depuis le callback");
};

wait1sWithCallback(callbackLog1s);
console.log('CALLBACK : Before callback');

/* PROMISE */
const echec = false;

const wait1sWithPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (echec) {
            reject('PROMISE : Promesse non résolue');
        }
        resolve('PROMISE : mon résultat');
    }, 1000);
});

wait1sWithPromise()
    .then(data => {
        console.log(`PROMISE : Données récupérées après 1s: "${data}"`);
    })
    .catch(error => {
        console.log(`PROMISE : Erreur après 1s: ${error}`);
    });

/* ASYNC/AWAIT - rajouter "type": "module", dans package.json pour que async fonctionne */
class Async {

    fails = false;

    async wait1sWithAsyncAwait() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.fails) {
                    reject('ASYNC/AWAIT : Erreur dans la fonction asynchrone');
                }
                resolve('ASYNC/AWAIT : Données asynchrones');
            }, 1000);
        });
    }

}

const asyncInstance = new Async();
try {
    const result = await asyncInstance.wait1sWithAsyncAwait();
    console.log(`ASYNC/AWAIT : Log after 1s using async/await: "${result}"`);
} catch (error) {
    console.log(`ASYNC/AWAIT : Log after 1s using async/await: "${error}"`);
}

/*********************** TRAINING ********************************/
/* TD M07D01 - Code Morse - N'en faire fonctionner qu'1 à la fois, commenter les autres */
/* Ecrire dans la console SOS en morse (3 bips longs, 3 bips courts, 3 bips longs) de 3 manières différentes */

/* CALLBACK */
/*
class MorseCode {
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
  
    bipCourt(callback) {
      console.log(".");
      setTimeout(callback, 100);
    }
  
    bipLong(callback) {
      console.log("-");
      setTimeout(callback, 500);
    }
  }
  
  const morseCodeInstance = new MorseCode();
  morseCodeInstance.sosCallback();
*/

/* OU */
/*
function sosCallback() {
  function bipCourt(callback) {
    // jouer un bip sonore court d'une dixième de seconde
    console.log("Bip court");
    setTimeout(callback, 100);
  }

  function bipLong(callback) {
    // jouer un bip sonore long d'une seconde
    console.log("Bip long");
    setTimeout(callback, 1000);
  }

  bipCourt(() => {
    bipCourt(() => {
      bipCourt(() => {
        bipLong(() => {
          bipLong(() => {
            bipLong(() => {
              bipCourt(() => {
                bipCourt(() => {
                  bipCourt(() => {
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

console.log("SOS - CALLBACK");
sosCallback();
*/

/* PROMISE */

  /* Ce code pose pb: renvoie un bip court puis SOS - PROMESSES 
     puis 5 bip courts puis 6 bips long puis 6 bip courts puis STOP car
     Chaque appel à then démarre la prochaine promise dès que la précédente est résolue
     et cela se produit pour chaque appel à bipCourtPromesse et bipLongPromesse. 
  
  function sosPromesses() {
    bipCourtPromesse()
      .then(bipCourtPromesse)
      .then(bipCourtPromesse)
      .then(bipLongPromesse)
      .then(bipLongPromesse)
      .then(bipLongPromesse)
      .then(bipCourtPromesse)
      .then(bipCourtPromesse)
      .then(bipCourtPromesse)
      .then(() => {
        console.log("STOP");
      });
  }
  */

  
  function sosPromesses() {
    // On commence par exécuter trois bips courts en série
    bipCourtPromesse()
      .then(bipCourtPromesse)
      .then(bipCourtPromesse)
      .then(() => {
        // Une fois les trois bips courts terminés, on enchaîne avec trois bips longs en série
        return bipLongPromesse()
          .then(bipLongPromesse)
          .then(bipLongPromesse);
      })
      .then(() => {
        // Enfin, après les trois bips longs, on exécute à nouveau trois bips courts
        bipCourtPromesse()
          .then(bipCourtPromesse)
          .then(bipCourtPromesse)
          .then(() => {
            // Et on affiche "STOP" une fois que tout est terminé
            console.log("STOP");
          });
      });
  }
  
  function bipLongPromesse() {
    return new Promise((resolve) => {
      // Jouez un bip sonore long d'une seconde
      console.log("Bip long");
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function bipCourtPromesse() {
    return new Promise((resolve) => {
      // Jouez un bip sonore court d'une dixième de seconde
      console.log("Bip court");
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
  
  console.log("SOS - PROMESSES");
  sosPromesses();

