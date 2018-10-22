import Immutable from 'seamless-immutable';

export const Types = {
  GET_LOGIN: 'usuario/GET_LOGIN',
  GET_LOGIN_SUCCESS: 'usuario/GET_LOGIN_SUCCESS',
  GET_LOGIN_FAILED: 'usuario/GET_LOGIN_FAILED',
};

const initialState = Immutable({
  data: {},
  erro: '',
  loading: false,
});

export default function Usuario(state = initialState, action) {
  console.tron.log('reducer');
  console.tron.log(action.payload);
  
  switch (action.type) {
    case Types.GET_LOGIN:
      return { loading: false, };
    case Types.GET_LOGIN_SUCCESS:
      return { data: action.payload.data, erro: '' };
    case Types.GET_LOGIN_FAILED:
      return { data: {}, erro: action.payload.erro };
    default:
      return state;
  }
}

export const Creators = {
  getUserLogin: (login, senha) => ({
    type: Types.GET_LOGIN,
    payload: { 
      login,
      senha,
    },
  }),
  getUserLoginSuccess: data => ({
    type: Types.GET_LOGIN_SUCCESS,
    payload: { 
      data,
    },
  }),
  getUserLoginFailed: erro => ({
    type: Types.GET_LOGIN_FAILED,
    payload: { erro },
  }),
};
