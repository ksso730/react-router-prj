import React, {useEffect, useState} from "react";
import axios from "axios";

export default function RecipeDetail(props) {
    const {match} = props;
    // detail 하나값을 넘겨주고 있으므로 setDetail의 Type 은 Object {} 이다.
    const [detail, setDetail] = useState({})

    useEffect(()=>{
        axios.get('http://localhost:3355/recipe-detail', {
            params:{
                no: match.params.no
            }
        }).then((result)=>{
            setDetail(result.data);
        })
    },[])

    return (
        <div className={"row"} style={{"margin":"0 auto", "width":"900px"}}>
            <table className={"table"}>
                <tr>
                    <td colSpan={"3"}>
                        <img src={detail.poster} width={"700"}/>
                    </td>
                </tr>
                    <tr>
                        <td colSpan={"3"}>
                            <h3 style={{"display":"inline-block"}}>{detail.title}</h3>
                             &nbsp; <span style={{"color":"blueviolet"}}> by {detail.chef}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            {detail.content}
                        </td>
                    </tr>
                    <tr aria-colspan={"3"}>

                    </tr>
            </table>
        </div>
    )
}

