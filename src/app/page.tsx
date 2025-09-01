"use client";
import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import CartItem from "./cartitem";

// กำหนดข้อมูลสินค้า
const products = [
  { id: 1, title: "iPhone 16 Pro", price: 39900 },
  { id: 2, title: "iPhone 16", price: 29900 },
  { id: 3, title: "iPhone 16e", price: 26900 },
  { id: 4, title: "iPad", price: 12900 },
  { id: 5, title: "iPad Air", price: 21900 },
  { id: 6, title: "iPad Pro", price: 37900 },
];

export default function Home() {
  // เก็บข้อมูลจำนวนสินค้าแต่ละชิ้น
  const [cartItems, setCartItems] = React.useState<{[key: number]: number}>({});
  
  // ฟังก์ชันอัปเดตจำนวนสินค้า
  const updateItemCount = (productId: number, newCount: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: Math.max(0, newCount) // ป้องกันค่าติดลบ
    }));
  };

  // คำนวณจำนวนสินค้าทั้งหมด
  const totalItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  
  // คำนวณราคารวม
  const totalPrice = products.reduce((sum, product) => {
    const count = cartItems[product.id] || 0;
    return sum + (product.price * count);
  }, 0);

  // ฟังก์ชันรีเซ็ตตะกร้า
  const resetCart = () => {
    setCartItems({});
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          ตะกร้าสินค้า
        </Typography>
        
        <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
          <Typography variant="h4" component="div" gutterBottom>
            จำนวนสินค้าทั้งหมด: {totalItems} ชิ้น
          </Typography>
          <Typography variant="h4" component="div" color="secondary">
            ราคารวม: ฿{totalPrice.toLocaleString()}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="error"
          size="large"
          onClick={resetCart}
          sx={{ mb: 3 }}
          disabled={totalItems === 0}
        >
          รีเซ็ตตะกร้า
        </Button>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {products.map(product => (
            <CartItem
              key={product.id}
              productId={product.id}
              title={product.title}
              price={product.price}
              count={cartItems[product.id] || 0}
              onUpdateCount={updateItemCount}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}