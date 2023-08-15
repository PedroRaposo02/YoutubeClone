import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromApi } from '../utils/fetchFromApi';

const ChannelDetail = () => {

  const { id } = useParams()

  const [ChannelDetail, setChannelDetail] = useState(null)

  useEffect(() => {
    const additionalOptions = {
      params: {
        part: 'snippet,statistics',
        id: id
      }
    }
    fetchFromApi(`channels`, additionalOptions)
    .then(data => setChannelDetail(data.items[0]))
  }, [id])

  return (
    <Box>

    </Box>
  )
}

export default ChannelDetail