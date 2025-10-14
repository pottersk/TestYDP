import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    
    const product = await res.json();
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
