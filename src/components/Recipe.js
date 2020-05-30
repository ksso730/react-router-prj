import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Recipe() {
    const [recipe, setRecipe] = useState([]);
    const[page, setPage] = useState(1);
    
    useEffect(()=>{
        // 서버를 연결해서 데이터를 읽어온 후 => setRecipe 에 저장
        axios.get("http://localhost:3355/recipe").then()
    })
    
    return (
        <div><h1>레시피</h1></div>
    )
}