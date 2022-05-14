import { CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import aiApi from "../../api/aiAPI"
import React, { PureComponent } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const DataAnalysis = () => {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(async () => {
        let cancel = false
        const response = await aiApi.dataAnalysis(
            {
                "date_block_num": [1, 2, 2, 3, 4, 5, 7, 8, 2, 3, 6, 7],
                "branch_id": [1, 1, 2, 1, 1, 4, 2, 3, 1, 4, 5, 1],
                "item_id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                "item_feature_id": [1, 2, 1, 2, 2, 2, 2, 1, 3, 4, 5, 4],
                "item_price": [590, 200, 520, 500, 890, 800, 990, 1000, 1200, 990, 570, 790],
                "month": [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
                "year": [2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022]
            }
        )
        if (response.status == 200) {
            if (cancel) return;
            let tempData = []
            await (JSON.parse(response.data.result)).map((ite, i) =>
                tempData.push({
                    "name": i,
                    "Trend Index": ite,
                    "Trend Index": ite
                })
            )
            setResult(tempData)
            setLoading(false)
        }
        else {
            console.log("Loi ")
            setLoading(false)
        }
        return () => cancel = true
    }, [])
    return (
        <Stack sx={{ height: '100%', width: '100%'}}>
            {
                loading ?
                    <CircularProgress /> :
                    <Stack sx={{ height: '90%', width: '100%'}}>
                        {
                            result == null ?
                                <Typography>Can't Get Result :(((</Typography>
                                :
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart
                                        width={500}
                                        height={400}
                                        data={result}
                                        margin={{
                                            top: 20,
                                            right: 20,
                                            bottom: 20,
                                            left: 20,
                                        }}
                                    >
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <XAxis dataKey="name" scale="band" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Trend Index" barSize={50} fill="#413ea0" />
                                        <Line type="monotone" dataKey="Trend Index" stroke="#ff7300" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                        }
                    </Stack>
            }
        </Stack>
    )
}
export default DataAnalysis