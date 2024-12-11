import groq from "groq"
import { sanityClient } from "sanity:client"

// Интерфейс поста
export interface Post {
	title: string
	slug: { current: string }
	mainImage: string | null
	excerpt: string
	_createdAt: string
	author: {
		name: string
		image?: string
	}
}

// Функция для получения всех постов
export async function getPosts(): Promise<Post[]> {
	const query = groq`
    *[_type == "post" && defined(slug.current)] | order(_createdAt desc){
      title,
      slug,
      mainImage,
      excerpt,
      date,
      _createdAt,
      author->{
        name,
        picture
      }
    }
  `

	try {
		const posts = await sanityClient.fetch<Post[]>(query)
		return posts
	} catch (error) {
		console.error("Error fetching posts:", error)
		return [] // Возвращаем пустой массив в случае ошибки
	}
}

// Функция для получения одного поста по slug
export async function getPost(slug: string): Promise<Post | null> {
	const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      slug,
      date,
      mainImage,
      excerpt,
      _createdAt,
      author->{
        name,
        picture
      }
    }
  `

	try {
		const post = await sanityClient.fetch<Post>(query, { slug })
		return post || null // Если пост не найден, возвращаем null
	} catch (error) {
		console.error(`Error fetching post with slug "${slug}":`, error)
		return null // Возвращаем null в случае ошибки
	}
}
