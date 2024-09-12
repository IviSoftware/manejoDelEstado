import React from "react";
import { Loading } from "./Loading";
const VERIFY_CODE = 'paradigma'


class UseClass extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            error:false,
            loading:false,
            value:''
        }
    }

    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(()=>{
                if(VERIFY_CODE !== this.state.value){
                    this.setState({error:true})
                }
                this.setState({loading:false})
            },2000)
        }
    }

    render(){
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {this.state.error && <p>Error : El código es incorrecto</p>}
                {this.state.loading && <Loading />}
                <input placeholder="Código de seguridad" value={this.state.value}  onChange={e=>this.setState({value:e.target.value})}/>
                <button onClick={()=>{
                    this.setState({error:false})
                    this.setState({loading : true})
                }}>Comprobar</button>
            </div>
        )
    }
}

export {UseClass}