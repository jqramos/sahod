import {Text, View} from "./Themed";
import {MonoText} from "./StyledText";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {Card, DataTable, List, Paragraph, Title} from "react-native-paper";
import NumberFormat from "react-number-format";

export default function PayoutSummary({ path , data}: { path: string, data: any}) {
    // const navigation = useNavigation();
    // const data = navigation.dangerouslyGetParent();
    const payoutData =  data.route.params;
    console.log(data.route.params)
    return (
        <ScrollView style={{height: '100%', backgroundColor: '#cfd1d4'}}>
            <View style={styles.getStartedContainer}>
                <View style={styles.cardParent}>
                    <Card style={styles.cardStyle}>
                        <Card.Content>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Basic Pay</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.taxInfo.basicSalary.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Non-Taxable Allowance</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.taxInfo.nonTaxableAllowance.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            { payoutData.taxInfo.mealAllowance > 0 ?
                                    <DataTable.Row>
                                        <DataTable.Cell ><Text style={styles.detailsText}>Meal Allowance</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={styles.detailsValue}>
                                                <NumberFormat value={payoutData.taxInfo.mealAllowance.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                            </Text>
                                        </DataTable.Cell>
                                    </DataTable.Row> : null
                            }
                            { payoutData.taxInfo.clothingAllowance > 0 ?
                                    <DataTable.Row>
                                    <DataTable.Cell ><Text style={styles.detailsText}>Clothing Allowance</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={styles.detailsValue}>
                                                <NumberFormat value={payoutData.taxInfo.clothingAllowance.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                            </Text>
                                    </DataTable.Cell>
                                </DataTable.Row> : null
                            }
                            { payoutData.taxInfo.holidayPay > 0 ?
                                <DataTable.Row>
                                    <DataTable.Cell ><Text style={styles.detailsText}>Holiday Pay</Text></DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text style={styles.detailsValue}>
                                            <NumberFormat value={payoutData.taxInfo.holidayPay.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                        </Text>
                                    </DataTable.Cell>
                                </DataTable.Row> : null
                            }
                            { payoutData.taxInfo.riceSubsidy > 0 ?
                                    <DataTable.Row>
                                        <DataTable.Cell ><Text style={styles.detailsText}>Rice Subsidy</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={styles.detailsValue}>
                                                <NumberFormat value={payoutData.taxInfo.riceSubsidy.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                            </Text>
                                        </DataTable.Cell>
                                    </DataTable.Row> : null
                            }
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Other Allowance</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.taxInfo.otherAllowance.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Taxable Allowance</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.taxInfo.taxableAllowance.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Gross Pay</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.grossSalary.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Basic Tax</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.basicTax.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>Additional Tax</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.additionalTax.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>SSS Contribution</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.sss.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>PhilHealth Contribution</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.philhealth.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell ><Text style={styles.detailsText}>PAG-IBIG Contribution</Text></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={styles.detailsValue}>
                                        <NumberFormat value={payoutData.hdmf.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            { payoutData.gsis > 0 ?
                                    <DataTable.Row>
                                        <DataTable.Cell ><Text style={styles.detailsText}>GSIS Contribution</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={styles.detailsValue}>
                                                <NumberFormat value={payoutData.gsis.toFixed(2)} displayType={'text'} renderText={value => <Text>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                                            </Text>
                                        </DataTable.Cell>
                                    </DataTable.Row> : null
                            }
                        </Card.Content>
                    </Card>
                </View>
                <View style={styles.cardPayout}>
                    <Card style={styles.cardStyle}>
                        <DataTable.Row style={styles.rowPayout}>
                                <DataTable.Cell ><Text style={styles.payoutText}>PAYOUT</Text></DataTable.Cell>
                            <DataTable.Cell numeric>
                                <NumberFormat value={payoutData.netSalary.toFixed(2)}
                                                  displayType={'text'} renderText={value => <Text  style={styles.payoutText}>{value}</Text>} thousandSeparator={true} prefix={'₱ '} />
                            </DataTable.Cell>
                        </DataTable.Row>

                    </Card>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    getStartedContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingTop: 15,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10,
        backgroundColor: '#cfd1d4',
        height: '100%'
    },
    cardParent: {
        backgroundColor: '#cfd1d4',
        width: "100%"
    },
    cardPayout: {
        width: "100%",
        backgroundColor: '#cfd1d4',
        marginTop: 25
    },
    cardStyle: {
        top: 0,
        borderRadius: 30
    },
    detailsText: {
        fontSize: 14,
        fontFamily: "roboto"
    },
    detailsValue: {
        fontSize: 14,
        fontFamily: "roboto"
    },
    payoutText: {
        fontSize: 21,
        fontFamily: "roboto-bold",
        color: 'white',
    },
    rowPayout: {
        backgroundColor:'#2c365a',
        borderRadius: 30,
        padding: 10
    }
});
