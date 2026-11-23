# Contributing

Read the [README](README.md) for the package scope and the [layer structure guide](docs/content/2.concepts/3.layer-structure.md) for the responsibilities of the base and Content layers.

## Local development

Use the package manager declared in [package.json](package.json) and the Node release line used by [CI](.github/workflows/ci.yml). The consumer support range is declared in `engines`.

Run `pnpm install` and use `pnpm dev` for the playground or `pnpm docs` for Docus.

## Verification

- Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` for source changes.
- Run `pnpm build` to verify playground routes and the generated content.
- Run `pnpm consumer:check` for package exports, layer registration, or generated types. It uses the packed package in isolated base and Content apps and requires registry access.
- Run `pnpm docs:typecheck:server` for docs server code and `pnpm docs:build` for pages and generated references. Use `pnpm docs:build:server` for deployments that serve live MCP.

Use the [product docs](docs/content/) for usage guides. Keep version ranges in the relevant manifest and update the existing guide when behavior changes.

## Releases

Use Conventional Commits. During v0, compatible changes increment patch and breaking changes increment minor. Use `pnpm release:preview` to review the proposed version and changelog.

On a clean worktree, `pnpm release` creates a local release commit and annotated tag. For prereleases, use `pnpm release:pre`, `pnpm release:alpha`, or `pnpm release:beta`.

When authorized, push the release commit and tag with `git push --follow-tags`. Tag CI validates the package and creates the GitHub release from the matching version in `CHANGELOG.md`. npm publication is a separate `pnpm publish` step. Use `pnpm publish --tag next` for prereleases.

If tag CI fails, fix the cause and rerun the failed workflow when possible. Prepare a new version if the tagged source needs correction. Preserve published tags.
