import { Typography } from "@mui/material"
export default function ClientDetails({ clientName, clientAddress }) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'serif',
        }}
      >
        {clientName}
      </Typography>
      <Typography
        style={{
          fontSize: '16px',
          fontFamily: 'serif',
          fontStyle: 'italic',
        }}
      >
        {clientAddress}
      </Typography>
    </div>
  )
}
