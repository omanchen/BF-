import { Goldfish } from './types';

export const FISH_INVENTORY: Goldfish[] = [
  {
    id: '1',
    name: '頂級蘭壽 (Ranchu)',
    description: '體型圓潤，頭瘤發達，游姿優雅。',
    originalPrice: 1280,
    image: 'https://picsum.photos/400/400?random=1',
    tags: ['人氣', '頂級'],
  },
  {
    id: '2',
    name: '紅白琉金 (Ryukin)',
    description: '背部高聳，尾鰭飄逸，紅白分明。',
    originalPrice: 880,
    image: 'https://picsum.photos/400/400?random=2',
    tags: ['經典'],
  },
  {
    id: '3',
    name: '黑獅頭 (Oranda)',
    description: '全黑如墨，頭瘤如獅，霸氣十足。',
    originalPrice: 1680,
    image: 'https://picsum.photos/400/400?random=3',
    tags: ['稀有', 'Black Friday 特選'],
  },
  {
    id: '4',
    name: '五花珠鱗 (Pearlscale)',
    description: '鱗片如珍珠般立體，身形似球。',
    originalPrice: 680,
    image: 'https://picsum.photos/400/400?random=4',
    tags: ['可愛'],
  },
  {
    id: '5',
    name: '丹頂紅帽',
    description: '通體雪白，頭頂一抹紅，寓意鴻運當頭。',
    originalPrice: 520,
    image: 'https://picsum.photos/400/400?random=5',
    tags: ['好運'],
  },
  {
    id: '6',
    name: '泰國獅頭',
    description: '尾部展開角度大，色彩艷麗。',
    originalPrice: 980,
    image: 'https://picsum.photos/400/400?random=6',
    tags: ['熱銷'],
  },
];

export const LUCKY_MESSAGES = {
  7: "超級大獎！七折優惠！(30% OFF)",
  8: "恭喜發財！八折優惠！(20% OFF)",
  9: "長長久久！九折優惠！(10% OFF)",
};
