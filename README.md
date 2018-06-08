_**rx-micro** — Reactive HTTP microservices_

## Install

```
npm i rx-micro
```

## Usage

```
module.exports = request$ => {
  return request$
    .pipe(
      mapTo('Hello world!'),
    )
}
```

```
module.exports = () => 'Hello world!'
```
