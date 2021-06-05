import * as WebBrowser from 'expo-web-browser';
import React, {useEffect, useReducer, useState} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { View } from './Themed';
import {Checkbox, Divider, Menu, Modal, Portal, TextInput} from 'react-native-paper';
import { Button } from 'react-native-paper';
import  DropDown  from  'react-native-paper-dropdown';



export default function InputInfo({ path }: { path: string }) {
    const [showDropDown, setShowDropDown] = useState(false);

    const [sector, setSector] = useState();

    const [visible, setVisible] = useState(false);


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    const  sectorList = [
        { label:  'Private', value:  'Private' },
        { label:  'Public',value:  'Public' }
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




    function handleCheck(id: any) {
        let temp = checkList.map((data) => {
            if (id === data.id) {
                return { ...data, isChecked: !data.isChecked };
            }
            return data;
        });
        setCheckList(temp)
    }
    /**
     * Append input selected from add details
     *
     * */
    function addItem() {
    }

    return (
        <View>
            <View style={styles.mainContainer}>
                <View
                    style={{flex: 3, marginTop: 7}}>
                    <Button
                        labelStyle={{fontSize: 12}}
                        mode="contained"
                        onPress={() => Alert.alert("")}
                    >
                        Monthly
                    </Button>
                </View>
                <View
                    style={{flex: 8, paddingLeft: 10}}>
                    <TextInput
                        style={styles.input}
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
                    setValue={setSector}
                    list={sectorList}
                    visible={showDropDown}
                    showDropDown={() =>  setShowDropDown(true)}
                    onDismiss={() =>  setShowDropDown(false)}
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
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>
                        {checkList.map((data, index) => {
                            return <Checkbox.Item label={data.name} key={data.id} status={data.isChecked ? 'checked' : 'unchecked'}
                                                  onPress={() => {
                                                      handleCheck(data.id);
                                                  }}/>
                        })}
                        {/*<Checkbox.Item label={"Non Taxable Allowance"}
                            status={checked1 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked1(!checked1);
                            }}
                        />
                        <Checkbox.Item label="Taxable Allowance"
                                       status={checked2 ? 'checked' : 'unchecked'}
                                       onPress={() => {
                                           setChecked2(!checked2);
                                       }}
                        />
                        <Checkbox.Item label="Meal Allowance"
                                       status={checked3 ? 'checked' : 'unchecked'}
                                       onPress={() => {
                                           setChecked3(!checked3);
                                       }}
                        />*/}
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
