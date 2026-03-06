'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
    const { items, removeItem, clearCart, totalAmount, totalItems, isCartOpen, setIsCartOpen } = useCart()

    const handleConfirm = () => {
        setIsCartOpen(false)
        setTimeout(() => {
            document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
    }

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            zIndex: 9998,
                        }}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        key="cart-drawer"
                        initial={{ x: 420 }}
                        animate={{ x: 0 }}
                        exit={{ x: 420 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            height: '100vh',
                            width: 'min(420px, 100vw)',
                            background: '#0d0d0d',
                            borderLeft: '1px solid rgba(201,168,76,0.2)',
                            zIndex: 9999,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '20px 24px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}>
                            <div>
                                <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>سلة طلباتك</p>
                                <p style={{ color: '#888', fontSize: '0.85rem', margin: '2px 0 0' }}>{items.length} منتج</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCartOpen(false)}
                                style={{
                                    width: 38,
                                    height: 38,
                                    background: 'rgba(255,255,255,0.06)',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    flexShrink: 0,
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                                aria-label="إغلاق السلة"
                            >
                                <X size={18} color="#fff" />
                            </button>
                        </div>

                        {/* Body */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                            {items.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, paddingTop: 60 }}>
                                    <ShoppingCart size={48} color="#333" />
                                    <p style={{ color: '#555', fontSize: '1rem', margin: 0 }}>سلتك فارغة</p>
                                    <p style={{ color: '#444', fontSize: '0.85rem', margin: 0 }}>أضف منتجات من الأعلى</p>
                                </div>
                            ) : (
                                <>
                                    {items.map(item => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.22 }}
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.06)',
                                                borderRadius: 14,
                                                padding: 16,
                                                marginBottom: 10,
                                            }}
                                        >
                                            {/* Row 1: name + delete */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                                <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '0.95rem' }}>{item.productName}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 6, transition: 'color 0.2s' }}
                                                    onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                                                    onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                                                    aria-label="حذف المنتج"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            {/* Row 2: size + qty pills */}
                                            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                                                <span style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: '#aaa', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)' }}>
                                                    {item.size}
                                                </span>
                                                <span style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: '#aaa', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.08)' }}>
                                                    ×{item.quantity} قطعة
                                                </span>
                                            </div>

                                            {/* Row 3: total price */}
                                            <div style={{ textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                                                {item.totalPrice.toLocaleString()} دج
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Clear cart */}
                                    <button
                                        type="button"
                                        onClick={clearCart}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: '0.8rem', padding: '4px 0', marginTop: 4, transition: 'color 0.2s' }}
                                        onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                                        onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                                    >
                                        مسح السلة كلياً
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '20px 24px',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            background: '#0a0a0a',
                            flexShrink: 0,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ color: '#888', fontSize: '0.9rem' }}>المجموع التقديري:</span>
                                <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '1.2rem' }}>{totalAmount.toLocaleString()} دج</span>
                            </div>
                            <p style={{ color: '#444', fontSize: '0.75rem', margin: '8px 0 16px' }}>
                                * الأسعار تقديرية وقد تتغير حسب التفاصيل
                            </p>
                            <motion.button
                                type="button"
                                whileHover={items.length > 0 ? { scale: 1.02 } : {}}
                                whileTap={items.length > 0 ? { scale: 0.97 } : {}}
                                onClick={items.length > 0 ? handleConfirm : undefined}
                                disabled={items.length === 0}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #C9A84C, #F0C040)',
                                    color: '#000',
                                    fontWeight: 800,
                                    padding: '16px',
                                    borderRadius: '12px',
                                    borderWidth: 0,
                                    fontSize: '1rem',
                                    cursor: items.length > 0 ? 'pointer' : 'not-allowed',
                                    opacity: items.length === 0 ? 0.4 : 1,
                                    transition: 'opacity 0.2s',
                                    fontFamily: "'Cairo', sans-serif",
                                }}
                            >
                                تأكيد الطلب ←
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
