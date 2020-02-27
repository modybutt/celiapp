import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native';

export default class ResultBlock extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      resultText: "Result: ",
      accuracyText: 'Accuracy: ',
      dateText: 'Date: ',
      timeText: 'Time: ',
    };
  }
  //../components/ResultDisplay
  renderImage(){
    let resultIcon;
    switch(this.props.dataBlock.resultState) {
        case 0:
           resultIcon =  <Image
            style={{width: 100, height: 100}}
            source={require('../assets/images/check.png')}/>
          break;
        case 1:
            resultIcon =  <Image
            style={{width: 100, height: 100}}
            source={require('../assets/images/cross.png')}/>
          break;
        case 2:
            resultIcon =  <Image
            style={{width: 100, height: 100}}
            source={require('../assets/images/question.png')}/>
           break;
        default:
            resultIcon =  <Image
            style={{width: 100, height: 100}}
            source={require('../assets/images/question.png')}/>
      }
      return resultIcon;
  }


  render() {
    return (
        <View style={{
            height: 110,
            width: 350,
            backgroundColor: '#9ADEEF',
            flexDirection: 'row',
            padding: 5,
            }}>
                

           {this.renderImage()}

            <View style={{
                flexDirection: 'column',
                }}>

                <Text style={styles.baseText}>
                    <Text style={styles.baseText}>
                        {this.state.resultText}{this.props.dataBlock.resultValue}{'\n'}{'\n'}
                    </Text>

                    <Text style={styles.baseText}>
                    {this.state.accuracyText}{this.props.dataBlock.accuracyPercentText}{'% \n'}{'\n'}
                    </Text>

                    <Text style={styles.baseText}>
                        {this.state.dateText}{this.props.dataBlock.dateValue}{'\n'}{'\n'}
                    </Text>

                    <Text style={styles.baseText}>
                        {this.state.timeText}{this.props.dataBlock.timeValue}{'\n'}{'\n'}
                    </Text>
                </Text>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{

    },
  baseText: {
    paddingLeft: 20,
    paddingTop: 15,
    textAlign: 'left',
    lineHeight: 12,
    fontSize: 18,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


//Expected Datablock Template
/**
 * 
 * var displayBlock = {
  resultValue: 20,
  accuracyPercentText: 2220,
  dateValue: '12/12/12',
  timeValue: '12:12',
  resultState: 3
}
 */