import * as WebBrowser from 'expo-web-browser';
import React, {useEffect, useReducer, useState} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { View } from './Themed';
import {Checkbox, Divider, List, Menu, Modal, Portal, TextInput} from 'react-native-paper';
import { Button } from 'react-native-paper';
import  DropDown  from  'react-native-paper-dropdown';
import {PayoutSummary, TaxInfoModel} from "../model/TaxInfoModel";
import {computeTax} from "../api/taxService";



export default function InputInfo({ path }: { path: string }) {
    const [showDropDown, setShowDropDown] = useState(false);

    const [sector, setSector] = useState('private');
    const [payoutSummary, setPayoutSummary] = useState(new PayoutSummary());
    const [visible, setVisible] = useState(false);

    const [payModeVisible, setPayModeVisible] = useState(false);
    const [taxInfo, setTaxInfo] = useState(new TaxInfoModel());

    const togglePayTypeModal = (isVisible: boolean) => setPayModeVisible(isVisible);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    const  sectorList = [
        { label:  'Private', value:  'private' },
        { label:  'Public',value:  'public' }
    ];
    const [checkList, setCheckList] = useState([
        { isChecked: false, id: 1 , name: "Non Taxable Allowance"},
        { isChecked: false, id: 2 , name: "Taxable Allowance"},
        { isChecked: false, id: 3 , name: "Meal Allowance"},
        { isChecked: false, id: 4 , name: "Clothing Allowance"},
        { isChecked: false, id: 5 , name: "Holiday Pay"},
        { isChecked: false, id: 6 , name: "Rice Subsidy"},
        { isChecked: false, id: 7 , name: "Other Allowance"}
    ])
    const payMode = [
        {
            name: "Daily",
            value: "daily"
        },
        {
            name: "Weekly",
            value: "weekly"
        },
        {
            name: "Semi Monthly",
            value: "semiMonthly"
        },
        {
            name: "Monthly",
            value: "monthly"
        }
    ]

    const [payModeSelect, setPayModeSelect] = useState(payMode[3]);

    function handleCheck(id: any) {
        let temp = checkList.map((data) => {
            if (id === data.id) {
                if (data.isChecked) {
                    onAddDetailsChange(id, 0)
                }
                return { ...data, isChecked: !data.isChecked };
            }
            return data;
        });
        setCheckList(temp)
    }
    function updateTax() {
        let temp = taxInfo;
        setTaxInfo(temp);
        if (taxInfo.basicSalary > 0 ) {
            let result = computeTax(temp);
            setPayoutSummary(result);
            console.log(result)
        }
    }

    function onAddDetailsChange(id: number, value: number){
        value = value ? value : 0
        switch (id) {
            case 1:
                taxInfo.nonTaxableAllowance = value;
                break;
            case 2:
                taxInfo.taxableAllowance = value;
                break;
            case 3:
                taxInfo.mealAllowance = value;
                break;
            case 4:
                taxInfo.clothingAllowance = value;
                break;
            case 5:
                taxInfo.holidayPay = value;
                break;
            case 6:
                taxInfo.riceSubsidy = value;
                break;
            case 7:
                taxInfo.otherAllowance = value;
                break;
        }
        updateTax();
    }

    function handleChangeSector() {
        taxInfo.sector = sector;
        console.log(sector)
        updateTax();
    }

    return (
        <View>
            <View style={styles.mainContainer}>
                <View
                    style={{flex: 3, marginTop: 7}}>
                    <Button
                        labelStyle={{fontSize: 12, flexShrink: 1 }}
                        mode="contained"
                        onPress={() => togglePayTypeModal(true)}
                    >
                        {payModeSelect.name}
                    </Button>
                </View>
                <View
                    style={{flex: 8, paddingLeft: 10}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            taxInfo.basicSalary = parseInt(text);
                            updateTax()
                        }}
                        mode="outlined"
                        label="Salary"
                        keyboardType={"number-pad"}
                        placeholder="Enter your Salary"
                    />
                </View>
            </View>
            <View>
                <DropDown
                    label={'Sector'}
                    mode={'outlined'}
                    value={sector}
                    setValue={(value: string) => {
                        setSector(value);
                        taxInfo.sector = value;
                        updateTax();
                    }}
                    list={sectorList}
                    visible={showDropDown}
                    showDropDown={() =>  setShowDropDown(true)}
                    onDismiss={() =>  {
                        setShowDropDown(false);
                    }}
                    inputProps={{
                        right:  <TextInput.Icon  name={'menu-down'}  />,
                    }}
                />
            </View>
            <View>
                {checkList.map((data, index) => {
                    return data.isChecked ?
                        <View>
                            <TextInput style={styles.input}
                                       key={data.id}
                                mode="outlined"
                                onChangeText={(value) => {
                                    onAddDetailsChange(data.id, parseFloat(value))
                                }}
                                label={data.name}
                                keyboardType={"number-pad"} />
                        </View>
                        : null
                })}
            </View>
            <View style={styles.mainContainer}>
                <Button
                    labelStyle={{fontSize: 12}}
                    mode="contained"
                    onPress={showModal}
                >
                    + More Details
                </Button>
            </View>
            <View>
                <Text>
                    {payoutSummary.netSalary}
                </Text>
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>
                        {checkList.map((data, index) => {
                            return <Checkbox.Item label={data.name} key={data.id} status={data.isChecked ? 'checked' : 'unchecked'}
                                                  onPress={() => {
                                                      handleCheck(data.id);
                                                  }}/>
                        })}
                    </View>
                </Modal>
            </Portal>
            <Portal>
                <Modal visible={payModeVisible} onDismiss={() => togglePayTypeModal(false)} contentContainerStyle={containerStyle}>
                    <View>
                        {payMode.map((data, index) => {
                            return <List.Item key={index}
                                title={data.name}
                                 onPress={() => {
                                     setPayModeSelect(data);
                                     taxInfo.payType = data.value
                                     updateTax();
                                     togglePayTypeModal(false);
                                 }}
                            />
                        })}
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}


const containerStyle = {backgroundColor: 'white', padding: 20};
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingTop: 5,
        paddingLeft: 12,
        paddingBottom: 10
    },
    getStartedContainer: {
        alignItems: "flex-start",
        paddingTop: 5,
        paddingLeft: 2
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    input: {
        height: 35,
    },
    periodBtn: {
        fontSize: 7
    }
});
