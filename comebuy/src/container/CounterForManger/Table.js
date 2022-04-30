import React from "react"

export default function Table({ list, total }) {
  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr style={{ backgroundColor: 'gray' }}>
            <td style={{ fontWeight: 'bold', fontSize: '15px', fontFamily: 'serif' }}>Description</td>
            <td style={{ fontWeight: 'bold', fontSize: '15px', fontFamily: 'serif' }}>Quantity</td>
            <td style={{ fontWeight: 'bold', fontSize: '15px', fontFamily: 'serif' }}>Price</td>
            <td style={{ fontWeight: 'bold', fontSize: '15px', fontFamily: 'serif' }}>Amount</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'serif' }} >{description}</td>
                <td style={{ fontFamily: 'serif' }}>{quantity}</td>
                <td style={{ fontFamily: 'serif' }}>{price}</td>
                <td style={{ fontFamily: 'serif' }}>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 style={{ display: 'flex', justifyContent: 'flex-end', justifyItems: 'flex-end', fontWeight: 'bold', fontFamily: 'serif' }}>
          Total cost. {total} USD
        </h2>
      </div>
    </>
  )
}
