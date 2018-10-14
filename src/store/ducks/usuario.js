import Immutable from 'seamless-immutable';

export const Types = {
  GET: 'usuario/GET',
};

const initialState = Immutable({
  user: {},
});

export default function Usuario(state = initialState, action) {
  switch (action.type) {
    case Types.GET:
      return { user };
    default:
      return state;
  }
}

export const Creators = {
  usuarioGet: data => ({
    type: Types.GET,
    payload: { user },
  }),
};
