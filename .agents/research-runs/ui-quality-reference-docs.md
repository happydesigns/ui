# UI Quality Reference Docs Research Run

Datum: 2026-07-03
Repo: `happydesigns/ui`
Modus: Proposal-only, keine Codeänderungen an Library oder Docs
Ziel: Referenzmodell für Dokumentation, Tests und Qualitätssicherung einer modernen Nuxt-UI-basierten Component Library

## Executive Summary

`happydesigns/ui` sollte Docus als primäre Product-Docs-Shell behalten und die bereits vorhandene `ui-reference`-Richtung ausbauen: Source-nahe, generierte API-Daten für öffentliche `H*` Komponenten, ergänzt durch kuratierte Prosa zu Intent, Composition, Accessibility, Varianten, Tokens und Consumer-Verantwortung.

Die wichtigsten Vorbilder zeigen ein klares Muster:

- Nuxt UI dokumentiert Komponenten mit Usage, API, Slots, Theme-Konfiguration und Source-Link.
- Radix UI dokumentiert komplexe Komponenten als Anatomy, per-part API, Data Attributes, CSS Variables und konkrete Keyboard-Interaktionen.
- shadcn/ui priorisiert installierbare Code-Beispiele, Varianten, Composition und verweist bei Primitives bewusst auf Radix/Base UI statt fremde APIs zu duplizieren.
- Storybook/Chromatic eignet sich weniger als Ersatz für Docus, aber stark als Fixture- und Visual-Regression-Oberfläche.
- VueUse zeigt, wie Source-nahe Type Declarations und Kategorien eine große API navigierbar halten.
- Tailwind/Nuxt-Module zeigen, dass Tokens und Runtime-Konfiguration dokumentierte APIs sind, nicht nur interne Stylingdetails.
- `vue-component-meta` ist für Vue-SFC-Komponenten der naheliegendere API-Extractor als ein eigener Regex-Parser; TypeDoc bleibt relevant für TypeScript-Exports, Schemas und JSON-Output.

Empfehlung: Erst einen kleinen `ui-reference-quality-spike` mit zwei Komponenten durchführen, nicht direkt eine komplette Storybook/Chromatic-Migration.

## Lokaler Repo-Befund

Relevante bestehende Struktur:

- Root Package: `@happydesigns/ui`, Nuxt Layer mit `app/`, `schemas/`, `content.config.ts`, `nuxt.config.ts`.
- Docs: `docs/` erweitert `docus`, nutzt `@nuxtjs/i18n`, `@happydesigns/nuxt-variants` und eigene MDC-Komponenten.
- Referenz-Utilities: `docs/server/utils/uiReference.ts` erzeugt aktuell Props, Slots, Source-Links, Beispiele, Varianten und Collections aus Repo-Dateien.
- Docs-Komponenten: `UiComponentProps.vue`, `UiComponentSlots.vue`, `UiComponentSourceLink.vue`, `UiExample.vue`, `UiVariantTable.vue`, `UiCollectionTable.vue`.
- Beispielseiten: Komponentenseiten nutzen bereits das Muster Usage -> API -> Source.
- Tests: Im Root sind aktuell keine expliziten `test`, `vitest`, `playwright`, `storybook` oder `chromatic` Scripts definiert. Vorhandene Gates sind `prepare`, `lint`, `build`, `docs:build`, `docs:build:server`.

Wichtig: Das Worktree war vor diesem Run bereits stark verändert, vor allem unter `docs/`. Dieses Artefakt vermeidet bewusst Aussagen, die bestehende uncommitted Docs-Umstrukturierungen als final voraussetzen.

## Vergleichsmatrix

| Referenz | Beobachtetes Muster | Relevanz für `ui` |
| --- | --- | --- |
| Nuxt UI Docs | Komponenten haben Usage-Beispiele, API-Tabellen, Slots, Theme-Blöcke, Source-Link und Changelog. Theme und Runtime-Konfiguration laufen über `app.config.ts` und semantische Farben. | Direktes Vorbild für Docus-MDC-Komponenten: Usage zuerst, generierte API danach, Theme/Variants als eigener Vertrag. |
| shadcn/ui | Seiten zeigen Installation, Usage, Beispiele, Varianten, Composition, API Reference und Verweise auf Base UI/Radix. Registry dient als Distributionsmodell für Code, nicht nur Dokumentation. | Gut für "kopierbare Beispiele" und klare Composition-Docs. Nicht direkt als API-Generator-Vorbild, weil shadcn Source in Konsumentenprojekte kopiert. |
| Radix UI | Dokumentiert Anatomy, per-part API, Data Attributes, CSS Variables, Features und Keyboard Interactions. Accessibility ist je Komponente konkret beschrieben. | Starkes Modell für interaktive `H*` Komponenten: Accessibility darf nicht nur "accessible" behaupten, sondern muss Tasten, Fokus, Rollen und Consumer-Pflichten nennen. |
| Storybook/Chromatic | Stories werden zu Visual Tests; Baselines werden in CI verglichen; PR-Checks können required sein. Args erlauben kontrollierte Props/States. A11y-Addon nutzt axe. | Als QA-Oberfläche sinnvoll. Docus bleibt Produktdocs; Storybook kann fixture-orientierte Testoberfläche werden, falls Playwright-gegen-Docus nicht reicht. |
| VueUse Docs | Große API über Kategorien, Suche, kurze Beschreibungen, Usage, Component Usage und Type Declarations. | Vorbild für Composable-Dokumentation und LLM-freundliche, source-nahe Type-Auszüge. |
| Tailwind / Nuxt Tailwind module | Tailwind v4 macht `@theme` Variablen zu Token-APIs, die Utilities erzeugen. Das Nuxt-Modul dokumentiert Config Viewer, `exposeConfig`, CSS-Injection und Layer-Konfiguration. | Tokens, CSS-Priorität, Theme-Viewer und Runtime Config sollten als öffentliche Qualitätsfläche dokumentiert werden. |
| TypeDoc / Vue Component Metadata | TypeDoc erzeugt HTML/JSON aus TS-Reflections und kann Dokumentationswarnungen als Errors behandeln. `vue-component-meta` extrahiert Props, Events, Slots und Exposed aus Vue-Komponenten. | `vue-component-meta` sollte als Kandidat für Komponenten-Metadaten priorisiert werden; TypeDoc eher für Schemas, Types und JSON-Referenzen. |
| Docus | Docus bringt Markdown/MDC, Nuxt UI, Suche, Navigation, i18n, LLM/MCP-Ausgaben und App Config Customization. | Docus ist kein Hindernis. Es kann die Product-Docs-Schale bleiben, wenn generierte Referenzdaten als custom MDC-Komponenten eingebettet werden. |

## Forschungsfragen

### Wie sollten Komponenten-APIs automatisch dokumentiert werden?

Die Source of Truth sollte in dieser Reihenfolge liegen:

1. Vue-SFC und TypeScript-Typen fuer Props, Emits, Slots und Exposed.
2. JSDoc/TSDoc-Kommentare an öffentlichen Props, Slot-Props, Emits und Typen.
3. `app.config.ts`, Varianten-Registry und Schemas fuer Tokens, Defaults, Collections und Content-Kontrakte.
4. Manuelle Docus-Prosa fuer Intent, Use-cases, Anti-patterns, Accessibility und Composition.

Konkrete Empfehlung:

- `vue-component-meta` als Spike gegen den aktuellen Parser aus `docs/server/utils/uiReference.ts` testen.
- Ausgabe in ein stabiles internes Referenzmodell normalisieren: `name`, `source`, `props`, `emits`, `slots`, `exposed`, `examples`, `theme`, `variants`, `a11y`.
- Jedes öffentliche `H*` Component-File muss mindestens eine Docs-Seite, Source-Link und API-Auflösung haben.
- `props` sollten `name`, `type`, `required`, `default`, `description`, `tags`, `sourceDeclaration` enthalten.
- `slots` sollten `name`, `type`, `slotProps`, `fallback`, `description`, `layoutCritical` enthalten.
- `emits` sollten auch dann dokumentiert werden, wenn aktuell wenige Komponenten Events explizit nutzen.
- Generierte Tabellen dürfen nicht die einzige Dokumentation sein. Sie beantworten "was ist die API"; die Docus-Prosa beantwortet "wann und warum".

Nicht empfohlen:

- Eine zweite manuelle API-Tabelle in Markdown pflegen.
- Upstream Nuxt UI APIs vollständig in `ui` kopieren. Wenn ein `H*` Component upstream Props durchreicht, dokumentiert `ui` nur die eigene Layer-Oberfläche und verlinkt Nuxt UI.
- Regex-Parsing dauerhaft als einziger Extractor, sobald generics, imported types, unions, defaults oder typed slots komplexer werden.

### Welche Tests braucht eine reusable UI foundation?

Empfohlene Testpyramide:

| Ebene | Ziel | Kandidaten |
| --- | --- | --- |
| Static gates | Typen, Layer-Auflösung, Lint, Docs-Build | `pnpm prepare`, `pnpm lint`, `pnpm docs:build`, TypeScript/nuxt prepare |
| Metadata gates | API-Docs driften nicht von Source weg | Script: alle öffentlichen `H*` Komponenten haben Docs-Seite, Source-Link, Props/Slots-Descriptions und Beispielstatus |
| Unit tests | Pure Logic bleibt stabil | Utils, Composables, Query Builder, Variant-Merger, Date/Clipboard Helpers, Schema Helpers |
| Component render tests | Public Contracts funktionieren isoliert | Vue Test Utils oder Nuxt Test Utils gegen Props, Slots, app config defaults, empty states |
| Integration tests | Layer funktioniert in Nuxt-Kontext | Playground- und Docs-Fixtures, Auto-Imports, Content Collections, Route/Page behavior |
| Accessibility tests | Interaktive Komponenten verletzen keine Basisregeln | axe auf gerenderten Fixtures; manuelle Keyboard-Checkliste fuer Fokus/Tab/Enter/Escape |
| Visual regression tests | Layout, Theme und Responsiveness driften nicht unbemerkt | Zuerst Playwright Screenshots gegen Docus/Playground; spaeter Storybook+Chromatic, falls Reviewflow gebraucht wird |
| Package boundary checks | `ui` bleibt wiederverwendbar | Scan gegen App-spezifische Routen, Copy, Assets, Secrets, Brand-Hardcodings |

Mindeststandard für neue oder geänderte öffentliche Komponenten:

- Docs-Seite vorhanden.
- Mindestens ein neutraler fixture/example.
- Props und Slots aus Source auflösbar.
- Kritische States abgedeckt: default, empty, disabled/loading/error falls relevant, long text, mobile width, dark mode.
- Accessibility-Verantwortung explizit: was übernimmt `ui`, was muss der Consumer liefern.

### Wie vermeiden wir visuelle Regressionen?

Visual Regression sollte fixture-driven sein, nicht dokumentationsgetrieben.

Empfohlene Reihenfolge:

1. Kurzfristig: Playwright Screenshots gegen Docus- oder Playground-Fixtures.
2. Mittelfristig: Storybook nur einführen, wenn es als Review- und State-Matrix-Oberfläche klaren Mehrwert bringt.
3. Langfristig: Chromatic nur dann, wenn externe Baseline-Verwaltung und PR-Checks gewünscht sind.

Fixture-Matrix pro public component:

- default
- empty/no data
- loading/pending, falls vorhanden
- error/fallback, falls vorhanden
- long German/English text
- dark/light
- mobile/desktop
- token/theme override
- slot override
- disabled/current/active states
- reduced motion, falls Animation vorhanden

Stabilitätsregeln:

- Keine externen Bilder oder Live-Netzwerkdaten in Visual Fixtures.
- Zeit, Locale und zufällige IDs stabilisieren.
- Animationen im Screenshot-Kontext deaktivieren oder deterministisch machen.
- Kleine DOM-Snapshots können ergänzen, ersetzen aber keine Pixeltests.

### Wie dokumentieren wir Tokens, Slots, Props, Variants und Accessibility?

Empfohlenes Component-Page-Template:

1. Purpose: ein Satz, welche Aufgabe die Komponente erfüllt.
2. Use when: konkrete Einsatzfälle.
3. Avoid when: wann Nuxt UI direkt oder App-lokale Composition besser ist.
4. Basic usage: neutraler, lauffähiger Beispielcode.
5. Anatomy/Composition: nur bei Komponenten mit mehreren Teilen, Forwarded Slots oder Child-Komponenten.
6. Variants/Config: betroffene Variant-Keys, defaults, override path.
7. Tokens/Theme: semantische Nuxt UI/Tailwind Tokens, app config keys, erlaubte override points.
8. Props: generiert.
9. Emits: generiert, sobald vorhanden.
10. Slots: generiert plus Slot-Props und Fallback-Verhalten.
11. Accessibility: Rollen, Labels, Keyboard, Fokus, ARIA, Heading-Level, Consumer-Pflichten.
12. Source: GitHub/Repo-Link.
13. Related: Upstream Nuxt UI/Radix/VueUse docs, falls relevant.

Token-Dokumentation:

- `ui` definiert semantische Token-Namen, Defaults und erlaubte Override-Flächen.
- Apps wählen konkrete Brand-Farben, Fonts, Medien und produktbezogene Copy.
- Raw Tailwind-Farbklassen in reusable Komponenten sollten als Ausnahme gelten und begründet werden.
- Varianten sollten als Graph dokumentiert werden: Feature-Varianten, Collection-Varianten, Runtime Config, Defaults und Extends-Beziehungen.

Accessibility-Dokumentation:

- Nicht nur "accessible" schreiben.
- Pro interaktiver Komponente nennen:
  - Fokusreihenfolge
  - Tastaturinteraktionen
  - ARIA-Rollen/Attribute
  - erforderliche Labels
  - Screenreader-Ankündigungen
  - Consumer-Verantwortung bei Slot-Inhalten
  - bekannte Grenzen

### Wie könnte Docus trotz Nuxt-UI-Docs-Vorbild gut funktionieren?

Docus ist für `ui` passend, weil die Docs hier Product Docs, Layer-Erklärung und agentenfreundliche Dokumentation zugleich sind. Nuxt UI Docs sollte als Struktur- und Qualitätsvorbild dienen, nicht als Grund für einen Toolwechsel.

Docus-native Architektur:

- Markdown/MDC bleibt für kuratierte Nutzungserklärungen.
- Custom MDC-Komponenten ziehen Referenzdaten aus `docs/server/api/ui-reference/*`.
- `ui-reference` wird zum internen Docs API Layer.
- Docus Navigation und i18n bleiben die lesbare Schale.
- `llms.txt` und `llms-full.txt` bleiben Agenten-Kontext, aber nicht Ersatz für Source-Prüfung.
- Beispiele werden als Vue-Fixtures gespeichert und in Docs eingebettet; später können dieselben Fixtures Screenshot- oder Storybook-Input werden.

Entscheidend: Die generierten Referenzdaten müssen build- oder testbar werden. Ein Docus-Build, der stumme leere Tabellen erzeugt, ist als Qualitätsgate zu schwach.

### Was sollte in `ui` bleiben, was in App-Prototypen?

In `ui` bleiben:

- Brand-neutrale `H*` Komponenten.
- Nuxt Layer-Konfiguration.
- Content Collection Schemas und Trait-/Variant-Modell.
- Composables und Utils mit wiederverwendbarem Verhalten.
- App Config Konventionen und semantische Defaults.
- Docs-Reference-Generatoren.
- Neutrale Fixtures fuer Docs, Tests und Visual Regression.
- Package-Boundary- und Quality-Gates.

In App-Prototypen bleiben:

- Projekt- und Kundencopy.
- Finale Brand Assets.
- Projekt-Routen und konkrete Seitenarchitektur.
- Domainlogik, Auth, Deployment und Integrationen.
- Einmalige Layout-Experimente.
- Komponentenexperimente ohne zweiten Consumer oder bewusstes Foundation-Ziel.

Promotion-Regel:

Ein Prototyp wandert erst nach `ui`, wenn mindestens einer dieser Punkte erfüllt ist:

- ein zweiter Consumer braucht denselben Contract,
- die Komponente stabilisiert eine Foundation-Regel,
- die Variante/Schnittstelle ist klarer als eine App-lokale Composition,
- Test- und Docs-Fixtures können brand-neutral formuliert werden.

## Konkrete Empfehlungen

1. `ui-reference` als offizielles Docs-Subsystem behandeln.
   - Kurzer Design-Doc/ADR: Source of Truth, API-Modell, Build-Gate, Grenzen.

2. `vue-component-meta` gegen den aktuellen Parser evaluieren.
   - Ziel ist kein Rewrite um des Tools willen, sondern belastbare Props/Slots/Emits/Exposed-Metadaten fuer generische SFCs und imported types.

3. Public Component Registry erzeugen.
   - Alle `app/components/**/*.vue` -> normalisierte `H*` Namen -> erwartete Docs Page -> erwartete Beispiele -> Source Link.

4. Docs-Gate einführen.
   - Start als Report, später CI-error.
   - Prüft: fehlende Docs-Seite, fehlende Beispiel-Datei, leere API-Metadaten, fehlende Beschreibungen bei public Props/Slots.

5. Accessibility als eigener Abschnitt pro interaktiver Komponente.
   - Für nicht-interaktive Komponenten explizit kurz: Semantik, Heading/Link-Verantwortung, keine Keyboard-Interaktion.

6. Visual Regression zuerst klein halten.
   - Playwright-Screenshots gegen 2-3 Docus/Playground-Fixtures.
   - Storybook/Chromatic erst nach Spike-Entscheidung.

7. Test Scripts nicht als Big Bang einführen.
   - Erst `test:metadata` oder `check:docs-reference`.
   - Danach `test:unit` fuer composables/utils.
   - Danach `test:visual` fuer Screenshot-Fixtures.

8. Token-Dokumentation zentralisieren.
   - Eine Seite "Design Tokens and Runtime Theme" mit Nuxt UI semantic colors, Tailwind `@theme`, `app.config.ts`, `ui.*` slots/variants und App-vs-Layer-Grenzen.

9. Beispiele als wiederverwendbare Fixtures behandeln.
   - `docs/app/components/content/examples/*.vue` kann Ursprung fuer Docs, Render Tests und Visual Tests werden.

10. Keine Upstream-API duplizieren.
    - Bei Nuxt UI Wrappern: `ui` dokumentiert eigene Props, Defaults, Slots und Layer-Verhalten; Nuxt UI bleibt Referenz fuer `U*` Details.

## Offene Fragen

- Soll `vue-component-meta` canonical werden oder reicht ein gehärteter lokaler Extractor?
- Sollen Metadaten als API-JSON zur Laufzeit erzeugt, beim Build generiert oder als committed artifact versioniert werden?
- Wie hart soll das Docs-Gate starten: Warning, PR-Kommentar oder failing CI?
- Soll Storybook eingeführt werden, oder reichen Docus/Playground-Fixtures plus Playwright Screenshots?
- Braucht `ui` Chromatic, oder ist lokales/CI-Playwright für den aktuellen Teamkontext pragmatischer?
- Welche Komponenten gelten als "interactive" und bekommen verpflichtende axe/Keyboard-Abdeckung?
- Wie wird i18n in Docs-API-Descriptions gehandhabt: English canonical, German prose optional, oder zweisprachige Beschreibungen?
- Soll `ui` eine explizite Public Component Registry pflegen oder aus File-System-Konventionen ableiten?
- Welche Qualitätschecks gehören in `ui`, welche in Cora/Ecosystem-Gates?

## Experimentplan

Name: `ui-reference-quality-spike`

Hypothese: Ein kleines Docus-natives Metadata- und Fixture-Gate senkt Docs-Drift deutlich, ohne Storybook sofort einführen zu müssen.

Scope:

- Komponenten: `HArticleList` plus eine kleinere interaktive Trait-Komponente, z. B. `HCopyButton`.
- Keine App-spezifische Copy, keine Brand Assets.
- Keine globale Docs-Migration.

Phase 1: Baseline

- Aktuelle `ui-reference` Ausgabe für beide Komponenten erfassen.
- Prüfen, welche Props, Slots, Defaults und Descriptions fehlen oder falsch sind.
- Prüfen, welche Beispiele existieren und ob sie neutral/deterministisch sind.

Phase 2: Metadata Extractor Spike

- `vue-component-meta` gegen dieselben Komponenten laufen lassen.
- Ergebnis mit lokalem Parser vergleichen.
- Entscheidung dokumentieren:
  - lokaler Parser härten,
  - `vue-component-meta` übernehmen,
  - Hybrid: `vue-component-meta` fuer Komponenten, bestehende Parser fuer Varianten/Collections.

Phase 3: Docs Gate Spike

- Ein Check-Script entwerfen, das reportet:
  - public component ohne Docs Page,
  - Docs Page ohne Source Link,
  - Docs Page ohne Example,
  - public prop/slot ohne Beschreibung,
  - API-Metadaten leer, obwohl Source Props/Slots enthält.

Phase 4: Visual/A11y Fixture Spike

- Für die zwei Komponenten je eine deterministic Fixture-Matrix definieren.
- Playwright-Screenshot gegen Docus oder Playground testen.
- axe gegen die gerenderte interactive Fixture laufen lassen.
- Danach entscheiden, ob Storybook als zusätzliche Oberfläche nötig ist.

Success Metrics:

- API-Metadaten enthalten Props, Slots, Defaults und Descriptions für beide Komponenten zuverlässiger als heute.
- Fehlende Beschreibung oder fehlende Beispiel-Datei wird maschinell erkennbar.
- `pnpm docs:build` bleibt nutzbar.
- Mindestens eine dark/light und mobile/desktop Visual-Baseline ist möglich.
- Der Spike erzeugt keine app-spezifischen Inhalte in `ui`.

Validierungskandidaten:

- `pnpm prepare`
- `pnpm lint`
- `pnpm docs:build`
- `pnpm build`
- neues `check:docs-reference` oder `test:metadata`
- neues `test:visual` nur nach Spike-Entscheidung

Rollback:

- Check-Script und Spike-Fixtures entfernen.
- Bestehende Docus-Seiten und `ui-reference` Runtime unverändert lassen.

Entscheidungsoutput:

- ADR oder kurzes Proposal: "Docus-native generated reference vs Storybook as docs surface".
- Follow-up Issues:
  - Metadata Extractor
  - Docs Gate
  - A11y Section Template
  - Visual Fixture Matrix
  - Token Docs Page

## Quellen

- Nuxt UI Button Docs: https://ui.nuxt.com/docs/components/button
- Nuxt UI Card Docs: https://ui.nuxt.com/docs/components/card
- Nuxt UI Design System / Theme: https://ui.nuxt.com/docs/getting-started/theme/design-system
- shadcn/ui Button Docs: https://ui.shadcn.com/docs/components/base/button
- shadcn/ui Dialog Docs: https://ui.shadcn.com/docs/components/base/dialog
- shadcn/ui Registry Docs: https://ui.shadcn.com/docs/registry
- shadcn/ui Theming Docs: https://ui.shadcn.com/docs/theming
- Radix Accordion Docs: https://www.radix-ui.com/primitives/docs/components/accordion
- Radix Dialog Docs: https://www.radix-ui.com/primitives/docs/components/dialog
- Storybook Visual Tests: https://storybook.js.org/docs/writing-tests/visual-testing
- Storybook Accessibility Tests: https://storybook.js.org/docs/writing-tests/accessibility-testing
- Storybook Args: https://storybook.js.org/docs/writing-stories/args
- Storybook Autodocs: https://storybook.js.org/docs/writing-docs/autodocs
- VueUse Functions: https://vueuse.org/functions.html
- VueUse `useClipboard`: https://vueuse.org/core/useclipboard/
- Tailwind Theme Variables: https://tailwindcss.com/docs/theme
- Tailwind Adding Custom Styles: https://tailwindcss.com/docs/adding-custom-styles
- Nuxt Tailwind Module Options: https://tailwindcss.nuxtjs.org/getting-started/module-options/
- Nuxt Tailwind Configuration: https://tailwindcss.nuxtjs.org/tailwindcss/configuration/
- `vue-component-meta`: https://github.com/vuejs/language-tools/tree/master/packages/component-meta
- TypeDoc Overview: https://typedoc.org/documents/Overview.html
- TypeDoc Doc Comments: https://typedoc.org/documents/Doc_Comments.html
- TypeDoc Output Options: https://typedoc.org/documents/Options.Output.html
- Docus: https://docus.dev/en
