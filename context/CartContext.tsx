'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type CartItem = {
    id: string          // unique: productName + size
    productName: string
    size: string
    quantity: number
    unitPrice: number
    totalPrice: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    clearCart: () => void
    totalAmount: number
    totalItems: number
    isCartOpen: boolean
    setIsCartOpen: (v: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'le_s_pub_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [hydrated, setHydrated] = useState(false)

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                setItems(JSON.parse(stored))
            }
        } catch {
            // ignore
        }
        setHydrated(true)
    }, [])

    // Persist to localStorage whenever items change (after hydration)
    useEffect(() => {
        if (!hydrated) return
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch {
            // ignore
        }
    }, [items, hydrated])

    // Lock scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = isCartOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isCartOpen])

    const addItem = useCallback((item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: item.quantity, totalPrice: item.totalPrice }
                        : i
                )
            }
            return [...prev, item]
        })
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }, [])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const totalAmount = items.reduce((sum, i) => sum + i.totalPrice, 0)
    const totalItems = items.length

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalAmount, totalItems, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be inside CartProvider')
    return ctx
}
