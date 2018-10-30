# hAPPy-API for the Web-Engineering II project

Welcome to the backend of the hAPPy project.
This is a project done for the class 'Web-Engineering II' at the DHBW Stuttgart.
This project is licensed with the MIT license.

## Table of Contents

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Architecture](#architecture)

## <a name="requirements"></a>Requirements

1. Some commands may only work in a linux environment. Development using windows is possible, though not recommended.
2. Running postgresql database (for configuration see ormconfig.json)
3. Node package manager Yarn

## <a name="getting started"></a>Getting Started

### Installation

```bash
git clone git@gitlab.com:WebII_hAPPy/hAPPy-backend.git
git cd happy-backend
```

Generate Secret Key and set environment variables with `source`.

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Copy secret into app-env file

```env
#file: app-env
export JWT_SECRET="{secret}"
export GMAIL_USER=""
export GMAIL_PASS=""
```

```bash
. ./app-env
```

Finally install packages with yarn

```bash
yarn install
yarn test
yarn start
```

### Entities

Entities are the core of this application. Each entity describes a database table, its columns and their properties.

The database automatically synchronizes with the entities.

Each entity requires an id in form of a automatically generated integer.

Please refer to the [TypeORM documentation](https://github.com/typeorm/typeorm) for more information.

**WARNING:** Disable synchronization after first startup as unexpected errors may occur!

### Controller

Controller are the interface between the internet and the this application. The controller methods will be called if you access an API endpoint.

### Services

Services are the interface between the database and this application. They get, save, update and delete data in database.

### Routes

Each API endpoint is described under _src/routes.ts_ and the under the OpenAPI specification (openapi.yaml). The corresponding Express.js function will automatically be build by a wrapper in _src/index.ts_

### Tests

Tests are written with [Mocha](https://mochajs.org/) and [Supertest](https://github.com/visionmedia/supertest).

Each individual route shall have a test.
