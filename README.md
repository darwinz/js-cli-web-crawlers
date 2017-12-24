# JS CLI Web Crawlers

### Prerequisites

* [Node.js](https://nodejs.org/en/) 8.5+
* Npm 5.3+

### Setup

```bash
$ npm install
```

### Running

After all prerequisites are met, any of the crawlers can be run from shell using node, or as a node 
web service

##### Example (running from cli)

```bash
$ node crawlers/vivint_solar --run
```
or
```bash
$ npm run crawlers:solar
```

##### Example (running as web service)

```bash
$ node server
```
```bash
$ curl -XGET http://localhost:3000/crawlers/solar/production
```

### Testing

Integration testing can be run using npm
```bash
$ npm test
```
