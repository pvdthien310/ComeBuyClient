import { Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import aiApi from "../../api/aiAPI"

const DataAnalysis = () => {
    useEffect(async () => {
        const response = await aiApi.recommendedSystem({ name: 'Đặng Vĩnh Siêu' })
        console.log(response)
        if (response) {
        
        }
        else console.log("Loi ")
    }, [])
    return (
        <Stack>
            <Typography>Data Analysis</Typography>
        </Stack>
    )
}
export default DataAnalysis