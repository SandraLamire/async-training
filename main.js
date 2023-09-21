
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
/* TD M07D01 - Code Morse */
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

sosCallback();



