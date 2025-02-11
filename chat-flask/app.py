from web_socket_server import WebSocketServer, socketio, app

app = WebSocketServer().create_app()

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    socketio.emit('message', message)

@socketio.on('signout')
def handle_signout():
    print("User has logged out.")

if __name__ == '__main__':
    socketio.run(app)