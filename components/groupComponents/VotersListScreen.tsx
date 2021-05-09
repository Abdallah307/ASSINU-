import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import MemberItem from '../UI/MemberItem'

const VotersListScreen = props => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1 }}>
                {
                    props.route.params.voters.map(voter => {
                        if (voter.choiceId === props.route.params.choiceId)
                            return (
                                <MemberItem
                                    key={voter.voterId._id}
                                    imageUrl={voter.voterId.imageUrl}
                                    name={voter.voterId.name}
                                />
                            )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default VotersListScreen;