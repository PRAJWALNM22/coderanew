import React, { useState, useMemo } from 'react'
import { PROBLEMS } from '../data/problems.js'

function PracticeListPage({ navigateTo }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const allTags = useMemo(
    () => [...new Set(PROBLEMS.flatMap(p => p.tags || []))],
    [],
  )

  const filteredProblems = useMemo(
    () =>
      PROBLEMS.filter(problem => {
        const matchesDifficulty = difficultyFilter ? problem.difficulty === difficultyFilter : true
        const matchesStatus = statusFilter ? problem.status === statusFilter : true
        const matchesTag = tagFilter ? (problem.tags || []).includes(tagFilter) : true
        const matchesSearch = searchQuery
          ? problem.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true
        return matchesDifficulty && matchesStatus && matchesTag && matchesSearch
      }),
    [difficultyFilter, statusFilter, tagFilter, searchQuery],
  )

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Practice Problems</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 border border-indigo-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Filters</h2>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
          >
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {filtersOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="bg-gray-700 text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-gray-700 text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="Attempted">Attempted</option>
              <option value="Solved">Solved</option>
            </select>
            <select
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value)}
              className="bg-gray-700 text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        )}
        <input
          type="text"
          placeholder="Search problems by title..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        />
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-indigo-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredProblems.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-400"
                >
                  No problems found matching your filters.
                </td>
              </tr>
            ) : (
              filteredProblems.map(problem => (
                <tr
                  key={problem.id}
                  className="hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{problem.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : problem.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {problem.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {(problem.tags || []).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-indigo-600 text-indigo-100 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigateTo(`/practice/${problem.id}`)}
                      className="text-indigo-400 hover:text-indigo-600 transition duration-200"
                    >
                      Solve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PracticeListPage
