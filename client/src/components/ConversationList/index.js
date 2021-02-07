import React from 'react'
import ConversationListItem from '../ConversationListItem'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'

import './ConversationList.css'

export default function ConversationList({ conversations }) {
  return (
    <div className="conversation-list">
      <Toolbar
        title="Users"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      {/*<ConversationSearch />*/}
      {conversations.map((conversation) => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))}
    </div>
  )
}
