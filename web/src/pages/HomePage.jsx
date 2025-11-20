import React from 'react'

function HomePage({ username = 'CodeMaster', streakCount = 7, badges, navigateTo }) {
  const recentActivity = [
    { id: 1, type: 'problem', title: 'Two Sum', status: 'Solved', difficulty: 'Easy', date: '2 days ago' },
    {
      id: 2,
      type: 'battle',
      title: 'Battle with PlayerX',
      result: 'Won',
      opponent: 'PlayerX',
      date: '1 day ago',
      badge: 'First Win',
    },
    {
      id: 3,
      type: 'problem',
      title: 'Reverse Linked List',
      status: 'Attempted',
      difficulty: 'Medium',
      date: '1 day ago',
    },
  ]

  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  const qotdProblemId = ((dayOfYear % 5) + 1).toString()
  const qotdTitles = {
    '1': 'Two Sum',
    '2': 'Add Two Numbers',
    '3': 'Longest Substring Without Repeating Characters',
    '4': 'Median of Two Sorted Arrays',
    '5': 'Reverse Linked List',
  }

  const qotd = {
    title: qotdTitles[qotdProblemId],
    problemId: qotdProblemId,
  }

  return (
    <div className="p-8 pt-24 pl-28 lg:pl-28 min-h-screen bg-gray-900 text-gray-100 font-inter">
      <h1 className="text-4xl font-bold text-white mb-6">
        Welcome back, <span className="text-indigo-400">{username}!</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700">
          <h3 className="text-xl font-semibold text-white mb-2">Current Streak 🔥</h3>
          <p className="text-3xl font-bold text-orange-400">{streakCount} Days</p>
          <p className="text-gray-400 text-sm mt-2">Keep up the great work!</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700">
          <h3 className="text-xl font-semibold text-white mb-2">Your Badges 🏆</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {(badges || ['First Win', '10-Day Streak']).map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-600 text-green-100 text-sm font-medium rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-2">Earn more by competing and practicing!</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-700">
          <h3 className="text-xl font-semibold text-white mb-2">Question of the Day 💡</h3>
          <p className="text-lg font-medium text-blue-400 mb-3">{qotd.title}</p>
          <button
            onClick={() => navigateTo(`/practice/${qotd.problemId}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Solve Now
          </button>
          <p className="text-gray-400 text-xs mt-2">Complete it for bonus XP and streak boost!</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentActivity.map(activity => (
            <div
              key={activity.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:border-indigo-500 transition duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    activity.type === 'problem' ? 'bg-indigo-600' : 'bg-purple-600'
                  } text-white`}
                >
                  {activity.type === 'problem' ? 'Problem' : 'Battle'}
                </span>
                {activity.status && (
                  <span
                    className={`text-xs font-semibold ${
                      activity.status === 'Solved' || activity.result === 'Won'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {activity.status || activity.result}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
              {activity.opponent && (
                <p className="text-gray-300 text-sm">vs. {activity.opponent}</p>
              )}
              {activity.difficulty && (
                <p className="text-gray-400 text-xs">Difficulty: {activity.difficulty}</p>
              )}
              {activity.badge && (
                <p className="text-yellow-400 text-xs mt-1">Badge Earned: {activity.badge}</p>
              )}
              <p className="text-gray-500 text-xs mt-2">{activity.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigateTo('/battle/random')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-lg transition duration-200"
          >
            Battle with Random
          </button>
          <button
            onClick={() => navigateTo('/practice')}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-lg transition duration-200"
          >
            Go to Practice
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
