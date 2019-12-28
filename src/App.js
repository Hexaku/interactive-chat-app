import React, { Component, createRef } from 'react'
import './App.css'
import './animations.css'
import Form from './Components/Form'
import Message from './Components/Message'

// Firebase
import base from './base'

import {
  CSSTransition,
  TransitionGroup 
} from 'react-transition-group'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: {},
      pseudo: this.props.match.params.pseudo
    }
  }

  messageRef = createRef()

  componentDidMount() {
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  componentDidUpdate() {
    const ref = this.messageRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = {...this.state.messages}
    messages[`message-${Date.now()}`] = message
    Object
    .keys(messages)
    .slice(0, -10)
    .forEach(key => {
      messages[key] = null
    })

    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object
    .keys(this.state.messages)
    .map(key => (
      <CSSTransition 
      timeout={2000}
      classNames="fade"
      key={key}
      >
        <Message 
        isUser={this.isUser}
        pseudo={this.state.messages[key].pseudo}
        message={this.state.messages[key].message}
        />
      </CSSTransition>
    ))
    return (
      <div className="box">
        <div className="messages" ref={this.messageRef}>
          <TransitionGroup className="message">
            { messages }
          </TransitionGroup>
        </div>
        <Form 
        length={140}
        addMessage={this.addMessage}
        pseudo={this.state.pseudo}
        />
      </div>
    )
  }
}

export default App
