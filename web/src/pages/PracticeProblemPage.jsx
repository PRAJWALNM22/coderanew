import React, { useState, useEffect, useRef, useMemo } from 'react'

// This page is a React port of your original inline PracticeProblemPage.
// It keeps CodeMirror, Judge0 integration, and integrated notes.

function PracticeProblemPage({ problemId }) {
  const numericId = Number(problemId) || 1

  // Problems data structure (from original index.html)
  const problemsData = {
    1: {
      title: 'Two Sum',
      description:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.',
      examples: [
        'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
        'Input: nums = [3,2,4], target = 6\nOutput: [1,2]',
        'Input: nums = [3,3], target = 6\nOutput: [0,1]',
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.',
      ],
      starterCode: {
        javascript: 'function twoSum(nums, target) {\n  // Write your JavaScript code here\n}',
        python: 'def two_sum(nums, target):\n    # Write your Python code here',
        java: 'public int[] twoSum(int[] nums, int target) {\n    // Write your Java code here\n    return new int[0];\n}',
        cpp: 'vector<int> twoSum(const vector<int>& nums, int target) {\n    // Write your C++ code here\n    return {};\n}',
      },
      testCases: [
        { input: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { input: [3, 2, 4], target: 6, expected: [1, 2] },
        { input: [3, 3], target: 6, expected: [0, 1] },
        { input: [5, 5, 1, 1], target: 10, expected: [0, 1] },
      ],
    },
    2: {
      title: 'Add Two Numbers',
      description:
        'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      examples: [
        'Input: l1 = [2,4,3], l2 = [5,6,4]\\nOutput: [7,0,8]\\nExplanation: 342 + 465 = 807.',
        'Input: l1 = [0], l2 = [0]\\nOutput: [0]',
        'Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\\nOutput: [8,9,9,9,0,0,0,1]',
      ],
      constraints: [
        'The number of nodes in each linked list is in the range [1, 100].',
        '0 <= Node.val <= 9',
        'The list represents a number without leading zeros.',
      ],
      starterCode: {
        javascript: 'function addTwoNumbers(l1, l2) {\n  // Write your JavaScript code here\n}',
        python: 'def add_two_numbers(l1, l2):\n    # Write your Python code here',
        java: 'public int[] addTwoNumbers(int[] l1, int[] l2) {\n    // Write your Java code here\n    return new int[0];\n}',
        cpp: 'vector<int> addTwoNumbers(const vector<int>& l1, const vector<int>& l2) {\n    // Write your C++ code here\n    return {};\n}',
      },
      testCases: [
        { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expected: [7, 0, 8] },
        { input: { l1: [0], l2: [0] }, expected: [0] },
        {
          input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
          expected: [8, 9, 9, 9, 0, 0, 0, 1],
        },
      ],
    },
    3: {
      title: 'Longest Substring Without Repeating Characters',
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      examples: [
        'Input: s = "abcabcbb"\\nOutput: 3',
        'Input: s = "bbbbb"\\nOutput: 1',
        'Input: s = "pwwkew"\\nOutput: 3',
      ],
      constraints: [
        '0 <= s.length <= 5 * 10^4',
        's consists of English letters, digits, symbols and spaces.',
      ],
      starterCode: {
        javascript: 'function lengthOfLongestSubstring(s) {\n  // Write your JavaScript code here\n}',
        python: 'def length_of_longest_substring(s):\n    # Write your Python code here',
        java: 'public int lengthOfLongestSubstring(String s) {\n    // Write your Java code here\n    return 0;\n}',
        cpp: 'int lengthOfLongestSubstring(string s) {\n    // Write your C++ code here\n    return 0;\n}',
      },
      testCases: [
        { input: 'abcabcbb', expected: 3 },
        { input: 'bbbbb', expected: 1 },
        { input: 'pwwkew', expected: 3 },
        { input: '', expected: 0 },
      ],
    },
    4: {
      title: 'Median of Two Sorted Arrays',
      description:
        'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
      examples: [
        'Input: nums1 = [1,3], nums2 = [2]\\nOutput: 2.0',
        'Input: nums1 = [1,2], nums2 = [3,4]\\nOutput: 2.5',
      ],
      constraints: [
        'nums1.length == m',
        'nums2.length == n',
        '0 <= m, n <= 1000',
        '1 <= m + n <= 2000',
      ],
      starterCode: {
        javascript: 'function findMedianSortedArrays(nums1, nums2) {\n  // Write your JavaScript code here\n}',
        python: 'def find_median_sorted_arrays(nums1, nums2):\n    # Write your Python code here',
        java: 'public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    // Write your Java code here\n    return 0.0;\n}',
        cpp: 'double findMedianSortedArrays(const vector<int>& nums1, const vector<int>& nums2) {\n    // Write your C++ code here\n    return 0.0;\n}',
      },
      testCases: [
        { input: { nums1: [1, 3], nums2: [2] }, expected: 2.0 },
        { input: { nums1: [1, 2], nums2: [3, 4] }, expected: 2.5 },
        { input: { nums1: [0, 0], nums2: [0, 0] }, expected: 0.0 },
      ],
    },
    5: {
      title: 'Reverse Linked List',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      examples: [
        'Input: head = [1,2,3,4,5]\\nOutput: [5,4,3,2,1]',
        'Input: head = [1,2]\\nOutput: [2,1]',
      ],
      constraints: [
        'The number of nodes in the list is the range [0, 5000].',
        '-5000 <= Node.val <= 5000',
      ],
      starterCode: {
        javascript: 'function reverseList(head) {\n  // Write your JavaScript code here\n}',
        python: 'def reverse_list(head):\n    # Write your Python code here',
        java: 'public int[] reverseList(int[] head) {\n    // Write your Java code here\n    return new int[0];\n}',
        cpp: 'vector<int> reverseList(const vector<int>& head) {\n    // Write your C++ code here\n    return {};\n}',
      },
      testCases: [
        { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
        { input: [1, 2], expected: [2, 1] },
        { input: [], expected: [] },
      ],
    },
  }

  const problem = problemsData[numericId] || problemsData[1]

  // Code editor state
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [code, setCode] = useState(problem.starterCode[selectedLanguage])
  const editorRef = useRef(null)
  const lastLanguage = useRef(selectedLanguage)

  // Output & loading
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  // Per-test results for UI (LeetCode-style)
  const [testResults, setTestResults] = useState([]) // { index, status: 'pending'|'passed'|'failed'|'error', message }

  // Tabs
  const [activeTab, setActiveTab] = useState('Description')

  // Integrated Notes state (localStorage-backed)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem('codera-notes')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const saveAllNotes = next => {
    setNotes(next)
    try {
      localStorage.setItem('codera-notes', JSON.stringify(next))
    } catch {}
  }

  const contextKey = `practice:${numericId}`
  const practiceNotes = useMemo(
    () => notes.filter(n => n.context?.key === contextKey),
    [notes, contextKey],
  )
  const [hasSelection, setHasSelection] = useState(false)

  // AI helper (Rollo) state
  const [showAIHelper, setShowAIHelper] = useState(false)
  const [aiMessages, setAiMessages] = useState([])
  const [newAiMessage, setNewAiMessage] = useState('')
  const [isAiResponding, setIsAiResponding] = useState(false)

  const handleSaveSelectionToNotes = () => {
    const ed = editorRef.current
    if (!ed) return alert('Editor not ready')
    const sel = (ed.getSelection && ed.getSelection()) || ''
    const snippet = (sel || '').trim()
    if (!snippet) return alert('Please select some code in the editor first.')
    const defaultTitle = snippet.split('\n')[0].slice(0, 60) || 'Snippet'
    let custom = ''
    try {
      custom = window.prompt('Enter a title for this note:', defaultTitle) ?? ''
    } catch {
      custom = defaultTitle
    }
    if (custom === null) return
    const title = custom.trim() || defaultTitle
    const note = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title,
      snippet,
      language: selectedLanguage,
      createdAt: new Date().toISOString(),
      context: { mode: 'practice', key: contextKey, problemId: numericId },
    }
    saveAllNotes([note, ...notes])
    setShowNotes(true)
  }

  const handleInsertNoteAtCursor = note => {
    const ed = editorRef.current
    if (!ed) return
    if (ed.replaceSelection) ed.replaceSelection(note.snippet)
  }

  const handleCopyNote = async note => {
    try {
      await navigator.clipboard.writeText(note.snippet)
    } catch {}
  }

  const handleDeleteNote = id => {
    const next = notes.filter(n => n.id !== id)
    saveAllNotes(next)
  }

  // AI helper for hints using Gemini API (Rollo)
  const handleSendAiMessage = async () => {
    const userText = newAiMessage.trim()
    if (!userText) return

    // Show the user's message in the chat immediately
    setAiMessages(prev => [...prev, { sender: 'User', text: userText }])
    setNewAiMessage('')
    setIsAiResponding(true)

    try {
      const promptText = `You are Rollo, an AI coding assistant. The problem is "${
        problem.title
      }".\nThe user is asking for a hint or help. Provide a short conceptual hint.\nUser question: ${userText}`

      const payload = { contents: [{ role: 'user', parts: [{ text: promptText }] }] }
      const apiKey = "AIzaSyByHj4CbFPPjJeIXfUPeBrFf6daEiNyE9Q" // your Gemini API key
      const modelId = 'gemini-2.0-flash'
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const result = await response.json()
      const aiResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text

      setAiMessages(prev => [
        ...prev,
        { sender: 'Rollo', text: aiResponseText || "I couldn't generate a response this time." },
      ])
    } catch (error) {
      console.error('Rollo AI error:', error)
      setAiMessages(prev => [
        ...prev,
        {
          sender: 'Rollo',
          text: `Sorry, I'm having trouble right now. (${error.message || 'Unknown error'})`,
        },
      ])
    } finally {
      setIsAiResponding(false)
    }
  }

  // Initialize CodeMirror (uses global window.CodeMirror loaded in index.html)
  useEffect(() => {
    const editorContainer = document.getElementById('code-editor')
    if (!editorContainer || !window.CodeMirror) return

    // Prevent multiple initializations on the same container
    if (editorRef.current) return

    // Clear any previous children just in case
    editorContainer.innerHTML = ''

    const cm = window.CodeMirror(editorContainer, {
      value: problem.starterCode[selectedLanguage],
      mode:
        selectedLanguage === 'javascript'
          ? 'javascript'
          : selectedLanguage === 'python'
            ? 'python'
            : selectedLanguage === 'java'
              ? 'text/x-java'
              : selectedLanguage === 'cpp'
                ? 'text/x-c++src'
                : 'javascript',
      theme: (() => {
        try {
          return (localStorage.getItem('theme') || 'dark') === 'dark'
            ? 'dracula'
            : 'default'
        } catch {
          return 'dracula'
        }
      })(),
      lineNumbers: true,
      indentUnit: 4,
      smartIndent: true,
    })

    editorRef.current = cm

    cm.on('change', instance => setCode(instance.getValue()))
    cm.on('cursorActivity', editor => {
      try {
        const s = editor.getSelection ? editor.getSelection() : ''
        setHasSelection(!!(s && s.trim()))
      } catch {
        setHasSelection(false)
      }
    })

    const handleThemeChange = e => {
      const next = e?.detail || 'dark'
      if (editorRef.current) {
        editorRef.current.setOption('theme', next === 'dark' ? 'dracula' : 'default')
      }
    }
    window.addEventListener('theme-change', handleThemeChange)

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea?.()
        editorRef.current = null
      }
      window.removeEventListener('theme-change', handleThemeChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle language switch without overwriting
  useEffect(() => {
    if (editorRef.current && lastLanguage.current !== selectedLanguage) {
      const mode =
        selectedLanguage === 'javascript'
          ? 'javascript'
          : selectedLanguage === 'python'
            ? 'python'
            : selectedLanguage === 'java'
              ? 'text/x-java'
              : selectedLanguage === 'cpp'
                ? 'text/x-c++src'
                : 'javascript'
      editorRef.current.setOption('mode', mode)
      editorRef.current.setValue(problem.starterCode[selectedLanguage])
      lastLanguage.current = selectedLanguage
      setCode(problem.starterCode[selectedLanguage])
    }
  }, [selectedLanguage, problem.starterCode])

  // Reset results when language changes (and editor is ready)
  useEffect(() => {
    // Clear test results/output when user switches language or problem
    setTestResults([])
    setOutput('')
  }, [numericId, selectedLanguage])

  // Helper: run a single test via Judge0 and compute verdict
  const runSingleTest = async (test, index) => {
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
      cpp: 54,
    }

    const functionName =
      numericId === 1
        ? 'twoSum'
        : numericId === 2
          ? 'addTwoNumbers'
          : numericId === 3
            ? 'lengthOfLongestSubstring'
            : numericId === 4
              ? 'findMedianSortedArrays'
              : 'reverseList'

    const pythonFunctionName =
      numericId === 1
        ? 'two_sum'
        : numericId === 2
          ? 'add_two_numbers'
          : numericId === 3
            ? 'length_of_longest_substring'
            : numericId === 4
              ? 'find_median_sorted_arrays'
              : 'reverse_list'

    const javaFunctionName = functionName
    const cppFunctionName = functionName
    let functionCall = ''
    if (numericId === 1) {
      if (selectedLanguage === 'javascript') {
        functionCall = `${functionName}(${JSON.stringify(test.input)}, ${test.target})`
      } else if (selectedLanguage === 'python') {
        functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)}, ${test.target})`
      } else if (selectedLanguage === 'java') {
        functionCall = `${javaFunctionName}(new int[]{${test.input.join(',')}}, ${test.target})`
      } else if (selectedLanguage === 'cpp') {
        functionCall = `${cppFunctionName}({${test.input.join(',')}}, ${test.target})`
      }
    } else if (numericId === 2) {
      if (selectedLanguage === 'javascript') {
        functionCall = `${functionName}(${JSON.stringify(test.input.l1)}, ${JSON.stringify(
          test.input.l2,
        )})`
      } else if (selectedLanguage === 'python') {
        functionCall = `${pythonFunctionName}(${JSON.stringify(test.input.l1)}, ${JSON.stringify(
          test.input.l2,
        )})`
      } else if (selectedLanguage === 'java') {
        functionCall = `${javaFunctionName}(new int[]{${test.input.l1.join(',')}}, new int[]{${test.input.l2.join(
          ',',
        )}})`
      } else if (selectedLanguage === 'cpp') {
        functionCall = `${cppFunctionName}({${test.input.l1.join(',')}}, {${test.input.l2.join(',')}})`
      }
    } else if (numericId === 3) {
      if (selectedLanguage === 'javascript') {
        functionCall = `${functionName}(${JSON.stringify(test.input)})`
      } else if (selectedLanguage === 'python') {
        functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)})`
      } else if (selectedLanguage === 'java') {
        functionCall = `${javaFunctionName}("${test.input}")`
      } else if (selectedLanguage === 'cpp') {
        functionCall = `${cppFunctionName}("${test.input}")`
      }
    } else if (numericId === 4) {
      if (selectedLanguage === 'javascript') {
        functionCall = `${functionName}(${JSON.stringify(test.input.nums1)}, ${JSON.stringify(
          test.input.nums2,
        )})`
      } else if (selectedLanguage === 'python') {
        functionCall = `${pythonFunctionName}(${JSON.stringify(test.input.nums1)}, ${JSON.stringify(
          test.input.nums2,
        )})`
      } else if (selectedLanguage === 'java') {
        functionCall = `${javaFunctionName}(new int[]{${test.input.nums1.join(',')}}, new int[]{${
          test.input.nums2
        }.join(',')})`
      } else if (selectedLanguage === 'cpp') {
        functionCall = `${cppFunctionName}({${test.input.nums1.join(',')}}, {${test.input.nums2.join(
          ',',
        )}})`
      }
    } else if (numericId === 5) {
      if (selectedLanguage === 'javascript') {
        functionCall = `${functionName}(${JSON.stringify(test.input)})`
      } else if (selectedLanguage === 'python') {
        functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)})`
      } else if (selectedLanguage === 'java') {
        functionCall = `${javaFunctionName}(new int[]{${test.input.join(',')}})`
      } else if (selectedLanguage === 'cpp') {
        functionCall = `${cppFunctionName}({${test.input.join(',')}})`
      }
    }

    if (!functionCall) {
      return {
        index,
        status: 'error',
        message: 'Could not build function call for this problem.',
      }
    }

    let wrappedCode = ''
    if (selectedLanguage === 'javascript') {
      wrappedCode = `${code}

// Auto-call the function with test case
try {
    const result = ${functionCall};
    console.log(JSON.stringify(result));
} catch (error) {
    console.error(error.message);
}`
    } else if (selectedLanguage === 'python') {
      wrappedCode = `${code}

# Auto-call the function with test case
import json
print(json.dumps(${functionCall}))`
    } else if (selectedLanguage === 'java') {
      let methodBody = code.trim()
      if (methodBody.startsWith('public ')) {
        methodBody = methodBody.replace(/^public\s+/, '')
      }
      if (!methodBody.startsWith('static ')) {
        methodBody = 'public static ' + methodBody
      } else {
        methodBody = 'public ' + methodBody
      }
      const needsArraysToString = numericId === 1 || numericId === 2 || numericId === 5
      const printStatement = needsArraysToString
        ? `Arrays.toString(${functionCall})`
        : `${functionCall}`
      wrappedCode = `import java.util.*;

public class Main {
    ${methodBody}
    
    public static void main(String[] args) {
        try {
            System.out.println(${printStatement});
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`
    } else if (selectedLanguage === 'cpp') {
      wrappedCode = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

// Helper function to print vectors
template<typename T>
void printVector(const vector<T>& vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
    cout << "]";
}

${code}

int main() {
    try {
        auto result = ${functionCall};
        cout << result;
        cout << endl;
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
    }
    return 0;
}`
    }

    const res = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': '1f4bcaf085mshdb3d102dc891ab6p12b4d2jsn3480d98ed8c1',
        },
        body: JSON.stringify({
          source_code: btoa(wrappedCode),
          language_id: languageMap[selectedLanguage],
          stdin: btoa(''),
        }),
      },
    )

    const result = await res.json()

    // Derive verdict similar to original: compare decoded stdout vs expected
    if (result.stdout) {
      const raw = atob(result.stdout).trim()
      let userVal = raw
      try {
        userVal = JSON.parse(raw)
      } catch {
        // not JSON, keep raw string
      }
      const expectedVal = test.expected
      const passed = JSON.stringify(userVal) === JSON.stringify(expectedVal)
      return {
        index,
        status: passed ? 'passed' : 'failed',
        message: passed ? '' : `Expected ${JSON.stringify(expectedVal)}, got ${JSON.stringify(userVal)}`,
      }
    }

    if (result.stderr) {
      return {
        index,
        status: 'error',
        message: 'Runtime Error: ' + atob(result.stderr),
      }
    }

    if (result.compile_output) {
      return {
        index,
        status: 'error',
        message: 'Compilation Error: ' + atob(result.compile_output),
      }
    }

    return {
      index,
      status: 'error',
      message: 'Unexpected Judge0 response',
    }
  }

  const handleRunCode = async () => {
    if (!problem.testCases.length) return
    setLoading(true)

    const verdict = await runSingleTest(problem.testCases[0], 0)
    setTestResults([verdict])
    setLoading(false)
  }

  const handleSubmitCode = async () => {
    setLoading(true)

    const verdicts = []
    for (let i = 0; i < problem.testCases.length; i++) {
      const v = await runSingleTest(problem.testCases[i], i)
      verdicts.push(v)
    }
    setTestResults(verdicts)
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-gray-100 font-inter pt-24 px-4 sm:px-6 lg:px-10 lg:pl-28 pr-6">
      {/* Decorative background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-32 -left-32 h-80 w-80 bg-indigo-700 blur-3xl rounded-full mix-blend-screen" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 bg-purple-700 blur-3xl rounded-full mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400/70 mb-2">Practice Mode</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
            {problem.title}
            <span className="text-xs font-semibold rounded-full px-3 py-1 bg-indigo-500/20 border border-indigo-400/40 text-indigo-200">
              ID: {numericId}
            </span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Focus Mode</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-200">
            Auto-save notes
          </div>
        </div>
      </header>

      <div className="relative z-10 mr-20 xl:mr-28 grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] gap-6 lg:gap-8 items-stretch">
        {/* Problem Panel */}
        <section className="bg-slate-900/70 backdrop-blur rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.9)] border border-slate-700/80 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-slate-700/80">
            <div className="flex gap-2 text-[11px] font-medium text-slate-300">
              {['Description', 'Examples', 'Constraints'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800/80 border border-slate-600/80 text-[9px]">
                ?
              </span>
              <span>Read the prompt carefully before you code</span>
            </div>
          </div>

          <div className="px-6 pb-5 pt-3 overflow-y-auto custom-scrollbar flex-grow text-sm leading-relaxed">
            {activeTab === 'Description' && (
              <p className="text-slate-100 whitespace-pre-line">{problem.description}</p>
            )}
            {activeTab === 'Examples' && (
              <div className="space-y-3">
                {(problem.examples || []).map((ex, idx) => (
                  <pre
                    key={idx}
                    className="bg-slate-900/80 border border-slate-700/80 p-3 rounded-xl text-slate-200 text-xs sm:text-sm overflow-x-auto shadow-inner shadow-slate-950"
                  >
                    <code className="font-mono">{ex}</code>
                  </pre>
                ))}
              </div>
            )}
            {activeTab === 'Constraints' && (
              <ul className="list-disc pl-5 text-slate-200 space-y-1 text-sm">
                {(problem.constraints || []).map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Code Editor Panel with CodeMirror */}
        <section className="bg-slate-900/80 backdrop-blur rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.9)] border border-slate-700/80 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-5 pt-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">Code Workspace</h2>
              <p className="text-[11px] text-slate-400">Write, run and submit your solution</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Language</span>
              <select
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value)}
                className="bg-slate-900 border border-slate-600 text-slate-100 px-3 py-1.5 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
          </div>

          {/* Editor */}
          <div className="relative mb-3 px-3 pb-1">
            <div
              id="code-editor"
              className="h-[420px] w-full rounded-2xl border border-slate-700/80 bg-[#0f172a] shadow-inner shadow-slate-950/80"
            ></div>
            {hasSelection && (
              <button
                onClick={handleSaveSelectionToNotes}
                className="absolute top-4 right-8 px-3 py-1 text-[11px] bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-semibold rounded-full shadow"
              >
                Save selection
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-5">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800/80 border border-slate-700/80 text-[10px]">
                ⌘↵
              </span>
              <span>Use the Run button to quickly test your logic</span>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={loading}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm bg-sky-600 hover:bg-sky-500 rounded-full font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Run Code
              </button>
              <button
                type="button"
                onClick={handleSubmitCode}
                disabled={loading}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 rounded-full font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleSaveSelectionToNotes}
                className="px-3 sm:px-4 py-2 text-[11px] sm:text-xs bg-amber-500/90 hover:bg-amber-400 rounded-full text-slate-950 font-semibold"
              >
                Save to Notes
              </button>
              <button
                type="button"
                onClick={() => setShowNotes(s => !s)}
                className="px-3 sm:px-4 py-2 text-[11px] sm:text-xs bg-indigo-600/90 hover:bg-indigo-500 rounded-full font-semibold"
              >
                {showNotes ? 'Hide Notes' : 'Show Notes'}
              </button>
            </div>
          </div>

          {/* Tests */}
          <div className="px-4 pb-4">
            <div className="bg-slate-900/80 border border-slate-700/80 p-3 rounded-xl text-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-100 text-xs sm:text-sm">Test Cases</h3>
                <span className="text-[11px] text-slate-400">{problem.testCases.length} total</span>
              </div>
              <div className="space-y-2">
                {problem.testCases.map((_, idx) => {
                  const res = testResults.find(r => r.index === idx)
                  const status = res?.status || 'pending'
                  const statusLabel =
                    status === 'passed'
                      ? 'Passed'
                      : status === 'failed'
                        ? 'Failed'
                        : status === 'error'
                          ? 'Error'
                          : 'Not run'
                  const colorClass =
                    status === 'passed'
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-600/70'
                      : status === 'failed'
                        ? 'bg-rose-950/90 text-rose-300 border-rose-600/70'
                        : status === 'error'
                          ? 'bg-amber-950/90 text-amber-200 border-amber-600/70'
                          : 'bg-slate-950/90 text-slate-300 border-slate-700/80'
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs sm:text-sm ${colorClass}`}
                    >
                      <div>
                        <div className="font-medium">Test Case {idx + 1}</div>
                        {res?.message && (
                          <div className="text-[11px] mt-0.5 text-slate-200/80">{res.message}</div>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-black/20 border border-white/10">
                        {statusLabel}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {showNotes && (
              <div className="mt-4 bg-slate-900/80 border border-slate-700/80 p-4 rounded-xl text-slate-100 mx-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">Notes for this problem</h3>
                  <span className="text-[11px] text-slate-400">{practiceNotes.length} saved</span>
                </div>
                {practiceNotes.length === 0 ? (
                  <p className="text-slate-300 text-xs sm:text-sm">
                    No notes yet. Select code in the editor and click "Save to Notes".
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {practiceNotes.map(note => (
                      <li
                        key={note.id}
                        className="bg-slate-950/80 border border-slate-700/80 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-slate-50">
                              {note.title || 'Snippet'}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {new Date(note.createdAt).toLocaleString()} • {note.language}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleInsertNoteAtCursor(note)}
                              className="px-3 py-1 text-[10px] bg-sky-600 hover:bg-sky-500 rounded-full"
                            >
                              Insert
                            </button>
                            <button
                              onClick={() => handleCopyNote(note)}
                              className="px-3 py-1 text-[10px] bg-emerald-600 hover:bg-emerald-500 rounded-full"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="px-3 py-1 text-[10px] bg-rose-600 hover:bg-rose-500 rounded-full"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <pre className="mt-2 text-xs sm:text-sm whitespace-pre-wrap text-slate-200 overflow-auto max-h-40 font-mono">
                          {note.snippet}
                        </pre>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* AI Helper Button */}
      <button
        onClick={() => setShowAIHelper(!showAIHelper)}
        className="fixed bottom-6 right-6 bg-purple-600 p-4 rounded-full shadow-lg hover:bg-purple-700"
      >
        AI
      </button>

      {/* AI Chat */}
      {showAIHelper && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 border border-indigo-700">
          <div className="p-4 border-b border-gray-700 flex justify-between">
            <h3 className="text-lg font-semibold text-white">Rollo</h3>
            <button
              onClick={() => setShowAIHelper(false)}
              className="text-gray-400 hover:text-white"
            >
              X
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {aiMessages.length === 0 ? (
              <p className="text-gray-400 text-sm">Hi! Ask me for hints...</p>
            ) : (
              aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-2 rounded-lg ${
                      msg.sender === 'User'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            {isAiResponding && (
              <div className="flex justify-start">
                <div className="max-w-[75%] p-2 rounded-lg bg-gray-700 text-gray-100">
                  <p className="text-sm animate-pulse">Rollo is thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-700 flex">
            <input
              type="text"
              value={newAiMessage}
              onChange={e => setNewAiMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendAiMessage()
              }}
              className="flex-grow bg-gray-700 text-gray-100 p-2 rounded-l-md"
              placeholder="Ask for a hint..."
              disabled={isAiResponding}
            />
            <button
              onClick={handleSendAiMessage}
              className="px-4 py-2 bg-indigo-600 rounded-r-md disabled:opacity-50"
              disabled={isAiResponding || !newAiMessage.trim()}
            >
              {isAiResponding ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PracticeProblemPage
