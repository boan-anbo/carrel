# Convention for Carrel Contracts

## Import

- Always use import paths that are relative to the path root.

## Versioning
- Always use versioning at the end of the package, e.g. `v1`, `v2`


## Shared packages

- `common`: core messages
- `generic`: shared helper messages


## Note

- Keep TO and Carrel distinct
- In fact, TO shouldn't need Proto definitions, unless it's its API implementation.
- Prefer componsition over inheritance. Inherit only for deeply connected entity types such as passages and documents, otherwise use composition.
  - E.g. you want to have `Snippet` and `Document` on `Tag`, do not add `Document` to `Snippet` first and then add `Snippet` to `Tag`. Instead, add `Document` and `Snippet` to `Tag` directly as peersz.
