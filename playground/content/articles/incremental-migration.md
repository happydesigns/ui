---
title: Migrating an existing website without redesigning it
authors:
  - happydesigns
category: Guide
date: 2026-05-30
description: Move repeated behavior into a shared layer in small gates while preserving routes, content, media, and the visible brand.
published: true
toc: true
---

A technical migration does not need to become a visual redesign. The safest sequence proves shared behavior in one consumer before using it to modernize another.

## Inventory before replacing

Identify which files implement reusable mechanics and which ones encode domain knowledge. Search loading and route matching can move into a layer; a project-specific header composition should not.

## Validate with a prerelease

Package the candidate layer, install that exact artifact in the reference consumer, and remove local implementations only after their replacement is demonstrated.

## Preserve the visible contract

Compare routes, generated content, screenshots, and interactive behavior before and after the migration. Changes should be limited to deliberate accessibility, responsive, or defect corrections.

## Promote the same code

Once the prerelease passes, publish the identical package state as the stable release. This keeps the release gate meaningful.
## Work through reversible gates

| Gate | Evidence |
| --- | --- |
| Extract | Shared behavior has focused tests |
| Prerelease | Reference consumer uses the packaged artifact |
| Visual comparison | Mobile and desktop screenshots preserve the brand |
| Stable release | The promoted build matches the validated prerelease |
| Second consumer | Legacy infrastructure is removed only after replacement |

Each gate should leave the production site usable. That makes the migration easier to review and gives failures a small, understandable surface.

## Compare behavior, not filenames

A local file is removable only when its responsibility is clearly replaced or its non-use is demonstrated. Similar names are not evidence; generated output, browser behavior, and search contents are.
