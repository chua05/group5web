'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Dynamically load ApexCharts with SSR disabled
const DynamicChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-[350px] flex items-center justify-center">Loading chart...</div>
})

export default function Chart() {
  const [stats, setStats] = useState({ users: 0, posts: 0, comments: 0 })

  const { data: users = [] } = useQuery<Array<{ id: number; name: string }>>({
    queryKey: ['users'],
    queryFn: async (): Promise<Array<{ id: number; name: string }>> => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      return res.data as Array<{ id: number; name: string }>
    }
  })

  const { data: posts = [] } = useQuery<Array<{ id: number; title: string }>>({
    queryKey: ['posts'],
    queryFn: async (): Promise<Array<{ id: number; title: string }>> => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      return res.data as Array<{ id: number; title: string }>
    }
  })

  const { data: comments = [] } = useQuery<Array<{ id: number; body: string }>>({
    queryKey: ['comments'],
    queryFn: async (): Promise<Array<{ id: number; body: string }>> => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/comments')
      return res.data as Array<{ id: number; body: string }>
    }
  })

  useEffect(() => {
    setStats({
      users: users?.length || 0,
      posts: posts?.length || 0,
      comments: comments?.length || 0
    })
  }, [users, posts, comments])

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments']
    },
    colors: ['#7e22ce', '#a855f7', '#c084fc'],
    fill: { opacity: 1 },
    stroke: {
      show: true,
      width: 2,
      colors: ['#fff']
    }
  }

  const series = [
    {
      name: 'Total',
      data: [stats.users, stats.posts, stats.comments]
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Data Statistics</h2>
      <DynamicChart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  )
}
