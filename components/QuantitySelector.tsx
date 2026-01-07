'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-gray-200 rounded-md w-fit">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="p-2 hover:bg-gray-50 transition-colors"
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>
      <span className="w-12 text-center text-sm font-medium">{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="p-2 hover:bg-gray-50 transition-colors"
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
