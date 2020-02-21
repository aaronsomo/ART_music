import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import Constants from 'expo-constants';
import { Icon, Header } from 'react-native-elements';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatLog: []
    };
  }

  componentDidMount() {
    this.socket = io('http://10.50.67.101:4000');
    this.socket.on('chat message', msg => {
      this.setState({
        chatLog: [...this.state.chatLog, msg]
      });
    });
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({
      chatMessage: ''
    });
  }

  render() {
    const chatLog = this.state.chatLog.map(chatLog => (
      <Text key={chatLog}>{chatLog}</Text>
    ));
    return (
      <View style={styles.container}>
        {chatLog}
        <View style={styles.bottom}>
          <TextInput
            style={styles.inputField}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({ chatMessage: chatMessage });
            }}
          ></TextInput>
        </View>
        <View style={styles.bheadercontainer}>
          <View style={styles.bheadericon}>
            <Icon
              type="font-awesome"
              name="home"
              color="white"
              onPress={() => this.props.navigation.navigate('Home')}
            ></Icon>
            <Icon
              type="font-awesome"
              name="users"
              color="white"
              onPress={() => this.props.navigation.navigate('Groups')}
            ></Icon>
            <Icon type="font-awesome" name="bell" color="white"></Icon>
            <Icon
              type="font-awesome"
              name="search"
              color="white"
              onPress={() => this.props.navigation.navigate('Search')}
            ></Icon>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: Constants.statusBarHeight,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  },

  inputField: {
    // flex: 1,
    // display: 'flex',
    position: 'absolute',
    bottom: 0,
    // justifyContent: 'flex-end',
    height: 40,
    width: '100%',
    borderWidth: 1
  },

  bheadercontainer: {
    flex: 1,
    backgroundColor: 'black'
  },

  bheadericon: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});
