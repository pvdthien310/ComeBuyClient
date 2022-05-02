import { Stack, Typography } from "@mui/material";

const Footer = ({
  name,
  email,
  phone,
  address
}) => {
  return (
    <>
      <footer style={{
        display: 'table-footer-group',
        borderWidth: '1px',
        borderColor: 'gray',
      }}>
        <Stack direction="column" width="100%" spacing={2} style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <Stack width="100%" spacing={3} direction="row">
            <li style={{ fontFamily: 'serif' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif' }}>Name:</span> {name}
            </li>

            <li style={{ fontFamily: 'serif' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif' }}>Email:</span> {email}
            </li>
          </Stack>
          <Stack width="100%" spacing={3} direction="row">
            <li style={{ fontFamily: 'serif' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif' }}>Phone:</span> {phone}
            </li>

            <li style={{ fontFamily: 'serif' }} >
              <span style={{ fontWeight: 'bold', fontFamily: 'serif' }}>Store address:</span> {address}
            </li>
          </Stack>
          <Typography style={{ marginTop: '5%', fontFamily: 'serif', fontStyle: 'italic' }}>Thanks for supporting our store. We'll always welcome you to explore ❤️</Typography>
        </Stack>
      </footer>
    </>
  )
}
export default Footer