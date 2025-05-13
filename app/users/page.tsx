'use client'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Map = dynamic(() => import('../components/Map'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
      <p>Loading map...</p>
    </div>
  )
})

interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = params.id
        const [userResponse, postsResponse] = await Promise.all([
          axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`),
          axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        ])
        
        setUser(userResponse.data)
        setPosts(postsResponse.data)
      } catch (err) {
        setError('Failed to load user data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>
  if (!user) return <div className="p-8">User not found</div>

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{user.name}</h1>
        <p className="mb-1 text-gray-600">@{user.username}</p>
        <p className="mb-1 text-gray-600">{user.email}</p>
        <p className="mb-1 text-gray-600">{user.phone}</p>
        <p className="mb-4 text-gray-600">{user.website}</p>

        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Address</h2>
          <p>{user.address.street}, {user.address.suite}</p>
          <p>{user.address.city}, {user.address.zipcode}</p>
          
          <div className="w-full h-64 mt-4">
            <Map lat={parseFloat(user.address.geo.lat)} lng={parseFloat(user.address.geo.lng)} />
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Company</h2>
          <p className="font-medium">{user.company.name}</p>
          <p className="italic text-gray-600">"{user.company.catchPhrase}"</p>
          <p className="text-gray-600">{user.company.bs}</p>
        </div>
      </div>
          

      <div>
        <h2 className="mb-4 text-2xl font-bold">Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 border rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.body}</p>
              <a 
                href={`/posts/${post.id}`} 
                className="inline-block mt-2 text-blue-500 hover:underline"
              >
                View comments →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  }
