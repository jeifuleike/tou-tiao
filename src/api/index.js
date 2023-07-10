import { login,codes,profile,channels,AllChannels,channelsList,delechannel,getProfile,setProfile,setPhoto,history } from './user'
import { articles,article,followings,deleFollowings,collections,deleCollections,likings,deleLikings } from './article'
import { suggestion,search } from './search'
import { comments,addLikings,deleLik,addComments } from './comment'
export const loginAPI = login
export const codesAPI = codes
export const profileAPI = profile
export const channelsAPI = channels
export const articlesAPI = articles
export const AllChannelsAPI = AllChannels
export const channelsListAPI = channelsList
export const delechannelAPI = delechannel
export const suggestionAPI = suggestion
export const searchApI = search
export const articleAPI = article
export const followingsAPI =followings
export const deleFollowingsAPI = deleFollowings
export const collectionsAPI = collections
export const deleCollectionsAPI = deleCollections
export const likingsAPI = likings
export const deleLikingsAPI = deleLikings
export const commentsAPI = comments
export const addLikingsAPI = addLikings
export const deleLikAPI = deleLik
export const addCommentsAPI = addComments
export const getProfileAPI = getProfile
export const setProfileAPI = setProfile
export const setPhotoAPI = setPhoto
export const historyAPI = history