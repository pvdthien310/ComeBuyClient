import { Stack, Typography } from "@mui/material";

const MainDetails = ({ name, address }) => {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column'
    }}>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'serif',
          alignSelf: 'flex-end'
        }}
      >
        {name} - at ComeBuy branch
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          fontFamily: 'serif',
          fontStyle: 'italic',
          alignSelf: 'flex-end'
        }}
      >
        {address}
      </Typography>
    </div>
  )
}
export default MainDetails
