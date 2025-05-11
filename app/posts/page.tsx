import axios from 'axios'
import Link from 'next/link'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export default async function PostsPage() {
  const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  const posts: Post[] = response.data

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <Link 
            key={post.id} 
            href={`/posts/${post.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 line-clamp-2">{post.body}</p>
            <p className="mt-2 text-blue-500">View post and comments →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}