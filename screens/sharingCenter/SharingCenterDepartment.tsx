import React, {useEffect, useState} from 'react'
import {
    View, 
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    FlatList,
    Keyboard
} from 'react-native'
import SearchInput from '../../components/sharingCenterComponents/SearchInput'
import SharedItem from '../../components/sharingCenterComponents/SharedItem'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import axios from 'axios'
import HOST, { SERVER_PORT } from '../../configs/config'
import {useSelector} from 'react-redux'
const SharingCenterDepartment = props => {


    const [items, setItems] = useState([])

    const [searchInput, setSearchInput] = useState('')

    const [isSearching, setIsSearching] = useState(false)

    const studentDepartmentId = useSelector(state=> {
        return state.student.department.departmentId
    })

    const searchForItems = async (value: string) => {
        setIsSearching(true)
        setSearchInput(value)

        if (value.length === 0) {
            console.log('yes it is zero')
            fetchItems(false)
        }

        try {
            setIsSearching(true)
            const response = await axios.get(
                `http://${HOST}:${SERVER_PORT}/student/sharingcenter/department/search?name=${value}`
            )

            if (response.status === 200) {
                setItems(response.data.items)
            }

            setIsSearching(false)

        }
        catch (err) {
            console.log(err.message)
        }
    }


    const fetchItems = async (isCancelled: boolean) => {
        try {
            const response = await axios.get(
                `http://${HOST}:${SERVER_PORT}/student/sharingcenter/department/${studentDepartmentId}`
            )

            if (response.status === 200) {
                if (!isCancelled) {
                    setItems(response.data.items)
                }
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let isCancelled: boolean = false
        console.log('are you sure about this thing man yes?')
        fetchItems(isCancelled)

        return () => {
            isCancelled = true
        }

    }, [props.route.params])




    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SearchInput value={searchInput} searchForItems={searchForItems} />
                {searchInput.length !== 0 && isSearching ? <CustomActivityIndicator /> : <FlatList
                    contentContainerStyle={{ paddingBottom: 15, backgroundColor: 'white' }}
                    numColumns={2}
                    data={items}
                    renderItem={(itemData) => {
                        return (
                            <SharedItem
                                imageUrl={itemData.item.imageUrl}
                                itemName={itemData.item.name}
                                openDetails={() => props.navigation.navigate('ItemDetailsScreen', {
                                    item: itemData.item
                                })}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

})

export default SharingCenterDepartment