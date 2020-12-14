import axios from 'axios'
import * as types from './types';
import { CHAT_SERVER_API_URL, AUTH_SERVER_API_URL } from '../hosts'
import { createErrorResponseAction } from './utilities'

const CHAT_USER_LIST_URL = `${AUTH_SERVER_API_URL}/user_list/?order_by=-last_seen`
const CHAT_UPDATE_LAST_SEEN_URL = `${AUTH_SERVER_API_URL}/update_last_seen/`


const listUsersRequest = () => {
    return {
        type: types.CHAT_USER_LIST_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const listUsers = () => dispatch => {
    dispatch(listUsersRequest());
    axios.get(CHAT_USER_LIST_URL).then(
        (response) => {
            dispatch({
                type: types.CHAT_USER_LIST_RESPONSE,
                payload: {
                    users: response.data,
                    status: 'loaded'
                }
            })
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.CHAT_USER_LIST_RESPONSE, response));
    });
}

const listUserContactMessagesRequest = () => {
    return {
        type: types.CHAT_USER_CONTACT_MESSAGES_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const listUserContactMessages = (user_id) => dispatch => {
    dispatch(listUserContactMessagesRequest());
    let url = `${CHAT_SERVER_API_URL}/message/user_messages/${user_id}`;
    axios.get(url).then(
        (response) => {
            console.log(response)
            dispatch({
                type: types.CHAT_USER_CONTACT_MESSAGES_RESPONSE,
                payload: {
                    users: response.data,
                    status: 'loaded'
                }
            })
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.CHAT_USER_CONTACT_MESSAGES_RESPONSE, response));
    });
}


const listUserContactsRequest = () => {
    return {
        type: types.CHAT_USER_CONTACTS_LIST_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const listUserContacts = () => dispatch => {
    dispatch(listUserContactsRequest());
    let url = `${CHAT_SERVER_API_URL}/contacts/`;
    axios.get(url).then(
        (response) => {
            dispatch({
                type: types.CHAT_USER_CONTACTS_LIST_RESPONSE,
                payload: {
                    users: response.data,
                    status: 'loaded'
                }
            });
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.CHAT_USER_CONTACTS_LIST_RESPONSE, response));
    });
}

const updateLastSeenRequest = () => {
    return {
        type: types.CHAT_UPDATE_LAST_SEEN_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const updateLastSeen = () => dispatch => {
    dispatch(updateLastSeenRequest());
    axios.get(CHAT_UPDATE_LAST_SEEN_URL).then(
        (response) => {
            dispatch({
                type: types.CHAT_UPDATE_LAST_SEEN_RESPONSE,
                payload: {
                    users: response.data,
                    status: 'loaded'
                }
            });
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.CHAT_UPDATE_LAST_SEEN_RESPONSE, response));
    });
}
