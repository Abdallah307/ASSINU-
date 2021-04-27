import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import PostHeader from '../postComponents/PostHeader';
import CustomRadioButton from './CustomRadioButton'

const PollItemSingleChoice = props => {
  const [value, setValue] = useState(props.isAlreadyVoted ? props.voter.choiceId : '');
  const [disabled, setDisabled] = useState(props.isAlreadyVoted)

  return (
    <View style={styles.pollItem}>
      <PostHeader
        imageUrl={props.poll.ownerId.imageUrl}
        ownerName={props.poll.ownerId.name}
        createdAt={props.poll.createdAt}
      />
      <Text style={styles.pollContent}>{props.poll.content}</Text>
      <RadioButton.Group onValueChange={newValue => {
        props.votePoll(props.poll._id, newValue)
        setValue(newValue)
        setDisabled(true)
      }} value={value}>
        {
          props.poll.choices.map(choice => {
            return (
              <CustomRadioButton
                openVotersListScreen={() => props.openVotersListScreen(choice._id)}
                choice={choice}
                disabled={disabled}
                key={choice._id}
              />
            )
          })
        }
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  pollItem: {
    backgroundColor: 'white',
    marginVertical: 3,
  },
  pollContent: {
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontFamily: 'OpenSans-Regular'
  }
})

export default PollItemSingleChoice;