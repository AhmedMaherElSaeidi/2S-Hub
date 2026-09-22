# 2S Hub — Odoo Sales App

A React Native (Expo) mobile app for the sales team to log in with their Odoo
account, browse customers, update contact info, and (for internal users)
manage sales orders on the go.

---

## Prerequisites

- Node.js 18+
- npm
- The [Expo Go](https://expo.dev/go) app on your phone, **or** an Android/iOS
  simulator set up locally
- Phone and computer on the **same Wi-Fi network** if testing via Expo Go on
  a physical device

---

## 1. Run the mock backend

The app talks to a REST API. Until real Odoo access/REST module is ready,
use the included mock server — same endpoint shapes, so nothing in the app
changes later besides the URL.

```bash
cd odoo-mock-server
npm install
npm start
```

You should see:

```
Mock Odoo server running at http://localhost:4000
Test users -> admin/admin (internal), sales/sales (portal)
```

Every request is logged to this terminal (via `morgan`) — keep it visible
while testing, it's the fastest way to tell whether a request even reached
the server.

**Test accounts:**

| username | password | role                                          |
| -------- | -------- | --------------------------------------------- |
| `admin`  | `admin`  | internal user — sees the Sales Orders tab     |
| `sales`  | `sales`  | portal/external user — no Sales Orders access |

---

## 2. Configure the app's API URL

The app reads its backend URL from an environment variable,
`EXPO_PUBLIC_API_URL`. Create a `.env` file in the project root:

```
EXPO_PUBLIC_API_URL=http://<your-value-here>:4000
```

**What to put there depends on how you're running the app:**

| Running on               | `EXPO_PUBLIC_API_URL`                  |
| ------------------------ | -------------------------------------- |
| iOS simulator            | `http://localhost:4000`                |
| Android emulator         | `http://10.0.2.2:4000`                 |
| Physical phone (Expo Go) | `http://<your-computer's-LAN-IP>:4000` |

To find your LAN IP: `ipconfig getifaddr en0` (Mac) or `ipconfig` → IPv4
Address (Windows). `localhost` on a physical phone refers to the phone
itself, not your computer — this is the #1 cause of "network error / can't
reach server" during dev.

---

## 3. Run the app

```bash
npm install
npm start
```

This runs `expo start --tunnel`. Scan the QR code with Expo Go (Android) or
the Camera app (iOS), or press `a` / `i` in the terminal to launch an
emulator/simulator directly.

If you change `.env`, fully restart `npm start`

---

## Project architecture

### Folder structure

```
2S-Hub/
├── App.js                        # entry point, renders AppNavigation
├── .env                           # EXPO_PUBLIC_API_URL (not committed)
├── src/
│   ├── AppNavigation.jsx          # root stack: Login → MainTabs → detail screens
│   ├── MainTabs.jsx                # bottom tabs: Sales Orders / Home / Profile
│   ├── services.js                 # generic REST client (get/getById/post/put/del)
│   ├── controller/                 # one file per object — business logic + CRUD
│   │   ├── auth.controller.js      # login/logout, current user, role check
│   │   ├── customer.controller.js  # customer CRUD + customer_rank filtering
│   │   └── salesOrder.controller.js
│   ├── pages/                      # one folder per screen
│   │   └── <PageName>/
│   │       ├── <PageName>.jsx          # UI
│   │       ├── <PageName>.service.js   # screen-local state, calls the controller
│   │       └── <PageName>.style.js     # StyleSheet
│   └── components/                 # reusable UI pieces (Button, Input, cards, ...)
│       └── <ComponentName>/
│           ├── <ComponentName>.jsx
│           └── <ComponentName>.style.js
└── odoo-mock-server/                # separate Express project (see its own README)
```

### Layering

Each screen follows the same chain, and never skips a layer:

```
Page (.jsx)  →  Page service (.service.js)  →  Controller  →  services.js  →  Backend
```

## App Workflow

The app follows a simple, role-aware flow: every user logs in and lands on the
Customer List; internal users additionally get access to Sales Orders.

| Step | Screen                | Description                                                                  |
| ---- | --------------------- | ---------------------------------------------------------------------------- |
| 1    | **Login**             | User authenticates with their Odoo username/password.                        |
| 2    | **Customer List**     | Customers (`res.partner`, `customer_rank > 0`) with search by name.          |
| 3    | **Customer Details**  | View + edit contact info; phone updates sync back to Odoo.                   |
| 4    | **Sales Orders List** | _(Internal users only)_ Order number, customer, date, and status.            |
| 5    | **Order Details**     | Products, totals, status, and the option to confirm a draft/quotation order. |
| 6    | **Profile**           | Logged-in user info, role badge, and logout.                                 |

<table>
  <tr>
    <td align="center"><img src="assets/readme/login screen.jpg" width="200"/><br/>Login</td>
    <td align="center"><img src="assets/readme/customers list screen.jpg" width="200"/><br/>Customer List</td>
    <td align="center"><img src="assets/readme/customer details screen.jpg" width="200"/><br/>Customer Details</td>
  </tr>
  <tr>
    <td align="center"><img src="assets/readme/orders screen.jpg" width="200"/><br/>Sales Orders</td>
    <td align="center"><img src="assets/readme/order details screen.jpg" width="200"/><br/>Order Details</td>
    <td align="center"><img src="assets/readme/profile screen.jpg" width="200"/><br/>Profile</td>
  </tr>
</table>
