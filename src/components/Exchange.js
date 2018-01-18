import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, Image, Text, Button, Picker, TextInput, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet } from "react-native";

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinOwned: "Coin",
      coinDesired: "Coin",
      coinOwnedCount: "0",
      coinDesiredCount: "0",
      modalVisible: false,
      modalFocusTarget: null
    };
    this.renderPicker.bind(this)
  }

  componentWillMount() {
    this.setState({
      coinOwned: this.props.coins[this.props.ownedCoins[0].key].coinName,
      coinDesired: this.props.coins[this.props.ownedCoins[0].key].coinName === "BiebCoin" ? "BeyCoin" : "BiebCoin"
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    const mapping = {}
    this.props.ownedCoins.forEach(coin => {
      mapping[this.props.coins[coin.key].coinName] = coin
    })

    const priceMap = {}
    Object.keys(this.props.coins).forEach(coin => {
      priceMap[this.props.coins[coin].coinName] = {}
      priceMap[this.props.coins[coin].coinName].price = this.props.coins[coin].price
    })

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Vevo Coin Exchange</Text>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: 140, margin: 10}}>
            <Text style={styles.subHeader}>Your Coins:</Text>
            <Text style={styles.numInput} onPress={() => this.setState({ modalVisible: true, modalFocusTarget: "coinOwned" })}>
              {this.state.coinOwned}
            </Text>
            <TextInput
              style={styles.numInput}
              onChangeText={(coinOwnedCount) => this.setState({coinOwnedCount})}
              value={this.state.coinOwnedCount}
              keyboardType="numeric"
            />
            <Text style={styles.text}>1 Coin = ${priceMap[this.state.coinOwned].price}</Text>
          </View>
          <View style={{marginTop: 50}}>
            <Image
              style={{width: 30, height: 30}}
              source={require("../../assets/icons/arrow-flat.png")}
            />
          </View>
          <View style={{width: 140, margin: 10}}>
            <Text style={styles.subHeader} >Available Coins:</Text>
            <Text style={styles.numInput} onPress={() => this.setState({ modalVisible: true, modalFocusTarget: "coinDesired" })}>
              {this.state.coinDesired}
            </Text>
            <TextInput
              style={styles.numInput}
              onChangeText={(coinDesiredCount) => this.setState({coinDesiredCount})}
              value={this.state.coinDesiredCount}
              keyboardType="numeric"
            />
            <Text style={styles.text}>1 Coin = ${priceMap[this.state.coinDesired].price}</Text>
          </View>
        </View>

        <Text style={styles.subHeader}>You have {mapping[this.state.coinOwned].amount} {this.state.coinOwned} worth
          ${Math.round(mapping[this.state.coinOwned].amount * this.props.coins[mapping[this.state.coinOwned].key].price * 100) / 100}</Text>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
          <Text style={styles.buttonTitle}>% to Exchange:</Text>
          <Button title="25%" onPress={() => this.setState({ coinOwnedCount: "25" })}/>
          <Button title="50%" onPress={() => this.setState({ coinOwnedCount: "50" })}/>
          <Button title="75%" onPress={() => this.setState({ coinOwnedCount: "75" })}/>
          <Button title="100%" onPress={() => this.setState({ coinOwnedCount: "100" })}/>
        </View>

        <Button
            title="Confirm Transcation"
            onPress={() => {}}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ modalVisible: false })
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.3, flexDirection: 'column', marginTop: "auto", backgroundColor: "white", }} >
                {this.renderPicker()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    )
  }

  renderPicker() {
    const mapping = {}
    this.props.ownedCoins.forEach(coin => {
      mapping[coin.key] = coin
    })

    if (this.state.modalFocusTarget === "coinOwned") {
      return (
        <Picker
          selectedValue={this.state.coinOwned}
          onValueChange={(itemValue, itemIndex) => {
            const state = {}
            state.coinOwned = itemValue
            if (itemValue === this.state.coinDesired && itemValue === "BiebCoin") {
              state.coinDesired = "BeyCoin"
            } else if (itemValue === this.state.coinDesired) {
              state.coinDesired = "BiebCoin"
            }
            this.setState(state)
          }}
        >
          {mapping.beliebers && <Picker.Item label="BiebCoin" value="BiebCoin" />}
          {mapping.beyhive && <Picker.Item label="BeyCoin" value="BeyCoin" />}
          {mapping.guccigang && <Picker.Item label="GucciCoin" value="GucciCoin" />}
          {mapping.harmonizers && <Picker.Item label="HarmonyCoin" value="HarmonyCoin" />}
          {mapping.katycats && <Picker.Item label="KatyCoin" value="KatyCoin" />}
          {mapping.swifties && <Picker.Item label="SwiftCoin" value="SwiftCoin" />}
          {mapping.wutang && <Picker.Item label="WuTangCoin" value="WuTangCoin" />}
        </Picker>
      )
    } else {
      return (
        <Picker
          selectedValue={this.state.coinDesired}
          onValueChange={(itemValue, itemIndex) => {
            const state = {}
            state.coinDesired = itemValue
            this.setState(state)
          }}
        >
          {this.state.coinOwned !== "BiebCoin" && <Picker.Item label="BiebCoin" value="BiebCoin" />}
          {this.state.coinOwned !== "BeyCoin" && <Picker.Item label="BeyCoin" value="BeyCoin" />}
          {this.state.coinOwned !== "GucciCoin" && <Picker.Item label="GucciCoin" value="GucciCoin" />}
          {this.state.coinOwned !== "HarmonyCoin" && <Picker.Item label="HarmonyCoin" value="HarmonyCoin" />}
          {this.state.coinOwned !== "KatyCoin" && <Picker.Item label="KatyCoin" value="KatyCoin" />}
          {this.state.coinOwned !== "SwiftCoin" && <Picker.Item label="SwiftCoin" value="SwiftCoin" />}
          {this.state.coinOwned !== "WuTangCoin" && <Picker.Item label="WuTangCoin" value="WuTangCoin" />}
        </Picker>
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        flexDirection: "column"
    },
    header: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    subHeader: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 3
    },
    buttonTitle: {
        color: "#ffffff",
        fontSize: 17,
        paddingTop: 9
    },
    numInput: {
        color: "#ffffff",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ffffff",
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5
    },
    text: {
        color: "#ffffff",
        fontSize: 14,
        marginTop: 3,
        marginBottom: 3
    },
});

const mapStateToProps = state => ({
    coins: state.coins,
    ownedCoins: state.user.wallet.coins
});

export default connect(mapStateToProps)(Exchange);
