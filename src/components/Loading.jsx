import React from "react";
import { ClipLoader } from 'react-spinners';

const Loading=()=>{
    return(
        <div className="loading-container">
        <ClipLoader color="#BCA992" loading={true} size={50} />
    </div>
    )
}

export default Loading;