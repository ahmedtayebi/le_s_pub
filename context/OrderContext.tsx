'use client'
import { createContext, useContext, useState } from 'react'

interface OrderSelection {
    product: string
    size: string
    quantity: string
}

interface OrderContextType {
    orderSelection: OrderSelection
    setOrderSelection: (data: OrderSelection) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orderSelection, setOrderSelection] = useState<OrderSelection>({
        product: '',
        size: '',
        quantity: ''
    })
    return (
        <OrderContext.Provider value={{ orderSelection, setOrderSelection }}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrder() {
    const ctx = useContext(OrderContext)
    if (!ctx) throw new Error('useOrder must be inside OrderProvider')
    return ctx
}
