# htmx-todo

![Screen Shot 2023-07-21 at 1 43 47 PM](https://github.com/jQwitt/htmx-todo/assets/10406506/504b68be-2e93-452a-9f50-fc18de224c4b)


Simple TODO web app using typescript, express, prisma, pug, htmx and tailwind. 

### Run the App locally

Developed using pnpm and nvm, so ensure these are installed locally. Development logging can be toggled in the `.env` file.

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

### Lighthouse and Performance

This is cheating since the app is so small but even for side projects the goal is to meet all WCAG and performance standards. 

![Screen Shot 2023-07-21 at 2 04 02 PM](https://github.com/jQwitt/htmx-todo/assets/10406506/eafad708-f16e-4a84-a1f2-be3d575ca738)


### Resources

[HeroIcons](https://heroicons.com/)
