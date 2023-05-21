import * as React from "react";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { StatusBar } from "react-native";

import {
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    Dimensions
} from "react-native";





const OnBoardingScreen = ({ navigation, route }) => {





    return (
                <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center', flexDirection: 'column' }}>
                    
                    <StatusBar
                        background={COLORS.white}
                        backgroundColor={COLORS.white}
                        barStyle="dark-content"
                        style={{ backgroundColor: COLORS.white, flex: 1 }}
                    ></StatusBar>



                    <Text
                        style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: SIZES.font,
                            fontFamily: FONTS.regular,
                            color: COLORS.text,
                            position: 'absolute',
                            top: 32,
                            right: 24,
                            padding: 14,
                            zIndex: 2
                        }}
                        onPress={() => { route.params.finishBoarding() }}
                    >
                        Skip
                    </Text>

                    <Image
                        source={assets.boardingOne}
                        style={{ width: Dimensions.get("window").width*0.8, resizeMode: 'contain',height:Dimensions.get("window").width*0.9, marginTop:"15%"}} />
                    <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop:16}}>
                        <Text
                            style={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: SIZES.extraLarge,
                                fontFamily: FONTS.bold,
                                color: COLORS.text,
                            }}
                        >
                            boardingOneH
                        </Text>

                        <Text
                            style={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.text,
                                marginTop: SIZES.medium
                            }}
                        >
                            boardingOneP
                        </Text>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, width: '100%', position: 'absolute', bottom: 48, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ height: 12, width: 12, borderRadius: 10, backgroundColor: COLORS.blue }} />
                            <View style={{ height: 12, width: 12, borderRadius: 10, backgroundColor: COLORS.grey, marginStart: 8 }} />
                            <View style={{ height: 12, width: 12, borderRadius: 10, backgroundColor: COLORS.grey, marginStart: 8 }} />

                        </View>


                        <Pressable
                            style={{ height: 48, backgroundColor: COLORS.blue, justifyContent: 'center', alignItems: 'center', width: '30%', borderRadius: 8 }}
                            onPress={() => {
                                navigation.navigate("OnBoardingTwoScreen")

                            }}
                        >
                            <Text style={{ color: COLORS.white, fontSize: SIZES.font, fontWeight: FONTS.semiBold }}>Next</Text>
                        </Pressable>
                    </View>

                </SafeAreaView>
    )

}

export default OnBoardingScreen;