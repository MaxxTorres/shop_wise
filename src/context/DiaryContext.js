import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'
import {productsTest} from '../api/productsTest'

// reducer is unique to each Context we generate
const postReducer = (state, action) => {
  switch (action.type) {
    case 'get_posts':
      return action.payload
    case 'delete_post':
      return state.filter((post) => post.id !== action.payload)
    case 'edit_post':
      return state.map((post) => {
        return post.id === action.payload.id ? action.payload : post
      })
    default:
      return state
  }
}

const getDiaryPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('posts')
    dispatch({type: 'get_posts', payload: response.data})
  }
}

// action helpers, now bound with dispatch
const addDiaryPost = () => {
  return async (item, price, store, purpose, purchased, callback) => {
    const response = await jsonServer.post('/posts', {item, price, store, purpose, purchased})
    if (callback) {
      callback()
    }
  }
}

const deleteDiaryPost = (dispatch) => {
  return async (id) => {
    const response = await jsonServer.delete(`/posts/${id}`)
    dispatch({type: 'delete_post', payload: id})
  }
}

const editDiaryPost = (dispatch) => {
  return async (id, item, price, store, purpose, purchased, callback) => {
    await jsonServer.put(`/posts/${id}`, {item, price, store, purpose, purchased})
    dispatch({type: 'edit_post', payload: {id, item, price, store, purpose, purchased}})
    if (callback) {
      callback()
    }
  }
}

export const {Context, Provider} = createDataContext(
  postReducer,
  {
    getDiaryPosts,
    addDiaryPost,
    deleteDiaryPost,
    editDiaryPost,
  },
  []
)
