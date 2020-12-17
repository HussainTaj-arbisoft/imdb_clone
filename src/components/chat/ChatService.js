var ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
var chatsock = ws_scheme + '://' + window.location.host;

class ChatService {
  socket = null;
  onAllMessagesReceived = null;
  onUserInfoReceived = null;
  onMessageReceived = null;
  onDisconnect = null;
  onOpen = null;
  onError = null;

  connect(userId, authToken) {
    if (this.socket !== null) {
      this.disconnect();
    }
    let url = `${chatsock}/ws/chat/user/${userId}/?token=${authToken}`;
    this.socket = new WebSocket(url);
    this.socket.onmessage = this._onSocketMessage.bind(this);
    this.socket.onclose = this.disconnect.bind(this);
    this.socket.onerror = this._onError.bind(this);
    this.socket.onopen = this._onOpen.bind(this);
  }

  disconnect(event) {
    if (this.socket !== null && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
    this.socket = null;
    if (this.onDisconnect) this.onDisconnect(event);
  }

  isClosed() {
    return this.socket === null || this.socket.readyState === WebSocket.CLOSED;
  }

  isOpen() {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  isClosing() {
    return this.socket !== null && this.socket.readyState === WebSocket.CLOSING;
  }

  isConnecting() {
    return (
      this.socket !== null && this.socket.readyState === WebSocket.CONNECTING
    );
  }

  _onSocketMessage(socketMessage) {
    var socketMessageData = JSON.parse(socketMessage.data);
    switch (socketMessageData.type) {
      case "all_messages":
        this._onAllMessagesReceived(socketMessageData.data);
        break;
      case "message":
        this._onMessageReceived(socketMessageData.data);
        break;
      case "user_info":
        this._onUserInfoReceived(socketMessageData.data);
        break;
      default:
        console.error("Unknown messsage");
        console.log(socketMessageData);
        break;
    }
  }

  _onAllMessagesReceived(messages) {
    if (this.onAllMessagesReceived) this.onAllMessagesReceived(messages);
  }
  _onMessageReceived(message) {
    if (this.onMessageReceived) this.onMessageReceived(message);
  }
  _onUserInfoReceived(info) {
    if (this.onUserInfoReceived) this.onUserInfoReceived(info);
  }

  _onOpen(event) {
    if (this.onOpen) this.onOpen(event);
  }

  _onError(event) {
    if (this.onError) this.onError(event);
  }

  sendMessage(message) {
    this.socket?.send(JSON.stringify({ type: "message", message }));
  }

  sendUserInfoRequest() {
    this.socket?.send(JSON.stringify({ type: "user_info" }));
  }

  sendAllMessagesRequest() {
    this.socket?.send(JSON.stringify({ type: "all_messages" }));
  }
}

export default ChatService;
