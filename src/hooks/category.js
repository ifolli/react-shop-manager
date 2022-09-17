import { useEffect, useState } from 'react'

export const useCategories = () => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const url = "https://fakestoreapi.com/products/categories"
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url)
                const json = await response.json()
                console.log(json)
                setCategories(json)
            } catch (error) {
                console.log("setCategories error", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return [categories, loading]
}
