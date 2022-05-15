# Docs

## Scripts

### generateTokens

Generates ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET to put in you .env file. This will be used to sign and refresh the access tokens of your users.

```
npm run generateTokens
yarn run generateTokens
```

## Makers

### makeModel

Generates a model boilerplate and its associated interface. Simply provide a name for your model and the name of the database table to sync with it.

```
npm run makeModel {modelName} {tableName}
yarn run makeModel {modelName} {tableName}
```

>e.g. : yarn run makeModel post posts

### makeController

Generates a basic controller. Simply provide its name and the name of the associated model to import.

```
npm run makeController {controllerName} {modelName}
yarn run makeController {controllerName} {modelName}
```

 >e.g. : yarn run makeController posts post

### makeMiddleware

Generates a middleware boilerplate. Simply provide its name.

```
npm run makeMiddleware {middlewareName}
yarn run makeMiddleware {middlewareName}
```

>e.g. : yarn run makeMiddleware authenticateUser

### makeRoutes

Generates a basic router. Simply provide its name and the name of the associated controller to use.

```
npm run makeRoutes {routerName} {controllerName}
yarn run makeRoutes {routerName} {controllerName}
```

>e.g. : yarn run makeRoutes posts posts
