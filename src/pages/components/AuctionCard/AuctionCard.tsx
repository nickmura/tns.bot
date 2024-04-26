import React from 'react'

function AuctionCard({ auction }) {
  console.log("AUCTION CARD", auction)
  return (
    <div> 
        <h1>{auction.domain}</h1>
    </div>
  )
}

export default AuctionCard