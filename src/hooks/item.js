import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export const useItems = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    useEffect(() => {
        const url = "https://fakestoreapi.com/products";
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setItems(json)
            } catch (error) {
                console.log("useItems error", error);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return [items, loading]
}


export const useItem = (id) => {
    // Fetch Item from API
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    useEffect(() => {
        const url = `https://fakestoreapi.com/products/${id}`;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const json = await response.json();
                setItem(json);
                console.log('set item!', json)
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])
    return [item, loading]
}

export const useLastItemUpdateTs = () => {
    return useLocalStorage("ShopManagerUpdateTs", null)
}


// Probably want an API module for these calls
export const updateItem = async (itemID, updates) => {
    try {
        await fetch(`https://fakestoreapi.com/products/${itemID}`, {
            method: "PUT",
            body: JSON.stringify(updates)
        })
            .then(res => res.json())
            .then(json => {
                console.log('Update successful', json)
            })
        return true
    } catch (error) {
        console.error("updateItem error", error)
        return false
    }
}

export const addItem = async (item) => {
    try {
        await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(json => {
                console.log('addItem successful', json)
            })
        return true
    } catch (error) {
        console.error("addItem error", error)
        return false
    }
}

const MIN_TITLE_CHARS = 5
const MAX_TITLE_CHARS = 100
export const validateItemInputs = (item) => {
    var errs = []
    if (!item.title) {
        errs.push("Title cannot be empty")
    } else if (item.title.length < MIN_TITLE_CHARS) {
        errs.push(`Title must be at least ${MIN_TITLE_CHARS} characters`)
    } else if (item.title.length > MAX_TITLE_CHARS) {
        errs.push(`Title must be at most ${MAX_TITLE_CHARS} characters (${item.title.length})`)
    }
    var pf = parseFloat(item.price)
    if (!(pf > 0)) {
        errs.push("Price must be greater than zero")
    }
    return errs
}