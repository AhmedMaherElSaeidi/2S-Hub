# Odoo Mock Server

A tiny Express server that mimics the REST endpoints your React Native app expects
from Odoo — so you can build and test the whole app before real Odoo access/REST
module is sorted out. Once the real backend is ready, you only change `API_URL`;
nothing in the app changes, since the endpoint shapes match.

## Structure

```
odoo-mock-server/
├── server.js              # starts the server (just app.listen)
├── app.js                 # express setup: middleware + route mounting
├── routes/                # one file per resource, maps HTTP verbs to controllers
│   ├── auth.routes.js
│   ├── customers.routes.js
│   └── salesOrders.routes.js
├── controllers/           # route handlers — read/mutate the in-memory data
│   ├── auth.controller.js
│   ├── customers.controller.js
│   └── salesOrders.controller.js
├── middleware/
│   ├── auth.js             # requireAuth — checks Bearer token
│   └── errorHandler.js     # 404 + centralized error responses
└── data/                   # fake seed data, mutated in place while the server runs
    ├── users.js
    ├── customers.js
    └── salesOrders.js
```

Requests are logged with `morgan("dev")` — every request prints method, path,
status, and response time straight to the terminal running `npm start`.

## Run it

```bash
cd odoo-mock-server
npm install
npm start
```

Server runs at `http://localhost:4000`. Every request is logged to the console.

## Test users

| username | password | role                              |
|----------|----------|-----------------------------------|
| `admin`  | `admin`  | internal user (sees Sales Orders) |
| `sales`  | `sales`  | portal/external user (no access)  |

## Endpoints

| Method | Path                          | Notes                                   |
|--------|--------------------------------|------------------------------------------|
| POST   | `/auth/login`                  | body: `{ username, password }`           |
| GET    | `/customers?search=`           | requires `Authorization: Bearer <token>` |
| GET    | `/customers/:id`               | requires auth                            |
| PUT    | `/customers/:id`                | body: fields to merge, e.g. `{ phone }`  |
| GET    | `/sales-orders`                 | requires auth                            |
| GET    | `/sales-orders/:id`             | requires auth                            |
| POST   | `/sales-orders/:id/confirm`     | sets status to `"confirmed"`             |

All data lives in memory (`data/*.js`) and resets when you restart the server.

## Point the app at this server

In `src/constants/constants.js`:

```js
export const API_URL = "http://localhost:4000";
```

**If you're testing on a real device or the Android emulator**, `localhost` refers to
the phone/emulator itself, not your computer — you'll need:

- **Android emulator:** `http://10.0.2.2:4000`
- **iOS simulator:** `http://localhost:4000` works fine
- **Physical phone (Expo Go):** your computer's LAN IP, e.g. `http://192.168.1.23:4000`
  (find it with `ipconfig getifaddr en0` on Mac, or `ipconfig` on Windows) — phone and
  computer must be on the same Wi-Fi network.

## What's intentionally fake

- Auth is a plaintext lookup against `data/users.js` — no hashing, no real JWT. Enough
  to test login success/failure and the internal-user gate, nothing more.
- No persistence — restarting the server resets any phone-number edits or order
  confirmations back to the seed data.
- No XML-RPC — this only mocks the REST path. If you end up building against XML-RPC
  directly against real Odoo, this server won't help you there.
