import { createIconSetFromFontello } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { PieceLogger } from "../../avataaars-lib/react-native-avataaars/dist";
import { View, Button, StyleSheet, FlatList,Image,Text,TouchableOpacity,Dimensions} from "react-native";
import Colors from "../../../../constants/Colors";
import { withTheme } from "react-native-elements";
import store from "../../../../manager/buddyManager/GlutenBuddyStore";
import AchievementManager from "../../../../manager/buddyManager/AchievementManager";
import CeliLogger from "../../../../analytics/analyticsManager";
import SvgCache from "./SvgCache";
import {SvgXml} from "react-native-svg";


import { default as AvatarReact, Piece as PieceReact } from "../../avataaars-lib/avataaars";

/*
const styleSelectors = [
    {title:'Hairstyles',id:1},
    {title:'Haircolors',id:2},
    {title:'Expression',id:3},
    {title:'Glasses',id:4},
    {title:'Shirts',id:5},
    {title:'Skin Color',id:6},
    {title:'Facial Hair',id:7},
    {title:'Logo',id:8}
]*/

const ITEM_HEIGHT = 100
const MARGIN = 10
const PADDING = 10
const PIECE_SIZE = ITEM_HEIGHT-2*PADDING
const NUM_COLUMNS = 3

const windowWidth = Dimensions.get('window').width;

const avatarPieces = require('../../../../config/avatarCategoryItems/avatarPieces.json');

const styleSelectors = avatarPieces.map((item,index) => {
    return {"title":item.categoryTitle, "id":index}
}
)
/*
console.log(styleSelectors);

const getXML = (props) => {
    let result = ReactDOMServer.renderToString(
        React.createElement(PieceReact, __assign({}, this.props))
    );

    console.log("svg: " + result);
}
*/

const WardrobeCustomizer = (props) => {
    const [dataSource, setDataSource] = useState(null);
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(0);
    const [sectionID, setSectionID] = useState(avatarPieces[0].sectionID);
    const [pieceType, setPieceType] = useState(avatarPieces[0].pieceType);
    const [currentPieceSelection, setCurrentPieceSelection] = useState(0);
    const [footerText, setFooterText] = useState("");
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentLevelName, setCurrentLevelName] = useState("Novice");
    const [nextLevelName, setNextLevelName] = useState("Rookie");

    useEffect(() => {
        //get current level from AchievementManager
        let queryResults = async () => {
            let level = await AchievementManager.getCurrentLevel()
            let levelName = await AchievementManager.getCurrentLevelName()
            let nextLevelName = await AchievementManager.getNextLevelName()
            setNextLevelName(nextLevelName);
            setCurrentLevelName(levelName);
            setCurrentLevel(level);
        }
        queryResults();
    }, []);

    //update filter when level changed.
    useEffect(()=> {
        updateItemCategorySelected(0);
    }, [currentLevel])


    const updateItemCategorySelected = (id) => {
        setSelectedItemCategoryId(id)

        setSectionID(avatarPieces[id].sectionID);
        setPieceType(avatarPieces[id].pieceType);

        setCurrentPieceSelection(getActivePieceSelectionForSectionId(avatarPieces[id].sectionID));
        let filteredItems = avatarPieces[id].items.filter( (item) => { return item.minLevel <= currentLevel})
        if (filteredItems.length < avatarPieces[id].items.length) {
            if (nextLevelName.length > 0) {
                setFooterText("Cool new items become available once you reach the " + nextLevelName + " level.");
            } else {
                setFooterText("");
            }
        } else {
            setFooterText("");
        }
        console.log("filtering for level: " + currentLevel, filteredItems);
        setDataSource(filteredItems)
    }

    const getActivePieceSelectionForSectionId = (sectionID) => {
        switch (sectionID) {
            case 1:
                return store.activeClotheTypeId;
                break;
            case 2:
                return store.activeTopTypeId;
                break;
            case 3:
                return store.activeAccessoriesTypeId;
                break;
            case 4:
                return store.activeSkinColorId;
                break;
            case 5:
                return store.activeHairColorId;
                break;
            case 6:
                return store.activeFacialHairColorId;
                break;
            case 7:
                return store.activeFacialHairTypeId;
                break;
            case 8:
                return store.activeGraphicTypeId;
                break;
            case 9:
                return store.activeClotheColorId;
                break;
            
            default:
                break;
            //CeliLogger.addLog("OneItem", Interactions.ERROR);
        }
        console.log("warning: no selection available for section " + sectionID);
        return 0;
    }

    const receivedSvg = (item, svg) => {
        //console.log("received itemID: " + item + " svg: " + svg);
        if (!SvgCache.has(item)) {
            SvgCache.put(item,svg);
            console.log("adding svg for itemID: " + item);
        } else {
            console.log("already cached. " + item);
        }
    }

    const updatePieceSelected  = (item) => {
        //console.log("selected " + item.id + " " + pieceType + " " + sectionID);
 
        var currentScore = store.score;
        var currentLevel = store.currentLevel;
        /*
        console.log(currentLevel, "currentlevel");
        if (currentLevel < obj.minLevel) {
            var msg =
            "Your level is (" +
            (obj.minLevel - currentLevel) +
            ") too low. Add some entries to unlock this item.";
            showMessage({
            message: "Nope",
            description: msg,
            type: "warning",
            });
            console.log("nope, you cant put this on!");
            CeliLogger.addLog(selectedCategory, Interactions.ACCESS_DENIED + "!, tried putting on objId: " + item.id);
            return false;
        }*/
        let activeId = item.id;
        setCurrentPieceSelection(activeId)
        //CeliLogger.addLog(selectedCategory, Interactions.ACCESS_GRANTED + ", access granted, putting on objId: " + obj.id);
    
        switch (sectionID) {
            case 1:
                store.setClotheType(item.clotheType);
                store.setActiveClotheTypeId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new shirtId: " + item.clotheType);
                break;
            case 2:
                store.setTopType(item.topType);
                store.setActiveTopTypeId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new hairstyleId: " + item.topType);
                break;
            case 3:
                store.setAccessoriesType(item.accessoriesType);
                store.setActiveAccessoriesTypeId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new glassesId: " + item.accessoriesType);
                break;
            case 4:
                store.setSkinColor(item.skinColor);
                store.setActiveSkinColorId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new skinId: " + item.skinColor);
                break;
            case 5:
                store.setHairColor(item.hairColor);
                store.setActiveHairColorId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new hairColor: " + item.hairColor);
                break;
            case 6:
                    store.setFacialHairColor(item.facialHairColor);
                    store.setActiveFacialHairColorId(activeId);
                    CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new facialHairColor: " + item.facialHairColor);
                    break;
            case 7:
                store.setFacialHairType(item.facialHairType);
                store.setActiveFacialHairTypeId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new facialHair: " + item.facialHairType);
                break;
            case 8:
                store.setGraphicType(item.graphicType);
                store.setActiveGraphicTypeId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new logo: " + item.graphicsType);
                break;
            case 9:
                store.setClotheColor(item.clotheColor);
                store.setActiveClotheColorId(activeId);
                CeliLogger.addLog("Category " + sectionID, Interactions.CHANGED_CLOTHES + " new clotheColor: " + item.clotheColor);
                break;
            
            default:
                break;
            //CeliLogger.addLog("OneItem", Interactions.ERROR);
        }
        return true;
          
    }

    const footerComponent = () => {
        return (
            <View style={styles.footerStyle}>
                <Text style={styles.footerComponent}>{footerText}</Text>
            </View>
        );
    }

    return  (
        <View style={styles.container}>
            <View style={styles.switchesContainer}>
                <FlatList 
                
                    data={styleSelectors}
                    horizontal={true}
                    renderItem={({item}) => (
                        <View>
                            <TouchableOpacity onPress={()=>updateItemCategorySelected(item.id)}>
                                <Text style={selectedItemCategoryId==item.id?styles.itemSelected:styles.itemDeselected} >{item.title + ""} </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    extraData={selectedItemCategoryId}
                    keyExtractor={(item,index) => ""+item.id}
                />

            </View> 
            
            <FlatList
                data={dataSource}
                renderItem={({item}) => ( 
                    <TouchableOpacity style={currentPieceSelection == item.id ? [styles.imageContainer,styles.dropShadow, styles.pieceSelected]:[styles.imageContainer,styles.dropShadow]} onPress={()=>updatePieceSelected(item)} >
                    <View
                        >
                        { item.fallbackColor === undefined? 
                         SvgCache.has(item.id) ?  
                            <SvgXml xml={SvgCache.get(item.id)} width={PIECE_SIZE} height={PIECE_SIZE} />
                        : 
                        <PieceLogger
                            style={styles.imageThumbnail}
                            sectionId={sectionID}
                            pieceType={pieceType}
                            pieceSize={PIECE_SIZE}
                            eyeType={"Default"}
                            accessoriesType={item.accessoriesType}
                            topType={item.topType}
                            hairColor={item.hairColor}
                            clotheType={item.clotheType}
                            clotheColor={item.clotheColor}
                            skinColor={item.skinColor}
                            facialHairType={item.facialHairType}
                            facialHairColor={item.facialHairColor}
                            graphicType={item.graphicType}
                            eyeType={item.eyeType}
                            eyebrowType={item.eyebrowType}
                            mouthType={item.mouthType}
                            svgCallback={(svgXml) => receivedSvg(item.id, svgXml)}
                        />
                        
                        : <View style={{backgroundColor:item.fallbackColor, height:PIECE_SIZE, width:PIECE_SIZE}} />
                        }
                        <Text style={styles.pieceInfo}>{item.imgSubtitle}</Text>

                    </View>
                    </TouchableOpacity>
                )}
                //Setting the number of column
                numColumns={NUM_COLUMNS}
                keyExtractor={(item, index) => index}
                getItemLayout={(item, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
                style={styles.listContainer}
                removeClippedSubviews={false}
                ListFooterComponent={footerComponent}
            />
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'white',
      },
      listContainer: {
        alignContent: 'center',
      },
      imageContainer: {
        width: (windowWidth-6*MARGIN)/NUM_COLUMNS,
        aspectRatio: 1,
        flexDirection: 'column',
        borderRadius: 10,
        borderColor:'#eaeaea',
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: MARGIN,
        padding:PADDING,
        backgroundColor: '#f7f7f7'
      },
      imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      pieceInfo: {
          color: Colors.mainscreenColor,
          flexDirection: 'column',
          alignSelf: 'center',
          fontSize:9
      },
      pieceSelected: {
        borderColor: Colors.mainscreenColor,
        borderWidth:2,
      },
      dropShadow: {
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,  
          elevation: 2
      },
      switchesContainer: {

        padding: 5,
        width: '100%',
        minHeight:40
      },
      itemSelected: {
          color: Colors.mainscreenColor,
          textDecorationLine: 'underline',
          padding:5
      },
      itemDeselected: {
          color:'black',
          padding:5
      },
      footerStyle: {
          flex: 1,
          alignContent: 'center',
          width: '100%',
          padding: 20,
          backgroundColor: 'white'
      },
      footerComponent: {
          color: 'grey',
          fontSize: 9,
          textAlign: 'center',
      }
});

export default WardrobeCustomizer;