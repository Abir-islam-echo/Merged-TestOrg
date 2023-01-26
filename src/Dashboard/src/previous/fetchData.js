import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const FetchData = () => {

    const { validUser } = useAuth()
    const [data, setData] = useState()
    const [barData, setBarData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.post('https://excited-foal-raincoat.cyclic.app/dashboard/examdata', { token: validUser.token })
                .then(response => {
                    setData(response.data)
                    const barChartData = [
                        [
                            { x: "Test 1", y: 46 },
                            { x: "Test 2", y: 27 },
                            { x: "Test 3", y: 26 },
                        ],
                        [
                            { x: "Test 1", y: 37 },
                            { x: "Test 2", y: 23 },
                            { x: "Test 3", y: 18 },
                        ],
                        [
                            { x: "Test 1", y: 21 },
                            { x: "Test 2", y: 17 },
                            { x: "Test 3", y: 11 },
                        ],
                    ];


                    let j = 0
                    response.data.map(singleData => {
                        let i = 0
                        barChartData[i][j].y = singleData.maxMarks
                        barChartData[++i][j].y = singleData.meanMarks
                        barChartData[++i][j].y = singleData.minMarks
                        j++
                    })

                    const barCustomSeries = [
                        {
                            dataSource: barChartData[0],
                            xName: "x",
                            yName: "y",
                            name: "Highest",
                            type: "Column",
                            marker: {
                                dataLabel: {
                                    visible: true,
                                    position: "Top",
                                    font: { fontWeight: "600", color: "#ffffff" },
                                },
                            },
                        },
                        {
                            dataSource: barChartData[1],
                            xName: "x",
                            yName: "y",
                            name: "Mean",
                            type: "Column",
                            marker: {
                                dataLabel: {
                                    visible: true,
                                    position: "Top",
                                    font: { fontWeight: "600", color: "#ffffff" },
                                },
                            },
                        },
                        {
                            dataSource: barChartData[2],
                            xName: "x",
                            yName: "y",
                            name: "Lowest",
                            type: "Column",
                            marker: {
                                dataLabel: {
                                    visible: true,
                                    position: "Top",
                                    font: { fontWeight: "600", color: "#ffffff" },
                                },
                            },
                        },
                    ];

                    setBarData(barCustomSeries);

                })
                .catch(error => {
                    console.log('error: ' + error)
                })
        }
        fetchData()
    }, [validUser]);

    return {
        data,
        barData,

    }
}

export default FetchData;
