# CLAUDE.md - AI Assistant Guidelines for Playground Repository

This file provides context and guidelines for AI assistants (like Claude) working with this repository.

## Repository Overview

**Repository Name:** Playground
**Purpose:** A sandbox environment for experimentation, learning, prototyping, and testing various code concepts.

This repository serves as a flexible workspace where developers can:
- Experiment with new technologies and frameworks
- Create proof-of-concept implementations
- Test code snippets and algorithms
- Learn new programming languages or paradigms
- Prototype features before integrating into production codebases

## Repository Structure

```
Playground/
├── CLAUDE.md          # AI assistant guidelines (this file)
└── .git/              # Git version control
```

*Note: This is a fresh repository. Structure will evolve as projects are added.*

### Recommended Directory Organization

When adding content to this repository, follow these conventions:

```
Playground/
├── CLAUDE.md
├── experiments/       # Short-lived experimental code
├── prototypes/        # Feature prototypes and POCs
├── learning/          # Tutorial code and learning exercises
├── scripts/           # Utility scripts
├── sandbox/           # Temporary scratch space
└── docs/              # Documentation for experiments
```

## Development Workflow

### Git Conventions

1. **Branch Naming:**
   - Feature branches: `feature/<description>`
   - Experiments: `experiment/<description>`
   - Learning exercises: `learning/<topic>`
   - Claude-generated: `claude/<description>-<session-id>`

2. **Commit Messages:**
   - Use clear, descriptive commit messages
   - Format: `<type>: <description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `experiment`
   - Example: `experiment: add binary search tree implementation`

3. **Pushing Changes:**
   - Always use: `git push -u origin <branch-name>`
   - Retry with exponential backoff on network failures (2s, 4s, 8s, 16s)

### Code Organization

- Each experiment or prototype should be self-contained in its own directory
- Include a README.md in subdirectories explaining the purpose of the code
- Clean up temporary files before committing

## Key Conventions for AI Assistants

### When Working in This Repository

1. **Exploratory Nature:** This is a playground - experimentation is encouraged, but maintain code quality
2. **Documentation:** Add inline comments explaining experimental approaches
3. **Self-Contained:** Each experiment should be runnable independently when possible
4. **No Secrets:** Never commit API keys, passwords, or sensitive data

### Code Quality Standards

Even in a playground environment, maintain these standards:
- Write readable, well-formatted code
- Include basic error handling
- Add comments for complex logic
- Use meaningful variable and function names

### File Naming Conventions

- Use lowercase with hyphens for files: `my-experiment.py`
- Use lowercase with underscores for Python modules: `my_module.py`
- Prefix temporary files with `tmp_` or place in a `tmp/` directory

## Language-Specific Guidelines

### Python
- Use Python 3.8+ syntax
- Follow PEP 8 style guidelines
- Include `requirements.txt` for dependencies

### JavaScript/TypeScript
- Use ES6+ syntax
- Include `package.json` for Node.js projects
- Prefer TypeScript for complex projects

### Shell Scripts
- Start with appropriate shebang: `#!/bin/bash` or `#!/usr/bin/env bash`
- Make scripts executable with `chmod +x`
- Include usage documentation in comments

## Common Tasks

### Creating a New Experiment

```bash
# Create experiment directory
mkdir -p experiments/<experiment-name>
cd experiments/<experiment-name>

# Initialize with README
echo "# <Experiment Name>" > README.md
echo "Description of the experiment..." >> README.md
```

### Running Tests (if applicable)

```bash
# Python
python -m pytest <path-to-tests>

# JavaScript/Node
npm test

# Or use language-specific test runners
```

## Environment Setup

### Prerequisites
- Git installed and configured
- Appropriate language runtimes as needed (Python, Node.js, etc.)
- Text editor or IDE

### Initial Setup
```bash
git clone <repository-url>
cd Playground
```

## Notes for Claude

When assisting with this repository:

1. **Ask for context:** Since this is a playground, clarify what the user wants to experiment with
2. **Suggest structure:** Help organize experiments in a clean, maintainable way
3. **Be experimental:** This is a safe space to try new approaches
4. **Document learnings:** Help capture insights from experiments
5. **Keep it clean:** Remind users to clean up old experiments periodically

## Changelog

- **2026-01-25:** Initial CLAUDE.md created for empty Playground repository
