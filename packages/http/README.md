_**lace-http** — Reactive HTTP microservices_

## Install

```
npm i lace-http
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
