export const initialStore=()=>{
  return{
    token: sessionStorage.getItem("token") || null, 
    user: null,
    message: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'login':
      // Guardamos en el navegador para que no se borre al refrescar
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user
      };

    case 'logout':
      sessionStorage.removeItem("token");
      return {
        ...store,
        token: null,
        user: null
      };
      
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
    default:
      return store;
  }    
}
