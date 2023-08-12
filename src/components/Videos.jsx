import React from 'react'

const Videos = ({videos}) => {
  return (
    videos?.map((video) => (
      <div key={video.id.videoId}>
        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
        <div>
          <h4 style={{
            color: '#fff'
          }}>{video.snippet.title}</h4>
          <p style={{
            color: '#fff'
          }}>{video.snippet.channelTitle}</p>
        </div>
      </div>
    ))
  )
}

export default Videos