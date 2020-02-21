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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setLikedConcert, setCurrentUser } from '../redux/user/user.actions';
import axios from 'axios';

// const goToGroupPage = props => props.navigation.navigate('GroupPage');

const Group = props => {
  // console.log('WE INSIDE GROUP.JS......:', props);
  const {
    uid,
    groupid,
    currentUser,
    currentGroup,
    group_id,
    activeGroup
  } = props;
  // const { navigate } = props.navigation;
  const [modalVisible, toggleModal] = useState(false);
  const [memberId, setMemberId] = useState('AARON ID');
  const [groupList, setGroupList] = useState([]);
  const [renderedGroup, setRenderedGroup] = useState('');
  // const [activeGroup, setActiveGroup] = useState('');
  // console.log(Object.keys(props.liked_artists));

  useEffect(() => {
    console.log('Group component: ', currentGroup);
    console.log('groupid from allgroups: ', groupid);
    console.log('TOTAL Groups from Group component: ', currentUser.groups);
    console.log('passed currentGroup from allgroups:', currentGroup);
    console.log('activeGroup: ', activeGroup);

    const postgresFetch = async () => {
      const pgFetch = await fetch(
        `http://localhost:4000/groups/${activeGroup}`,
        {
          method: 'GET'
        }
      );
      const pgGroupData = await pgFetch.json();
      console.log('data from postgres fetch: ', pgGroupData.data);
      setRenderedGroup(pgGroupData);
      // return pgGroupData;
    };
    postgresFetch();
  }, []);

  // console.log('HELLO', currentGroup);

  const addMember = () => {
    renderedGroup.data.members.push(memberId);
    // console.log(renderedGroup.data.members);
    axios.put(`http://localhost:4000/groups/${activeGroup}`, {
      data: renderedGroup
    });
  };

  //   const { groupName } = props;
  //   const { navigate } = props.navigation;
  return renderedGroup ? (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.groups}
        onPress={() => props.setRenderActiveGroup(false)}
      >
        <Text style={styles.groupsname}>
          Group Name: {renderedGroup.data.groupname}
        </Text>
        {Object.keys(renderedGroup.data.liked_concerts).map(event => (
          <Text key={event}>EVENT: {event}</Text>
        ))}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.groups}
        onPress={() => props.setRenderActiveGroup(false)}
      >
        <Text style={styles.groupsname}>Group Liked Genres: </Text>
        {renderedGroup.data.liked_genres.map(genre => (
          <Text key={genre}>{genre}</Text>
        ))}
      </TouchableOpacity>

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
            placeholder="Enter User ID"
            autoCapitalize="none"
            onChangeText={text => setMemberId(text)}
          />
          <Button
            title="ADD MEMBER"
            onPress={() => {
              addMember();
              toggleModal(false);
              // console.log(renderedGroup);
            }}
          >
            ADD MEMBER
          </Button>
          <Button title="CLOSE" onPress={() => toggleModal(false)}>
            CLOSE
          </Button>
        </View>
      </Modal>
      <Button
        title="ADD MEMBER"
        onPress={() => {
          toggleModal(true);
          // console.log(renderedGroup.data);
        }}
      >
        ADD MEMBER
      </Button>
      <View>
        <Text>Current Members:</Text>
        <FlatList
          data={renderedGroup.data.members}
          renderItem={({ item, index }) => {
            index++;
            return (
              <View>
                <Text key={index}>{item}</Text>
              </View>
            );
          }}
          keyExtractor={data => data}
        />
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  groups: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
    // borderWidth: 1,
    // height: 40
    // width: '100%'
  },

  groupsname: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    marginTop: 20
  },

  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  // console.log('MEEEEE', state);
  return {
    uid: state.user.uid,
    currentUser: state.user.currentUser,
    recommended_artists: state.user.recommended_artists,
    access: state.user.access,
    // liked_artists: state.user.liked_artists,
    currentGroup: state.user.currentGroup
  };
};

const mapDispatchtoProps = dispatch => ({
  setRecommendedArtists: details => dispatch(setRecommendedArtists(details)),
  setAccess: access => dispatch(setAccess(access)),
  setLikedArtists: liked_artists => dispatch(setLikedArtists(liked_artists)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentGroup: currentGroup => dispatch(setCurrentGroup(currentGroup))
});

export default connect(mapStateToProps, mapDispatchtoProps)(Group);
