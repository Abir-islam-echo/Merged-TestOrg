import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const FetchData = () => {
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
    }
}

export default FetchData;
