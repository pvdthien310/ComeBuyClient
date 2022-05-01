export default function Header({ handlePrint }) {
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h1 style={{
            fontWeight: 'bold',
            fontSize: '35px',
            fontFamily: 'serif'
          }}>
            ComeBuy Invoicer
          </h1>
        </div>
      </header>
    </>
  )
}
