import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import Dialog from "react-native-dialog";
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import FoodDiaryRatingBar from '../components/FoodDiary/FoodDiaryRatingBar';
import FoodDiaryTagEdit from '../components/FoodDiary/FoodDiaryTagEdit'

export default class FoodViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("VIEW_MEAL"),
        headerRight: <HeaderMenuButton onHeaderMenuSelected={(index) => navigation.state.params.onHeaderMenuSelected(index)}/>
    })

    state = {
        event: this.props.navigation.getParam("event"),
        edit: false,
        showDeleteConfirmDialog: false,
    }

    componentDidMount() {        
        this.props.navigation.setParams({ 
            onHeaderMenuSelected: this.onHeaderMenuSelected.bind(this) ,
            // onCancelPressed: this.handleCancelButton.bind(this),
        })
    }

    onHeaderMenuSelected(index) {
        switch (index) {
          case 0: break; // this.setState({edit: true})
          case 1: this.setState({showDeleteConfirmDialog: true}); break;
        }
    }

    deleteEntry() {
        DatabaseManager.getInstance().deleteEvent(this.state.event.id, 
            (error) => {alert(error)}, 
            () => {
                GlutonManager.getInstance().setMessage(4);
                this.props.navigation.goBack();
            }
        );
    }

    render() {
        let objData = JSON.parse(this.state.event.objData);
        const tags = [LanguageManager.getInstance().getText("GLUTEN"), LanguageManager.getInstance().getText("NO_GLUTEN"), LanguageManager.getInstance().getText("UNSURE")];
        const meals = [LanguageManager.getInstance().getText("BREAKFAST"), LanguageManager.getInstance().getText("LUNCH"), LanguageManager.getInstance().getText("DINNER"), LanguageManager.getInstance().getText("SNACK")];
        
        return (
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <FoodDiaryImageEdit snapshot={objData.icon} active={false} size="medium" />
                    <FoodDiaryRatingBar active={false} rating={objData.rating} />
                </View>

                <HorizontalLineWithText text={LanguageManager.getInstance().getText("DATE")}/>
                <Text>{LanguageManager.getInstance().getDateAsText(this.state.event.created)}</Text>
                <HorizontalLineWithText text={LanguageManager.getInstance().getText("NAME")}/>
                <Text>{objData.name}</Text>
                <HorizontalLineWithText text={LanguageManager.getInstance().getText("TAGS")}/>
                <FoodDiaryTagEdit all={[tags[objData.type]]} selected={0} isExclusive={true}/>
                <HorizontalLineWithText text={LanguageManager.getInstance().getText("TYPES")}/>
                <FoodDiaryTagEdit all={[meals[objData.tag]]} selected={0} isExclusive={true}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")}/>
                <Text>{objData.note}</Text>
                <View style={{paddingBottom: 10}} />
               
                <View>
					<Dialog.Container visible={this.state.showDeleteConfirmDialog}>
						<Dialog.Title>{LanguageManager.getInstance().getText("DELETE")}</Dialog.Title>
						<Dialog.Description>
						{LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DELETE")}
						</Dialog.Description>
						<Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.setState({showDeleteConfirmDialog: false})} />
						<Dialog.Button label={LanguageManager.getInstance().getText("DELETE")} onPress={() => this.deleteEntry()} />
					</Dialog.Container>
				</View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headText:{
       fontSize: 20,
       textAlign: 'center',
       margin: 10
    },
});