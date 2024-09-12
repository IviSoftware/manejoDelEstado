import React from "react";

class Loading extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillUnmount(){
        console.log("desmontando")
    }

    render(){
        return(
            <p>Cargando...</p>
        )
    }
}

export {Loading}