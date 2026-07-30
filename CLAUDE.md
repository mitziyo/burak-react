# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A restaurant/food-ordering frontend ("Burak") bootstrapped with Create React App using the Redux + Redux Toolkit TypeScript template. It talks to a separate backend API (not in this repo) over REST via axios, whose base URL is configured through `REACT_APP_API_URL`.

## Commands

This project uses `react-scripts` (Create React App) — no custom webpack/babel config.

- `npm start` — run the dev server at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — run the CRA/Jest test runner in interactive watch mode
- `npm test -- --watchAll=false --testPathPattern=App` — run a single test file non-interactively (CRA's Jest wrapper; pass any Jest CLI flags after `--`)
- `npm run eject` — irreversible CRA eject (do not run unless explicitly asked)

There is no lint script defined; ESLint runs implicitly through `react-scripts` (config: `react-app`, `react-app/jest` in `package.json`).

The `.env` file defines `REACT_APP_API_URL` (currently `http://localhost:3003`), consumed as `serverApi` in `src/lib/config.ts`. The backend API must be running separately for data-fetching screens to work.

## Architecture

### Entry point and providers

`src/index.tsx` wires up the provider stack in this order: Redux `Provider` → MUI `ThemeProvider` (+ `CssBaseline`) → `react-router-dom` v5 `BrowserRouter` → `App`. The MUI theme is built in `src/app/MaterialTheme/`.

### Routing and layout shell

`src/app/App.tsx` is the top-level layout: it picks `HomeNavbar` vs `OtherNavbar` based on `location.pathname === "/"`, renders the route `Switch` (`/products`, `/orders`, `/member-page`, `/help`, `/` → HomePage), then a global `Footer` and `AuthenticationModal`. Cart state (`useBasket` hook) and signup/login modal open-state are owned at the `App` level and passed down as props to the navbars and pages — there is no cart slice in Redux; the cart lives in component state + `localStorage` (`cartData` key).

Note: react-router-dom is v5 here (`Switch`/`Route path=... children`), not v6 — don't introduce v6 APIs (`Routes`, `element` prop).

### State management (Redux Toolkit)

Store setup is in `src/app/store.ts`, using `redux-logger` middleware unconditionally (even outside dev). Each screen that needs global state owns its own slice colocated in its folder:

- `src/app/screens/homePage/slice.ts` → `homePage` reducer
- `src/app/screens/productsPage/slice.ts` → `productsPage` reducer

Screens not yet wired into the store (`ordersPage`, `userPage`) don't have a `slice.ts`/`selector.ts` yet. When adding one, follow the existing pattern:

1. Add the state shape to `src/lib/types/screen.ts` (extends `AppRootState`)
2. Create `slice.ts` with `createSlice` (state, action reducers only — no thunks)
3. Create `selector.ts` with `reselect`'s `createSelector`, reading off `AppRootState`
4. Register the reducer in `src/app/store.ts`
5. In the screen's `index.tsx`, wrap dispatched actions in a local `actionDispatch(dispatch)` helper (see `homePage/index.tsx`) and fetch data via a service class inside `useEffect`

Typed Redux hooks (`useAppDispatch`, `useAppSelector`) are defined in `src/app/hooks.ts` — prefer these over raw `react-redux` hooks, though existing code sometimes uses raw `useDispatch` directly.

### Data layer (services)

`src/app/services/` contains one class per backend resource (`ProductService`, `MemberService`), each instantiated per-use (`new ProductService()`) rather than as a singleton, using axios directly against `serverApi` from `src/lib/config.ts`. Auth-relevant calls (`login`, `signup`) pass `{ withCredentials: true }` and persist the returned member to `localStorage` (`memberData` key). Follow this class-per-resource pattern when adding new API integrations rather than introducing a different HTTP layer.

### Screens structure

Each screen lives under `src/app/screens/<name>/` with an `index.tsx` composing smaller presentational sub-components (e.g. `homePage/PopularDishes.tsx`, `productsPage/ChosenProduct.tsx`). Nested routes within a screen (e.g. `/products/:productId`) are handled with a nested `Switch`/`Route` inside the screen's own `index.tsx` (see `productsPage/index.tsx`), using `useRouteMatch` for the base path.

### Shared types/enums/data

- `src/lib/types/` — domain types (`product.ts`, `member.ts`, `search.ts`) plus the Redux state shape aggregator `screen.ts`
- `src/lib/enums/` — string/numeric enums mirrored from the backend (`ProductCollection`, `ProductStatus`, `MemberType`, etc.) — keep these in sync with backend enum values rather than using arbitrary strings
- `src/lib/data/` — static content (`faq.ts`, `plans.ts`, `terms.ts`) for informational pages
- `src/lib/sweetAlert.ts` — SweetAlert2 wrappers (`sweetErrorHandling`, etc.) used for error/success popups instead of ad hoc alerts
- `src/lib/config.ts` — `serverApi` base URL and the shared `Messages` dictionary of user-facing error strings

### UI stack

Both `@material-ui/core` (v4, `makeStyles`) and `@mui/material`/`@mui/joy`/`@mui/lab` (v5) are present simultaneously — newer components use MUI v5 with the `sx` prop; some older ones (e.g. `AuthenticationModal`) still use v4 `makeStyles`/`Modal`. `styled-components` is also used alongside emotion (MUI v5's default styling engine). When touching a file, match its existing styling approach rather than mixing new patterns in.

Global CSS lives in `src/css/*.css` and is imported per-screen/component with `// @ts-ignore` (CRA's TS setup doesn't type plain CSS imports).
