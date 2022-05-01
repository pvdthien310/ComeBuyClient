export default function Dates({ invoiceDate, dueDate }) {
  return (
    <>
      <article style={{
        display: 'flex',
        justifyContent: 'flex-end',
        justifyItems: 'flex-end'
      }}>
        <ul>
          <li style={{ backgroundColor: 'gray' }}>
            <span style={{
              fontFamily: 'serif',
              fontWeight: 'bold'
            }}>Invoice date:</span> {invoiceDate}
          </li>
          <li>
            <span style={{
              fontFamily: 'serif',
              fontWeight: 'bold'
            }}>Due date:</span> {dueDate}
          </li>
        </ul>
      </article>
    </>
  )
}
