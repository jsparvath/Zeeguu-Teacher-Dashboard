import { apiGet } from './apiEndpoints'

export function loadUserData(userId, duration) {
  let stats = apiGet(`/cohort_member_bookmarks/${userId}/${duration}`).then(
    ({ data }) => filterUserBookmarks(data)
  )
  return stats
}

/**
 * Takes an array of bookmarks and removed duplicate items
 * @param {Array} data
 */
function filterUserBookmarks(data) {
  console.log(data)
  let wordString = ' '

  const result = data.map(day =>
    day['bookmarks'].reduce(function(acc, bookmark) {
      if (wordString.includes(bookmark['from'])) {
        return acc
      } else {
        wordString = bookmark['from']
        acc.push(bookmark)
        return acc
      }
    }, [])
  )
  return result
}
