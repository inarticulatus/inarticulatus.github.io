/* Content for this tracker. The interface is drawn by /learn/app/app.js. */
window.TRACKER = {
 "id": "frontier-ai",
 "storageKey": "learn_frontier_ai_v3",
 "legacyKeys": [
  "frontier_ai_workbench_v2"
 ],
 "meta": {
  "kicker": "4-week study tracker",
  "title": "Frontier AI",
  "mark": "& Systems",
  "sub": "24 study days · 3 tracks · 5 hours a day · a closed-book gate every Sunday",
  "overviewSub": "Four weeks of six study days, each ending in a Sunday gate"
 },
 "labels": {
  "section": "Day",
  "sections": "Sections",
  "item": "task",
  "items": "tasks"
 },
 "looseLabel": "Reference",
 "tools": {
  "timer": [
   25,
   90,
   120
  ]
 },
 "groups": [
  {
   "id": "W1",
   "label": "Week 1",
   "sub": "GPU kernels and numerical foundations",
   "title": "Week 1 · GPU kernels and numerical foundations",
   "short": "W1",
   "color": "coral"
  },
  {
   "id": "W2",
   "label": "Week 2",
   "sub": "RLHF, GRPO, DPO and verifiable rewards",
   "title": "Week 2 · RLHF, GRPO, DPO and verifiable rewards",
   "short": "W2",
   "color": "teal"
  },
  {
   "id": "W3",
   "label": "Week 3",
   "sub": "AI sandboxing and distributed systems",
   "title": "Week 3 · AI sandboxing and distributed systems",
   "short": "W3",
   "color": "gold"
  },
  {
   "id": "W4",
   "label": "Week 4",
   "sub": "Integration and full interview loop",
   "title": "Week 4 · Integration and full interview loop",
   "short": "W4",
   "color": "plum"
  },
  {
   "id": "reading",
   "label": "Reading list",
   "sub": "Books and papers",
   "short": "Reading",
   "color": "muted"
  }
 ],
 "sections": [
  {
   "id": "W1-D1",
   "group": "W1",
   "label": "Mon",
   "title": "Monday, week 1",
   "sub": "Roofline math notes + working softmax kernel",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W1-D1_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Sliding Window Max; Min Window Substring"
      },
      {
       "id": "W1-D1_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Bishop Ch 4: Matrix calculus; Fregly Ch 7: Roofline math"
      },
      {
       "id": "W1-D1_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Triton Tutorials 1–2: Vector add & fused softmax"
      },
      {
       "id": "W1-D1_deliv",
       "tag": "Deliverable",
       "text": "Roofline math notes + working softmax kernel"
      }
     ]
    },
    {
     "type": "note",
     "id": "W1-D1_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W1-D2",
   "group": "W1",
   "label": "Tue",
   "title": "Tuesday, week 1",
   "sub": "Autotuned Triton matmul script",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W1-D2_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Merge Intervals; Meeting Rooms II"
      },
      {
       "id": "W1-D2_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Derive backprop: LayerNorm, RMSNorm, Cross-Entropy"
      },
      {
       "id": "W1-D2_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "PMPP Ch 1–2; Triton Tutorial 3: Tiled matmul & autotuning"
      },
      {
       "id": "W1-D2_deliv",
       "tag": "Deliverable",
       "text": "Autotuned Triton matmul script"
      }
     ]
    },
    {
     "type": "note",
     "id": "W1-D2_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W1-D3",
   "group": "W1",
   "label": "Wed",
   "title": "Wednesday, week 1",
   "sub": "Warp-level reduction kernel in CUDA",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W1-D3_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "LRU Cache; LFU Cache (KV eviction focus)"
      },
      {
       "id": "W1-D3_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "FlashAttn-2 Paper: QKV scaling & online softmax trick"
      },
      {
       "id": "W1-D3_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "PMPP Ch 3–4; Write warp-level reduction in CUDA C++"
      },
      {
       "id": "W1-D3_deliv",
       "tag": "Deliverable",
       "text": "Warp-level reduction kernel in CUDA"
      }
     ]
    },
    {
     "type": "note",
     "id": "W1-D3_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W1-D4",
   "group": "W1",
   "label": "Thu",
   "title": "Thursday, week 1",
   "sub": "Tiled shared-memory CUDA matmul",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W1-D4_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Top-K Frequent; Find Median from Data Stream"
      },
      {
       "id": "W1-D4_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Optimizers: Derive SGD, AdamW, 8-bit quantization"
      },
      {
       "id": "W1-D4_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "PMPP Ch 5; siboehm Matmul Worklog (shared memory tiling)"
      },
      {
       "id": "W1-D4_deliv",
       "tag": "Deliverable",
       "text": "Tiled shared-memory CUDA matmul"
      }
     ]
    },
    {
     "type": "note",
     "id": "W1-D4_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W1-D5",
   "group": "W1",
   "label": "Fri",
   "title": "Friday, week 1",
   "sub": "Flamegraph & stall analysis of W1 kernels",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W1-D5_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Design Circular Queue; Bounded Blocking Queue"
      },
      {
       "id": "W1-D5_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Numerical precision: FP16, BF16, FP8 scaling & underflow"
      },
      {
       "id": "W1-D5_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Fregly Ch 8 & 14: Nsight Compute, PyTorch Profiler, torch.compile"
      },
      {
       "id": "W1-D5_deliv",
       "tag": "Deliverable",
       "text": "Flamegraph & stall analysis of W1 kernels"
      }
     ]
    },
    {
     "type": "note",
     "id": "W1-D5_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W1-D6",
   "group": "W1",
   "label": "Sat",
   "title": "Saturday, week 1",
   "sub": "Benchmarked Triton kernel vs PyTorch native",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W1-D6_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Timed Mock: 4 Mediums (Arrays/Hash/Design)"
      },
      {
       "id": "W1-D6_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Derive FlashAttention forward pass & I/O complexity"
      },
      {
       "id": "W1-D6_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Build: Fused RMSNorm + Residual Add in Triton"
      },
      {
       "id": "W1-D6_deliv",
       "tag": "Deliverable",
       "text": "Benchmarked Triton kernel vs PyTorch native"
      }
     ]
    },
    {
     "type": "note",
     "id": "W1-D6_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "GATE-1",
   "group": "W1",
   "label": "Sunday gate",
   "title": "Sunday gate: GPU & Numerical Foundations",
   "sub": "Closed-book check before the next week",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Do these without notes. Tick a criterion only when you can do it cold; anything you can't goes into next week's warm-ups.</p>"
    },
    {
     "type": "checklist",
     "title": "Gate criteria",
     "items": [
      {
       "id": "GATE-1_0",
       "text": "Compute the arithmetic intensity and Roofline bound of a matrix multiplication without notes"
      },
      {
       "id": "GATE-1_1",
       "text": "Write a fused Triton kernel with block-level autotuning configs"
      },
      {
       "id": "GATE-1_2",
       "text": "Explain warp divergence and 32-way shared-memory bank conflicts"
      },
      {
       "id": "GATE-1_3",
       "text": "Solve an O(1) LRU/LFU cache implementation under 20 minutes"
      }
     ]
    },
    {
     "type": "select",
     "id": "GATE-1",
     "label": "Gate result",
     "options": [
      {
       "value": "PENDING",
       "label": "Pending"
      },
      {
       "value": "REVIEW",
       "label": "Needs review"
      },
      {
       "value": "PASSED",
       "label": "Passed"
      }
     ]
    },
    {
     "type": "note",
     "id": "GATE-1_pad",
     "label": "Self-grading notes",
     "placeholder": "Missed derivations, benchmarks to revisit…"
    }
   ]
  },
  {
   "id": "W2-D1",
   "group": "W2",
   "label": "Mon",
   "title": "Monday, week 2",
   "sub": "Pairwise reward model loss in PyTorch",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W2-D1_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Binary Tree Max Path Sum; Serialize/Deserialize"
      },
      {
       "id": "W2-D1_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "KL Divergence (forward vs reverse), JSD, Cross-Entropy"
      },
      {
       "id": "W2-D1_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Lambert Ch 1–3 + Videos 1–4: SFT masking & Bradley-Terry RM"
      },
      {
       "id": "W2-D1_deliv",
       "tag": "Deliverable",
       "text": "Pairwise reward model loss in PyTorch"
      }
     ]
    },
    {
     "type": "note",
     "id": "W2-D1_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W2-D2",
   "group": "W2",
   "label": "Tue",
   "title": "Tuesday, week 2",
   "sub": "GAE advantage calculation script",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W2-D2_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Network Delay Time; Cheapest Flights (Dijkstra)"
      },
      {
       "id": "W2-D2_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Policy Gradients: REINFORCE, baseline, GAE derivation"
      },
      {
       "id": "W2-D2_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Lambert Ch 4–5 + Videos 5–6: PPO actor-critic architecture"
      },
      {
       "id": "W2-D2_deliv",
       "tag": "Deliverable",
       "text": "GAE advantage calculation script"
      }
     ]
    },
    {
     "type": "note",
     "id": "W2-D2_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W2-D3",
   "group": "W2",
   "label": "Wed",
   "title": "Wednesday, week 2",
   "sub": "GRPO loss function implementation (no critic)",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W2-D3_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Course Schedule II; Alien Dictionary (Topo Sort)"
      },
      {
       "id": "W2-D3_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "PPO clipped surrogate objective & adaptive KL penalty"
      },
      {
       "id": "W2-D3_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Lambert Ch 6 + Videos 7–8 + DeepSeek Paper: GRPO"
      },
      {
       "id": "W2-D3_deliv",
       "tag": "Deliverable",
       "text": "GRPO loss function implementation (no critic)"
      }
     ]
    },
    {
     "type": "note",
     "id": "W2-D3_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W2-D4",
   "group": "W2",
   "label": "Thu",
   "title": "Thursday, week 2",
   "sub": "Working DPO training step on toy dataset",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W2-D4_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Accounts Merge; Number of Islands II (Union-Find)"
      },
      {
       "id": "W2-D4_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "DPO Paper Appendix A: Derive DPO from RLHF Lagrangian"
      },
      {
       "id": "W2-D4_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Lambert Ch 7 + Videos 9–12: DPO trainer & log-prob caching"
      },
      {
       "id": "W2-D4_deliv",
       "tag": "Deliverable",
       "text": "Working DPO training step on toy dataset"
      }
     ]
    },
    {
     "type": "note",
     "id": "W2-D4_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W2-D5",
   "group": "W2",
   "label": "Fri",
   "title": "Friday, week 2",
   "sub": "Regex/AST math & code execution verifier",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W2-D5_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Koko Eating Bananas; Split Array Largest Sum"
      },
      {
       "id": "W2-D5_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "RLVR math: Verifiable rewards, PRM vs ORM, pass@k"
      },
      {
       "id": "W2-D5_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Lambert Ch 8–9 + Videos 13–16: Verifiable reward environments"
      },
      {
       "id": "W2-D5_deliv",
       "tag": "Deliverable",
       "text": "Regex/AST math & code execution verifier"
      }
     ]
    },
    {
     "type": "note",
     "id": "W2-D5_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W2-D6",
   "group": "W2",
   "label": "Sat",
   "title": "Saturday, week 2",
   "sub": "Reward curve showing convergence on toy task",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W2-D6_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Timed Mock: 4 Mediums (Trees/Graphs/Heaps)"
      },
      {
       "id": "W2-D6_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Whiteboard derivation drill: PPO vs DPO vs GRPO"
      },
      {
       "id": "W2-D6_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Build: End-to-end GRPO training loop on tiny model"
      },
      {
       "id": "W2-D6_deliv",
       "tag": "Deliverable",
       "text": "Reward curve showing convergence on toy task"
      }
     ]
    },
    {
     "type": "note",
     "id": "W2-D6_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "GATE-2",
   "group": "W2",
   "label": "Sunday gate",
   "title": "Sunday gate: Post-Training & RLHF",
   "sub": "Closed-book check before the next week",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Do these without notes. Tick a criterion only when you can do it cold; anything you can't goes into next week's warm-ups.</p>"
    },
    {
     "type": "checklist",
     "title": "Gate criteria",
     "items": [
      {
       "id": "GATE-2_0",
       "text": "Derive the PPO clipped objective, GRPO group advantage, and DPO loss on a blank sheet of paper"
      },
      {
       "id": "GATE-2_1",
       "text": "Diagnose why KL divergence spikes or reward hacking occurs during training"
      },
      {
       "id": "GATE-2_2",
       "text": "Run a working toy GRPO or DPO training loop in PyTorch"
      }
     ]
    },
    {
     "type": "select",
     "id": "GATE-2",
     "label": "Gate result",
     "options": [
      {
       "value": "PENDING",
       "label": "Pending"
      },
      {
       "value": "REVIEW",
       "label": "Needs review"
      },
      {
       "value": "PASSED",
       "label": "Passed"
      }
     ]
    },
    {
     "type": "note",
     "id": "GATE-2_pad",
     "label": "Self-grading notes",
     "placeholder": "Missed derivations, benchmarks to revisit…"
    }
   ]
  },
  {
   "id": "W3-D1",
   "group": "W3",
   "label": "Mon",
   "title": "Monday, week 3",
   "sub": "Container isolation script using unshare/cgroups",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W3-D1_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Design In-Memory File System; Implement Trie"
      },
      {
       "id": "W3-D1_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "RoPE (Rotary Embeddings), GQA, MQA, KV cache math"
      },
      {
       "id": "W3-D1_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Rice Ch 1–4: Linux namespaces, cgroups v2, chroot isolation"
      },
      {
       "id": "W3-D1_deliv",
       "tag": "Deliverable",
       "text": "Container isolation script using unshare/cgroups"
      }
     ]
    },
    {
     "type": "note",
     "id": "W3-D1_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W3-D2",
   "group": "W3",
   "label": "Tue",
   "title": "Tuesday, week 3",
   "sub": "seccomp profile blocking socket/fork syscalls",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W3-D2_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Word Break II; Longest Increasing Subsequence"
      },
      {
       "id": "W3-D2_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Ultra-Scale Playbook: ZeRO-1/2/3 & activation memory math"
      },
      {
       "id": "W3-D2_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Rice Ch 5–8: seccomp-bpf syscall filtering & gVisor/Firecracker"
      },
      {
       "id": "W3-D2_deliv",
       "tag": "Deliverable",
       "text": "seccomp profile blocking socket/fork syscalls"
      }
     ]
    },
    {
     "type": "note",
     "id": "W3-D2_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W3-D3",
   "group": "W3",
   "label": "Wed",
   "title": "Wednesday, week 3",
   "sub": "Egress-restricted Docker sandbox for code execution",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W3-D3_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Concurrency: Print in Order; Dining Philosophers"
      },
      {
       "id": "W3-D3_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Ultra-Scale Playbook: Tensor, Pipeline, Sequence, MoE comm math"
      },
      {
       "id": "W3-D3_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Fregly Ch 4 (NCCL overlap) + Agent egress proxies & DNS sinkholes"
      },
      {
       "id": "W3-D3_deliv",
       "tag": "Deliverable",
       "text": "Egress-restricted Docker sandbox for code execution"
      }
     ]
    },
    {
     "type": "note",
     "id": "W3-D3_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W3-D4",
   "group": "W3",
   "label": "Thu",
   "title": "Thursday, week 3",
   "sub": "1-page failure mode analysis of distributed KV cache",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W3-D4_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Task Scheduler; Design Hit Counter (Rate Limiting)"
      },
      {
       "id": "W3-D4_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "vLLM Paper: PagedAttention block tables & Speculative Decoding"
      },
      {
       "id": "W3-D4_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "DDIA Ch 3, 5 + Kleppmann L1–4: Storage, replication, state machines"
      },
      {
       "id": "W3-D4_deliv",
       "tag": "Deliverable",
       "text": "1-page failure mode analysis of distributed KV cache"
      }
     ]
    },
    {
     "type": "note",
     "id": "W3-D4_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W3-D5",
   "group": "W3",
   "label": "Fri",
   "title": "Friday, week 3",
   "sub": "Consistent hashing ring implementation in Python",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W3-D5_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Design Log Storage System; Snapshot Array"
      },
      {
       "id": "W3-D5_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Off-policy importance sampling; continuous batching math"
      },
      {
       "id": "W3-D5_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "DDIA Ch 6–7 + Kleppmann L5–6: Partitioning & Raft consensus"
      },
      {
       "id": "W3-D5_deliv",
       "tag": "Deliverable",
       "text": "Consistent hashing ring implementation in Python"
      }
     ]
    },
    {
     "type": "note",
     "id": "W3-D5_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W3-D6",
   "group": "W3",
   "label": "Sat",
   "title": "Saturday, week 3",
   "sub": "FastAPI + Docker + seccomp code runner",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W3-D6_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Timed Mock: 3 Medium-Hards in 75 min"
      },
      {
       "id": "W3-D6_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "System Design Math: Serve 70B on 8xH100 (TTFT/TPOT bounds)"
      },
      {
       "id": "W3-D6_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Build: Sandboxed Python execution server for RLVR"
      },
      {
       "id": "W3-D6_deliv",
       "tag": "Deliverable",
       "text": "FastAPI + Docker + seccomp code runner"
      }
     ]
    },
    {
     "type": "note",
     "id": "W3-D6_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "GATE-3",
   "group": "W3",
   "label": "Sunday gate",
   "title": "Sunday gate: Sandboxing & Distributed Systems",
   "sub": "Closed-book check before the next week",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Do these without notes. Tick a criterion only when you can do it cold; anything you can't goes into next week's warm-ups.</p>"
    },
    {
     "type": "checklist",
     "title": "Gate criteria",
     "items": [
      {
       "id": "GATE-3_0",
       "text": "Provision a hardened container using cgroups v2, seccomp-bpf, and network egress rules to safely run untrusted code"
      },
      {
       "id": "GATE-3_1",
       "text": "Calculate exact KV-cache and ZeRO-3 memory footprints for a 70B model"
      },
      {
       "id": "GATE-3_2",
       "text": "Explain how PagedAttention and Raft consensus operate under node failure"
      }
     ]
    },
    {
     "type": "select",
     "id": "GATE-3",
     "label": "Gate result",
     "options": [
      {
       "value": "PENDING",
       "label": "Pending"
      },
      {
       "value": "REVIEW",
       "label": "Needs review"
      },
      {
       "value": "PASSED",
       "label": "Passed"
      }
     ]
    },
    {
     "type": "note",
     "id": "GATE-3_pad",
     "label": "Self-grading notes",
     "placeholder": "Missed derivations, benchmarks to revisit…"
    }
   ]
  },
  {
   "id": "W4-D1",
   "group": "W4",
   "label": "Mon",
   "title": "Monday, week 4",
   "sub": "3 verified Triton kernels passing unit tests",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W4-D1_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "2 Mediums: Graph + Concurrency"
      },
      {
       "id": "W4-D1_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "No-notes derivation: FlashAttention, RoPE, ZeRO-3 memory"
      },
      {
       "id": "W4-D1_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "PMPP Ch 6 + KernelBench: Solve 3 PyTorch-to-Triton tasks"
      },
      {
       "id": "W4-D1_deliv",
       "tag": "Deliverable",
       "text": "3 verified Triton kernels passing unit tests"
      }
     ]
    },
    {
     "type": "note",
     "id": "W4-D1_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W4-D2",
   "group": "W4",
   "label": "Tue",
   "title": "Tuesday, week 4",
   "sub": "Architecture diagram + throughput bottleneck math",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W4-D2_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "2 Mediums: Custom Data Structures"
      },
      {
       "id": "W4-D2_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "No-notes derivation: PPO Clip, DPO, GRPO, GAE"
      },
      {
       "id": "W4-D2_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Fregly Ch 16–18: Disaggregated serving & RLHF rollout architecture"
      },
      {
       "id": "W4-D2_deliv",
       "tag": "Deliverable",
       "text": "Architecture diagram + throughput bottleneck math"
      }
     ]
    },
    {
     "type": "note",
     "id": "W4-D2_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W4-D3",
   "group": "W4",
   "label": "Wed",
   "title": "Wednesday, week 4",
   "sub": "Recorded audio/video review of explanations",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W4-D3_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Mock Coding Round 1: 2 problems, 45 min strict"
      },
      {
       "id": "W4-D3_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Verbal Drill: 10 rapid-fire DL/LLM scaling questions"
      },
      {
       "id": "W4-D3_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Mock Domain 1: GPU Kernels & Inference (Fregly 200-Item Checklist)"
      },
      {
       "id": "W4-D3_deliv",
       "tag": "Deliverable",
       "text": "Recorded audio/video review of explanations"
      }
     ]
    },
    {
     "type": "note",
     "id": "W4-D3_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W4-D4",
   "group": "W4",
   "label": "Thu",
   "title": "Thursday, week 4",
   "sub": "1-page cheat sheet on RLHF debugging (KL spikes)",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W4-D4_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "2 Mediums: Dynamic Programming + Greedy"
      },
      {
       "id": "W4-D4_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Fix derivation gaps & numerical stability edge cases"
      },
      {
       "id": "W4-D4_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Mock Domain 2: RLHF, Post-Training & Reward Hacking debugging"
      },
      {
       "id": "W4-D4_deliv",
       "tag": "Deliverable",
       "text": "1-page cheat sheet on RLHF debugging (KL spikes)"
      }
     ]
    },
    {
     "type": "note",
     "id": "W4-D4_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W4-D5",
   "group": "W4",
   "label": "Fri",
   "title": "Friday, week 4",
   "sub": "Threat model doc for autonomous SWE-agent loop",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W4-D5_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Mock Coding Round 2: 2 problems, 45 min strict"
      },
      {
       "id": "W4-D5_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Verbal Drill: Tradeoffs (DPO vs PPO, TP vs PP, FP8 vs BF16)"
      },
      {
       "id": "W4-D5_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Mock Domain 3: Sandboxing, Containment & Evals (DDIA Ch 8–9)"
      },
      {
       "id": "W4-D5_deliv",
       "tag": "Deliverable",
       "text": "Threat model doc for autonomous SWE-agent loop"
      }
     ]
    },
    {
     "type": "note",
     "id": "W4-D5_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "W4-D6",
   "group": "W4",
   "label": "Sat",
   "title": "Saturday, week 4",
   "sub": "Complete self-graded rubric across all 4 rounds",
   "blocks": [
    {
     "type": "checklist",
     "title": "Today's tasks",
     "hint": "about 5 hours",
     "items": [
      {
       "id": "W4-D6_dsa",
       "tag": "Track A · DSA · 1.5 h",
       "text": "Full Loop Sim: 45m DSA + 45m Systems Coding"
      },
      {
       "id": "W4-D6_math",
       "tag": "Track B · DL and maths · 1.5 h",
       "text": "Full Loop Sim: 45m DL/RLHF Math & Whiteboard Theory"
      },
      {
       "id": "W4-D6_domain",
       "tag": "Track C · Domain and build · 2 h",
       "text": "Full Loop Sim: 60m System Design (RLVR + Sandbox + Serving)"
      },
      {
       "id": "W4-D6_deliv",
       "tag": "Deliverable",
       "text": "Complete self-graded rubric across all 4 rounds"
      }
     ]
    },
    {
     "type": "note",
     "id": "W4-D6_note",
     "label": "Notes and benchmark log",
     "placeholder": "Repo link, GB/s, TFLOPS, what broke and why…",
     "rows": 3
    }
   ]
  },
  {
   "id": "GATE-4",
   "group": "W4",
   "label": "Sunday gate",
   "title": "Sunday gate: Full Interview Loop Execution",
   "sub": "Closed-book check before the next week",
   "blocks": [
    {
     "type": "text",
     "html": "<p>Do these without notes. Tick a criterion only when you can do it cold; anything you can't goes into next week's warm-ups.</p>"
    },
    {
     "type": "checklist",
     "title": "Gate criteria",
     "items": [
      {
       "id": "GATE-4_0",
       "text": "Complete two systems-flavored coding problems in 45 minutes strict"
      },
      {
       "id": "GATE-4_1",
       "text": "Articulate the memory/compute tradeoffs between Tensor, Pipeline, and Context Parallelism"
      },
      {
       "id": "GATE-4_2",
       "text": "Design an end-to-end distributed RLVR training and sandboxed inference cluster on a whiteboard"
      }
     ]
    },
    {
     "type": "select",
     "id": "GATE-4",
     "label": "Gate result",
     "options": [
      {
       "value": "PENDING",
       "label": "Pending"
      },
      {
       "value": "REVIEW",
       "label": "Needs review"
      },
      {
       "value": "PASSED",
       "label": "Passed"
      }
     ]
    },
    {
     "type": "note",
     "id": "GATE-4_pad",
     "label": "Self-grading notes",
     "placeholder": "Missed derivations, benchmarks to revisit…"
    }
   ]
  },
  {
   "id": "books",
   "group": "reading",
   "label": "Books",
   "title": "Books and companions",
   "sub": "8 core texts with their companion courses",
   "blocks": [
    {
     "type": "checklist",
     "title": "Core texts",
     "items": [
      {
       "id": "BOOK-1",
       "tag": "GPU Kernels",
       "text": "Programming Massively Parallel Processors, 5th Ed. (Hwu, Kirk, El Hajj)",
       "sub": "PMPP Ch. 1–6 (Execution model, memory hierarchy, warps, tiling, occupancy) · with Triton Official Tutorials + siboehm CUDA Matmul Worklog + KernelBench",
       "noteField": {
        "id": "BOOK-1_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-2",
       "tag": "AI Perf & Infra",
       "text": "AI Systems Performance Engineering (Chris Fregly)",
       "sub": "Ch. 4 (NCCL/Networking), Ch. 7–8 (Memory & Nsight Compute), Ch. 14 (torch.compile/Triton), Ch. 16–18 (Inference/KV Cache) · with cfregly/ai-performance-engineering GitHub + 200-Item Checklist",
       "noteField": {
        "id": "BOOK-2_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-3",
       "tag": "RLHF & Post-Training",
       "text": "Reinforcement Learning from Human Feedback (Nathan Lambert, rlhfbook.com)",
       "sub": "Ch. 3–9 (SFT, Reward Models, PPO, GRPO, DPO, RLVR, Tool-Use) · with Lambert's 20-Video Post-Training Course + Harvard CS 2881R (L1–4)",
       "noteField": {
        "id": "BOOK-3_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-4",
       "tag": "Scaling & Parallelism",
       "text": "The Ultra-Scale Playbook (Hugging Face, free online)",
       "sub": "Sections on Activation Memory, ZeRO-1/2/3, Tensor/Pipeline/Sequence/Expert Parallelism · with Lilian Weng's Blog (RLHF, Memory, & Agent posts)",
       "noteField": {
        "id": "BOOK-4_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-5",
       "tag": "Sandboxing & Security",
       "text": "Container Security (Liz Rice, O'Reilly)",
       "sub": "Ch. 1–8 (System calls, cgroups v2, namespaces, capabilities, seccomp, rootless containers) · with Linux Kernel Docs (seccomp-bpf, namespaces) + Firecracker / gVisor Architecture Docs",
       "noteField": {
        "id": "BOOK-5_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-6",
       "tag": "Distributed Systems",
       "text": "Designing Data-Intensive Applications (Martin Kleppmann)",
       "sub": "Ch. 3 (Storage/LSM), Ch. 5–6 (Replication/Partitioning), Ch. 7–9 (Transactions, Faults, Consensus/Raft) · with Kleppmann's Cambridge Distributed Systems Lectures (YouTube L1–8)",
       "noteField": {
        "id": "BOOK-6_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-7",
       "tag": "DL & Math Foundations",
       "text": "Deep Learning: Foundations and Concepts (Bishop, 2024)",
       "sub": "Ch. 4–5 (Backprop & Jacobians), Ch. 12 (Transformers); Karpathy GPT & Backprop lectures · with Karpathy 'Zero to Hero' + 3Blue1Brown (Linear Algebra & Calculus)",
       "noteField": {
        "id": "BOOK-7_note",
        "placeholder": "Current chapter or page"
       }
      },
      {
       "id": "BOOK-8",
       "tag": "Systems DSA",
       "text": "NeetCode 150 (Filtered for Systems/Design/Graphs)",
       "sub": "Arrays/Sliding Window, LRU/LFU, Heaps, Topo Sort, Union-Find, Ring Buffers, Blocking Queues · with LeetCode Concurrency & Design Tag",
       "noteField": {
        "id": "BOOK-8_note",
        "placeholder": "Current chapter or page"
       }
      }
     ],
     "hint": "read only the chapters listed; skip the rest for now"
    }
   ]
  },
  {
   "id": "papers",
   "group": "reading",
   "label": "Papers",
   "title": "Papers to annotate",
   "sub": "4 papers to work through by hand",
   "blocks": [
    {
     "type": "checklist",
     "title": "Papers",
     "items": [
      {
       "id": "PAPER-1",
       "tag": "Paper",
       "text": "FlashAttention-2 (Dao, 2023)",
       "sub": "Online softmax tiling math, warp-level partitioning (splitting Q across warps instead of K/V to avoid shared memory reductions), and HBM I/O complexity proofs.",
       "noteField": {
        "id": "PAPER-1_note",
        "placeholder": "Key equation or whiteboard takeaway"
       }
      },
      {
       "id": "PAPER-2",
       "tag": "Paper",
       "text": "vLLM / PagedAttention (Kwon et al., 2023)",
       "sub": "Virtual memory block tables, KV-cache internal vs. external fragmentation math, and copy-on-write block sharing during parallel/beam sampling.",
       "noteField": {
        "id": "PAPER-2_note",
        "placeholder": "Key equation or whiteboard takeaway"
       }
      },
      {
       "id": "PAPER-3",
       "tag": "Paper",
       "text": "DeepSeekMath / DeepSeek-R1 (2024/2025)",
       "sub": "Group Relative Policy Optimization (GRPO) advantage math without a critic model, unbiased KL estimator, and verifiable reward training loops.",
       "noteField": {
        "id": "PAPER-3_note",
        "placeholder": "Key equation or whiteboard takeaway"
       }
      },
      {
       "id": "PAPER-4",
       "tag": "Paper",
       "text": "Direct Preference Optimization (Rafailov et al., 2023)",
       "sub": "Appendix A whiteboard derivation mapping the KL-constrained Bradley-Terry RLHF objective directly into the closed-form DPO cross-entropy loss.",
       "noteField": {
        "id": "PAPER-4_note",
        "placeholder": "Key equation or whiteboard takeaway"
       }
      }
     ],
     "hint": "print and annotate these for Track B"
    }
   ]
  },
  {
   "id": "reference",
   "label": "Reference sheet",
   "title": "Reference sheet",
   "sub": "Formulas and numbers to know cold",
   "blocks": [
    {
     "type": "reference",
     "title": "Roofline Model & GPU Arithmetic Intensity",
     "tag": "Week 1 · GPU Perf",
     "entries": [
      {
       "name": "Arithmetic Intensity & Ridge Point",
       "desc": "Operations per byte transferred from HBM global memory.",
       "code": "Arithmetic_Intensity (AI) = Total_FLOPs / Total_Bytes_Transferred\nRidge_Point = Peak_Compute_FLOPS / Peak_Memory_Bandwidth\n\n• If AI < Ridge_Point → Memory-Bandwidth Bound (optimize coalescing, fusion, shared mem)\n• If AI > Ridge_Point → Compute Bound (optimize Tensor Cores, warp scheduling, FP16/FP8)"
      },
      {
       "name": "GEMM Arithmetic Intensity (C[M,N] = A[M,K] × B[K,N] in FP16)",
       "desc": "Each element multiply-accumulate counts as 2 FLOPs; FP16/BF16 uses 2 bytes per element.",
       "code": "FLOPs = 2 * M * N * K\nBytes = 2 * (M*K + K*N + M*N)\nAI    = (M * N * K) / (M*K + K*N + M*N)\n\n• NVIDIA A100 (80GB SXM): 312 TFLOPS (FP16) | 2.0 TB/s HBM2e  → Ridge ≈ 156 FLOPs/Byte\n• NVIDIA H100 (80GB SXM): 989 TFLOPS (BF16) | 3.35 TB/s HBM3  → Ridge ≈ 295 FLOPs/Byte"
      },
      {
       "name": "Shared Memory Bank Conflict Avoidance",
       "desc": "32 banks, 4-byte (32-bit) width per bank. Threads in a warp accessing different addresses in the same bank serialize.",
       "code": "Bank_ID = (Byte_Address / 4) % 32\n// Fix column-stride bank conflicts in shared memory tiles by padding +1:\n__shared__ float tile[BLOCK_SIZE][BLOCK_SIZE + 1];"
      }
     ]
    },
    {
     "type": "reference",
     "title": "LLM Memory Footprint, ZeRO & KV Cache Math",
     "tag": "Week 3 · Scaling Math",
     "entries": [
      {
       "name": "Mixed-Precision Training State (16Ψ Rule)",
       "desc": "For a model with Ψ parameters trained with BF16/FP16 weights and FP32 AdamW states:",
       "code": "Weights (BF16):          2 * Ψ bytes\nGradients (BF16):        2 * Ψ bytes\nAdamW FP32 Master Copy:  4 * Ψ bytes\nAdamW FP32 Momentum (m): 4 * Ψ bytes\nAdamW FP32 Variance (v): 4 * Ψ bytes\n------------------------------------\nTotal Static Memory    = 16 * Ψ bytes (e.g., 7B model = 112 GB; 70B = 1,120 GB)"
      },
      {
       "name": "ZeRO-1 / ZeRO-2 / ZeRO-3 Sharding Across N_d Data-Parallel GPUs",
       "desc": "Per-GPU static memory footprint as optimizer states, gradients, and weights are partitioned:",
       "code": "ZeRO-1 (Optimizer Sharded):  (2Ψ + 2Ψ) + (12Ψ / N_d) = 4Ψ + 12Ψ/N_d\nZeRO-2 (Opt + Grad Sharded): (2Ψ)      + (14Ψ / N_d) = 2Ψ + 14Ψ/N_d\nZeRO-3 (All Sharded):        16Ψ / N_d  (requires 1.5x comm volume for All-Gather/Reduce-Scatter)"
      },
      {
       "name": "Inference KV-Cache Memory Footprint (GQA / MQA)",
       "desc": "For Batch B, Sequence Length S, Layers L, KV Heads n_kv, Head Dim d_h in FP16 (2 bytes):",
       "code": "KV_Cache_Bytes = 2 (K & V) * 2 (FP16 bytes) * L * n_kv * d_h * B * S\n\n// Example: Llama-3-70B (L=80, n_kv=8, d_h=128) in FP16:\nPer-Token KV = 4 * 80 * 8 * 128 = 327,680 bytes (~320 KB / token)\nAt S=8192, B=16 → 327,680 B * 8192 * 16 ≈ 42.9 GB (= 40 GiB) KV Cache"
      }
     ]
    },
    {
     "type": "reference",
     "title": "Online Softmax & RLHF / GRPO / DPO Equations",
     "tag": "Week 2 · Post-Training",
     "entries": [
      {
       "name": "FlashAttention Online Softmax Recurrence",
       "desc": "Computes exact softmax in SRAM tiles without materializing the N×N attention matrix in HBM:",
       "code": "m_new = max(m_prev, rowmax(S_block))\nl_new = l_prev * exp(m_prev - m_new) + rowsum(exp(S_block - m_new))\nO_new = diag(l_new)^(-1) * (l_prev * exp(m_prev - m_new) * O_prev + exp(S_block - m_new) * V_block)"
      },
      {
       "name": "PPO Clipped Surrogate Objective & GAE",
       "desc": "Probability ratio r_t(θ) = π_θ(y_t | x, y_<t) / π_old(y_t | x, y_<t):",
       "code": "δ_t     = R_t + γ * V(s_{t+1}) - V(s_t)        // R_t = reward at step t (not the ratio r_t(θ))\nA_t^GAE = Σ_{k=0}^{T-t-1} (γ * λ)^k * δ_{t+k}\nL_PPO   = E_t [ min( r_t(θ) * A_t, clip(r_t(θ), 1 - ε, 1 + ε) * A_t ) ] - β * D_KL(π_θ || π_ref)"
      },
      {
       "name": "GRPO (Critic-Free Group Relative Policy Optimization) & DPO Loss",
       "desc": "GRPO normalizes rewards across G sampled completions {o_1...o_G} per prompt, eliminating the value network:",
       "code": "// GRPO Group Advantage & Unbiased KL Estimator:\nA_i  = (r_i - mean(r_1..r_G)) / (std(r_1..r_G) + 1e-8)\nD_KL = (π_ref(o_i|q) / π_θ(o_i|q)) - log(π_ref(o_i|q) / π_θ(o_i|q)) - 1\n\n// Direct Preference Optimization (DPO) on (x, y_win, y_lose):\nL_DPO = -E [ log σ( β * log(π_θ(y_w|x)/π_ref(y_w|x)) - β * log(π_θ(y_l|x)/π_ref(y_l|x)) ) ]"
      }
     ]
    },
    {
     "type": "reference",
     "title": "AI Sandboxing & RLVR Code Execution Hardening",
     "tag": "Week 3 · Security & Infra",
     "entries": [
      {
       "name": "1. Namespace & Filesystem Isolation (unshare / pivot_root)",
       "desc": "Isolate PID tree, network stack, mount table, and UID mappings before executing untrusted LLM code:",
       "code": "# Launch a process in fresh user/PID/net/mount/IPC/UTS namespaces (no external network interfaces).\n# For a read-only rootfs, pivot_root into a prepared root and remount it read-only before exec:\nunshare --user --map-root-user --pid --net --mount --ipc --uts --fork \\\n  sh -c \"mount -t proc proc /proc && exec python3 -I /sandbox/eval_runner.py\""
      },
      {
       "name": "2. cgroups v2 Memory, Swap & Fork-Bomb Limits",
       "desc": "Enforce hard kernel caps so generated code cannot exhaust host RAM or spawn runaway processes:",
       "code": "mkdir -p /sys/fs/cgroup/rlvr_worker_1\necho \"+memory +pids +cpu\" > /sys/fs/cgroup/cgroup.subtree_control    # enable controllers for child cgroups\necho \"536870912\" > /sys/fs/cgroup/rlvr_worker_1/memory.max       # 512 MB hard RAM cap\necho \"0\"         > /sys/fs/cgroup/rlvr_worker_1/memory.swap.max  # Disable swap\necho \"32\"        > /sys/fs/cgroup/rlvr_worker_1/pids.max         # Block fork bombs\necho \"50000 100000\" > /sys/fs/cgroup/rlvr_worker_1/cpu.max       # 50% of 1 CPU core"
      },
      {
       "name": "3. seccomp-bpf Syscall Filter & MicroVM Defense-in-Depth",
       "desc": "Block high-risk kernel syscalls and socket creation inside RLVR grading workers:",
       "code": "// High-priority syscalls to deny via seccomp-bpf (SCMP_ACT_ERRNO(EPERM)):\nDeny: socket(AF_INET/AF_INET6), connect, ptrace, mount, umount2, pivot_root,\n      unshare, setns, kexec_load, bpf, perf_event_open, userfaultfd, keyctl\n// Production layer: Wrap worker inside gVisor (runsc) or Firecracker MicroVM."
      }
     ]
    }
   ]
  }
 ]
};
