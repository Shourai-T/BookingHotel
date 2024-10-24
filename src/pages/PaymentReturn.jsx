import React, { useEffect } from 'react';
import Loading from '../components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentReturn() {
    const location = useLocation();
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
   useEffect(() => {
    console.log("vnppay",searchParams.get('vnp_TransactionStatus'))
    console.log("vnppay",searchParams.get('status'))
    if(searchParams.get('vnp_TransactionStatus')==='00'||searchParams.get('status')==='1'){
        navigate('/success')
    }
    else{
        navigate('/failure')
    }
   }, [location]);
    
    return (
        <Loading/>
    )
}