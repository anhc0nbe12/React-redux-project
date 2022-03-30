function TrackItem({ index, track }) {
  return (
    <div className="tracks-content">
      <div className="tracks-content-index">
        <p>{index}</p>
      </div>
      <div className="tracks-heading-heading">
        <h3>{track.name}</h3>
        <p>{track.artists[0].name}</p>
      </div>
    </div>
  )
}

export default TrackItem
