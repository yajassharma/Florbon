export type FlowerType = 'rose' | 'tulip' | 'orchid' | 'lily' | 'peony' | 'sunflower' | 'daisy' | 'hydrangea' | 'exotic' | 'filler' | 'green';
export type FlowerRole = 'focal' | 'secondary' | 'filler' | 'foliage';

export interface Flower {
  id: string;
  name: string;
  type: FlowerType;
  role: FlowerRole;
  color: string;
  price: number;
  image: string;
  stock: number;
}

export interface Wrapping {
  id: string;
  name: string;
  color: string;
  price: number;
  type: 'standard' | 'premium';
  image: string;
}

export const FLOWERS: Flower[] = [
  // Roses
  { id: 'rose-red', name: 'Crimson Rose', type: 'rose', role: 'focal', color: 'red', price: 4.50, image: 'https://ik.imagekit.io/b6vbf9pul/Crimson%20Rose.png?updatedAt=1772750210117', stock: 100 },
  { id: 'rose-white', name: 'Snow White Rose', type: 'rose', role: 'focal', color: 'white', price: 4.50, image: 'https://ik.imagekit.io/b6vbf9pul/Snow%20White%20Rose.png?updatedAt=1772750320935', stock: 100 },
  { id: 'rose-pink', name: 'Blush Pink Rose', type: 'rose', role: 'focal', color: 'pink', price: 4.50, image: 'https://ik.imagekit.io/b6vbf9pul/Blush%20Pink%20Rose.png?updatedAt=1772750328039', stock: 100 },
  { id: 'rose-yellow', name: 'Golden Yellow Rose', type: 'rose', role: 'focal', color: 'yellow', price: 4.50, image: 'https://ik.imagekit.io/b6vbf9pul/Golden%20Yellow%20Rose.png?updatedAt=1772750328012', stock: 100 },
  { id: 'rose-peach', name: 'Peach Rose', type: 'rose', role: 'focal', color: 'peach', price: 4.50, image: 'https://ik.imagekit.io/b6vbf9pul/Peach%20Rose.png?updatedAt=1772750327668', stock: 100 },
  { id: 'rose-black', name: 'Midnight Black Rose', type: 'rose', role: 'focal', color: 'black', price: 6.00, image: 'https://ik.imagekit.io/b6vbf9pul/Midnight%20Black%20Rose.png?updatedAt=1772750327769', stock: 50 },

  // Tulips
  { id: 'tulip-red', name: 'Classic Red Tulip', type: 'tulip', role: 'secondary', color: 'red', price: 3.00, image: 'https://ik.imagekit.io/b6vbf9pul/Classic%20Red%20Tulip.png?updatedAt=1772750421797', stock: 100 },
  { id: 'tulip-yellow', name: 'Sunny Yellow Tulip', type: 'tulip', role: 'secondary', color: 'yellow', price: 3.00, image: 'https://ik.imagekit.io/b6vbf9pul/Sunny%20Yellow%20Tulip.png?updatedAt=1772750420797', stock: 100 },
  { id: 'tulip-pink', name: 'Soft Pink Tulip', type: 'tulip', role: 'secondary', color: 'pink', price: 3.00, image: 'https://ik.imagekit.io/b6vbf9pul/Soft%20Pink%20Tulip.png?updatedAt=1772750421373', stock: 100 },
  { id: 'tulip-purple', name: 'Deep Purple Tulip', type: 'tulip', role: 'secondary', color: 'purple', price: 3.50, image: 'https://ik.imagekit.io/b6vbf9pul/Deep%20Purple%20Tulip.png?updatedAt=1772750421428', stock: 100 },
  { id: 'tulip-white', name: 'Pure White Tulip', type: 'tulip', role: 'secondary', color: 'white', price: 3.00, image: 'https://ik.imagekit.io/b6vbf9pul/Pure%20White%20Tulip.png?updatedAt=1772750418348', stock: 100 },

  // Orchids
  { id: 'orchid-purple', name: 'Royal Purple Orchid', type: 'orchid', role: 'focal', color: 'purple', price: 8.50, image: 'https://ik.imagekit.io/b6vbf9pul/Royal%20Purple%20Orchid.png?updatedAt=1772750494420', stock: 50 },
  { id: 'orchid-white', name: 'Elegant White Orchid', type: 'orchid', role: 'focal', color: 'white', price: 8.50, image: 'https://ik.imagekit.io/b6vbf9pul/Elegant%20White%20Orchid.png?updatedAt=1772750494084', stock: 50 },
  { id: 'orchid-pink', name: 'Vibrant Pink Orchid', type: 'orchid', role: 'focal', color: 'pink', price: 8.50, image: 'https://ik.imagekit.io/b6vbf9pul/Vibrant%20Pink%20Orchid.png?updatedAt=1772750494211', stock: 50 },
  { id: 'orchid-blue', name: 'Mystic Blue Orchid', type: 'orchid', role: 'focal', color: 'blue', price: 10.00, image: 'https://ik.imagekit.io/b6vbf9pul/Mystic%20Blue%20Orchid.png?updatedAt=1772750494559', stock: 30 },

  // Lilies
  { id: 'lily-white', name: 'Stargazer White Lily', type: 'lily', role: 'focal', color: 'white', price: 6.50, image: 'https://ik.imagekit.io/b6vbf9pul/Stargazer%20White%20Lily.png?updatedAt=1772750604207', stock: 80 },
  { id: 'lily-pink', name: 'Oriental Pink Lily', type: 'lily', role: 'focal', color: 'pink', price: 6.50, image: 'https://ik.imagekit.io/b6vbf9pul/Oriental%20Pink%20Lily.png?updatedAt=1772750603029', stock: 80 },
  { id: 'lily-yellow', name: 'Golden Lily', type: 'lily', role: 'focal', color: 'yellow', price: 6.00, image: 'https://ik.imagekit.io/b6vbf9pul/Golden%20Lily.png?updatedAt=1772750604205', stock: 80 },
  { id: 'lily-orange', name: 'Tiger Lily', type: 'lily', role: 'focal', color: 'orange', price: 7.00, image: 'https://ik.imagekit.io/b6vbf9pul/Tiger%20Lily.png?updatedAt=1772750602285', stock: 80 },

  // Peonies
  { id: 'peony-pink', name: 'Coral Charm Peony', type: 'peony', role: 'focal', color: 'pink', price: 9.00, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', stock: 60 },
  { id: 'peony-white', name: 'Bridal White Peony', type: 'peony', role: 'focal', color: 'white', price: 9.00, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0fab?auto=format&fit=crop&w=800&q=80', stock: 60 },
  { id: 'peony-coral', name: 'Sunset Coral Peony', type: 'peony', role: 'focal', color: 'coral', price: 9.50, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80', stock: 60 },

  // Sunflowers
  { id: 'sunflower-yellow', name: 'Giant Yellow Sunflower', type: 'sunflower', role: 'focal', color: 'yellow', price: 5.00, image: 'https://ik.imagekit.io/b6vbf9pul/Giant%20Yellow%20Sunflower.png?updatedAt=1772750869054', stock: 100 },
  { id: 'sunflower-red', name: 'Autumn Red Sunflower', type: 'sunflower', role: 'focal', color: 'red', price: 5.50, image: 'https://ik.imagekit.io/b6vbf9pul/Autumn%20Red%20Sunflower.png?updatedAt=1772750868697', stock: 80 },

  // Daisies
  { id: 'daisy-white', name: 'Classic White Daisy', type: 'daisy', role: 'secondary', color: 'white', price: 2.00, image: 'https://ik.imagekit.io/b6vbf9pul/Classic%20White%20Daisy.png?updatedAt=1772750868582', stock: 150 },
  { id: 'daisy-yellow', name: 'Bright Yellow Daisy', type: 'daisy', role: 'secondary', color: 'yellow', price: 2.00, image: 'https://ik.imagekit.io/b6vbf9pul/Bright%20Yellow%20Daisy.png?updatedAt=1772750868899', stock: 150 },
  { id: 'daisy-pink', name: 'Pink Gerbera Daisy', type: 'daisy', role: 'secondary', color: 'pink', price: 3.50, image: 'https://ik.imagekit.io/b6vbf9pul/Pink%20Gerbera%20Daisy.png?updatedAt=1772750868987', stock: 100 },

  // Hydrangeas
  { id: 'hydrangea-blue', name: 'Sky Blue Hydrangea', type: 'hydrangea', role: 'focal', color: 'blue', price: 7.50, image: 'https://ik.imagekit.io/b6vbf9pul/Sky%20Blue%20Hydrangea.png?updatedAt=1772751019169', stock: 80 },
  { id: 'hydrangea-pink', name: 'Blush Pink Hydrangea', type: 'hydrangea', role: 'focal', color: 'pink', price: 7.50, image: 'https://ik.imagekit.io/b6vbf9pul/Blush%20Pink%20Hydrangea.png?updatedAt=1772751019339', stock: 80 },
  { id: 'hydrangea-white', name: 'Snowball White Hydrangea', type: 'hydrangea', role: 'focal', color: 'white', price: 7.50, image: 'https://ik.imagekit.io/b6vbf9pul/Snowball%20White%20Hydrangea.png?updatedAt=1772751018364', stock: 80 },
  { id: 'hydrangea-purple', name: 'Lavender Hydrangea', type: 'hydrangea', role: 'focal', color: 'purple', price: 8.00, image: 'https://ik.imagekit.io/b6vbf9pul/Lavender%20Hydrangea.png?updatedAt=1772751019082', stock: 80 },

  // Foliage
  { id: 'green-eucalyptus', name: 'Silver Dollar Eucalyptus', type: 'green', role: 'foliage', color: 'green', price: 2.50, image: 'https://ik.imagekit.io/b6vbf9pul/Silver%20Dollar%20Eucalyptus.png?updatedAt=1772751106925', stock: 200 },
  { id: 'green-fern', name: 'Leatherleaf Fern', type: 'green', role: 'foliage', color: 'green', price: 1.50, image: 'https://ik.imagekit.io/b6vbf9pul/Leatherleaf%20Fern.png?updatedAt=1772751108418', stock: 200 },
  { id: 'green-dusty', name: 'Dusty Miller', type: 'green', role: 'foliage', color: 'silver', price: 2.00, image: 'https://ik.imagekit.io/b6vbf9pul/Dusty%20Miller.png?updatedAt=1772751108288', stock: 150 },
  { id: 'green-monstera', name: 'Monstera Leaf', type: 'green', role: 'foliage', color: 'green', price: 4.00, image: 'https://ik.imagekit.io/b6vbf9pul/Monstera%20Leaf.png?updatedAt=1772751108159', stock: 100 },

  // Fillers
  { id: 'filler-babysbreath', name: 'Baby\'s Breath', type: 'filler', role: 'filler', color: 'white', price: 3.00, image: 'https://images.unsplash.com/photo-1552689486-f6773047d19f?auto=format&fit=crop&w=800&q=80', stock: 200 },
  { id: 'filler-waxflower', name: 'Pink Waxflower', type: 'filler', role: 'filler', color: 'pink', price: 3.50, image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80', stock: 150 },
  { id: 'filler-statice', name: 'Purple Statice', type: 'filler', role: 'filler', color: 'purple', price: 2.50, image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80', stock: 150 },
  { id: 'filler-thistle', name: 'Blue Thistle', type: 'filler', role: 'filler', color: 'blue', price: 4.00, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80', stock: 150 },
];

export const WRAPPINGS: Wrapping[] = [
  { id: 'w1', name: 'Kraft Paper', color: 'Brown', price: 5.0, type: 'standard', image: 'https://ik.imagekit.io/b6vbf9pul/Gemini_Generated_Image_ytp1yytp1yytp1yy.png?updatedAt=1772751128580' },
  { id: 'w2', name: 'Pastel Pink Matte', color: 'Pink', price: 8.0, type: 'premium', image: 'https://ik.imagekit.io/b6vbf9pul/Gemini_Generated_Image_87jq9c87jq9c87jq.png?updatedAt=1772751126007' },
  { id: 'w3', name: 'Silk Ribbon & Cellophane', color: 'Clear', price: 10.0, type: 'premium', image: 'https://ik.imagekit.io/b6vbf9pul/Gemini_Generated_Image_y88i2zy88i2zy88i.png?updatedAt=1772751128580' },
  { id: 'w4', name: 'Matte Black Paper', color: 'Black', price: 8.0, type: 'premium', image: 'https://ik.imagekit.io/b6vbf9pul/Gemini_Generated_Image_9k5vpg9k5vpg9k5v.png?updatedAt=1772751130138' },
];
