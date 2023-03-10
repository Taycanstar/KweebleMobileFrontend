import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
// import Pusher from 'pusher-js/react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newMsg, setNewMsg] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const data = useSelector(state => state.Reducers.userData);

  const scrollX = new Animated.Value(0);

  useEffect(() => {
    let mounted = true;
    const loadMessages = async () => {
      try {
        const {data} = await axios.get(
          'https://kweeble.herokuapp.com/messages/',
        );
        if (mounted) {
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadMessages();
    return () => {
      mounted = false;
    };
  }, [messages]);

  useEffect(() => {
    let mounted = true;
    const loadGroups = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/groups/');
        if (mounted) {
          setGroups(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadGroups();
    return () => {
      mounted = false;
    };
  }, [groups]);

  // console.log(groups);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/api');
        if (mounted) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
    return () => {
      mounted = false;
    };
  }, []);

  const mydatax = messages.map(msg => {
    return groups.filter(gr => msg.recipient === gr._id);
  });

  const datax2 = mydatax.filter(data => data.length > 0);
  const finalx = [...new Set(datax2)];
  const mergedx = [].concat.apply([], finalx);

  const mydata = users.map(user => {
    return messages.filter(
      message =>
        (message.recipient === user._id && message.user === data._id) ||
        (message.recipient === data._id && message.user === user._id),
    );
  });

  const data2 = mydata.filter(data => data.length > 0);
  const final = [...new Set(data2)];
  const merged = [].concat.apply([], final);

  const data3 = groups.filter((group, index) => {
    return group.members.includes(data._id);
  });

  //Filter users I have messages with
  useEffect(() => {
    const mydata = messages.map(message => {
      return users.filter(
        user =>
          (message.recipient === user._id && message.user === data._id) ||
          (message.recipient === data._id && message.user === user._id),
      );
    });

    const data3 = groups.filter((group, index) => {
      return group.members.includes(data._id);
    });

    // console.log(data3, 'group');

    const data2 = mydata.filter(data => data.length > 0);
    const merged = [].concat.apply([], data2);
    const merged2 = [].concat.apply(data3, merged);
    const final = [...new Set(merged2)];

    // console.log(final);

    const mydata2 = final.map(user => {
      return messages.filter(
        message =>
          (message.recipient === user._id && message.user === data._id) ||
          (message.recipient === data._id && message.user === user._id),
      );
    });

    const mydata3 = final.map(group => {
      return messages.filter(message => message.recipient === group._id);
    });

    // console.log(mydata3);

    final.forEach((item, index) => {
      if (mydata2[index][mydata2[index].length - 1] !== undefined) {
        item.msg = mydata2[index][mydata2[index].length - 1].text;
        item.from = mydata2[index][mydata2[index].length - 1].user;
        item.receiverHasRead =
          mydata2[index][mydata2[index].length - 1].receiverHasRead;
        item.messageId = mydata2[index][mydata2[index].length - 1]._id;
      } else {
        item.msg = '';
        item.from = '';
        item.receiverHasRead = true;
        item.messageId = undefined;
      }
    });
    setFilteredUsers(final);

    // console.log(filteredUsers, 'tiani');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data._id, messages, users, newMsg, groups]);

  const onPress = async () => {
    try {
      const res = await axios.put(
        'https://kweeble.herokuapp.com/messages/',
        {
          receiverHasRead: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap, rowKey) => {
    try {
      closeRow(rowMap, rowKey);
      const newData = [...filteredUsers];
      const prevIndex = filteredUsers.findIndex(i => i.index === rowKey);
      console.log(prevIndex, 'prev');
      newData.splice(prevIndex, 1);
      setFilteredUsers(newData);
      // merged.map(async msg => {
      const res = await axios.delete(
        `https://kweeble.herokuapp.com/messages/${merged[prevIndex]._id}`,
        {id: merged[prevIndex]._id},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res, 'product deleted');
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGroup = async (rowMap, rowKey) => {
    try {
      closeRow(rowMap, rowKey);
      const newData = [...filteredUsers];
      const prevIndex = filteredUsers.findIndex(i => i.index === rowKey);
      console.log(prevIndex, 'prev');
      newData.splice(prevIndex, 1);
      setFilteredUsers(newData);
      // merged.map(async msg => {
      const res = await axios.delete(
        `https://kweeble.herokuapp.com/messages/${merged[prevIndex]._id}`,
        {id: merged[prevIndex]._id},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res, 'product deleted');
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      merged.map(async msg => {
        const res = await axios.delete(
          `https://kweeble.herokuapp.com/messages/${msg._id}`,
          {id: msg._id},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(res, 'product deleted');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const HiddenItemsWithActions = (item, rowMap) => {
    // const {onClose, onDelete, swipeAnimatedValue} = props;
    const scrollX = new Animated.Value(0);
    return (
      <View style={styles.rowBack}>
        <Text>good4u</Text>
        <TouchableOpacity
          onPress={() => closeRow(rowMap, item.index)}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}>
          <Animated.View style={{height: 25, width: 25, marginRight: 7}}>
            <MaterialCommunityIcons
              name="arrow-right-bold-box-outline"
              size={25}
              color="white"
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            item.item.isGroup === true
              ? async () => {
                  try {
                    const res = await axios.delete(
                      `https://kweeble.herokuapp.com/groups/${item.item._id}`,
                      {id: item.item._id},
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    console.log(res, 'product deleted');
                  } catch (error) {
                    console.log(error);
                  }
                }
              : () => deleteRow(rowMap, item.__v)
          }
          style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Animated.View
            style={{
              height: 25,
              width: 25,
              marginRight: 7,
            }}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={25}
              color="white"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (item, rowMap) => {
    return (
      <HiddenItemsWithActions
        rowMap={rowMap}
        item={item}
        // onClose={close}
        onDelete={() => deleteRow(rowMap, item.__v)}
      />
    );
  };

  // console.log(filteredUsers);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <SwipeListView
          leftOpenValue={75}
          rightOpenValue={-150}
          renderHiddenItem={HiddenItemsWithActions}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={filteredUsers}
          keyExtractor={(item, index) => String(index)}
          // keyExtractor={item => item._id}
          renderItem={({item, index}) => (
            <View style={styles.rowFront}>
              <TouchableHighlight>
                <TouchableOpacity
                  onPress={async () => {
                    item.isGroup === true
                      ? navigation.navigate('GroupChatScreen', {
                          groupName: item.name,
                          photo: item.photo,
                          members: item.members,
                          groupId: item._id,
                          description: item.description,
                        })
                      : navigation.navigate('Dm', {
                          itemId: item._id,
                          msgName: item.name,
                        });
                    try {
                      const res = await axios.put(
                        `https://kweeble.herokuapp.com/messages/${item.messageId}`,
                        {
                          receiverHasRead: true,
                        },
                        {
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        },
                      );

                      console.log(res, '<==res from press');
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  style={styles.card}>
                  <View style={styles.userInfo}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        // height: '75%',
                        paddingRight: 8,
                      }}>
                      <View
                        style={{
                          backgroundColor:
                            item.receiverHasRead === true ||
                            item.from === data._id
                              ? 'white'
                              : Colors.primary,
                          width: 10,
                          height: 10,
                          borderRadius: 100,
                        }}></View>
                    </View>

                    <View style={styles.userImageWrapper}>
                      <Image
                        style={styles.userImg}
                        source={
                          item.photo
                            ? {uri: item.photo}
                            : require('../../../assets/images/user.png')
                        }
                      />
                    </View>
                    <View style={styles.textSection}>
                      <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.postTime}>{item.messageTime}</Text>
                      </View>
                      <Text style={styles.messageText}>{item.msg}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 20,
    paddingRight: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 10,
  },
  card: {
    width: '100%',
    marginTop: 3,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImageWrapper: {
    padddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    // height: 55,
    // backgroundColor: 'green',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 10,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.subtleGray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRight: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
    zIndex: 30,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: Colors.awesomeRed,
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 13,
    color: '#999',
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    // height: 60,
    // margin: 5,
    // marginBottom: 15,
    // shadowColor: '#999',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
});
