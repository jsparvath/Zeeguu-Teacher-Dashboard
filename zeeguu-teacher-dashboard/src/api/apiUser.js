import { apiGet } from './apiEndpoints'
/**
 * Loads an invidiual users data.
 * Requires permission (the logged in teacher must be a teacher of the class containing user with user_id ).
 * @param {integer} userId used to find user.
 * @param {integer} duration
 * @returns {object} object containing (id, name, email, reading time, exercises done, last article)
 */
export function loadUserInfo(userId, duration) {
  const studentInfo = apiGet(`/user_info/${userId}/${duration}`)
  return studentInfo
}

export function loadUserReadingSessions(userId, duration) {
  const userReadingSessions = apiGet(
    `/user_reading_sessions/${userId}/${duration}`
  ).then(({ data }) => {
    console.log('data')
    console.log(data)
  })
}

export function loadUserData(userId, duration) {
  let stats = apiGet(`/cohort_member_bookmarks/${userId}/${duration}`).then(
    ({ data }) => {
      const filteredData = filterUserBookmarks(data)
      const sortedData = sortUserBookmarks(data)
      return sortedData
    }
  )
  return stats
}

/**
 * Takes an array of bookmarks and removed duplicate items
 * @param {Array} data
 */
function filterUserBookmarks(data) {
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

function sortUserBookmarks(data) {
  let masterList = []
  data.map(day => {
    let masterElement = {}
    masterElement.date = day.date
    masterElement['article_list'] = []
    masterList.push(masterElement)
    day.bookmarks.forEach(bookmark => {
      let existsArticle = false
      masterElement['article_list'].forEach(article => {
        if (article.title === bookmark.title) {
          existsArticle = true
          let existsSentence = false
          article.sentence_list.forEach(sentence => {
            if (sentence.context === bookmark.context) {
              existsSentence = true
              sentence.bookmarks.push(bookmark)
            }
          })
          if (!existsSentence) {
            let sentenceElement = {}
            sentenceElement.context = bookmark.context
            sentenceElement.bookmarks = []
            sentenceElement.bookmarks.push(bookmark)
            article.sentence_list.push(sentenceElement)
          }
        }
      })
      if (!existsArticle) {
        let articleElement = {}
        articleElement.title = bookmark.title
        articleElement.url = bookmark.url
        articleElement.sentence_list = []
        masterElement.article_list.push(articleElement)
        let sentenceElement = []
        sentenceElement.context = bookmark.context
        sentenceElement.bookmarks = []
        articleElement.sentence_list.push(sentenceElement)
        sentenceElement.bookmarks.push(bookmark)
      }
    })
  })
  return masterList
}
