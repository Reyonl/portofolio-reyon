import type { Project } from "../schema.ts";

export const warungLupiFlutter: Project = {
  slug: "warung-lupi-flutter",
  index: 3,
  title: "Warung Lupi — Android",
  tagline: "A Flutter shop-ledger app that records daily credit slips and prints receipts straight to a Bluetooth thermal printer.",
  summary:
    "Mobile transaction system for a small food shop: receipt/credit-slip records, customers and items, automatic promo rules, and real Bluetooth thermal printing — shipped as a released Android APK via CI/CD.",
  category: "Mobile Application",
  role: "Design · Implementation · Release pipeline",
  period: "2026",
  status: "shipped",
  level: "standard",
  featured: false,
  stack: ["Flutter", "Provider", "Dio", "print_bluetooth_thermal", "GitHub Actions"],
  links: {
    repo: "https://github.com/Reyonl/flutter-warungLupi-",
    repoVisibility: "public",
    release: "https://github.com/Reyonl/flutter-warungLupi-/releases/tag/v1.0.1",
  },
  evidence: [
    {
      label: "Released build",
      value: "v1.0.1 published with app-release.apk as a release asset",
      kind: "release",
      source: "GitHub Releases — tag v1.0.1 (built by the Release APK workflow on tag push)",
      url: "https://github.com/Reyonl/flutter-warungLupi-/releases/tag/v1.0.1",
    },
    {
      label: "Mobile CI/CD",
      value: "Flutter CI green on main; tag v* triggers the APK build + release",
      kind: "ci",
      source: ".github/workflows/flutter-ci.yml and release.yml (Flutter 3.47.5 pinned, matching local toolchain)",
    },
    {
      label: "Bluetooth thermal printing",
      value: "Direct printing to paired 58mm/80mm thermal printers, plus PDF/PNG export fallbacks",
      kind: "capability",
      source: "lib/services/printer_service.dart + print_bluetooth_thermal, pdf, printing packages in pubspec.yaml",
    },
    {
      label: "State & networking architecture",
      value: "Provider state tree over a Dio REST client backed by the Laravel API",
      kind: "architecture",
      source: "lib/providers, lib/core/api (repository layout documented in the repo README)",
    },
  ],

  overview:
    "Warung Lupi started as a paper problem: a small food shop tracking daily credit slips (bon) by hand. The Flutter app is the Android surface of that system — customers, items, daily slips, automatic promo pricing, history with search and date filters — and its hardest feature is the one the business actually touches every day: printing a real receipt on a Bluetooth thermal printer, from a phone, without a cloud hop. It consumes the same Laravel API as the web counterpart, is the mobile half of the Warung Lupi ecosystem, and ships through its own CI/CD: tag a release and Actions hands back an installable APK.",
  problem:
    "The shop needed three things a generic POS app couldn't give it: Indonesian-language slip records that match how the business already works (bon, lunas, hutang), promo rules that live in the product (every 3 fried snacks = Rp5.000), and a printed receipt — because the customer walks away with paper, not a screenshot. Phone-to-printer over Bluetooth is the fragile link: pairing, printer models, and paper widths all vary, and none of it can be solved by a backend.",
  constraints: [
    "Printing happens on-device over Bluetooth — no server fallback, and the printer can be unavailable mid-sale.",
    "The backend is an existing Laravel API; the mobile client had to adopt its shape rather than define it.",
    "Single developer with a working Android toolchain: build reproducibility in CI had to match local (Flutter 3.47.5 / Java 17 locked across workflows).",
    "The UI is Bahasa Indonesia with id-ID currency formatting — this is a working tool for one specific shop, not a demo.",
  ],
  architectureNodes: [
    { label: "FLUTTER APP", sublabel: "screens · Provider state" },
    { label: "SERVICES", sublabel: "printer_service · Dio API client", highlight: true },
    { label: "LARAVEL API", sublabel: "Warung Lupi backend (web ecosystem)" },
    { label: "THERMAL PRINTER", sublabel: "Bluetooth · 58/80mm" },
  ],
  challenges: [
    {
      title: "Bluetooth printing is the product",
      problem:
        "Pairing state, printer variety, and paper width all live on-device. A failed print in the middle of a sale is not a UI bug — it's the shop losing a transaction record.",
      solution:
        "A dedicated printer service wraps print_bluetooth_thermal with pair/change-printer and test-print flows in Settings, 58/80mm paper sizing, and PDF/PNG/copy fallbacks in the receipt detail screen so the slip always leaves the phone with something in hand.",
    },
    {
      title: "Release pipeline that matches the developer machine",
      problem:
        "Mobile CI goes wrong quietly: a workflow can pass while producing an APK nobody can install, or drift from the local toolchain and rebuild differently in the cloud.",
      solution:
        "Flutter and Java versions are pinned identically in flutter-ci.yml and release.yml; tagging v1.0.1 builds the APK in Actions and attaches it to the GitHub Release, so the published artifact is the CI artifact, not a hand-built file.",
    },
  ],
  testing:
    "The repository carries widget and unit test files (order flow, settings, failure/perf paths, web-parity checks against the API). CI runs analyze + test on every push to main; the release workflow rebuilds and publishes only through the same pinned toolchain. I am not quoting a test count here — the useful, checkable fact is that CI is green on main and the released APK came from that pipeline.",
  retrospective: [
    "Feature-parity mapping against the web app (docs/AUDIT.md in the repo) was the decision record that kept scope honest — the mobile client ships what the audit said, and the audit lives in the repo.",
    "Next real step is printing reliability telemetry: today a failed print is user-visible but not recorded, and for a shop ledger that's the one failure mode worth instrumenting.",
  ],
};

export const warungLupiWeb: Project = {
  slug: "warung-lupi-web",
  index: 4,
  title: "Warung Lupi — Web",
  tagline: "The Laravel web system behind the Warung Lupi ecosystem: transaction records, customers, items, and the API the Android client consumes.",
  summary:
    "Web counterpart of the Warung Lupi Flutter app — a Laravel + React order/transaction system that defines the API both surfaces share.",
  category: "Web Application · Ecosystem",
  role: "Full-stack",
  period: "2025 — 2026",
  status: "shipped",
  level: "compact",
  featured: false,
  stack: ["Laravel 13", "PHP 8.3", "MySQL", "React"],
  links: {
    repo: "https://github.com/Reyonl/rekapan_bukunota",
    repoVisibility: "public",
  },
  evidence: [
    {
      label: "Shared backend",
      value: "The Dio REST client in the Flutter app consumes this system's API — the contract between both surfaces",
      kind: "architecture",
      source: "lib/core/api in flutter-warungLupi- points at this Laravel backend (see ecosystem docs in both repos)",
    },
    {
      label: "Framework",
      value: "Laravel ^13.17 on PHP ^8.3",
      kind: "artifact",
      source: "composer.json in Reyonl/rekapan_bukunota",
    },
  ],

  overview:
    "The web half of one product: Warung Lupi began as a Laravel/React system for recording the shop's credit slips, customers, and items, and grew the Flutter Android app as a second surface over the same API. It is presented here as ecosystem, not as a second product — the interesting engineering (multi-surface consistency, API as contract) belongs to the pair, and is told in the Flutter case study.",
  challenges: [
    {
      title: "Being the source of truth for two clients",
      problem:
        "Once the mobile app exists, every web-side data-shape decision becomes an API-compatibility decision.",
      solution:
        "The JSON contract (models, fromJson/toJson on the Dart side) is kept aligned with feature-parity audits recorded in the Flutter repository (docs/AUDIT.md).",
    },
  ],
  retrospective: [
    "Repository honesty for this surface: it currently ships with no CI pipeline and only starter tests — which is exactly why it is a compact entry next to its mobile sibling, not a headline case study.",
  ],
};
