import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import { makeStyles, Divider } from '@rneui/themed';
import { useTheme } from '@react-navigation/native'
import Card from '../components/comment/Card'
import Input from '../components/comment/Input'
import Header from '../components/post-info/Header';
import MainImage from '../components/post-info/MainImage';
import Body from '../components/post-info/Body';
import { getPostById } from '../api-helpers/post-requests';
interface IPostProps {
  // postData: any,
  route: any,
  navigation: any
}
const Post: React.FunctionComponent<IPostProps> = ({ route, navigation }) => {
  const { postId } = route.params
  //const { colors } = useTheme()
  const [postData, setPostData] = useState<any>()
  const [addedComment, setAddedComment] = useState<any>()
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const styles = useStyles(colors)
  // const fetchPostData = async () => {
  //   await axios.get(`http://localhost:3000/posts/${postId}`).then(res => {
  //     setPostData(res.data)
  //     // console.log(res.data.comments.map(ele=> ele.id))
  //   }, err=> console.log(err))
  // }
  useEffect(() => {
    console.log(postId, 'postID')
    getPostById(postId)
    .then((res: any) => {
      setPostData(res.data);
      console.log(res.data)
    })
    .catch((err) => console.log(err))

    setIsRefreshing(false)
  }, [addedComment, postId])

  // useEffect(() => {
  //   console.log(route.params, 'route params')
  //   console.log(postData, 'post data')
  // }, [postData])

const addedCommentIndicator = () => {
  setAddedComment((prev: any) => prev + 1)
}
const UpperBodyComponents = postData && <>
<Header
        navigation={navigation}
        // colors={colors}
        postData={postData}
      />
      <MainImage imageUrl={postData.images[0]}/>
  <View style={{padding: 10}}>
    <Body
        // colors={colors}
      postData={postData}
      navigation={navigation}
      />
      <Divider
      style={styles.divider}
        width={1}
  />
        <Text style={styles.title}>{postData.comments.length} Comment(s)</Text>
  <Input addedCommentIndicator={addedCommentIndicator} postId={postId} />
      </View>
</>
return postData ?
  (<FlatList
    refreshing={isRefreshing}
    onRefresh={() => {
      console.log('Refreshed page!', addedComment)
      setIsRefreshing(true)
      setIsRefreshing(false)
    }}
    style={styles.container}
        data={postData.comments}
        renderItem={({ item }) => <Card navigation={navigation} key={item.key} commentData={item} />}
        ListHeaderComponent={UpperBodyComponents}
      />)
      :
      <View>
        <Text>Can't load post data</Text>
      </View>
  }
  // </ScrollView>
export default Post;

const styles = StyleSheet.create ({
  container: {
    paddingVertical: 5,
  },
  divider: {
    width: '90%',
    marginVertical: 5,
    alignSelf: 'center'
  },
  title: {
    marginVertical: 5,
  }
})