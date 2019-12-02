# klog

A vue web app + node server.

- `/server` is a node express server.
- `/src` is the source code for the vue app.
- `/public` is the source of public files. they are not the final served files. They will be compiled by vue-cli-service.
- `/dist` (git ignored) is the final output of the front end code, compiled from `/public` and `/src` above. This dir gets cleared and rebuilt by vue-cli-service.
- `.env` (git ignored) includes environmental varaibles. Instruction for this file is in `EXAMPLE.env`.

## How to run

### Install and set up
1. Install all the node dependencies `npm install`.
1. Save env variables. Follow the instructions in `EXAMPLE.env`.

### Local dev
```bash
npm run dev-fe  # Auto reload vue code
npm run dev-be  # Auto reload node server
```

### Compile and prod

```bash
npm run prod  # compile and run server using forever.js
```

```bash
npm run stop  # stop forever.js
```
