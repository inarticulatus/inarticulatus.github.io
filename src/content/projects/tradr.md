---
title: 'Tradr: Building a High-Performance Trading Terminal in Rust'
description: 'Designing a terminal trading interface with Rust and ratatui — why a TUI makes sense for real-time data, the architecture of a multi-model ensemble system, and the case for Rust in a data-intensive application'
pubDate: 'Apr 13 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - projects
    - software engineering
---

## Why a TUI for Trading

Trading terminals are typically either:
1. Bloated Electron apps that consume 2GB of RAM to show a price chart
2. Bloomberg terminals that cost $25,000/year and require dedicated hardware
3. Free alternatives that are either ugly, unreliable, or both

A terminal interface sidesteps the entire problem. TUIs are:
- Fast. Direct terminal rendering, no GPU compositing, no Electron overhead
- Lightweight. The tradr binary is under 5MB; the Python backend runs at under 200MB
- Scriptable. Everything is text. Piping data between tools is natural
- Reliable. No browser engine to crash, no GUI framework to fight

For a personal trading dashboard that doesn't need a marketing team's design opinions, a TUI is the right tool.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Tradr TUI (Rust)                        │
│  ┌─────────┐  ┌──────────────┐  ┌──────────┐  ┌────────┐ │
│  │Dashboard│  │Performance   │  │Strategy   │  │Agent   │ │
│  └─────────┘  └──────────────┘  └──────────┘  └────────┘ │
│                          ratatui                            │
└─────────────────────────────────────────────────────────────┘
                              │
                         gRPC / TCP
                              │
┌─────────────────────────────────────────────────────────────┐
│              Tradr Backend (Python)                         │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │ Market Data   │  │ Ensemble    │  │ RL Trading Agent │  │
│  │ Feed (NIFTY)  │  │ Manager     │  │                  │  │
│  └──────────────┘  └─────────────┘  └──────────────────┘  │
│                                                             │
│  LSTM │ Transformer │ XGBoost │ Prophet │ RF │ LogReg      │
└─────────────────────────────────────────────────────────────┘
```

Two components:
- **Rust TUI**: User interface, keyboard handling, real-time display
- **Python backend**: ML models, market data, trading logic

The split is deliberate. Rust is excellent at rendering text quickly and handling input responsively. Python has the ML ecosystem. gRPC bridges them.

## The Rust TUI: ratatui and crossterm

The frontend uses ratatui (formerly tui-rs), a Rust library for building terminal user interfaces. Underneath, it uses crossterm for cross-platform terminal handling — keyboard events, mouse support, alternate screen switching.

The core abstraction is the widget model:

```rust
pub struct App {
    pub active_tab: Tab,
    pub balance: f64,
    pub pnl: f64,
    pub signal: String,
    pub confidence: f64,
    pub ensemble_trained: bool,
    pub trading_active: bool,
    pub weights: HashMap<String, f64>,
    pub trade_logs: Vec<LogEntry>,
}

fn render_dashboard<B: Backend>(f: &mut Frame<B>, area: Rect, app: &App) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),  // Header
            Constraint::Min(0),      // Content
            Constraint::Length(3),  // Footer
        ])
        .split(area);
    
    render_header(f, chunks[0], app);
    render_balance_panel(f, chunks[1], app);
    render_footer(f, chunks[2]);
}
```

Every render cycle repaints the entire screen. ratatui handles double-buffering internally — the user never sees a partial frame.

## The Tab System

Keyboard navigation drives the interface:

```rust
enum Tab {
    Dashboard,
    Performance,
    Strategy,
    Agent,
}

fn next_tab(&mut self) {
    *self = match self {
        Tab::Dashboard => Tab::Performance,
        Tab::Performance => Tab::Strategy,
        Tab::Strategy => Tab::Agent,
        Tab::Agent => Tab::Dashboard,
    }
}
```

`[` and `]` cycle tabs. `T` triggers training. `Space` starts/stops trading. The keyboard handler:

```rust
match key.code {
    KeyCode::Char('[') => app.active_tab.prev(),
    KeyCode::Char(']') => app.active_tab.next(),
    KeyCode::Char('t') | KeyCode::Char('T') => app.action_train(),
    KeyCode::Char(' ') => {
        if app.trading_active { app.action_stop() }
        else { app.action_start() }
    }
    _ => {}
}
```

No mouse required. The entire interface works with seven keys.

## The Python Backend: Ensemble Trading

The backend manages six prediction models and an RL agent:

| Model | Purpose |
|-------|---------|
| LSTM | Sequential patterns in price data |
| Transformer | Long-range dependencies |
| XGBoost | Gradient boosting on features |
| Prophet | Trend and seasonality |
| RandomForest | Ensemble of decision trees |
| LogReg | Baseline linear model |

The `EnsembleManager` combines predictions using weighted voting:

```python
def predict_with_weights(self, features, sequence, weights):
    predictions = {}
    for name, model in self.models.items():
        pred = model.predict(features, sequence)
        predictions[name] = pred
    
    # Weighted voting
    weighted_score = 0.0
    for name, pred in predictions.items():
        weight = weights.get(name, 0.17)
        action_val = {"HOLD": 0, "BUY": 1, "SELL": -1}[pred.action]
        weighted_score += action_val * pred.confidence * weight
    
    return EnsemblePrediction(score=weighted_score)
```

Weights are user-adjustable via the Strategy tab. The default is uniform (0.17 each), but sector-specific models can be boosted.

## State Management

The Rust frontend maintains minimal state:

```rust
pub struct App {
    balance: f64,
    pnl: f64,
    signal: String,
    confidence: f64,
    ensemble_trained: bool,
    trading_active: bool,
    weights: HashMap<String, f64>,
    trade_logs: Vec<LogEntry>,
    system_logs: Vec<LogEntry>,
}
```

State comes from the Python backend via periodic polling (the TUI doesn't need sub-second updates for a personal dashboard). Trade logs and system logs accumulate in a scrollable pane.

## Why Rust for This

The typical objection to Rust for a data application: "Python has better ML libraries." True. Rust doesn't have scikit-learn. But Rust has two things Python doesn't:

1. **Predictable latency**. No GC pauses. No garbage collector deciding to stop-the-world at an inconvenient moment. The UI thread renders in under 1ms, every time.

2. **Minimal memory footprint**. The compiled binary is 5MB. It runs on a Raspberry Pi if you want. No Python interpreter overhead, no numpy compilation to manage.

For the rendering loop — which is the only thing Rust does — these properties matter. The ML lives in Python where the ecosystem is. Rust handles what Rust is good at: fast, reliable text rendering.

## Deployment

Docker Compose orchestrates everything:

```yaml
services:
  tradr-backend:
    build: ./backend/grpc_server
    volumes:
      - ./data:/app/data
    ports:
      - "50051:50051"
  
  tradr-tui:
    build: ./rust-tui
    stdin_open: true
    tty: true
    depends_on:
      - tradr-backend
```

The TUI container runs interactively — `stdin_open: true` and `tty: true` are required for keyboard input to reach the process.

## Key Learnings

1. **TUIs are underrated for personal tools.** If your users are developers or power users, a well-designed TUI is faster and more reliable than a web app.

2. **ratatui's widget model is clean.** The mental model of "layout → constraints → render" maps well to terminal constraints. Nested layouts compose naturally.

3. **State synchronization is the hard part.** Keeping Rust and Python state in sync (especially weights and logs) required careful protocol design. The gRPC interface has to be explicit about what moves where.

4. **Rust's async story (Tokio) is mature enough.** Even though this project uses synchronous calls to the backend, Tokio is available and handles real async use cases well.

## Tech Stack

`Rust` `ratatui` `crossterm` `Tokio` `Python` `gRPC` `scikit-learn` `XGBoost` `Docker` `Podman`
