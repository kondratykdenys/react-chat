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
      ].join(' ')}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}
      {author && <span>{author.name.firstName}</span>}
      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {data.message}
        </div>
      </div>
    </div>
  )
}
