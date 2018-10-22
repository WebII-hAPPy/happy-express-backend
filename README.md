# hAPPy-API for the Web-Engineering II project

## Requirements

1. Running postgresql database
2. JWT_SECRET set as an environment variable

Generate Secret

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

```
#file: app.env
export JWT_SECRET="{secret}"
export NODE_ENV="dev"
```

```bash
source app.env
```

## Setup

```bash
yarn install
yarn start
```
