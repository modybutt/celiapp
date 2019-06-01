
import React from 'react';
import { View, Button, Text, StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import { HeaderBackButton } from 'react-navigation'
import DatabaseManager from '../persistance/DatabaseManager';


export default class FoodDiaryScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <View style={{paddingRight: 10}}><Button title="SAVE" onPress={() => navigation.state.params.onOkPressed(true)}/></View>
    })

    state = {
        modified: true, // true for DEBUG now
        cancelSaveDialogVisible: false,
    }

    componentDidMount() {        
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })
    }

    saveCurrentData(goHome) {
        DatabaseManager.getInstance().createMealEvent("Example MealEvent", 0, 0, 3, "Example", Date.now(), (error) => { alert(error)}, null);

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    handleCancelButton() {
        if (this.state.modified == true) {
            this.showBackDiscardDialog()
        } else {
            this.navigateHome()
        }
    }

    navigateHome() {
        this.props.navigation.goBack();
    }

    showBackDiscardDialog() {
        this.setState({ cancelSaveDialogVisible: true });
    };

    handleBack() {
        this.setState({ cancelSaveDialogVisible: false });
    };

    handleDiscard() {
        this.setState({ cancelSaveDialogVisible: false });
        this.navigateHome()
    };

    render() {
        return (
            <View>
                <Text style={styles.headText}>FoodDiary</Text>

                {/*Dialog for Day Change Save Dialog*/}
                <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                        <Dialog.Title>Cancel</Dialog.Title>
                        <Dialog.Description>
                            Do you really want to discard the entries?
                        </Dialog.Description>
                        <Dialog.Button label="Back" onPress={() => this.handleBack()} />
                        <Dialog.Button label="Discard" onPress={() => this.handleDiscard()} />
                    </Dialog.Container>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    headText:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});