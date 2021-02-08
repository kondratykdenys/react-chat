import React from 'react'
import moment from 'moment'
import './Message.css'

export default function Message({
  data,
  isMine,
  startsSequence,
  endsSequence,
  showTimestamp,
  author,
  connection
}) {
  const friendlyTimestamp = moment(data.timestamp).format('LLLL')
  console.log(data.message)
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
        `${connection ? 'connection' : ''}`
      ].join(' ')}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}
      {author && <div className="author"><span>Author: {author.name.firstName}</span></div>}
      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {data.message}
        </div>
      </div>
    </div>
  )
}
