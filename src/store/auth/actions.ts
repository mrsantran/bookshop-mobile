/**
 * @author Leo
 * @email xinlichao2016@gmail.com
 * @create date 2019-09-03 09:59:48
 * @modify date 2019-09-03 09:59:48
 * @desc 定义 Auth Api, Saga action, reducer action等。
 */
import {
  composeTypes,
  createAction,
  ActionCreator,
  AsyncTuple,
  NO_ERROR_TYPES,
  createFetchAction,
  ThunkAction,
  ActionType,
  safeGet,
  Method,
} from 'iron-redux';
import Network from '../../config/Network';
import { Types } from './types';

/**
 |--------------------------------------------------
 | DEFINE REDUCER ACTION INTERFACE
 |--------------------------------------------------
 */

// 登录
interface FetchSignInReq {
  username: string;
  password: string;
}

interface FetchSignUpReq {
  username: string;
  password: string;
  age: number;
  email1: string;
  phone1: string;
}
export interface FetchSignInRes {
  data: string;
}

export interface FetchSignUpRes {
  data: object;
}
const fetchSignInUrl = `${Network.API_ROOT_DOMAIN}/auth`;
const fetchSignIn = createFetchAction(Types.fetchSignIn, fetchSignInUrl, Method.Post)<FetchSignInReq, FetchSignInRes>('fetchSignIn');

const fetchSignUpUrl = `${Network.API_ROOT_DOMAIN}/user/regist`;
const fetchSignUp = createFetchAction(Types.fetchSignUp, fetchSignUpUrl, Method.Post)<FetchSignUpReq, FetchSignUpRes>('fetchSignUp');

// 注销
interface FetchLogoutReq {
}
export interface FetchLogoutRes {
}
const fetchLogoutUrl = `${Network.API_AUTH_URL}/logout`;
const fetchLogout = createFetchAction(Types.fetchLogout, fetchLogoutUrl, Method.Post)<FetchLogoutReq, FetchLogoutRes>('fetchLogout');

// 获取用户信息
interface FetchUserInfoReq {
}
export interface FetchUserInfoRes {
  name: string;
}
const fetchUserInfoUrl = `${Network.API_AUTH_URL}/userInfo`;
const fetchUserInfo = createFetchAction(Types.fetchUserInfo, fetchUserInfoUrl, Method.Get)<FetchUserInfoReq, FetchUserInfoRes>('fetchUserInfo');


// 清空登录 fetch state
const clearFetchSignIn = createAction(Types.clearFetchSignIn)();

const clearFetchSignUp = createAction(Types.clearFetchSignUp)();

// change token
const changeToken = createAction(Types.changeToken, 'token')<string>();
export default {
  changeToken,
  fetchSignIn,
  fetchSignUp,
  clearFetchSignIn,
  clearFetchSignUp,
  fetchLogout,
  fetchUserInfo
};

/**
 |--------------------------------------------------
 | DEFINE SERVICE ACTION INTERFACE
 |--------------------------------------------------
 */

interface SignInParams {
  username: string;
  password: string;
}

interface SignUpParams {
  username: string;
  password: string;
  age: number;
  phone: string;
  email: string;
}
export const signIn = createAction(Types.signIn)<SignInParams>();

export const signUp = createAction(Types.signUp)<SignUpParams>();

export const logout = createAction(Types.logout)();

export const getUserInfo = createAction(Types.getUserInfo)();

// interface GetUsersParams {
//   page: number;
//   limit: number;
//   callback: (res: FetchUsersRes) => any;
// }
// export const getUsers = createAction(Types.getUsers)<GetUsersParams>()