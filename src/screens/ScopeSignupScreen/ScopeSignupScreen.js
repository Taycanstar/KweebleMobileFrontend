import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Login} from '../../store/actions';

const ScopeSignupScreen = props => {
  const [enabled, setEnabled] = useState(false);
  const navigation = useNavigation();
  const [scopes, setScopes] = useState([]);
  const [popScopes, setPopScopes] = useState([]);
  const username = props?.route?.params?.username;
  const pwd = props?.route?.params?.pwd;
  const mail = props?.route?.params?.mail;
  const [users, setUsers] = useState([]);
  const [meMf, setMemf] = useState('');
  const dispatch = useDispatch();
  const [isScopeAdded, setIsScopeAdded] = useState(false);
  const [isEcAdded, setIsEcAdded] = useState(false);
  const [isEcBaseballAdded, setIsEcBaseballAdded] = useState(false);
  const [isEcTennisAdded, setIsEcTennisAdded] = useState(false);
  const [isEcGolfAdded, setIsEcGolfAdded] = useState(false);
  const [isEcBeachAdded, setIsEcBeachAdded] = useState(false);
  const [isEcSoftAdded, setIsEcSoftAdded] = useState(false);
  const [isEcVolAdded, setIsEcVolAdded] = useState(false);
  const [isPolkAdded, setIsPolkAdded] = useState(false);
  const [scopesAdded, setScopesAdded] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const me = useSelector(state => state.Reducers.userData);
  const popularScopes = [
    {
      id: 0,
      name: 'EckerdCollege',
      info: 'Welcome to the official ec scope',
      photo: require('../../../assets/images/eccircle.png'),
    },
  ];

  useEffect(() => {
    let mounted = true;
    const loadScopes = async () => {
      try {
        const {data} = await axios.get('https://kweeble.herokuapp.com/scopes/');
        if (mounted) {
          setScopes(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadScopes();

    return () => {
      mounted = false;
    };
  }, []);

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
  });

  useEffect(() => {
    let mounted = true;
    let arr = [];
    if (mounted) {
      const kwe = scopes?.filter(sc => sc.name === 'Kweeble');
      const ec = scopes?.filter(sc => sc.name === 'EckerdCollege');
      const ecbs = scopes?.filter(sc => sc.name === 'ECBaseball');
      const polk = scopes?.filter(sc => sc.name === 'PolkBaseball');
      const ectennis = scopes?.filter(sc => sc.name === 'ECTennis');
      const ecgolf = scopes?.filter(sc => sc.name === 'ECGolf');
      const ecbeach = scopes?.filter(sc => sc.name === 'ECBeachVolleyball');
      const ecsoft = scopes?.filter(sc => sc.name === 'ECSoftball');
      const ecvol = scopes?.filter(sc => sc.name === 'ECVolleyball');
      arr.push(kwe[0]);
      arr.push(ec[0]);
      arr.push(ecbs[0]);
      arr.push(polk[0]);
      arr.push(ectennis[0]);
      arr.push(ecgolf[0]);
      arr.push(ecbeach[0]);
      arr.push(ecsoft[0]);
      arr.push(ecvol[0]);

      setPopScopes(arr);
    }
    // console.log(popScopes, 'pop scopes');
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopes]);

  useEffect(() => {
    let mounted = true;
    let arr = [];
    if (mounted) {
      const usx = users?.filter(u => u.username === username);
      const u = usx[0];
      setMemf(u);
    }
    // console.log(popScopes, 'pop scopes');
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (scopesAdded.length > 0) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    }
    // console.log(popScopes, 'pop scopes');
    return () => {
      mounted = false;
    };
  }, [scopesAdded.length]);

  const onSavePressed = async data => {
    setIsLoading(true);
    //console.log(data.username.toLowerCase(), 'username');
    dispatch(Login(username, mail, pwd));
  };

  // console.log(
  //   scopesAdded.filter(sc => sc.name === 'EckerdCollege'),
  //   'ec',
  // );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topNav}>
        <TouchableOpacity style={{paddingTop: 10, borderRadius: 100}}>
          {/* <MaterialIcons
            onPress={() => navigation.navigate('SignIn')}
            name="arrow-back-ios"
            size={20}
            color="black"
          /> */}
          <Text> {`   `}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.topLogo}
            source={require('../../../assets/images/logoa.png')}
          />
        </TouchableOpacity>

        <View>
          <Text> {`   `}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.headTitle}>Scopes</Text>
        <Text style={styles.headSubitle}>
          Select at least one to get started. Each Scope has its own events,
          products, directory, and marketplace.
        </Text>
      </View>
      <ScrollView style={styles.body}>
        <View style={{flex: 1}}>
          <View style={styles.pop}>
            <Text style={styles.popTitle}>❤️ Popular</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={async () => {
                if (isScopeAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[0]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[0]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[0]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    console.log(res, 'we did it bitch');
                    console.log(res, 'res');
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[0]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[0]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsScopeAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[0]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[0]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[0]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[0]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsScopeAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[0]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isScopeAdded ? 1 : 0,
                  borderColor: isScopeAdded && Colors.primary,
                  backgroundColor: isScopeAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[0]?.photo
                      ? {uri: popScopes[0]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[0]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[0]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isScopeAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[1]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[1]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[1]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    console.log(res, 'we did it bitch');
                    console.log(res, 'res');
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[1]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[1]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[1]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[1]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[1]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[1]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[1]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcAdded ? 1 : 0,
                  borderColor: isEcAdded && Colors.primary,
                  backgroundColor: isEcAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[1]?.photo
                      ? {uri: popScopes[1]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[1]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[1]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcBaseballAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[2]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcBaseballAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[2]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[2]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsEcBaseballAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[2]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[2]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcBaseballAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[2]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[2]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[2]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[2]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcBaseballAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[2]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcBaseballAdded ? 1 : 0,
                  borderColor: isEcBaseballAdded && Colors.primary,
                  backgroundColor: isEcBaseballAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[2]?.photo
                      ? {uri: popScopes[2]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[2]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[2]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcBaseballAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcTennisAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[4]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcTennisAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[4]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[4]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsEcTennisAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[4]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[4]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcTennisAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[4]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[4]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[4]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[4]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcTennisAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[4]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcTennisAdded ? 1 : 0,
                  borderColor: isEcTennisAdded && Colors.primary,
                  backgroundColor: isEcTennisAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[4]?.photo
                      ? {uri: popScopes[4]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[4]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[4]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcTennisAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcGolfAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[5]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcGolfAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[5]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[5]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsEcGolfAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[5]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[5]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcGolfAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[5]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[5]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[5]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[5]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcGolfAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[5]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcGolfAdded ? 1 : 0,
                  borderColor: isEcGolfAdded && Colors.primary,
                  backgroundColor: isEcGolfAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[5]?.photo
                      ? {uri: popScopes[5]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[5]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[5]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcGolfAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcBeachAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[6]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcBeachAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[6]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[6]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsEcBeachAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[6]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[6]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcBeachAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[6]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[6]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[6]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[6]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcBeachAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[6]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcBeachAdded ? 1 : 0,
                  borderColor: isEcBeachAdded && Colors.primary,
                  backgroundColor: isEcBeachAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[6]?.photo
                      ? {uri: popScopes[6]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[6]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[6]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcBeachAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcSoftAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[7]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcSoftAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[7]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[7]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsEcSoftAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[7]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[7]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcSoftAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[7]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[7]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[7]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[7]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcSoftAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[7]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcSoftAdded ? 1 : 0,
                  borderColor: isEcSoftAdded && Colors.primary,
                  backgroundColor: isEcSoftAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[7]?.photo
                      ? {uri: popScopes[7]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[7]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[7]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcSoftAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (isEcVolAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[8]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcVolAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[8]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[8]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsEcVolAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[8]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[8]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsEcVolAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[8]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[8]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[8]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[8]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsEcVolAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[8]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isEcVolAdded ? 1 : 0,
                  borderColor: isEcVolAdded && Colors.primary,
                  backgroundColor: isEcVolAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[8]?.photo
                      ? {uri: popScopes[8]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[8]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[8]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isEcVolAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                if (isPolkAdded === false) {
                  try {
                    const response = await axios.put(
                      `https://kweeble.herokuapp.com/auth/${meMf?._id}`,
                      // `http://localhost:3000/auth/${meMf._id}`,
                      {
                        id: meMf._id,
                        scope: popScopes[3]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsPolkAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/us/${popScopes[3]?._id}`,
                      // `http://localhost:3000/scopes/us/${scope._id}`,
                      {
                        id: popScopes[3]?._id,
                        member: username,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    console.log(res, 'res');
                    setIsPolkAdded(true);
                    setEnabled(true);
                  } catch (error) {
                    console.log(error);
                  }
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/${popScopes[3]?._id}`,
                      // `http://localhost:3000/scopes/${scope._id}`,
                      {
                        id: popScopes[3]?._id,
                        member: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setIsPolkAdded(true);
                    setScopesAdded(oldArr => [...oldArr, popScopes[3]]);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    const res = await axios.put(
                      `https://kweeble.herokuapp.com/scopes/del/${popScopes[3]?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: popScopes[3]?._id,
                        mem: meMf?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    const resp = await axios.put(
                      `https://kweeble.herokuapp.com/auth/del/${meMf?._id}`,
                      // `http://localhost:3000/scopes/del/${data._id}`,
                      {
                        id: meMf?._id,
                        scope: popScopes[3]?._id,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );

                    setIsPolkAdded(false);
                    setScopesAdded(
                      scopesAdded.filter(sco => sco._id !== popScopes[3]?._id),
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              style={[
                styles.singleScope,
                {
                  marginBottom: 10,
                  borderWidth: isPolkAdded ? 1 : 0,
                  borderColor: isPolkAdded && Colors.primary,
                  backgroundColor: isPolkAdded
                    ? 'rgba(0, 122, 204, 0.3)'
                    : Colors.lightGray,
                },
              ]}>
              <View style={styles.left}>
                <Image
                  style={styles.eclogo}
                  source={
                    popScopes[3]?.photo
                      ? {uri: popScopes[3]?.photo}
                      : require('../../../assets/images/logo3.jpg')
                  }
                />

                <View style={styles.rowText}>
                  <Text style={styles.scopeHead}>{popScopes[3]?.name}</Text>
                  <Text style={styles.scopeDetail}>{popScopes[3]?.info}</Text>
                </View>
              </View>

              <View style={styles.right}>
                {isPolkAdded ? (
                  <Ionicons
                    name="remove-circle-outline"
                    size={28}
                    color={Colors.coolRed}
                  />
                ) : (
                  <Feather name="plus" size={25} color="black" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {isLoading ? (
        <Pressable
          // onPress={onSavePressed}
          // disabled={enabled ? false : true}
          style={{
            marginHorizontal: 30,
            backgroundColor: Colors.primary,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            opacity: enabled ? 1 : 0.5,
          }}>
          <ActivityIndicator size="small" color="white" />
        </Pressable>
      ) : (
        <Pressable
          onPress={onSavePressed}
          disabled={enabled ? false : true}
          style={{
            marginHorizontal: 30,
            backgroundColor: Colors.primary,
            height: 45,
            borderRadius: 100,
            justifyContent: 'center',
            opacity: enabled ? 1 : 0.5,
          }}>
          <Text style={styles.saveTxt}>Save and continue</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default ScopeSignupScreen;

const styles = StyleSheet.create({
  topNav: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLogo: {
    width: 35,
    height: 35,
  },
  headTitle: {
    marginBottom: 8,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headSubitle: {
    textAlign: 'center',
    color: 'gray',
  },
  body: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  popTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  pop: {
    paddingBottom: 10,
  },
  eclogo: {
    width: 37,
    height: 37,
    borderRadius: 100,
  },
  singleScope: {
    backgroundColor: Colors.lightGray,
    borderRadius: 100,
    padding: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  rowText: {
    flexDirection: 'column',
    // overflow: 'hidden',
    // maxWidth: '90%',
  },
  scopeHead: {
    marginLeft: 10,
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
  },
  scopeDetail: {
    marginLeft: 10,
  },
  left: {
    flexDirection: 'row',
    flex: 0.9,
  },
  right: {
    alignItems: 'center',
    left: 0.1,

    justifyContent: 'center',
  },
  saveBtn: {
    marginHorizontal: 30,
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    opacity: 0.5,
  },
  saveTxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
