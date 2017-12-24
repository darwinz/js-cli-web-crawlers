# JS CLI Web Crawlers

### Prerequisites

* [Node.js](https://nodejs.org/en/) 8.5+
* Npm 5.3+

### Setup

After all prerequisites are met, install package dependencies with npm

```bash
$ npm install
```

Then run the config helper to configure the environment (prompts for user configuration options)

```bash
$ npm run config:helper
```


### Running

After all prerequisites are met and setup is complete, crawlers can be run from shell using node, or as a node 
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
$ npm start
```
```bash
$ curl -XGET http://localhost:3000/crawlers/solar/production
```

### Testing

Integration testing can be run using npm
```bash
$ npm test
```
