import React, {useEffect, useRef, useState} from 'react'
import Compose from '../Compose'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import Message from '../Message'
import moment from 'moment'

import './MessageList.css'

export default function MessageList({ messages = [], myUserId }) {
  const renderMessages = () => {
    let i = 0
    let messageCount = messages.length
    let tempMessages = []

    while (i < messageCount) {
      const previous = messages[i - 1]
      const current = messages[i]
      const connection = current.connection || false
      const next = messages[i + 1]
      const isMine = current.author.id === myUserId
      const author =
        isMine || (previous && previous.author.id === current.author.id)
          ? null
          : current.author
      const currentMoment = moment(current.timestamp)
      let prevBySameAuthor = true;
      let nextBySameAuthor = false
      let startsSequence = true
      let endsSequence = true
      let showTimestamp = true

      if (previous) {
        let previousMoment = moment(previous.timestamp)
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        )
        prevBySameAuthor = previous.author.id === current.author.id

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp)
        let nextDuration = moment.duration(nextMoment.diff(currentMoment))
        nextBySameAuthor = next.author.id === current.author.id

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
          author={author}
          connection={connection}
        />
      )

      // Proceed to the next message.
      i += 1
    }

    return tempMessages
  }

  const messageList = useRef()

  useEffect(() => {
    messageList.current.scrollIntoView({
      block: 'end',
    })
  }, [messages])

  return (
    <div className="message-list">
      <Toolbar
        title="Conversation"
        rightItems={[
          <ToolbarButton
            key="info"
            icon="ion-ios-information-circle-outline"
          />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]}
      />

      <div>
        <div ref={messageList} className="message-list-container">{renderMessages()}</div>
      </div>

      <Compose
        messageList={messageList}
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
      />
    </div>
  )
}
