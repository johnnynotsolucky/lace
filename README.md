_**rx-micro** — Reactive HTTP microservices_

Built on-top of [micro](https://github.com/zeit/micro) with RxJS6 instead of async/await.

## Install

```
npm i rx-micro
```

## Usage

Create an `index.js` file and export a function which accepts the standard [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) and [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) parameters as well as an Rx `Observable`:

```
module.exports = (req, res, request$) => {
  return request$.pipe(mapTo('Hello world!'))
}
```

Like `micro`, `rx-micro` handles return values:

```
module.exports = () => 'Hello world!'
```

### Command Line

```bash
npx rx-micro
```

