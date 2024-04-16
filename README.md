#README

Nextjs app boiler plate for an online shop.

## Auth0 initialization

1. Follow the readme of the API boiler plate to create and auth0 account and setup the regular web application app.

2. Create a machine to machine application that will be used to handle "Auth0 Management API"

3. In the "Auth0 Management API", go to "M2M applications" and authorize the m2m application, also tick every permissions needed (ex: crud for roles and users)

## Create an env.local file

```
AUTH0_SECRET=<AUTH0_SECRET> Generated with command: "openssl rand -hex 32"
AUTH0_BASE_URL=<AUTH0_BASE_URL> From Regular web app
AUTH0_ISSUER_BASE_URL=<AUTH0_ISSUER_BASE_URL> From Regular web app (tenant)
AUTH0_CLIENT_ID=<AUTH0_CLIENT_ID> From Regular web app
AUTH0_CLIENT_SECRET=<AUTH0_CLIENT_SECRET> From Regular web app
AUTH0_AUDIENCE=<AUTH0_AUDIENCE> From the API application

MANAGEMENT_TOKEN_URL=<MANAGEMENT_TOKEN_URL> AUTH0_BASE_URL/oauth/token
MANAGEMENT_AUDIENCE=<MANAGEMENT_AUDIENCE> AUTH0_BASE_URL/api/v2
MANAGEMENT_CLIENT_ID=<MANAGEMENT_CLIENT_ID> From m2m app
MANAGEMENT_CLIENT_SECRET=<MANAGEMENT_CLIENT_SECRET> From m2m app

NEXT_PUBLIC_API_BASE_URL=<NEXT_PUBLIC_API_BASE_URL> URL of the API
NEXT_PUBLIC_MANAGEMENT_API_BASE_URL=<NEXT_PUBLIC_MANAGEMENT_API_BASE_URL> AUTH0_BASE_URL/api/v2
```
