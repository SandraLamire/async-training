const wait1sWithCallback = (log1s) => {
    setTimeout(log1s, 1000);
};

const callbackLog1s = () => {
    console.log("1 seconde s'est écoulée");
};

wait1sWithCallback(callbackLog1s);
console.log('Before callback');

const echec = false;

const wait1sWithPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (echec) {
            reject('Promesse non résolue');
        }
        resolve('mon résultat');
    }, 1000);
});

wait1sWithPromise()
    .then(data => {
        console.log(`Données récupérées après 1s: "${data}"`);
    })
    .catch(error => {
        console.log(`Erreur après 1s: ${error}`);
    });

class Async {

    fails = false;

    async wait1sWithAsyncAwait() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.fails) {
                    reject('Erreur dans la fonction asynchrone');
                }
                resolve('Données asynchrones');
            }, 1000);
        });
    }

}

const asyncInstance = new Async();
try {
    const result = await asyncInstance.wait1sWithAsyncAwait();
    console.log(`Log after 1s using async/await: "${result}"`);
} catch (error) {
    console.log(`Log after 1s using async/await: "${error}"`);
}
