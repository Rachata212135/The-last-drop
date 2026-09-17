import type { Faction, Role } from './types'

export const FACTIONS: Faction[] = ['farmer', 'industry', 'citizen']

export type AccentKey = 'water' | 'toxic' | 'ember' | 'gold' | 'alert'

export interface RoleMeta {
  role: Role
  label: string
  tagline: string
  description: string
  image: string
  accent: AccentKey
  /** lucide-react icon name */
  icon: 'Wheat' | 'Factory' | 'Users' | 'Crown'
}

export const ROLE_META: Record<Role, RoleMeta> = {
  farmer: {
    role: 'farmer',
    label: 'เกษตรกร',
    tagline: 'ผู้หล่อเลี้ยงแผ่นดิน',
    description:
      'คุณปลูกพืชผลเลี้ยงดูผู้คนทั้งเมือง แต่เรือกสวนไร่นาของคุณก็ต้องการน้ำมหาศาลเช่นกัน',
    image: '/roles/farmer.png',
    accent: 'toxic',
    icon: 'Wheat',
  },
  industry: {
    role: 'industry',
    label: 'อุตสาหกรรม',
    tagline: 'ฟันเฟืองแห่งความก้าวหน้า',
    description:
      'โรงงานของคุณขับเคลื่อนอนาคตของเมือง และสูบน้ำมหาศาลเพื่อให้เครื่องจักรเดินต่อไปได้',
    image: '/roles/industry.png',
    accent: 'ember',
    icon: 'Factory',
  },
  citizen: {
    role: 'citizen',
    label: 'ประชาชน',
    tagline: 'หัวใจของเมือง',
    description:
      'ผู้คนธรรมดา คุณแค่ต้องการน้ำดื่มน้ำใช้เพียงเล็กน้อยเพื่อเอาชีวิตรอดไปอีกวัน',
    image: '/roles/citizen.png',
    accent: 'water',
    icon: 'Users',
  },
  mayor: {
    role: 'mayor',
    label: 'นายกเทศมนตรี',
    tagline: 'ผู้แบกรับการตัดสินใจ',
    description:
      'เมื่อน้ำใกล้หมด คุณคือคนเดียวที่ต้องตัดสินใจว่าจะตัดน้ำจากใครเพื่อรักษาเมืองไว้',
    image: '/roles/mayor.png',
    accent: 'gold',
    icon: 'Crown',
  },
}

export const CHOOSABLE_ROLES: Role[] = ['farmer', 'industry', 'citizen', 'mayor']
