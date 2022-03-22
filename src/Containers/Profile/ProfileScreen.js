import React, { Fragment } from 'react'
import {
  Text, ListItem,
  Button
} from 'react-native-elements'
import {
  View,
  ActivityIndicator,
  Modal,
  Alert,
  ScrollView,
  Linking
} from 'react-native-web'
import AsyncStorage from '@callstack/async-storage';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from '../../Stores/Example/Actions'
import USerDetails from './userDetails';
import Style from './ProfileScreenStyle'
//import NavigationService from 'App/Services/NavigationService'
//import { ScrollView } from 'react-native-gesture-handler'

const list = [
  {
    title: 'Logout',
    icon: 'account-circle',
  },
  // {
  //   title: 'Change Password',
  //   icon: 'lock',
  // },
  {
    title: 'Terms of Use',
    icon: 'lock',
  },
  {
    title: 'Sources of Health Information',
    icon: 'info',
  },
]

const handlePress = (href) => {
  Linking.canOpenURL(href).then(supported => {
    if (supported) {
      Linking.openURL(href);
    } else {
      console.log("Don't know how to open URI: " + href);
    }
  });
}

const Anchor = (props) => (
  <Text {...props} style={{ color: '#1559b7' }} onPress={() => handlePress(props.href)}>
    {props.children}
  </Text>
)

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      sourcesModalVisible: false
    }
  }

  componentDidMount() {
    console.log("Profile Screen 100");
    this._fetchUser()
  }

  render() {
    console.log("Profile Screen 1", this.props);
    return (
      <View>
        <ul class="nav nav-tabs nav-fill bg-white profile-tab" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="ex2-tab-1"
              data-mdb-toggle="tab"
              href="#ex2-tabs-1"
              role="tab"
              aria-controls="ex2-tabs-1"
              aria-selected="true"
            >Profile Information</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="ex2-tab-2"
              data-mdb-toggle="tab"
              href="#ex2-tabs-2"
              role="tab"
              aria-controls="ex2-tabs-2"
              aria-selected="false"
            >Password</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="ex2-tab-3"
              data-mdb-toggle="tab"
              href="#ex2-tabs-3"
              role="tab"
              aria-controls="ex2-tabs-3"
              aria-selected="false"
            >Payment Info</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="ex2-tab-4"
              data-mdb-toggle="tab"
              href="#ex2-tabs-4"
              role="tab"
              aria-controls="ex2-tabs-3"
              aria-selected="false"
            >Notifications</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="ex2-tab-4"
              data-mdb-toggle="tab"
              href="#ex2-tabs-4"
              role="tab"
              aria-controls="ex2-tabs-3"
              aria-selected="false"
            >Settings</a
            >
          </li>
        </ul>
        <div class="tab-content" id="ex2-content">
          <div
            class="tab-pane fade show active"
            id="ex2-tabs-1"
            role="tabpanel"
            aria-labelledby="ex2-tab-1"
          >
            <USerDetails data={this.props.user} />
          </div>
          <div
            class="tab-pane fade"
            id="ex2-tabs-2"
            role="tabpanel"
            aria-labelledby="ex2-tab-2"
          >
            Tab 2 content
          </div>
          <div
            class="tab-pane fade"
            id="ex2-tabs-3"
            role="tabpanel"
            aria-labelledby="ex2-tab-3"
          >
            Tab 3 content
          </div>
        </div>
        
        {/* {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#9086A6" />
        ) : (
          <Fragment>
            <View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.')
                }}
              >
                <View style={Style.modalHeader}>
                  <ScrollView style={Style.margin50}>
                    <Text style={Style.margin50}>Terms and conditions</Text>
                    <Text style={Style.margin50}>
                      These terms and conditions (&quot;Terms&quot;, &quot;Agreement&quot;) are an
                      agreement between Balance (&quot;Balance&quot;, &quot;us&quot;, &quot;we&quot;
                      or &quot;our&quot;) and you (&quot;User&quot;, &quot;you&quot; or
                      &quot;your&quot;). This Agreement sets forth the general terms and conditions
                      of your use of the Balance mobile application and any of its products or
                      services (collectively, &quot;Mobile Application&quot; or
                      &quot;Services&quot;).
                    </Text>
                    <Text style={Style.margin50}>Accounts and membership</Text>
                    <Text style={Style.margin50}>
                      If you create an account in the Mobile Application, you are responsible for
                      maintaining the security of your account and you are fully responsible for all
                      activities that occur under the account and any other actions taken in
                      connection with it. We may, but have no obligation to, monitor and review new
                      accounts before you may sign in and use our Services. Providing false contact
                      information of any kind may result in the termination of your account. You
                      must immediately notify us of any unauthorized uses of your account or any
                      other breaches of security. We will not be liable for any acts or omissions by
                      you, including any damages of any kind incurred as a result of such acts or
                      omissions. We may suspend, disable, or delete your account (or any part
                      thereof) if we determine that you have violated any provision of this
                      Agreement or that your conduct or content would tend to damage our reputation
                      and goodwill. If we delete your account for the foregoing reasons, you may not
                      re-register for our Services. We may block your email address and Internet
                      protocol address to prevent further registration.
                    </Text>
                    <Text style={Style.margin50}>Billing and payments</Text>
                    <Text style={Style.margin50}>
                      You shall pay all fees or charges to your account in accordance with the fees,
                      charges, and billing terms in effect at the time a fee or charge is due and
                      payable. Where Services are offered on a free trial basis, payment may be
                      required after the free trial period ends, and not when you enter your billing
                      details (which may be required prior to the commencement of the free trial
                      period). If auto-renewal is enabled for the Services you have subscribed for,
                      you will be charged automatically in accordance with the term you selected.
                      Sensitive and private data exchange happens over a SSL secured communication
                      channel and is encrypted and protected with digital signatures, and our Mobile
                      Application is also in compliance with PCI vulnerability standards in order to
                      create as secure of an environment as possible for Users. Scans for malware
                      are performed on a regular basis for additional security and protection. If,
                      in our judgment, your purchase constitutes a high-risk transaction, we will
                      require you to provide us with a copy of your valid government-issued photo
                      identification, and possibly a copy of a recent bank statement for the credit
                      or debit card used for the purchase. We reserve the right to change products
                      and product pricing at any time. We also reserve the right to refuse any order
                      you place with us. We may, in our sole discretion, limit or cancel quantities
                      purchased per person, per household or per order. These restrictions may
                      include orders placed by or under the same customer account, the same credit
                      card, and/or orders that use the same billing and/or shipping address. In the
                      event that we make a change to or cancel an order, we may attempt to notify
                      you by contacting the e-mail and/or billing address/phone number provided at
                      the time the order was made.
                    </Text>
                    <Text style={Style.margin50}>Accuracy of information</Text>
                    <Text style={Style.margin50}>
                      Occasionally there may be information in the Mobile Application that contains
                      typographical errors, inaccuracies or omissions that may relate to product
                      descriptions, pricing, availability, promotions and offers. We reserve the
                      right to correct any errors, inaccuracies or omissions, and to change or
                      update information or cancel orders if any information in the Mobile
                      Application or on any related Service is inaccurate at any time without prior
                      notice (including after you have submitted your order). We undertake no
                      obligation to update, amend or clarify information in the Mobile Application
                      including, without limitation, pricing information, except as required by law.
                      No specified update or refresh date applied in the Mobile Application should
                      be taken to indicate that all information in the Mobile Application or on any
                      related Service has been modified or updated.
                    </Text>
                    <Text style={Style.margin50}>Backups</Text>
                    <Text style={Style.margin50}>
                      We are not responsible for Content residing in the Mobile Application. In no
                      event shall we be held liable for any loss of any Content. It is your sole
                      responsibility to maintain appropriate backup of your Content. Notwithstanding
                      the foregoing, on some occasions and in certain circumstances, with absolutely
                      no obligation, we may be able to restore some or all of your data that has
                      been deleted as of a certain date and time when we may have backed up data for
                      our own purposes. We make no guarantee that the data you need will be
                      available.
                    </Text>
                    <Text style={Style.margin50}>Links to other mobile applications</Text>
                    <Text style={Style.margin50}>
                      Although this Mobile Application may link to other mobile applications, we are
                      not, directly or indirectly, implying any approval, association, sponsorship,
                      endorsement, or affiliation with any linked mobile application, unless
                      specifically stated herein. We are not responsible for examining or
                      evaluating, and we do not warrant the offerings of, any businesses or
                      individuals or the content of their mobile applications. We do not assume any
                      responsibility or liability for the actions, products, services, and content
                      of any other third-parties. You should carefully review the legal statements
                      and other conditions of use of any mobile application which you access through
                      a link from this Mobile Application. Your linking to any other off-site mobile
                      applications is at your own risk.
                    </Text>
                    <Text style={Style.margin50}>Prohibited uses</Text>
                    <Text style={Style.margin50}>
                      In addition to other terms as set forth in the Agreement, you are prohibited
                      from using the Mobile Application or its Content: (a) for any unlawful
                      purpose; (b) to solicit others to perform or participate in any unlawful acts;
                      (c) to violate any international, federal, provincial or state regulations,
                      rules, laws, or local ordinances; (d) to infringe upon or violate our
                      intellectual property rights or the intellectual property rights of others;
                      (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
                      discriminate based on gender, sexual orientation, religion, ethnicity, race,
                      age, national origin, or disability; (f) to submit false or misleading
                      information; (g) to upload or transmit viruses or any other type of malicious
                      code that will or may be used in any way that will affect the functionality or
                      operation of the Service or of any related mobile application, other mobile
                      applications, or the Internet; (h) to collect or track the personal
                      information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or
                      scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or
                      circumvent the security features of the Service or any related mobile
                      application, other mobile applications, or the Internet. We reserve the right
                      to terminate your use of the Service or any related mobile application for
                      violating any of the prohibited uses.
                    </Text>
                    <Text style={Style.margin50}>Intellectual property rights</Text>
                    <Text style={Style.margin50}>
                      This Agreement does not transfer to you any intellectual property owned by
                      Balance or third-parties, and all rights, titles, and interests in and to such
                      property will remain (as between the parties) solely with Balance. All
                      trademarks, service marks, graphics and logos used in connection with our
                      Mobile Application or Services, are trademarks or registered trademarks of
                      Balance or Balance licensors. Other trademarks, service marks, graphics and
                      logos used in connection with our Mobile Application or Services may be the
                      trademarks of other third-parties. Your use of our Mobile Application and
                      Services grants you no right or license to reproduce or otherwise use any
                      Balance or third-party trademarks.
                    </Text>
                    <Text style={Style.margin50}>Disclaimer of warranty</Text>
                    <Text style={Style.margin50}>
                      You agree that your use of our Mobile Application or Services is solely at
                      your own risk. You agree that such Service is provided on an &quot;as is&quot;
                      and &quot;as available&quot; basis. We expressly disclaim all warranties of
                      any kind, whether express or implied, including but not limited to the implied
                      warranties of merchantability, fitness for a particular purpose and
                      non-infringement. We make no warranty that the Services will meet your
                      requirements, or that the Service will be uninterrupted, timely, secure, or
                      error-free; nor do we make any warranty as to the results that may be obtained
                      from the use of the Service or as to the accuracy or reliability of any
                      information obtained through the Service or that defects in the Service will
                      be corrected. You understand and agree that any material and/or data
                      downloaded or otherwise obtained through the use of Service is done at your
                      own discretion and risk and that you will be solely responsible for any damage
                      to your computer system or loss of data that results from the download of such
                      material and/or data. We make no warranty regarding any goods or services
                      purchased or obtained through the Service or any transactions entered into
                      through the Service. No advice or information, whether oral or written,
                      obtained by you from us or through the Service shall create any warranty not
                      expressly made herein.
                    </Text>
                    <Text style={Style.margin50}>Limitation of liability</Text>
                    <Text style={Style.margin50}>
                      To the fullest extent permitted by applicable law, in no event will Balance,
                      its affiliates, officers, directors, employees, agents, suppliers or licensors
                      be liable to any person for (a): any indirect, incidental, special, punitive,
                      cover or consequential damages (including, without limitation, damages for
                      lost profits, revenue, sales, goodwill, use of content, impact on business,
                      business interruption, loss of anticipated savings, loss of business
                      opportunity) however caused, under any theory of liability, including, without
                      limitation, contract, tort, warranty, breach of statutory duty, negligence or
                      otherwise, even if Balance has been advised as to the possibility of such
                      damages or could have foreseen such damages. To the maximum extent permitted
                      by applicable law, the aggregate liability of Balance and its affiliates,
                      officers, employees, agents, suppliers and licensors, relating to the services
                      will be limited to an amount greater of one dollar or any amounts actually
                      paid in cash by you to Balance for the prior one month period prior to the
                      first event or occurrence giving rise to such liability. The limitations and
                      exclusions also apply if this remedy does not fully compensate you for any
                      losses or fails of its essential purpose.
                    </Text>
                    <Text style={Style.margin50}>Indemnification</Text>
                    <Text style={Style.margin50}>
                      You agree to indemnify and hold Balance and its affiliates, directors,
                      officers, employees, and agents harmless from and against any liabilities,
                      losses, damages or costs, including reasonable attorneys' fees, incurred in
                      connection with or arising from any third-party allegations, claims, actions,
                      disputes, or demands asserted against any of them as a result of or relating
                      to your Content, your use of the Mobile Application or Services or any willful
                      misconduct on your part.
                    </Text>
                    <Text style={Style.margin50}>Severability</Text>
                    <Text style={Style.margin50}>
                      All rights and restrictions contained in this Agreement may be exercised and
                      shall be applicable and binding only to the extent that they do not violate
                      any applicable laws and are intended to be limited to the extent necessary so
                      that they will not render this Agreement illegal, invalid or unenforceable. If
                      any provision or portion of any provision of this Agreement shall be held to
                      be illegal, invalid or unenforceable by a court of competent jurisdiction, it
                      is the intention of the parties that the remaining provisions or portions
                      thereof shall constitute their agreement with respect to the subject matter
                      hereof, and all such remaining provisions or portions thereof shall remain in
                      full force and effect.
                    </Text>
                    <Text style={Style.margin50}>Dispute resolution</Text>
                    <Text style={Style.margin50}>
                      The formation, interpretation, and performance of this Agreement and any
                      disputes arising out of it shall be governed by the substantive and procedural
                      laws of Arizona, United States without regard to its rules on conflicts or
                      choice of law and, to the extent applicable, the laws of United States. The
                      exclusive jurisdiction and venue for actions related to the subject matter
                      hereof shall be the courts located in Arizona, United States, and you hereby
                      submit to the personal jurisdiction of such courts. You hereby waive any right
                      to a jury trial in any proceeding arising out of or related to this Agreement.
                      The United Nations Convention on Contracts for the International Sale of Goods
                      does not apply to this Agreement.
                    </Text>
                    <Text style={Style.margin50}>Assignment</Text>
                    <Text style={Style.margin50}>
                      You may not assign, resell, sub-license or otherwise transfer or delegate any
                      of your rights or obligations hereunder, in whole or in part, without our
                      prior written consent, which consent shall be at our own sole discretion and
                      without obligation; any such assignment or transfer shall be null and void. We
                      are free to assign any of its rights or obligations hereunder, in whole or in
                      part, to any third-party as part of the sale of all or substantially all of
                      its assets or stock or as part of a merger.
                    </Text>
                    <Text style={Style.margin50}>Changes and amendments</Text>
                    <Text style={Style.margin50}>
                      We reserve the right to modify this Agreement or its policies relating to the
                      Mobile Application or Services at any time, effective upon posting of an
                      updated version of this Agreement in the Mobile Application. When we do, we
                      will post a notification in our Mobile Application. Continued use of the
                      Mobile Application after any such changes shall constitute your consent to
                      such changes.
                    </Text>
                    <Text style={Style.margin50}>Acceptance of these terms</Text>
                    <Text style={Style.margin50}>
                      You acknowledge that you have read this Agreement and agree to all its terms
                      and conditions. By using the Mobile Application or its Services you agree to
                      be bound by this Agreement. If you do not agree to abide by the terms of this
                      Agreement, you are not authorized to use or access the Mobile Application and
                      its Services.
                    </Text>
                    <Text style={Style.margin50}>Contacting us</Text>
                    <Text style={Style.margin50}>
                      If you would like to contact us to understand more about this Agreement or
                      wish to contact us concerning any matter relating to it, you may send an email
                      to
                      s&#117;ppo&#114;&#116;&#64;fi&#110;&#100;&#105;ng&#98;a&#108;anc&#101;&#46;i&#111;
                    </Text>
                    <Text style={Style.margin50}>
                      This document was last updated on February 22, 2020
                    </Text>

                    <View style={Style.confirmButton}>
                      <Button
                        style={Style.height50}
                        onPress={() => {
                          this.modalClose()
                        }}
                        title="Close Terms"
                        type="solid"
                        titleStyle={Style.titleStyle}
                        buttonStyle={Style.buttonStyle}
                      />
                    </View>
                  </ScrollView>
                </View>
              </Modal>
          <View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.sourcesModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.')
                }}
              >
                <View style={Style.modalHeader}>
                  <ScrollView style={Style.margin50}>

                    <Text style={{marginTop: 20, fontWeight: 500}}>Sources for Sleep</Text>

                    <View style={Style.link}>
                      <Anchor href="https://www.aasm.org/resources/pdf/pediatricsleepdurationmethods.pdf">
                      Pediatrics Sleep Duration Methods
                      </Anchor>
                    </View>

                    <View style={Style.link}>
                      <Anchor href="https://kidshelpline.com.au/teens/issues/why-sleep-so-important">
                      Why Sleep is So Important
                      </Anchor>
                    </View>

                    <Text style={Style.margin50, Style.bold}>Sources for Activity</Text>

                    <View style={Style.link}>
                      <Anchor href="https://health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf ">
                      Physical Activity Guidelines
                      </Anchor>
                    </View>

                    <View style={Style.link}>
                      <Anchor href="https://www.cdc.gov/physicalactivity/basics/pdfs/FrameworkGraphicV9.pdf">
                      Physical Activity Recommendations for Different Age Groups
                      </Anchor>
                    </View>

                    <Text style={Style.margin50, Style.bold}>Sources for Mood</Text>

                    <View style={Style.link}>
                      <Anchor href="https://kidshealth.org/en/teens/understand-emotions.html">
                      Understanding Your Emotions
                      </Anchor>
                    </View>

                    <View style={Style.link}>
                      <Anchor href="https://kidshelpline.com.au/parents/issues/helping-kids-identify-and-express-feelings">
                      Helping kids identify and express feelings
                      </Anchor>
                    </View>

                    <Text style={Style.margin50, Style.bold}>Sources for Mindfulness & Meditation</Text>

                    <View style={Style.link}>
                      <Anchor href="https://www.psychologytoday.com/us/blog/suffer-the-children/201809/7-ways-mindfulness-can-help-children-s-brains">
                      7 Ways Mindfulness Can Help Children’s Brains
                      </Anchor>
                    </View>

                    <View style={Style.link}>
                      <Anchor href="https://thriveglobal.com/stories/the-benefits-of-meditation-for-kids/#:~:text=The%20practice%20of%20meditation%20can%20help%20to%20reduce,a%20calm,%20present%20state%20anytime,%20day%20or%20night">
                      The Benefits of Meditation For Kids
                      </Anchor>
                    </View>

                    <Text style={Style.margin50, Style.bold}>Sources for Mental Health </Text>

                    <View style={Style.link}>
                      <Anchor href="https://www.cdc.gov/childrensmentalhealth/data.html">
                      CDC Data and Statistics on Children's Mental Health
                      </Anchor>
                    </View>

                    <View style={Style.link}>
                      <Anchor href="https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health">
                      Adolescent Mental Health
                      </Anchor>
                    </View>

                    <Text style={Style.margin50, Style.bold}>Neurodiversity </Text>

                    <View style={Style.link}>
                      <Anchor href="https://www.understood.org/en/friends-feelings/empowering-your-child/building-on-strengths/neurodiversity-what-you-need-to-know">
                      Neurodiversity: What you need to know
                      </Anchor>
                    </View>

                    <View style={Style.link}>
                      <Anchor href="https://autismspectrumnews.org/the-importance-of-communication-in-neurodiverse-relationships/">
                      The Importance of Communication in Neurodiverse Relationships
                      </Anchor>
                    </View>

                    <View style={Style.confirmButton}>
                      <Button
                        style={Style.height50}
                        onPress={() => {
                          this.sourcesModalClose()
                        }}
                        title="Close Sources"
                        type="solid"
                        titleStyle={Style.titleStyle}
                        buttonStyle={Style.buttonStyle}
                      />
                    </View>

                    </ScrollView>
                    </View>
              </Modal>
              </View>
           </View>
            <View>
              <Text h4 h4Style={Style.header4}>
                All About Me{' '}
              </Text>

              <View style={Style.marginTop20}>
                {list.map((item, i) => (
                  <ListItem
                    key={i}
                    button
                    onPress={() => {
                      this.logicHandler(item.title)
                    }}
                    title={item.title}
                    leftIcon={{ name: item.icon }}
                    bottomDivider
                    chevron
                  />
                ))}
              </View>
            </View>
          </Fragment>
        )} */}
      </View>
    )
  }

  _fetchUser() {
    console.log("Profile Screen 3");
    this.props.fetchUser()
  }

  modalClose() {
    this.setState({ modalVisible: false })
  }

  sourcesModalClose() {
    this.setState({ sourcesModalVisible: false })
  }

  logicHandler(item) {
    // console.log('ITEM', item)
    if (item === 'Logout') {
      this.logout()
    }
    if (item === 'Sources of Health Information') {
      this.navToSources()
    }
    if (item === 'Terms of Use') {
      this.navToTerms()
    }
  }

  async logout() {
    // console.log('LOGOUT')
    try {
      await AsyncStorage.removeItem('id_token')
      await AsyncStorage.removeItem('subscription_purchase_stub')
      //here NavigationService.navigate('SubscriptionScreen')
    } catch (exception) {
      // console.log(exception)
    }
  }

  navToTerms() {
    this.setState({ modalVisible: true })
  }

  navToSources() {
    this.setState({ sourcesModalVisible: true })
  }
}

ProfileScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
