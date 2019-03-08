import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { MdExpandMore, MdKeyboardArrowRight } from 'react-icons/md/'
import {
  loadUserData,
  loadUserInfo,
  loadUserReadingSessions
} from '../api/apiUser'
import './studentPage.scss'

const StudentActivity = ({ classId, studentId }) => {
  const [articlesByDate, setArticlesByDate] = useState([])
  const [totalArticlesCount, setTotalArticlesCount] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    loadUserData(studentId, 10).then(result => {
      let totalArticlesCount = 0
      result.forEach(day => {
        totalArticlesCount += day.article_list.length
      })
      setArticlesByDate(result)
      setTotalArticlesCount(totalArticlesCount)
    })
    loadUserInfo(studentId, 10).then(({ data }) => {
      setUserInfo(data)
    })
    loadUserReadingSessions(studentId, 10)
  }, [])
  return (
    <div className="student-page">
      {articlesByDate.map(article => {
        console.log(article)
        return (
          <div>
            <p>{article.date}</p>
            {article.article_list.map(article => (
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
                  <h2 className="student-activity-item-heading">
                    {article.title}
                  </h2>

                  <p>another friend</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {article.sentence_list.map(sentence => (
                    <div>
                      {sentence.context}
                      <div className="student-page-bookmarks">
                        {sentence.bookmarks.map(bookmark => (
                          <p>
                            <span className="student-page-bookmark-from">
                              {bookmark.from}
                            </span>{' '}
                            <MdKeyboardArrowRight
                              className="student-page-translation-arrow"
                              size="24"
                            />{' '}
                            {bookmark.to}{' '}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        )
      })}

      {/* 0:
article_id: 5
context: "« Leaving Neverland », dont la première des deux parties a été diffusée dimanche soir aux Etats-Unis, relate deux nouveaux témoignages de viols répétés par l’ancien chanteur star, décédé en 2009."
created_day: ""
from: "dont"
from_lang: "fr"
id: 11
learned_datetime: ""
origin_importance: 11.16
origin_rank: 348
starred: false
time: "2019-03-06T19:21:48.000000Z"
title: "Un documentaire inédit sur Michael Jackson relance les accusations de pédophilie"
to: "first"
to_lang: "en"
url: "https://www.lemonde.fr/cultur */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          This is my lucky friend
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          This is my lucky friend
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          This is my lucky friend
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div>
  )
}

export default StudentActivity
