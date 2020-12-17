import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import withAuth from "../auth/withAuth";
import Header from "../layout/Header";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import ChatService from "./ChatService";
import LastSeen from "./LastSeen";
import MessageBubble from "./MessageBubble";
import UpdateLastSeen from "./UpdateLastSeen";

class UserChat extends Component {
  chatServiceInstance = new ChatService();

  constructor() {
    super();
    this.chatServiceInstance.onMessageReceived = (message) => {
      this.safeSetState({
        receivedMessages: [...this.state.receivedMessages, message],
      });
      this.scrollToBottom();
    };
    this.chatServiceInstance.onUserInfoReceived = (info) => {
      this.safeSetState({ user_info: info });
    };
    this.chatServiceInstance.onAllMessagesReceived = (allMessages) => {
      this.safeSetState({
        receivedMessages: allMessages,
        messagesStatus: "loaded",
      });
      this.scrollToBottom();
    };
    this.chatServiceInstance.onError = (event) => {
      this.safeSetState({ status: "error" });
      console.error(event);
    };
    this.chatServiceInstance.onDisconnect = (event) => {
      this.safeSetState({ status: "error" });
      console.log("connection closed");
    };
    this.chatServiceInstance.onOpen = (event) => {
      this.safeSetState({ messagesStatus: "loading" });
      this.chatServiceInstance.sendAllMessagesRequest();
      this.chatServiceInstance.sendUserInfoRequest();
    };
  }

  state = {
    message: "",
    receivedMessages: [],
    user_info: {},
    messagesStatus: "loaded",
  };

  safeSetState(state) {
    if (this._isMounted) this.setState(state);
  }

  componentDidMount() {
    this.connectChatService();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.chatServiceInstance.disconnect();
    this._isMounted = false;
  }

  connectChatService() {
    let userId = this.props.match.params.userId;
    let authToken = this.props.auth.authToken;
    this.chatServiceInstance.connect(userId, authToken);
  }

  scrollToBottom() {
    let chatMessages = document.getElementById("chatMessages");
    chatMessages?.scrollTo(0, chatMessages.scrollHeight);
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessage = () => {
    if (this.state.message.trim() !== "") {
      this.chatServiceInstance.sendMessage(this.state.message);
      this.setState({ message: "" });
    }
  };

  sendMessageKeyUp = (e) => {
    if (e.code === "Enter") this.sendMessage();
  };

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <p>Sorry, this area is only for signed in users.</p>;
    }

    if (this.chatServiceInstance.isClosed()
      && this.state.messagesStatus === "loaded") {
      return (
        <div>
          <Header />
          <p className="text-light text-center">
            Connection is closed. If chat doesn't connect for 30 seconds,
            please try reloading the tab, or contact the developer.
          </p>
        </div>
      );
    }

    let userInfo = this.state.user_info;

    let contactInfo = (
      <div className="bg-dark p-2 my-2 rounded d-flex align-items-center">
        <img
          src={userInfo?.profile?.image}
          alt="profile"
          height="70"
          width="70"
          style={{ objectFit: "cover", objectPosition: "top" }}
          className="rounded mx-2"
        />
        <div>
          <p className="text-light font-weight-bold my-0">
            {userInfo?.first_name} {userInfo?.last_name}
          </p>
          <LastSeen user={userInfo} />
        </div>
      </div>
    );

    let messageInputBar = (
      <div className="input-group input-group-sm mb-1 mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Your message"
          aria-label="Your message"
          aria-describedby="message-input"
          onChange={this.handleMessageChange}
          value={this.state.message}
          onKeyUp={this.sendMessageKeyUp}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={this.sendMessage}
          >
            <span className="fa fa-send"></span>
          </button>
        </div>
      </div>
    );

    let senderId = this.props.auth.user.id;
    return (
      <div>
        <Header />
        <StatusBasedComponent
          status={this.state.messagesStatus}
          bottomText="Loading your messages..."
          className="text-light"
          errorMessage="Connection lost unexpected. Try refreshing."
        >
          <div
            className="container d-flex flex-column justify-content-between"
            style={{ maxHeight: "90vh", minHeight: "90vh" }}
          >
            {contactInfo}
            <div
              className="d-flex flex-column p-2 mt-auto"
              style={{ overflow: "auto" }}
              id="chatMessages"
            >
              {this.state.receivedMessages.map((msg) => (
                <MessageBubble message={msg} senderId={senderId} key={msg.id} />
              ))}
            </div>
            {messageInputBar}
          </div>
        </StatusBasedComponent>
        <UpdateLastSeen />
      </div>
    );
  }
}

export default withAuth(withRouter(UserChat));
