import React from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionItem from "../../components/questionsComponents/QuestionItem";
import { toggleFollowingStatus } from "../../store/middleware/api";

const withQuestions = (WrappedComponent) => {
  const WithQuestions = (props: any) => {
    const dispatch = useDispatch();

    const userId = useSelector((state) => {
      return state.auth.userId;
    });

    const userData = useSelector((state) => {
      return state.auth;
    });

    const openCreateQuestion = () => {
      props.navigation.navigate("CreateQuestionScreen", {
        username: userData.name,
        userImage: userData.imageUrl,
        userId: userData.userId,
      });
    };

    const onOpenQuestion = (question, isFollowing) => {
      props.navigation.navigate("FullQuestionScreen", {
        question: question,
        isFollowing: isFollowing,
        numberOfAnswers: 80,
        onFollowPressed:onFollowPressed
      });
    };

    const onFollowPressed = (questionId) => {
      dispatch(
        toggleFollowingStatus({
          questionId: questionId,
          userId: userId,
        })
      );
    };

    const openSearchScreen = () => {
        props.navigation.navigate("SearchScreen")
    }

    const renderQuestions = (itemData) => {
      const followerIndex = itemData.item.followers.findIndex((follower) => {
        return follower.followerId === userId;
      });
      let isFollowing = false;
      if (followerIndex > -1) {
        isFollowing = true;
      }

      return (
        <QuestionItem
          // numberOfAnswers={itemData.item.answers.length}
          isFollowing={isFollowing}
          onFollowPressed={() => onFollowPressed(itemData.item._id)}
          content={itemData.item.content}
          onOpenQuestion={() => onOpenQuestion(itemData.item, isFollowing)}
          ownerName={itemData.item.ownerId.name}
          ownerImage={itemData.item.ownerId.imageUrl}
          createdAt={itemData.item.createdAt}
        />
      );
    };

    return (
      <WrappedComponent
        renderQuestions={renderQuestions}
        openCreateQuestion={openCreateQuestion}
        openSearchScreen={openSearchScreen}
      />
    );
  };

  return WithQuestions;
};

export default withQuestions;
