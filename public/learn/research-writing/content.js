/* Content for this tracker. The interface is drawn by /learn/app/app.js. */
window.TRACKER = {
 "id": "research-writing",
 "storageKey": "learn_research_writing_v1",
 "meta": {
  "kicker": "Daily 30-minute habit",
  "title": "Research",
  "mark": "Writing",
  "sub": "Writing research papers people can follow, from sentences to reviewer responses · 32 sessions of 30 minutes",
  "overviewSub": "Four parts, one 30-minute session a day"
 },
 "labels": {
  "section": "Topic",
  "sections": "Topics",
  "item": "session",
  "items": "sessions"
 },
 "looseLabel": "Method",
 "tools": {
  "timer": [
   30
  ]
 },
 "groups": [
  {
   "id": "g1",
   "label": "Sentences",
   "sub": "Clarity at the sentence level",
   "title": "Part 1 · Clear sentences",
   "short": "Part 1",
   "color": "coral"
  },
  {
   "id": "g2",
   "label": "Structure",
   "sub": "From message to discussion",
   "title": "Part 2 · The paper as an argument",
   "short": "Part 2",
   "color": "teal"
  },
  {
   "id": "g3",
   "label": "Figures",
   "sub": "Showing the evidence",
   "title": "Part 3 · Figures",
   "short": "Part 3",
   "color": "gold"
  },
  {
   "id": "g4",
   "label": "Revise and publish",
   "sub": "Feedback, submission, reviews",
   "title": "Part 4 · Revising and publishing",
   "short": "Part 4",
   "color": "plum"
  }
 ],
 "sections": [
  {
   "id": "expectations",
   "group": "g1",
   "label": "Reader expectations",
   "title": "Write where the reader is looking",
   "sub": "4 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Readers expect certain information in certain places. The start of a sentence (its <strong>topic position</strong>) tells them whose story it is and links back to what they already know. The end (its <strong>stress position</strong>) is where they look for what's new and important. Keep the subject close to its verb, and put the action in the verb rather than burying it in a noun.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "expectations-1",
       "tag": "Session 1",
       "text": "Read Gopen and Swan, The Science of Scientific Writing, start to finish."
      },
      {
       "id": "expectations-2",
       "tag": "Session 2",
       "text": "Take one dense paragraph from a paper in your field. Mark each sentence's topic position and stress position."
      },
      {
       "id": "expectations-3",
       "tag": "Session 3",
       "text": "Rewrite that paragraph so known information comes first and the new, important point lands at the end of each sentence."
      },
      {
       "id": "expectations-4",
       "tag": "Session 4",
       "text": "Find five sentences in your own writing where the subject and verb are far apart. Bring them together."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "expectations-r-gopen",
       "ref": "gopen",
       "note": "The source of these principles. Read it once now and again in a month."
      }
     ]
    },
    {
     "type": "note",
     "id": "expectations-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Before and after versions of the paragraphs you rewrite…",
     "rows": 6
    }
   ]
  },
  {
   "id": "concise",
   "group": "g1",
   "label": "Concise sentences",
   "title": "Short, precise, active sentences",
   "sub": "4 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Most first drafts carry words that do no work. Prefer the active voice when the actor matters, one idea per sentence, specific words over vague ones, and lists or tables when the reader needs to compare. Define each term once and then use it consistently; in research writing, switching synonyms suggests a change of meaning.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "concise-1",
       "tag": "Session 1",
       "text": "Google Technical Writing One: the units on words, active voice and clear sentences."
      },
      {
       "id": "concise-2",
       "tag": "Session 2",
       "text": "Google Technical Writing One: the units on short sentences, lists and tables, and paragraphs."
      },
      {
       "id": "concise-3",
       "tag": "Session 3",
       "text": "Read Orwell's Politics and the English Language and copy out his six rules."
      },
      {
       "id": "concise-4",
       "tag": "Session 4",
       "text": "Cut a 300-word passage of your own by a third without losing any content."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "concise-r-tw1",
       "ref": "tw1",
       "note": "Free, self-paced and short. Do the exercises, not just the reading."
      },
      {
       "id": "concise-r-orwell",
       "ref": "orwell",
       "note": "The classic essay on vague, padded prose; the six rules are near the end."
      }
     ]
    },
    {
     "type": "note",
     "id": "concise-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Word counts before and after, and the cuts you made…",
     "rows": 6
    }
   ]
  },
  {
   "id": "message",
   "group": "g2",
   "label": "One clear message",
   "title": "One message, told as a story",
   "sub": "4 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>A paper that makes one clear point is remembered; a paper that makes five is not. Decide the single message first and test every section against it. Then tell it as a story: the problem, why it matters, your key idea, the evidence, and what changes as a result. Write early; drafting is how you find out what your argument is.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "message-1",
       "tag": "Session 1",
       "text": "Read Mensh and Kording, rules 1 to 4 (the principles that apply to the whole paper)."
      },
      {
       "id": "message-2",
       "tag": "Session 2",
       "text": "Watch or read Simon Peyton Jones, How to write a great research paper."
      },
      {
       "id": "message-3",
       "tag": "Session 3",
       "text": "Write your paper's message in one sentence. Then write a title that states it."
      },
      {
       "id": "message-4",
       "tag": "Session 4",
       "text": "Outline your paper as a story in five lines: problem, why it matters, idea, evidence, so what."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "message-r-mensh",
       "ref": "mensh",
       "note": "Focus on rules 1–4 here; later sessions use the rest."
      },
      {
       "id": "message-r-spj",
       "ref": "spj",
       "note": "Seven practical guidelines, from writing early to listening to readers."
      }
     ]
    },
    {
     "type": "note",
     "id": "message-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Your one-sentence message, candidate titles and the five-line story…",
     "rows": 6
    }
   ]
  },
  {
   "id": "abstract",
   "group": "g2",
   "label": "The abstract",
   "title": "Abstracts that get read",
   "sub": "3 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Most readers only ever see your title and abstract. A strong abstract answers, in order: what's the context, what's the gap, what did you do, what did you find, and why it matters. Give a concrete result, with a number if you have one, not a promise that results will be presented.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "abstract-1",
       "tag": "Session 1",
       "text": "Read Koopman, How to write an abstract, and Mensh and Kording's rule on the abstract."
      },
      {
       "id": "abstract-2",
       "tag": "Session 2",
       "text": "Rewrite the abstract of a paper you know in five sentences: context, gap, approach, main result, why it matters."
      },
      {
       "id": "abstract-3",
       "tag": "Session 3",
       "text": "Draft the abstract for your own paper, then cut it to your venue's word limit."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "abstract-r-koopman",
       "ref": "koopman",
       "note": "A short checklist of what every abstract needs."
      },
      {
       "id": "abstract-r-mensh",
       "ref": "mensh",
       "note": "Rule 5 covers the abstract's structure."
      }
     ]
    },
    {
     "type": "note",
     "id": "abstract-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Abstract drafts, newest at the top…",
     "rows": 6
    }
   ]
  },
  {
   "id": "intro",
   "group": "g2",
   "label": "The introduction",
   "title": "Introductions and contributions",
   "sub": "3 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>An introduction should let a reader decide whether to keep going. Answer the questions they bring: what is the problem, why is it interesting and important, why is it hard, why hasn't it been solved, and what exactly do you contribute. State your contributions as a short list, each pointing to the section that backs it up.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "intro-1",
       "tag": "Session 1",
       "text": "Read Widom's Tips for writing technical papers, especially the part on introductions."
      },
      {
       "id": "intro-2",
       "tag": "Session 2",
       "text": "Write your contributions as three to five bullet points, each referring to a section of the paper."
      },
      {
       "id": "intro-3",
       "tag": "Session 3",
       "text": "Draft your introduction by answering Widom's questions, one paragraph each, then merge."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "intro-r-widom",
       "ref": "widom",
       "note": "The five-question introduction, plus advice on the rest of the paper."
      },
      {
       "id": "intro-r-spj",
       "ref": "spj",
       "note": "On nailing your contributions and avoiding a ‘rest of this paper’ paragraph."
      }
     ]
    },
    {
     "type": "note",
     "id": "intro-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Contribution bullets and introduction drafts…",
     "rows": 6
    }
   ]
  },
  {
   "id": "body",
   "group": "g2",
   "label": "Methods to discussion",
   "title": "Methods, results, discussion and related work",
   "sub": "4 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Methods should let a competent reader reproduce the work. In results, give each figure or table its own paragraph whose first sentence states the finding. The discussion interprets: summarise what you showed, admit limitations, and say what follows. Put detailed related work after you've stated your contribution, so readers can compare against it, and be generous and accurate about others' work.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "body-1",
       "tag": "Session 1",
       "text": "Read Zhang, Ten simple rules for writing research papers, and Mensh and Kording rules 6 to 8."
      },
      {
       "id": "body-2",
       "tag": "Session 2",
       "text": "Rewrite one results paragraph so its first sentence states the finding and the rest supports it."
      },
      {
       "id": "body-3",
       "tag": "Session 3",
       "text": "Draft a discussion: summary, limitations, implications and next steps, one short paragraph each."
      },
      {
       "id": "body-4",
       "tag": "Session 4",
       "text": "Write a related-work section that says how each prior work differs from yours, not just what it did."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "body-r-zhang",
       "ref": "zhang",
       "note": "A practical overview of the whole paper-writing process."
      },
      {
       "id": "body-r-mensh",
       "ref": "mensh",
       "note": "Rules 6–8 cover the introduction, results and discussion."
      },
      {
       "id": "body-r-scitable",
       "ref": "scitable",
       "note": "A plain guide to what each section of a scientific paper is for."
      },
      {
       "id": "body-r-unc",
       "ref": "unc",
       "note": "A section-by-section guide to scientific reports."
      }
     ]
    },
    {
     "type": "note",
     "id": "body-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Results paragraphs, discussion drafts and related-work notes…",
     "rows": 6
    }
   ]
  },
  {
   "id": "figures",
   "group": "g3",
   "label": "Figures",
   "title": "Figures that carry the argument",
   "sub": "3 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Many readers look at the figures before the text. Each figure should make one point, be readable without the main text, and drop anything that doesn't serve that point. Label things directly, use colour with purpose, and write captions that state what the reader should conclude.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "figures-1",
       "tag": "Session 1",
       "text": "Read Rougier, Droettboom and Bourne, Ten simple rules for better figures."
      },
      {
       "id": "figures-2",
       "tag": "Session 2",
       "text": "Redraw one of your figures: remove clutter, label directly and make the key comparison obvious."
      },
      {
       "id": "figures-3",
       "tag": "Session 3",
       "text": "Rewrite every caption in a draft so its first sentence states the takeaway."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "figures-r-rougier",
       "ref": "rougier",
       "note": "Ten rules with examples, from knowing your audience to choosing colours."
      }
     ]
    },
    {
     "type": "note",
     "id": "figures-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Figure list: the one point each figure makes…",
     "rows": 6
    }
   ]
  },
  {
   "id": "revise",
   "group": "g4",
   "label": "Revising",
   "title": "Revising and getting feedback",
   "sub": "4 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Revision is where most of the improvement happens. Read your draft as a stranger would: make a reverse outline (one line per paragraph) to check the order, read it aloud to hear clumsy sentences, and ask friendly readers, including non-experts, where they got lost. Every confusion is information, not an attack.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "revise-1",
       "tag": "Session 1",
       "text": "Make a reverse outline of a full draft: one line per paragraph. Reorder anything out of place."
      },
      {
       "id": "revise-2",
       "tag": "Session 2",
       "text": "Read the whole draft aloud. Mark every sentence you stumbled over and fix it."
      },
      {
       "id": "revise-3",
       "tag": "Session 3",
       "text": "Google Technical Writing Two: the units on self-editing and organising large documents."
      },
      {
       "id": "revise-4",
       "tag": "Session 4",
       "text": "Give your abstract and introduction to a non-expert. Note every place they got lost, then revise."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "revise-r-tw2",
       "ref": "tw2",
       "note": "Self-editing, organising large documents and writing for different audiences."
      },
      {
       "id": "revise-r-spj",
       "ref": "spj",
       "note": "Guideline 7: listen to your readers."
      }
     ]
    },
    {
     "type": "note",
     "id": "revise-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Reverse outline and reader feedback…",
     "rows": 6
    }
   ]
  },
  {
   "id": "publish",
   "group": "g4",
   "label": "Publishing",
   "title": "Submitting and responding to reviewers",
   "sub": "3 sessions of 30 minutes",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Choose a venue whose readers want your message, follow its format exactly, and expect revisions. When reviews arrive, be polite and specific: quote each comment, say what you changed and where, and when you disagree, explain why with evidence. A clear response letter often matters as much as the revision itself.</p>"
    },
    {
     "type": "checklist",
     "title": "Sessions",
     "hint": "one a day, about 30 minutes each",
     "items": [
      {
       "id": "publish-1",
       "tag": "Session 1",
       "text": "Read Bourne, Ten simple rules for getting published."
      },
      {
       "id": "publish-2",
       "tag": "Session 2",
       "text": "Read Noble, Ten simple rules for writing a response to reviewers."
      },
      {
       "id": "publish-3",
       "tag": "Session 3",
       "text": "Draft a response to a set of reviews (your own or a published example): quote, respond, show the change."
      }
     ]
    },
    {
     "type": "resources",
     "title": "Read",
     "counts": false,
     "items": [
      {
       "id": "publish-r-bourne",
       "ref": "bourne",
       "note": "Practical advice on getting work accepted."
      },
      {
       "id": "publish-r-noble",
       "ref": "noble",
       "note": "How to structure a response letter that reviewers and editors appreciate."
      }
     ]
    },
    {
     "type": "note",
     "id": "publish-draft",
     "label": "Drafts and takeaways",
     "placeholder": "Venue notes and response-letter drafts…",
     "rows": 6
    }
   ]
  },
  {
   "id": "method",
   "label": "How to practise",
   "title": "How to practise in 30 minutes a day",
   "sub": "The daily routine and a running writing log",
   "blocks": [
    {
     "type": "table",
     "title": "A 30-minute session",
     "head": [
      "Minutes",
      "What to do"
     ],
     "rows": [
      [
       "0–5",
       "Reread yesterday's notes and pick up where you stopped."
      ],
      [
       "5–25",
       "Do the next session from <strong>Up next</strong>: read, then write. Always end with words on the page."
      ],
      [
       "25–30",
       "Note one thing you learned or changed in your writing log below."
      ]
     ]
    },
    {
     "type": "text",
     "title": "How this tracker works",
     "html": "<p><strong>Read a little, write a lot.</strong> Every session pairs a short reading with a writing task on your own material or a paper you know, because rewriting real prose is where the skills stick.</p><p><strong>Go in order, but loop back.</strong> The sections build from sentences to whole papers. Once you've finished, start again with your next paper; the drafts boxes keep your earlier work for comparison.</p><p><strong>Keep drafts here or in your own editor.</strong> Notes save in this browser only. Use Data &amp; export to download them as Markdown whenever you like.</p>"
    },
    {
     "type": "note",
     "id": "writing-log",
     "label": "Writing log",
     "placeholder": "Date: what you worked on, one thing you changed in your writing…",
     "rows": 8
    }
   ]
  }
 ],
 "library": {
  "gopen": {
   "title": "The Science of Scientific Writing",
   "by": "George Gopen and Judith Swan, American Scientist (1990)",
   "href": "https://www.cs.columbia.edu/~djhsu/coms6998-f17/science-of-writing.pdf",
   "kind": "paper"
  },
  "tw1": {
   "title": "Technical Writing One",
   "by": "Google for Developers (free course)",
   "href": "https://developers.google.com/tech-writing/one",
   "kind": "course"
  },
  "tw2": {
   "title": "Technical Writing Two",
   "by": "Google for Developers (free course)",
   "href": "https://developers.google.com/tech-writing/two",
   "kind": "course"
  },
  "orwell": {
   "title": "Politics and the English Language",
   "by": "George Orwell (1946)",
   "href": "https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/",
   "kind": "doc"
  },
  "mensh": {
   "title": "Ten simple rules for structuring papers",
   "by": "Brett Mensh and Konrad Kording, PLOS Computational Biology (2017)",
   "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5619685/",
   "kind": "paper"
  },
  "spj": {
   "title": "How to write a great research paper",
   "by": "Simon Peyton Jones, Microsoft Research (talk and slides)",
   "href": "https://www.microsoft.com/en-us/research/?p=186470",
   "kind": "video"
  },
  "koopman": {
   "title": "How to write an abstract",
   "by": "Philip Koopman, Carnegie Mellon University",
   "href": "https://users.ece.cmu.edu/~koopman/essays/abstract.html",
   "kind": "doc"
  },
  "widom": {
   "title": "Tips for writing technical papers",
   "by": "Jennifer Widom, Stanford University",
   "href": "https://cs.stanford.edu/people/widom/paper-writing.html",
   "kind": "doc"
  },
  "zhang": {
   "title": "Ten simple rules for writing research papers",
   "by": "Weixiong Zhang, PLOS Computational Biology (2014)",
   "href": "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003453",
   "kind": "paper"
  },
  "scitable": {
   "title": "Scientific papers",
   "by": "Nature Education, Scitable",
   "href": "https://www.nature.com/scitable/topicpage/scientific-papers-13815490/",
   "kind": "doc"
  },
  "unc": {
   "title": "Scientific reports",
   "by": "UNC Chapel Hill Writing Center",
   "href": "https://writingcenter.unc.edu/tips-and-tools/scientific-reports/",
   "kind": "doc"
  },
  "rougier": {
   "title": "Ten simple rules for better figures",
   "by": "Nicolas Rougier, Michael Droettboom and Philip Bourne, PLOS Computational Biology (2014)",
   "href": "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003833",
   "kind": "paper"
  },
  "bourne": {
   "title": "Ten simple rules for getting published",
   "by": "Philip Bourne, PLOS Computational Biology (2005)",
   "href": "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.0010057",
   "kind": "paper"
  },
  "noble": {
   "title": "Ten simple rules for writing a response to reviewers",
   "by": "William Noble, PLOS Computational Biology (2017)",
   "href": "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005730",
   "kind": "paper"
  }
 }
};
