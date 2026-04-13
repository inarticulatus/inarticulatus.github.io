---
title: 'PyResume: The Data-Model-Separation Pattern for Document Generation'
description: 'Building a YAML-driven resume generator with Jinja2 templating and Tectonic LaTeX — and why separating content from presentation is the most maintainable approach to any document pipeline'
pubDate: 'Apr 13 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - projects
    - software engineering
---

## The Problem with Resume Management

Resumes are a category of document that has a short shelf life and needs multiple variants. You update them constantly. You need different section orders for different roles. And every time you want to change the formatting — the spacing, the font, the layout — you're manually editing something you spent time crafting.

The naive approach is editing a Word document or Google Doc directly. The right approach is separating what you say from how it looks.

PyResume is a tool I built around this principle: define your resume content in YAML, use a template to transform it into a beautifully typeset PDF, and never touch the formatting directly again.

## The Architecture

```
resume.yaml (content)
       ↓
generate_resume.py (Jinja2)
       ↓
awesome-cv.tex (template)
       ↓
Tectonic (LaTeX engine)
       ↓
resume.pdf (output)
```

Three components:
- **Data layer**: YAML files containing resume content
- **Template layer**: LaTeX template with Jinja2 syntax
- **Render layer**: Python script that loads YAML, renders template, compiles PDF

## Data Layer: YAML as the Single Source of Truth

The resume is broken into modular YAML files:

```yaml
# personal.yaml
first_name: Utkarsh
last_name: Sharma
position: "Software Engineer"
email: "utkarsh@example.com"
github: "inarticulatus"

# experience.yaml
- company: Acme Corp
  position: Senior Engineer
  dates: Jan 2023 - Present
  details:
    - Led development of microservices, improving latency by 40%
    - Built CI/CD pipeline serving 50+ developers

# skills.yaml
- category: Languages
  items: [Python, Go, Rust, SQL]
```

This structure has three advantages over a single monolithic YAML file:

1. **Version control works cleanly.** Each section changes independently. The git diff for `skills.yaml` actually tells you what changed.

2. **Conditional inclusion is trivial.** Want to hide your research section for a software engineering role? Remove it from `config.yaml`'s `section_order` list. The template only renders what's in the list.

3. **Section ownership is clear.** `experience.yaml` is experience. When you're updating your job history, you update exactly one file.

## Template Layer: Jinja2 + LaTeX

The template uses Jinja2 — a Python templating engine — with custom delimiters that avoid conflict with LaTeX:

```latex
\BLOCK{for entry in experience}
  \cvsection{Experience}
  \cventry
    {\VAR{entry.dates}}
    {\VAR{entry.position}}
    {\VAR{entry.company}}
    {}
    {}
    {\BLOCK{for detail in entry.details}\VAR{detail}\BLOCK{if not loop.last}\\\\
    \BLOCK{endif}\BLOCK{for endfor}}
\BLOCK{endfor}
```

The Python script configures Jinja2 with LaTeX-safe delimiters:
- `\BLOCK{...}` instead of `{% ... %}`
- `\VAR{...}` instead of `{{ ... }}`

This sidesteps the fundamental conflict between Jinja2's `{{` and LaTeX's `[` — a problem that breaks naive attempts to combine the two.

The template also handles Markdown-style inline formatting in YAML content. Bullets become `\\\\` (LaTeX line breaks). Bold becomes `\textbf{}`. Code snippets become `\texttt{}`. The conversion happens in the Python layer before template rendering.

## Why LaTeX, Why Tectonic

LaTeX produces documents with typographic quality that Word cannot match. The line spacing, the hyphenation, the handling of widows and orphans — these are solved problems in LaTeX, and the output reflects centuries of typographic knowledge encoded into document classes.

The traditional objection to LaTeX is the toolchain: MikTeX, TeX Live, package management, format files. Tectonic eliminates this entirely. It's a standalone LaTeX engine that:
- Downloads only the packages you actually use
- Runs without installation on any platform
- Handles everything in a single binary

```bash
tectonic resume.tex
```

That's the entire compilation step. No package manager, no format files, no PATH configuration. For a tool that generates one PDF, this is the right tradeoff.

## Rendering Pipeline

The Python script handles four concerns:

1. **Loading**: Recursively reads all YAML files in the data directory
2. **Escaping**: Converts Markdown formatting to LaTeX commands, then escapes special characters
3. **Rendering**: Applies Jinja2 template with the data context
4. **Compiling**: Runs Tectonic to produce the final PDF

```python
def _escape_data(self, data):
    if isinstance(data, dict):
        return {k: self._escape_data(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [self._escape_data(item) for item in data]
    elif isinstance(data, str):
        text = self.convert_markdown_to_latex(data)
        return self.escape_latex(text, preserve_commands=True)
    return data
```

The recursive structure handles nested YAML — lists of job entries with nested bullet points, for example — without special-casing each level.

## What This Pattern Generalizes To

PyResume is a specific instance of a pattern that applies broadly: **data-driven document generation**.

Any document that:
- Has stable content structure
- Needs multiple output formats or variants
- Will be regenerated when data changes

...is a candidate for this pattern. Contracts, reports, invoices, certificates, syllabus documents — all follow the same structure: raw data → transformation → formatted output.

The key insight is that YAML is a reasonable human-editable format for structured data, but it doesn't have to be. The pattern works equally well with JSON, TOML, or a database query. The template doesn't care where the data comes from.

## Key Learnings

1. **Delimiters matter when combining template engines.** Jinja2 and LaTeX both use curly braces. Custom delimiters are not optional — they're the difference between working and silently broken output.

2. **Single-file YAML is harder to version.** When your entire resume is one YAML file, every update shows as "resume.yaml changed." When it's six files, the diff is actually meaningful.

3. **LaTeX is worth the learning curve for print output.** For screen-only documents, HTML/CSS is simpler. For anything that gets printed or PDF-distributed, LaTeX's typesetting is in a different class.

4. **Tectonic removes the last barrier to LaTeX adoption.** The package management problem was real. Tectonic solves it. There's no excuse not to use LaTeX for serious document generation now.

## Tech Stack

`Python` `YAML` `Jinja2` `LaTeX` `Tectonic` `Awesome-CV`
