export const PROBLEMS = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    status: 'Not Started',
    tags: ['Array', 'Hash Table'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice.',
    examples: [
      'Input: nums = [2,7,11,15], target = 9\\nOutput: [0,1]\\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
      'Input: nums = [3,2,4], target = 6\\nOutput: [1,2]',
    ],
    constraints: [
      '2 <= nums.length <= 1e4',
      '-1e9 <= nums[i] <= 1e9',
      '-1e9 <= target <= 1e9',
      'Only one valid answer exists.',
    ],
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    category: 'Linked List',
    status: 'Attempted',
    tags: ['Linked List', 'Math'],
    description:
      'You are given two non-empty linked lists representing two non-negative integers in reverse order. Add the two numbers and return the sum as a linked list.',
    examples: [
      'Input: l1 = [2,4,3], l2 = [5,6,4]\\nOutput: [7,0,8]\\nExplanation: 342 + 465 = 807.',
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'The list represents a number without leading zeros.',
    ],
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Strings',
    status: 'Solved',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      'Input: s = "abcabcbb"\\nOutput: 3',
      'Input: s = "bbbbb"\\nOutput: 1',
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Arrays',
    status: 'Not Started',
    tags: ['Array', 'Binary Search'],
    description:
      'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    examples: [
      'Input: nums1 = [1,3], nums2 = [2]\\nOutput: 2.0',
      'Input: nums1 = [1,2], nums2 = [3,4]\\nOutput: 2.5',
    ],
    constraints: [
      '0 <= m, n <= 1000',
      '1 <= m + n <= 2000',
      '-1e6 <= nums1[i], nums2[i] <= 1e6',
    ],
  },
  {
    id: '5',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    status: 'Solved',
    tags: ['Linked List'],
    description: 'Given the head of a singly linked list, reverse the list and return it.',
    examples: [
      'Input: head = [1,2,3,4,5]\\nOutput: [5,4,3,2,1]',
    ],
    constraints: [
      'The number of nodes is in the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
  },
]

export const PROBLEMS_BY_ID = PROBLEMS.reduce((acc, p) => {
  acc[p.id] = p
  return acc
}, {})
