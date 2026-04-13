---
title: 'StudyGrove: AI Study Planning with Accountability Through Gamification'
description: 'Building an AI-powered study planner with a tamagotchi-style farm game — the AI generates daily plans from your materials, the Grove dies if you skip, and verification ensures you actually learned something'
pubDate: 'Apr 13 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 
    - projects
    - AI engineering
---

## The Problem: "I Should Study"

Study apps fall into two categories:
1. **Flashcard apps** — good for memorization, bad for planning
2. **Task managers** — good for listing tasks, bad for generating them

Neither tells you what to study today. Neither adapts when you fall behind. Neither makes studying feel like anything other than a chore.

StudyGrove solves the planning problem with an AI that turns vague goals ("pass UPSC Prelims") into precise daily plans, and the motivation problem with a tamagotchi farm that dies if you skip.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Track View  │  │ Focus Mode   │  │ Grove (PixiJS)  │ │
│  └─────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                         REST API
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Backend (FastAPI)                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ AI Planner  │  │ Verification │  │ Grove Engine    │ │
│  └─────────────┘  └──────────────┘  └──────────────────┘ │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Celery      │  │ pgvector     │  │ Material Parser  │ │
│  │ (task queue)│  │ (embeddings) │  │                  │ │
│  └─────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## The AI Daily Planner

The core differentiator is plan generation. Given a track (e.g., "UPSC Prelims 2026") and uploaded materials (PDFs, notes, URLs), the AI produces:

**For each day:**
- Exact topics to cover (not "study history" but "Mughal administration — Mansabdari system")
- Suggested resources (which chapter/page/video)
- Learning objective ("by end of session, you should be able to explain the revenue system")
- Time allocation (45 min reading + 15 min self-quiz)

The planner runs as a Celery background task:

```python
async def generate_daily_plan(track_id, date, db):
    # Fetch track metadata + topic map
    track = await get_track(track_id)
    topic_map = await get_topic_map(track.id)
    
    # Get user's recent history
    history = await get_recent_completions(track_id, days=7)
    
    # Generate plan with Claude
    plan = await ai_planner.generate(
        track=track,
        topic_map=topic_map,
        user_history=history,
        target_date=date,
    )
    
    return plan
```

The prompt chain:
1. **Topic selection**: Which topics from the map are due based on pacing and priority
2. **Time allocation**: Distribute available hours across selected topics
3. **Resource mapping**: Which materials cover each topic
4. **Objective writing**: What should the user be able to do after this session

The model uses web search to look up syllabi and past papers when generating the initial topic map — it knows what's likely to be tested.

## The Grove Engine: Accountability Through Attachment

The farm is not gamification for its own sake. It's a consequence system that makes skipping feel bad.

**Core metaphor**: Each track is a crop field. Your farm has limited plots. Studying feeds your crops. Neglect causes wilting.

```
Growth Stages:
  0% → Seedling (just started)
 25% → Growing (making progress)
 60% → Flowering (on track)
 85% → Harvest Ready (almost done)
100% → Harvested (track complete)
```

The XP formula balances effort and difficulty:

```python
def calculate_xp(duration_min, difficulty, verification_status, current_streak):
    base_xp = duration_min * DIFFICULTY_MULTIPLIER[difficulty]
    v_bonus = VERIFICATION_BONUS[verification_status]
    streak_bonus = 1 + (min(current_streak, 30) * 0.02)
    
    return int(base_xp * v_bonus * streak_bonus)

DIFFICULTY_MULTIPLIER = {
    "easy": 0.8,
    "medium": 1.0,
    "hard": 1.3,
    "extreme": 1.6,
}
```

The Grove engine is pure Python — no AI needed. It receives task completion events, calculates XP, updates farm state, and checks for milestones. The state is stored in PostgreSQL and cached in Redis.

## The Verification System

XP only counts if you actually learned something. The verification system provides three tiers:

**Tier 1 — Photo proof**: Upload a photo of your notes. Claude vision confirms the content is relevant to the topic.

**Tier 2 — Quiz**: The system generates 3-5 questions on the studied topic. Pass rate determines the verification bonus.

**Tier 3 — Summary**: Write a 3-5 sentence summary. The AI grades it for accuracy and completeness against the session's learning objective.

```python
VERIFICATION_BONUS = {
    "quiz_pass": 1.3,
    "summary_pass": 1.4,
    "quiz_fail": 0.5,
    "skipped": 0.0,
    "pending": 0.7,
}
```

Failed or skipped verifications don't zero out your XP, but they significantly reduce it. The Grove takes a health hit proportional to the verification gap.

## Why This Works

**The AI solves the planning problem.** "What should I study today?" is the hardest question. Most apps make you answer it yourself. StudyGrove answers it for you.

**The Grove solves the motivation problem.** Skipping a study session has a visible consequence: your farm wilts. The attachment mechanic (you've been growing this crop for weeks) creates sunk cost that resists skipping.

**Verification solves the self-deception problem.** You can tell yourself you studied. The verification system checks.

The combination is more than the sum of parts. An AI planner without accountability tools is a to-do list. A gamified tracker without an AI planner is a scoreboard with nothing to score.

## Tech Stack

`React` `TypeScript` `Vite` `TailwindCSS` `PixiJS` `FastAPI` `Celery` `Redis` `PostgreSQL` `pgvector` `Claude API` `MinIO` `Podman` `Caddy`

## Key Learnings

1. **Gamification works when consequences are real.** A streak counter that resets is annoying. A crop that dies is sad. The emotional response has to match the consequence.

2. **AI planning requires context.** A generic LLM prompt isn't enough. The planner needs the user's topic map, recent completion history, and target date to generate useful plans.

3. **Verification needs to be frictionless.** If photo verification requires perfect lighting and a specific angle, users won't use it. The verification UI needs to be faster than the alternative (just marking done).

4. **Pure Python is sufficient for game logic.** The Grove engine has no AI. It's arithmetic on state. Using Python for this is faster to develop and easier to test than pushing it into the ML layer.

5. **Background jobs are non-negotiable for AI features.** Plan generation takes 10-30 seconds. The user can't wait for this synchronously. Celery handles the async workload while the frontend polls for completion.

## Future Directions

- **Multiplayer Grove**: Study groups where combined progress unlocks shared rewards
- **Adaptive pacing**: ML model that adjusts daily targets based on completion rate
- **Social streaks**: Accountability partners who see each other's Grove health
