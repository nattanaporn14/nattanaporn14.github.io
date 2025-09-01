import React from "react";
import { Button, Card, CardContent, Stack, Typography, IconButton, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface CartItemProps {
  productId: number;
  title: string;
  price: number;
  count: number;
  onUpdateCount: (productId: number, newCount: number) => void;
}

export default function CartItem({ 
  productId,
  title, 
  price,
  count,
  onUpdateCount 
}: CartItemProps) {

  const handleIncrement = () => {
    onUpdateCount(productId, count + 1);
  };

  const handleDecrement = () => {
    onUpdateCount(productId, count - 1);
  };

  // คำนวณราคารวมของสินค้านี้
  const itemTotal = price * count;

  return (
    <Card elevation={3} sx={{ mb: 1 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* ชื่อสินค้าและราคา */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ฿{price.toLocaleString()} / ชิ้น
            </Typography>
            {count > 0 && (
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                รวม: ฿{itemTotal.toLocaleString()}
              </Typography>
            )}
          </Box>
          
          {/* ปุ่มควบคุมจำนวน */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton 
              color="primary"
              onClick={handleDecrement}
              disabled={count <= 0}
              sx={{ 
                bgcolor: count > 0 ? 'primary.light' : 'grey.300',
                '&:hover': { bgcolor: count > 0 ? 'primary.main' : 'grey.400' }
              }}
            >
              <Remove />
            </IconButton>
            
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                minWidth: '60px', 
                textAlign: 'center',
                fontWeight: 'bold',
                color: count > 0 ? 'primary.main' : 'text.secondary'
              }}
            >
              {count}
            </Typography>
            
            <IconButton 
              color="primary"
              onClick={handleIncrement}
              sx={{ 
                bgcolor: 'primary.light',
                '&:hover': { bgcolor: 'primary.main' }
              }}
            >
              <Add />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}