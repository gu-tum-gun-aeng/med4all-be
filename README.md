# Medicine For All - Backend

![main](https://github.com/gu-tum-gun-aeng/med4all-be/actions/workflows/on-push-master.yaml/badge.svg)
[![codecov](https://codecov.io/gh/gu-tum-gun-aeng/med4all-be/branch/main/graph/badge.svg?token=EC9IE2G5JM)](https://codecov.io/gh/gu-tum-gun-aeng/med4all-be)

## Development

### run deno locally

- install velociraptor using deno.land

```sh
deno install -qAn vr https://deno.land/x/velociraptor@1.1.0/cli.ts
```

- copy `.env.sample` to be your environment for ex. `.env.dev`

- start server with hot-reloading

```sh
vr run start
```

- run unit test

```sh
vr run unit
```

- run unit test with hot-reloading

```sh
vr run unit:watch
```

- run integration test

```sh
vr run integration
```

- run test: both unit and integration

```sh
vr run test
```

- run formatter and linter

```sh
vr run format
```

```sh
vr run lint
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
