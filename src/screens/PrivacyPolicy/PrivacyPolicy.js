import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={styles.container}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.nav}>
          <MaterialIcons
            onPress={onBackPress}
            name="arrow-back-ios"
            size={30}
            color="white"
          />
        </View>
        <View style={styles.topNav}>
          <Text style={styles.topText}>PrivacyPolicy </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.beforeText}>
            We’ve written our Privacy Policy as simply as possible to empower
            you to make informed decisions when you use Kweeble by making sure
            you understand and have control over the information we collect, how
            it’s used, and when it’s shared.
          </Text>
          <Text style={styles.bodyTitle}>Kweeble's Privacy Policy</Text>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>
              What data do you collect about me?
            </Text>
            <Text style={styles.bannerSubtitle}>
              You give some data, we get some data. In return we offer useful
              services.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>1. Information We Collect</Text>
            <Text style={styles.bodyText2}>
              The information we collect when you use Kweeble falls into three
              categories.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>
              1.1 Information you provide us.
            </Text>
            <Text style={styles.bodyText2}>
              To use some of our products and services you need to have an
              account, and to create an account, you need to provide us certain
              information. Likewise, if you use our paid products and services,
              we cannot provide them to you without getting payment information.
              Basically, certain information is necessary if you want to use
              many of our products and services.
            </Text>

            <Text style={styles.bodyText2}>
              {'• '}
              <Text style={{fontWeight: 'bold'}}>Personal Accounts.</Text> If
              you create an account, you must provide us with some information
              so that we can provide our services to you. This includes a
              display name a username; a password; an email address or phone
              number; a date of birth; and any school related information you
              want to display on your profile.
            </Text>
            <Text style={styles.bodyText2}>
              {'• '}
              <Text style={{fontWeight: 'bold'}}>Preferences. </Text>
              When you set your preferences using your settings, we collect that
              information so that we can respect your preferences.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>
              1.2 Information we collect when you use Kweeble
            </Text>
            <Text style={styles.bodyText2}>
              When you use our services, we collect information about how you
              use our products and services. We use that information to provide
              you with products and services, to help keep Kweeble more secure
              and respectful for everyone, and more relevant to you.
            </Text>
            <Text style={styles.bodyText2}>
              <Text style={{fontWeight: 'bold'}}>Usage Information. </Text>
              We collect information about your activity on Kweeble, including:
            </Text>
            <Text style={styles.bodyText3}>
              {'• '}
              Events and other content you post (including the date,
              application, and version of Kweeble).
            </Text>
            <Text style={styles.bodyText3}>
              {'• '}
              Your interactions with other users’ content.
            </Text>
            <Text style={styles.bodyText3}>
              {'• '}
              How you interact with others on the platform, such as people you
              follow and people who follow you, and when you use Direct
              Messages, including the contents of the messages, the recipients,
              and date and time of messages.
            </Text>
            <Text style={styles.bodyText3}>
              {'• '}
              If you communicate with us, such as through email, we will collect
              information about the communication and its content.
            </Text>
            <Text style={styles.bodyText2}>
              {'• '}
              We collect information on links you interact with across our
              services (including in our emails sent to you).
            </Text>
          </View>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>
              How do you use my information?
            </Text>
            <Text style={styles.bannerSubtitle}>
              To make Kweeble the service you know and love.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>2. How we use Information</Text>
            <Text style={styles.bodyText2}>
              Breaking down how we use the information we collect is not simple
              because of the way the systems that bring our services to you
              work. For example, the same piece of information may be used
              differently for different purposes to ultimately deliver a single
              service. We think it’s most useful to describe the five main ways
              we use information and if you have questions that are not
              answered, you can always contact us. Here we go:
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>
              2.1 Operate, improve and personalize our services.
            </Text>
            <Text style={styles.bodyText2}>
              We use the information we collect to provide and operate Kweeble
              products and services. We also use the information we collect to
              improve and personalize our products and services so that you have
              a better experience on Kweeble.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>
              2.2 Foster safety and security
            </Text>
            <Text style={styles.bodyText2}>
              We use information we collect to provide for the safety and
              security of our users, our products, services, and your account.
              This includes verifying your identity, authenticating your
              account, and defending against fraud, unauthorized use, and
              illegal activity. We also use the information to evaluate and
              affect the safety and quality of content on Kweeble - this
              includes investigating and enforcing our policies and and terms,
              as well as applicable law.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>
              2.3 Measure, analyze and make our services better.
            </Text>
            <Text style={styles.bodyText2}>
              We use the information we collect to measure and analyze the
              effectiveness of our products and services and to better
              understand how you use them in order to make them better.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>
              2.4 Communicate with you about our services.
            </Text>
            <Text style={styles.bodyText2}>
              We use the information we collect to communicate with you about
              our products and services, including about product updates and
              changes to our policies and terms. If you’re open to hearing from
              us, we may also send you marketing messages from time to time.
            </Text>
          </View>
          <View style={styles.bodyTextView}>
            <Text style={styles.bodyTitle2}>2.5 Research</Text>
            <Text style={styles.bodyText2}>
              We use information you share with us, or that we collect to
              conduct research, surveys, product testing, and troubleshooting to
              help us operate and improve our products and services.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

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
    color: Colors.metaIcon,
  },
  bodyText: {
    lineHeight: 20,
    paddingBottom: 30,
  },
  bodyTextView: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  banner: {
    backgroundColor: '#f2f7fa',
    padding: 15,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 10,
  },
  bannerTitle: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 18,
  },
  bannerSubtitle: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 24,
  },
  bodyTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  bodyText2: {
    lineHeight: 20,
    paddingBottom: 30,
    color: Colors.metaIcon,
  },
  bodyText3: {
    lineHeight: 20,
    paddingBottom: 10,
    color: Colors.metaIcon,
  },
});
