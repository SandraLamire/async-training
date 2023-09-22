import { Observable, of, map, filter, interval, take, merge } from 'rxjs';

const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);     // affiche 1, 2, 3 d'affiler
    setTimeout(() => {      // puis affiche 4 après 13 seconde (donc après les ABC de dessous)
        subscriber.next(4);
        subscriber.complete();
    }, 13000);
});


console.log('____________________');
console.log('just before subscribe');
observable.subscribe({
    next: (x) => {
        console.log('got value ' + x);
    },
    error: (err) => {
        console.error('something wrong occurred: ' + err);
    },
    complete: () => {
        console.log('____________________');
        console.log('done');
        console.log('____________________');
    },
});
console.log('just after subscribe');
console.log('____________________');

const squareNumbers = of(1, 2, 3, 4, 5)
    .pipe(map(x => x * x));
console.log('Logging square numbers:');
squareNumbers.subscribe(x => console.log(x));


// pipe() pour chaîner plusieurs opérations sur l'observable
const obs = interval(100).pipe(
    map(x => x * x),            // calcul de valeurs au carré
    filter(x => x % 2 == 0),    // filtre : laisse passé les nb pairs
    take(5)                     // limite le nombre de valeurs émises par l'observable à 5 max
);
obs.subscribe(x => console.log(x));
console.log('____________________');

// map(() => 'A') remplace () (=peu importe la valeur) par A
// take précide le nombre de fois où A va appraitre dans la console
const obs1 = interval(1000).pipe(map(() => 'A'), take(12));
const obs2 = interval(2200).pipe(map(() => 'B'), take(5));
const obs3 = interval(3600).pipe(map(() => 'C'), take(3));

const mergedObs = merge(obs1, obs2, obs3);


mergedObs.subscribe({ next: x => console.log(x) });

console.log('____________________');

