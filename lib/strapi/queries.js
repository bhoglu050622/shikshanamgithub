import client from './client'

// Homepage content queries
export async function getHomepageContent() {
  try {
    const response = await client.get('/homepage?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return null
  }
}

// Hero section queries
export async function getHeroContent() {
  try {
    const response = await client.get('/hero-sections?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return null
  }
}

// General content queries
export async function getContentBySlug(slug) {
  try {
    const response = await client.get(`/pages?filters[slug][$eq]=${slug}&populate=*`)
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching content by slug:', error)
    return null
  }
}

export async function getAllPages() {
  try {
    const response = await client.get('/pages?populate=*')
    return response.data.data
  } catch (error) {
    console.error('Error fetching all pages:', error)
    return []
  }
}
