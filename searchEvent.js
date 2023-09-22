const { fromEvent, debounceTime, distinctUntilChanged, map } = rxjs;

const input = document.getElementById('search');
const obs = fromEvent(input, 'input').pipe(
    map(event => event.target.value),
    debounceTime(1000),
    distinctUntilChanged()
);
obs.subscribe({
    next: x => console.log(x),
    error: error => console.log(error)
});