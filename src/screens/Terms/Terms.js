import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const Terms = () => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.nav}>
          <MaterialIcons
            onPress={onBackPress}
            name="arrow-back-ios"
            size={30}
            color="white"
          />
        </View>
        <View style={styles.topNav}>
          <Text style={styles.topText}>Terms of Service </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.beforeText}>
            Regardless of nationality, if you live in the United States, the
            Kweeble's User Agreement comprises these Terms Of Service, the
            Privacy Policy, and all incorporated policies.
          </Text>
          <Text style={styles.bodyTitle}>Kweeble's Terms of Service</Text>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyText}>
              These Terms of Service govern your access to and use of our
              services, including our various websites, SMS, APIs, email
              notifications, applications, buttons, widgets, ads, commerce
              services, and our other covered services that link to these Terms,
              and any information, text, links, graphics, photos, audio, videos,
              or other materials or arrangements of materials uploaded,
              downloaded or appearing on the Services. By using the Services you
              agree to be bound by these Terms.
            </Text>
          </View>
          <Text style={styles.bodyTitle}>1. Who May Use the Services</Text>
          <Text style={styles.bodyText}>
            You may use the Services only if you agree to form a binding
            contract with Kweeble and are not a person barred from receiving
            services under the laws of the applicable jurisdiction. In any case,
            you must be at least 13 years old, to use the Services. If you are
            accepting these Terms and using the Services on behalf of a company,
            organization, government, or other legal entity, you represent and
            warrant that you are authorized to do so and have the authority to
            bind such entity to these Terms, in which case the words “you” and
            “your” as used in these Terms shall refer to such entity.
          </Text>
          <Text style={styles.bodyTitle}>2. Privacy</Text>
          <Text style={styles.bodyText}>
            Our Privacy Policy describes how we handle the information you
            provide to us when you use our Services. You understand that through
            your use of the Services you consent to the collection and use of
            this information.
          </Text>
          <Text style={styles.bodyTitle}>3. Content on the Services </Text>
          <Text style={styles.bodyText}>
            You are responsible for your use of the Services and for any Content
            you provide, including compliance with applicable laws, rules, and
            regulations. You should only provide Content that you are
            comfortable sharing with others.
          </Text>

          <Text style={styles.bodyText}>
            Any use or reliance on any Content or materials posted via the
            Services or obtained by you through the Services is at your own
            risk. We do not endorse, support, represent or guarantee the
            completeness, truthfulness, accuracy, or reliability of any Content
            or communications posted via the Services or endorse any opinions
            expressed via the Services. You understand that by using the
            Services, you may be exposed to Content that might be offensive,
            harmful, inaccurate or otherwise inappropriate, or in some cases,
            postings that have been mislabeled or are otherwise deceptive. All
            Content is the sole responsibility of the person who originated such
            Content. We may not monitor or control the Content posted via the
            Services and, we cannot take responsibility for such Content.
          </Text>
          <Text style={styles.bodyTitle}>4. Using the Services </Text>
          <Text style={styles.bodyText}>
            Please review the Kweeble Rules and Policies, which are part of the
            User Agreement and outline what is prohibited on the Services. You
            may use the Services only in compliance with these Terms and all
            applicable laws, rules and regulations.
          </Text>
          <Text style={styles.bodyText}>
            In consideration for Kweeble granting you access to and use of the
            Services, you agree that Kweeble and its third-party providers and
            partners may place advertising on the Services or in connection with
            the display of Content or information from the Services whether
            submitted by you or others. You also agree not to misuse our
            Services, for example, by interfering with them or accessing them
            using a method other than the interface and the instructions that we
            provide. You agree that you will not work around any technical
            limitations in the software provided to you as part of the Services,
            or reverse engineer, decompile or disassemble the software, except
            and only to the extent that applicable law expressly permits.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  nav: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  topNav: {
    paddingHorizontal: 10,
    // marginBottom: 20,
    backgroundColor: Colors.primary,
    flex: 1,
  },
  topText: {
    paddingVertical: 200,
    paddingHorizontal: 15,
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.white,
  },
  body: {
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
  bodyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  beforeText: {
    lineHeight: 20,
  },
  bodyText: {
    lineHeight: 20,
    paddingBottom: 30,
  },
  bodyTextView: {
    borderBottomColor: Colors.metaIcon,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
});
