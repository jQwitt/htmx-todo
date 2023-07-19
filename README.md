# htmx-todo

Simple TODO web app using typescript, express, pug, htmx and tailwind.

### Run the App locally

Developed using pnpm and nvm, so ensure these are installed locally.

```bash
nvm use && pnpm i

# recommend running in a separate terminal
pnpm tw:watch

pnpm dev
```

### Run Prod Build

Compiles the project and runs the output from `/dist`.

```bash
pnpm build && pnpm start
```
