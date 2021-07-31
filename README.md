# Medicine For All - Backend

![main](https://github.com/gu-tum-gun-aeng/med4all-be/actions/workflows/on-push-master.yaml/badge.svg)

<br>

# Development

## run deno locally

- copy `.env.example` to be your environment for ex. `.env.dev`

- install denon using deno.land

```
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

- start server with hot-reloading

```
denon start
```

## run deno locally with swagger

use docker compose to spawn the swagger, then open `localhost:8105`

```
docker-compose up
```

## VS code integration

- download plugin from
  https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno

- following the instructions below:
  1. Install the Deno CLI.
  2. Install this extension.
  3. Ensure deno is available in the environment path, or set its path via the
     deno.path setting in VSCode.
  4. Open the VS Code command palette, and run the Deno:
     `Initialize Workspace Configuration command`.

## Troubleshooting

- If you face the error bellow while trying to compile or run tests

```Error
The source code is invalid, as it does not match the expected hash in the lock file.
```

Try to recreate lock.json file by following the instructions below:

1. Delete lock.json file by command `rm -rf lock.json`
2. Run lock_update.sh
