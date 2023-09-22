import { Observable, of, map, filter, interval, take, merge } from 'rxjs';

const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next: (x) => {
        console.log('got value ' + x);
    },
    error: (err) => {
        console.error('something wrong occurred: ' + err);
    },
    complete: () => {
        console.log('done');
    },
});
console.log('just after subscribe');

const squareNumbers = of(1, 2, 3, 4, 5)
    .pipe(map(x => x * x));
console.log('Logging square numbers:');
squareNumbers.subscribe(x => console.log(x));

const obs = interval(100).pipe(
    map(x => x * x),
    filter(x => x % 2 == 0),
    take(5)
);
obs.subscribe(x => console.log(x));

const obs1 = interval(1000).pipe(map(() => 'A'), take(12));
const obs2 = interval(2200).pipe(map(() => 'B'), take(5));
const obs3 = interval(3600).pipe(map(() => 'C'), take(3));

const mergedObs = merge(obs1, obs2, obs3);

mergedObs.subscribe({ next: x => console.log(x) });
