export type EventCategory = 'disaster' | 'miracle' | 'political' | 'dilemma'

export interface GameEvent {
  id: string
  name: string
  description: string
  cost: number
  category: EventCategory
  image: string
}

export const EVENT_DECK: GameEvent[] = [
  {
    "id": "dis-1",
    "name": "คลื่นความร้อนแผดเผา",
    "description": "แสงแดดแผดเผาจนน้ำระเหยไปอย่างรวดเร็ว",
    "cost": 3,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-2",
    "name": "แม่น้ำแห้งขอด",
    "description": "แหล่งน้ำสายหลักเหือดแห้งจนเห็นก้นแม่น้ำ",
    "cost": 4,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-3",
    "name": "พายุเกลือ",
    "description": "พายุพัดเอาความเค็มลงสู่แหล่งน้ำจืด",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-4",
    "name": "ท่อประปาหลักแตก",
    "description": "น้ำสะอาดรั่วไหลลงดินจำนวนมากข้ามคืน",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-5",
    "name": "ภัยแล้งรุนแรง",
    "description": "ฝนทิ้งช่วงยาวนานที่สุดในรอบทศวรรษ",
    "cost": 3,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-6",
    "name": "ดินถล่มทับคลอง",
    "description": "ทางน้ำถูกปิดกั้น ทำให้น้ำไม่ไหลเข้าอ่างเก็บน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-7",
    "name": "มลพิษทางน้ำ",
    "description": "สารเคมีปนเปื้อน ต้องทิ้งน้ำจำนวนมาก",
    "cost": 3,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-8",
    "name": "น้ำบาดาลเหือด",
    "description": "บ่อน้ำบาดาลระดับตื้นแห้งสนิท",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-9",
    "name": "วัชพืชดูดน้ำ",
    "description": "พืชต่างถิ่นแพร่พันธุ์และสูบน้ำจากระบบนิเวศ",
    "cost": 1,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-10",
    "name": "แผ่นดินไหวเบาบาง",
    "description": "รอยร้าวที่เขื่อนทำให้น้ำซึมออก",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-11",
    "name": "ภัยธรรมชาติระดับ 11",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-12",
    "name": "ภัยธรรมชาติระดับ 12",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-13",
    "name": "ภัยธรรมชาติระดับ 13",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-14",
    "name": "ภัยธรรมชาติระดับ 14",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-15",
    "name": "ภัยธรรมชาติระดับ 15",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-16",
    "name": "ภัยธรรมชาติระดับ 16",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-17",
    "name": "ภัยธรรมชาติระดับ 17",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 1,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-18",
    "name": "ภัยธรรมชาติระดับ 18",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 1,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-19",
    "name": "ภัยธรรมชาติระดับ 19",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 3,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-20",
    "name": "ภัยธรรมชาติระดับ 20",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-21",
    "name": "ภัยธรรมชาติระดับ 21",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-22",
    "name": "ภัยธรรมชาติระดับ 22",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 3,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-23",
    "name": "ภัยธรรมชาติระดับ 23",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 1,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-24",
    "name": "ภัยธรรมชาติระดับ 24",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 2,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dis-25",
    "name": "ภัยธรรมชาติระดับ 25",
    "description": "ความเสียหายจากธรรมชาติที่คาดไม่ถึงส่งผลต่อปริมาณน้ำ",
    "cost": 1,
    "category": "disaster",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-26",
    "name": "เมฆฝนเทียม",
    "description": "ปฏิบัติการฝนหลวงประสบความสำเร็จเกินคาด",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-27",
    "name": "พายุฤดูร้อน",
    "description": "ฝนตกหนักชั่วคราวเติมน้ำในอ่างเก็บน้ำ",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-28",
    "name": "เจอธารน้ำใต้ดิน",
    "description": "ขุดพบแหล่งน้ำจืดบริสุทธิ์แห่งใหม่",
    "cost": -4,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-29",
    "name": "เทคโนโลยีกลั่นน้ำ",
    "description": "เครื่องกรองน้ำทะเลทำงานได้เกินเป้าหมาย",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-30",
    "name": "ประชาชนประหยัดน้ำ",
    "description": "ทุกคนร่วมใจลดการใช้น้ำได้อย่างน่าทึ่ง",
    "cost": -1,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-31",
    "name": "ฝนหลงฤดู",
    "description": "หยาดฝนแห่งความหวังตกลงมาอย่างไม่คาดคิด",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-32",
    "name": "ปาฏิหาริย์แห่งความหวัง 7",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-33",
    "name": "ปาฏิหาริย์แห่งความหวัง 8",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-34",
    "name": "ปาฏิหาริย์แห่งความหวัง 9",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-35",
    "name": "ปาฏิหาริย์แห่งความหวัง 10",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-36",
    "name": "ปาฏิหาริย์แห่งความหวัง 11",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-37",
    "name": "ปาฏิหาริย์แห่งความหวัง 12",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-38",
    "name": "ปาฏิหาริย์แห่งความหวัง 13",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-39",
    "name": "ปาฏิหาริย์แห่งความหวัง 14",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-40",
    "name": "ปาฏิหาริย์แห่งความหวัง 15",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-41",
    "name": "ปาฏิหาริย์แห่งความหวัง 16",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -1,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-42",
    "name": "ปาฏิหาริย์แห่งความหวัง 17",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-43",
    "name": "ปาฏิหาริย์แห่งความหวัง 18",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-44",
    "name": "ปาฏิหาริย์แห่งความหวัง 19",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-45",
    "name": "ปาฏิหาริย์แห่งความหวัง 20",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-46",
    "name": "ปาฏิหาริย์แห่งความหวัง 21",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-47",
    "name": "ปาฏิหาริย์แห่งความหวัง 22",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -3,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-48",
    "name": "ปาฏิหาริย์แห่งความหวัง 23",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-49",
    "name": "ปาฏิหาริย์แห่งความหวัง 24",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "mir-50",
    "name": "ปาฏิหาริย์แห่งความหวัง 25",
    "description": "เหตุการณ์ดีๆ ที่ช่วยเพิ่มปริมาณน้ำในเมือง",
    "cost": -2,
    "category": "miracle",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-51",
    "name": "ตลาดมืดสูบน้ำ",
    "description": "กลุ่มอิทธิพลแอบลักลอบสูบน้ำไปขาย",
    "cost": 3,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-52",
    "name": "นักการเมืองทุจริตงบน้ำ",
    "description": "งบซ่อมแซมท่อหายไป น้ำจึงรั่วไหล",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-53",
    "name": "กักตุนน้ำประปา",
    "description": "ผู้มีอำนาจกักตุนน้ำไว้ใช้ส่วนตัว",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-54",
    "name": "การประท้วงปิดถนน",
    "description": "การขนส่งน้ำถูกขัดขวางจนล่าช้า",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-55",
    "name": "ข่าวลือทำลายความเชื่อมั่น",
    "description": "ประชาชนแตกตื่นแย่งกันใช้น้ำ",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-56",
    "name": "โรงงานแอบปล่อยน้ำเสีย",
    "description": "ต้องใช้น้ำดีไปเจือจางน้ำเสีย",
    "cost": 3,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-57",
    "name": "การเมืองสกปรก 7",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-58",
    "name": "การเมืองสกปรก 8",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-59",
    "name": "การเมืองสกปรก 9",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-60",
    "name": "การเมืองสกปรก 10",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-61",
    "name": "การเมืองสกปรก 11",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 3,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-62",
    "name": "การเมืองสกปรก 12",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-63",
    "name": "การเมืองสกปรก 13",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-64",
    "name": "การเมืองสกปรก 14",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-65",
    "name": "การเมืองสกปรก 15",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-66",
    "name": "การเมืองสกปรก 16",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-67",
    "name": "การเมืองสกปรก 17",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 3,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-68",
    "name": "การเมืองสกปรก 18",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-69",
    "name": "การเมืองสกปรก 19",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 3,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-70",
    "name": "การเมืองสกปรก 20",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-71",
    "name": "การเมืองสกปรก 21",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-72",
    "name": "การเมืองสกปรก 22",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 3,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-73",
    "name": "การเมืองสกปรก 23",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-74",
    "name": "การเมืองสกปรก 24",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 1,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "pol-75",
    "name": "การเมืองสกปรก 25",
    "description": "การคอร์รัปชันและความเห็นแก่ตัวทำให้สูญเสียน้ำ",
    "cost": 2,
    "category": "political",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-76",
    "name": "ข้อเสนอจากนายทุน",
    "description": "นายทุนขอซื้อน้ำแลกกับเงินสนับสนุน (นายกต้องเลือก)",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-77",
    "name": "คำขาดของชาวนา",
    "description": "เกษตรกรขู่จะเผาผลผลิตหากไม่ได้น้ำ (นายกต้องตัดสินใจ)",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-78",
    "name": "วิกฤตสาธารณสุข",
    "description": "โรงพยาบาลต้องการน้ำด่วนที่สุด (นายกต้องเลือก)",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-79",
    "name": "ไฟไหม้โรงงาน",
    "description": "ต้องใช้น้ำดับเพลิง หรือจะปล่อยให้โรงงานไหม้",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-80",
    "name": "ระบบกรองพัง",
    "description": "ต้องใช้น้ำดิบปริมาณมากเพื่อซ่อมแซม",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-81",
    "name": "ทางเลือกวัดใจ 6",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-82",
    "name": "ทางเลือกวัดใจ 7",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-83",
    "name": "ทางเลือกวัดใจ 8",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-84",
    "name": "ทางเลือกวัดใจ 9",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-85",
    "name": "ทางเลือกวัดใจ 10",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-86",
    "name": "ทางเลือกวัดใจ 11",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-87",
    "name": "ทางเลือกวัดใจ 12",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-88",
    "name": "ทางเลือกวัดใจ 13",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-89",
    "name": "ทางเลือกวัดใจ 14",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-90",
    "name": "ทางเลือกวัดใจ 15",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 2,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-91",
    "name": "ทางเลือกวัดใจ 16",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-92",
    "name": "ทางเลือกวัดใจ 17",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-93",
    "name": "ทางเลือกวัดใจ 18",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-94",
    "name": "ทางเลือกวัดใจ 19",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-95",
    "name": "ทางเลือกวัดใจ 20",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-96",
    "name": "ทางเลือกวัดใจ 21",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-97",
    "name": "ทางเลือกวัดใจ 22",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 3,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-98",
    "name": "ทางเลือกวัดใจ 23",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-99",
    "name": "ทางเลือกวัดใจ 24",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  },
  {
    "id": "dil-100",
    "name": "ทางเลือกวัดใจ 25",
    "description": "การตัดสินใจที่ยากลำบากของนายกเทศมนตรี",
    "cost": 1,
    "category": "dilemma",
    "image": "/events/placeholder.png"
  }
]
