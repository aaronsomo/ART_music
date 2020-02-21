import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
  Input,
  TouchableHighlight
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import Carousel from './Carousel';
import { connect } from 'react-redux';
import {
  setLikedConcert,
  setCurrentUser,
  setCurrentGroup
} from '../redux/user/user.actions';

import {
  setAccess,
  setLikedArtists,
  setRecommendedArtists
} from '../redux/user/user.actions';
import fetch from 'node-fetch';
import { spotifyToken } from '../config/spotifyConfig';
import { render } from 'react-dom';
import axios from 'axios';
import Group from './Group';
// import { TextInput } from 'react-native-gesture-handler';

const AllGroupsPage = props => {
  const { uid, currentUser, currentGroup } = props;
  // const { navigate } = props.navigation;
  const [modalVisible, toggleModal] = useState(false);
  const [groupName, setGroupName] = useState("AARON'S TRAP YO");
  const [groupList, setGroupList] = useState(currentUser.groups);
  const [renderActiveGroup, setRenderActiveGroup] = useState(false);
  const [activeGroup, setActiveGroup] = useState('');
  // const data = ["AARON'S TRAP", "DERICK'S BOP SHIII", "DAVID'S KPOP"];
  var groupid;

  useEffect(() => {
    console.log('GroupPage console.log........');
    console.log('uid:', uid);
    console.log('\n');
    // console.log(props.currentUser);
    console.log(Object.keys(props.currentUser.liked_concerts));
  }, []);

  const createGroupThenFetch = async () => {
    const groupid = await createGroup();
    // const newGroupList = await fetchNewGroupList();
    // await setGroupList(newGroupList);
    // await console.log(groupid);
    // await console.log('*&(*&(*&(*&(*#@$: ', groupList);
    // forceUpdate();
  };
  //   const goToAddGroup = () => props.navigation.navigate('AddGroup');
  const createGroup = useCallback(() => {
    axios
      .post('http://localhost:4000/groups', {
        data: {
          groupname: groupName,
          members: [uid],
          liked_concerts: Object.keys(currentUser.liked_concerts) || null,
          liked_genres: ['trap'] // hardcoded genre, edit after ability to like genres
        }
      })
      .then(data => {
        console.log('group_id from data.data: ', data.data.group_id);
        // console.log(currentUser.groups);
        props.currentUser['groups'][data.data.group_id] = groupName;
        console.log('props.currentGroup: ', props.currentGroup);
        setCurrentGroup(props.currentGroup);
        setCurrentUser(props.currentUser);
        // console.log(currentUser.groups);
        return props.currentUser;
      })
      .then(returnValue => {
        console.log('returned value:', Object.keys(returnValue.groups));
        var groupidarray = Object.keys(returnValue.groups);
        console.log(
          'returned last group_id:',
          groupidarray[groupidarray.length - 1]
        );
        axios.put(`http://localhost:4000/users/${uid}`, {
          data: {
            group_id: groupidarray[groupidarray.length - 1]
          }
        });
        return groupidarray;
        // props.currentGroup = data.data.group_id;
      })
      .then(groupidarray => {
        // console.log('we trying to post to user data jsonb: ', groupidarray);
        // console.log(currentUser);
        axios.put(`http://localhost:4000/users/${uid}`, {
          data: {
            data: currentUser
          }
        });
        groupid = groupidarray[groupidarray.length - 1];
        // return groupid;
      })
      .then(() => fetchNewGroupList());
    // .then(res => {
    //   // alert(`Group ${groupName} has been created!`);
    //   console.log('after second fetch: ', res);
    //   setGroupList(res.data.groups);
    // });
  });

  const fetchNewGroupList = () => {
    // setGroupList({...groupList, groupName});
    axios.get(`http://localhost:4000/users/${uid}`).then(res => {
      // alert(`Group ${groupName} has been created!`);
      console.log('after second fetch: ', res);
      setGroupList(res.data.groups);
    });
  };
  // ADDS OBJECTS
  // const addToGroupList = () => {
  //   setGroupList([
  //     ...groupList,
  //     {
  //       id: groupList.length,
  //       value: groupName
  //     }
  //   ]);
  // };

  const locallySetCurrentGroup = gid => {
    groupid = gid;
  };

  return renderActiveGroup && activeGroup ? (
    <Group
      groupName={groupName}
      setRenderActiveGroup={setRenderActiveGroup}
      // groupid={groupid}
      activeGroup={activeGroup}
    />
  ) : (
    <SafeAreaView style={styles.overallcontainer}>
      <View style={styles.theadercontainer}>
        <Header
          backgroundColor="black"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Home Page', style: { color: '#fff' } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
      </View>
      <View style={styles.groupPageContainer}>
        <Text>{groupName}</Text>
        {/* <Text>{props.navigation}</Text> */}

        <Modal
          style={styles.modalContainer}
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 25
            }}
          >
            <TextInput
              // leftIcon={<Ionicons name="ios-mail" size={28} color="#2C384A" />}
              // leftIconContainerStyle={styles.iconStyle}
              placeholderTextColor="black"
              style={styles.modalInput}
              name="email"
              placeholder="Enter Group Name"
              autoCapitalize="none"
              onChangeText={text => setGroupName(text)}
            />
            <Button
              title="ADD GROUP"
              onPress={() => {
                // createGroup();
                // fetchNewGroupList();
                createGroupThenFetch();
                toggleModal(false);
                // console.log(groupList);
              }}
            >
              ADD GROUP(S)
            </Button>
            <Button title="CLOSE" onPress={() => toggleModal(false)}>
              CLOSE
            </Button>
          </View>
        </Modal>

        <Button
          title="CREATE GROUP"
          onPress={() => {
            toggleModal(true);
          }}
        >
          <Text>CREATE GROUP</Text>
        </Button>
        {/* {groupList.map(group => (
        <Group key={group.id} groupName={group.value} />
      ))} */}
        <View style={styles.groupList}>
          <FlatList
            data={Object.keys(groupList)}
            renderItem={({ item, index }) => {
              index++;
              return (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop: 10,
                    width: '100%',
                    borderWidth: 3,
                    height: 40
                  }}
                >
                  {/* <Text onPress={() => props.navigation.navigate('GroupPage')}> */}
                  <Text
                    key={item}
                    onPress={() => {
                      // setCurrentGroup(item)
                      console.log('item onpress: ', item);
                      setCurrentGroup(item);
                      // locallySetCurrentGroup(item);
                      setActiveGroup(item);
                      console.log('activeGroup after press: ', activeGroup);
                      setRenderActiveGroup(true);
                    }}
                  >
                    {groupList[item]}
                  </Text>
                </View>
              );
            }}
            keyExtractor={data => data}
          />
        </View>
        <Button title="CHAT" onPress={() => props.navigation.navigate('Chat')}>
          CHAT
        </Button>
      </View>
      <View style={styles.bheadercontainer}>
        <View style={styles.bheadericon}>
          <Icon
            type="font-awesome"
            name="home"
            color="white"
            onPress={() => props.navigation.navigate('Home')}
          ></Icon>
          <Icon
            type="font-awesome"
            name="users"
            color="white"
            onPress={() => props.navigation.navigate('Groups')}
          ></Icon>
          <Icon type="font-awesome" name="bell" color="white"></Icon>
          <Icon
            type="font-awesome"
            name="search"
            color="white"
            onPress={() => props.navigation.navigate('Search')}
          ></Icon>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overallcontainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },

  groupPageContainer: {
    flex: 11,
    // marginTop: Constants.statusBarHeight,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bheadercontainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  theadercontainer: {
    flex: 1,
    marginTop: -50,
    position: 'relative',
    zIndex: 2
  },

  bheadericon: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },

  groupList: {
    backgroundColor: 'yellow',
    height: 500,
    width: '50%'
  },

  modalButton: {},

  modalInput: {}
});

const mapStateToProps = state => ({
  uid: state.user.uid,
  currentUser: state.user.currentUser,
  recommended_artists: state.user.recommended_artists,
  access: state.user.access,
  liked_artists: state.user.liked_artists
});

const mapDispatchtoProps = dispatch => ({
  setGroupId: details => dispatch(setGroupId(details)),
  setAccess: access => dispatch(setAccess(access)),
  setLikedArtists: liked_artists => dispatch(setLikedArtists(liked_artists)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentGroup: currentGroup => dispatch(setCurrentGroup(currentGroup))
});

export default connect(mapStateToProps, mapDispatchtoProps)(AllGroupsPage);
