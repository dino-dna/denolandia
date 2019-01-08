# contributing

## usage

- set `NODE_ENV=development` in your environment, if it's not already
- set the env vars in `.env.development`
    - see the `.env.example` for a template, or, we recommend getting the env vars from a peer
- run `yarn start`.  this:
    - kicks off the typescript compiler
    - boots a _new_ database
    - runs the API server
    - builds the typescript typings for the graphql schema

if you need to debug the application, run can run any of the components independently:

- `yarn compiler:start`
- `yarn db:start`
- `yarn server:start`

there are debug configurations for the server checked in for VSCode.
