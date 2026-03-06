import { create } from 'zustand';
import { Flower, Wrapping } from '../data/mockData';

export interface BouquetItem {
  flower: Flower;
  quantity: number;
}

export type BouquetStyle = 'round' | 'flat_layered';
export type SizeCategory = 'small' | 'medium' | 'large' | 'grand';

export const MAX_FLOWERS = 80;

export interface StoreState {
  user: { phone: string; name?: string } | null;
  hasSkipped: boolean;
  login: (phone: string) => void;
  logout: () => void;
  setHasSkipped: (skipped: boolean) => void;
  
  bouquet: BouquetItem[];
  addFlower: (flower: Flower) => void;
  removeFlower: (flowerId: string) => void;
  updateQuantity: (flowerId: string, quantity: number) => void;
  clearBouquet: () => void;
  
  bouquetStyle: BouquetStyle;
  setBouquetStyle: (style: BouquetStyle) => void;
  
  wrapping: Wrapping | null;
  setWrapping: (wrapping: Wrapping | null) => void;
  
  deliverySpeed: 'standard' | 'express';
  setDeliverySpeed: (speed: 'standard' | 'express') => void;
  
  totalPrice: () => number;
  totalStemCount: () => number;
  sizeCategory: () => SizeCategory;
  aiPreviewApproved: boolean;
  setAiPreviewApproved: (approved: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  hasSkipped: false,
  login: (phone) => set({ user: { phone, name: 'Guest User' }, hasSkipped: false }),
  logout: () => set({ user: null, hasSkipped: false }),
  setHasSkipped: (hasSkipped) => set({ hasSkipped }),
  
  aiPreviewApproved: false,
  setAiPreviewApproved: (approved) => set({ aiPreviewApproved: approved }),
  
  bouquet: [],
  addFlower: (flower) => set((state) => {
    const currentTotal = state.bouquet.reduce((sum, item) => sum + item.quantity, 0);
    if (currentTotal >= MAX_FLOWERS) return state;

    const existing = state.bouquet.find((item) => item.flower.id === flower.id);
    if (existing) {
      return {
        bouquet: state.bouquet.map((item) =>
          item.flower.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        aiPreviewApproved: false,
      };
    }
    return { bouquet: [...state.bouquet, { flower, quantity: 1 }], aiPreviewApproved: false };
  }),
  removeFlower: (flowerId) => set((state) => ({
    bouquet: state.bouquet.filter((item) => item.flower.id !== flowerId),
    aiPreviewApproved: false,
  })),
  updateQuantity: (flowerId, quantity) => set((state) => {
    const currentTotal = state.bouquet.reduce((sum, item) => sum + item.quantity, 0);
    const item = state.bouquet.find(i => i.flower.id === flowerId);
    const diff = quantity - (item?.quantity || 0);
    
    if (currentTotal + diff > MAX_FLOWERS) return state;

    return {
      bouquet: quantity === 0 
        ? state.bouquet.filter((item) => item.flower.id !== flowerId)
        : state.bouquet.map((item) =>
            item.flower.id === flowerId ? { ...item, quantity } : item
          ),
      aiPreviewApproved: false,
    };
  }),
  clearBouquet: () => set({ bouquet: [], wrapping: null, aiPreviewApproved: false }),
  
  bouquetStyle: 'round',
  setBouquetStyle: (bouquetStyle) => set({ bouquetStyle, aiPreviewApproved: false }),
  
  wrapping: null,
  setWrapping: (wrapping) => set({ wrapping, aiPreviewApproved: false }),
  
  deliverySpeed: 'standard',
  setDeliverySpeed: (deliverySpeed) => set({ deliverySpeed }),
  
  totalStemCount: () => {
    return get().bouquet.reduce((sum, item) => sum + item.quantity, 0);
  },

  sizeCategory: () => {
    const total = get().totalStemCount();
    if (total <= 15) return 'small';
    if (total <= 35) return 'medium';
    if (total <= 60) return 'large';
    return 'grand';
  },

  totalPrice: () => {
    const state = get();
    const flowersTotal = state.bouquet.reduce((sum, item) => sum + item.flower.price * item.quantity, 0);
    
    // Wrapping multiplier based on size
    const size = state.sizeCategory();
    const wrappingMultiplier = size === 'small' ? 1 : size === 'medium' ? 1.2 : size === 'large' ? 1.5 : 2;
    const wrappingTotal = (state.wrapping?.price || 0) * wrappingMultiplier;
    
    // Delivery handling fee for large/grand
    const deliveryBase = state.deliverySpeed === 'express' ? 15 : 5;
    const deliveryHandling = (size === 'large' || size === 'grand') ? 5 : 0;
    const deliveryTotal = deliveryBase + deliveryHandling;

    // Making charges based on style and size
    const baseMakingCharge = state.bouquetStyle === 'flat_layered' ? 10 : 5;
    const sizeMultiplier = size === 'small' ? 1 : size === 'medium' ? 1.5 : size === 'large' ? 2 : 3;
    const makingCharge = baseMakingCharge * sizeMultiplier;

    return flowersTotal + wrappingTotal + deliveryTotal + makingCharge;
  },
}));
