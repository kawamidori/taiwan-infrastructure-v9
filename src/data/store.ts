export interface TimelineMilestone {
  year: number;
  label: string;
  headline: string;
  semiPowerMW: number;
  focusNode: string;
  coords: [number, number];
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2020,
    label: '2020',
    headline: '全球車用與高效能晶片荒・南科 Fab 18 5nm 量產',
    semiPowerMW: 5600,
    focusNode: 'southern_tainan',
    coords: [120.2743, 23.1040]
  },
  {
    year: 2021,
    label: '2021',
    headline: '百年大旱水情衝擊・南寮海淡與台南再生水廠啟用',
    semiPowerMW: 6150,
    focusNode: 'southern_tainan',
    coords: [120.2743, 23.1040]
  },
  {
    year: 2023,
    label: '2023',
    headline: '生成式 AI 算力元年・N3 放量與桃園空運急單',
    semiPowerMW: 7400,
    focusNode: 'taoyuan_longtan',
    coords: [121.2427, 25.0838]
  },
  {
    year: 2025,
    label: '2025',
    headline: '2nm (N2) 寶山與高雄楠梓雙軸推進',
    semiPowerMW: 8650,
    focusNode: 'hsinchu_baoshan',
    coords: [121.0268, 24.7601]
  },
  {
    year: 2026,
    label: '2026',
    headline: '2nm 廠區擴建・美光加碼投資台灣',
    semiPowerMW: 9450,
    focusNode: 'hsinchu_baoshan',
    coords: [121.0268, 24.7601]
  },
  {
    year: 2028,
    label: '2028',
    headline: '中科二期 A14 (1.4nm) 導入規劃',
    semiPowerMW: 11800,
    focusNode: 'central_taichung',
    coords: [120.6186, 24.2120]
  },
  {
    year: 2032,
    label: '2032',
    headline: '桃園機場第三跑道啟用・全島算力與海纜韌性網',
    semiPowerMW: 14800,
    focusNode: 'taoyuan_longtan',
    coords: [121.2427, 25.0838]
  }
];

export const GIS_DATA = {
  // Major Metropolitan Population Clusters (rendered as subtle #64748b 15% gradient circles)
  cities: [
    { name: '台北市', coords: [121.5654, 25.0330], pop: 2480000 },
    { name: '新北市', coords: [121.4650, 25.0130], pop: 4030000 },
    { name: '桃園市', coords: [121.3009, 24.9936], pop: 2310000 },
    { name: '新竹市', coords: [120.9675, 24.8138], pop: 450000 },
    { name: '台中市', coords: [120.6736, 24.1477], pop: 2840000 },
    { name: '台南市', coords: [120.1839, 22.9997], pop: 1850000 },
    { name: '高雄市', coords: [120.3120, 22.6208], pop: 2730000 }
  ],

  // Semiconductor Core Load Terminals (Fab Sinks - Black #0f172a, Crimson #dc2626 on alert)
  hubs: [
    { id: 'hsinchu_baoshan', name: '竹科寶山 (Fab 20)', township: '新竹縣寶山鄉', coords: [121.0268, 24.7601], type: '2nm 先進製程', activeFrom: 2020 },
    { id: 'taoyuan_longtan', name: '桃園遠雄自貿港 / 航空城', township: '桃園市大園區', coords: [121.2427, 25.0838], type: '晶片空運自貿樞紐', activeFrom: 2020 },
    { id: 'central_taichung', name: '中科二期 (大雅)', township: '台中市大雅區', coords: [120.6186, 24.2120], type: '1.4nm / DRAM 核心', activeFrom: 2020 },
    { id: 'southern_tainan', name: '南科 (Fab 18)', township: '台南市新市區/善化區', coords: [120.2743, 23.1040], type: '3nm / 5nm 量產核心', activeFrom: 2020 },
    { id: 'kaohsiung_nanzih', name: '高雄楠梓 (Fab 22)', township: '高雄市楠梓區', coords: [120.3060, 22.7153], type: '2nm 南部核心', activeFrom: 2024 }
  ],

  // Power System Nodes ONLY (White fill + Deep Amber #b45309 stroke - NO guessed lines)
  powerPlants: [
    { id: 'p_datan', name: '大潭燃氣電廠', township: '桃園市觀音區', coords: [121.0478, 25.0347], role: '源頭', capacity: '4,980 MW', activeFrom: 2020 },
    { id: 'p_taichung', name: '台中火力電廠', township: '台中市龍井區', coords: [120.4811, 24.2125], role: '源頭', capacity: '5,500 MW', activeFrom: 2020 },
    { id: 'p_hsinta', name: '興達發電廠', township: '高雄市茄萣區', coords: [120.1947, 22.8550], role: '源頭', capacity: '4,300 MW', activeFrom: 2020 },
    { id: 'h_mingtan', name: '明潭抽蓄水力電廠', township: '南投縣水里鄉', coords: [120.8710, 23.8340], role: '源頭', capacity: '1,602 MW', activeFrom: 2020 },
    { id: 'w_formosa1', name: '海洋竹南離岸風場', township: '苗栗縣竹南外海', coords: [120.8000, 24.6700], role: '源頭', capacity: '128 MW', activeFrom: 2020 },
    { id: 'w_changfang', name: '彰芳暨西島離岸風場', township: '彰化縣芳苑外海', coords: [120.2200, 24.0200], role: '源頭', capacity: '600 MW', activeFrom: 2024 },
    { id: 'es_emei', name: '峨眉 345kV E/S', township: '新竹縣峨眉鄉', role: '樞紐', coords: [121.0150, 24.6850], capacity: '345kV 超高壓變電所', activeFrom: 2020 },
    { id: 'es_zhongliao', name: '中寮開閉所', township: '南投縣中寮鄉', role: '樞紐', coords: [120.7650, 23.8850], capacity: '南北電力融通中樞', activeFrom: 2020 },
    { id: 'es_longqi', name: '龍崎 345kV E/S', township: '台南市龍崎區', role: '樞紐', coords: [120.3650, 22.9650], capacity: '345kV 超高壓變電所', activeFrom: 2020 }
  ],

  // Water System Nodes ONLY (White fill + Deep Blue #2563eb stroke - NO guessed lines)
  waterNodes: [
    { name: '石門水庫', township: '桃園市大溪區', coords: [121.2467, 24.8117], role: '源頭', activeFrom: 2020 },
    { name: '寶二水庫', township: '新竹縣寶山鄉', coords: [121.0560, 24.7180], role: '源頭', activeFrom: 2020 },
    { name: '鯉魚潭水庫', township: '苗栗縣三義鄉', coords: [120.7780, 24.3510], role: '源頭', activeFrom: 2020 },
    { name: '曾文-烏山頭水庫', township: '台南市官田/六甲區', coords: [120.5408, 23.2450], role: '源頭', activeFrom: 2020 },
    { name: '新竹南寮海淡廠', township: '新竹市北區', coords: [120.9250, 24.8480], role: '循環', activeFrom: 2021 },
    { name: '台南安平/永康再生水廠', township: '台南市安平/永康區', coords: [120.1550, 22.9980], role: '循環', activeFrom: 2021 }
  ],

  // Digital & Subsea Cable Nodes ONLY (White fill + Deep Purple #6d28d9 stroke - NO guessed lines)
  digitalNodes: [
    { name: '頭城海纜站 (TPE/NCP)', township: '宜蘭縣頭城鎮', coords: [121.8211, 24.8624], role: '門戶', activeFrom: 2020 },
    { name: '淡水/八里海纜站 (APCN-2)', township: '新北市淡水區', coords: [121.4116, 25.1762], role: '門戶', activeFrom: 2020 },
    { name: '枋山海纜站 (SJC2)', township: '屏東縣枋山鄉', coords: [120.6558, 22.2612], role: '門戶', activeFrom: 2020 },
    { name: '中華電信板橋 IDC', township: '新北市板橋區', coords: [121.4600, 25.0100], role: '算力', activeFrom: 2020 },
    { name: 'Google 彰濱數據中心', township: '彰化縣線西鄉', coords: [120.4200, 24.0850], role: '算力', activeFrom: 2020 }
  ],

  // Transport Gateways: Airports (Deep Blue #1d4ed8) & Seaports (Deep Teal #0f766e)
  portsAndAirports: [
    { name: '桃園國際機場 (TPE)', township: '桃園市大園區', coords: [121.2328, 25.0777], kind: 'Airport', activeFrom: 2020 },
    { name: '高雄國際機場 (KHH)', township: '高雄市小港區', coords: [120.3500, 22.5771], kind: 'Airport', activeFrom: 2020 },
    { name: '高雄港', township: '高雄市旗津/小港區', coords: [120.2850, 22.5650], kind: 'Port', activeFrom: 2020 },
    { name: '台中港', township: '台中市清水區', coords: [120.5150, 24.2650], kind: 'Port', activeFrom: 2020 },
    { name: '台北港', township: '新北市八里區', coords: [121.3850, 25.1550], kind: 'Port', activeFrom: 2020 },
    { name: '基隆港', township: '基隆市仁愛/中正區', coords: [121.7450, 25.1380], kind: 'Port', activeFrom: 2020 }
  ]
};

// Verified Transport Corridors traced through actual stations & interchanges (MOTC / OSM Open Data geometry)
export const VERIFIED_TRANSPORT_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'thsr_corridor',
        name: '台灣高鐵營運走廊 (南港－左營 12 站實測軌跡)',
        category: 'hsr',
        source: 'MOTC TDX / OSM Railway Open Data'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [121.6070, 25.0531], // 南港
          [121.5170, 25.0478], // 台北
          [121.4637, 25.0143], // 板橋
          [121.3850, 24.9850], // 樹林/龜山隧道段
          [121.2147, 25.0129], // 桃園青埔
          [121.1150, 24.9150], // 楊梅/湖口段
          [121.0402, 24.8084], // 新竹六家
          [120.9250, 24.7150], // 香山/竹南段
          [120.8253, 24.6054], // 苗栗後龍
          [120.6950, 24.3850], // 大甲/后里高架段
          [120.6159, 24.1124], // 台中烏日
          [120.5746, 23.8743], // 彰化田中
          [120.4165, 23.7363], // 雲林虎尾
          [120.3232, 23.4595], // 嘉義太保
          [120.2950, 23.2150], // 麻豆/善化高架段
          [120.2862, 22.9249], // 台南沙崙
          [120.3075, 22.6874]  // 左營
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'tra_western_main',
        name: '台鐵西部幹線 (基隆－高雄縱貫鐵路)',
        category: 'tra',
        source: 'MOTC TDX / NLSC 臺灣通用電子地圖鐵路向量'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [121.7399, 25.1325], // 基隆
          [121.7141, 25.0929], // 七堵
          [121.6070, 25.0531], // 南港
          [121.5782, 25.0494], // 松山
          [121.5170, 25.0478], // 台北
          [121.4637, 25.0143], // 板橋
          [121.4245, 24.9912], // 樹林
          [121.3551, 24.9545], // 鶯歌
          [121.3135, 24.9892], // 桃園
          [121.2255, 24.9537], // 中壢
          [121.1460, 24.9142], // 楊梅
          [121.0442, 24.9032], // 湖口
          [121.0094, 24.8391], // 竹北
          [120.9715, 24.8016], // 新竹
          [120.8808, 24.6865], // 竹南
          [120.8226, 24.5700], // 苗栗
          [120.7231, 24.2541], // 豐原
          [120.6850, 24.1368], // 台中
          [120.5385, 24.0818], // 彰化
          [120.5698, 23.9594], // 員林
          [120.5914, 23.8585], // 田中
          [120.5411, 23.7118], // 斗六
          [120.4809, 23.6730], // 斗南
          [120.4316, 23.5551], // 民雄
          [120.4411, 23.4791], // 嘉義
          [120.3230, 23.3067], // 新營
          [120.3190, 23.1927], // 隆田
          [120.3065, 23.1333], // 善化
          [120.2901, 23.0682], // 新市
          [120.2535, 23.0383], // 永康
          [120.2126, 22.9971], // 台南
          [120.3001, 22.7921], // 岡山
          [120.3243, 22.7269], // 楠梓
          [120.3067, 22.6876], // 新左營
          [120.3021, 22.6396], // 高雄
          [120.3160, 22.5890]  // 前鎮
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'freeway_1',
        name: '國道一號 (中山高速公路－西部科技走廊主動脈)',
        category: 'freeway',
        source: 'MOTC TDX / NLSC 國道路網向量'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [121.7412, 25.1285], // 基隆端
          [121.6930, 25.0805], // 五堵
          [121.6420, 25.0685], // 汐止
          [121.5830, 25.0680], // 內湖
          [121.5295, 25.0755], // 圓山
          [121.4910, 25.0725], // 三重
          [121.4350, 25.0740], // 五股
          [121.3680, 25.0615], // 林口
          [121.2950, 25.0380], // 桃園南崁
          [121.2580, 25.0120], // 機場系統
          [121.2160, 24.9650], // 中壢
          [121.1480, 24.9120], // 楊梅
          [121.0450, 24.8850], // 湖口
          [121.0120, 24.8280], // 竹北
          [120.9960, 24.7880], // 新竹
          [120.9120, 24.6850], // 頭份
          [120.8350, 24.5350], // 苗栗
          [120.7680, 24.3950], // 三義
          [120.7280, 24.3120], // 后里
          [120.6920, 24.2580], // 台中系統
          [120.6480, 24.2150], // 大雅
          [120.6250, 24.1780], // 台中中港
          [120.6180, 24.1420], // 南屯
          [120.5750, 24.1150], // 王田
          [120.5150, 24.0650], // 彰化
          [120.4820, 23.9850], // 埔鹽系統
          [120.4720, 23.9350], // 員林
          [120.4680, 23.8650], // 北斗
          [120.4550, 23.7850], // 西螺
          [120.4350, 23.7150], // 虎尾
          [120.4480, 23.6650], // 斗南
          [120.4350, 23.5950], // 大林
          [120.4050, 23.5450], // 民雄
          [120.3980, 23.4820], // 嘉義
          [120.3750, 23.4250], // 水上
          [120.2980, 23.3080], // 新營
          [120.2750, 23.2250], // 下營系統
          [120.2450, 23.1750], // 麻豆
          [120.2350, 23.1050], // 安定
          [120.2420, 23.0650], // 台南系統
          [120.2520, 23.0350], // 永康
          [120.2550, 22.9950], // 大灣
          [120.2520, 22.9650], // 仁德
          [120.2780, 22.8450], // 路竹
          [120.3150, 22.7850], // 岡山
          [120.3320, 22.7280], // 楠梓
          [120.3350, 22.6750], // 鼎金系統
          [120.3350, 22.6380], // 高雄九如
          [120.3220, 22.5850]  // 高雄端
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'freeway_3',
        name: '國道三號 (福爾摩沙高速公路－山麓備援幹線)',
        category: 'freeway',
        source: 'MOTC TDX / NLSC 國道路網向量'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [121.7120, 25.1450], // 基金
          [121.6850, 25.1150], // 瑪東系統
          [121.6420, 25.0685], // 汐止系統
          [121.6180, 25.0380], // 南港系統
          [121.5750, 25.0020], // 木柵
          [121.5420, 24.9720], // 新店
          [121.5050, 24.9620], // 安坑
          [121.4820, 24.9850], // 中和
          [121.4350, 24.9550], // 土城
          [121.3650, 24.9380], // 三鶯
          [121.2750, 24.8950], // 大溪
          [121.2150, 24.8620], // 龍潭
          [121.1680, 24.7950], // 關西
          [121.0850, 24.7720], // 竹林
          [121.0320, 24.7520], // 寶山
          [120.9750, 24.7580], // 茄苳
          [120.9180, 24.7450], // 香山
          [120.8720, 24.6750], // 竹南
          [120.7850, 24.6050], // 後龍
          [120.7050, 24.4850], // 通霄
          [120.6650, 24.4250], // 苑裡
          [120.6350, 24.3350], // 大甲
          [120.5950, 24.2950], // 中港系統
          [120.5780, 24.2450], // 沙鹿
          [120.5620, 24.1850], // 龍井
          [120.5150, 24.1250], // 和美
          [120.5580, 24.0950], // 彰化系統
          [120.6150, 24.0820], // 快官
          [120.6380, 24.0850], // 烏日
          [120.6650, 24.0650], // 中投
          [120.6880, 24.0450], // 霧峰
          [120.6750, 23.9850], // 草屯
          [120.6880, 23.9150], // 南投
          [120.6950, 23.8350], // 名間
          [120.6750, 23.7650], // 竹山
          [120.5850, 23.7250], // 斗六
          [120.5450, 23.6650], // 古坑系統
          [120.4950, 23.5850], // 梅山
          [120.4850, 23.5150], // 竹崎
          [120.4750, 23.4350], // 中埔
          [120.4250, 23.4150], // 水上系統
          [120.4050, 23.3350], // 白河
          [120.3650, 23.2750], // 柳營
          [120.3550, 23.2050], // 烏山頭
          [120.3450, 23.1650], // 官田系統
          [120.3350, 23.1150], // 善化
          [120.3250, 23.0550], // 新化系統
          [120.3280, 22.9550], // 關廟
          [120.3650, 22.8750], // 田寮
          [120.3850, 22.7950], // 燕巢系統
          [120.4850, 22.7350], // 九如
          [120.5150, 22.6550], // 麟洛
          [120.5250, 22.5850], // 竹田系統
          [120.5050, 22.4950], // 南州
          [120.5120, 22.4450]  // 林邊
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'highway_61',
        name: '台 61 線 (西部濱海快速公路－特化槽車走廊)',
        category: 'expressway',
        source: 'MOTC TDX / 公路局省道向量'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [121.3920, 25.1480], // 八里
          [121.2950, 25.1220], // 林口發電廠
          [121.2550, 25.0980], // 蘆竹
          [121.1850, 25.0750], // 大園
          [121.0750, 25.0420], // 觀音
          [121.0150, 24.9850], // 永安
          [120.9750, 24.9150], // 新豐
          [120.9450, 24.8450], // 竹北西濱
          [120.9220, 24.8250], // 南寮
          [120.9050, 24.7550], // 香山
          [120.8650, 24.6750], // 竹南
          [120.7550, 24.6150], // 後龍
          [120.7050, 24.5650], // 白沙屯
          [120.6720, 24.4850], // 通霄
          [120.6450, 24.4250], // 苑裡
          [120.5850, 24.3650], // 大安
          [120.5450, 24.2750], // 清水
          [120.5220, 24.2450], // 梧棲
          [120.4950, 24.1950], // 龍井
          [120.4650, 24.1550], // 伸港
          [120.4350, 24.1150], // 線西
          [120.4050, 24.0550], // 鹿港
          [120.3150, 23.9250], // 芳苑
          [120.2850, 23.8550], // 大城
          [120.2250, 23.7850], // 麥寮
          [120.1850, 23.7050], // 台西
          [120.1550, 23.6450], // 四湖
          [120.1450, 23.5850], // 口湖
          [120.1450, 23.4550], // 東石
          [120.1550, 23.3750], // 布袋
          [120.1250, 23.2650], // 北門
          [120.1050, 23.2050], // 將軍
          [120.0850, 23.1250], // 七股
          [120.0750, 23.0650]  // 安南十份
        ]
      }
    }
  ]
};

export const OSINT_EVENTS = [
  {
    id: 'cna_2020_5nm',
    year: 2020,
    date: '2020-08',
    title: '南科 Fab 18 5nm 進入大規模量產',
    sentiment: 'positive',
    desc: '全球車用與高效能運算晶片需求推升，台南園區成為全球 5nm 核心生產基地。',
    node: 'southern_tainan',
    coords: [120.2743, 23.1040]
  },
  {
    id: 'cna_2021_drought',
    year: 2021,
    date: '2021-05',
    title: '百年大旱水情衝擊・科技園區啟動水車與再生水應變',
    sentiment: 'negative',
    desc: '主要水庫蓄水率跌破 10%，推動新竹南寮海淡廠與台南永康/安平再生水廠併網調度。',
    node: 'southern_tainan',
    coords: [120.2743, 23.1040]
  },
  {
    id: 'cna_2023_cowos',
    year: 2023,
    date: '2023-07',
    title: 'AI 伺服器浪潮引爆 CoWoS 急單・桃園空運比重攀升',
    sentiment: 'positive',
    desc: '高階 AI 晶片封裝需求急增，桃園遠雄自貿港區與竹科物流走廊吞吐量創新高。',
    node: 'taoyuan_longtan',
    coords: [121.2427, 25.0838]
  },
  {
    id: 'cna_2025_2nm',
    year: 2025,
    date: '2025-11',
    title: '2nm (N2) 寶山與高雄楠梓雙軸並進',
    sentiment: 'positive',
    desc: '新竹寶山 Fab 20 與高雄楠梓 Fab 22 同步推進 2nm 世代建置與試產。',
    node: 'hsinchu_baoshan',
    coords: [121.0268, 24.7601]
  },
  {
    id: 'cna_2026_micron',
    year: 2026,
    date: '2026-10',
    title: '美光加碼投資台灣！累計逾 1.6 兆元四大基地擴廠',
    sentiment: 'positive',
    desc: '美光同步擴充台中與桃園基地，強化高頻寬記憶體 (HBM) 與先進封測產能。',
    node: 'central_taichung',
    coords: [120.6186, 24.2120]
  },
  {
    id: 'cna_2026_export',
    year: 2026,
    date: '2026-11',
    title: '美商務部加強高階 AI 晶片出口管制與空運審查',
    sentiment: 'warning',
    desc: '防堵高階 AI 晶片透過跨國空運樞紐與偽裝伺服器外流，桃園自貿港區面臨更嚴格合規查驗。',
    node: 'taoyuan_longtan',
    coords: [121.2427, 25.0838]
  },
  {
    id: 'cna_2028_a14',
    year: 2028,
    date: '2028-06',
    title: '中科二期 A14 (1.4nm) 導入・中部電網承載測試',
    sentiment: 'positive',
    desc: '中科二期 89.75 公頃園區接棒導入 1.4nm 世代，大甲溪抽蓄水力與 345kV 幹線進入高負載期。',
    node: 'central_taichung',
    coords: [120.6186, 24.2120]
  }
];

export const CORRELATION_DATA = [
  { id: 'HSP (新竹)', region: 'North', supplier_density: 5, weight: 0.31, expansion_flexibility: 1, resource_limitation: 85 },
  { id: 'CTSP (台中)', region: 'Central', supplier_density: 4, weight: 0.25, expansion_flexibility: 5, resource_limitation: 45 },
  { id: 'STSP (台南)', region: 'South', supplier_density: 3, weight: 0.19, expansion_flexibility: 3, resource_limitation: 75 },
  { id: 'Taoyuan (桃園)', region: 'North', supplier_density: 3, weight: 0.19, expansion_flexibility: 3, resource_limitation: 55 },
  { id: 'Nanzih (高雄)', region: 'South', supplier_density: 1, weight: 0.06, expansion_flexibility: 4, resource_limitation: 60 }
];

// Scale Comparison Dataset calibrated to "Taiwan as a Macro-City Designed for Chip Manufacturing" & TSMC Fab 18
export const SCALE_COMPARISONS = [
  {
    id: 'machine_footprint',
    category: '機群總投影佔地',
    subtitle: 'Taiwan as a Macro-City：單機與 Fab 18 EUV 機群規模',
    items: [
      {
        id: 'euv_1',
        name: 'One EUV (單台 EUV 曝光機)',
        sizeSqM: 58,
        unitLabel: '58 m² (約 13m × 4.5m)',
        desc: '單台 ASML EUV 極紫外光微影設備主體投影佔地約 58 平方公尺，高度超過三層樓，需精密防震基座支撐。'
      },
      {
        id: 'euv_fab18',
        name: 'Total EUV (60–80) in Fab 18',
        sizeSqM: 4060,
        unitLabel: '4,060 m² (以 70 台均值計，約 10 座籃球場)',
        desc: '依據 Taiwan as a Macro-City 研究統計，南科 Fab 18 單一巨型晶圓廠即部署 60 至 80 台 EUV 機群，機台本體投影總面積達 3,480–4,640 m²。'
      }
    ]
  },
  {
    id: 'single_floorplate',
    category: '單一功能樓地板',
    subtitle: '單期潔淨室單元與自動化晶圓天車傳輸層',
    items: [
      {
        id: 'oht_logistics',
        name: 'OHT 自動化天車與晶圓傳送走廊',
        sizeSqM: 12000,
        unitLabel: '12,000 m²',
        desc: '跨廠區連通無塵室頂部之空中走行式無人搬運車 (OHT) 軌道系統樓地板，實現 24 小時不間斷晶圓盒傳送。'
      },
      {
        id: 'single_phase_cleanroom',
        name: '單期無塵室功能樓地板 (Single Phase Cleanroom)',
        sizeSqM: 40000,
        unitLabel: '40,000 m² (單期潔淨室模組)',
        desc: 'Fab 18 單一建廠期別 (Phase) 的無塵室功能樓地板面積約 4 萬平方公尺，維持 Class 1 級超低微粒潔淨標準。'
      }
    ]
  },
  {
    id: 'single_machine_offsite',
    category: '廠外單機綠電足跡',
    subtitle: '單台 EUV 運作所需之離廠水電基礎設施空間',
    items: [
      {
        id: 'euv_water_footprint',
        name: 'Water (單台 EUV 集水與再生水循環足跡)',
        sizeSqM: 3500,
        unitLabel: '3,500 m² (折算廠外純水與再生水設施佔地)',
        desc: 'Fab 18 每滴水平均循環利用 3.5 次；單台 EUV 及配套濕式清洗製程日均耗水約 1,200–1,500 噸，需對應約 3,500 m² 廠外水處理與再生水設施面積。'
      },
      {
        id: 'euv_electricity_footprint',
        name: 'Electricity (單台 EUV 離廠太陽光電陣列足跡)',
        sizeSqM: 15000,
        unitLabel: '15,000 m² (1.5 公頃太陽能光電板)',
        desc: '單台 EUV 系統滿載運轉功耗約 1.0–1.2 MW，以台灣年均日照發電效率折算，需約 1.5 公頃 (15,000 m²) 廠外太陽能光電面積支撐。'
      }
    ]
  },
  {
    id: 'main_fab_building',
    category: '主廠房建築面積',
    subtitle: 'Taiwan as a Macro-City：Cleanroom 與 2 倍面積之 Sub-Fab 結構',
    items: [
      {
        id: 'cleanroom_space',
        name: 'Cleanroom Space (全廠連通無塵室總面積)',
        sizeSqM: 160000,
        unitLabel: '160,000 m² (約 25 座標準足球場)',
        desc: 'Fab 18A 與 18B 跨期連通的無塵室總樓地板面積達 160,000 平方公尺，為全球規模最大的先進邏輯製程潔淨室群。'
      },
      {
        id: 'subfab_space',
        name: 'Sub-Fab Space (下層廠務 MEP 支援建築面積)',
        sizeSqM: 320000,
        unitLabel: '320,000 m² (無塵室面積之 2 倍)',
        desc: '依據 Taiwan as a Macro-City 建築剖析，無塵室正下方的 Sub-Fab 樓層容納真空泵、極紫外光雷射源、特氣與純水 MEP 管線，總面積為無塵室的 2 倍（全廠主建築總室內樓地板達 410,669 m² 以上）。'
      }
    ]
  },
  {
    id: 'total_campus_daan',
    category: '全廠園區基地面積',
    subtitle: '以台北市大安森林公園 (25.9 公頃) 為尺度基準',
    items: [
      {
        id: 'daan_forest_park',
        name: '大安森林公園 (1.0 基準單位)',
        sizeSqM: 259000,
        unitLabel: '259,000 m² (25.9 公頃 = 1.0 單位)',
        desc: '以台北市中心大安森林公園（25.9 公頃）作為標準都市空間尺度單位。'
      },
      {
        id: 'fab18_core_site',
        name: 'TSMC Fab 18 核心廠區基地 (1.62 座大安森林公園)',
        sizeSqM: 420000,
        unitLabel: '420,000 m² (42 公頃 ≈ 1.62 座大安森林公園)',
        desc: 'Fab 18 核心廠房建廠基地佔地 42 公頃（約 1.62 座大安森林公園）；若計入全八期擴建與配套專區，總園區範圍接近 100 公頃（約 3.86 座大安森林公園）。'
      }
    ]
  },
  {
    id: 'fleet_green_power',
    category: '廠外機群綠電足跡',
    subtitle: '單台 EUV 與 Fab 18 全機群太陽能光電板總面積比較',
    items: [
      {
        id: 'single_euv_solar',
        name: '一台 EUV 所需的太陽能板面積',
        sizeSqM: 15000,
        unitLabel: '15,000 m² (1.5 公頃)',
        desc: '單台 EUV 曝光機穩定運轉所需的離廠太陽能光電鋪設面積（約 2.1 座足球場）。'
      },
      {
        id: 'fleet_70_euv_solar',
        name: 'Fab 18 全廠 70 台 EUV 機群所需太陽能板總面積',
        sizeSqM: 1050000,
        unitLabel: '1,050,000 m² (105 公頃 ≈ 4.05 座大安森林公園)',
        desc: '僅計算 Fab 18 廠內 70 台 EUV 機群的直接電力需求，即需在廠外鋪設高達 105 公頃（超過 4 座大安森林公園）的太陽能光電板，揭示晶片製造對全島國土與綠能空間的巨量需求。'
      }
    ]
  }
];
