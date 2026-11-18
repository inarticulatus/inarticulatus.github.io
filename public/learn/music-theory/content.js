/* Content for this tracker. The interface is drawn by /learn/app/app.js. */
window.TRACKER = {
 "id": "music-theory",
 "storageKey": "learn_music_theory_v1",
 "start": "today",
 "meta": {
  "kicker": "Daily 30-minute habit",
  "title": "Music Theory",
  "mark": "& Ear Training",
  "sub": "From zero: reading, rhythm, scales, intervals, chords and harmony · 59 lessons and drills with spaced review",
  "overviewSub": "Stages in order, with every lesson and drill"
 },
 "labels": {
  "section": "Unit",
  "sections": "Units",
  "item": "lesson or drill",
  "items": "lessons and drills"
 },
 "looseLabel": "Method",
 "tools": {
  "timer": [
   10,
   30
  ]
 },
 "modes": {
  "review": {
   "dailyNew": 2,
   "targetMinutes": {
    "E": 10,
    "M": 10,
    "H": 10
   },
   "difficulty": {
    "E": "Lesson",
    "M": "Drill",
    "H": "Ear"
   },
   "mock": false,
   "grades": {
    "again": "Couldn't do it",
    "hard": "Shaky",
    "good": "Got it",
    "easy": "Easy"
   },
   "gradeTips": {
    "again": "You couldn't do it without looking things up",
    "hard": "Mostly right, but slow or with mistakes",
    "good": "Right and reasonably quick",
    "easy": "Right, quick and effortless"
   },
   "text": {
    "solved": "Learned",
    "dueHint": "redo these from memory before anything new",
    "note": "A tip or mnemonic in one line…",
    "first": "First time through",
    "again": "Reviewing from memory",
    "gradeHint": "Grade honestly: \"Got it\" means right and reasonably quick without looking anything up. The grade sets when this comes back."
   }
  }
 },
 "groups": [
  {
   "id": "s1",
   "label": "Stage 1",
   "sub": "Reading pitch",
   "title": "Stage 1 · Reading pitch",
   "short": "S1",
   "color": "coral"
  },
  {
   "id": "s2",
   "label": "Stage 2",
   "sub": "Rhythm and meter",
   "title": "Stage 2 · Rhythm and meter",
   "short": "S2",
   "color": "teal"
  },
  {
   "id": "s3",
   "label": "Stage 3",
   "sub": "Scales and keys",
   "title": "Stage 3 · Scales and keys",
   "short": "S3",
   "color": "gold"
  },
  {
   "id": "s4",
   "label": "Stage 4",
   "sub": "Intervals",
   "title": "Stage 4 · Intervals",
   "short": "S4",
   "color": "plum"
  },
  {
   "id": "s5",
   "label": "Stage 5",
   "sub": "Chords",
   "title": "Stage 5 · Chords",
   "short": "S5",
   "color": "coral"
  },
  {
   "id": "s6",
   "label": "Stage 6",
   "sub": "Harmony",
   "title": "Stage 6 · Harmony",
   "short": "S6",
   "color": "teal"
  },
  {
   "id": "s7",
   "label": "Next steps",
   "sub": "Further harmony",
   "title": "Next steps · Further harmony",
   "short": "Next",
   "color": "muted"
  }
 ],
 "sections": [
  {
   "id": "staff",
   "group": "s1",
   "label": "The staff and note names",
   "title": "The staff, clefs and note names",
   "sub": "3 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Music is written on a <strong>staff</strong> of five lines. A <strong>clef</strong> fixes which line is which note: treble clef for higher sounds, bass clef for lower. Notes use seven letters, A to G, then repeat. Learn the notes on a piano keyboard at the same time; it turns the abstract letters into a picture you can see.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Name any note on the treble and bass staff in a couple of seconds",
      "Find any white key on a keyboard by name",
      "Explain what a ledger line is for"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl10",
       "title": "Lesson: The staff, clefs and ledger lines",
       "href": "https://www.musictheory.net/lessons/10",
       "diff": "E"
      },
      {
       "id": "mtx-note",
       "title": "Drill: Note identification",
       "href": "https://www.musictheory.net/exercises/note",
       "diff": "M"
      },
      {
       "id": "mtx-keyboard",
       "title": "Drill: Keyboard identification",
       "href": "https://www.musictheory.net/exercises/keyboard",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "steps",
   "group": "s1",
   "label": "Steps and accidentals",
   "title": "Half steps, whole steps and accidentals",
   "sub": "2 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>The smallest distance in Western music is the <strong>half step</strong>: the next key on a piano, black or white. Two half steps make a <strong>whole step</strong>. Sharps raise a note a half step, flats lower it, and naturals cancel either. Almost everything later (scales, intervals, chords) is counted in half and whole steps.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Say whether two keys are a half step or a whole step apart",
      "Name the black keys both ways (C♯ is D♭)",
      "Read sharps, flats and naturals on the staff"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl20",
       "title": "Lesson: Steps and accidentals",
       "href": "https://www.musictheory.net/lessons/20",
       "diff": "E"
      },
      {
       "id": "mtx-keyboard-reverse",
       "title": "Drill: Keyboard, reverse (find the key for a note)",
       "href": "https://www.musictheory.net/exercises/keyboard-reverse",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "durations",
   "group": "s2",
   "label": "Note and rest lengths",
   "title": "Note lengths, rests, dots and ties",
   "sub": "3 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Rhythm is how long each sound and silence lasts. A whole note splits into two halves, four quarters, eight eighths. Every note length has a matching rest. A <strong>dot</strong> adds half the note's length again; a <strong>tie</strong> joins two notes into one longer sound. Count out loud and clap; rhythm lives in the body, not on the page.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Clap a line of quarters, eighths and halves while counting aloud",
      "Say how long a dotted half note lasts in quarter-note beats",
      "Tell a tie from a slur"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl11",
       "title": "Lesson: Note duration",
       "href": "https://www.musictheory.net/lessons/11",
       "diff": "E"
      },
      {
       "id": "mtl13",
       "title": "Lesson: Rest duration",
       "href": "https://www.musictheory.net/lessons/13",
       "diff": "E"
      },
      {
       "id": "mtl14",
       "title": "Lesson: Dots and ties",
       "href": "https://www.musictheory.net/lessons/14",
       "diff": "E"
      }
     ]
    }
   ]
  },
  {
   "id": "meter",
   "group": "s2",
   "label": "Meter and time signatures",
   "title": "Measures, time signatures and meter",
   "sub": "3 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Beats group into <strong>measures</strong>, and the <strong>time signature</strong> says how many beats each measure holds and which note gets the beat. In <strong>simple</strong> meters the beat splits in two (4/4, 3/4); in <strong>compound</strong> meters it splits in three (6/8). Practise with a metronome set slow, and tap the beat with your foot while you count.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Count 4/4, 3/4 and 6/8 out loud with a metronome",
      "Say whether a time signature is simple or compound",
      "Spot where the bar lines must go in a short rhythm"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl12",
       "title": "Lesson: Measures and time signature",
       "href": "https://www.musictheory.net/lessons/12",
       "diff": "E"
      },
      {
       "id": "mtl15",
       "title": "Lesson: Simple and compound meter",
       "href": "https://www.musictheory.net/lessons/15",
       "diff": "E"
      },
      {
       "id": "mtl16",
       "title": "Lesson: Odd meter",
       "href": "https://www.musictheory.net/lessons/16",
       "diff": "E"
      }
     ]
    }
   ]
  },
  {
   "id": "major",
   "group": "s3",
   "label": "The major scale",
   "title": "The major scale",
   "sub": "4 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>A <strong>major scale</strong> is eight notes following one pattern of steps: whole, whole, half, whole, whole, whole, half. Start that pattern on any note and you get that note's major scale. It is the reference point for almost everything else in tonal music, so build it on every starting note until it is automatic.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Recite the whole/half step pattern",
      "Build C, G, D and F major from memory",
      "Hear the difference between a major scale and one with a wrong note"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl21",
       "title": "Lesson: The major scale",
       "href": "https://www.musictheory.net/lessons/21",
       "diff": "E"
      },
      {
       "id": "mtx-scale",
       "title": "Drill: Scale identification",
       "href": "https://www.musictheory.net/exercises/scale",
       "diff": "M"
      },
      {
       "id": "mtx-scale-construction",
       "title": "Drill: Scale construction",
       "href": "https://www.musictheory.net/exercises/scale-construction",
       "diff": "M"
      },
      {
       "id": "te-scales",
       "title": "Ear: Scale identification",
       "href": "https://tonedear.com/ear-training/scale-identification",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "minor",
   "group": "s3",
   "label": "Minor scales and degrees",
   "title": "Minor scales and scale degrees",
   "sub": "3 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>The <strong>natural minor</strong> scale uses the pattern whole, half, whole, whole, half, whole, whole. Raising its seventh note gives the <strong>harmonic minor</strong>; raising the sixth and seventh on the way up gives the <strong>melodic minor</strong>. Each note of a scale also has a name and number (tonic, supertonic, … leading tone) that lets you talk about its job in any key.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Build A natural, harmonic and melodic minor",
      "Name scale degrees 1 to 7 by their names",
      "Sing or hear where the tonic is in a short melody"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl22",
       "title": "Lesson: The minor scales",
       "href": "https://www.musictheory.net/lessons/22",
       "diff": "E"
      },
      {
       "id": "mtl23",
       "title": "Lesson: Scale degrees",
       "href": "https://www.musictheory.net/lessons/23",
       "diff": "E"
      },
      {
       "id": "te-degrees",
       "title": "Ear: Functional scale degrees (solfège)",
       "href": "https://tonedear.com/ear-training/functional-solfege-scale-degrees",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "keys",
   "group": "s3",
   "label": "Key signatures",
   "title": "Key signatures",
   "sub": "4 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>A <strong>key signature</strong> lists the sharps or flats a piece uses, so you don't have to write them on every note. Sharps and flats always appear in a fixed order. The <strong>circle of fifths</strong> arranges keys by how many sharps or flats they have; learning it makes keys feel like a map rather than a list.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Name the major and minor key for any signature up to four sharps or flats",
      "Write the order of sharps and of flats",
      "Find a key's relative minor"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl24",
       "title": "Lesson: Key signatures",
       "href": "https://www.musictheory.net/lessons/24",
       "diff": "E"
      },
      {
       "id": "mtl25",
       "title": "Lesson: Key signature calculation",
       "href": "https://www.musictheory.net/lessons/25",
       "diff": "E"
      },
      {
       "id": "mtx-keysig",
       "title": "Drill: Key signature identification",
       "href": "https://www.musictheory.net/exercises/keysig",
       "diff": "M"
      },
      {
       "id": "mtx-keysig-construction",
       "title": "Drill: Key signature construction",
       "href": "https://www.musictheory.net/exercises/keysig-construction",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "intervals",
   "group": "s4",
   "label": "Measuring intervals",
   "title": "Intervals on paper",
   "sub": "6 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>An <strong>interval</strong> is the distance between two notes. Count letter names to get its number (a third, a fifth), then count half steps to get its quality (major, minor, perfect, augmented, diminished). <strong>Inverting</strong> an interval flips it upside down; the numbers always add up to nine.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Name any interval within an octave by number and quality",
      "Build an interval above a given note",
      "Invert an interval and name the result"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl30",
       "title": "Lesson: Generic intervals",
       "href": "https://www.musictheory.net/lessons/30",
       "diff": "E"
      },
      {
       "id": "mtl31",
       "title": "Lesson: Specific intervals",
       "href": "https://www.musictheory.net/lessons/31",
       "diff": "E"
      },
      {
       "id": "mtl32",
       "title": "Lesson: Writing intervals",
       "href": "https://www.musictheory.net/lessons/32",
       "diff": "E"
      },
      {
       "id": "mtl33",
       "title": "Lesson: Interval inversion",
       "href": "https://www.musictheory.net/lessons/33",
       "diff": "E"
      },
      {
       "id": "mtx-interval",
       "title": "Drill: Interval identification",
       "href": "https://www.musictheory.net/exercises/interval",
       "diff": "M"
      },
      {
       "id": "mtx-interval-construction",
       "title": "Drill: Interval construction",
       "href": "https://www.musictheory.net/exercises/interval-construction",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "ear-intervals",
   "group": "s4",
   "label": "Hearing intervals",
   "title": "Hearing intervals",
   "sub": "3 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Ear training is a separate skill from reading, and it improves only with short, frequent practice. Start with just two or three intervals that sound very different (a major third, a perfect fifth, an octave), and add one only when you are mostly right. Many people anchor each interval to the opening of a song they know well.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Tell a major third, perfect fifth and octave apart by ear",
      "Add a new interval after a week of mostly correct answers",
      "Hum an interval up from a given note"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtx-ear-interval",
       "title": "Drill: Interval ear training",
       "href": "https://www.musictheory.net/exercises/ear-interval",
       "diff": "M"
      },
      {
       "id": "te-intervals",
       "title": "Ear: Interval identification",
       "href": "https://tonedear.com/ear-training/intervals",
       "diff": "H"
      },
      {
       "id": "te-intervals-context",
       "title": "Ear: Intervals in solfège context",
       "href": "https://tonedear.com/ear-training/intervals-in-solfege-context",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "triads",
   "group": "s5",
   "label": "Triads and inversions",
   "title": "Triads and inversions",
   "sub": "4 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>A <strong>triad</strong> stacks two thirds: a root, a third and a fifth. Which thirds you stack gives the four types: major, minor, diminished and augmented. An <strong>inversion</strong> moves a note other than the root to the bottom; the chord keeps its name, but its sound and role change.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Build and name the four triad types on any root",
      "Say which inversion a triad is in",
      "Hear major versus minor triads"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl40",
       "title": "Lesson: Introduction to chords",
       "href": "https://www.musictheory.net/lessons/40",
       "diff": "E"
      },
      {
       "id": "mtl42",
       "title": "Lesson: Triad inversion",
       "href": "https://www.musictheory.net/lessons/42",
       "diff": "E"
      },
      {
       "id": "mtx-chord",
       "title": "Drill: Chord identification",
       "href": "https://www.musictheory.net/exercises/chord",
       "diff": "M"
      },
      {
       "id": "mtx-chord-construction",
       "title": "Drill: Chord construction",
       "href": "https://www.musictheory.net/exercises/chord-construction",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "sevenths",
   "group": "s5",
   "label": "Seventh chords",
   "title": "Seventh chords",
   "sub": "3 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Add one more third on top of a triad and you get a <strong>seventh chord</strong>. The common types are major seventh, dominant seventh, minor seventh, half-diminished and fully diminished. The dominant seventh is the one to know first: it creates the strongest pull back home.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Build the five common seventh chords on any root",
      "Name a seventh chord's inversion",
      "Pick out a dominant seventh by ear"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl45",
       "title": "Lesson: Seventh chords",
       "href": "https://www.musictheory.net/lessons/45",
       "diff": "E"
      },
      {
       "id": "mtl48",
       "title": "Lesson: More seventh chords",
       "href": "https://www.musictheory.net/lessons/48",
       "diff": "E"
      },
      {
       "id": "mtl47",
       "title": "Lesson: Seventh chord inversion",
       "href": "https://www.musictheory.net/lessons/47",
       "diff": "E"
      }
     ]
    }
   ]
  },
  {
   "id": "ear-chords",
   "group": "s5",
   "label": "Hearing chords",
   "title": "Hearing chords",
   "sub": "2 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Chord quality has a colour you can learn to hear: major sounds bright and settled, minor darker, diminished tense, augmented unsettled. As with intervals, begin with the two easiest to tell apart and widen the set slowly.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Tell major from minor triads almost every time",
      "Add diminished and augmented once major and minor are solid",
      "Describe what you hear before naming it"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtx-ear-chord",
       "title": "Drill: Chord ear training",
       "href": "https://www.musictheory.net/exercises/ear-chord",
       "diff": "M"
      },
      {
       "id": "te-chords",
       "title": "Ear: Chord identification",
       "href": "https://tonedear.com/ear-training/chord-identification",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "diatonic",
   "group": "s6",
   "label": "Chords in a key",
   "title": "Diatonic chords and Roman numerals",
   "sub": "4 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Build a triad on each note of a scale and you get the key's <strong>diatonic chords</strong>. <strong>Roman numerals</strong> name them by scale degree (I, ii, iii, IV, V, vi, vii°), with upper case for major and lower case for minor. This lets you describe a progression in any key at once.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "List the seven chords of any major key with Roman numerals",
      "Analyse a short progression in Roman numerals",
      "Explain why V and vii° both lead to I"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl43",
       "title": "Lesson: Diatonic triads",
       "href": "https://www.musictheory.net/lessons/43",
       "diff": "E"
      },
      {
       "id": "mtl44",
       "title": "Lesson: Roman numeral analysis: triads",
       "href": "https://www.musictheory.net/lessons/44",
       "diff": "E"
      },
      {
       "id": "mtl46",
       "title": "Lesson: Diatonic seventh chords",
       "href": "https://www.musictheory.net/lessons/46",
       "diff": "E"
      },
      {
       "id": "mtl49",
       "title": "Lesson: Roman numeral analysis: seventh chords",
       "href": "https://www.musictheory.net/lessons/49",
       "diff": "E"
      }
     ]
    }
   ]
  },
  {
   "id": "progressions",
   "group": "s6",
   "label": "Progressions and cadences",
   "title": "Chord progressions and cadences",
   "sub": "4 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Chords follow each other in recognisable patterns. Roots often move by fifths (the <strong>circle progression</strong>), and phrases end with <strong>cadences</strong>, the musical equivalent of punctuation: authentic cadences close firmly, half cadences pause, deceptive ones surprise.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Name the main cadence types and hear an authentic cadence",
      "Explain why progressions tend to move toward V and then I",
      "Recognise a I–IV–V–I progression by ear"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl55",
       "title": "Lesson: Phrases and cadences",
       "href": "https://www.musictheory.net/lessons/55",
       "diff": "E"
      },
      {
       "id": "mtl56",
       "title": "Lesson: Circle progressions",
       "href": "https://www.musictheory.net/lessons/56",
       "diff": "E"
      },
      {
       "id": "mtl57",
       "title": "Lesson: Common chord progressions",
       "href": "https://www.musictheory.net/lessons/57",
       "diff": "E"
      },
      {
       "id": "te-progressions",
       "title": "Ear: Chord progressions",
       "href": "https://tonedear.com/ear-training/chord-progressions",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "voicing",
   "group": "s6",
   "label": "Voicing and melody",
   "title": "Voicing, minor-key harmony and non-chord tones",
   "sub": "6 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>How the notes of a chord are spread between voices changes its sound; good <strong>voice leading</strong> moves each voice as little as possible. Melodies also use notes outside the chord (<strong>non-harmonic tones</strong>) such as passing and neighbour tones. Watch the two worked analyses to see everything so far in real pieces.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Voice a chord in four parts without doubling the leading tone",
      "Name passing and neighbour tones in a melody",
      "Follow a full harmonic analysis of a short piece"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl51",
       "title": "Lesson: Voicing chords",
       "href": "https://www.musictheory.net/lessons/51",
       "diff": "E"
      },
      {
       "id": "mtl50",
       "title": "Lesson: Composing with minor scales",
       "href": "https://www.musictheory.net/lessons/50",
       "diff": "E"
      },
      {
       "id": "mtl53",
       "title": "Lesson: Nonharmonic tones",
       "href": "https://www.musictheory.net/lessons/53",
       "diff": "E"
      },
      {
       "id": "mtl52",
       "title": "Lesson: Analysis: O Canada",
       "href": "https://www.musictheory.net/lessons/52",
       "diff": "E"
      },
      {
       "id": "mtl62",
       "title": "Lesson: Analysis: Auld Lang Syne",
       "href": "https://www.musictheory.net/lessons/62",
       "diff": "E"
      },
      {
       "id": "te-dictation",
       "title": "Ear: Melodic dictation",
       "href": "https://tonedear.com/ear-training/melodic-dictation-practice",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "next",
   "group": "s7",
   "label": "Further harmony",
   "title": "Inversions in use and Neapolitan chords",
   "sub": "5 lessons and drills",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Once the basics are solid, these lessons show how inverted triads behave in real progressions and introduce a first chromatic chord, the Neapolitan, ending with an analysis of Beethoven's <em>Moonlight Sonata</em>. From here, a full textbook such as <em>Open Music Theory</em> takes you further.</p>"
    },
    {
     "type": "list",
     "title": "You've got it when you can",
     "items": [
      "Explain the usual job of a first-inversion and a second-inversion triad",
      "Build a Neapolitan chord in a minor key",
      "Follow the Moonlight Sonata analysis"
     ]
    },
    {
     "type": "problems",
     "title": "Lessons and drills",
     "hint": "Start opens the page and times you; grade yourself when done",
     "items": [
      {
       "id": "mtl60",
       "title": "Lesson: Triads in first inversion",
       "href": "https://www.musictheory.net/lessons/60",
       "diff": "E"
      },
      {
       "id": "mtl61",
       "title": "Lesson: Triads in second inversion",
       "href": "https://www.musictheory.net/lessons/61",
       "diff": "E"
      },
      {
       "id": "mtl120",
       "title": "Lesson: Building Neapolitan chords",
       "href": "https://www.musictheory.net/lessons/120",
       "diff": "E"
      },
      {
       "id": "mtl121",
       "title": "Lesson: Using Neapolitan chords",
       "href": "https://www.musictheory.net/lessons/121",
       "diff": "E"
      },
      {
       "id": "mtl122",
       "title": "Lesson: Analysis: Moonlight Sonata",
       "href": "https://www.musictheory.net/lessons/122",
       "diff": "E"
      }
     ]
    }
   ]
  },
  {
   "id": "method",
   "label": "How to practise",
   "title": "How to practise in 30 minutes a day",
   "sub": "The daily routine and why it works",
   "blocks": [
    {
     "type": "table",
     "title": "A 30-minute day",
     "head": [
      "Minutes",
      "What to do"
     ],
     "rows": [
      [
       "0–10",
       "Clear what's due under <a href=\"#today\">Today</a>. Redo each drill and grade it honestly."
      ],
      [
       "10–20",
       "One new lesson or drill. Read the lesson, then do its drill straight away."
      ],
      [
       "20–30",
       "Ear training. Short sets, stop while you are still mostly right."
      ]
     ]
    },
    {
     "type": "text",
     "title": "Why it's built this way",
     "html": "<p><strong>Little and often beats long and rare.</strong> Spreading practice over days and testing yourself, rather than rereading, are two of the most reliable findings about learning. Every lesson and drill here comes back for review: after a day, then three, then at growing gaps as you keep getting it right.</p><p><strong>Grade honestly.</strong> <em>Couldn't do it</em> and <em>Shaky</em> bring an item back tomorrow; only <em>Got it</em> lets the gap grow. An item is <em>mastered</em> after three good reviews with the gap at two weeks or more.</p><p><strong>Ear training is its own skill.</strong> Reading intervals and hearing them improve separately, so the ear drills sit alongside each topic rather than at the end. Mix them in every day.</p><p><strong>Say it, play it, hear it.</strong> Wherever you can, say note names aloud, find them on a keyboard (a free piano app is enough) and listen. Three senses beat one.</p>"
    },
    {
     "type": "resources",
     "title": "Free references",
     "counts": false,
     "items": [
      {
       "id": "ref-mtnet",
       "title": "musictheory.net lessons and exercises",
       "href": "https://www.musictheory.net/",
       "kind": "interactive",
       "note": "Every lesson and drill linked in this tracker."
      },
      {
       "id": "ref-tonedear",
       "title": "TonedEar ear training",
       "href": "https://tonedear.com/",
       "kind": "interactive",
       "note": "Free ear-training exercises; read its practice tips first."
      },
      {
       "id": "ref-tonedear-tips",
       "title": "TonedEar: how to practise ear training",
       "href": "https://tonedear.com/ear-training/how-to-practice",
       "kind": "doc",
       "note": "Short guide to structuring ear-training sessions."
      },
      {
       "id": "ref-omt",
       "title": "Open Music Theory (Version 2)",
       "href": "https://viva.pressbooks.pub/openmusictheory/",
       "kind": "book",
       "note": "Free open textbook covering fundamentals through 20th-century techniques, with worksheets."
      },
      {
       "id": "ref-edinburgh",
       "title": "Fundamentals of Music Theory (University of Edinburgh)",
       "href": "https://open.ed.ac.uk/fundamentals-of-music-theory-open-textbook/",
       "kind": "book",
       "note": "Free open textbook built from the Coursera course: pitch, scales, intervals, rhythm and metre."
      },
      {
       "id": "ref-teoria",
       "title": "teoria.com exercises",
       "href": "https://www.teoria.com/en/exercises/",
       "kind": "interactive",
       "note": "More reading and ear-training drills once these feel easy."
      }
     ]
    }
   ]
  }
 ]
};
