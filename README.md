# Ferdighetstrening Derivasjon

An interactive web application for practicing derivative rules in mathematics. Built for Norwegian secondary education with multilingual support.

## Features

- **Interactive Practice Arena**: Generate unlimited derivative problems with customizable difficulty levels
- **Focus Mode**: Practice specific derivative rules (Chain Rule, Product Rule, Quotient Rule)
- **Mix Mode**: Smart algorithm that adapts to your skill level and recommends appropriate tasks
- **Theory Bank**: Comprehensive explanations and formulas for derivative rules
- **Progress Analytics**: Track your performance with detailed statistics and visualizations
- **Multilingual Support**: Norwegian, English, Spanish, and Ukrainian interfaces
- **Five Difficulty Levels**: Progressive complexity from basic polynomials to advanced functions
- **Hint System**: Contextual hints with formulas and examples to guide learning
- **Dark Mode**: Full dark theme support with automatic persistence across sessions
- **Custom Favicon**: Mathematical derivative notation (f') that adapts to color scheme

## Technology Stack

- HTML5 with ES6 JavaScript modules
- Tailwind CSS for styling
- MathJax for mathematical notation
- Chart.js for analytics visualization
- LocalStorage for progress persistence

## Project Structure

```
├── index.html              # Main entry point
├── js/
│   ├── app.js              # Application initialization
│   ├── state.js            # State management
│   ├── theme.js            # Dark/light mode handling
│   ├── algorithm.js        # Smart mix algorithm
│   ├── charts.js           # Chart.js integration
│   ├── ui.js               # UI rendering functions
│   ├── i18n.js             # Translations (NO/EN/ES/UK)
│   ├── theory.js           # Theory content
│   ├── utils.js            # Helper functions
│   └── problems/
│       ├── index.js        # Problem generator coordinator
│       ├── chain.js        # Chain rule generators
│       ├── product.js      # Product rule generators
│       └── quotient.js     # Quotient rule generators
├── favicon.svg             # Adaptive favicon
└── README.md
```

## Usage

**Try it live:** [https://lektorodd.no/ki/derivasjon.html](https://lektorodd.no/ki/derivasjon.html)

To run locally, serve the files with a local web server (required for ES6 modules):
```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```

## Author

**Torodd F. Ottestad**
Website: [lektorodd.no](https://lektorodd.no)

---

## Changelog

### Version 1.2.1 (Current)

Small improvements and UI polish.

#### Changes (v1.2.1)
- **Real-time Badge Updates**: "Trenger Øving" badge now updates immediately when marking problems
- **Emoji Language Flags**: Language buttons now show country flags (🇳🇴 🇬🇧 🇪🇸 🇺🇦) instead of text codes

### Version 1.2.0

Major refactoring release - modular ES6 architecture.

#### Architecture Changes (v1.2.0)
- **Modular Codebase**: Refactored monolithic ~5200-line HTML file into 14 ES6 modules
- **Clean Separation of Concerns**: State, UI, algorithm, i18n, and problem generators in separate files
- **ES6 Import/Export**: Modern JavaScript module system for better maintainability
- **Organized Problem Generators**: Chain, product, and quotient rules in dedicated modules

### Version 1.1.0

Feature release with bug fixes and new functionality.

#### New Features (v1.1.0)
- **Basic Derivative Rules Theory**: Added comprehensive "Grunnleggende" (Basic Rules) section to Theory Bank covering power rule, exponential, logarithm, and sum/constant rules in all 4 languages
- **Nested Chain Rule Problems**: Level 5 chain rule now includes nested compositions like `ln(ln(x))` and `e^(e^x)` with detailed step-by-step solutions
- **Progressive Difficulty System**: Smart algorithm tracks mastery per topic/level and adjusts difficulty ceiling automatically
- **Marked Problems Overview**: New "Trenger Øving" (Needs Practice) view showing all marked problems grouped by topic with quick navigation

#### Bug Fixes (v1.1.0)
- **Fixed**: Root × polynomial simplification error in product rule - corrected algebra from `(2x+a)/(2√x)` to `(3x+a)/(2√x)`
- **Fixed**: Duplicate problems appearing in focus mode - added deduplication in both problem bank generation and filter application
- **Improved**: Better fraction display with `formatFraction()` helper function

### Version 1.0.2

UI/UX enhancement release with dark mode and branding improvements.

#### New Features (v1.0.2)
- **Dark Mode**: Comprehensive dark theme implementation with Tailwind CSS
  - Theme toggle button in header with sun/moon icons
  - Dark mode variants for all UI components (navbar, sidebar, cards, forms, buttons)
  - Theme preference persists across sessions using localStorage
  - Smooth color transitions between light and dark themes
- **Favicon**: Custom SVG favicon featuring derivative notation (f')
  - Adapts to system color scheme (blue in light mode, dark background in dark mode)
  - Professional branding for browser tabs and bookmarks

### Version 1.0.1

Hotfix release for smart mix task generation.

#### Bug Fixes (v1.0.1)
- **Critical**: Fixed duplicate tasks appearing in smart mix mode (prevented identical expressions like `x√x` or `e^(x+1)` from showing multiple times in the same 5-task session)

### Version 1.0.0 (Public Release)

Official launch with critical bug fixes and improvements.

#### Bug Fixes (v1.0.0)
- **Critical**: Fixed incorrect coefficient in quotient rule level 4 (linear over quadratic)
- **Critical**: Fixed mathematical error in sqrt(x)/x derivative calculation
- **Critical**: Fixed smart mix algorithm to properly boost "needs practice" tasks instead of excluding them
- **Critical**: Fixed unstable sort algorithm in problem selection
- Added error handling for localStorage to prevent crashes from corrupted data
- Internationalized all alert messages for better multi-language support
- Added "Tips/Feil?" issue reporting button to navbar for user feedback

#### UX Improvements (v1.0.0)
- **Theory Navigation**: Replaced dropdown with smooth tab-based navigation between derivative rules
- **Language Persistence**: Theory topic selection now persists when switching languages
- **Enhanced Theory Bank**: Added comprehensive "Common Mistakes" and "Alternative Methods" sections to all languages

#### Recent Updates

**Task Variety & Difficulty**
- Added varied quotient rule tasks across all difficulty levels
- Added varied product rule tasks with progressive difficulty
- Enhanced task generation for all derivative rule types

**User Interface & Translations**
- Added Spanish and Ukrainian translations for math area filters
- Fixed translation for math area filters in focus mode
- Added Ukrainian UI translations for complete language support

**Display & Formatting**
- Fixed quotient rule formatting for square root cases
- Improved quotient rule display for square root cases
- Fixed fraction display with square root in numerator

**Learning Features**
- Added triple product formula to hints for student learning
- Enhanced hint system with more detailed explanations
- Expanded theory section with detailed explanations for derivative rules

**Analytics & Progress**
- Enhanced smart mix algorithm with recommended tasks and adaptive difficulty
- Fixed analytics chart to show only attempted tasks instead of full 1200 task bank
- Fixed smart mix to exclude rated tasks and show recommended badges earlier
- Added clear progress button to analytics page

#### Core Features (v0.9.0)
- Complete implementation of three derivative rules (Chain, Product, Quotient)
- Full support for 4 languages (Norwegian, English, Spanish, Ukrainian)
- 1200+ unique practice problems across 5 difficulty levels
- Interactive theory bank with comprehensive explanations
- Progress tracking and statistics dashboard
- Smart recommendation system
- Focus mode for targeted practice
- Mix mode with adaptive difficulty

---

## Version History

| Version | Status | Description |
|---------|--------|-------------|
| 1.2.1 | Current | Real-time badge updates, emoji language flags |
| 1.2.0 | Stable | Modular ES6 architecture refactoring |
| 1.1.0 | Stable | Feature release with basic rules theory, nested chain rule, progressive difficulty |
| 1.0.2 | Stable | Dark mode and favicon implementation |
| 1.0.1 | Stable | Hotfix for duplicate task bug in smart mix |
| 1.0.0 | Stable | Official public release with critical bug fixes |
| 0.9.0 | Archived | Pre-release with all core features implemented |

## License

© 2025 Torodd F. Ottestad. All rights reserved.
