# Medicine For All - Backend

![main](https://github.com/gu-tum-gun-aeng/med4all-be/actions/workflows/on-push-master.yaml/badge.svg)
[![codecov](https://codecov.io/gh/gu-tum-gun-aeng/med4all-be/branch/main/graph/badge.svg?token=EC9IE2G5JM)](https://codecov.io/gh/gu-tum-gun-aeng/med4all-be)

## Development

### run deno locally

- install denon using deno.land

```sh
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

- update deno dependency cache

```sh
denon cache-reload
```

- start server with hot-reloading

```sh
denon start
```

- run test in directories with hot-reloading

```sh
denon test [TEST_DIRECTORY...]
```

- run formatter and linter in watch mode

```sh
denon check
```

```sh
denon lint
```

### run deno locally with swagger

use docker compose to spawn the swagger, then open `localhost:8105`

```sh
docker-compose up
```

### VS code integration

- download plugin from
  [here](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)

- following the instructions below:
  1. Install the Deno CLI.
  2. Install this extension.
  3. Ensure deno is available in the environment path, or set its path via the
     deno.path setting in VSCode.
  4. Open the VS Code command palette, and run the Deno:
     `Initialize Workspace Configuration command`.

### Troubleshooting

- If you face the error bellow while trying to compile or run tests

```Error
The source code is invalid, as it does not match the expected hash in the lock file.
```

Try to recreate lock.json file by executing lock_update.sh script.
