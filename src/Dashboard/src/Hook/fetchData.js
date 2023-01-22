import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const FetchData = () => {
    // this hook can be used to fetch api
    // also can be used to generate data and send data to another route
    
    const { validUser } = useAuth()
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            await axios.post('https://excited-foal-raincoat.cyclic.app/dashboard/examdata', { token: validUser.token })
                .then(response => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch(error => {
                    console.log('error: ' + error)
                })
        }
        fetchData()
    }, [validUser]);
    return {
        data   

        // you can send multiple data like thi
        // data1,
        // data2,
        // data3,
        // .....,
    }
}

export default FetchData;
