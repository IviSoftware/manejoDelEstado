import { useReducer,useEffect } from "react"

const VERIFY_CODE = 'paradigma'

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    error:'ERROR',
    check:'CHECK',
    update:'UPDATE',
    confirm:'CONFIRM',
    delete:'DELETE',
    cancel:'CACEL',
    reset:'RESET',
    write:'WRITE'

}

//Creamos nuestro obj reducer que contiene el nombre para cada estado compuesto

const objReducer = (state,payload) => ({
    [actionTypes.error]:{
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.check]:{
        ...state,
        loading: true
    },
    [actionTypes.update]:{
        ...state,
        error: false,
        loading: true
    },
    [actionTypes.confirm]:{
        ...state,
        loading: false,
        confirmed:true
    },
    [actionTypes.delete]:{
        ...state,
        deleted:true
    },
    [actionTypes.cancel]:{
        ...state,
        confirmed:false,
        value:''
    },
    [actionTypes.reset]:{
        ...state,
        confirmed:false,
        deleted:false,
        value:''
    },
    [actionTypes.write]:{ 
        ...state, 
        value: payload 
    }
})

//El reducer recibe un estado y una accion que es el objeto que contiene las propiedades type y payload
const reducer = (state,action) =>{
    if(objReducer(state)[action.type]){ // si el objeto que retorne tiene un action.type que existe
        return objReducer(state,action.payload)[action.type] // retornamos ese objeto que contiene el objeto que le sirve a un estado compuesto
    }else{ // si no, retorna el estado que te pasen
        return {...state}
    }
}

const UseReducer = ({ name }) => {

    const [state, dispatch] = useReducer(reducer,initialState)

    useEffect(() => {
        if (state.loading) {
            console.log("comprobando")
            setTimeout(() => {
                if (state.value !== VERIFY_CODE) {
                    dispatch({type:actionTypes.error})
                } else {
                    dispatch({type:actionTypes.confirm})
                }
            }, 3000)
        }
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad</p>

                {state.error && <p>Error : El código es incorrecto</p>}
                {state.loading && <p>Cargando...</p>}
                <input placeholder="Código de seguridad" value={state.value} onChange={e => dispatch({type:actionTypes.write,payload:e.target.value})} />
                <button onClick={() => dispatch({type:actionTypes.update}) }>Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return <>
            <p>¿Seguro que quieres eliminar?</p>
            <button onClick={()=>{
                dispatch({type:actionTypes.delete})
            }}>
                si
            </button>
            <button onClick={()=>{
                dispatch({type:actionTypes.cancel})
            }}>
                no
            </button>
        </>
    } else {
        return <>
            <p>¡exito!, ha sido eliminado</p>
            <button onClick={()=>{
                dispatch({type:actionTypes.cancel})
            }}>
                Resetear
            </button>
        </>
    }
}





export { UseReducer }