export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  testCases: TestCase[];
  starterCode: string;
  functionName: string;
  category: string;
}

export interface TestCase {
  input: unknown[];
  expected: unknown;
  description: string;
}

export const CODING_PROBLEMS: CodingProblem[] = [
  // EASY PROBLEMS
  {
    id: '1',
    title: 'Two Sum',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
    difficulty: 'easy',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'nums = [2,7,11,15], target = 9' },
      { input: [[3, 2, 4], 6], expected: [1, 2], description: 'nums = [3,2,4], target = 6' },
      { input: [[3, 3], 6], expected: [0, 1], description: 'nums = [3,3], target = 6' }
    ]
  },
  {
    id: '2',
    title: 'Reverse String',
    category: 'Strings',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    difficulty: 'easy',
    functionName: 'reverseString',
    starterCode: `function reverseString(s) {
  // Modify s in-place and return it
  
}`,
    testCases: [
      { input: [['h', 'e', 'l', 'l', 'o']], expected: ['o', 'l', 'l', 'e', 'h'], description: 's = ["h","e","l","l","o"]' },
      { input: [['H', 'a', 'n', 'n', 'a', 'h']], expected: ['h', 'a', 'n', 'n', 'a', 'H'], description: 's = ["H","a","n","n","a","h"]' }
    ]
  },
  {
    id: '3',
    title: 'Valid Palindrome',
    category: 'Strings',
    description: 'Check if a phrase is a palindrome, ignoring non-alphanumeric characters and case.',
    difficulty: 'easy',
    functionName: 'isPalindrome',
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ['A man, a plan, a canal: Panama'], expected: true, description: 'Palindrome phrase' },
      { input: ['race a car'], expected: false, description: 'Not a palindrome' },
      { input: [' '], expected: true, description: 'Empty string' }
    ]
  },
  {
    id: '4',
    title: 'FizzBuzz',
    category: 'Logic',
    description: 'Return an array where for multiples of 3 print "Fizz", multiples of 5 print "Buzz", and multiples of both print "FizzBuzz".',
    difficulty: 'easy',
    functionName: 'fizzBuzz',
    starterCode: `function fizzBuzz(n) {
  // Return array of strings from 1 to n
  
}`,
    testCases: [
      { input: [3], expected: ['1', '2', 'Fizz'], description: 'n = 3' },
      { input: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'], description: 'n = 5' },
      { input: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'], description: 'n = 15' }
    ]
  },
  {
    id: '5',
    title: 'Find Maximum',
    category: 'Arrays',
    description: 'Find and return the maximum number in an array.',
    difficulty: 'easy',
    functionName: 'findMax',
    starterCode: `function findMax(nums) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[1, 5, 3, 9, 2]], expected: 9, description: 'nums = [1,5,3,9,2]' },
      { input: [[-10, -5, -3, -1]], expected: -1, description: 'All negative numbers' },
      { input: [[42]], expected: 42, description: 'Single element' }
    ]
  },
  {
    id: '6',
    title: 'Count Vowels',
    category: 'Strings',
    description: 'Count the number of vowels (a, e, i, o, u) in a string (case insensitive).',
    difficulty: 'easy',
    functionName: 'countVowels',
    starterCode: `function countVowels(str) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ['hello'], expected: 2, description: 'str = "hello"' },
      { input: ['AEIOU'], expected: 5, description: 'All uppercase vowels' },
      { input: ['xyz'], expected: 0, description: 'No vowels' }
    ]
  },

  // MEDIUM PROBLEMS
  {
    id: '7',
    title: 'Longest Substring Without Repeating',
    category: 'Strings',
    description: 'Find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    functionName: 'lengthOfLongestSubstring',
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ['abcabcbb'], expected: 3, description: 'Answer is "abc"' },
      { input: ['bbbbb'], expected: 1, description: 'Answer is "b"' },
      { input: ['pwwkew'], expected: 3, description: 'Answer is "wke"' }
    ]
  },
  {
    id: '8',
    title: 'Group Anagrams',
    category: 'Strings',
    description: 'Group anagrams together from an array of strings.',
    difficulty: 'medium',
    functionName: 'groupAnagrams',
    starterCode: `function groupAnagrams(strs) {
  // Return array of grouped anagrams
  
}`,
    testCases: [
      { 
        input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], 
        expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']], 
        description: 'Group anagrams together' 
      }
    ]
  },
  {
    id: '9',
    title: 'Valid Parentheses',
    category: 'Stacks',
    description: 'Check if a string of parentheses is valid. Valid means every opening bracket has a corresponding closing bracket in the correct order.',
    difficulty: 'medium',
    functionName: 'isValidParentheses',
    starterCode: `function isValidParentheses(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ['()'], expected: true, description: 'Simple valid' },
      { input: ['()[]{}'], expected: true, description: 'Multiple types' },
      { input: ['(]'], expected: false, description: 'Wrong closing' },
      { input: ['([)]'], expected: false, description: 'Wrong order' }
    ]
  },
  {
    id: '10',
    title: 'Merge Intervals',
    category: 'Arrays',
    description: 'Merge overlapping intervals.',
    difficulty: 'medium',
    functionName: 'mergeIntervals',
    starterCode: `function mergeIntervals(intervals) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]], description: 'Merge overlapping' },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]], description: 'Adjacent intervals' }
    ]
  },
  {
    id: '11',
    title: 'Binary Search',
    category: 'Searching',
    description: 'Implement binary search. Return the index of target in a sorted array, or -1 if not found.',
    difficulty: 'medium',
    functionName: 'binarySearch',
    starterCode: `function binarySearch(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, description: 'Target in middle' },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, description: 'Target not found' },
      { input: [[5], 5], expected: 0, description: 'Single element' }
    ]
  },
  {
    id: '12',
    title: 'Rotate Array',
    category: 'Arrays',
    description: 'Rotate an array to the right by k steps.',
    difficulty: 'medium',
    functionName: 'rotateArray',
    starterCode: `function rotateArray(nums, k) {
  // Modify nums in-place and return it
  
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], description: 'Rotate by 3' },
      { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], description: 'Rotate by 2' }
    ]
  },

  // HARD PROBLEMS
  {
    id: '13',
    title: 'Median of Two Sorted Arrays',
    category: 'Arrays',
    description: 'Find the median of two sorted arrays.',
    difficulty: 'hard',
    functionName: 'findMedianSortedArrays',
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[1, 3], [2]], expected: 2.0, description: 'Median is 2' },
      { input: [[1, 2], [3, 4]], expected: 2.5, description: 'Median is 2.5' }
    ]
  },
  {
    id: '14',
    title: 'Trapping Rain Water',
    category: 'Arrays',
    description: 'Calculate how much rain water can be trapped between bars.',
    difficulty: 'hard',
    functionName: 'trap',
    starterCode: `function trap(height) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, description: 'Example 1' },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9, description: 'Example 2' }
    ]
  },
  {
    id: '15',
    title: 'Longest Valid Parentheses',
    category: 'Strings',
    description: 'Find the length of the longest valid parentheses substring.',
    difficulty: 'hard',
    functionName: 'longestValidParentheses',
    starterCode: `function longestValidParentheses(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ['(()'], expected: 2, description: 's = "(()"' },
      { input: [')()())'], expected: 4, description: 's = ")()())"' },
      { input: [''], expected: 0, description: 'Empty string' }
    ]
  }
];

export const getRandomProblem = (): CodingProblem => {
  return CODING_PROBLEMS[Math.floor(Math.random() * CODING_PROBLEMS.length)];
};

export const getProblemsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): CodingProblem[] => {
  return CODING_PROBLEMS.filter(p => p.difficulty === difficulty);
};