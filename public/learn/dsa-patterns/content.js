/* Content for this tracker. The interface is drawn by /learn/app/app.js. */
window.TRACKER = {
 "id": "dsa-patterns",
 "storageKey": "learn_dsa_patterns_v2",
 "legacyKeys": [
  "dsa_patterns_tracker_v1"
 ],
 "start": "today",
 "meta": {
  "kicker": "8-week DSA tracker",
  "title": "DSA",
  "mark": "Patterns",
  "sub": "17 patterns · 136 problems · 8 weeks · spaced reviews and interleaved mocks built in",
  "overviewSub": "Patterns by week, with problems solved solo"
 },
 "labels": {
  "section": "Pattern",
  "sections": "Patterns",
  "item": "problem",
  "items": "problems"
 },
 "looseLabel": "Method",
 "modes": {
  "review": {
   "dailyNew": 4,
   "targetMinutes": {
    "E": 15,
    "M": 25,
    "H": 40
   },
   "difficulty": {
    "E": "Easy",
    "M": "Medium",
    "H": "Hard"
   },
   "weeks": 8,
   "mock": {
    "count": 3,
    "minutes": 75,
    "day": 6
   }
  }
 },
 "groups": [
  {
   "id": "week1",
   "label": "Week 1",
   "sub": "Linear scans",
   "title": "Week 1 · Linear scans",
   "short": "W1",
   "color": "coral"
  },
  {
   "id": "week2",
   "label": "Week 2",
   "sub": "Order and pointers",
   "title": "Week 2 · Order and pointers",
   "short": "W2",
   "color": "teal"
  },
  {
   "id": "week3",
   "label": "Week 3",
   "sub": "Trees and heaps",
   "title": "Week 3 · Trees and heaps",
   "short": "W3",
   "color": "gold"
  },
  {
   "id": "week4",
   "label": "Week 4",
   "sub": "Search spaces",
   "title": "Week 4 · Search spaces",
   "short": "W4",
   "color": "plum"
  },
  {
   "id": "week5",
   "label": "Week 5",
   "sub": "Weighted graphs and DP I",
   "title": "Week 5 · Weighted graphs and DP I",
   "short": "W5",
   "color": "coral"
  },
  {
   "id": "week6",
   "label": "Week 6",
   "sub": "DP II and greedy",
   "title": "Week 6 · DP II and greedy",
   "short": "W6",
   "color": "teal"
  },
  {
   "id": "week7",
   "label": "Week 7",
   "sub": "Bits, design and concurrency",
   "title": "Week 7 · Bits, design and concurrency",
   "short": "W7",
   "color": "gold"
  },
  {
   "id": "week8",
   "label": "Week 8",
   "sub": "Interleaved consolidation",
   "title": "Week 8 · Interleaved consolidation",
   "short": "W8",
   "color": "plum"
  }
 ],
 "sections": [
  {
   "id": "hashing",
   "group": "week1",
   "label": "Arrays & Hashing",
   "sub": "8 problems",
   "title": "Arrays & Hashing",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Need to find pairs, duplicates or counts fast",
      "Order doesn't matter, membership does",
      "Brute force is a nested loop over the same array"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "seen = {}\nfor i, x in enumerate(nums):\n    if target - x in seen:          # look up the complement\n        return [seen[target - x], i]\n    seen[x] = i                     # record after checking"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n) time, O(n) space: trade memory for a single pass.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc217",
       "num": 217,
       "title": "Contains Duplicate",
       "href": "https://leetcode.com/problems/contains-duplicate/",
       "diff": "E"
      },
      {
       "id": "lc242",
       "num": 242,
       "title": "Valid Anagram",
       "href": "https://leetcode.com/problems/valid-anagram/",
       "diff": "E"
      },
      {
       "id": "lc1",
       "num": 1,
       "title": "Two Sum",
       "href": "https://leetcode.com/problems/two-sum/",
       "diff": "E"
      },
      {
       "id": "lc49",
       "num": 49,
       "title": "Group Anagrams",
       "href": "https://leetcode.com/problems/group-anagrams/",
       "diff": "M"
      },
      {
       "id": "lc347",
       "num": 347,
       "title": "Top K Frequent Elements",
       "href": "https://leetcode.com/problems/top-k-frequent-elements/",
       "diff": "M"
      },
      {
       "id": "lc238",
       "num": 238,
       "title": "Product of Array Except Self",
       "href": "https://leetcode.com/problems/product-of-array-except-self/",
       "diff": "M"
      },
      {
       "id": "lc36",
       "num": 36,
       "title": "Valid Sudoku",
       "href": "https://leetcode.com/problems/valid-sudoku/",
       "diff": "M"
      },
      {
       "id": "lc128",
       "num": 128,
       "title": "Longest Consecutive Sequence",
       "href": "https://leetcode.com/problems/longest-consecutive-sequence/",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "two-pointers",
   "group": "week1",
   "label": "Two Pointers",
   "sub": "5 problems",
   "title": "Two Pointers",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Input is sorted, or sorting is cheap",
      "Looking for a pair or triple with a target sum",
      "Palindromes or comparing from both ends"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "l, r = 0, len(a) - 1\nwhile l < r:\n    s = a[l] + a[r]\n    if s == target:\n        return [l, r]\n    if s < target:\n        l += 1          # need a bigger sum\n    else:\n        r -= 1          # need a smaller sum"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n) after an O(n log n) sort, O(1) extra space.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc125",
       "num": 125,
       "title": "Valid Palindrome",
       "href": "https://leetcode.com/problems/valid-palindrome/",
       "diff": "E"
      },
      {
       "id": "lc167",
       "num": 167,
       "title": "Two Sum II - Input Array Is Sorted",
       "href": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
       "diff": "M"
      },
      {
       "id": "lc15",
       "num": 15,
       "title": "3Sum",
       "href": "https://leetcode.com/problems/3sum/",
       "diff": "M"
      },
      {
       "id": "lc11",
       "num": 11,
       "title": "Container With Most Water",
       "href": "https://leetcode.com/problems/container-with-most-water/",
       "diff": "M"
      },
      {
       "id": "lc42",
       "num": 42,
       "title": "Trapping Rain Water",
       "href": "https://leetcode.com/problems/trapping-rain-water/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "sliding-window",
   "group": "week1",
   "label": "Sliding Window",
   "sub": "6 problems",
   "title": "Sliding Window",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Longest / shortest contiguous subarray or substring",
      "A constraint on what the window may contain",
      "Fixed-size window maximum or average"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "count, l, best = {}, 0, 0\nfor r, ch in enumerate(s):\n    count[ch] = count.get(ch, 0) + 1\n    while window_is_invalid(count):   # shrink from the left\n        count[s[l]] -= 1\n        l += 1\n    best = max(best, r - l + 1)"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n): each index enters and leaves the window once.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc121",
       "num": 121,
       "title": "Best Time to Buy and Sell Stock",
       "href": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
       "diff": "E"
      },
      {
       "id": "lc3",
       "num": 3,
       "title": "Longest Substring Without Repeating Characters",
       "href": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
       "diff": "M"
      },
      {
       "id": "lc424",
       "num": 424,
       "title": "Longest Repeating Character Replacement",
       "href": "https://leetcode.com/problems/longest-repeating-character-replacement/",
       "diff": "M"
      },
      {
       "id": "lc567",
       "num": 567,
       "title": "Permutation in String",
       "href": "https://leetcode.com/problems/permutation-in-string/",
       "diff": "M"
      },
      {
       "id": "lc76",
       "num": 76,
       "title": "Minimum Window Substring",
       "href": "https://leetcode.com/problems/minimum-window-substring/",
       "diff": "H"
      },
      {
       "id": "lc239",
       "num": 239,
       "title": "Sliding Window Maximum",
       "href": "https://leetcode.com/problems/sliding-window-maximum/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "stack",
   "group": "week2",
   "label": "Stack & Monotonic Stack",
   "sub": "6 problems",
   "title": "Stack & Monotonic Stack",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Matching brackets or nested structure",
      "Next greater / smaller element",
      "Spans or areas bounded by the nearest smaller value"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "res, stack = [0] * len(t), []   # stack holds indices\nfor i, x in enumerate(t):\n    while stack and t[stack[-1]] < x:\n        j = stack.pop()\n        res[j] = i - j               # days until warmer\n    stack.append(i)"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n): each element is pushed and popped at most once.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc20",
       "num": 20,
       "title": "Valid Parentheses",
       "href": "https://leetcode.com/problems/valid-parentheses/",
       "diff": "E"
      },
      {
       "id": "lc155",
       "num": 155,
       "title": "Min Stack",
       "href": "https://leetcode.com/problems/min-stack/",
       "diff": "M"
      },
      {
       "id": "lc150",
       "num": 150,
       "title": "Evaluate Reverse Polish Notation",
       "href": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
       "diff": "M"
      },
      {
       "id": "lc739",
       "num": 739,
       "title": "Daily Temperatures",
       "href": "https://leetcode.com/problems/daily-temperatures/",
       "diff": "M"
      },
      {
       "id": "lc853",
       "num": 853,
       "title": "Car Fleet",
       "href": "https://leetcode.com/problems/car-fleet/",
       "diff": "M"
      },
      {
       "id": "lc84",
       "num": 84,
       "title": "Largest Rectangle in Histogram",
       "href": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "binary-search",
   "group": "week2",
   "label": "Binary Search",
   "sub": "8 problems",
   "title": "Binary Search",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Sorted or rotated-sorted input",
      "Search the answer space: smallest value that works",
      "A monotonic yes/no feasibility check exists"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "lo, hi = low_bound, high_bound\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if feasible(mid):\n        hi = mid          # mid works; try smaller\n    else:\n        lo = mid + 1\nreturn lo                 # smallest feasible value"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(log n) per search, or O(n log range) when searching the answer.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc704",
       "num": 704,
       "title": "Binary Search",
       "href": "https://leetcode.com/problems/binary-search/",
       "diff": "E"
      },
      {
       "id": "lc74",
       "num": 74,
       "title": "Search a 2D Matrix",
       "href": "https://leetcode.com/problems/search-a-2d-matrix/",
       "diff": "M"
      },
      {
       "id": "lc875",
       "num": 875,
       "title": "Koko Eating Bananas",
       "href": "https://leetcode.com/problems/koko-eating-bananas/",
       "diff": "M"
      },
      {
       "id": "lc153",
       "num": 153,
       "title": "Find Minimum in Rotated Sorted Array",
       "href": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
       "diff": "M"
      },
      {
       "id": "lc33",
       "num": 33,
       "title": "Search in Rotated Sorted Array",
       "href": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
       "diff": "M"
      },
      {
       "id": "lc981",
       "num": 981,
       "title": "Time Based Key-Value Store",
       "href": "https://leetcode.com/problems/time-based-key-value-store/",
       "diff": "M"
      },
      {
       "id": "lc410",
       "num": 410,
       "title": "Split Array Largest Sum",
       "href": "https://leetcode.com/problems/split-array-largest-sum/",
       "diff": "H"
      },
      {
       "id": "lc4",
       "num": 4,
       "title": "Median of Two Sorted Arrays",
       "href": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "linked-list",
   "group": "week2",
   "label": "Linked List",
   "sub": "9 problems",
   "title": "Linked List",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Pointer rewiring without extra memory",
      "Cycle or middle detection: fast and slow pointers",
      "Merging sorted sequences"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "prev, cur = None, head\nwhile cur:\n    nxt = cur.next\n    cur.next = prev        # reverse one link\n    prev, cur = cur, nxt\nreturn prev                # new head"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n) time, O(1) space for in-place rewiring.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc206",
       "num": 206,
       "title": "Reverse Linked List",
       "href": "https://leetcode.com/problems/reverse-linked-list/",
       "diff": "E"
      },
      {
       "id": "lc21",
       "num": 21,
       "title": "Merge Two Sorted Lists",
       "href": "https://leetcode.com/problems/merge-two-sorted-lists/",
       "diff": "E"
      },
      {
       "id": "lc141",
       "num": 141,
       "title": "Linked List Cycle",
       "href": "https://leetcode.com/problems/linked-list-cycle/",
       "diff": "E"
      },
      {
       "id": "lc143",
       "num": 143,
       "title": "Reorder List",
       "href": "https://leetcode.com/problems/reorder-list/",
       "diff": "M"
      },
      {
       "id": "lc19",
       "num": 19,
       "title": "Remove Nth Node From End of List",
       "href": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
       "diff": "M"
      },
      {
       "id": "lc138",
       "num": 138,
       "title": "Copy List with Random Pointer",
       "href": "https://leetcode.com/problems/copy-list-with-random-pointer/",
       "diff": "M"
      },
      {
       "id": "lc2",
       "num": 2,
       "title": "Add Two Numbers",
       "href": "https://leetcode.com/problems/add-two-numbers/",
       "diff": "M"
      },
      {
       "id": "lc146",
       "num": 146,
       "title": "LRU Cache",
       "href": "https://leetcode.com/problems/lru-cache/",
       "diff": "M"
      },
      {
       "id": "lc23",
       "num": 23,
       "title": "Merge k Sorted Lists",
       "href": "https://leetcode.com/problems/merge-k-sorted-lists/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "trees",
   "group": "week3",
   "label": "Trees (DFS & BFS)",
   "sub": "12 problems",
   "title": "Trees (DFS & BFS)",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Answer depends on the answers of subtrees (DFS)",
      "Level-by-level questions (BFS)",
      "BST ordering lets you prune or traverse in order"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "def dfs(node):\n    if not node:\n        return 0\n    left, right = dfs(node.left), dfs(node.right)\n    # update a global answer here if the path can bend\n    return 1 + max(left, right)\n\nq = deque([root])          # BFS, one level per loop\nwhile q:\n    for _ in range(len(q)):\n        node = q.popleft()\n        q.extend(c for c in (node.left, node.right) if c)"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n) time, O(h) stack for DFS or O(width) queue for BFS.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc226",
       "num": 226,
       "title": "Invert Binary Tree",
       "href": "https://leetcode.com/problems/invert-binary-tree/",
       "diff": "E"
      },
      {
       "id": "lc104",
       "num": 104,
       "title": "Maximum Depth of Binary Tree",
       "href": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
       "diff": "E"
      },
      {
       "id": "lc543",
       "num": 543,
       "title": "Diameter of Binary Tree",
       "href": "https://leetcode.com/problems/diameter-of-binary-tree/",
       "diff": "E"
      },
      {
       "id": "lc572",
       "num": 572,
       "title": "Subtree of Another Tree",
       "href": "https://leetcode.com/problems/subtree-of-another-tree/",
       "diff": "E"
      },
      {
       "id": "lc235",
       "num": 235,
       "title": "Lowest Common Ancestor of a Binary Search Tree",
       "href": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
       "diff": "M"
      },
      {
       "id": "lc102",
       "num": 102,
       "title": "Binary Tree Level Order Traversal",
       "href": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
       "diff": "M"
      },
      {
       "id": "lc199",
       "num": 199,
       "title": "Binary Tree Right Side View",
       "href": "https://leetcode.com/problems/binary-tree-right-side-view/",
       "diff": "M"
      },
      {
       "id": "lc98",
       "num": 98,
       "title": "Validate Binary Search Tree",
       "href": "https://leetcode.com/problems/validate-binary-search-tree/",
       "diff": "M"
      },
      {
       "id": "lc230",
       "num": 230,
       "title": "Kth Smallest Element in a BST",
       "href": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
       "diff": "M"
      },
      {
       "id": "lc105",
       "num": 105,
       "title": "Construct Binary Tree from Preorder and Inorder Traversal",
       "href": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
       "diff": "M"
      },
      {
       "id": "lc124",
       "num": 124,
       "title": "Binary Tree Maximum Path Sum",
       "href": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
       "diff": "H"
      },
      {
       "id": "lc297",
       "num": 297,
       "title": "Serialize and Deserialize Binary Tree",
       "href": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "tries",
   "group": "week3",
   "label": "Tries",
   "sub": "3 problems",
   "title": "Tries",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Many lookups by prefix",
      "Searching a grid or stream for a set of words",
      "Wildcard character matching"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "class TrieNode:\n    def __init__(self):\n        self.children, self.end = {}, False\n\ndef insert(root, word):\n    node = root\n    for ch in word:\n        node = node.children.setdefault(ch, TrieNode())\n    node.end = True"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(L) per insert or search for a word of length L.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc208",
       "num": 208,
       "title": "Implement Trie (Prefix Tree)",
       "href": "https://leetcode.com/problems/implement-trie-prefix-tree/",
       "diff": "M"
      },
      {
       "id": "lc211",
       "num": 211,
       "title": "Design Add and Search Words Data Structure",
       "href": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
       "diff": "M"
      },
      {
       "id": "lc212",
       "num": 212,
       "title": "Word Search II",
       "href": "https://leetcode.com/problems/word-search-ii/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "heap",
   "group": "week3",
   "label": "Heap / Priority Queue",
   "sub": "7 problems",
   "title": "Heap / Priority Queue",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Top-k, k-th largest or k closest",
      "Repeatedly take the min or max as data changes",
      "Merging k sorted streams; running median"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "heap = []\nfor x in nums:\n    heapq.heappush(heap, x)\n    if len(heap) > k:\n        heapq.heappop(heap)   # drop the smallest\nreturn heap[0]                # k-th largest"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n log k) for top-k with a size-k heap.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc703",
       "num": 703,
       "title": "Kth Largest Element in a Stream",
       "href": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
       "diff": "E"
      },
      {
       "id": "lc1046",
       "num": 1046,
       "title": "Last Stone Weight",
       "href": "https://leetcode.com/problems/last-stone-weight/",
       "diff": "E"
      },
      {
       "id": "lc973",
       "num": 973,
       "title": "K Closest Points to Origin",
       "href": "https://leetcode.com/problems/k-closest-points-to-origin/",
       "diff": "M"
      },
      {
       "id": "lc215",
       "num": 215,
       "title": "Kth Largest Element in an Array",
       "href": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
       "diff": "M"
      },
      {
       "id": "lc621",
       "num": 621,
       "title": "Task Scheduler",
       "href": "https://leetcode.com/problems/task-scheduler/",
       "diff": "M"
      },
      {
       "id": "lc355",
       "num": 355,
       "title": "Design Twitter",
       "href": "https://leetcode.com/problems/design-twitter/",
       "diff": "M"
      },
      {
       "id": "lc295",
       "num": 295,
       "title": "Find Median from Data Stream",
       "href": "https://leetcode.com/problems/find-median-from-data-stream/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "backtracking",
   "group": "week4",
   "label": "Backtracking",
   "sub": "9 problems",
   "title": "Backtracking",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Generate all subsets, permutations or combinations",
      "Constraint satisfaction: place, check, undo",
      "Input is small (n ≤ ~20)"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "res, path = [], []\ndef backtrack(start):\n    res.append(path[:])            # record a copy\n    for i in range(start, len(nums)):\n        path.append(nums[i])       # choose\n        backtrack(i + 1)           # explore\n        path.pop()                 # undo\nbacktrack(0)"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>Exponential, e.g. O(n · 2^n) for subsets; prune early.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc78",
       "num": 78,
       "title": "Subsets",
       "href": "https://leetcode.com/problems/subsets/",
       "diff": "M"
      },
      {
       "id": "lc39",
       "num": 39,
       "title": "Combination Sum",
       "href": "https://leetcode.com/problems/combination-sum/",
       "diff": "M"
      },
      {
       "id": "lc46",
       "num": 46,
       "title": "Permutations",
       "href": "https://leetcode.com/problems/permutations/",
       "diff": "M"
      },
      {
       "id": "lc90",
       "num": 90,
       "title": "Subsets II",
       "href": "https://leetcode.com/problems/subsets-ii/",
       "diff": "M"
      },
      {
       "id": "lc40",
       "num": 40,
       "title": "Combination Sum II",
       "href": "https://leetcode.com/problems/combination-sum-ii/",
       "diff": "M"
      },
      {
       "id": "lc79",
       "num": 79,
       "title": "Word Search",
       "href": "https://leetcode.com/problems/word-search/",
       "diff": "M"
      },
      {
       "id": "lc131",
       "num": 131,
       "title": "Palindrome Partitioning",
       "href": "https://leetcode.com/problems/palindrome-partitioning/",
       "diff": "M"
      },
      {
       "id": "lc17",
       "num": 17,
       "title": "Letter Combinations of a Phone Number",
       "href": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
       "diff": "M"
      },
      {
       "id": "lc51",
       "num": 51,
       "title": "N-Queens",
       "href": "https://leetcode.com/problems/n-queens/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "graphs",
   "group": "week4",
   "label": "Graphs (BFS, DFS, Union-Find)",
   "sub": "11 problems",
   "title": "Graphs (BFS, DFS, Union-Find)",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Grids of islands, regions or spreading",
      "Dependencies and ordering (topological sort)",
      "Connectivity and cycle detection in undirected graphs"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "indeg, adj = [0] * n, defaultdict(list)\nfor a, b in prereqs:           # b must come before a\n    adj[b].append(a)\n    indeg[a] += 1\nq = deque(i for i in range(n) if indeg[i] == 0)\norder = []\nwhile q:\n    u = q.popleft()\n    order.append(u)\n    for v in adj[u]:\n        indeg[v] -= 1\n        if indeg[v] == 0:\n            q.append(v)\nreturn order if len(order) == n else []   # [] means a cycle"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(V + E) traversal; near O(1) amortised union-find.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc200",
       "num": 200,
       "title": "Number of Islands",
       "href": "https://leetcode.com/problems/number-of-islands/",
       "diff": "M"
      },
      {
       "id": "lc133",
       "num": 133,
       "title": "Clone Graph",
       "href": "https://leetcode.com/problems/clone-graph/",
       "diff": "M"
      },
      {
       "id": "lc695",
       "num": 695,
       "title": "Max Area of Island",
       "href": "https://leetcode.com/problems/max-area-of-island/",
       "diff": "M"
      },
      {
       "id": "lc417",
       "num": 417,
       "title": "Pacific Atlantic Water Flow",
       "href": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
       "diff": "M"
      },
      {
       "id": "lc130",
       "num": 130,
       "title": "Surrounded Regions",
       "href": "https://leetcode.com/problems/surrounded-regions/",
       "diff": "M"
      },
      {
       "id": "lc994",
       "num": 994,
       "title": "Rotting Oranges",
       "href": "https://leetcode.com/problems/rotting-oranges/",
       "diff": "M"
      },
      {
       "id": "lc207",
       "num": 207,
       "title": "Course Schedule",
       "href": "https://leetcode.com/problems/course-schedule/",
       "diff": "M"
      },
      {
       "id": "lc210",
       "num": 210,
       "title": "Course Schedule II",
       "href": "https://leetcode.com/problems/course-schedule-ii/",
       "diff": "M"
      },
      {
       "id": "lc684",
       "num": 684,
       "title": "Redundant Connection",
       "href": "https://leetcode.com/problems/redundant-connection/",
       "diff": "M"
      },
      {
       "id": "lc547",
       "num": 547,
       "title": "Number of Provinces",
       "href": "https://leetcode.com/problems/number-of-provinces/",
       "diff": "M"
      },
      {
       "id": "lc127",
       "num": 127,
       "title": "Word Ladder",
       "href": "https://leetcode.com/problems/word-ladder/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "adv-graphs",
   "group": "week5",
   "label": "Advanced Graphs",
   "sub": "5 problems",
   "title": "Advanced Graphs",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Weighted shortest path (Dijkstra)",
      "Minimum spanning tree (Prim / Kruskal)",
      "Shortest path with a limit on stops (Bellman-Ford style)"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "dist = {src: 0}\npq = [(0, src)]\nwhile pq:\n    d, u = heapq.heappop(pq)\n    if d > dist.get(u, inf):\n        continue                    # stale entry\n    for v, w in adj[u]:\n        nd = d + w\n        if nd < dist.get(v, inf):\n            dist[v] = nd\n            heapq.heappush(pq, (nd, v))"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>Dijkstra O(E log V) with a heap.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc743",
       "num": 743,
       "title": "Network Delay Time",
       "href": "https://leetcode.com/problems/network-delay-time/",
       "diff": "M"
      },
      {
       "id": "lc1584",
       "num": 1584,
       "title": "Min Cost to Connect All Points",
       "href": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
       "diff": "M"
      },
      {
       "id": "lc787",
       "num": 787,
       "title": "Cheapest Flights Within K Stops",
       "href": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
       "diff": "M"
      },
      {
       "id": "lc778",
       "num": 778,
       "title": "Swim in Rising Water",
       "href": "https://leetcode.com/problems/swim-in-rising-water/",
       "diff": "H"
      },
      {
       "id": "lc332",
       "num": 332,
       "title": "Reconstruct Itinerary",
       "href": "https://leetcode.com/problems/reconstruct-itinerary/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "dp-1d",
   "group": "week5",
   "label": "1-D Dynamic Programming",
   "sub": "11 problems",
   "title": "1-D Dynamic Programming",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Count ways, or min / max over choices along a sequence",
      "The answer at i depends on a few earlier answers",
      "Brute-force recursion repeats the same subproblems"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "# State: best total using houses[:i]. Transition: skip or take.\nprev2, prev1 = 0, 0\nfor x in nums:\n    prev2, prev1 = prev1, max(prev1, prev2 + x)\nreturn prev1"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>Usually O(n) or O(n²) time; often O(1) space with rolling variables.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc70",
       "num": 70,
       "title": "Climbing Stairs",
       "href": "https://leetcode.com/problems/climbing-stairs/",
       "diff": "E"
      },
      {
       "id": "lc746",
       "num": 746,
       "title": "Min Cost Climbing Stairs",
       "href": "https://leetcode.com/problems/min-cost-climbing-stairs/",
       "diff": "E"
      },
      {
       "id": "lc198",
       "num": 198,
       "title": "House Robber",
       "href": "https://leetcode.com/problems/house-robber/",
       "diff": "M"
      },
      {
       "id": "lc213",
       "num": 213,
       "title": "House Robber II",
       "href": "https://leetcode.com/problems/house-robber-ii/",
       "diff": "M"
      },
      {
       "id": "lc5",
       "num": 5,
       "title": "Longest Palindromic Substring",
       "href": "https://leetcode.com/problems/longest-palindromic-substring/",
       "diff": "M"
      },
      {
       "id": "lc91",
       "num": 91,
       "title": "Decode Ways",
       "href": "https://leetcode.com/problems/decode-ways/",
       "diff": "M"
      },
      {
       "id": "lc322",
       "num": 322,
       "title": "Coin Change",
       "href": "https://leetcode.com/problems/coin-change/",
       "diff": "M"
      },
      {
       "id": "lc152",
       "num": 152,
       "title": "Maximum Product Subarray",
       "href": "https://leetcode.com/problems/maximum-product-subarray/",
       "diff": "M"
      },
      {
       "id": "lc139",
       "num": 139,
       "title": "Word Break",
       "href": "https://leetcode.com/problems/word-break/",
       "diff": "M"
      },
      {
       "id": "lc300",
       "num": 300,
       "title": "Longest Increasing Subsequence",
       "href": "https://leetcode.com/problems/longest-increasing-subsequence/",
       "diff": "M"
      },
      {
       "id": "lc416",
       "num": 416,
       "title": "Partition Equal Subset Sum",
       "href": "https://leetcode.com/problems/partition-equal-subset-sum/",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "dp-2d",
   "group": "week6",
   "label": "2-D Dynamic Programming",
   "sub": "9 problems",
   "title": "2-D Dynamic Programming",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Two sequences compared (LCS, edit distance)",
      "Grid paths",
      "Knapsack: items × capacity"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "dp = [[0] * (n + 1) for _ in range(m + 1)]\nfor i in range(m - 1, -1, -1):\n    for j in range(n - 1, -1, -1):\n        if a[i] == b[j]:\n            dp[i][j] = 1 + dp[i + 1][j + 1]\n        else:\n            dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])\nreturn dp[0][0]"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(m · n) time; space can often drop to one row.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc62",
       "num": 62,
       "title": "Unique Paths",
       "href": "https://leetcode.com/problems/unique-paths/",
       "diff": "M"
      },
      {
       "id": "lc1143",
       "num": 1143,
       "title": "Longest Common Subsequence",
       "href": "https://leetcode.com/problems/longest-common-subsequence/",
       "diff": "M"
      },
      {
       "id": "lc309",
       "num": 309,
       "title": "Best Time to Buy and Sell Stock with Cooldown",
       "href": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
       "diff": "M"
      },
      {
       "id": "lc518",
       "num": 518,
       "title": "Coin Change II",
       "href": "https://leetcode.com/problems/coin-change-ii/",
       "diff": "M"
      },
      {
       "id": "lc494",
       "num": 494,
       "title": "Target Sum",
       "href": "https://leetcode.com/problems/target-sum/",
       "diff": "M"
      },
      {
       "id": "lc97",
       "num": 97,
       "title": "Interleaving String",
       "href": "https://leetcode.com/problems/interleaving-string/",
       "diff": "M"
      },
      {
       "id": "lc72",
       "num": 72,
       "title": "Edit Distance",
       "href": "https://leetcode.com/problems/edit-distance/",
       "diff": "M"
      },
      {
       "id": "lc312",
       "num": 312,
       "title": "Burst Balloons",
       "href": "https://leetcode.com/problems/burst-balloons/",
       "diff": "H"
      },
      {
       "id": "lc10",
       "num": 10,
       "title": "Regular Expression Matching",
       "href": "https://leetcode.com/problems/regular-expression-matching/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "greedy-intervals",
   "group": "week6",
   "label": "Greedy & Intervals",
   "sub": "10 problems",
   "title": "Greedy & Intervals",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "A locally best choice can be proven safe",
      "Overlapping ranges: merge, insert or remove",
      "Sort by start or end first"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "intervals.sort(key=lambda x: x[0])\nmerged = [intervals[0]]\nfor s, e in intervals[1:]:\n    if s <= merged[-1][1]:                  # overlaps\n        merged[-1][1] = max(merged[-1][1], e)\n    else:\n        merged.append([s, e])"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>O(n log n) for the sort, O(n) for the sweep.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc53",
       "num": 53,
       "title": "Maximum Subarray",
       "href": "https://leetcode.com/problems/maximum-subarray/",
       "diff": "M"
      },
      {
       "id": "lc55",
       "num": 55,
       "title": "Jump Game",
       "href": "https://leetcode.com/problems/jump-game/",
       "diff": "M"
      },
      {
       "id": "lc45",
       "num": 45,
       "title": "Jump Game II",
       "href": "https://leetcode.com/problems/jump-game-ii/",
       "diff": "M"
      },
      {
       "id": "lc134",
       "num": 134,
       "title": "Gas Station",
       "href": "https://leetcode.com/problems/gas-station/",
       "diff": "M"
      },
      {
       "id": "lc846",
       "num": 846,
       "title": "Hand of Straights",
       "href": "https://leetcode.com/problems/hand-of-straights/",
       "diff": "M"
      },
      {
       "id": "lc763",
       "num": 763,
       "title": "Partition Labels",
       "href": "https://leetcode.com/problems/partition-labels/",
       "diff": "M"
      },
      {
       "id": "lc57",
       "num": 57,
       "title": "Insert Interval",
       "href": "https://leetcode.com/problems/insert-interval/",
       "diff": "M"
      },
      {
       "id": "lc56",
       "num": 56,
       "title": "Merge Intervals",
       "href": "https://leetcode.com/problems/merge-intervals/",
       "diff": "M"
      },
      {
       "id": "lc435",
       "num": 435,
       "title": "Non-overlapping Intervals",
       "href": "https://leetcode.com/problems/non-overlapping-intervals/",
       "diff": "M"
      },
      {
       "id": "lc1851",
       "num": 1851,
       "title": "Minimum Interval to Include Each Query",
       "href": "https://leetcode.com/problems/minimum-interval-to-include-each-query/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "bits-math",
   "group": "week7",
   "label": "Bit Manipulation & Math",
   "sub": "9 problems",
   "title": "Bit Manipulation & Math",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Pairs cancel out (XOR)",
      "Count or flip bits without strings",
      "Matrix rotation and traversal, fast exponentiation"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "x & (x - 1)    # clear the lowest set bit\nx & -x         # isolate the lowest set bit\nres = 0\nfor x in nums:\n    res ^= x       # duplicates cancel, the single number remains"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>Typically O(n) or O(log n) with O(1) space.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc136",
       "num": 136,
       "title": "Single Number",
       "href": "https://leetcode.com/problems/single-number/",
       "diff": "E"
      },
      {
       "id": "lc191",
       "num": 191,
       "title": "Number of 1 Bits",
       "href": "https://leetcode.com/problems/number-of-1-bits/",
       "diff": "E"
      },
      {
       "id": "lc338",
       "num": 338,
       "title": "Counting Bits",
       "href": "https://leetcode.com/problems/counting-bits/",
       "diff": "E"
      },
      {
       "id": "lc190",
       "num": 190,
       "title": "Reverse Bits",
       "href": "https://leetcode.com/problems/reverse-bits/",
       "diff": "E"
      },
      {
       "id": "lc268",
       "num": 268,
       "title": "Missing Number",
       "href": "https://leetcode.com/problems/missing-number/",
       "diff": "E"
      },
      {
       "id": "lc371",
       "num": 371,
       "title": "Sum of Two Integers",
       "href": "https://leetcode.com/problems/sum-of-two-integers/",
       "diff": "M"
      },
      {
       "id": "lc48",
       "num": 48,
       "title": "Rotate Image",
       "href": "https://leetcode.com/problems/rotate-image/",
       "diff": "M"
      },
      {
       "id": "lc54",
       "num": 54,
       "title": "Spiral Matrix",
       "href": "https://leetcode.com/problems/spiral-matrix/",
       "diff": "M"
      },
      {
       "id": "lc50",
       "num": 50,
       "title": "Pow(x, n)",
       "href": "https://leetcode.com/problems/powx-n/",
       "diff": "M"
      }
     ]
    }
   ]
  },
  {
   "id": "concurrency-design",
   "group": "week7",
   "label": "Concurrency & Design",
   "sub": "8 problems",
   "title": "Concurrency & Design",
   "blocks": [
    {
     "type": "list",
     "title": "Reach for it when",
     "items": [
      "Implement a data structure with O(1) operations",
      "Threads must take turns or share a bounded buffer",
      "Systems-flavoured interview rounds"
     ]
    },
    {
     "type": "code",
     "title": "Template (Python)",
     "code": "class BoundedQueue:\n    def __init__(self, cap):\n        self.q, self.cap = deque(), cap\n        self.cv = threading.Condition()\n\n    def put(self, x):\n        with self.cv:\n            self.cv.wait_for(lambda: len(self.q) < self.cap)\n            self.q.append(x)\n            self.cv.notify_all()\n\n    def get(self):\n        with self.cv:\n            self.cv.wait_for(lambda: self.q)\n            x = self.q.popleft()\n            self.cv.notify_all()\n            return x"
    },
    {
     "type": "text",
     "title": "Complexity",
     "html": "<p>Aim for O(1) per operation; correctness under interleaving first.</p>"
    },
    {
     "type": "problems",
     "title": "Problems",
     "hint": "Start opens LeetCode and times you; grade honestly when you finish",
     "items": [
      {
       "id": "lc1114",
       "num": 1114,
       "title": "Print in Order",
       "href": "https://leetcode.com/problems/print-in-order/",
       "diff": "E"
      },
      {
       "id": "lc1115",
       "num": 1115,
       "title": "Print FooBar Alternately",
       "href": "https://leetcode.com/problems/print-foobar-alternately/",
       "diff": "M"
      },
      {
       "id": "lc1117",
       "num": 1117,
       "title": "Building H2O",
       "href": "https://leetcode.com/problems/building-h2o/",
       "diff": "M"
      },
      {
       "id": "lc1226",
       "num": 1226,
       "title": "The Dining Philosophers",
       "href": "https://leetcode.com/problems/the-dining-philosophers/",
       "diff": "M"
      },
      {
       "id": "lc622",
       "num": 622,
       "title": "Design Circular Queue",
       "href": "https://leetcode.com/problems/design-circular-queue/",
       "diff": "M"
      },
      {
       "id": "lc380",
       "num": 380,
       "title": "Insert Delete GetRandom O(1)",
       "href": "https://leetcode.com/problems/insert-delete-getrandom-o1/",
       "diff": "M"
      },
      {
       "id": "lc1396",
       "num": 1396,
       "title": "Design Underground System",
       "href": "https://leetcode.com/problems/design-underground-system/",
       "diff": "M"
      },
      {
       "id": "lc460",
       "num": 460,
       "title": "LFU Cache",
       "href": "https://leetcode.com/problems/lfu-cache/",
       "diff": "H"
      }
     ]
    }
   ]
  },
  {
   "id": "consolidation",
   "group": "week8",
   "label": "Consolidation",
   "title": "Interleaved consolidation",
   "sub": "No new patterns",
   "blocks": [
    {
     "type": "text",
     "html": "<p>No new patterns this week. Each day: clear every review, run a mixed mock from <a href=\"#today\">Today</a>, and re-solve problems from your weakest patterns.</p>"
    }
   ]
  },
  {
   "id": "plan",
   "label": "Plan & method",
   "title": "Plan and method",
   "sub": "8-week plan, weekly rhythm and why it works",
   "blocks": [
    {
     "type": "table",
     "title": "8-week plan",
     "hint": "week 1 starts with your first attempt",
     "head": [
      "Week",
      "Focus",
      "Patterns",
      "Problems"
     ],
     "rows": [
      [
       "<strong>Week 1</strong>",
       "Linear scans",
       "<a href=\"#hashing\">Arrays &amp; Hashing</a>, <a href=\"#two-pointers\">Two Pointers</a>, <a href=\"#sliding-window\">Sliding Window</a>",
       "19"
      ],
      [
       "<strong>Week 2</strong>",
       "Order and pointers",
       "<a href=\"#stack\">Stack &amp; Monotonic Stack</a>, <a href=\"#binary-search\">Binary Search</a>, <a href=\"#linked-list\">Linked List</a>",
       "23"
      ],
      [
       "<strong>Week 3</strong>",
       "Trees and heaps",
       "<a href=\"#trees\">Trees (DFS &amp; BFS)</a>, <a href=\"#tries\">Tries</a>, <a href=\"#heap\">Heap / Priority Queue</a>",
       "22"
      ],
      [
       "<strong>Week 4</strong>",
       "Search spaces",
       "<a href=\"#backtracking\">Backtracking</a>, <a href=\"#graphs\">Graphs (BFS, DFS, Union-Find)</a>",
       "20"
      ],
      [
       "<strong>Week 5</strong>",
       "Weighted graphs and DP I",
       "<a href=\"#adv-graphs\">Advanced Graphs</a>, <a href=\"#dp-1d\">1-D Dynamic Programming</a>",
       "16"
      ],
      [
       "<strong>Week 6</strong>",
       "DP II and greedy",
       "<a href=\"#dp-2d\">2-D Dynamic Programming</a>, <a href=\"#greedy-intervals\">Greedy &amp; Intervals</a>",
       "19"
      ],
      [
       "<strong>Week 7</strong>",
       "Bits, design and concurrency",
       "<a href=\"#bits-math\">Bit Manipulation &amp; Math</a>, <a href=\"#concurrency-design\">Concurrency &amp; Design</a>",
       "17"
      ],
      [
       "<strong>Week 8</strong>",
       "Interleaved consolidation",
       "No new patterns: daily mixed mocks, clear every review, re-solve your weakest patterns.",
       "–"
      ]
     ]
    },
    {
     "type": "table",
     "title": "Weekly rhythm",
     "hint": "about 1.5–2.5 hours on study days",
     "head": [
      "Day",
      "What to do"
     ],
     "rows": [
      [
       "<strong>Mon</strong>",
       "Reviews due, then about 4 new problems from this week's pattern. Read the pattern card first."
      ],
      [
       "<strong>Tue</strong>",
       "Reviews, then new problems."
      ],
      [
       "<strong>Wed</strong>",
       "Reviews, then new problems. Start the week's second pattern."
      ],
      [
       "<strong>Thu</strong>",
       "Reviews, then new problems."
      ],
      [
       "<strong>Fri</strong>",
       "Reviews, then the week's hardest problems."
      ],
      [
       "<strong>Sat</strong>",
       "Interleaved mock: 3 mixed solved problems in ~75 minutes."
      ],
      [
       "<strong>Sun</strong>",
       "Reviews only, or rest. Write one-line insights for the week."
      ]
     ]
    },
    {
     "type": "text",
     "title": "How this tracker works, and why",
     "html": "<p><strong>Learn by pattern, then mix.</strong> Each week introduces one to three patterns so you can learn a template and its cues in a block. Saturday mocks and week 8 then mix patterns, because interviews don't tell you which pattern to use. Research on interleaved practice finds that mixing problem types improves the ability to tell them apart, with a moderate average benefit (Brunmair &amp; Richter, 2019, <em>Psychological Bulletin</em>).</p>\n                    <p><strong>Re-solve on a spaced schedule.</strong> Every solve is scheduled for review: first after 1 day, then 3, then at growing gaps based on how it went (a simplified SM-2 scheme, as used in flashcard apps). Spaced retrieval is one of the most reliable findings in learning science (<a href=\"https://www.nature.com/articles/s44159-022-00089-1\" target=\"_blank\" rel=\"noopener noreferrer\">Carpenter, Pan &amp; Butler, 2022, <em>Nature Reviews Psychology</em></a>). Evidence specific to coding interviews is thin, so treat the intervals as a sensible default rather than a proven formula.</p>\n                    <p><strong>Recall, not recognition.</strong> A review means solving again from a blank editor. Reading your old code only feels like learning. That is also why grading matters: <em>Saw solution</em> and <em>Needed hints</em> bring a problem back tomorrow, and only <em>Solved solo</em> lets the gap grow. As <a href=\"https://www.redgreencode.com/leetcode-tip-10-planning-a-spaced-repetition-schedule/\" target=\"_blank\" rel=\"noopener noreferrer\">Red-Green-Code</a> puts it, you can only solve a problem on demand if you have practised solving it from scratch.</p>\n                    <p><strong>Practise against the clock.</strong> Target times are 15 / 25 / 40 minutes for easy / medium / hard. Published guidance ranges from about 20–45 minutes for a medium and 35–60 for a hard, so these sit in the middle. Going over is fine while learning; the timer records it so you can watch it fall.</p>\n                    <p><strong>A mastered problem</strong> has been solved solo at least three times with the review gap at two weeks or more.</p>\n                    <p>Problem set: 136 free LeetCode problems across 17 patterns, close to the widely used NeetCode 150 core, plus a concurrency and design set for systems-flavoured interviews. Premium-only problems are excluded.</p>"
    }
   ]
  }
 ]
};
