import { useState, useEffect } from "react"
const VERIFY_CODE = 'paradigma'

const UseState = ({ name }) => {

    const [state, setState] = useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    const onError = ()=>{
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onUpdate = ()=>{
        setState({
            ...state,
            error: false,
            loading: true
        })
    }

    const onConfirm = ()=>{
        setState({
            ...state,
            loading: false,
            confirmed:true
        })
    }

    const onDelete = ()=>{
        setState({...state,deleted:true})
    }

    const onCancel = ()=>{
        setState({...state,confirmed:false,value:''})
    }

    const onReset = ()=>{
        setState({...state,confirmed:false,deleted:false,value:''})
    }

    const onCheck = (newValue) =>{
        setState({ ...state, value: newValue })
    }

    useEffect(() => {
        if (state.loading) {
            console.log("comprobando")
            setTimeout(() => {
                console.log(state.value)

                if (state.value !== VERIFY_CODE) {
                    console.log("Entra aquí")
                    onError()
                } else {
                    console.log("Entra en confirm")
                    onConfirm()
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
                <input placeholder="Código de seguridad" value={state.value} onChange={e => onCheck(e.target.value)} />
                <button onClick={() => onUpdate() }>Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return <>
            <p>¿Seguro que quieres eliminar?</p>
            <button onClick={()=>{
                onDelete()
            }}>
                si
            </button>
            <button onClick={()=>{
                onCancel()
            }}>
                no
            </button>
        </>
    } else {
        return <>
            <p>¡exito!, ha sido eliminado</p>
            <button onClick={()=>{
                onReset()
            }}>
                Resetear
            </button>
        </>
    }
}

export { UseState }