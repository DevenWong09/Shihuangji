/**
 * 拾荒记：撤离 — 完整可玩 Demo
 * 拾荒 → 卖钱 → 购买 → 登记 → 第7天撤离
 */

const GAME = {
  totalDays: 7,
  slotsPerDay: 3,
  slotNames: { morning: "上午", afternoon: "下午", night: "夜晚" },
};

/* ========== 物品目录 ========== */
const ITEMS = {
  empty_bottle: { id: "empty_bottle", name: "空瓶", category: "sellable", sellPrice: 3, desc: "昨天是饮料，今天是财政收入。" },
  cardboard: { id: "cardboard", name: "压扁纸箱", category: "sellable", sellPrice: 5 },
  scrap_metal: { id: "scrap_metal", name: "废金属", category: "sellable", sellPrice: 15 },
  copper_wire: { id: "copper_wire", name: "铜线", category: "sellable", sellPrice: 30 },
  old_clothes: { id: "old_clothes", name: "旧衣物", category: "sellable", sellPrice: 20 },
  foreign_coins: { id: "foreign_coins", name: "外币零钱", category: "sellable", sellPrice: 40 },
  old_phone: { id: "old_phone", name: "旧手机", category: "sellable", sellPrice: 80 },
  broken_radio: { id: "broken_radio", name: "破收音机", category: "sellable", sellPrice: 70 },
  power_bank: { id: "power_bank", name: "完好充电宝", category: "sellable", sellPrice: 120 },
  designer_shades: { id: "designer_shades", name: "名牌墨镜", category: "sellable", sellPrice: 180 },
  sealed_souvenir: { id: "sealed_souvenir", name: "未拆封纪念品", category: "sellable", sellPrice: 160 },
  old_camera: { id: "old_camera", name: "旧相机", category: "sellable", sellPrice: 260 },
  tool_box: { id: "tool_box", name: "小型工具箱", category: "sellable", sellPrice: 200, toolBonus: true },

  half_water: { id: "half_water", name: "半瓶水", category: "survival", usable: true, desc: "喝掉半瓶。" },
  bottled_water: { id: "bottled_water", name: "瓶装水", category: "survival", buyPrice: 30, usable: true },
  cracker: { id: "cracker", name: "饼干", category: "survival", buyPrice: 25, usable: true },
  instant_noodles: { id: "instant_noodles", name: "泡面", category: "survival", buyPrice: 50, usable: true, hotFood: true },
  canned_food: { id: "canned_food", name: "罐头", category: "survival", buyPrice: 100, usable: true, hotFood: true },
  bandage: { id: "bandage", name: "绷带", category: "survival", buyPrice: 80, usable: true },
  raincoat: { id: "raincoat", name: "雨衣", category: "survival", buyPrice: 100, usable: true, equipRain: true },
  crushed_cracker: { id: "crushed_cracker", name: "压碎饼干", category: "survival", usable: true },
  big_water: { id: "big_water", name: "大瓶水", category: "survival", usable: true },

  room_card: { id: "room_card", name: "房卡", category: "lodging", lodging: true },
  hostel_key_tag: { id: "hostel_key_tag", name: "旅舍钥匙牌", category: "lodging", lodging: true },
  old_ledger_page: { id: "old_ledger_page", name: "旧账本页", category: "lodging", lodging: true },
  checkin_slip: { id: "checkin_slip", name: "入住单残页", category: "lodging", lodging: true },
  front_photo: { id: "front_photo", name: "前台照片", category: "lodging", lodging: true },

  temp_form: { id: "temp_form", name: "临时登记表", category: "task", task: true },
  inventory_list: { id: "inventory_list", name: "物资清点单", category: "task", task: true },
  radio_battery: { id: "radio_battery", name: "对讲机电池", category: "task", task: true, desc: "便利店后仓的旧电池组，可以作为应急电源。" },
  emergency_battery: { id: "emergency_battery", name: "应急电池组", category: "task", task: true, buyPrice: 700 },
  driver_manifest: { id: "driver_manifest", name: "司机物资清单", category: "task", task: true, countsForMaterial: true },
  evac_notice: { id: "evac_notice", name: "撤离通知残页", category: "task", clue: true },

  gloves: { id: "gloves", name: "手套", category: "tool", buyPrice: 120, toolBonus: true },
  flashlight: { id: "flashlight", name: "手电筒", category: "tool", buyPrice: 150, toolBonus: true },
  tape: { id: "tape", name: "胶带", category: "tool", buyPrice: 80, toolBonus: true },
  battery: { id: "battery", name: "电池", category: "tool", buyPrice: 100, toolBonus: true },
  old_map: { id: "old_map", name: "旧地图", category: "tool", unlockAlley: true },
  old_charger: { id: "old_charger", name: "旧充电线", category: "tool", toolBonus: true },
  cat_food_can: { id: "cat_food_can", name: "猫罐头", category: "survival", usable: true, forCat: true },

  // 港口（port）新物品 — Day 2 mini-event 解锁
  sealed_package: { id: "sealed_package", name: "密封包裹", category: "sellable", sellPrice: 60, desc: "防水袋里的好货，能卖个好价。" },
  rope_coil: { id: "rope_coil", name: "船缆", category: "sellable", sellPrice: 35, desc: "老化的船用缆绳。" },
  bottle_liquor: { id: "bottle_liquor", name: "瓶装酒", category: "survival", usable: true, sellPrice: 40, desc: "烈酒，喝掉能提神。" },
  driftwood: { id: "driftwood", name: "浮木", category: "tool", toolBonus: true, sellPrice: 20, desc: "硬度还行，撬东西够用。" },
  fish_hook: { id: "fish_hook", name: "鱼钩", category: "tool", toolBonus: true, sellPrice: 30, desc: "老张送的，垂钓/探索都能用。" },
  old_ship_bell: { id: "old_ship_bell", name: "旧船钟", category: "task", storyFragment: true, desc: "老张的船钟，敲一下能听到河的声音。" },
  dried_fish: { id: "dried_fish", name: "鱼干", category: "survival", usable: true, desc: "老张晾的鱼干，咸香，扛饿。" },

  // 天台 / 市府广场（rooftop / city_square）新物品 — Day 4 mini-event 解锁
  half_cigarettes: { id: "half_cigarettes", name: "半包烟", category: "survival", usable: true, desc: "范老师递的半包烟，sanity+1。" },
  bird_egg: { id: "bird_egg", name: "鸟蛋", category: "survival", usable: true, desc: "天台鸽巢里的蛋，食物+1。" },
  old_tools: { id: "old_tools", name: "旧工具", category: "tool", toolBonus: true, sellPrice: 25, desc: "天台杂物间留下的扳手。" },
  rooftop_photo: { id: "rooftop_photo", name: "天台老照片", category: "task", storyFragment: true, desc: "天台杂物箱底的一卷旧胶片，曝光多年。" },
  camera_lens: { id: "camera_lens", name: "胶片镜头", category: "task", storyFragment: true, desc: "范老师落在广场的镜头，光圈还亮。" },
  scattered_film: { id: "scattered_film", name: "散落胶片", category: "task", storyFragment: true, desc: "广场喷泉池里捞出来的胶片，泡烂了一半。" },
  broken_glass: { id: "broken_glass", name: "碎玻璃", category: "sellable", sellPrice: 5, desc: "广场雕塑底座的玻璃碎片，扎手。" },
  fountain_coin: { id: "fountain_coin", name: "喷泉硬币", category: "sellable", sellPrice: 8, desc: "旧版硬币，印着上一个十年的日期。" },

  // 临时救援点（rescue_tent）新物品 — Day 3 mini-event 解锁
  old_kit: { id: "old_kit", name: "旧急救包", category: "survival", usable: true, sellPrice: 30, desc: "红十字剩下的急救包，用了健康+2。" },
  disinfectant: { id: "disinfectant", name: "消毒水", category: "tool", toolBonus: true, sellPrice: 30, desc: "医疗探索用，擦拭可减少伤口感染。" },
  redcross_badge: { id: "redcross_badge", name: "红十字徽章", category: "task", storyFragment: true, desc: "小陈给你的徽章，背面写着她老家的地址。" },

  // 港口（port）新物品 — Day 2 mini-event 解锁
  sealed_package: { id: "sealed_package", name: "密封包裹", category: "sellable", sellPrice: 60, desc: "防水袋里的好货，能卖个好价。" },
  rope_coil: { id: "rope_coil", name: "船缆", category: "sellable", sellPrice: 35, desc: "老化的船用缆绳。" },
  bottle_liquor: { id: "bottle_liquor", name: "瓶装酒", category: "survival", usable: true, sellPrice: 40, desc: "烈酒，喝掉能提神。" },
  driftwood: { id: "driftwood", name: "浮木", category: "tool", toolBonus: true, sellPrice: 20, desc: "硬度还行，撬东西够用。" },
  fish_hook: { id: "fish_hook", name: "鱼钩", category: "tool", toolBonus: true, sellPrice: 30, desc: "老张送的，垂钓/探索都能用。" },
  old_ship_bell: { id: "old_ship_bell", name: "旧船钟", category: "task", storyFragment: true, desc: "老张的船钟，敲一下能听到河的声音。" },
  dried_fish: { id: "dried_fish", name: "鱼干", category: "survival", usable: true, desc: "老张晾的鱼干，咸香，扛饿。" },

  cash_pouch: { id: "cash_pouch", name: "零钱袋", category: "sellable", sellPrice: 35, moneyLoot: 35 },
  small_cash: { id: "small_cash", name: "小包现金", category: "sellable", sellPrice: 0, moneyLoot: 80 },
  discount_coupon: { id: "discount_coupon", name: "折价券", category: "sellable", sellPrice: 25 },
  suitcase: { id: "suitcase", name: "行李箱", category: "sellable", sellPrice: 90 },
  travel_kit: { id: "travel_kit", name: "旅行洗漱包", category: "sellable", sellPrice: 55 },
  coin_roll: { id: "coin_roll", name: "一卷硬币", category: "sellable", sellPrice: 25 },
  id_clue_note: { id: "id_clue_note", name: "遗失证件线索条", category: "task", clue: true },
};

const TRADER_BUY = [
  "half_water", "bottled_water", "cracker", "instant_noodles", "canned_food",
  "bandage", "raincoat", "gloves", "flashlight", "tape", "battery",
  "emergency_battery",
];

const INV_TABS = [
  { id: "survival", label: "生存物资" },
  { id: "sellable", label: "可卖废品" },
  { id: "task", label: "任务物资" },
  { id: "lodging", label: "住宿线索" },
  { id: "tool", label: "工具" },
];

const ENDINGS = {
  official: { title: "正式撤离", art: "🚐" },
  buy_ticket: { title: "买票上车", art: "💵" },
  material: { title: "物资抵扣", art: "📦" },
  trader_vouch: { title: "交易者作保", art: "🤝" },
  fisherman_vouch: { title: "老张作保", art: "⛵" },
  volunteer_vouch: { title: "小陈作保", art: "➕" },
  city_photos: { title: "城市最后影像", art: "📷" },
  alley: { title: "后巷撤离", art: "🐈" },
  rich: { title: "拾荒暴富", art: "🤑" },
  outside: { title: "名单之外", art: "🌧️" },
  hospital: { title: "虚弱送医", art: "🏥" },
  death: { title: "倒在旅舍", art: "💤" },
};

/* ========== 状态 ========== */
let state = null;
let rollAnimInterval = null;
let rollAnimTimeout = null;
let ui = {
  screen: "intro",
  view: "map",
  selectedLoc: null,
  invTab: "survival",
  pendingRoll: null,
  rollDone: false,
  eventText: "",
  endingId: null,
  introIndex: 0,
  toast: null,
  registryDialogue: false,
  rollOutcome: null,
  traderPanel: "hub",
  expandedLocDetail: null,
  rollingDisplay: null,
};

function createState() {
  return {
    day: 1,
    timeSlot: "morning",
    weather: "cloudy",
    food: 6,
    water: 6,
    health: 7,
    clarity: 5,
    money: 100,
    inventory: {},
    registrationProgress: 0,
    traderTrust: 0,
    fishermanTrust: 0,
    photographerTrust: 0,
    volunteerTrust: 0,
    catTrust: 0,
    trashSearchCount: 0,
    tradeCount: 0,
    actionsLeft: 3,
    failsToday: 0,
    hotMealToday: false,
    taskDoneToday: false,
    visitCount: {},
    flags: {
      metCat: false,
      tempApplication: false,
      lodgingVerified: false,
      evacPass: false,
      hasRaincoat: false,
      traderCreditUsed: false,
      stoleFromTrader: false,
      registrySceneDone: false,
      registryTraderTip: false,
      revealedStage2: false,
      revealedStage3: false,
      traderIntroDone: false,
      waterQuestAvailable: false,
      waterQuestDone: false,
      waterQuestSpotted: false,
      waterBuyDiscount: false,
      alleyUnlocked: false,
      catAtAlley: false,
      fairTradeCount: 0,
      trustFromFair5: false,
      trustFromFair10: false,
      trustFromPaidWarehouse: false,
      portUnlocked: false,
      miniEventSeen: {},
      fishermanVouchUnlocked: false,
      rooftopUnlocked: false,
      citySquareUnlocked: false,
      photographerVouchUnlocked: false,
      cityPhotosUnlocked: false,
      rescueTentUnlocked: false,
      volunteerVouchUnlocked: false,
    },
    logs: [],
    unlocked: {
      inn: true,
      hostel_trash: true,
      front_bin: true,
      laundry: true,
      registry: true,
      trader: false,
      dump: false,
      back_warehouse: false,
      port: false,
      rooftop: false,
      city_square: false,
      rescue_tent: false,
      tour_bus: false,
      alley: false,
    },
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function addLog(text, type = "系统") {
  state.logs.unshift(`[第${state.day}日 ${GAME.slotNames[state.timeSlot]}｜${type}] ${text}`);
  state.logs = state.logs.slice(0, 30);
}

/** 按登记进度同步地点可见性（仅呈现层，不改探索掉落逻辑） */
function syncUnlocks() {
  state.unlocked.inn = true;
  state.unlocked.hostel_trash = true;
  state.unlocked.front_bin = true;
  state.unlocked.laundry = true;
  state.unlocked.registry = true;
  state.unlocked.trader = state.flags.registrySceneDone;
  state.unlocked.dump = state.registrationProgress >= 1;
  state.unlocked.tour_bus = true;  // 默认解锁，unlockDay 由 isLocationUnlocked 处理
  state.unlocked.back_warehouse = state.registrationProgress >= 2;
  state.unlocked.alley =
    state.catTrust >= 2 || countItem("old_map") > 0 || state.flags.alleyUnlocked;
  state.unlocked.port = state.day >= 2 || state.flags.portUnlocked;
  state.unlocked.rooftop = state.day >= 4 || state.flags.rooftopUnlocked;
  state.unlocked.city_square = state.day >= 4 || state.flags.citySquareUnlocked;
  state.unlocked.rescue_tent = state.day >= 3 || state.flags.rescueTentUnlocked;
}

function knowsRegStage(n) {
  if (n === 1) return state.flags.registrySceneDone;
  if (n === 2) return state.flags.revealedStage2;
  if (n === 3) return state.flags.revealedStage3;
  return false;
}

const TRADER_BUY_BASIC = [
  "half_water", "bottled_water", "cracker", "instant_noodles", "canned_food", "bandage", "gloves",
];
const TRADER_BUY_MID = ["raincoat", "tape", "battery", "flashlight"];
const TRADER_BUY_LATE = ["emergency_battery"];

function getTraderBuyIds() {
  if (!state.flags.registrySceneDone) return [];
  const ids = [...TRADER_BUY_BASIC];
  if (state.registrationProgress >= 1) ids.push(...TRADER_BUY_MID);
  if (state.flags.revealedStage3 || state.registrationProgress >= 2) ids.push(...TRADER_BUY_LATE);
  return ids;
}

function countItem(id) {
  return state.inventory[id] || 0;
}

function addItem(id, qty = 1) {
  if (!ITEMS[id]) return;
  state.inventory[id] = (state.inventory[id] || 0) + qty;
}

function removeItem(id, qty = 1) {
  if (!state.inventory[id]) return false;
  state.inventory[id] -= qty;
  if (state.inventory[id] <= 0) delete state.inventory[id];
  return true;
}

const LODGING_ITEM_IDS = [
  "room_card",
  "hostel_key_tag",
  "old_ledger_page",
  "checkin_slip",
  "front_photo",
];

const REG_STAGE3_OPTIONS = [
  { id: "money", label: "1000 金钱（一次性缴纳）" },
  { id: "battery", label: "应急电池组 ×2" },
  { id: "water_stat", label: "饮水储备数值 ≥20" },
  { id: "food_stat", label: "食物储备数值 ≥20" },
];

function formatRegStage3OptionsList() {
  return REG_STAGE3_OPTIONS.map((o) => `· ${o.label}`).join("\n");
}

function countLodgingClues() {
  return LODGING_ITEM_IDS.reduce((n, id) => n + countItem(id), 0);
}

function hasLodgingClue() {
  return countLodgingClues() >= 2;
}

function consumeLodgingClues(qty) {
  let left = qty;
  for (const id of LODGING_ITEM_IDS) {
    while (left > 0 && countItem(id) > 0) {
      removeItem(id, 1);
      left--;
    }
    if (left <= 0) break;
  }
}

function hasToolBonus() {
  return ["tool_box", "gloves", "flashlight", "tape", "battery", "old_charger"].some(
    (id) => countItem(id) > 0
  );
}

function getTraderPriceMultiplier() {
  let m = 1;
  if (state.traderTrust >= 2) m = 0.9;
  if (state.traderTrust <= -2) m = 1.2;
  return m;
}

function bumpTraderTrust(delta, reason) {
  if (!delta) return false;
  const before = state.traderTrust;
  state.traderTrust = clamp(state.traderTrust + delta, -5, 10);
  if (state.traderTrust !== before && reason) {
    addLog(`${reason}（信任 ${before}→${state.traderTrust}）`, "交易");
  }
  return state.traderTrust !== before;
}

/** 公平买卖累计；与搬水委托并列的常规信任来源 */
function onFairTrade() {
  if (state.traderTrust >= 4) return;
  state.flags.fairTradeCount = (state.flags.fairTradeCount || 0) + 1;
  const n = state.flags.fairTradeCount;
  if (n >= 5 && !state.flags.trustFromFair5) {
    state.flags.trustFromFair5 = true;
    bumpTraderTrust(1, "交易者：「常来卖货的，价钱好商量。」");
  } else if (n >= 10 && !state.flags.trustFromFair10) {
    state.flags.trustFromFair10 = true;
    bumpTraderTrust(1, "交易者记住了你，态度松了些");
  }
}

function maybeTrustFromHaggle(roll) {
  if (roll.tier !== "high" && roll.tier !== "crit") return;
  if (state.traderTrust >= 4) return;
  if (Math.random() < 0.28) {
    bumpTraderTrust(1, "交易者被你说动，顺手给了面子");
  }
}

function getSellPrice(itemId) {
  const item = ITEMS[itemId];
  if (!item?.sellPrice) return 0;
  return Math.round(item.sellPrice * getTraderPriceMultiplier());
}

function getBuyPrice(itemId) {
  const item = ITEMS[itemId];
  if (!item?.buyPrice) return null;
  return Math.round(item.buyPrice * getTraderPriceMultiplier());
}

/* ========== D20 ========== */
function collectRollModifiers(context) {
  const mods = [];
  let total = 0;

  if (hasToolBonus()) {
    mods.push({ label: "工具", value: 1 });
    total += 1;
  }
  if (state.clarity >= 8) {
    mods.push({ label: "清醒", value: 1 });
    total += 1;
  } else if (state.clarity <= 2) {
    mods.push({ label: "昏沉", value: -1 });
    total -= 1;
  }
  if (state.health <= 2) {
    mods.push({ label: "虚弱", value: -2 });
    total -= 2;
  }
  if (context.night) {
    mods.push({ label: "夜晚", value: -2 });
    total -= 2;
  }
  if (state.weather === "storm" && !state.flags.hasRaincoat) {
    mods.push({ label: "暴雨", value: -2 });
    total -= 2;
  }
  const visits = state.visitCount[context.locId] || 0;
  if (visits >= 2) {
    mods.push({ label: "熟悉地点", value: 1 });
    total += 1;
  }
  if (context.bargain) {
    mods.push({ label: "讨价还价", value: 0 });
  }

  return { mods, total };
}

function rollD20(context = {}) {
  const raw = Math.floor(Math.random() * 20) + 1;
  const { mods, total: modTotal } = collectRollModifiers(context);
  // 不再 clamp 上限 20：modifiers 突破 20 仍可触发 crit tier
  const final = Math.max(1, raw + modTotal);

  let tier, tierLabel;
  if (final <= 3) {
    tier = "crit_fail";
    tierLabel = "大失败";
  } else if (final <= 7) {
    tier = "fail";
    tierLabel = "失败";
  } else if (final <= 11) {
    tier = "low";
    tierLabel = "小收获";
  } else if (final <= 15) {
    tier = "mid";
    tierLabel = "普通收获";
  } else if (final <= 18) {
    tier = "high";
    tierLabel = "好收获";
  } else {
    tier = "crit";
    tierLabel = "大收获";
  }

  return { raw, mods, modTotal, final, tier, tierLabel };
}

function tierClass(tier) {
  if (tier === "crit_fail") return "tier-crit-fail";
  if (tier === "fail") return "tier-fail";
  if (tier === "crit") return "tier-crit";
  if (tier === "high") return "tier-high";
  if (tier === "mid") return "tier-mid";
  if (tier === "low") return "tier-low";
  return "tier-ok";
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function loseRandomSellable() {
  const sellables = Object.keys(state.inventory).filter((id) => ITEMS[id]?.category === "sellable");
  if (!sellables.length) return null;
  const id = pickRandom(sellables);
  removeItem(id, 1);
  return ITEMS[id].name;
}

/* ========== 探索掉落 ========== */
/** 唯一物品：已有则替换为普通掉落 */
const UNIQUE_LOOT_IDS = new Set([
  "temp_form",
  "inventory_list",
  "driver_manifest",
  "evac_notice",
  "room_card",
  "hostel_key_tag",
  "old_ledger_page",
  "checkin_slip",
  "front_photo",
  "old_map",
]);

/** 后期任务物资：仅阶段 3 开放拾荒掉落 */
const LATE_TASK_LOOT_IDS = new Set([
  "temp_form",
  "inventory_list",
  "radio_battery",
  "emergency_battery",
  "driver_manifest",
]);

const FALLBACK_BY_LOC = {
  hostel_trash: ["empty_bottle", "cardboard", "half_water", "cracker", "foreign_coins"],
  front_bin: ["foreign_coins", "cardboard", "coin_roll", "old_clothes"],
  laundry: ["foreign_coins", "old_clothes", "coin_roll", "empty_bottle"],
  inn: ["empty_bottle", "cardboard", "cracker", "foreign_coins"],
  dump: ["scrap_metal", "cardboard", "copper_wire"],
  tour_bus: ["old_clothes", "foreign_coins", "sealed_souvenir"],
  alley: ["scrap_metal", "cardboard", "battery"],
  back_warehouse: ["tape", "battery", "canned_food"],
};

function getLootPhase() {
  if (!state.flags.registrySceneDone) return 0;
  if (state.registrationProgress === 0) return 1;
  if (state.registrationProgress === 1) return 2;
  return 3;
}

function isItemAllowedInPhase(itemId, phase) {
  if (!ITEMS[itemId]) return false;
  if (itemId === "temp_form") return false;
  if (LATE_TASK_LOOT_IDS.has(itemId)) return phase >= 3;
  if (itemId === "evac_notice") return phase >= 2;
  const LODGING_IDS = new Set([
    "room_card",
    "hostel_key_tag",
    "old_ledger_page",
    "checkin_slip",
    "front_photo",
  ]);

  if (phase === 0) {
    const earlyOk = new Set([
      "empty_bottle",
      "cardboard",
      "scrap_metal",
      "old_clothes",
      "half_water",
      "cracker",
      "crushed_cracker",
      "foreign_coins",
      "coin_roll",
      "cash_pouch",
      "small_cash",
      "cat_food_can",
    ]);
    if (LODGING_IDS.has(itemId)) return false;
    return earlyOk.has(itemId);
  }
  if (phase === 1) {
    if (LATE_TASK_LOOT_IDS.has(itemId) || itemId === "evac_notice") return false;
    if (LODGING_IDS.has(itemId)) return false;
    return true;
  }
  if (phase === 2) {
    if (LATE_TASK_LOOT_IDS.has(itemId)) return false;
    if (LODGING_IDS.has(itemId) && countLodgingClues() >= 2) return false;
    return true;
  }
  if (phase >= 3) {
    if (LODGING_IDS.has(itemId)) return false;
    if (itemId === "evac_notice") return false;
    return true;
  }
  return true;
}

function pickFallbackLoot(locId) {
  const pool = [...(FALLBACK_BY_LOC[locId] || FALLBACK_BY_LOC.hostel_trash)];
  const phase = getLootPhase();
  for (let i = 0; i < 12; i++) {
    const id = pickRandom(pool);
    if (isItemAllowedInPhase(id, phase) && (!UNIQUE_LOOT_IDS.has(id) || countItem(id) === 0)) {
      return id;
    }
  }
  return "empty_bottle";
}

function resolveLootItem(itemId, locId) {
  if (!itemId || !ITEMS[itemId]) return null;
  let id = itemId;
  const phase = getLootPhase();

  if (!isItemAllowedInPhase(id, phase)) {
    id = pickFallbackLoot(locId);
  }
  if (UNIQUE_LOOT_IDS.has(id) && countItem(id) > 0) {
    id = pickFallbackLoot(locId);
  }
  if (LODGING_ITEM_IDS.includes(id) && countLodgingClues() >= 2) {
    id = pickFallbackLoot(locId);
  }
  if (!isItemAllowedInPhase(id, phase)) {
    id = pickFallbackLoot(locId);
  }
  return id;
}

function grantItemLoot(itemId, qty, lines, locId) {
  const id = resolveLootItem(itemId, locId);
  if (!id) return;
  const item = ITEMS[id];
  const n = qty || 1;
  if (item.moneyLoot) {
    const amt = item.moneyLoot * n;
    state.money += amt;
    lines.push(`金钱 +${amt}`);
    return;
  }
  addItem(id, n);
  lines.push(`${item.name}${n > 1 ? ` ×${n}` : ""}`);
}

function grantMoney(amount, lines) {
  if (!amount) return;
  state.money += amount;
  lines.push(`金钱 +${amount}`);
}

function grantLoot(entries, lines, locId = "unknown") {
  entries.forEach((e) => {
    if (e.money) {
      state.money += e.money;
      lines.push(`金钱 +${e.money}`);
    } else if (e.id) {
      grantItemLoot(e.id, e.qty || 1, lines, locId);
    }
  });
}

function pickLoot(pool, locId) {
  return resolveLootItem(pickRandom(pool), locId);
}

function exploreInnRoom(roll) {
  const locId = "inn";
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.clarity = clamp(state.clarity - 1, 0, 10);
    lines.push("一无所获，清醒度 -1");
    return lines;
  }
  if (roll.tier === "fail") {
    lines.push("一无所获");
    return lines;
  }
  if (roll.tier === "low") {
    if (Math.random() < 0.45) {
      grantMoney(pickRandom([3, 5, 8]), lines);
    } else {
      grantItemLoot(pickLoot(["empty_bottle", "cardboard"], locId), 1, lines, locId);
    }
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["crushed_cracker", "old_clothes", "coin_roll"], locId), 1, lines, locId);
    if (Math.random() < 0.08) {
      grantItemLoot(pickLoot(["old_ledger_page", "checkin_slip"], locId), 1, lines, locId);
    }
  } else {
    grantItemLoot(pickLoot(["foreign_coins", "old_clothes", "cardboard"], locId), 1, lines, locId);
    grantMoney(pickRandom([8, 12, 18]), lines);
    if (Math.random() < 0.12) {
      grantItemLoot(pickLoot(["hostel_key_tag", "front_photo"], locId), 1, lines, locId);
    }
  }
  return lines;
}

function exploreHostelTrash(roll) {
  const locId = "hostel_trash";
  const phase = getLootPhase();
  const lines = [];
  if (!state.flags.metCat) {
    state.flags.metCat = true;
    lines.push("一只猫蹲在桶边，看了你一眼，没有跑开。");
  }
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    lines.push("碎玻璃划破手指，健康 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("一无所获，清醒度 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["empty_bottle", "cardboard", "half_water"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["cracker", "foreign_coins", "half_water", "cat_food_can"], locId), 1, lines, locId);
    if (Math.random() < 0.4) {
      grantItemLoot(pickLoot(["empty_bottle", "cardboard"], locId), 1, lines, locId);
    }
    if (Math.random() < 0.05) {
      grantItemLoot("id_clue_note", 1, lines, locId);
    }
  } else if (roll.tier === "high") {
    const highPool =
      phase >= 1
        ? ["old_phone", "cat_food_can", "old_clothes", "power_bank"]
        : ["cat_food_can", "old_clothes", "cracker"];
    grantItemLoot(pickLoot(highPool, locId), 1, lines, locId);
  } else {
    if (Math.random() < 0.45) {
      grantItemLoot(pickLoot(["power_bank", "old_phone"], locId), 1, lines, locId);
    } else {
      grantMoney(pickRandom([25, 40, 55]), lines);
    }
  }
  state.trashSearchCount++;
  return lines;
}

function exploreFrontBin(roll) {
  const locId = "front_bin";
  const phase = getLootPhase();
  const lines = [];
  if (roll.tier === "crit_fail") {
    const lost = loseRandomSellable();
    if (lost) lines.push(`废纸吸潮，${lost} 报废了`);
    state.clarity -= 1;
    lines.push("清醒度 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("只有碎纸条，清醒度 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["foreign_coins", "cardboard", "coin_roll"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    if (phase >= 2) {
      grantItemLoot(pickLoot(["old_ledger_page", "checkin_slip"], locId), 1, lines, locId);
    } else if (phase === 1 && Math.random() < 0.22) {
      grantItemLoot(pickLoot(["old_ledger_page", "checkin_slip"], locId), 1, lines, locId);
    } else {
      grantItemLoot(pickLoot(["foreign_coins", "cardboard"], locId), 1, lines, locId);
    }
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["room_card", "hostel_key_tag"], locId), 1, lines, locId);
  } else {
    grantItemLoot(pickLoot(["old_ledger_page", "checkin_slip"], locId), 1, lines, locId);
    grantMoney(pickRandom([15, 25, 35]), lines);
    if (phase >= 2 && countItem("front_photo") === 0) {
      grantItemLoot("front_photo", 1, lines, locId);
    }
    if (phase >= 2 && countItem("evac_notice") === 0 && Math.random() < 0.1) {
      grantItemLoot("evac_notice", 1, lines, locId);
      addLog("你拼起残页，确认撤离日期就是第七日傍晚。", "登记");
    }
  }
  state.trashSearchCount++;
  return lines;
}

function exploreLaundryLocker(roll) {
  const locId = "laundry";
  const phase = getLootPhase();
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    lines.push("柜门弹回撞到手，健康 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("一无所获，清醒度 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["old_clothes", "broken_radio"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(
      pickLoot(["old_phone", "designer_shades", "broken_radio", "power_bank"], locId),
      1,
      lines,
      locId
    );
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["power_bank", "broken_radio", "small_cash"], locId), 1, lines, locId);
    if (phase >= 2 && countItem("room_card") === 0 && Math.random() < 0.08) {
      grantItemLoot("room_card", 1, lines, locId);
    }
  } else {
    grantItemLoot(pickLoot(["designer_shades", "old_phone"], locId), 1, lines, locId);
    grantMoney(pickRandom([35, 50, 65]), lines);
  }
  state.trashSearchCount++;
  return lines;
}

function exploreLaundryDryer(roll) {
  const locId = "laundry";
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.clarity -= 1;
    lines.push("滚筒里只有绒毛和潮气，清醒度 -1");
  } else if (roll.tier === "fail") {
    lines.push("一无所获");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["coin_roll", "foreign_coins", "empty_bottle"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["old_clothes", "cardboard", "foreign_coins"], locId), 1, lines, locId);
    grantMoney(pickRandom([8, 15, 22]), lines);
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["coin_roll", "old_clothes"], locId), 1, lines, locId);
    grantMoney(pickRandom([18, 28]), lines);
  } else {
    grantItemLoot(pickLoot(["empty_bottle", "cardboard", "cracker"], locId), 1, lines, locId);
    grantMoney(pickRandom([10, 18]), lines);
  }
  state.trashSearchCount++;
  return lines;
}

function exploreLaundry(roll, actionId) {
  if (actionId === "search_dryer") return exploreLaundryDryer(roll);
  return exploreLaundryLocker(roll);
}

function exploreDump(roll) {
  const locId = "dump";
  const phase = getLootPhase();
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    const lost = loseRandomSellable();
    if (lost) lines.push(`被尖锐物划伤，${lost} 丢了`);
    else lines.push("被尖锐物划伤，健康 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    state.health -= 1;
    lines.push("被锈铁划伤，清醒 -1，健康 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["scrap_metal", "cardboard"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["copper_wire", "broken_radio", "scrap_metal"], locId), 1, lines, locId);
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["power_bank", "tool_box", "old_camera"], locId), 1, lines, locId);
  } else {
    grantItemLoot(pickLoot(["old_camera", "tool_box", "power_bank"], locId), 1, lines, locId);
    if (phase >= 3 && countItem("inventory_list") === 0 && Math.random() < 0.3) {
      grantItemLoot("inventory_list", 1, lines, locId);
    }
    if (phase >= 3 && Math.random() < 0.25) {
      grantItemLoot(pickLoot(["emergency_battery"], locId), 1, lines, locId);
    }
  }
  state.trashSearchCount++;
  return lines;
}

function exploreBus(roll) {
  const locId = "tour_bus";
  const phase = getLootPhase();
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    const lost = loseRandomSellable();
    if (lost) lines.push(`行李箱砸落，${lost} 丢了`);
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    state.health -= 1;
    lines.push("车顶铁皮割伤手臂，清醒 -1，健康 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["old_clothes", "cardboard"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["sealed_souvenir", "suitcase"], locId), 1, lines, locId);
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["old_camera", "designer_shades"], locId), 1, lines, locId);
    if (countItem("old_map") === 0 && Math.random() < 0.25) {
      grantItemLoot("old_map", 1, lines, locId);
    }
  } else {
    if (phase >= 3 && countItem("driver_manifest") === 0) {
      grantItemLoot("driver_manifest", 1, lines, locId);
    } else {
      grantItemLoot(pickLoot(["old_camera", "sealed_souvenir"], locId), 1, lines, locId);
    }
    grantMoney(pickRandom([70, 90, 110]), lines);
  }
  state.trashSearchCount++;
  return lines;
}

function exploreAlley(roll) {
  const locId = "alley";
  const phase = getLootPhase();
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    state.traderTrust -= 1;
    lines.push("被卷帘门拦住，健康 -1，交易者信任 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("一无所获，清醒度 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["copper_wire", "tape", "battery"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["power_bank", "canned_food", "big_water"], locId), 1, lines, locId);
  } else if (roll.tier === "high") {
    if (phase >= 3) {
      grantItemLoot(pickLoot(["emergency_battery", "canned_food", "big_water"], locId), 1, lines, locId);
    } else {
      grantItemLoot(pickLoot(["copper_wire", "power_bank", "canned_food"], locId), 1, lines, locId);
    }
  } else {
    if (phase >= 3) {
      if (countItem("inventory_list") === 0 && Math.random() < 0.35) {
        grantItemLoot("inventory_list", 1, lines, locId);
      } else {
        grantItemLoot(pickLoot(["emergency_battery", "canned_food", "big_water"], locId), 1, lines, locId);
      }
    } else {
      grantItemLoot(pickLoot(["power_bank", "big_water", "canned_food"], locId), 1, lines, locId);
    }
    lines.push("猫在棚顶打了个盹，这里值得常来");
  }
  state.trashSearchCount++;
  return lines;
}

function exploreBackWarehouse(roll, forced) {
  const locId = "back_warehouse";
  const phase = getLootPhase();
  const lines = [];
  const isForced = forced === true || forced === "force_warehouse";
  if (isForced) {
    if (roll.tier === "crit_fail") {
      state.health -= 1;
      state.clarity -= 1;
      state.traderTrust = clamp(state.traderTrust - 3, -5, 10);
      const lost = loseRandomSellable();
      lines.push("警报响起，你被交易者堵在后门");
      lines.push("健康 -1，清醒 -1，交易者信任 -3");
      if (lost) lines.push(`${lost} 落在泥水里，没能带走`);
    } else if (roll.tier === "fail") {
      state.clarity -= 1;
      state.traderTrust = clamp(state.traderTrust - 2, -5, 10);
      lines.push("你翻窗逃出，手里什么也没有");
      lines.push("清醒 -1，交易者信任 -2");
    } else {
      grantItemLoot(pickLoot(["canned_food", "big_water", "tape"], locId), 1, lines, locId);
      state.traderTrust = clamp(state.traderTrust - 2, -5, 10);
      lines.push("捞到一点物资，但监控拍到了你");
      lines.push("交易者信任 -2");
    }
    return lines;
  }
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    state.traderTrust = clamp(state.traderTrust - 1, -5, 10);
    lines.push("健康 -1，交易者信任 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("一无所获，清醒 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["cardboard", "tape"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["big_water", "battery", "instant_noodles", "emergency_battery", "radio_battery"], locId), 1, lines, locId);
  } else if (phase >= 3) {
    grantItemLoot(pickLoot(["canned_food", "tape", "emergency_battery"], locId), 1, lines, locId);
  } else {
    grantItemLoot(pickLoot(["canned_food", "tape", "big_water"], locId), 1, lines, locId);
  }
  return lines;
}

// ===== 港口：晨雾桥墩 + 老渔船 + 沉货（Day 2+ 解锁）=====
function explorePort(roll) {
  const locId = "port";
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    lines.push("脚底打滑，差点落水，健康 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("河水太浑，看不清沉货，清醒 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["rope_coil", "driftwood", "cardboard"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["sealed_package", "fish_hook", "rope_coil"], locId), 1, lines, locId);
    if (Math.random() < 0.4) {
      grantMoney(pickRandom([10, 15, 22]), lines);
    }
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["bottle_liquor", "sealed_package", "fish_hook"], locId), 1, lines, locId);
    if (countItem("old_ship_bell") === 0) {
      grantItemLoot("old_ship_bell", 1, lines, locId);
      addLog("你摸到一只冰凉的铜钟。老张说这是他爹留下的。", "地点");
    }
  } else {
    grantItemLoot(pickLoot(["sealed_package", "bottle_liquor"], locId), 1, lines, locId);
    grantMoney(pickRandom([40, 60, 80]), lines);
    if (countItem("dried_fish") === 0) {
      grantItemLoot("dried_fish", 1, lines, locId);
      addLog("你从老张的船舱里顺手拿了条鱼干。", "地点");
    }
  }
  state.trashSearchCount++;
  return lines;
}

// ===== 旧旅舍天台：水箱 + 鸽巢 + 工具箱（Day 4+ 解锁）=====
function exploreRooftop(roll) {
  const locId = "rooftop";
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.clarity -= 1;
    lines.push("起雾了，看不清街道，清醒 -1");
  } else if (roll.tier === "fail") {
    lines.push("水箱后面没什么");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["old_tools", "cardboard"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["half_cigarettes", "old_tools"], locId), 1, lines, locId);
    if (Math.random() < 0.18) {
      grantItemLoot("bird_egg", 1, lines, locId);
    }
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["half_cigarettes", "old_tools"], locId), 1, lines, locId);
    if (countItem("rooftop_photo") === 0) {
      grantItemLoot("rooftop_photo", 1, lines, locId);
      addLog("你从天台杂物箱底翻出一卷老胶片。曝光过度但还能看见轮廓。", "地点");
    }
  } else {
    grantItemLoot(pickLoot(["half_cigarettes", "bird_egg"], locId), 1, lines, locId);
    grantMoney(pickRandom([25, 40, 55]), lines);
    if (countItem("rooftop_photo") === 0) {
      grantItemLoot("rooftop_photo", 1, lines, locId);
      addLog("你从天台杂物箱底翻出一卷老胶片。曝光过度但还能看见轮廓。", "地点");
    }
  }
  state.trashSearchCount++;
  return lines;
}

// ===== 市府广场：雕塑底座 + 喷泉池 + 碎玻璃（Day 4+ 解锁，high risk）=====
function exploreCitySquare(roll) {
  const locId = "city_square";
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    lines.push("踩到碎玻璃，割破脚底，健康 -1");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    lines.push("广场空了太久，清醒 -1");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["broken_glass", "cardboard"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["fountain_coin", "broken_glass"], locId), 1, lines, locId);
    grantMoney(pickRandom([8, 12, 18]), lines);
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["fountain_coin", "broken_glass", "scattered_film"], locId), 1, lines, locId);
    if (countItem("camera_lens") === 0 && Math.random() < 0.35) {
      grantItemLoot("camera_lens", 1, lines, locId);
      addLog("你在喷泉池边找到了范老师的镜头。镜面碎了一半，但光圈还能用。", "地点");
    }
  } else {
    grantItemLoot(pickLoot(["fountain_coin", "scattered_film"], locId), 1, lines, locId);
    grantMoney(pickRandom([20, 35, 50]), lines);
    if (countItem("camera_lens") === 0) {
      grantItemLoot("camera_lens", 1, lines, locId);
      addLog("你在喷泉池边找到了范老师的镜头。镜面碎了一半，但光圈还能用。", "地点");
    }
  }
  state.trashSearchCount++;
  return lines;
}

// ===== 临时救援点：红十字帐篷 + 药品箱 + 志愿者（Day 3+ 解锁）=====
function exploreRescueTent(roll) {
  const locId = "rescue_tent";
  const lines = [];
  if (roll.tier === "crit_fail") {
    state.clarity -= 1;
    lines.push("药品堆里有些过期批号，看得头疼，清醒 -1");
  } else if (roll.tier === "fail") {
    lines.push("小陈让你别乱翻");
  } else if (roll.tier === "low") {
    grantItemLoot(pickLoot(["bandage", "cardboard"], locId), 1, lines, locId);
  } else if (roll.tier === "mid") {
    grantItemLoot(pickLoot(["bandage", "disinfectant", "canned_food"], locId), 1, lines, locId);
  } else if (roll.tier === "high") {
    grantItemLoot(pickLoot(["old_kit", "disinfectant", "canned_food"], locId), 1, lines, locId);
  } else {
    grantItemLoot(pickLoot(["old_kit", "disinfectant"], locId), 1, lines, locId);
    if (countItem("redcross_badge") === 0) {
      grantItemLoot("redcross_badge", 1, lines, locId);
      addLog("小陈摘下自己的红十字徽章递给你：「我们暂时用不上这个。」", "地点");
    }
  }
  state.trashSearchCount++;
  return lines;
}

function startVolunteerQuest() {
  if (state.actionsLeft <= 0) {
    ui.eventText = "本时段行动已用完。";
    render();
    return;
  }
  useAction();
  const roll = rollD20({ locId: "rescue_tent", night: state.timeSlot === "night" });
  ui.rollContext = { type: "volunteer_quest", locId: "rescue_tent" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = "小陈把一箱散落的药品推到你面前：「帮我按标签分一下。不急，但别贴错。」";
  startRollAnimation();
}

function applyVolunteerQuest(roll) {
  if (roll.tier === "crit_fail") {
    state.clarity -= 1;
    ui.eventText = "标签糊在一起，你分错了三盒。小陈没说什么，叹了口气。清醒 -1。";
    addLog("帮小陈分拣药品失败。", "地点");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    ui.eventText = "你分拣了一半，剩下的小陈自己来。清醒 -1。";
    addLog("帮小陈分拣药品只完成一半。", "地点");
  } else {
    let trustGain = 0;
    let kit = 0;
    if (roll.tier === "crit" || roll.tier === "high") {
      trustGain = 2;
      kit = 2;
      ui.eventText = "你按字母把药品排好，绷带归绷带、消毒水归消毒水。小陈笑了：「你做过这行？留个旧急救包应急。」\n\n小陈信任 +2，旧急救包 ×2。";
    } else {
      trustGain = 1;
      kit = 1;
      ui.eventText = "你安静地分好了一整箱。小陈递过来一个旧急救包：「用得上。」\n\n小陈信任 +1，旧急救包 ×1。";
    }
    state.volunteerTrust = clamp(state.volunteerTrust + trustGain, 0, 5);
    addItem("old_kit", kit);
    addLog(`帮小陈分拣药品，信任 +${trustGain}，旧急救包 ×${kit}。`, "地点");
  }
  if (state.volunteerTrust >= 3) {
    state.flags.volunteerVouchUnlocked = true;
  }
}

const LOCATIONS = {
  inn: {
    id: "inn",
    name: "旧旅舍房间",
    desc: "床垫发潮，窗外雨声不断。能歇脚，也能在房间里翻翻抽屉和床底。",
    customRoll: true,
    explore: exploreInnRoom,
    actions: [
      { id: "rest", label: "休息一会", roll: false },
      { id: "search_room", label: "翻找房间", roll: true },
    ],
  },
  hostel_trash: {
    id: "hostel_trash",
    name: "旅舍垃圾桶",
    desc: "门口的桶，常有空瓶和过夜客扔下的吃的。",
    explore: exploreHostelTrash,
    roll: true,
    customRoll: true,
  },
  front_bin: {
    id: "front_bin",
    name: "前台废纸篓",
    desc: "前台桌下的废纸篓，纸屑里常夹着登记用的碎单子和房卡。",
    explore: exploreFrontBin,
    roll: true,
    customRoll: true,
  },
  laundry: {
    id: "laundry",
    name: "洗衣房",
    desc: "蒸汽味和洗衣粉味混在一起，失物柜和烘干机里总有点别人落下的东西。",
    explore: exploreLaundry,
    roll: true,
    customRoll: true,
    actions: [
      { id: "search_locker", label: "搜索失物柜", roll: true },
      { id: "search_dryer", label: "翻找烘干机", roll: true },
    ],
  },
  registry: {
    id: "registry",
    name: "登记处",
    desc: "排队补登名字的地方，柜台后屏幕一直亮着。",
    npc: "registrar",
  },
  trader: {
    id: "trader",
    name: "交易小店",
    desc: "卖掉垃圾，买回生活。",
    npc: "trader",
  },
  dump: {
    id: "dump",
    name: "垃圾集中点",
    desc: "成堆的金属和电器外壳，味道冲，也容易划破手。",
    explore: exploreDump,
    roll: true,
    customRoll: true,
    highRisk: true,
  },
  back_warehouse: {
    id: "back_warehouse",
    name: "便利店后仓",
    desc: "交易小店后面的货架区，老板盯得紧。",
    explore: exploreBackWarehouse,
    roll: true,
    customRoll: true,
    highRisk: true,
  },
  tour_bus: {
    id: "tour_bus",
    name: "旧游客巴士",
    desc: "停在路边的旧巴士，行李和纪念品还散落在座位上。",
    explore: exploreBus,
    roll: true,
    customRoll: true,
    highRisk: true,
    unlockDay: 4,
  },
  alley: {
    id: "alley",
    name: "后巷回收棚",
    desc: "回收棚和猫常出没的后巷，能翻到工具和囤货的纸箱。",
    explore: exploreAlley,
    roll: true,
    customRoll: true,
    highRisk: true,
  },
  port: {
    id: "port",
    name: "港口",
    desc: "桥墩下的老渡口。潮水涨到船舷，老张的渔船歪歪地系在木桩上。",
    explore: explorePort,
    roll: true,
    customRoll: true,
    npc: "fisherman",
    unlockDay: 2,
  },
  rooftop: {
    id: "rooftop",
    name: "旧旅舍天台",
    desc: "楼顶的锁被人撬开过。锁链松了，水箱嗡嗡地响。能看半座城。",
    explore: exploreRooftop,
    roll: true,
    customRoll: true,
    npc: "photographer",
    unlockDay: 4,
  },
  city_square: {
    id: "city_square",
    name: "市府广场",
    desc: "广场中央的喷泉干了，雕塑底座周围散着几块碎玻璃。",
    explore: exploreCitySquare,
    roll: true,
    customRoll: true,
    highRisk: true,
    unlockDay: 4,
  },
  rescue_tent: {
    id: "rescue_tent",
    name: "临时救援点",
    desc: "街角的红色帐篷。里面堆着医疗物资，志愿者在整理药品箱。",
    explore: exploreRescueTent,
    roll: true,
    customRoll: true,
    npc: "volunteer",
    unlockDay: 3,
  },
};

// ===== Mini-Event 系统 =====
// 每天首次 advanceTimeSlot 切到下一天时，触发当日 mini-event
// 每个 event 可选 "去看看" → 引导到目标地点 / 触发 NPC
// 玩家可 "忽略" → 跳过但错过支线
const MINI_EVENTS = {
  day2_port: {
    id: "day2_port",
    title: "Day 2 · 桥墩下的中年人",
    narrative: "早晨你走到桥头，看见一个晒得黝黑的中年人蹲在桥墩下抽闷烟。河水涨到他的船舷。\n\n「船还有点油，要不去下游捞点沉货？我自己搬不动那些浮木。」\n\n他指了指港口方向。",
    targetLoc: "port",
    skipHint: "你转身走了，老张的烟头在水雾里亮了一下。",
  },
  day3_rescue: {
    id: "day3_rescue",
    title: "Day 3 · 红十字帐篷",
    narrative: "街角拐弯处多了一顶红帐篷。一个戴眼镜的女孩从药品箱后面抬起头：「你是还活着的居民？」\n\n「药品分拣人手不够。你能来帮一下吗？十分钟就行。」\n\n她指了指帐篷里的红十字。",
    targetLoc: "rescue_tent",
    skipHint: "你绕过红帐篷继续走。里面的手电筒亮了一夜。",
  },
  day4_rooftop: {
    id: "day4_rooftop",
    title: "Day 4 · 楼顶的胶片机",
    narrative: "你顺着楼顶的旧梯子爬上天台。一个戴鸭舌帽的中年人正对着一台老式胶片机调光圈。\n\n「我想拍下这座城市最后的样子。」他把烟头按灭，「**我镜头落在市府广场**，你能帮我取吗？」\n\n他递过来半包烟。",
    targetLoc: "rooftop",
    skipHint: "你下了楼。楼顶的快门声隔了很久才响。",
  },
};

function tryTriggerMiniEvent() {
  // Day 2 → port | Day 3 → rescue_tent | Day 4 → rooftop + city_square
  const dayToLoc = { 2: "port", 3: "rescue", 4: "rooftop" };
  const locKey = dayToLoc[state.day];
  if (!locKey) return;
  const evt = MINI_EVENTS[`day${state.day}_${locKey}`];
  if (!evt) return;
  if (state.flags.miniEventSeen[evt.id]) return;
  state.flags.miniEventSeen[evt.id] = true;
  if (evt.id === "day2_port") {
    state.flags.portUnlocked = true;
  } else if (evt.id === "day3_rescue") {
    state.flags.rescueTentUnlocked = true;
  } else if (evt.id === "day4_rooftop") {
    state.flags.rooftopUnlocked = true;
    state.flags.citySquareUnlocked = true;
  }
  syncUnlocks();
  ui.miniEvent = evt;
}

function dismissMiniEvent() {
  if (ui.miniEvent) {
    const evt = ui.miniEvent;
    ui.eventText = evt.skipHint;
    addLog(`你跳过了「${evt.title}」`, "系统");
  }
  ui.miniEvent = null;
  render();
}

function acceptMiniEvent() {
  const evt = ui.miniEvent;
  if (!evt) return;
  ui.miniEvent = null;
  ui.selectedLoc = evt.targetLoc;
  ui.eventText = `你朝「${LOCATIONS[evt.targetLoc].name}」走去。`;
  render();
}

function isLocationUnlocked(locId) {
  syncUnlocks();
  const loc = LOCATIONS[locId];
  if (!state.unlocked[locId]) return false;
  if (loc.unlockDay && state.day < loc.unlockDay) return false;
  if (locId === "back_warehouse") {
    return state.traderTrust >= 2 || state.flags.paidWarehouse || state.registrationProgress >= 2;
  }
  return true;
}

// ===== 地点缩略图（手绘暗调 SVG，240×140）=====
// 风格：低饱和 / 蓝灰暗色 / 一点暖光 / 雨痕水渍
// 每个图描绘该地点的核心物件与氛围
const LOC_SVG = {
  // 旧旅舍房间：发潮床垫 + 旧行李 + 窗外雨光
  inn: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="inn-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/>
      </linearGradient>
      <linearGradient id="inn-bed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a6e54"/><stop offset="1" stop-color="#4a4232"/>
      </linearGradient>
    </defs>
    <rect width="240" height="140" fill="url(#inn-bg)"/>
    <!-- 窗外雨光（右上） -->
    <rect x="140" y="10" width="60" height="40" fill="#5a7480" opacity="0.5"/>
    <rect x="140" y="10" width="60" height="40" fill="none" stroke="#8a8270" stroke-width="1.5"/>
    <line x1="170" y1="10" x2="160" y2="50" stroke="#7a8896" stroke-width="0.8" opacity="0.5"/>
    <line x1="180" y1="10" x2="172" y2="50" stroke="#7a8896" stroke-width="0.8" opacity="0.5"/>
    <line x1="190" y1="10" x2="184" y2="50" stroke="#7a8896" stroke-width="0.8" opacity="0.5"/>
    <!-- 床 -->
    <rect x="20" y="80" width="140" height="40" fill="url(#inn-bed)"/>
    <rect x="20" y="78" width="140" height="6" fill="#8a7a60"/>
    <rect x="20" y="80" width="140" height="3" fill="#a89878" opacity="0.6"/>
    <!-- 枕头 -->
    <rect x="28" y="86" width="28" height="14" fill="#c8b890" rx="2"/>
    <rect x="28" y="86" width="28" height="3" fill="#d8c8a0"/>
    <!-- 旧行李箱（床边） -->
    <rect x="170" y="90" width="50" height="30" fill="#5a4030" rx="2"/>
    <rect x="170" y="90" width="50" height="5" fill="#7a5840"/>
    <rect x="190" y="86" width="10" height="4" fill="#5a4030"/>
    <line x1="170" y1="100" x2="220" y2="100" stroke="#3a2818" stroke-width="0.8"/>
    <line x1="170" y1="110" x2="220" y2="110" stroke="#3a2818" stroke-width="0.8"/>
    <!-- 地板 -->
    <rect x="0" y="120" width="240" height="20" fill="#1a1410"/>
    <line x1="40" y1="120" x2="40" y2="140" stroke="#0a0805" stroke-width="0.6"/>
    <line x1="100" y1="120" x2="100" y2="140" stroke="#0a0805" stroke-width="0.6"/>
    <line x1="160" y1="120" x2="160" y2="140" stroke="#0a0805" stroke-width="0.6"/>
    <line x1="220" y1="120" x2="220" y2="140" stroke="#0a0805" stroke-width="0.6"/>
    <!-- 暖光（床头灯） -->
    <circle cx="180" cy="76" r="4" fill="#b08a4a" opacity="0.6"/>
    <circle cx="180" cy="76" r="2" fill="#d8a060"/>
    <!-- 雨痕 -->
    <line x1="50" y1="20" x2="48" y2="50" stroke="#6a7480" stroke-width="0.4" opacity="0.4"/>
    <line x1="70" y1="15" x2="68" y2="45" stroke="#6a7480" stroke-width="0.4" opacity="0.4"/>
  </svg>`,

  // 旅舍垃圾桶：塑料桶 + 雨地
  hostel_trash: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ht-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#ht-bg)"/>
    <!-- 门口墙（门框） -->
    <rect x="0" y="0" width="60" height="140" fill="#2a2620"/>
    <rect x="50" y="0" width="10" height="140" fill="#4a4030"/>
    <!-- 垃圾桶（铁皮） -->
    <ellipse cx="140" cy="78" rx="36" ry="8" fill="#3a3a3a"/>
    <rect x="104" y="78" width="72" height="46" fill="#5a5a5a"/>
    <ellipse cx="140" cy="124" rx="36" ry="6" fill="#1a1a1a"/>
    <rect x="104" y="78" width="72" height="4" fill="#7a7a7a" opacity="0.6"/>
    <line x1="110" y1="84" x2="106" y2="120" stroke="#3a3a3a" stroke-width="0.6"/>
    <line x1="170" y1="84" x2="174" y2="120" stroke="#3a3a3a" stroke-width="0.6"/>
    <!-- 桶上袋（透明塑料袋） -->
    <path d="M110 78 Q140 60 170 78" fill="none" stroke="#a8a8a0" stroke-width="0.6" opacity="0.5"/>
    <!-- 雨地（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
    <line x1="40" y1="128" x2="60" y2="130" stroke="#3a5258" stroke-width="0.4" opacity="0.5"/>
    <line x1="180" y1="130" x2="200" y2="128" stroke="#3a5258" stroke-width="0.4" opacity="0.5"/>
    <!-- 门内暖灯（黄色） -->
    <circle cx="30" cy="50" r="3" fill="#b08a4a" opacity="0.7"/>
  </svg>`,

  // 前台废纸篓：木桌 + 废纸篓 + 登记本
  front_bin: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="fb-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#fb-bg)"/>
    <!-- 桌面（木） -->
    <rect x="0" y="60" width="240" height="6" fill="#6a5238"/>
    <rect x="0" y="60" width="240" height="2" fill="#8a6e4a"/>
    <rect x="0" y="64" width="240" height="2" fill="#3a2818" opacity="0.6"/>
    <!-- 桌腿阴影 -->
    <rect x="0" y="66" width="240" height="74" fill="#1a1a18"/>
    <!-- 桌上：登记本 + 笔 + 杯子 -->
    <rect x="40" y="50" width="40" height="10" fill="#c8b078"/>
    <rect x="40" y="50" width="40" height="2" fill="#e8d098"/>
    <line x1="44" y1="55" x2="76" y2="55" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="44" y1="57" x2="76" y2="57" stroke="#3a2818" stroke-width="0.4"/>
    <rect x="180" y="52" width="8" height="8" fill="#5a4a3a"/>
    <rect x="180" y="52" width="8" height="2" fill="#8a7a5a"/>
    <line x1="184" y1="60" x2="184" y2="65" stroke="#3a2818" stroke-width="0.6"/>
    <!-- 废纸篓（地面） -->
    <ellipse cx="60" cy="118" rx="22" ry="4" fill="#1a1610"/>
    <rect x="38" y="90" width="44" height="28" fill="#3a3a3a"/>
    <ellipse cx="60" cy="90" rx="22" ry="5" fill="#5a5a5a"/>
    <ellipse cx="60" cy="90" rx="18" ry="3" fill="#1a1a1a"/>
    <!-- 纸屑（溢出） -->
    <rect x="42" y="86" width="6" height="4" fill="#d8c8a0" transform="rotate(-15 45 88)"/>
    <rect x="56" y="84" width="5" height="3" fill="#c8b890" transform="rotate(8 58 86)"/>
    <rect x="70" y="85" width="4" height="3" fill="#d8c8a0" transform="rotate(20 72 87)"/>
    <!-- 墙上公告 -->
    <rect x="100" y="20" width="80" height="35" fill="#c8b890"/>
    <rect x="100" y="20" width="80" height="3" fill="#a8985a"/>
    <line x1="106" y1="28" x2="174" y2="28" stroke="#3a2818" stroke-width="0.6"/>
    <line x1="106" y1="33" x2="160" y2="33" stroke="#3a2818" stroke-width="0.5"/>
    <line x1="106" y1="38" x2="170" y2="38" stroke="#3a2818" stroke-width="0.5"/>
    <line x1="106" y1="43" x2="155" y2="43" stroke="#3a2818" stroke-width="0.5"/>
    <line x1="106" y1="48" x2="168" y2="48" stroke="#3a2818" stroke-width="0.5"/>
    <!-- 印章（红） -->
    <circle cx="170" cy="46" r="6" fill="none" stroke="#8a4a3c" stroke-width="1.2"/>
    <text x="170" y="49" font-family="serif" font-size="6" fill="#8a4a3c" text-anchor="middle">已</text>
    <!-- 地板（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
  </svg>`,

  // 洗衣房：旧洗衣机 + 蒸汽 + 失物柜
  laundry: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="la-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#la-bg)"/>
    <!-- 蒸汽（顶部模糊） -->
    <ellipse cx="80" cy="30" rx="35" ry="12" fill="#5a6a78" opacity="0.25"/>
    <ellipse cx="170" cy="25" rx="30" ry="10" fill="#5a6a78" opacity="0.2"/>
    <!-- 旧洗衣机 -->
    <rect x="30" y="50" width="80" height="70" fill="#4a4a4a"/>
    <rect x="30" y="50" width="80" height="6" fill="#6a6a6a"/>
    <rect x="30" y="50" width="80" height="2" fill="#8a8a8a"/>
    <!-- 圆窗 -->
    <circle cx="70" cy="88" r="22" fill="#1a1a1a"/>
    <circle cx="70" cy="88" r="20" fill="#3a4248"/>
    <circle cx="70" cy="88" r="20" fill="none" stroke="#6a6a6a" stroke-width="1.5"/>
    <circle cx="70" cy="88" r="14" fill="#1a1a1a"/>
    <circle cx="70" cy="88" r="14" fill="none" stroke="#5a5a5a" stroke-width="0.6"/>
    <!-- 旋钮 -->
    <circle cx="98" cy="60" r="3" fill="#3a3a3a"/>
    <circle cx="98" cy="60" r="3" fill="none" stroke="#8a8a8a" stroke-width="0.5"/>
    <!-- 失物柜（右侧） -->
    <rect x="140" y="40" width="80" height="80" fill="#3a3a3a"/>
    <rect x="140" y="40" width="80" height="6" fill="#5a5a5a"/>
    <line x1="140" y1="80" x2="220" y2="80" stroke="#5a5a5a" stroke-width="0.6"/>
    <line x1="180" y1="40" x2="180" y2="120" stroke="#5a5a5a" stroke-width="0.6"/>
    <!-- 柜门把手 -->
    <circle cx="155" cy="60" r="1.5" fill="#8a8a8a"/>
    <circle cx="195" cy="60" r="1.5" fill="#8a8a8a"/>
    <circle cx="155" cy="100" r="1.5" fill="#8a8a8a"/>
    <circle cx="195" cy="100" r="1.5" fill="#8a8a8a"/>
    <!-- 柜内阴影（深） -->
    <rect x="143" y="50" width="34" height="28" fill="#1a1a1a"/>
    <rect x="183" y="50" width="34" height="28" fill="#1a1a1a"/>
    <rect x="143" y="90" width="34" height="28" fill="#1a1a1a"/>
    <rect x="183" y="90" width="34" height="28" fill="#1a1a1a"/>
    <!-- 地面（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
    <!-- 暖光（顶部） -->
    <circle cx="60" cy="20" r="6" fill="#b08a4a" opacity="0.3"/>
    <circle cx="60" cy="20" r="3" fill="#d8a060"/>
  </svg>`,

  // 登记处：临时桌 + 排队栏杆 + 公告纸 + 旧电脑
  registry: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="rg-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#rg-bg)"/>
    <!-- 屏幕光（青灰） -->
    <rect x="60" y="40" width="100" height="50" fill="#3a5258"/>
    <rect x="60" y="40" width="100" height="3" fill="#5a7480"/>
    <!-- 屏幕文字（模糊横线） -->
    <line x1="68" y1="50" x2="120" y2="50" stroke="#8aa8b0" stroke-width="0.6"/>
    <line x1="68" y1="55" x2="100" y2="55" stroke="#8aa8b0" stroke-width="0.6"/>
    <line x1="68" y1="60" x2="140" y2="60" stroke="#8aa8b0" stroke-width="0.6"/>
    <line x1="68" y1="65" x2="90" y2="65" stroke="#8aa8b0" stroke-width="0.6"/>
    <line x1="68" y1="75" x2="130" y2="75" stroke="#8aa8b0" stroke-width="0.6"/>
    <!-- 屏幕边框 -->
    <rect x="60" y="40" width="100" height="50" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <!-- 桌子 -->
    <rect x="40" y="90" width="140" height="6" fill="#5a4030"/>
    <rect x="40" y="90" width="140" height="2" fill="#7a5840"/>
    <rect x="40" y="94" width="140" height="2" fill="#3a2818" opacity="0.5"/>
    <!-- 桌腿 -->
    <rect x="48" y="96" width="6" height="32" fill="#3a2818"/>
    <rect x="166" y="96" width="6" height="32" fill="#3a2818"/>
    <!-- 排队栏杆（不锈钢） -->
    <rect x="180" y="80" width="40" height="4" fill="#6a6a6a"/>
    <rect x="180" y="78" width="40" height="2" fill="#8a8a8a"/>
    <rect x="180" y="84" width="4" height="30" fill="#5a5a5a"/>
    <rect x="216" y="84" width="4" height="30" fill="#5a5a5a"/>
    <rect x="184" y="90" width="32" height="2" fill="#6a6a6a"/>
    <line x1="195" y1="90" x2="200" y2="114" stroke="#3a3a3a" stroke-width="0.4"/>
    <!-- 公告栏（左侧） -->
    <rect x="6" y="20" width="44" height="55" fill="#3a2a18"/>
    <rect x="10" y="24" width="36" height="48" fill="#c8b890"/>
    <line x1="14" y1="32" x2="42" y2="32" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="37" x2="36" y2="37" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="42" x2="40" y2="42" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="47" x2="32" y2="47" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="52" x2="38" y2="52" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="57" x2="34" y2="57" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="62" x2="40" y2="62" stroke="#3a2818" stroke-width="0.4"/>
    <line x1="14" y1="67" x2="28" y2="67" stroke="#3a2818" stroke-width="0.4"/>
    <!-- 印章（红） -->
    <rect x="32" y="50" width="12" height="10" fill="none" stroke="#8a4a3c" stroke-width="0.8"/>
    <text x="38" y="58" font-family="serif" font-size="5" fill="#8a4a3c" text-anchor="middle">急</text>
    <!-- 地面（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
    <!-- 暖光（顶部灯） -->
    <circle cx="120" cy="20" r="4" fill="#b08a4a" opacity="0.4"/>
  </svg>`,

  // 交易小店：半开卷帘门 + 暖灯 + 货架阴影
  trader: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tr-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient>
      <radialGradient id="tr-warm" cx="50%" cy="40%" r="40%"><stop offset="0" stop-color="#b08a4a" stop-opacity="0.4"/><stop offset="1" stop-color="#b08a4a" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="240" height="140" fill="url(#tr-bg)"/>
    <!-- 卷帘门（左半关） -->
    <rect x="0" y="0" width="140" height="100" fill="#3a3a3a"/>
    <line x1="0" y1="10" x2="140" y2="10" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="20" x2="140" y2="20" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="30" x2="140" y2="30" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="40" x2="140" y2="40" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="50" x2="140" y2="50" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="60" x2="140" y2="60" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="70" x2="140" y2="70" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="80" x2="140" y2="80" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="90" x2="140" y2="90" stroke="#1a1a1a" stroke-width="0.6"/>
    <rect x="138" y="0" width="2" height="100" fill="#1a1a1a"/>
    <!-- 半开后的店内（右侧） -->
    <rect x="140" y="0" width="100" height="100" fill="#2a2018"/>
    <rect x="140" y="0" width="100" height="100" fill="url(#tr-warm)"/>
    <!-- 货架 -->
    <rect x="148" y="20" width="84" height="4" fill="#5a4030"/>
    <rect x="148" y="50" width="84" height="4" fill="#5a4030"/>
    <rect x="148" y="80" width="84" height="4" fill="#5a4030"/>
    <!-- 货架物品（瓶/罐/盒） -->
    <rect x="152" y="26" width="6" height="22" fill="#6a5a3a"/>
    <rect x="160" y="28" width="5" height="20" fill="#5a4a3a"/>
    <rect x="167" y="24" width="8" height="24" fill="#7a6a4a"/>
    <rect x="178" y="30" width="5" height="18" fill="#5a4a3a"/>
    <rect x="186" y="26" width="6" height="22" fill="#6a5a3a"/>
    <rect x="200" y="28" width="6" height="20" fill="#7a5a3a"/>
    <rect x="210" y="26" width="5" height="22" fill="#5a4a3a"/>
    <rect x="220" y="30" width="6" height="18" fill="#6a5a3a"/>
    <!-- 二层（罐） -->
    <ellipse cx="156" cy="56" rx="4" ry="3" fill="#7a4030"/>
    <ellipse cx="165" cy="56" rx="4" ry="3" fill="#5a3030"/>
    <ellipse cx="174" cy="56" rx="4" ry="3" fill="#7a4030"/>
    <ellipse cx="183" cy="56" rx="4" ry="3" fill="#6a3030"/>
    <ellipse cx="195" cy="56" rx="4" ry="3" fill="#7a4030"/>
    <ellipse cx="205" cy="56" rx="4" ry="3" fill="#5a3030"/>
    <ellipse cx="215" cy="56" rx="4" ry="3" fill="#6a3030"/>
    <!-- 三层（箱） -->
    <rect x="150" y="86" width="20" height="12" fill="#8a6a4a"/>
    <rect x="172" y="86" width="20" height="12" fill="#7a5a3a"/>
    <rect x="194" y="86" width="20" height="12" fill="#8a6a4a"/>
    <rect x="216" y="86" width="20" height="12" fill="#7a5a3a"/>
    <!-- 暖灯（店内顶部） -->
    <circle cx="180" cy="14" r="6" fill="#d8a060" opacity="0.7"/>
    <circle cx="180" cy="14" r="2.5" fill="#f0c890"/>
    <!-- 门框 -->
    <rect x="138" y="0" width="2" height="100" fill="#5a4030"/>
    <rect x="0" y="98" width="240" height="4" fill="#1a1a1a"/>
    <!-- 地面（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
  </svg>`,

  // 垃圾集中点：成堆金属 + 锈 + 划痕
  dump: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="du-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#du-bg)"/>
    <!-- 远景建筑（暗剪影） -->
    <rect x="0" y="40" width="40" height="60" fill="#1a1a1a"/>
    <rect x="50" y="30" width="50" height="70" fill="#1a1a1a"/>
    <rect x="200" y="50" width="40" height="50" fill="#1a1a1a"/>
    <!-- 金属堆（前） -->
    <rect x="20" y="80" width="60" height="40" fill="#5a5040"/>
    <rect x="20" y="80" width="60" height="3" fill="#7a6a50"/>
    <rect x="20" y="116" width="60" height="4" fill="#3a3020"/>
    <line x1="30" y1="80" x2="30" y2="116" stroke="#3a3020" stroke-width="0.6"/>
    <line x1="50" y1="80" x2="50" y2="116" stroke="#3a3020" stroke-width="0.6"/>
    <line x1="70" y1="80" x2="70" y2="116" stroke="#3a3020" stroke-width="0.6"/>
    <!-- 锈 -->
    <ellipse cx="35" cy="100" rx="6" ry="3" fill="#6a3a1a" opacity="0.6"/>
    <ellipse cx="55" cy="105" rx="4" ry="2" fill="#6a3a1a" opacity="0.6"/>
    <!-- 破铜线（盘） -->
    <ellipse cx="140" cy="100" rx="22" ry="6" fill="#5a4028"/>
    <ellipse cx="140" cy="100" rx="18" ry="4" fill="#7a5a3a"/>
    <ellipse cx="140" cy="100" rx="14" ry="2" fill="#5a4028"/>
    <!-- 破收音机 -->
    <rect x="100" y="86" width="50" height="30" fill="#3a2818"/>
    <rect x="100" y="86" width="50" height="4" fill="#5a4030"/>
    <circle cx="115" cy="104" r="4" fill="#1a1a1a"/>
    <circle cx="115" cy="104" r="4" fill="none" stroke="#6a5a3a" stroke-width="0.6"/>
    <circle cx="115" cy="104" r="1.5" fill="#3a3a3a"/>
    <circle cx="135" cy="104" r="4" fill="#1a1a1a"/>
    <circle cx="135" cy="104" r="4" fill="none" stroke="#6a5a3a" stroke-width="0.6"/>
    <!-- 破工具箱（右侧） -->
    <rect x="180" y="90" width="50" height="30" fill="#5a4030"/>
    <rect x="180" y="90" width="50" height="4" fill="#7a5840"/>
    <line x1="195" y1="90" x2="195" y2="120" stroke="#3a2818" stroke-width="0.6"/>
    <line x1="215" y1="90" x2="215" y2="120" stroke="#3a2818" stroke-width="0.6"/>
    <!-- 地面（脏） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
    <ellipse cx="50" cy="130" rx="15" ry="3" fill="#1a1a1a" opacity="0.6"/>
    <ellipse cx="170" cy="132" rx="20" ry="3" fill="#1a1a1a" opacity="0.6"/>
  </svg>`,

  // 小店后仓：货架 + 罐头水 + 胶带
  back_warehouse: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bw-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient>
      <radialGradient id="bw-warm" cx="50%" cy="0%" r="60%"><stop offset="0" stop-color="#b08a4a" stop-opacity="0.3"/><stop offset="1" stop-color="#b08a4a" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="240" height="140" fill="url(#bw-bg)"/>
    <rect width="240" height="140" fill="url(#bw-warm)"/>
    <!-- 货架（多层） -->
    <rect x="10" y="30" width="220" height="6" fill="#5a4030"/>
    <rect x="10" y="30" width="220" height="2" fill="#7a5840"/>
    <rect x="10" y="60" width="220" height="6" fill="#5a4030"/>
    <rect x="10" y="60" width="220" height="2" fill="#7a5840"/>
    <rect x="10" y="90" width="220" height="6" fill="#5a4030"/>
    <rect x="10" y="90" width="220" height="2" fill="#7a5840"/>
    <!-- 货架支撑 -->
    <rect x="14" y="36" width="4" height="88" fill="#3a2818"/>
    <rect x="222" y="36" width="4" height="88" fill="#3a2818"/>
    <!-- 顶层：罐头 -->
    <rect x="20" y="20" width="10" height="10" fill="#7a3030"/>
    <rect x="32" y="20" width="10" height="10" fill="#5a2820"/>
    <rect x="44" y="20" width="10" height="10" fill="#7a3030"/>
    <rect x="56" y="22" width="10" height="8" fill="#6a2820"/>
    <rect x="68" y="20" width="10" height="10" fill="#5a2820"/>
    <ellipse cx="25" cy="20" rx="5" ry="2" fill="#9a4a40"/>
    <ellipse cx="37" cy="20" rx="5" ry="2" fill="#7a3a30"/>
    <ellipse cx="49" cy="20" rx="5" ry="2" fill="#9a4a40"/>
    <ellipse cx="61" cy="22" rx="5" ry="2" fill="#8a3a30"/>
    <ellipse cx="73" cy="20" rx="5" ry="2" fill="#7a3a30"/>
    <!-- 大瓶水 -->
    <rect x="90" y="16" width="14" height="14" fill="#5a7480" opacity="0.6"/>
    <rect x="92" y="18" width="2" height="10" fill="#7a8a98" opacity="0.5"/>
    <rect x="106" y="16" width="14" height="14" fill="#4a6a78" opacity="0.6"/>
    <rect x="108" y="18" width="2" height="10" fill="#6a7a88" opacity="0.5"/>
    <rect x="122" y="16" width="14" height="14" fill="#5a7480" opacity="0.6"/>
    <!-- 电池 -->
    <rect x="140" y="22" width="6" height="8" fill="#c8a063"/>
    <rect x="148" y="22" width="6" height="8" fill="#c8a063"/>
    <rect x="156" y="22" width="6" height="8" fill="#c8a063"/>
    <rect x="164" y="22" width="6" height="8" fill="#c8a063"/>
    <rect x="172" y="22" width="6" height="8" fill="#c8a063"/>
    <!-- 胶带卷 -->
    <ellipse cx="195" cy="25" rx="8" ry="3" fill="#7a5a3a"/>
    <ellipse cx="195" cy="25" rx="4" ry="1.5" fill="#3a2818"/>
    <ellipse cx="215" cy="25" rx="8" ry="3" fill="#5a4a3a"/>
    <ellipse cx="215" cy="25" rx="4" ry="1.5" fill="#3a2818"/>
    <!-- 二层：瓶装水 + 应急 -->
    <rect x="20" y="50" width="12" height="10" fill="#5a7480" opacity="0.6"/>
    <rect x="34" y="50" width="12" height="10" fill="#5a7480" opacity="0.6"/>
    <rect x="48" y="50" width="12" height="10" fill="#4a6a78" opacity="0.6"/>
    <rect x="62" y="50" width="12" height="10" fill="#5a7480" opacity="0.6"/>
    <!-- 应急电池 -->
    <rect x="80" y="50" width="20" height="10" fill="#c8a063"/>
    <rect x="80" y="50" width="20" height="3" fill="#e8c878"/>
    <text x="90" y="58" font-family="serif" font-size="5" fill="#3a2818" text-anchor="middle">应急</text>
    <!-- 罐头 -->
    <ellipse cx="115" cy="55" rx="5" ry="2" fill="#9a4a40"/>
    <rect x="110" y="55" width="10" height="5" fill="#7a3a30"/>
    <ellipse cx="130" cy="55" rx="5" ry="2" fill="#9a4a40"/>
    <rect x="125" y="55" width="10" height="5" fill="#7a3a30"/>
    <ellipse cx="145" cy="55" rx="5" ry="2" fill="#9a4a40"/>
    <rect x="140" y="55" width="10" height="5" fill="#7a3a30"/>
    <!-- 三层：纸箱 + 杂物 -->
    <rect x="20" y="80" width="40" height="10" fill="#7a5a3a"/>
    <rect x="20" y="80" width="40" height="2" fill="#9a7a5a"/>
    <rect x="62" y="80" width="40" height="10" fill="#6a4a2a"/>
    <rect x="62" y="80" width="40" height="2" fill="#8a6a4a"/>
    <rect x="104" y="80" width="40" height="10" fill="#7a5a3a"/>
    <rect x="146" y="80" width="40" height="10" fill="#6a4a2a"/>
    <rect x="188" y="80" width="36" height="10" fill="#7a5a3a"/>
    <!-- 地面（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
  </svg>`,

  // 后巷回收棚：湿墙 + 垃圾袋 + 猫影 + 排水沟
  alley: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="al-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient></defs>
    <rect width="240" height="140" fill="url(#al-bg)"/>
    <!-- 左侧墙（湿砖） -->
    <rect x="0" y="0" width="50" height="140" fill="#2a2a2a"/>
    <line x1="0" y1="20" x2="50" y2="20" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="50" x2="50" y2="50" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="80" x2="50" y2="80" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="0" y1="110" x2="50" y2="110" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="20" y1="0" x2="20" y2="140" stroke="#1a1a1a" stroke-width="0.6"/>
    <line x1="35" y1="0" x2="35" y2="140" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 水痕 -->
    <ellipse cx="10" cy="60" rx="6" ry="20" fill="#1a1a1a" opacity="0.5"/>
    <ellipse cx="30" cy="100" rx="8" ry="15" fill="#1a1a1a" opacity="0.4"/>
    <!-- 右侧墙（回收棚） -->
    <rect x="200" y="0" width="40" height="140" fill="#2a2620"/>
    <line x1="200" y1="30" x2="240" y2="30" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="200" y1="60" x2="240" y2="60" stroke="#1a1a1a" stroke-width="0.5"/>
    <line x1="200" y1="90" x2="240" y2="90" stroke="#1a1a1a" stroke-width="0.5"/>
    <!-- 棚顶（波纹铁） -->
    <rect x="50" y="0" width="190" height="6" fill="#3a3a3a"/>
    <line x1="50" y1="0" x2="240" y2="0" stroke="#1a1a1a" stroke-width="0.6"/>
    <!-- 垃圾袋（中心堆） -->
    <ellipse cx="100" cy="100" rx="22" ry="8" fill="#1a1a1a"/>
    <ellipse cx="100" cy="90" rx="20" ry="6" fill="#2a2a2a"/>
    <ellipse cx="120" cy="105" rx="18" ry="6" fill="#1a1a1a"/>
    <ellipse cx="80" cy="108" rx="16" ry="5" fill="#2a2a2a"/>
    <!-- 纸箱 -->
    <rect x="60" y="88" width="24" height="16" fill="#6a4a2a"/>
    <rect x="60" y="88" width="24" height="3" fill="#8a6a4a"/>
    <line x1="72" y1="88" x2="72" y2="104" stroke="#3a2818" stroke-width="0.6"/>
    <!-- 排水沟（前景） -->
    <rect x="50" y="120" width="160" height="4" fill="#0a0a0a"/>
    <line x1="50" y1="120" x2="210" y2="120" stroke="#3a5258" stroke-width="0.6"/>
    <line x1="50" y1="124" x2="210" y2="124" stroke="#3a5258" stroke-width="0.6"/>
    <!-- 猫影（右侧暗处） -->
    <ellipse cx="200" cy="100" rx="8" ry="4" fill="#0a0a0a"/>
    <ellipse cx="200" cy="96" rx="4" ry="3" fill="#0a0a0a"/>
    <polygon points="197,93 199,90 198,94" fill="#0a0a0a"/>
    <polygon points="201,93 203,90 202,94" fill="#0a0a0a"/>
    <line x1="208" y1="100" x2="214" y2="98" stroke="#0a0a0a" stroke-width="0.8"/>
    <!-- 眼睛（黄绿） -->
    <circle cx="199" cy="95" r="0.6" fill="#b08a4a"/>
    <circle cx="201" cy="95" r="0.6" fill="#b08a4a"/>
    <!-- 地面（湿） -->
    <rect x="0" y="124" width="240" height="16" fill="#0e1418"/>
  </svg>`,

  // 港口：晨雾桥墩 + 老渔船 + 河水
  port: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient>
      <linearGradient id="pt-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a40"/><stop offset="1" stop-color="#10181c"/></linearGradient>
      <linearGradient id="pt-boat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2e1c"/><stop offset="1" stop-color="#1a1410"/></linearGradient>
    </defs>
    <rect width="240" height="140" fill="url(#pt-sky)"/>
    <!-- 晨雾 -->
    <ellipse cx="80" cy="40" rx="120" ry="22" fill="#5a6a78" opacity="0.28"/>
    <ellipse cx="180" cy="55" rx="100" ry="18" fill="#4a5868" opacity="0.22"/>
    <!-- 远岸建筑剪影 -->
    <rect x="160" y="35" width="14" height="22" fill="#0a1014" opacity="0.7"/>
    <rect x="178" y="40" width="10" height="17" fill="#0a1014" opacity="0.6"/>
    <rect x="192" y="32" width="18" height="25" fill="#0a1014" opacity="0.7"/>
    <rect x="214" y="38" width="12" height="19" fill="#0a1014" opacity="0.6"/>
    <!-- 远处灯（暖光） -->
    <circle cx="206" cy="42" r="0.8" fill="#b08a4a" opacity="0.85"/>
    <!-- 河水 -->
    <rect x="0" y="70" width="240" height="50" fill="url(#pt-water)"/>
    <!-- 河水反光（暗铜细线） -->
    <line x1="10" y1="80" x2="60" y2="80" stroke="#5a6a78" stroke-width="0.4" opacity="0.5"/>
    <line x1="80" y1="92" x2="140" y2="92" stroke="#5a6a78" stroke-width="0.4" opacity="0.45"/>
    <line x1="40" y1="105" x2="100" y2="105" stroke="#5a6a78" stroke-width="0.4" opacity="0.4"/>
    <line x1="150" y1="100" x2="200" y2="100" stroke="#5a6a78" stroke-width="0.4" opacity="0.45"/>
    <!-- 桥墩（左侧大块） -->
    <rect x="0" y="55" width="30" height="65" fill="#0e1418"/>
    <rect x="0" y="55" width="30" height="3" fill="#3a3a3a"/>
    <rect x="0" y="55" width="2" height="65" fill="#2a2a2a"/>
    <!-- 桥墩水面反光（暖光斑驳） -->
    <rect x="2" y="78" width="2" height="14" fill="#b08a4a" opacity="0.18"/>
    <!-- 渔船（歪斜在中央） -->
    <path d="M 70 90 L 160 92 L 150 110 L 80 108 Z" fill="url(#pt-boat)"/>
    <!-- 船舷边线 -->
    <line x1="70" y1="90" x2="160" y2="92" stroke="#5a4a2e" stroke-width="0.6"/>
    <line x1="80" y1="108" x2="150" y2="110" stroke="#2a1e10" stroke-width="0.6"/>
    <!-- 船桅 -->
    <line x1="115" y1="90" x2="115" y2="50" stroke="#1a1410" stroke-width="1.2"/>
    <line x1="115" y1="50" x2="115" y2="48" stroke="#0a0808" stroke-width="1.2"/>
    <!-- 桅上绳索（细） -->
    <line x1="115" y1="60" x2="90" y2="92" stroke="#2a2218" stroke-width="0.3"/>
    <line x1="115" y1="60" x2="150" y2="92" stroke="#2a2218" stroke-width="0.3"/>
    <!-- 浮木（散落水面） -->
    <rect x="40" y="118" width="14" height="2" fill="#3a2e1c" transform="rotate(-8 47 119)"/>
    <rect x="190" y="115" width="10" height="1.8" fill="#3a2e1c" transform="rotate(12 195 116)"/>
    <!-- 油桶（岸上） -->
    <rect x="200" y="100" width="6" height="12" fill="#2a2218" stroke="#4a3a2a" stroke-width="0.3"/>
    <ellipse cx="203" cy="100" rx="3" ry="1" fill="#3a2e1c"/>
    <!-- 钓鱼线（老张的） -->
    <line x1="165" y1="105" x2="220" y2="125" stroke="#5a6a78" stroke-width="0.3" opacity="0.6"/>
    <!-- 河面整体（湿） -->
    <rect x="0" y="115" width="240" height="25" fill="#0a1014" opacity="0.5"/>
  </svg>`,

  // 旧旅舍天台：楼顶水箱 + 鸽巢 + 城市轮廓
  rooftop: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4250"/><stop offset="1" stop-color="#1a2025"/></linearGradient>
      <linearGradient id="rt-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2620"/><stop offset="1" stop-color="#0a0808"/></linearGradient>
    </defs>
    <rect width="240" height="140" fill="url(#rt-sky)"/>
    <!-- 远景：城市剪影 -->
    <rect x="0" y="60" width="60" height="60" fill="#0a0e12"/>
    <rect x="0" y="80" width="20" height="20" fill="#0a0e12" opacity="0.8"/>
    <rect x="180" y="55" width="60" height="65" fill="#0a0e12"/>
    <rect x="180" y="75" width="20" height="20" fill="#0a0e12" opacity="0.8"/>
    <!-- 远处天际线：信号塔 -->
    <line x1="120" y1="20" x2="120" y2="60" stroke="#1a1a1a" stroke-width="0.8"/>
    <line x1="115" y1="30" x2="125" y2="30" stroke="#1a1a1a" stroke-width="0.4"/>
    <line x1="113" y1="40" x2="127" y2="40" stroke="#1a1a1a" stroke-width="0.4"/>
    <circle cx="120" cy="20" r="0.6" fill="#b08a4a" opacity="0.7"/>
    <!-- 远处灯光（暖色窗口） -->
    <rect x="20" y="100" width="2" height="3" fill="#b08a4a" opacity="0.7"/>
    <rect x="35" y="95" width="2" height="3" fill="#b08a4a" opacity="0.6"/>
    <rect x="195" y="90" width="2" height="3" fill="#b08a4a" opacity="0.7"/>
    <rect x="210" y="100" width="2" height="3" fill="#b08a4a" opacity="0.5"/>
    <!-- 天台地面（混凝土，湿） -->
    <rect x="0" y="100" width="240" height="40" fill="url(#rt-floor)"/>
    <!-- 排水沟（湿痕） -->
    <line x1="0" y1="120" x2="240" y2="120" stroke="#1a2025" stroke-width="1"/>
    <!-- 水箱（中央大块） -->
    <rect x="100" y="50" width="60" height="50" fill="#2a2620"/>
    <rect x="100" y="50" width="60" height="3" fill="#5a4a30"/>
    <rect x="100" y="50" width="60" height="1" fill="#7a6442"/>
    <rect x="100" y="100" width="60" height="2" fill="#0a0808"/>
    <!-- 水箱支架（X 形钢架） -->
    <line x1="110" y1="100" x2="120" y2="115" stroke="#1a1410" stroke-width="1"/>
    <line x1="150" y1="100" x2="140" y2="115" stroke="#1a1410" stroke-width="1"/>
    <line x1="120" y1="100" x2="110" y2="115" stroke="#1a1410" stroke-width="1"/>
    <line x1="140" y1="100" x2="150" y2="115" stroke="#1a1410" stroke-width="1"/>
    <!-- 水箱上的"Z"字锁 -->
    <rect x="128" y="58" width="4" height="8" fill="none" stroke="#3a2e1c" stroke-width="0.6"/>
    <!-- 鸽巢（左侧角落） -->
    <rect x="20" y="100" width="20" height="14" fill="#1a1612"/>
    <ellipse cx="30" cy="98" rx="6" ry="3" fill="#2a2018"/>
    <!-- 鸽子（剪影） -->
    <ellipse cx="55" cy="35" rx="3" ry="1.5" fill="#0a0a0a"/>
    <ellipse cx="60" cy="33" rx="1.5" ry="1" fill="#0a0a0a"/>
    <line x1="65" y1="35" x2="68" y2="34" stroke="#0a0a0a" stroke-width="0.4"/>
    <line x1="170" y1="40" x2="173" y2="38" stroke="#0a0a0a" stroke-width="0.4"/>
    <ellipse cx="167" cy="40" rx="2" ry="1" fill="#0a0a0a"/>
    <!-- 旧工具箱（右下） -->
    <rect x="180" y="105" width="22" height="14" fill="#3a2e1c"/>
    <rect x="180" y="105" width="22" height="2" fill="#5a4a2e"/>
    <rect x="180" y="115" width="22" height="2" fill="#1a1410"/>
    <rect x="190" y="110" width="2" height="3" fill="#1a1410"/>
    <!-- 防水布（一角卷起） -->
    <rect x="60" y="100" width="35" height="20" fill="#3a3a40" opacity="0.6"/>
    <line x1="60" y1="105" x2="95" y2="105" stroke="#5a5a60" stroke-width="0.4"/>
    <!-- 雨痕（地面） -->
    <ellipse cx="80" cy="125" rx="15" ry="2" fill="#1a2025" opacity="0.6"/>
    <ellipse cx="160" cy="128" rx="20" ry="2.5" fill="#1a2025" opacity="0.5"/>
  </svg>`,

  // 市府广场：雕塑底座 + 喷泉池 + 碎玻璃
  city_square: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sq-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3e44"/><stop offset="1" stop-color="#1a1e22"/></linearGradient>
      <linearGradient id="sq-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2e32"/><stop offset="1" stop-color="#0a0e12"/></linearGradient>
    </defs>
    <rect width="240" height="140" fill="url(#sq-sky)"/>
    <!-- 远景：政府大楼剪影 -->
    <rect x="40" y="30" width="160" height="50" fill="#0a0e12"/>
    <rect x="50" y="35" width="20" height="20" fill="#0a0e12" opacity="0.7"/>
    <rect x="80" y="35" width="20" height="20" fill="#0a0e12" opacity="0.7"/>
    <rect x="110" y="35" width="20" height="20" fill="#0a0e12" opacity="0.7"/>
    <rect x="140" y="35" width="20" height="20" fill="#0a0e12" opacity="0.7"/>
    <rect x="170" y="35" width="20" height="20" fill="#0a0e12" opacity="0.7"/>
    <!-- 屋顶装饰（中央钟楼） -->
    <rect x="115" y="20" width="10" height="12" fill="#0a0e12"/>
    <polygon points="115,20 120,15 125,20" fill="#0a0e12"/>
    <line x1="120" y1="22" x2="120" y2="30" stroke="#3a3a3a" stroke-width="0.4"/>
    <!-- 远处灯（暖光） -->
    <rect x="80" y="42" width="2" height="2" fill="#b08a4a" opacity="0.5"/>
    <rect x="140" y="42" width="2" height="2" fill="#b08a4a" opacity="0.4"/>
    <!-- 广场地面（石板路） -->
    <rect x="0" y="80" width="240" height="60" fill="url(#sq-ground)"/>
    <!-- 石板分隔线 -->
    <line x1="0" y1="95" x2="240" y2="95" stroke="#1a1e22" stroke-width="0.6"/>
    <line x1="0" y1="115" x2="240" y2="115" stroke="#1a1e22" stroke-width="0.6"/>
    <line x1="60" y1="80" x2="60" y2="140" stroke="#1a1e22" stroke-width="0.5"/>
    <line x1="120" y1="80" x2="120" y2="140" stroke="#1a1e22" stroke-width="0.5"/>
    <line x1="180" y1="80" x2="180" y2="140" stroke="#1a1e22" stroke-width="0.5"/>
    <!-- 喷泉池（中央圆） -->
    <ellipse cx="120" cy="100" rx="40" ry="14" fill="#0a1418"/>
    <ellipse cx="120" cy="100" rx="36" ry="11" fill="#10181c" opacity="0.6"/>
    <line x1="84" y1="100" x2="156" y2="100" stroke="#3a4a50" stroke-width="0.3" opacity="0.4"/>
    <!-- 喷泉池中的硬币（散落） -->
    <circle cx="105" cy="103" r="1" fill="#b08a4a" opacity="0.7"/>
    <circle cx="130" cy="98" r="0.8" fill="#b08a4a" opacity="0.6"/>
    <circle cx="120" cy="105" r="0.7" fill="#b08a4a" opacity="0.5"/>
    <circle cx="140" cy="102" r="0.9" fill="#b08a4a" opacity="0.6"/>
    <!-- 喷泉中央雕塑基座（低） -->
    <rect x="115" y="80" width="10" height="20" fill="#3a3228"/>
    <rect x="115" y="80" width="10" height="2" fill="#5a4a30"/>
    <rect x="113" y="78" width="14" height="3" fill="#3a3228"/>
    <!-- 雕塑轮廓（人形剪影） -->
    <ellipse cx="120" cy="70" rx="2" ry="2.5" fill="#1a1410"/>
    <rect x="116" y="73" width="8" height="6" fill="#1a1410"/>
    <rect x="115" y="79" width="2" height="4" fill="#1a1410"/>
    <rect x="123" y="79" width="2" height="4" fill="#1a1410"/>
    <!-- 碎玻璃（散落池边，闪光点） -->
    <polygon points="92,108 95,109 93,112" fill="#5a7480" opacity="0.6"/>
    <polygon points="150,107 153,108 152,111" fill="#5a7480" opacity="0.6"/>
    <polygon points="100,113 102,114 100,116" fill="#5a7480" opacity="0.5"/>
    <line x1="92" y1="108" x2="93" y2="112" stroke="#b08a4a" stroke-width="0.2" opacity="0.4"/>
    <line x1="150" y1="107" x2="152" y2="111" stroke="#b08a4a" stroke-width="0.2" opacity="0.4"/>
    <!-- 水渍（广场地面） -->
    <ellipse cx="60" cy="125" rx="20" ry="3" fill="#1a2025" opacity="0.5"/>
    <ellipse cx="180" cy="130" rx="25" ry="3" fill="#1a2025" opacity="0.5"/>
  </svg>`,

  // 临时救援点：红十字帐篷 + 药品箱 + 志愿者
  rescue_tent: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rt-tent-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a40"/><stop offset="1" stop-color="#1a1e22"/></linearGradient>
      <linearGradient id="rt-tent-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a2e1c"/><stop offset="1" stop-color="#4a1a0c"/></linearGradient>
    </defs>
    <rect width="240" height="140" fill="url(#rt-tent-bg)"/>
    <!-- 远处：街角建筑剪影 -->
    <rect x="0" y="50" width="50" height="70" fill="#0a0e12"/>
    <rect x="0" y="60" width="20" height="20" fill="#1a1410" opacity="0.6"/>
    <rect x="190" y="40" width="50" height="80" fill="#0a0e12"/>
    <rect x="200" y="55" width="20" height="20" fill="#1a1410" opacity="0.6"/>
    <!-- 街灯（暖光） -->
    <rect x="40" y="65" width="2" height="3" fill="#b08a4a" opacity="0.6"/>
    <rect x="200" y="60" width="2" height="3" fill="#b08a4a" opacity="0.5"/>
    <!-- 帐篷主体（A 字形） -->
    <polygon points="60,40 120,20 180,40 180,110 60,110" fill="url(#rt-tent-red)"/>
    <!-- 帐篷顶脊 -->
    <line x1="120" y1="20" x2="120" y2="110" stroke="#3a1408" stroke-width="0.5"/>
    <!-- 帐篷布纹 -->
    <line x1="80" y1="32" x2="80" y2="110" stroke="#3a1408" stroke-width="0.3" opacity="0.5"/>
    <line x1="100" y1="26" x2="100" y2="110" stroke="#3a1408" stroke-width="0.3" opacity="0.5"/>
    <line x1="140" y1="26" x2="140" y2="110" stroke="#3a1408" stroke-width="0.3" opacity="0.5"/>
    <line x1="160" y1="32" x2="160" y2="110" stroke="#3a1408" stroke-width="0.3" opacity="0.5"/>
    <!-- 红十字标识（中央大） -->
    <rect x="106" y="50" width="28" height="28" fill="#f4ede0"/>
    <rect x="113" y="50" width="14" height="28" fill="#c83a1c"/>
    <rect x="106" y="61" width="28" height="6" fill="#c83a1c"/>
    <!-- 红十字（侧面，小） -->
    <rect x="70" y="60" width="14" height="14" fill="#f4ede0" opacity="0.85"/>
    <rect x="73" y="60" width="8" height="14" fill="#c83a1c" opacity="0.85"/>
    <rect x="70" y="65" width="14" height="4" fill="#c83a1c" opacity="0.85"/>
    <!-- 帐篷开口（右侧） -->
    <path d="M 175 40 L 178 110 L 165 110 L 170 40" fill="#0a0a0a" opacity="0.7"/>
    <ellipse cx="173" cy="110" rx="6" ry="2" fill="#0a0a0a"/>
    <!-- 帐篷底边（草绳/加固） -->
    <line x1="60" y1="108" x2="180" y2="108" stroke="#3a1408" stroke-width="2"/>
    <!-- 药品箱（左侧） -->
    <rect x="10" y="100" width="35" height="22" fill="#5a4030"/>
    <rect x="10" y="100" width="35" height="3" fill="#7a5a3a"/>
    <rect x="10" y="119" width="35" height="3" fill="#1a1408"/>
    <line x1="27" y1="100" x2="27" y2="122" stroke="#1a1408" stroke-width="0.4"/>
    <!-- 箱上红十字（medical crate） -->
    <rect x="22" y="105" width="10" height="10" fill="#f4ede0"/>
    <rect x="25" y="105" width="4" height="10" fill="#c83a1c"/>
    <rect x="22" y="108" width="10" height="4" fill="#c83a1c"/>
    <!-- 志愿者剪影（帐篷内左侧） -->
    <ellipse cx="78" cy="68" rx="3" ry="3.5" fill="#1a1410"/>
    <rect x="73" y="71" width="11" height="20" fill="#1a1410"/>
    <rect x="74" y="91" width="3" height="8" fill="#1a1410"/>
    <rect x="80" y="91" width="3" height="8" fill="#1a1410"/>
    <!-- 手电筒光（帐篷前地面） -->
    <ellipse cx="140" cy="125" rx="40" ry="6" fill="#b08a4a" opacity="0.18"/>
    <!-- 地面（湿） -->
    <rect x="0" y="122" width="240" height="18" fill="#0e1418"/>
    <!-- 雨痕 -->
    <line x1="40" y1="128" x2="80" y2="128" stroke="#1a2025" stroke-width="0.6" opacity="0.6"/>
    <line x1="160" y1="130" x2="200" y2="130" stroke="#1a2025" stroke-width="0.6" opacity="0.6"/>
  </svg>`,

  // 旧游客巴士：雾中车厢 + 破座椅 + 积水
  tour_bus: `<svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tb-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4248"/><stop offset="1" stop-color="#1a2025"/></linearGradient>
      <linearGradient id="tb-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4030"/><stop offset="1" stop-color="#2a2218"/></linearGradient>
    </defs>
    <rect width="240" height="140" fill="url(#tb-bg)"/>
    <!-- 雾 -->
    <ellipse cx="120" cy="40" rx="180" ry="30" fill="#5a6a78" opacity="0.3"/>
    <!-- 巴士侧面 -->
    <rect x="20" y="50" width="200" height="60" fill="url(#tb-body)"/>
    <rect x="20" y="50" width="200" height="6" fill="#6a5a40"/>
    <rect x="20" y="50" width="200" height="2" fill="#8a7a5a"/>
    <rect x="20" y="108" width="200" height="4" fill="#1a1410"/>
    <!-- 窗 -->
    <rect x="30" y="58" width="30" height="22" fill="#1a2428"/>
    <rect x="30" y="58" width="30" height="2" fill="#3a5258"/>
    <rect x="30" y="58" width="2" height="22" fill="#3a5258"/>
    <rect x="68" y="58" width="30" height="22" fill="#1a2428"/>
    <rect x="68" y="58" width="30" height="2" fill="#3a5258"/>
    <rect x="68" y="58" width="2" height="22" fill="#3a5258"/>
    <rect x="106" y="58" width="30" height="22" fill="#1a2428"/>
    <rect x="106" y="58" width="30" height="2" fill="#3a5258"/>
    <rect x="106" y="58" width="2" height="22" fill="#3a5258"/>
    <rect x="144" y="58" width="30" height="22" fill="#1a2428"/>
    <rect x="144" y="58" width="30" height="2" fill="#3a5258"/>
    <rect x="144" y="58" width="2" height="22" fill="#3a5258"/>
    <rect x="182" y="58" width="30" height="22" fill="#1a2428"/>
    <rect x="182" y="58" width="30" height="2" fill="#3a5258"/>
    <rect x="182" y="58" width="2" height="22" fill="#3a5258"/>
    <!-- 窗内座椅（暗） -->
    <rect x="32" y="68" width="26" height="10" fill="#3a2818" opacity="0.6"/>
    <rect x="70" y="68" width="26" height="10" fill="#3a2818" opacity="0.6"/>
    <rect x="108" y="68" width="26" height="10" fill="#3a2818" opacity="0.6"/>
    <rect x="146" y="68" width="26" height="10" fill="#3a2818" opacity="0.6"/>
    <rect x="184" y="68" width="26" height="10" fill="#3a2818" opacity="0.6"/>
    <!-- 行李箱（窗下） -->
    <rect x="32" y="82" width="26" height="14" fill="#5a4030"/>
    <rect x="32" y="82" width="26" height="3" fill="#7a5840"/>
    <rect x="70" y="82" width="26" height="14" fill="#6a4a30"/>
    <rect x="108" y="82" width="26" height="14" fill="#5a4030"/>
    <rect x="146" y="82" width="26" height="14" fill="#6a4a30"/>
    <rect x="184" y="82" width="26" height="14" fill="#5a4030"/>
    <!-- 车轮 -->
    <circle cx="60" cy="120" r="10" fill="#0a0a0a"/>
    <circle cx="60" cy="120" r="6" fill="#1a1a1a"/>
    <circle cx="180" cy="120" r="10" fill="#0a0a0a"/>
    <circle cx="180" cy="120" r="6" fill="#1a1a1a"/>
    <!-- 积水（地面） -->
    <rect x="0" y="130" width="240" height="10" fill="#0e1418"/>
    <ellipse cx="40" cy="132" rx="20" ry="2" fill="#3a5258" opacity="0.4"/>
    <ellipse cx="100" cy="134" rx="30" ry="2" fill="#3a5258" opacity="0.4"/>
    <ellipse cx="200" cy="132" rx="25" ry="2" fill="#3a5258" opacity="0.4"/>
  </svg>`,
};

// ===== 地图底图 SVG（手绘撤离区城市平面图）=====
const MAP_BG_SVG = `<svg viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="map-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a323a"/><stop offset="1" stop-color="#1a2025"/>
    </linearGradient>
    <pattern id="map-rain" patternUnits="userSpaceOnUse" width="40" height="60">
      <line x1="5" y1="0" x2="2" y2="50" stroke="#5a7480" stroke-width="0.4" opacity="0.25"/>
      <line x1="20" y1="10" x2="17" y2="55" stroke="#5a7480" stroke-width="0.4" opacity="0.2"/>
      <line x1="32" y1="5" x2="29" y2="50" stroke="#5a7480" stroke-width="0.4" opacity="0.2"/>
    </pattern>
  </defs>
  <!-- 街区底色 -->
  <rect width="1000" height="680" fill="url(#map-sky)"/>
  <!-- 街道（道路） -->
  <!-- 主干道（横） -->
  <rect x="0" y="220" width="1000" height="80" fill="#1a1a1a" opacity="0.4"/>
  <line x1="0" y1="240" x2="1000" y2="240" stroke="#3a3a3a" stroke-width="0.6" stroke-dasharray="6 4"/>
  <line x1="0" y1="280" x2="1000" y2="280" stroke="#3a3a3a" stroke-width="0.6"/>
  <!-- 主干道（竖） -->
  <rect x="540" y="0" width="80" height="680" fill="#1a1a1a" opacity="0.4"/>
  <line x1="560" y1="0" x2="560" y2="680" stroke="#3a3a3a" stroke-width="0.6" stroke-dasharray="6 4"/>
  <line x1="600" y1="0" x2="600" y2="680" stroke="#3a3a3a" stroke-width="0.6"/>
  <!-- 次干道（横2） -->
  <rect x="0" y="480" width="1000" height="50" fill="#1a1a1a" opacity="0.3"/>
  <line x1="0" y1="498" x2="1000" y2="498" stroke="#3a3a3a" stroke-width="0.5"/>
  <line x1="0" y1="513" x2="1000" y2="513" stroke="#3a3a3a" stroke-width="0.5"/>
  <!-- 建筑块面（旅舍区：左上 0-540 × 0-220 + 540-1000 × 0-220）-->
  <!-- 旧旅舍（左侧大块） -->
  <rect x="40" y="40" width="200" height="160" fill="#2a2620"/>
  <rect x="40" y="40" width="200" height="160" fill="none" stroke="#3a3a3a" stroke-width="0.6"/>
  <line x1="140" y1="40" x2="140" y2="200" stroke="#3a3a3a" stroke-width="0.4"/>
  <line x1="40" y1="120" x2="240" y2="120" stroke="#3a3a3a" stroke-width="0.4"/>
  <!-- 屋顶纹理 -->
  <rect x="40" y="40" width="200" height="6" fill="#1a1410"/>
  <!-- 窗户（亮） -->
  <rect x="60" y="80" width="8" height="10" fill="#5a7480" opacity="0.5"/>
  <rect x="80" y="80" width="8" height="10" fill="#5a7480" opacity="0.5"/>
  <rect x="100" y="80" width="8" height="10" fill="#5a7480" opacity="0.5"/>
  <rect x="160" y="80" width="8" height="10" fill="#5a7480" opacity="0.5"/>
  <rect x="180" y="80" width="8" height="10" fill="#5a7480" opacity="0.5"/>
  <rect x="200" y="80" width="8" height="10" fill="#5a7480" opacity="0.5"/>
  <!-- 洗衣房（旅舍右下） -->
  <rect x="380" y="50" width="140" height="150" fill="#2a2620"/>
  <rect x="380" y="50" width="140" height="6" fill="#1a1410"/>
  <rect x="380" y="50" width="140" height="150" fill="none" stroke="#3a3a3a" stroke-width="0.5"/>
  <rect x="400" y="90" width="20" height="14" fill="#3a5258" opacity="0.4"/>
  <rect x="440" y="90" width="20" height="14" fill="#3a5258" opacity="0.4"/>
  <rect x="480" y="90" width="20" height="14" fill="#3a5258" opacity="0.4"/>
  <!-- 登记处（顶部中央） -->
  <rect x="420" y="50" width="120" height="120" fill="#2a2620"/>
  <rect x="420" y="50" width="120" height="6" fill="#1a1410"/>
  <rect x="420" y="50" width="120" height="120" fill="none" stroke="#3a3a3a" stroke-width="0.5"/>
  <rect x="440" y="100" width="80" height="36" fill="#3a5258" opacity="0.4"/>
  <line x1="440" y1="118" x2="520" y2="118" stroke="#8aa8b0" stroke-width="0.3"/>
  <line x1="440" y1="124" x2="510" y2="124" stroke="#8aa8b0" stroke-width="0.3"/>
  <!-- 交易小店（右上） -->
  <rect x="660" y="170" width="200" height="150" fill="#2a2620"/>
  <rect x="660" y="170" width="200" height="6" fill="#1a1410"/>
  <rect x="660" y="170" width="200" height="150" fill="none" stroke="#3a3a3a" stroke-width="0.5"/>
  <rect x="660" y="200" width="40" height="120" fill="#1a1a1a"/>
  <line x1="660" y1="220" x2="700" y2="220" stroke="#2a2a2a" stroke-width="0.4"/>
  <line x1="660" y1="240" x2="700" y2="240" stroke="#2a2a2a" stroke-width="0.4"/>
  <rect x="710" y="190" width="80" height="20" fill="#b08a4a" opacity="0.3"/>
  <rect x="800" y="190" width="50" height="20" fill="#b08a4a" opacity="0.3"/>
  <!-- 外部建筑（右下） -->
  <rect x="700" y="400" width="180" height="160" fill="#1a1612"/>
  <rect x="700" y="400" width="180" height="6" fill="#0a0a08"/>
  <rect x="700" y="400" width="180" height="160" fill="none" stroke="#2a2a2a" stroke-width="0.5"/>
  <rect x="900" y="450" width="80" height="100" fill="#1a1612"/>
  <rect x="900" y="450" width="80" height="6" fill="#0a0a08"/>
  <rect x="900" y="450" width="80" height="100" fill="none" stroke="#2a2a2a" stroke-width="0.5"/>
  <!-- 后巷（底部） -->
  <rect x="380" y="580" width="180" height="60" fill="#1a1612"/>
  <rect x="380" y="580" width="180" height="60" fill="none" stroke="#2a2a2a" stroke-width="0.5"/>
  <line x1="380" y1="610" x2="560" y2="610" stroke="#2a2a2a" stroke-width="0.3" stroke-dasharray="2 2"/>
  <!-- 巴士位置（右下角） -->
  <rect x="800" y="580" width="160" height="60" fill="#3a3020" rx="4"/>
  <rect x="800" y="580" width="160" height="6" fill="#5a4a30" rx="2"/>
  <rect x="820" y="592" width="20" height="20" fill="#1a2428" opacity="0.6"/>
  <rect x="850" y="592" width="20" height="20" fill="#1a2428" opacity="0.6"/>
  <rect x="880" y="592" width="20" height="20" fill="#1a2428" opacity="0.6"/>
  <rect x="910" y="592" width="20" height="20" fill="#1a2428" opacity="0.6"/>
  <circle cx="830" cy="640" r="6" fill="#0a0a0a"/>
  <circle cx="930" cy="640" r="6" fill="#0a0a0a"/>
  <!-- 水渍（多个椭圆） -->
  <ellipse cx="100" cy="540" rx="30" ry="8" fill="#1a2428" opacity="0.4"/>
  <ellipse cx="100" cy="540" rx="20" ry="4" fill="#0a1418" opacity="0.6"/>
  <ellipse cx="400" cy="450" rx="40" ry="10" fill="#1a2428" opacity="0.4"/>
  <ellipse cx="400" cy="450" rx="25" ry="5" fill="#0a1418" opacity="0.6"/>
  <ellipse cx="780" cy="350" rx="35" ry="8" fill="#1a2428" opacity="0.4"/>
  <ellipse cx="780" cy="350" rx="22" ry="4" fill="#0a1418" opacity="0.6"/>
  <ellipse cx="600" cy="600" rx="50" ry="12" fill="#1a2428" opacity="0.4"/>
  <ellipse cx="600" cy="600" rx="30" ry="6" fill="#0a1418" opacity="0.6"/>
  <!-- 雨层（覆盖） -->
  <rect width="1000" height="680" fill="url(#map-rain)"/>
  <!-- 折痕（淡淡的 2 条斜线） -->
  <line x1="0" y1="0" x2="1000" y2="680" stroke="#5a7480" stroke-width="0.6" opacity="0.15"/>
  <line x1="1000" y1="0" x2="0" y2="680" stroke="#5a7480" stroke-width="0.6" opacity="0.15"/>
  <!-- 暖光（店内透出） -->
  <ellipse cx="730" cy="240" rx="100" ry="30" fill="#b08a4a" opacity="0.1"/>
  <ellipse cx="460" cy="120" rx="60" ry="20" fill="#b08a4a" opacity="0.08"/>
  </svg>`;

function canNightHighRisk() {
  return state.health >= 3;
}

// ===== 撤离区 schematic 地图节点（vintage paper 风格） =====
// 节点位置：相对 viewBox 1000×600（左上原点）
// 节点状态：unlocked / locked（已解锁 / 未解锁）
// 节点类型：hub（核心）/ side（支线）/ locked（占位 ?）
const MAP_NODES = {
  inn:        { x: 200, y: 360, type: "hub",  label: "旧旅舍房间", sub: "旅舍" },
  hostel_trash:{ x: 120, y: 530, type: "side", label: "旅舍垃圾桶", sub: "门口" },
  front_bin:  { x: 320, y: 540, type: "side", label: "前台废纸篓", sub: "前台" },
  laundry:    { x: 480, y: 380, type: "hub",  label: "洗衣房",      sub: "蒸汽味" },
  registry:   { x: 480, y: 150, type: "hub",  label: "登记处",      sub: "主线" },
  trader:     { x: 740, y: 250, type: "hub",  label: "交易小店",    sub: "买卖" },
  dump:       { x: 860, y: 450, type: "side", label: "垃圾集中点",  sub: "废品" },
  back_warehouse: { x: 740, y: 100, type: "side", label: "小店后仓",  sub: "囤货" },
  alley:      { x: 560, y: 600, type: "side", label: "后巷回收棚",  sub: "猫路" },
  tour_bus:   { x: 900, y: 620, type: "side", label: "旧游客巴士",  sub: "Day 4+" },
  port:       { x: 60,  y: 200, type: "side", label: "港口",        sub: "Day 2+ 桥墩下" },
  rooftop:     { x: 240, y: 60,  type: "side", label: "旧旅舍天台",  sub: "Day 4+ 楼顶" },
  city_square: { x: 460, y: 60,  type: "side", label: "市府广场",    sub: "Day 4+ 喷泉" },
  rescue_tent: { x: 820, y: 50,  type: "side", label: "临时救援点",  sub: "Day 3+ 红帐篷" },
};

// 节点之间手绘风连线（端点用 locId 引用，渲染时换算成坐标）
const MAP_LINKS = [
  ["inn", "hostel_trash"],
  ["inn", "front_bin"],
  ["inn", "laundry"],
  ["inn", "registry"],
  ["laundry", "registry"],
  ["laundry", "alley"],
  ["registry", "trader"],
  ["trader", "back_warehouse"],
  ["trader", "dump"],
  ["alley", "tour_bus"],
  ["dump", "tour_bus"],
  ["port", "inn"],
  ["port", "registry"],
  ["rooftop", "inn"],
  ["rooftop", "city_square"],
  ["city_square", "registry"],
  ["rescue_tent", "trader"],
  ["rescue_tent", "dump"],
];

// 锁定提示（鼠标悬停 / 选中时显示）
function getMapLockReason(locId) {
  const loc = LOCATIONS[locId];
  if (!loc) return "";
  if (loc.unlockDay && state.day < loc.unlockDay) {
    return `第 ${loc.unlockDay} 天后开放`;
  }
  if (locId === "trader" && !state.flags.registrySceneDone) {
    return "先去登记处触发对话";
  }
  if (locId === "dump" && state.registrationProgress < 1) {
    return "登记进度 ≥1 后开放";
  }
  if (locId === "tour_bus" && state.registrationProgress < 1) {
    return "登记进度 ≥1 后开放";
  }
  if (locId === "back_warehouse" && state.registrationProgress < 2) {
    return "登记进度 ≥2 后开放";
  }
  if (locId === "alley" && state.catTrust < 2 && countItem("old_map") === 0 && !state.flags.alleyUnlocked) {
    return "野猫信任 ≥2 / 持有旧地图后开放";
  }
  return "";
}

function useAction() {
  if (state.actionsLeft <= 0) return false;
  state.actionsLeft--;
  return true;
}

/* ========== 行动处理 ========== */
function doRest() {
  state.clarity = clamp(state.clarity + 1, 0, 10);
  let msg = "你在旧旅舍床上眯了一会，清醒度 +1。";
  if (state.health < 8) {
    state.health = clamp(state.health + 1, 0, 10);
    msg += " 顺便补了补健康 +1。";
  }
  if (state.weather === "storm") {
    msg += " 暴雨在外面砸窗，你没有冒雨出门。";
  }
  ui.eventText = msg;
  addLog(msg, "地点");
}

function useConsumable(itemId) {
  const item = ITEMS[itemId];
  if (!item || !item.usable) return;
  if (!removeItem(itemId, 1)) return;

  if (itemId === "half_water" || itemId === "big_water") {
    state.water = clamp(state.water + 1, 0, 30);
    ui.eventText = "灌下半瓶水，饮水 +1。";
  } else if (itemId === "bottled_water") {
    state.water = clamp(state.water + 1, 0, 30);
    ui.eventText = "瓶装水 +1。";
  } else if (itemId === "cracker" || itemId === "crushed_cracker") {
    state.food = clamp(state.food + 1, 0, 30);
    ui.eventText = "饼干下肚，食物 +1。";
  } else if (itemId === "instant_noodles") {
    state.food = clamp(state.food + 2, 0, 30);
    state.clarity = clamp(state.clarity + 1, 0, 10);
    state.hotMealToday = true;
    ui.eventText = "泡面吃完，食物 +2，清醒度 +1。";
  } else if (itemId === "canned_food") {
    state.food = clamp(state.food + 3, 0, 30);
    state.clarity = clamp(state.clarity + 1, 0, 10);
    state.hotMealToday = true;
    ui.eventText = "罐头加热，食物 +3，清醒度 +1。";
  } else if (itemId === "bandage") {
    state.health = clamp(state.health + 1, 0, 10);
    ui.eventText = "绷带包扎，健康 +1。";
  } else if (itemId === "raincoat") {
    state.flags.hasRaincoat = true;
    ui.eventText = "穿上雨衣，暴雨天探索不再额外吃亏。";
  } else if (itemId === "cat_food_can") {
    interactCat("can");
    return;
  }
  addLog(ui.eventText);
  render();
}

function startAlleyExit() {
  if (state.actionsLeft <= 0) {
    ui.eventText = "本时段行动已用完。";
    render();
    return;
  }
  if (state.health < 3) {
    ui.eventText = "健康过低，撑不过后巷的路。";
    render();
    return;
  }
  useAction();
  const roll = rollD20({ locId: "alley", night: state.timeSlot === "night" });
  ui.rollContext = { type: "alley_exit", locId: "alley" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = "猫站起身，绕到回收棚背后。出口就在那里，你跟不跟？";
  startRollAnimation();
}

function startFishermanQuest() {
  if (state.actionsLeft <= 0) {
    ui.eventText = "本时段行动已用完。";
    render();
    return;
  }
  useAction();
  const roll = rollD20({ locId: "port", night: state.timeSlot === "night" });
  ui.rollContext = { type: "fisherman_quest", locId: "port" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = "你挽起裤腿，帮老张把浮木拽上船板。河水冰凉，他递过来一支烟。";
  startRollAnimation();
}

function applyFishermanQuest(roll) {
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    state.clarity -= 1;
    ui.eventText = "浮木压过来，你闪不及，肩膀撞到船舷。健康 -1，清醒 -1。老张叹了口气。";
    addLog("帮老张搬浮木失败。", "地点");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    ui.eventText = "浮木泡得太软，你只拽起一半。清醒 -1。老张没说什么。";
    addLog("帮老张搬浮木，只完成一半。", "地点");
  } else {
    let trustGain = 0;
    let fish = 0;
    if (roll.tier === "crit" || roll.tier === "high") {
      trustGain = 2;
      fish = 2;
      ui.eventText = "你一口气把浮木全拽上船板，船上腾出地方堆新货。老张拍你肩膀：「小子有把力气。」\n\n老张信任 +2，鱼干 ×2。";
    } else {
      trustGain = 1;
      fish = 1;
      ui.eventText = "浮木拖上船板，老张递过来一条鱼干：「今天没空人，这算谢你。」\n\n老张信任 +1，鱼干 ×1。";
    }
    state.fishermanTrust = clamp(state.fishermanTrust + trustGain, 0, 5);
    addItem("dried_fish", fish);
    addLog(`帮老张搬浮木，老张信任 +${trustGain}，鱼干 ×${fish}。`, "地点");
  }
  if (state.fishermanTrust >= 3) {
    state.flags.fishermanVouchUnlocked = true;
  }
}

function startPhotographerQuest() {
  if (state.actionsLeft <= 0) {
    ui.eventText = "本时段行动已用完。";
    render();
    return;
  }
  useAction();
  const roll = rollD20({ locId: "rooftop", night: state.timeSlot === "night" });
  ui.rollContext = { type: "photographer_quest", locId: "rooftop" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = "范老师递过来半包烟，指着远处的市政广场：「我的镜头落在那里。帮我取一下。」";
  startRollAnimation();
}

function applyPhotographerQuest(roll) {
  if (roll.tier === "crit_fail") {
    state.health -= 1;
    state.clarity -= 1;
    ui.eventText = "广场碎玻璃扎得你迈不开步。范老师叹了口气：「算了。」健康 -1，清醒 -1。";
    addLog("帮范老师取镜头失败。", "地点");
  } else if (roll.tier === "fail") {
    state.clarity -= 1;
    ui.eventText = "你绕到喷泉池边，镜头不在。范老师也没意外。清醒 -1。";
    addLog("广场没找到镜头。", "地点");
  } else {
    let trustGain = 0;
    let photo = 0;
    if (roll.tier === "crit" || roll.tier === "high") {
      trustGain = 2;
      photo = 1;
      ui.eventText = "你从喷泉池边把镜头捞出来，擦了擦递给范老师。他接过去，转身对城市按下最后一次快门。\n\n范老师信任 +2，「城市最后影像」触发。";
    } else {
      trustGain = 1;
      photo = 0;
      ui.eventText = "你绕了半圈，在底座夹缝里找到镜头。范老师点头：「够了。」\n\n范老师信任 +1。";
    }
    state.photographerTrust = clamp(state.photographerTrust + trustGain, 0, 5);
    if (countItem("camera_lens") === 0) {
      // 替范老师带回镜头
      addItem("camera_lens", 1);
      addLog("范老师把镜头接过去：「这是我的眼睛。」", "地点");
    }
    if (photo > 0) {
      // 范老师按下快门 → 解锁隐藏结局条件
      state.flags.cityPhotosUnlocked = true;
    }
    addLog(`帮范老师取镜头，信任 +${trustGain}。`, "地点");
  }
  if (state.photographerTrust >= 3) {
    state.flags.photographerVouchUnlocked = true;
  }
}

function interactCat(mode) {
  if (mode === "feed") {
    if (state.food < 1) {
      ui.eventText = "你没有多余食物喂猫。";
    } else {
      state.food -= 1;
      state.catTrust += 1;
      state.clarity = clamp(state.clarity + 1, 0, 10);
      ui.eventText = "猫吃完你的饼干，蹭了蹭你的裤脚。猫信任 +1，清醒度 +1。";
    }
  } else if (mode === "can") {
    state.catTrust += 2;
    state.clarity = clamp(state.clarity + 1, 0, 10);
    ui.eventText = "猫罐头香气弥漫。猫信任 +2，清醒度 +1。";
  } else if (mode === "shoo") {
    state.catTrust -= 1;
    ui.eventText = "猫被赶走，信任 -1。";
  } else if (mode === "follow") {
    if (state.catTrust >= 2) {
      state.flags.alleyUnlocked = true;
      state.flags.catAtAlley = true;
      syncUnlocks();
      ui.eventText =
        "猫领你绕到后巷，然后蹲在回收棚门口舔爪子。后巷回收棚已出现在地图上——野猫不再赖在主界面。";
    } else {
      ui.eventText = "猫看了你一眼，没有领路。（猫信任需≥2，可先喂猫罐头或饼干）";
    }
  }
  addLog(ui.eventText);
  render();
}

const WATER_ITEM_IDS = ["half_water", "bottled_water", "big_water"];

function isWaterItem(id) {
  return WATER_ITEM_IDS.includes(id);
}

function getSellUnitPrice(itemId) {
  const item = ITEMS[itemId];
  if (!item) return 0;
  if (item.moneyLoot) return item.moneyLoot;
  return getSellPrice(itemId) || 0;
}

function executeSell(itemId, qty, priceMultiplier = 1) {
  const item = ITEMS[itemId];
  if (!item || countItem(itemId) < qty) return false;
  const unit = getSellUnitPrice(itemId);
  if (!unit) return false;
  removeItem(itemId, qty);
  const gain = Math.max(1, Math.round(unit * qty * priceMultiplier));
  state.money += gain;
  state.tradeCount++;
  onFairTrade();
  ui.eventText = `交易者收下 ${item.name} ×${qty}，金钱 +${gain}。`;
  addLog(`卖出 ${item.name} ×${qty}，获得 ${gain} 金钱。`, "交易");
  return true;
}

function executeBuy(itemId, price) {
  if (state.money < price) {
    ui.eventText = "钱不够。交易者把价签翻了回去。";
    return false;
  }
  state.money -= price;
  addItem(itemId, 1);
  if (itemId === "raincoat") state.flags.hasRaincoat = true;
  state.tradeCount++;
  onFairTrade();
  ui.eventText = `付款 ${price}，获得 ${ITEMS[itemId].name}。`;
  addLog(`购入 ${ITEMS[itemId].name}，花费 ${price} 金钱。`, "交易");
  return true;
}

function sellItem(itemId, qty) {
  executeSell(itemId, qty, 1);
  ui.traderPanel = "sell";
  ui.view = "trader";
  render();
}

function buyItem(itemId) {
  let price = getBuyPrice(itemId);
  if (price == null) return;
  if (state.flags.waterBuyDiscount && isWaterItem(itemId)) {
    price = Math.round(price * 0.9);
    state.flags.waterBuyDiscount = false;
  }
  if (!executeBuy(itemId, price)) {
    ui.traderPanel = "buy";
    ui.view = "trader";
    render();
    return;
  }
  ui.traderPanel = "buy";
  ui.view = "trader";
  render();
}

function startHaggleSell(itemId, qty) {
  const unit = getSellUnitPrice(itemId);
  if (!unit || countItem(itemId) < qty) return;
  const roll = rollD20({ bargain: true, locId: "trader", night: state.timeSlot === "night" });
  ui.rollContext = { type: "haggle_sell", itemId, qty, baseUnit: unit, panel: "sell" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = `你指着 ${ITEMS[itemId].name}，试探能不能多卖一点。`;
  startRollAnimation();
}

function startHaggleBuy(itemId) {
  const price = getBuyPrice(itemId);
  if (price == null) return;
  const roll = rollD20({ bargain: true, locId: "trader", night: state.timeSlot === "night" });
  ui.rollContext = { type: "haggle_buy", itemId, basePrice: price, panel: "buy" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = `你问 ${ITEMS[itemId].name} 能不能便宜点。`;
  startRollAnimation();
}

function applyHaggleSell(roll, ctx) {
  const { itemId, qty } = ctx;
  let mult = 1;
  let extra = "";
  if (roll.tier === "crit_fail") {
    mult = 0.9;
    bumpTraderTrust(-1, "交易者皱眉：「这次算我倒霉。」");
    extra = "信任下降。";
  } else if (roll.tier === "fail") {
    mult = 1;
    extra = "他没松口，按报价收。";
  } else if (roll.tier === "crit" || roll.tier === "high") {
    mult = 1.25;
    extra = "大成功，多给了两成半。";
  } else {
    mult = 1.1;
    extra = "抬价成功，多了一成。";
  }
  executeSell(itemId, qty, mult);
  maybeTrustFromHaggle(roll);
  ui.eventText += `\n${extra}`;
  addLog(`抬价卖出 ${ITEMS[itemId].name}，${rollTierDisplay(roll.tier)}。`, "交易");
}

function applyHaggleBuy(roll, ctx) {
  const { itemId, basePrice } = ctx;
  let price = basePrice;
  let extra = "";
  if (roll.tier === "crit_fail") {
    price = Math.round(basePrice * 1.1);
    bumpTraderTrust(-1, "他冷笑：「想压价？这次加一成。」");
    extra = "信任下降，价还涨了。";
  } else if (roll.tier === "fail") {
    price = basePrice;
    extra = "价签没动。";
  } else if (roll.tier === "crit" || roll.tier === "high") {
    price = Math.round(basePrice * 0.8);
    extra = "大成功，八折成交。";
  } else {
    price = Math.round(basePrice * 0.9);
    extra = "压价成功，九折。";
  }
  if (state.flags.waterBuyDiscount && isWaterItem(itemId)) {
    price = Math.round(price * 0.9);
    state.flags.waterBuyDiscount = false;
    extra += " 搬水委托的水类九折已用掉。";
  }
  if (state.money < price) {
    ui.eventText = `压价后是 ${price}，但你钱不够。`;
    return;
  }
  executeBuy(itemId, price);
  maybeTrustFromHaggle(roll);
  ui.eventText += `\n${extra}`;
  addLog(`压价购入 ${ITEMS[itemId].name}，${rollTierDisplay(roll.tier)}。`, "交易");
}

function completeTraderIntro() {
  state.flags.traderIntroDone = true;
}

function getTraderIntroText() {
  return `交易小店的卷帘门只拉起一半。门口堆着几箱被雨水泡软的瓶装水，柜台后的人正在按一台旧计算器。

他看见你手里的废金属，停了一下。

「卖东西？可以。买东西？也可以。」
「不问来历，只看能不能用。」`;
}

function getWaterQuestSceneText() {
  return `你注意到门口几箱水还没搬进去。纸箱边缘已经被雨水泡软。

交易者顺着你的视线看过去。

「那几箱水别让雨再泡了。你要是帮我搬进去，我以后按正常价收你的东西。」`;
}

function openTrader(panel) {
  ui.selectedLoc = "trader";
  ui.view = "trader";
  ui.traderPanel = panel || "hub";
  render();
}

function startWaterQuest() {
  if (state.flags.waterQuestDone || !state.flags.waterQuestAvailable) return;
  if (state.actionsLeft <= 0) {
    ui.eventText = "本时段行动已用完。";
    ui.traderPanel = "hub";
    render();
    return;
  }
  useAction();
  const roll = rollD20({ locId: "trader", night: false });
  ui.rollContext = { type: "water_quest", panel: "hub" };
  ui.pendingRoll = roll;
  ui.rollDone = false;
  ui.eventText = "你扶住纸箱边缘，试着把泡水的水搬进后仓……";
  startRollAnimation();
}

function applyWaterQuestResult(roll) {
  state.flags.waterQuestDone = true;
  if (roll.tier === "fail" || roll.tier === "crit_fail") {
    bumpTraderTrust(-1, "搬水搞砸了，交易者摇头");
    ui.eventText = `纸箱底部被雨水泡软，瓶装水滚了一地。\n交易者叹了口气。\n「下次别碰湿纸箱。」`;
    addLog("搬水委托失败。", "交易");
  } else {
    bumpTraderTrust(1, "搬水委托完成");
    const bonus = Math.random() < 0.45 ? 10 : 0;
    if (bonus) state.money += bonus;
    state.flags.waterBuyDiscount = true;
    ui.eventText = `你把两箱水搬进后仓。纸箱底部湿得发软，但好在没有散架。\n交易者看了看你，又看了看门口的雨。\n「行。以后你的东西，我按正常价收。」\n交易者信任 +1。${bonus ? ` 额外 ${bonus} 金钱。` : ""} 水类物资九折一次已记下。`;
    addLog(`搬水委托完成，信任 +1${bonus ? `，+${bonus} 金钱` : ""}。`, "交易");
  }
}

function sellAllSellables() {
  let total = 0;
  const sold = [];
  Object.keys(state.inventory).forEach((id) => {
    if (ITEMS[id]?.category !== "sellable") return;
    const price = getSellPrice(id);
    const qty = state.inventory[id];
    if (price > 0) {
      total += price * qty;
      sold.push(`${ITEMS[id].name}×${qty}`);
      delete state.inventory[id];
    } else if (ITEMS[id].moneyLoot) {
      total += ITEMS[id].moneyLoot * qty;
      sold.push(`${ITEMS[id].name}`);
      delete state.inventory[id];
    }
  });
  if (!total) {
    ui.eventText = "背包里没有交易者愿意收的破烂。";
  } else {
    state.money += total;
    state.tradeCount++;
    ui.eventText = `交易者扫了一眼堆起来的货：「一口价。」金钱 +${total}。`;
    addLog(`批量卖出，获得 ${total} 金钱。`, "交易");
  }
  ui.traderPanel = "sell";
  ui.view = "trader";
  render();
}

function submitRegistration(stage) {
  const p = state.registrationProgress;
  if (stage === 1 && p === 0) {
    if (state.money < 300) {
      ui.eventText = "登记员：补登申请费 300，请先凑齐现金。";
      render();
      return;
    }
    useAction();
    state.money -= 300;
    state.registrationProgress = 1;
    state.flags.tempApplication = true;
    if (!countItem("temp_form")) {
      addItem("temp_form", 1);
    }
    state.clarity = clamp(state.clarity + 1, 0, 10);
    state.flags.revealedStage2 = true;
    syncUnlocks();
    ui.eventText =
      "登记员敲了两下键盘：「临时申请号已生成。」\n\n登记员把一张临时登记表递给你存档。\n\n「申请已受理。接下来需要确认你确实住在这处撤离区。」清醒度 +1。";
    showRegToast(1);
  } else if (stage === 2 && p === 1) {
    if (!hasLodgingClue()) {
      ui.eventText =
        "登记员：请提供至少 2 份可交叉核验的住宿线索（房卡、钥匙牌、账本页、入住单、前台照片等）。";
      render();
      return;
    }
    if (state.money < 100) {
      ui.eventText = `登记员：住宿核验费 100 金钱。你还差 ${100 - state.money}。`;
      render();
      return;
    }
    useAction();
    state.money -= 100;
    consumeLodgingClues(2);
    state.registrationProgress = 2;
    state.flags.lodgingVerified = true;
    state.clarity = clamp(state.clarity + 1, 0, 10);
    state.flags.revealedStage3 = true;
    syncUnlocks();
    ui.eventText =
      "「住宿核验通过。」登记员依然没笑，但屏幕变绿了。\n\n「最后需要补齐撤离配额。」清醒度 +1。";
    showRegToast(2);
  } else if (stage === 3 && p === 2) {
    let ok = false;
    let via = "";
    if (state.money >= 1000) {
      state.money -= 1000;
      ok = true;
      via = "缴纳 1000 配额押金";
    } else if (countItem("emergency_battery") >= 2) {
      removeItem("emergency_battery", 2);
      ok = true;
      via = "提交应急电池组 ×2";
    } else if (state.water >= 20) {
      state.water -= 20;
      ok = true;
      via = "提交水资源储备 20";
    } else if (state.food >= 20) {
      state.food -= 20;
      ok = true;
      via = "提交食物储备 20";
    }
    if (!ok) {
      ui.eventText = `登记员：撤离配额未达标。任选其一提交：\n${formatRegStage3OptionsList()}`;
      render();
      return;
    }
    useAction();
    state.registrationProgress = 3;
    state.flags.evacPass = true;
    state.taskDoneToday = true;
    ui.eventText = `「撤离通行条已签发。」${via}。第7天可正式撤离。`;
    showRegToast(3);
  } else {
    ui.eventText = "当前阶段无法提交，请查看任务进度。";
    render();
    return;
  }
  state.taskDoneToday = true;
  addLog(ui.eventText.replace(/\n/g, " "), "登记");
  syncUnlocks();
  render();
}

function clearRollAnim() {
  if (rollAnimInterval) {
    clearInterval(rollAnimInterval);
    rollAnimInterval = null;
  }
  if (rollAnimTimeout) {
    clearTimeout(rollAnimTimeout);
    rollAnimTimeout = null;
  }
}

function cancelRollPrepare() {
  clearRollAnim();
  ui.pendingRoll = null;
  ui.rollContext = null;
  ui.rollingDisplay = null;
  ui.view = "map";
  ui.selectedLoc = null;
  render();
}

function getExplorePrepareInfo(locId, actionId) {
  const loc = LOCATIONS[locId];
  const meta = LOC_UI[locId];
  let actionLabel = "探索";
  if (locId === "inn") actionLabel = "翻找房间";
  else if (actionId === "search_locker") actionLabel = "搜索失物柜";
  else if (actionId === "search_dryer") actionLabel = "翻找烘干机";
  else if (locId === "front_bin") actionLabel = "搜索";
  else if (meta?.exploreLabel) actionLabel = meta.exploreLabel;

  let risk = "低风险";
  if (actionId === "search_dryer" && locId === "laundry") {
    risk = "低中风险";
  } else if (meta?.risk && meta.risk !== "—") {
    const r = meta.risk;
    if (r === "低") risk = "低风险";
    else if (r === "中") risk = "中风险";
    else if (r === "中高") risk = "中高风险";
    else if (r === "高") risk = "高风险";
    else risk = `${r}风险`;
  } else if (loc?.highRisk) risk = "高风险";
  else if (loc?.customRoll) risk = "低风险";

  const note = meta?.purpose || loc?.desc || "";
  return { locName: loc?.name || locId, actionLabel, risk, note };
}

function startExplore(locId, actionId) {
  clearRollAnim();
  ui.rollOutcome = null;
  const loc = LOCATIONS[locId];
  const isNight = state.timeSlot === "night";
  if (loc?.highRisk && isNight && !canNightHighRisk()) {
    ui.eventText = "健康太低，不宜夜间高风险探索。";
    render();
    return;
  }
  ui.rollContext = {
    type: "explore",
    locId,
    actionId: actionId || "search",
    forcedWarehouse: actionId === "force_warehouse",
  };
  ui.pendingRoll = null;
  ui.rollDone = false;
  ui.view = "roll_prepare";
  ui.eventText = `你准备在「${loc.name}」行动。`;
  render();
}

function startRollAnimation() {
  clearRollAnim();
  ui.view = "rolling";
  ui.rollingDisplay = Math.floor(Math.random() * 20) + 1;
  render();

  // 3D 旋转：3 圈 X + 4 圈 Y + 2 圈 Z（自由翻滚）
  const startT = performance.now();
  const duration = 1500;
  const endRX = 1080, endRY = 1440, endRZ = 720;

  rollAnimInterval = setInterval(() => {
    const elapsed = performance.now() - startT;
    const t = Math.min(elapsed / duration, 1);
    // 缓出：开始快、末尾慢
    const eased = 1 - Math.pow(1 - t, 3);
    const rotX = endRX * eased;
    const rotY = endRY * eased;
    const rotZ = endRZ * eased;
    ui.rollingDisplay = Math.floor(Math.random() * 20) + 1;
    // 更新所有 6 面的数字
    document.querySelectorAll(".dice-cube.is-rolling .dice-face").forEach((face) => {
      face.textContent = String(ui.rollingDisplay);
    });
    const cube = document.querySelector(".dice-cube.is-rolling");
    if (cube) {
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
    }
  }, 50);

  rollAnimTimeout = setTimeout(() => {
    clearRollAnim();
    ui.rollingDisplay = null;
    ui.view = "roll_result";
    render();
  }, duration);
}

function beginRoll() {
  const ctx = ui.rollContext;
  if (!ctx || ctx.type !== "explore") return;

  if (state.actionsLeft <= 0) {
    ui.eventText = "本时段行动已用完。";
    ui.view = "map";
    render();
    return;
  }

  const loc = LOCATIONS[ctx.locId];
  const isNight = state.timeSlot === "night";
  if (loc?.highRisk && isNight && !canNightHighRisk()) {
    ui.eventText = "健康太低，不宜夜间高风险探索。";
    ui.view = "map";
    render();
    return;
  }

  useAction();
  state.visitCount[ctx.locId] = (state.visitCount[ctx.locId] || 0) + 1;

  const roll = rollD20({
    locId: ctx.locId,
    night: isNight,
    actionId: ctx.actionId,
  });
  ui.pendingRoll = roll;
  ui.eventText =
    ctx.locId === "inn"
      ? `你在${loc.name}里翻找……`
      : `你在「${loc.name}」搜索……`;
  startRollAnimation();
}

function exitRollView(ctx) {
  clearRollAnim();
  ui.rollingDisplay = null;
  ui.pendingRoll = null;
  ui.rollContext = null;
  ui.rollDone = true;

  const returnTrader =
    ctx && ["haggle_sell", "haggle_buy", "water_quest"].includes(ctx.type);

  if (returnTrader) {
    ui.view = "trader";
    ui.traderPanel = ctx.panel || "hub";
  } else {
    ui.view = "map";
    ui.selectedLoc = null;
  }
}

function confirmRoll() {
  const roll = ui.pendingRoll;
  const ctx = ui.rollContext;
  if (!roll || !ctx) {
    exitRollView(null);
    render();
    return;
  }

  let lootLines = [];
  try {
    if (ctx.type === "explore") {
      const loc = LOCATIONS[ctx.locId];
      if (loc?.explore && loc.customRoll) {
        if (ctx.locId === "back_warehouse" && ctx.forcedWarehouse) {
          lootLines = loc.explore(roll, true);
        } else {
          lootLines = loc.explore(roll, ctx.actionId);
        }
        if (roll.tier === "fail" || roll.tier === "crit_fail") state.failsToday++;
      } else if (loc?.explore) {
        if (roll.tier === "crit_fail") {
          state.health -= 1;
          const lost = loseRandomSellable();
          if (lost) lootLines.push(`丢失 ${lost}`);
          state.failsToday++;
        } else if (roll.tier === "fail") {
          state.clarity -= 1;
          state.failsToday++;
          lootLines.push("一无所获，清醒度 -1");
        } else {
          lootLines =
            ctx.locId === "back_warehouse" && ctx.forcedWarehouse
              ? loc.explore(roll, true)
              : loc.explore(roll);
        }
      }
    } else if (ctx.type === "haggle_sell") {
      applyHaggleSell(roll, ctx);
    } else if (ctx.type === "haggle_buy") {
      applyHaggleBuy(roll, ctx);
    } else if (ctx.type === "water_quest") {
      applyWaterQuestResult(roll);
    } else if (ctx.type === "alley_exit") {
      resolveAlleyExit(roll);
    } else if (ctx.type === "fisherman_quest") {
      applyFishermanQuest(roll);
    } else if (ctx.type === "photographer_quest") {
      applyPhotographerQuest(roll);
    } else if (ctx.type === "volunteer_quest") {
      applyVolunteerQuest(roll);
    }

    const est = lootLines.length ? lootLines.join("；") : "";
    if (ctx.type === "explore") {
      ui.rollOutcome = {
        raw: roll.raw,
        mods: roll.mods,
        final: roll.final,
        tier: roll.tier,
        tierLabel: roll.tierLabel,
        lootLines,
      };
    }
    const tierName = rollTierDisplay(roll.tier);
    ui.eventText = est
      ? `${ui.eventText}\n\n【${tierName}】${est}`
      : `${ui.eventText}\n\n【${tierName}】`;
    if (ctx.type === "explore") {
      addLog(
        `${tierName}（${roll.final}点）${lootLines.length ? "：" + lootLines.join("；") : ""}`,
        "地点"
      );
    } else if (!["haggle_sell", "haggle_buy", "water_quest", "fisherman_quest", "photographer_quest", "volunteer_quest"].includes(ctx.type)) {
      addLog(`${tierName}（${roll.final}点）`, "系统");
    }
  } finally {
    exitRollView(ctx);
    render();
  }

  if (state.health <= 0) {
    endGame(resolveEnding());
    return;
  }
  if (ctx.type === "alley_exit" && state.flags.alleyEvac) {
    endGame("alley");
  }
}

function resolveAlleyExit(roll) {
  if (roll.tier === "fail" || roll.tier === "crit_fail") {
    state.health -= 1;
    ui.eventText = "后巷路线被雨水冲断，健康 -1。";
  } else {
    state.flags.alleyEvac = true;
    ui.eventText = "猫带你穿过回收棚，抵达撤离点侧门。";
  }
}

function handleLocationAction(locId, actionId) {
  const loc = LOCATIONS[locId];
  ui.selectedLoc = locId;

  if (actionId === "cat_feed") {
    interactCat("feed");
    return;
  }
  if (actionId === "cat_can") {
    interactCat("can");
    return;
  }
  if (actionId === "alley_exit_roll") {
    startAlleyExit();
    return;
  }
  if (actionId === "fisherman_quest") {
    startFishermanQuest();
    return;
  }
  if (actionId === "photographer_quest") {
    startPhotographerQuest();
    return;
  }
  if (actionId === "volunteer_quest") {
    startVolunteerQuest();
    return;
  }

  if (locId === "inn") {
    if (actionId === "rest") {
      if (state.actionsLeft <= 0) {
        ui.eventText = "本时段行动已用完。";
        render();
        return;
      }
      useAction();
      doRest();
      render();
      return;
    }
    if (actionId === "search_room") {
      startExplore("inn", "search_room");
      return;
    }
  }

  if (locId === "laundry") {
    if (actionId === "search_locker" || actionId === "search_dryer") {
      startExplore("laundry", actionId);
      return;
    }
  }

  if (locId === "registry") {
    if (actionId === "register") {
      ui.selectedLoc = "registry";
      if (!state.flags.registrySceneDone) {
        ui.registryDialogue = true;
        ui.view = "map";
        ui.eventText = "登记处柜台前排着稀稀拉拉的人。你凑过去问补登。";
      } else {
        ui.registryDialogue = false;
        ui.view = "registry";
        ui.eventText = getRegRequirementsBrief();
      }
      render();
      return;
    }
    if (actionId === "view_req") {
      ui.view = "registry";
      ui.eventText = getRegRequirementsBrief();
      render();
      return;
    }
    if (actionId === "leave_registry") {
      ui.selectedLoc = null;
      ui.view = "map";
      ui.eventText = "你离开登记处。柜台后的屏幕仍亮着。";
      render();
      return;
    }
    if (actionId.startsWith("submit_")) {
      const stage = parseInt(actionId.split("_")[1], 10);
      const reason = getSubmitDisabledReason(stage);
      if (reason) {
        ui.eventText = reason.replace(/\n/g, "\n");
        render();
        return;
      }
      submitRegistration(stage);
      render();
      return;
    }
  }

  if (locId === "trader") {
    if (actionId === "enter_trader" || actionId === "trade" || actionId === "open_trader") {
      openTrader();
      return;
    }
  }

  if (locId === "back_warehouse") {
    if (actionId === "pay_enter") {
      if (state.money < 100) {
        ui.eventText = "进入后仓需要 100。";
        render();
        return;
      }
      useAction();
      state.money -= 100;
      state.flags.paidWarehouse = true;
      if (!state.flags.trustFromPaidWarehouse) {
        state.flags.trustFromPaidWarehouse = true;
        bumpTraderTrust(1, "交易者收下进门费，没再拦你");
      }
      startExplore("back_warehouse");
      return;
    }
    if (actionId === "force_enter") {
      startExplore("back_warehouse", "force_warehouse");
      return;
    }
    if (actionId === "normal_enter" && state.traderTrust >= 2) {
      startExplore("back_warehouse");
      return;
    }
  }

  if (loc.npc === "trader" && actionId === "open") {
    ui.view = "trader";
    render();
    return;
  }

  if (loc.roll || loc.explore) {
    startExplore(locId, actionId);
  }
}

function advanceTimeSlot() {
  clearRollAnim();
  ui.pendingRoll = null;
  ui.rollContext = null;
  ui.rollingDisplay = null;
  ui.view = "map";
  ui.selectedLoc = null;

  const order = ["morning", "afternoon", "night"];
  const idx = order.indexOf(state.timeSlot);
  if (idx < 2) {
    state.timeSlot = order[idx + 1];
    state.actionsLeft = 3;
    ui.eventText = dayIntro() || `${GAME.slotNames[state.timeSlot]}开始了。`;
    unlockByDay();
    tryTriggerMiniEvent();
    render();
    return;
  }
  endDay();
}

function dayIntro() {
  const intros = {
    1: "第1天：旅舍空荡，前台没人。手机黑屏，撤离通知贴在门上——第7天是最后撤离日。",
    2: "第2天：登记处前排起队。有人抱着纸箱，有人盯着屏幕等名字变绿。",
    3: "第3天：交易小店的秤声从早响到晚。拾荒变现成了日常。",
    4: "第4天：旧游客巴士停在路边，行李箱半开着。",
    5: "第5天：撤离配额压力上来，垃圾点更香也更危险。",
    6: "第6天：最后准备日，能卖的都卖，能交的都交。",
    7: "第7天：最终撤离日。",
  };
  return intros[state.day];
}

function unlockByDay() {
  syncUnlocks();
  if (state.day === 2 || state.day === 5) state.weather = "storm";
  else if (Math.random() < 0.28) state.weather = "storm";
  else if (Math.random() < 0.22) state.weather = "rainy";
  else state.weather = "cloudy";
}

function endDay() {
  checkDailyEffects();
  if (state.health <= 0) {
    endGame(resolveEnding());
    return;
  }
  if (state.day >= 7) {
    endGame(resolveEnding());
    return;
  }
  state.day++;
  state.timeSlot = "morning";
  state.actionsLeft = 3;
  state.failsToday = 0;
  state.hotMealToday = false;
  state.taskDoneToday = false;
  state.flags.bargainDiscount = false;
  unlockByDay();
  tryTriggerMiniEvent();
  ui.eventText = dayIntro();
  addLog(`—— 进入第 ${state.day} 天 ——`);
  render();
}

function checkDailyEffects() {
  state.food = clamp(state.food - 2, 0, 30);
  state.water = clamp(state.water - 2, 0, 30);
  if (state.food <= 0) state.health -= 1;
  if (state.water <= 0) state.health -= 1;
  if (state.food <= 0 && state.water <= 0) state.health -= 1;
  if (state.failsToday >= 2) {
    state.clarity -= 1;
    state.health -= 1;
  }
  if (state.taskDoneToday) state.clarity = clamp(state.clarity + 1, 0, 10);
  if (state.hotMealToday) state.clarity = clamp(state.clarity + 1, 0, 10);
  state.health = clamp(state.health, 0, 10);
  state.clarity = clamp(state.clarity, 0, 10);
}

function resolveEnding() {
  if (state.health <= 0) {
    if (state.traderTrust > 2 || state.catTrust > 2) return "hospital";
    return "death";
  }
  if (state.day >= 7 || state.flags.alleyEvac) {
    if (state.flags.alleyEvac && state.health >= 3) return "alley";
    if (state.registrationProgress >= 3 && state.flags.evacPass && state.health > 0) return "official";
    if (state.money >= 3000 && state.trashSearchCount >= 8 && state.health > 0) return "rich";
    if (state.traderTrust >= 4 && state.registrationProgress >= 1) return "trader_vouch";
    if (state.fishermanTrust >= 3 && state.registrationProgress >= 1) return "fisherman_vouch";
    if (state.volunteerTrust >= 3 && state.registrationProgress >= 1) return "volunteer_vouch";
    if (state.flags.cityPhotosUnlocked && state.registrationProgress >= 1) return "city_photos";
    if (state.registrationProgress >= 2 && state.money >= 1000) return "buy_ticket";
    if (
      state.registrationProgress >= 2 &&
      (countItem("emergency_battery") >= 2 ||
        countItem("inventory_list") > 0 ||
        countItem("driver_manifest") > 0)
    ) {
      return "material";
    }
    return "outside";
  }
  return null;
}

const ENDING_TEXT = {
  official:
    "登记员扫描通行条，闸门打开。你正式进入撤离名单，搭上最后一班安置车。系统终于承认：你还在名单里。",
  fisherman_vouch:
    "老张把船横在撤离点侧门，你从他船舱里翻出的湿绳索上跳下去。「上岸了给我报平安。」他的声音被河水冲远。",
  volunteer_vouch:
    "登记员看着登记表犹豫不决时，帐篷那边传来敲击声——小陈按了按麦克风：「这是我的人，他替我们分过三天药。」闸门替你打开了。",
  city_photos:
    "撤离前夜，范老师把这七天的胶片洗出来，寄到你的新地址——你第一次看见自己住过七天的城市那么完整的样子。窗户里还有你没收完的烟头。",
  buy_ticket:
    "你没凑齐全部流程，但在最后窗口甩出厚厚一叠现金。司机数了数，让你坐在发动机旁边的折叠座上。",
  material:
    "登记员盯着物资清单，沉默三秒：「可以抵扣。」你用整箱水、电池或医疗包，换到了离开的资格。",
  trader_vouch:
    "交易者拍着你的肩走进登记点：「他欠我人情，也还得了账。」登记员皱眉，但还是签了字。",
  alley:
    "猫在后巷停步，回收棚后是一扇没上锁的铁门。你从系统地图之外，摸到了撤离队的尾巴。",
  rich:
    "你盯着账户余额发呆——靠捡空瓶、铜线和旧相机，你攒下的钱比配额押金还多三倍。荒诞，但够体面地离开。",
  outside:
    "第七天傍晚，最后一批车扬起尘土。你站在旅舍门口，手里是还没卖掉的纸箱和没盖完的章。",
  hospital:
    "交易者叫人把你抬进临时医疗点。你活下来了，但错过了这班撤离。",
  death:
    "旅舍床单还留着你的褶皱，窗外雨停了，社区封闭，像什么都没发生过。",
};

function endGame(endingId) {
  ui.screen = "ending";
  ui.endingId = endingId;
  render();
}

function restart() {
  clearRollAnim();
  state = null;
  ui = {
    screen: "intro",
    view: "map",
    selectedLoc: null,
    invTab: "survival",
    pendingRoll: null,
    rollContext: null,
    rollDone: false,
    eventText: "",
    endingId: null,
    introIndex: 0,
    toast: null,
    registryDialogue: false,
    rollOutcome: null,
    traderPanel: "hub",
    expandedLocDetail: null,
    rollingDisplay: null,
  };
  if (typeof resetIntroScreen === "function") resetIntroScreen();
  render();
}

function gotoLocation(locId) {
  ui.selectedLoc = locId;
  ui.view = "map";
  ui.registryDialogue = false;
  const loc = LOCATIONS[locId];
  if (locId === "registry" && !state.flags.registrySceneDone) {
    ui.registryDialogue = true;
    ui.eventText = "登记处柜台前排着稀稀拉拉的人。你凑过去问补登。";
    render();
    return;
  }
  if (locId === "trader") {
    openTrader();
    return;
  } else if (locId === "inn") {
    ui.eventText = "旧旅舍房间。床垫发霉，窗外雨声像计时器。";
  } else {
    ui.eventText = `你来到${loc.name}。${loc.desc}`;
  }
  render();
}

function exploreFromCard(locId) {
  const loc = LOCATIONS[locId];
  const ex = canExploreAtLocation(locId);
  if (!ex.ok) {
    ui.eventText = ex.reason;
    render();
    return;
  }
  ui.selectedLoc = locId;
  if ((loc.actions && loc.actions.length > 1) || LOC_UI[locId]?.hub) {
    gotoLocation(locId);
    return;
  }
  if (loc.explore) {
    const act = loc.actions?.find((a) => a.roll) || { id: "search" };
    if (locId === "back_warehouse") {
      ui.view = "map";
      ui.eventText = `你来到${loc.name}。选择进入方式。`;
      render();
      return;
    }
    startExplore(locId, act.id);
    return;
  }
  gotoLocation(locId);
}

/* ========== UI 呈现层（不改玩法逻辑） ========== */
const STAT_CAP = { food: 30, water: 30, health: 10, clarity: 10 };

const LOC_ZONES = [
  { id: "hostel", title: "旧旅舍区域", locs: ["inn", "hostel_trash", "front_bin", "laundry"] },
  { id: "process", title: "撤离流程", locs: ["registry"] },
  { id: "trade", title: "交易区域", locs: ["trader"] },
  { id: "outer", title: "外部区域", locs: ["dump", "tour_bus", "back_warehouse", "alley"] },
];

const LOC_UI = {
  inn: {
    coreOutput: "吃喝零碎 / 零钱",
    purpose: "太累时歇一歇，顺手翻点能卖的小东西",
    risk: "低",
    yield: "低",
    loot: "空瓶、纸箱、半包饼干、旧衣物、硬币",
    fail: "多半白忙；倒霉时更晕乎",
    hub: true,
    locType: "安全点",
    short: "低收益",
  },
  hostel_trash: {
    coreOutput: "废品 / 食水",
    purpose: "缺吃的喝的、缺零钱时先来这儿",
    risk: "低",
    yield: "低",
    loot: "空瓶、压扁纸箱、半瓶水、饼干、猫罐头、旧衣物",
    fail: "常空手而归；被碎玻璃划伤则更糟",
    exploreLabel: "探索",
  },
  front_bin: {
    coreOutput: "住过的凭据",
    purpose: "登记处要你证明住过这儿时，多翻这里",
    risk: "低",
    yield: "低",
    loot: "旧账本页、入住单残页、房卡、旅舍钥匙牌、前台照片",
    fail: "纸烂了白忙；潮气还可能毁了你刚捡的货",
    exploreLabel: "搜索",
  },
  laundry: {
    coreOutput: "能卖钱的旧物",
    purpose: "手头紧时来碰运气，换点现金",
    risk: "中",
    yield: "中",
    loot: "旧衣物、旧手机、墨镜、破收音机、充电宝、零钱",
    fail: "失物柜容易白忙；烘干机多半只有硬币",
    hub: true,
  },
  registry: {
    coreOutput: "补登撤离",
    purpose: "交钱、交材料，把名字写进系统",
    risk: "—",
    yield: "—",
    loot: "—",
    fail: "—",
    hub: true,
    locType: "流程点",
    short: "补登入口",
  },
  trader: {
    coreOutput: "买卖换钱",
    purpose: "卖掉捡来的破烂，买回水粮和绷带",
    risk: "—",
    yield: "—",
    loot: "—",
    fail: "—",
    hub: true,
    locType: "交易点",
    short: "买卖、临时委托",
  },
  dump: {
    coreOutput: "金属 / 电器",
    purpose: "敢冒险时来，一件好货能换不少钱",
    risk: "中高",
    yield: "高",
    loot: "废金属、铜线、破收音机、充电宝、工具箱、旧相机",
    fail: "容易被划伤；最差还会丢一件货",
    exploreLabel: "探索",
  },
  back_warehouse: {
    coreOutput: "囤货 / 罐头水",
    purpose: "跟老板熟或付钱后才能翻货架",
    risk: "高",
    yield: "高",
    loot: "罐头、大瓶水、胶带、电池，偶尔有应急电池",
    fail: "被逮到会伤身体，老板也不信你了",
    hub: true,
  },
  tour_bus: {
    coreOutput: "行李旧物",
    purpose: "停在路边的旧车，行李箱里常有值钱货",
    risk: "高",
    yield: "高",
    loot: "行李箱、纪念品、墨镜、旧相机、现金、旧地图",
    fail: "车顶铁皮锋利；失手会丢东西",
    exploreLabel: "探索",
  },
  alley: {
    coreOutput: "工具 / 囤货",
    purpose: "猫领路或摸到旧地图后才能找到这儿",
    risk: "中高",
    yield: "特殊",
    loot: "铜线、胶带、电池、罐头、大瓶水，深处偶有应急物资",
    fail: "卷帘门突然落下会受伤，老板也会记仇",
    exploreLabel: "探索",
  },
};

function locRiskLabel(risk) {
  if (risk === "低") return "低风险";
  if (risk === "中") return "中风险";
  if (risk === "中高") return "中高风险";
  if (risk === "高") return "高风险";
  return "";
}

function formatLocSummaryLine(locId) {
  const meta = LOC_UI[locId];
  if (!meta) return "";
  if (meta.locType === "流程点" || meta.locType === "交易点") {
    return `${meta.locType}｜${meta.short || ""}`;
  }
  const core = meta.coreOutput || meta.locType || "拾荒点";
  const r = locRiskLabel(meta.risk);
  let y = "中收益";
  if (meta.yield === "低") y = "低收益";
  else if (meta.yield === "中") y = "中收益";
  else if (meta.yield === "高") y = "高收益";
  else if (meta.yield === "特殊") y = "特殊收益";
  if (meta.risk === "—") return `${core}`;
  return `${core}｜${r}｜${y}`;
}

function getLocMainButton(locId) {
  const meta = LOC_UI[locId];
  const loc = LOCATIONS[locId];
  if (meta?.hub || loc?.npc) {
    return { mode: "goto", label: "进入", btnClass: locId === "inn" ? "btn-rest" : locId === "trader" ? "btn-trade" : "btn-reg" };
  }
  const ex = canExploreAtLocation(locId);
  const label = meta.exploreLabel || "探索";
  let btnClass = "btn-explore";
  if (meta.risk === "高" || meta.risk === "中高") btnClass = "btn-danger";
  return { mode: "explore", label: `${label}｜1行动`, btnClass, disabled: !ex.ok, reason: ex.reason };
}

const PACK_EMPTY = {
  survival: "暂无——目前只有空气和一点不安。",
  sellable: "暂无——还没翻到能换钱的东西。",
  task: "暂无——登记处不会为诚恳开绿灯。",
  lodging: "暂无——你暂时无法证明自己住过这里。",
  tool: "暂无——徒手拾荒，效率和尊严都不高。",
};

const CAT_LABELS = {
  survival: "生存物资",
  sellable: "可卖废品",
  task: "任务物资",
  lodging: "住宿线索",
  tool: "工具",
};

const ITEM_USE_HINT = {
  half_water: "饮水 +1",
  bottled_water: "饮水 +1",
  cracker: "食物 +1",
  crushed_cracker: "食物 +1",
  instant_noodles: "食物 +2，清醒 +1",
  canned_food: "食物 +3，清醒 +1",
  bandage: "健康 +1",
  raincoat: "暴雨探索不再额外吃亏",
  cat_food_can: "喂猫，提升猫信任",
};

const BUY_HINT = {
  half_water: "饮水 +1",
  bottled_water: "饮水 +1",
  cracker: "食物 +1",
  instant_noodles: "食物 +2",
  canned_food: "食物 +3",
  bandage: "健康 +1",
  raincoat: "防暴雨",
  gloves: "探索判定 +2",
  flashlight: "探索判定 +2",
  tape: "探索判定 +2",
  battery: "探索判定 +2",
  emergency_battery: "撤离配额材料",
};

function getWeatherLabel() {
  if (state.weather === "storm") return "暴雨";
  if (state.weather === "rainy") return "小雨";
  return "阴天";
}

function getTraderPriceLabel() {
  const m = getTraderPriceMultiplier();
  if (m < 1) return "九折";
  if (m > 1) return "加价";
  return "原价";
}

function getBuyHintForItem(id) {
  if (!state.flags.revealedStage3 && TRADER_BUY_LATE.includes(id)) {
    return "登记处后续可能需要的物资";
  }
  return BUY_HINT[id] || ITEMS[id]?.desc || "生活或登记用";
}

function rollTierDisplay(tier) {
  const map = {
    crit_fail: "大失败",
    fail: "失败",
    low: "小成功",
    mid: "成功",
    high: "好收获",
    crit: "大成功",
  };
  return map[tier] || tier;
}

function getStatStatus(key, val) {
  const warn = val <= 2;
  const map = {
    food: [
      [10, "还能撑好几天"],
      [5, "还能撑一两顿"],
      [2, "再不吃就要慌了"],
      [0, "胃里空得发响"],
    ],
    water: [
      [10, "口不渴"],
      [5, "口有点干"],
      [2, "缺水比缺钱更快让人低头"],
      [0, "嗓子像砂纸"],
    ],
    health: [
      [8, "还能折腾"],
      [5, "得悠着点"],
      [2, "你的身体是最后一件不能卖掉的资产"],
      [0, "站不稳了"],
    ],
    clarity: [
      [8, "脑子尚可运转"],
      [5, "有点恍惚"],
      [2, "你开始把每个塑料瓶都看成小额钞票"],
      [0, "分不清通知和梦话"],
    ],
    money: [
      [500, "兜里还算鼓"],
      [200, "得精打细算"],
      [50, "硬币声都听得见"],
      [0, "身无分文"],
    ],
  };
  const rows = map[key];
  for (const [threshold, text] of rows) {
    if (val >= threshold) return warn && val <= 2 ? text : text;
  }
  return rows[rows.length - 1][1];
}

function getMoneyGoalHint() {
  if (!state.flags.registrySceneDone) return "先前往登记处了解流程";
  const p = state.registrationProgress;
  if (p >= 3) return "已具备通行资格，撑到第 7 日即可";
  if (p === 2 && state.flags.revealedStage3) {
    if (state.money >= 1000) return "现金已够配额";
    return `离当前目标还差约 ${Math.max(0, 1000 - state.money)} 金钱`;
  }
  if (p === 1 && state.flags.revealedStage2) {
    const parts = [];
    if (!hasLodgingClue()) parts.push(`住宿线索（${countLodgingClues()}/2）`);
    if (state.money < 100) {
      parts.push(`${Math.max(0, 100 - state.money)} 金钱`);
    }
    return parts.length ? `离当前目标还差：${parts.join("、")}` : "材料齐，可去登记处提交";
  }
  if (state.flags.registrySceneDone && p === 0) {
    const short = Math.max(0, 300 - state.money);
    return short > 0 ? `离当前目标还差 ${short} 金钱` : "可申请费已够，可去登记处提交";
  }
  return "先前往登记处";
}

function getCurrentTaskData() {
  const p = state.registrationProgress;
  if (p >= 3) {
    return {
      phase: "等待最终撤离",
      body: "你已获得撤离资格。请撑到第七日最终撤离。",
      rec: "休息 / 准备食物和饮水",
    };
  }
  if (p === 2 && state.flags.revealedStage3) {
    return {
      phase: "撤离配额",
      body: "住宿核验已通过。最后需要补齐撤离配额。",
      need: "见登记处清单（任选其一）",
      extra: getRegStageMissing(3)[0] || "",
      rec: "垃圾集中点 / 后巷 / 交易小店",
    };
  }
  if (p === 1 && state.flags.revealedStage2) {
    const lodgingOk = hasLodgingClue();
    const moneyOk = state.money >= 100;
    return {
      phase: "住宿核验",
      body: "临时申请已受理。登记处要两份能证明你住过这里的材料，再加核验费。",
      need: "住宿线索 ×2 + 核验费 100 金钱",
      extra: !lodgingOk
        ? `还差：住宿线索（${countLodgingClues()}/2）`
        : !moneyOk
          ? `还差：核验费 ${100 - state.money} 金钱`
          : "",
      rec: "前台废纸篓",
    };
  }
  if (state.flags.registrySceneDone && p === 0) {
    const short = Math.max(0, 300 - state.money);
    return {
      phase: "临时申请",
      body: "登记处要求先交临时申请费。",
      need: "300 金钱",
      current: `${state.money} 金钱`,
      short: short > 0 ? `${short} 金钱` : null,
      rec: "旅舍垃圾桶 / 洗衣房 / 交易小店变现",
    };
  }
  return {
    phase: "确认补登流程",
    body: "你还不清楚补登需要多少钱、材料和步骤。先去登记处问清楚。",
    rec: "进入登记处",
  };
}

function renderTaskProgressDots() {
  if (!state.flags.registrySceneDone) return "";
  const p = state.registrationProgress;
  const steps = [];
  if (knowsRegStage(1)) {
    steps.push({ mark: "①", label: "临时申请", done: p >= 1, now: p < 1 });
  }
  if (knowsRegStage(2)) {
    steps.push({ mark: "②", label: "住宿核验", done: p >= 2, now: p === 1 });
  }
  if (knowsRegStage(3)) {
    steps.push({ mark: "③", label: "撤离配额", done: p >= 3, now: p === 2 });
  }
  if (!steps.length) return "";
  const html = steps
    .map((s) => {
      let cls = "task-step";
      if (s.done) cls += " done";
      else if (s.now) cls += " now";
      return `<span class="${cls}">${s.mark} ${s.label}</span>`;
    })
    .join("");
  return `<div class="task-progress"><span class="task-progress-label">补登流程</span>${html}</div>`;
}

function getRegStageMissing(n) {
  if (!knowsRegStage(n)) return [];
  if (n === 1) {
    const s = Math.max(0, 300 - state.money);
    return s > 0 ? [`缺少：${s} 金钱`] : [];
  }
  if (n === 2) {
    const m = [];
    const needLodging = Math.max(0, 2 - countLodgingClues());
    if (needLodging > 0) m.push(`缺少：住宿线索 ×${needLodging}（当前 ${countLodgingClues()}/2）`);
    if (state.money < 100) {
      m.push(`缺少：核验费 ${Math.max(0, 100 - state.money)} 金钱`);
    }
    return m;
  }
  if (n === 3) {
    const met = [];
    if (state.money >= 1000) met.push("1000 金钱");
    if (countItem("emergency_battery") >= 2) met.push("应急电池×2");
    if (state.water >= 20) met.push("饮水≥20");
    if (state.food >= 20) met.push("食物≥20");
    if (met.length) return [];
    return [`缺少：任选其一——${REG_STAGE3_OPTIONS.map((o) => o.label).join("；")}`];
  }
  return [];
}

function showRegToast(stage) {
  const titles = {
    1: "临时申请已受理",
    2: "住宿核验已通过",
    3: "撤离通行资格已签发",
  };
  const bodies = {
    1: "阶段已完成。登记处会说明下一步；也可继续拾荒变现。",
    2: "阶段已完成。可前往登记处了解撤离配额要求。",
    3: "阶段已完成。请撑到第 7 日，前往登记处撤离。",
  };
  ui.toast = {
    title: titles[stage] || "登记更新",
    body: bodies[stage] || "可前往登记处查看当前要求。",
  };
}

function dismissToast() {
  ui.toast = null;
  render();
}

function getOpeningDayNarrative() {
  return `旅舍空荡，前台没人。

你的手机没有电。前台的灯还亮着，呼叫铃旁边放着一张白纸。

「突发暴雨，未来七日存在山洪风险。未完成撤离登记的人员，请前往撤离登记处。第七日后，本区将整体封闭。」

你翻了翻口袋：${state.money} 金钱，一台没电的手机，几份食物和水。`;
}

function getRegistryDialogueText() {
  return `登记员看了看屏幕，又看了看你。

「可以补登。先交临时申请费，300。」

你问钱从哪里来。

她把一张便条推过来，上面写着：交易小店。`;
}

function handleRegistryDialogue() {
  state.flags.registrySceneDone = true;
  ui.registryDialogue = false;
  ui.selectedLoc = null;
  ui.view = "map";
  syncUnlocks();
  ui.eventText =
    "登记员合上便条：「卖完再来。流程按顺序走，别插队。」\n\n你记住了：需要先凑够 300 金钱。拾荒物可以拿去交易小店卖掉。";
  addLog("登记员告知临时申请费 300，并说明拾荒物可在交易小店出售。", "登记");
  render();
}

function canExploreAtLocation(locId) {
  if (state.actionsLeft <= 0) return { ok: false, reason: "本时段行动已用完" };
  const loc = LOCATIONS[locId];
  if (!loc) return { ok: false, reason: "未知地点" };
  const isNight = state.timeSlot === "night";
  if (loc.highRisk && isNight && !canNightHighRisk()) {
    return { ok: false, reason: "健康过低，不宜夜间高风险探索" };
  }
  if (locId === "back_warehouse" && state.traderTrust < 2 && !state.flags.paidWarehouse) {
    return { ok: false, reason: "需交易者信任≥2 或付费 100 进入" };
  }
  return { ok: true, reason: "" };
}

function getSubmitDisabledReason(stage) {
  const p = state.registrationProgress;
  if (stage === 1) {
    if (p !== 0) return "已完成";
    if (state.money < 300) {
      return `材料不足。\n还差：${300 - state.money} 金钱。\n可通过拾荒并卖给交易小店获得金钱。`;
    }
    if (state.actionsLeft <= 0) return "本时段行动已用完";
    return "";
  }
  if (stage === 2) {
    if (p !== 1) return "请先完成阶段1";
    if (!hasLodgingClue()) {
      return `材料不足。\n缺少：住宿线索（当前 ${countLodgingClues()}/2）。\n主要地点：前台废纸篓。`;
    }
    if (state.money < 100) {
      return `材料不足。\n还差：核验费 ${100 - state.money} 金钱。\n可通过拾荒、交易小店出售获得。`;
    }
    if (state.actionsLeft <= 0) return "本时段行动已用完";
    return "";
  }
  if (stage === 3) {
    if (p !== 2) return "请先完成阶段2";
    const ok =
      state.money >= 1000 ||
      countItem("emergency_battery") >= 2 ||
      state.water >= 20 ||
      state.food >= 20;
    if (!ok) {
      return `材料不足。\n任选其一提交：\n${formatRegStage3OptionsList()}`;
    }
    if (state.actionsLeft <= 0) return "本时段行动已用完";
    return "";
  }
  return "";
}

function getRegRequirementsBrief() {
  const p = state.registrationProgress;
  if (!state.flags.registrySceneDone) {
    return "登记员尚未说明完整流程。请先完成首次对话。";
  }
  if (p >= 3) {
    return "补登流程已完成。你已具备撤离通行资格，请撑到第 7 日。";
  }
  if (p === 2 && knowsRegStage(3)) {
    return (
      "当前阶段：撤离配额。\n任选其一提交：\n" +
      formatRegStage3OptionsList() +
      "\n\n" +
      getRegStageMissing(3).join("\n")
    );
  }
  if (p === 1 && knowsRegStage(2)) {
    return (
      "当前阶段：住宿核验。\n需要：住宿线索 ×2（提交时收走）+ 核验费 100 金钱。\n\n" +
      getRegStageMissing(2).join("\n")
    );
  }
  if (knowsRegStage(1)) {
    const short = Math.max(0, 300 - state.money);
    return `当前阶段：临时申请。\n需要：300 金钱。\n当前：${state.money} 金钱。${short > 0 ? `\n还差：${short} 金钱。` : "\n材料已齐，可提交。"}`;
  }
  return "登记处会按顺序说明各阶段要求。";
}

function formatJournalLine(raw) {
  const m = raw.match(/^\[第(\d+)日 (上午|下午|夜晚)｜(.+?)\]\s*(.*)$/);
  if (!m) return raw;
  return `<span class="log-day">第${m[1]}日 ${m[2]}</span> <span class="log-type">${m[3]}</span> ${m[4]}`;
}

function renderBtn(label, actionId, disabled, reason, variant = "action") {
  const dis = disabled ? "disabled" : "";
  const hint = disabled && reason ? `<span class="btn-hint">${reason.replace(/\n/g, "<br>")}</span>` : "";
  const cls = dis ? "" : `btn-${variant}`;
  return `<button type="button" class="btn btn-game btn-block ${cls}" data-action="${actionId}" ${dis}>${label}</button>${hint}`;
}

function renderRollOutcomeBanner(o) {
  const mods = o.mods.map((m) => `${m.label}${m.value > 0 ? "+" : ""}${m.value}`).join("，") || "无";
  const loot = o.lootLines?.length ? o.lootLines.join("；") : "无额外获得";
  return `
    <div class="roll-outcome-banner ${tierClass(o.tier)}">
      <div class="rob-title">D20 判定 · ${rollTierDisplay(o.tier)}</div>
      <div class="rob-grid">
        <span>原始 ${o.raw}</span>
        <span>修正 ${mods}</span>
        <span>最终 ${o.final}</span>
      </div>
      <div class="rob-loot">${loot}</div>
    </div>`;
}

/* ========== 渲染 ========== */
function render() {
  const root = document.getElementById("app");
  if (!root) return;
  if (state) syncUnlocks();

  if (ui.screen === "intro") {
    showIntroScreen();
    return;
  }
  hideIntroScreen();
  if (ui.screen === "ending") {
    root.innerHTML = renderEnding();
    bindEnding();
    return;
  }
  root.innerHTML = renderGame();
  bindGame();
}

function renderEnding() {
  const e = ENDINGS[ui.endingId];
  return `
    <section class="screen active ending-card panel">
      <div class="pixel-art" style="font-size:3rem">${e.art}</div>
      <h2 class="ending-title">${e.title}</h2>
      <p>${ENDING_TEXT[ui.endingId]}</p>
      <p><em>第 ${state.day} 天 · 登记进度 ${state.registrationProgress}/3 · 余钱 ${state.money}</em></p>
      <button type="button" class="btn btn-primary btn-block" id="btn-restart">重新开始</button>
    </section>`;
}

function slotBar() {
  const order = ["morning", "afternoon", "night"];
  return `<div class="slots-bar">${order
    .map((s) => {
      const idx = order.indexOf(state.timeSlot);
      const si = order.indexOf(s);
      let cls = "slot-pip";
      if (si < idx) cls += " used";
      if (si === idx) cls += " now";
      return `<div class="${cls}"></div>`;
    })
    .join("")}</div>`;
}

function renderRegForm() {
  if (!state.flags.registrySceneDone) {
    return `<p class="reg-unknown">尚未取得补登流程信息。请先前往登记处。</p>`;
  }
  const p = state.registrationProgress;
  let html = "";
  if (knowsRegStage(1)) {
    const done1 = p >= 1;
    const miss1 = done1 ? [] : getRegStageMissing(1);
    html += `
      <div class="reg-check ${done1 ? "done" : p === 0 ? "current" : ""}">
        <div class="reg-check-head">${done1 ? "☑" : "□"} 阶段 1：临时申请${done1 ? "已受理" : ""}</div>
        <div class="reg-check-req">要求：300 金钱</div>
        ${miss1.length ? `<div class="reg-check-miss">${miss1.join("<br>")}</div>` : ""}
        ${p === 0 ? '<div class="reg-next-hint">下一阶段：待登记处说明</div>' : ""}
      </div>`;
  }
  if (knowsRegStage(2)) {
    const done2 = p >= 2;
    const miss2 = done2 ? [] : getRegStageMissing(2);
    html += `
      <div class="reg-check ${done2 ? "done" : p === 1 ? "current" : ""}">
        <div class="reg-check-head">${done2 ? "☑" : "□"} 阶段 2：住宿核验${done2 ? "通过" : ""}</div>
        <div class="reg-check-req">要求：住宿线索 ×2（提交收走）+ 核验费 100 金钱</div>
        ${miss2.length ? `<div class="reg-check-miss">${miss2.join("<br>")}</div>` : ""}
        ${p < 2 && !state.flags.revealedStage3 ? '<div class="reg-next-hint">下一阶段：待核验后说明</div>' : ""}
      </div>`;
  }
  if (knowsRegStage(3)) {
    const done3 = p >= 3;
    const miss3 = done3 ? [] : getRegStageMissing(3);
    html += `
      <div class="reg-check ${done3 ? "done" : p === 2 ? "current" : ""}">
        <div class="reg-check-head">${done3 ? "☑" : "□"} 阶段 3：撤离配额${done3 ? "已补齐" : ""}</div>
        <div class="reg-check-req">要求：1000 金钱 / 应急电池×2 / 饮水≥20 / 食物≥20 / 医疗包 / 两箱瓶装水×1 / 物资押金凭条（任选其一）</div>
        ${miss3.length ? `<div class="reg-check-miss">${miss3.join("<br>")}</div>` : ""}
      </div>`;
  }
  return html || `<p class="reg-unknown">审核单等待登记处填写。</p>`;
}

function renderStatsRow() {
  const stats = [
    { key: "food", label: "食物", val: state.food, max: STAT_CAP.food },
    { key: "water", label: "饮水", val: state.water, max: STAT_CAP.water },
    { key: "health", label: "健康", val: state.health, max: STAT_CAP.health },
    { key: "clarity", label: "清醒", val: state.clarity, max: STAT_CAP.clarity },
    { key: "money", label: "金钱", val: state.money, max: null },
  ];
  return stats
    .map((s) => {
      const low = s.max ? s.val <= 5 : s.val < 200;
      const status = s.key === "money" ? getMoneyGoalHint() : getStatStatus(s.key, s.val);
      const maxTxt = s.max ? `<span class="stat-max">/${s.max}</span>` : "";
      return `
      <div class="stat-card ${low ? "warn" : ""}">
        ${low ? '<span class="stat-warn-icon" aria-hidden="true">!</span>' : ""}
        <div class="stat-label">${s.label}</div>
        <div class="stat-val">${s.val}${maxTxt}</div>
        <div class="stat-status">${status}</div>
      </div>`;
    })
    .join("");
}

function getSceneTimeLabel() {
  return `第 ${state.day} 日 ${GAME.slotNames[state.timeSlot]}`;
}

/** 当前场景主叙事（不含历史日志） */
function getCurrentSceneNarrative() {
  if (ui.registryDialogue) return getRegistryDialogueText();
  if (ui.view === "trader" && ui.traderPanel === "water_offer") {
    return getWaterQuestSceneText();
  }
  if (ui.view === "trader" && !state.flags.traderIntroDone) {
    return getTraderIntroText();
  }
  if (ui.view === "trader") {
    return (
      ui.eventText ||
      "交易小店的卷帘门半开着。柜台后的交易者盯着计算器，门口的泡水纸箱还在滴水。"
    );
  }
  if (ui.view === "registry") {
    return ui.eventText || "撤离登记处。柜台后的屏幕亮着，排队的人很少，表格却很清楚。";
  }
  if (ui.view === "roll_prepare") {
    return ui.eventText || "你打量着眼前的地方，盘算这次行动值不值得。";
  }
  if (ui.view === "rolling") {
    return ui.eventText || "骰子在掌心里磕碰，结果还没落定。";
  }
  if (ui.view === "roll_result") {
    return ui.eventText || "你等着这一次判定落下。";
  }
  if (ui.eventText) return ui.eventText;
  if (state.day === 1 && state.timeSlot === "morning" && ui.view === "map" && !ui.selectedLoc) {
    return getOpeningDayNarrative();
  }
  return dayIntro() || "临时撤离区的又一时段开始了。";
}

function renderCurrentSceneCard() {
  const narrative = getCurrentSceneNarrative().replace(/\n/g, "<br>");
  const result =
    ui.rollOutcome && ui.view === "map" ? renderRollOutcomeBanner(ui.rollOutcome) : "";
  return `
    <section class="scene-card panel" aria-labelledby="scene-heading">
      <header class="scene-card-head">
        <h2 id="scene-heading" class="scene-heading">当前场景</h2>
        <span class="scene-time">${getSceneTimeLabel()}</span>
      </header>
      <div class="scene-body prose">${narrative}</div>
      ${result}
    </section>`;
}

function renderCurrentTaskCard() {
  // 保留原函数（registry 视图里可能用），map 主界面不再使用
  const t = getCurrentTaskData();
  let facts = "";
  if (t.need) {
    facts += `<div class="task-fact"><span>需要</span><strong>${t.need}</strong></div>`;
  }
  if (t.current) {
    facts += `<div class="task-fact"><span>当前</span><strong>${t.current}</strong></div>`;
  }
  if (t.short) {
    facts += `<div class="task-fact task-fact-warn"><span>还差</span><strong>${t.short}</strong></div>`;
  }
  if (t.extra) {
    facts += `<div class="task-fact task-fact-warn"><span>提示</span><strong>${t.extra}</strong></div>`;
  }
  const meta =
    state.flags.registrySceneDone && (state.traderTrust !== 0 || state.flags.metCat)
      ? `<p class="task-meta">交易者信任 ${state.traderTrust}${state.flags.metCat ? ` · 猫 ${state.catTrust}` : ""}</p>`
      : "";

  return `
    <section class="task-card" aria-labelledby="task-heading">
      <h2 class="task-heading" id="task-heading">当前任务<span class="task-phase">｜${t.phase}</span></h2>
      <p class="task-body">${t.body}</p>
      ${facts ? `<div class="task-facts">${facts}</div>` : ""}
      ${renderTaskProgressDots()}
      ${meta}
    </section>`;
}

// 推荐地点解析：t.rec 字符串 → locId
function getRecLocIdForCurrentTask() {
  const t = getCurrentTaskData();
  const recText = t.rec || "";
  if (recText.includes("登记处")) return "registry";
  if (recText.includes("前台废纸篓") || recText.includes("前台")) return "front_bin";
  if (recText.includes("垃圾桶")) return "hostel_trash";
  if (recText.includes("洗衣房")) return "laundry";
  if (recText.includes("交易小店") || recText.includes("交易")) return "trader";
  if (recText.includes("垃圾集中点") || recText.includes("集中点")) return "dump";
  if (recText.includes("后巷")) return "alley";
  if (recText.includes("巴士")) return "tour_bus";
  return null;
}

// 紧凑版当前目标区（map 主界面顶部，≤70px）
function renderCurrentGoal() {
  const t = getCurrentTaskData();
  const recText = t.rec || "";

  // 资料/金钱进度
  const progressBits = [];
  if (t.need) progressBits.push(t.need);
  if (t.current && t.need) progressBits.push(`当前：${t.current}`);
  if (t.short) progressBits.push(t.short);
  if (t.extra && !t.short) progressBits.push(t.extra);
  const progress = progressBits.length ? progressBits.join(" · ") : "";

  return `
    <section class="current-goal" aria-labelledby="goal-heading">
      <div class="goal-row">
        <span class="goal-label">当前目标</span>
        <span class="goal-phase" id="goal-heading">${t.phase}</span>
        <span class="goal-body">${t.body}</span>
      </div>
      <div class="goal-row goal-row-rec">
        ${recText ? `<span class="goal-rec">推荐地点：<strong>${recText}</strong></span>` : ""}
        ${progress ? `<span class="goal-progress">${progress}</span>` : ""}
      </div>
    </section>`;
}

function renderStatsCompact() {
  const stats = [
    { key: "food", label: "食物", val: state.food, max: STAT_CAP.food },
    { key: "water", label: "饮水", val: state.water, max: STAT_CAP.water },
    { key: "health", label: "健康", val: state.health, max: STAT_CAP.health },
    { key: "clarity", label: "清醒", val: state.clarity, max: STAT_CAP.clarity },
    { key: "money", label: "金钱", val: state.money, max: null },
  ];
  const cells = stats
    .map((s) => {
      const low = s.max ? s.val <= 5 : s.val < 200;
      const hint = getStatStatus(s.key, s.val);
      const maxTxt = s.max ? `/${s.max}` : "";
      return `
        <div class="stat-mini ${low ? "warn" : ""}">
          <span class="stat-mini-label">${s.label}</span>
          <span class="stat-mini-val">${s.val}${maxTxt}</span>
          <span class="stat-mini-hint">${hint}</span>
        </div>`;
    })
    .join("");
  return `
    <section class="panel stats-compact" aria-labelledby="stats-heading">
      <h3 class="side-head" id="stats-heading">状态</h3>
      <div class="stats-compact-grid">${cells}</div>
    </section>`;
}

const PACK_EMPTY_SHORT = {
  survival: "暂无",
  sellable: "暂无",
  task: "暂无",
  lodging: "暂无",
  tool: "暂无",
};

function renderInventoryCompact() {
  const lines = INV_TABS.map((tab) => {
    const ids = Object.keys(state.inventory).filter((id) => ITEMS[id]?.category === tab.id);
    if (!ids.length) {
      return `<div class="pack-line is-empty"><span>${tab.label}</span><em>${PACK_EMPTY_SHORT[tab.id]}</em></div>`;
    }
    const summary = ids.map((id) => `${ITEMS[id].name}×${state.inventory[id]}`).join("、");
    const useBtns = ids
      .filter((id) => ITEMS[id].usable)
      .map(
        (id) =>
          `<button type="button" class="btn btn-xs" data-use="${id}">${ITEMS[id].name}</button>`
      )
      .join("");
    return `<div class="pack-line"><span class="pack-cat">${tab.label}</span><span class="pack-items">${summary}</span>${useBtns ? `<span class="pack-uses">${useBtns}</span>` : ""}</div>`;
  }).join("");

  return `
    <section class="panel pack-compact" aria-labelledby="pack-heading">
      <h3 class="side-head" id="pack-heading">背包</h3>
      <div class="pack-compact-list">${lines}</div>
    </section>`;
}

function renderMainActionView() {
  if (ui.view === "roll_result" && !ui.pendingRoll) {
    ui.view = "map";
    ui.selectedLoc = null;
  }
  if (ui.view === "roll_prepare") return renderRollPrepare();
  if (ui.view === "rolling") return renderRolling();
  if (ui.view === "roll_result") return renderRollResult();
  if (ui.view === "trader") return renderTrader();
  if (ui.view === "registry") return renderRegistryPanel();
  return renderMapActionArea();
}

function renderToast() {
  if (!ui.toast) return "";
  return `
    <div class="toast-overlay" id="toast-overlay">
      <div class="toast-card">
        <h3>${ui.toast.title}</h3>
        <p>${ui.toast.body}</p>
        <button type="button" class="btn btn-primary btn-block" id="btn-toast-ok">知道了</button>
      </div>
    </div>`;
}

function renderEvacBar() {
  const daysLeft = GAME.totalDays - state.day + 1;
  const weatherLabel = getWeatherLabel();
  const urgent = daysLeft <= 2;
  // 证件状态：是否已找到住过凭据
  const docStatus = state.flags.lodgingVerified ? "已核验" : (state.registrationProgress >= 1 ? "部分" : "无");
  // 担保状态：交易者信任 ≥ 2 / 猫信任 ≥ 2 / 无
  const guaStatus = state.traderTrust >= 2 ? "交易者" : (state.catTrust >= 2 ? "野猫" : "无");

  return `
    <header class="evac-bar ${urgent ? "urgent" : ""}">
      <div class="evac-bar-top">
        <h1 class="game-title">拾荒记：撤离</h1>
        <span class="site-tag">异国旧旅舍 · 临时撤离区</span>
      </div>
      <div class="evac-status-strip">
        <span>Day <strong>${state.day}</strong>/${GAME.totalDays}</span>
        <span class="sep">｜</span>
        <span>${GAME.slotNames[state.timeSlot]}</span>
        <span class="sep">｜</span>
        <span class="strip-actions">行动 <strong>${state.actionsLeft}</strong>/${GAME.slotsPerDay}</span>
        <span class="sep">｜</span>
        <span class="strip-weather">天气：<strong>${weatherLabel}</strong></span>
        <span class="sep">｜</span>
        <span>¥<strong>${state.money}</strong></span>
        <span class="sep">｜</span>
        <span>证件：<strong>${docStatus}</strong></span>
        <span class="sep">｜</span>
        <span>担保：<strong>${guaStatus}</strong></span>
      </div>
      ${urgent ? `<div class="evac-deadline-banner">⚠ 距离最终撤离还有 <strong>${daysLeft}</strong> 天</div>` : ""}
      ${slotBar()}
    </header>`;
}

function renderGame() {
  // 决定当前是不是子视图（roll 流程 / trader / registry 替换主舞台）
  const subViews = ["roll_prepare", "rolling", "roll_result", "trader", "registry"];
  const isSub = subViews.includes(ui.view);

  return `
    <div class="game-shell">
      ${renderEvacBar()}
      ${isSub ? "" : renderCurrentGoal()}
      ${isSub
        ? `<div class="action-zone">${renderMainActionView()}</div>`
        : `
          <div class="map-stage">
            ${renderSchematicMap()}
            ${renderMapDetailCard()}
          </div>
          ${renderMapInteractStrip()}
          ${renderBottomSummary()}
        `}
      ${isSub ? renderBottomSummary() : ""}
      ${renderMiniEventModal()}
      ${renderToast()}
    </div>`;
}

function renderMiniEventModal() {
  if (!ui.miniEvent) return "";
  const evt = ui.miniEvent;
  return `
    <div class="mini-event-backdrop">
      <div class="mini-event-modal panel">
        <h3 class="panel-head">${evt.title}</h3>
        <p class="mini-event-narrative">${evt.narrative.replace(/\n/g, "<br>")}</p>
        <div class="mini-event-actions">
          <button type="button" class="btn btn-game btn-primary btn-block" id="btn-mini-event-accept">去看看</button>
          <button type="button" class="btn btn-block" id="btn-mini-event-skip">忽略</button>
        </div>
      </div>
    </div>`;
}

function renderLocationDetail(locId) {
  const meta = LOC_UI[locId];
  if (!meta) return "";
  const rows = [];
  if (meta.coreOutput && meta.coreOutput !== "—") {
    rows.push(`<div><dt>核心产出</dt><dd>${meta.coreOutput}</dd></div>`);
  }
  if (meta.purpose) rows.push(`<div><dt>适合用途</dt><dd>${meta.purpose}</dd></div>`);
  if (meta.loot && meta.loot !== "—") rows.push(`<div><dt>可能获得</dt><dd>${meta.loot}</dd></div>`);
  if (meta.fail && meta.fail !== "—") {
    rows.push(`<div><dt>失败风险</dt><dd>${meta.fail}</dd></div>`);
  }
  if (!rows.length) return "";
  return `<dl class="map-loc-detail-body">${rows.join("")}</dl>`;
}

function renderLocationRow(locId) {
  const meta = LOC_UI[locId];
  const name = LOCATIONS[locId].name;
  const summary = formatLocSummaryLine(locId);
  const main = getLocMainButton(locId);
  const expanded = ui.expandedLocDetail === locId;
  const actionAttr = main.mode === "goto" ? `data-goto-loc="${locId}"` : `data-explore-loc="${locId}"`;
  const dis = main.disabled ? "disabled" : "";

  return `
    <li class="map-loc-row ${expanded ? "is-open" : ""}">
      <div class="map-loc-main">
        <div class="map-loc-text">
          <span class="map-loc-name">${name}</span>
          <span class="map-loc-summary">${summary}</span>
        </div>
        <div class="map-loc-actions">
          <button type="button" class="btn btn-map-act ${main.btnClass}" ${actionAttr} ${dis}>${main.label}</button>
          <button type="button" class="btn btn-map-detail" data-loc-detail="${locId}" aria-expanded="${expanded}">${expanded ? "收起" : "详情"}</button>
        </div>
      </div>
      ${main.disabled && main.reason ? `<p class="map-loc-hint">${main.reason}</p>` : ""}
      ${expanded ? `<div class="map-loc-detail">${renderLocationDetail(locId)}</div>` : ""}
    </li>`;
}

// ===== Schematic 旧纸地图（vintage paper 风格） =====
// 替换原 renderZoneMap 列表视图
function renderSchematicMap() {
  // 连线 SVG 路径（手绘风：从源点向目标点画一条带轻微弧度的折线）
  // 只画"两个端点都已解锁"的连线（让玩家清楚知道当前可走的路径）
  const linksHtml = MAP_LINKS.map(([a, b]) => {
    const na = MAP_NODES[a]; const nb = MAP_NODES[b];
    if (!na || !nb) return "";
    const ax = na.x, ay = na.y, bx = nb.x, by = nb.y;
    const aUnlocked = isLocationUnlocked(a);
    const bUnlocked = isLocationUnlocked(b);
    // 任一端未解锁就不画（保持画面干净）
    if (!aUnlocked || !bUnlocked) return "";
    // 中点偏移做轻微弧度
    const mx = (ax + bx) / 2 + (Math.abs(by - ay) > 60 ? 0 : (by > ay ? 12 : -12));
    const my = (ay + by) / 2;
    return `<path class="map-link" d="M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}" />`;
  }).join("");

  // 节点 HTML（位置用 % 对应 viewBox 1000×680）
  // 推荐地点：根据当前 task 的 rec 字段决定
  const recNodeLocId = getRecLocIdForCurrentTask();
  const nodesHtml = Object.entries(MAP_NODES).map(([locId, n]) => {
    const unlocked = isLocationUnlocked(locId);
    const selected = ui.selectedLoc === locId;
    const recommended = recNodeLocId === locId && unlocked && !selected;
    const highRisk = !!LOCATIONS[locId]?.highRisk && unlocked;
    const cls = [
      "map-node",
      unlocked ? "is-unlocked" : "is-locked",
      selected ? "is-selected" : "",
      recommended ? "is-recommended" : "",
      highRisk ? "is-highrisk" : "",
      n.type === "hub" ? "is-hub" : "is-side",
    ].filter(Boolean).join(" ");
    const lockReason = unlocked ? "" : getMapLockReason(locId);
    const leftPct = (n.x / 1000) * 100;
    const topPct = (n.y / 680) * 100;
    return `
      <button type="button" class="${cls}" data-loc-id="${locId}" style="left:${leftPct}%; top:${topPct}%;" ${unlocked ? "" : "disabled aria-disabled=\"true\""}>
        <span class="map-node-paper">
          <span class="map-node-name">${unlocked ? n.label : "?"}</span>
          <span class="map-node-sub">${unlocked ? n.sub : lockReason || "未开放"}</span>
        </span>
      </button>`;
  }).join("");

  return `
    <div class="panel schematic-map">
      <h3 class="panel-head">撤离区地图</h3>
      <p class="map-panel-hint">点节点查看地点详情；可点击的节点会高亮。</p>
      <div class="schematic-canvas">
        <div class="schematic-bg">${MAP_BG_SVG}</div>
        <svg class="schematic-svg" viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g class="schematic-links">${linksHtml}</g>
        </svg>
        <div class="schematic-nodes">${nodesHtml}</div>
      </div>
    </div>`;
}

// 节点详情卡（右侧统一档案卡，不撕纸边）
function renderMapDetailCard() {
  if (!ui.selectedLoc || !LOCATIONS[ui.selectedLoc]) {
    // 未选节点时显示当前场景叙事 + 默认引导
    const narrative = (getCurrentSceneNarrative() || "").replace(/\n/g, "<br>");
    return `
      <aside class="archive-card archive-card-empty">
        <header class="archive-head">
          <span class="archive-tag">第 ${state.day} 日 ${GAME.slotNames[state.timeSlot]}</span>
        </header>
        <p class="archive-narrative">${narrative || "你站在旅舍的走廊里。点击地图上的节点，查看可以做什么。"}</p>
        <p class="archive-hint">← 点击地图上的地点</p>
      </aside>`;
  }
  const locId = ui.selectedLoc;
  const loc = LOCATIONS[locId];
  const ui_meta = LOC_UI[locId] || {};
  const node = MAP_NODES[locId];
  const narrative = (getCurrentSceneNarrative() || "").replace(/\n/g, "<br>");

  // 风险标签
  const risk = ui_meta.risk || "—";
  const yieldLvl = ui_meta.yield || "—";
  const failText = ui_meta.fail || "—";
  const lootText = ui_meta.loot || "—";
  const coreText = ui_meta.coreOutput || "—";
  const purposeText = ui_meta.purpose || loc.desc || "";

  // 行动按钮
  const actionBtns = (loc.actions || []).map((a) => {
    const rollAttr = a.roll ? `data-roll-loc="${locId}" data-roll-action="${a.id}"` : `data-action-loc="${locId}" data-action-id="${a.id}"`;
    return `<button type="button" class="archive-btn" ${rollAttr}>${a.label}</button>`;
  }).join("");

  // 自定义 roll 的地点（无 actions 数组但有 explore）也加一个"探索"按钮
  let extraBtns = "";
  if (!loc.actions && loc.explore) {
    extraBtns = `<button type="button" class="archive-btn" data-roll-loc="${locId}" data-roll-action="search">探索</button>`;
  }
  if (locId === "registry") {
    extraBtns += `<button type="button" class="archive-btn" data-action-loc="${locId}" data-action-id="register">前往登记</button>`;
  }
  if (locId === "trader") {
    extraBtns += `<button type="button" class="archive-btn" data-action-loc="${locId}" data-action-id="open_trader">进入小店</button>`;
  }
  if (locId === "port" && state.fishermanTrust < 5) {
    const dis = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    extraBtns += `<button type="button" class="archive-btn" data-action-loc="${locId}" data-action-id="fisherman_quest" ${dis ? "disabled" : ""}>找老张搬浮木｜D20｜1 行动</button>`;
  }
  if (locId === "rooftop" && state.photographerTrust < 5) {
    const dis = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    extraBtns += `<button type="button" class="archive-btn" data-action-loc="${locId}" data-action-id="photographer_quest" ${dis ? "disabled" : ""}>帮范老师取镜头｜D20｜1 行动</button>`;
  }
  if (locId === "rescue_tent" && state.volunteerTrust < 5) {
    const dis = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    extraBtns += `<button type="button" class="archive-btn" data-action-loc="${locId}" data-action-id="volunteer_quest" ${dis ? "disabled" : ""}>帮小陈分拣药品｜D20｜1 行动</button>`;
  }

  // 属性标签
  const tags = [];
  if (ui_meta.locType) tags.push(`<span class="archive-tag">${ui_meta.locType}</span>`);
  if (risk !== "—") tags.push(`<span class="archive-tag archive-tag-risk">${risk}风险</span>`);
  if (yieldLvl !== "—") tags.push(`<span class="archive-tag archive-tag-yield">${yieldLvl}收益</span>`);
  if (loc?.highRisk) tags.push(`<span class="archive-tag archive-tag-warn">⚠ 高风险</span>`);

  const locThumb = LOC_SVG[locId] || "";

  return `
    <aside class="archive-card" data-loc-id="${locId}">
      ${locThumb ? `<div class="archive-thumb">${locThumb}<div class="archive-thumb-vignette"></div></div>` : ""}
      <header class="archive-head">
        <h3 class="archive-name">${loc.name}</h3>
        <p class="archive-sub">${node ? node.sub : ""}</p>
      </header>
      <div class="archive-tags">${tags.join("")}</div>
      ${narrative ? `<p class="archive-narrative">${narrative}</p>` : ""}
      <p class="archive-desc">${purposeText}</p>
      <dl class="archive-facts">
        <div><dt>核心产出</dt><dd>${coreText}</dd></div>
        <div><dt>可能获得</dt><dd>${lootText}</dd></div>
        <div><dt>失败后果</dt><dd>${failText}</dd></div>
      </dl>
      <div class="archive-actions">
        ${actionBtns}
        ${extraBtns}
      </div>
    </aside>`;
}


function renderMapInteractStrip() {
  // 注意：地点行动按钮由 renderMapDetailCard（v5 档案卡）渲染，
  // 这里只渲染：登记处对话、猫咪条、Day 7 撤离按钮 三个独立元素。
  let html = "";
  if (ui.registryDialogue) {
    html = `
      <div class="interact-strip panel">
        <h3 class="panel-head">你的回应</h3>
        <button type="button" class="btn btn-game btn-reg btn-block" id="btn-registry-dialogue-ok">明白了</button>
      </div>`;
  }

  let catBar = "";
  if (state.flags.metCat && !state.flags.catAtAlley) {
    catBar = `
      <div class="cat-strip panel">
        <span class="cat-label">旅舍野猫（信任 ${state.catTrust}）</span>
        <button type="button" class="btn btn-sm" data-cat="feed">喂食物</button>
        <button type="button" class="btn btn-sm" data-cat="follow">跟随</button>
        <button type="button" class="btn btn-sm" data-cat="shoo">赶走</button>
      </div>`;
  } else if (state.flags.catAtAlley && state.unlocked.alley) {
    catBar = `
      <div class="cat-strip panel cat-strip-hint">
        <span class="cat-label">野猫已回后巷</span>
        <span class="cat-hint-text">可在「后巷回收棚」继续喂猫；猫只负责引路，不提供掷骰加成。</span>
      </div>`;
  }
  if (state.day >= 7 && state.registrationProgress >= 3 && state.flags.evacPass) {
    catBar += `
      <div class="interact-strip panel">
        <button type="button" class="btn btn-game btn-primary btn-block" data-final="official">第7日 · 持通行条正式撤离</button>
      </div>`;
  }
  return html + catBar;
}

function renderEndSlotControl() {
  if (state.actionsLeft > 0) return "";
  const nextLabel =
    state.timeSlot === "morning"
      ? "进入下午"
      : state.timeSlot === "afternoon"
        ? "进入夜晚"
        : "进入下一天上午";
  const btnLabel = `结束当前时段（${nextLabel}）`;
  return `
    <div class="end-slot-strip panel">
      <p class="end-slot-hint">本时段行动已用完。你可以结束当前时段，进入下一时段。</p>
      <button type="button" class="btn btn-game btn-primary btn-block" id="btn-end-slot">${btnLabel}</button>
    </div>`;
}

function renderMapActionArea() {
  // schematic 地图 + vintage paper 详情卡替代了旧的 list+interact strip
  return `${renderEndSlotControl()}<div class="map-and-detail">${renderSchematicMap()}${renderMapDetailCard()}</div>`;
}

function toggleLocDetail(locId) {
  ui.expandedLocDetail = ui.expandedLocDetail === locId ? null : locId;
  render();
}

function renderRegistryActions() {
  let btns = renderBtn("查看当前补登要求", "view_req", false, "", "reg");
  if (knowsRegStage(1) && state.registrationProgress < 1) {
    const r1 = getSubmitDisabledReason(1);
    btns += renderBtn("提交临时申请（300）", "submit_1", !!r1, r1, "reg");
  }
  if (knowsRegStage(2) && state.registrationProgress === 1) {
    const r2 = getSubmitDisabledReason(2);
    btns += renderBtn("提交住宿核验", "submit_2", !!r2, r2, "reg");
  }
  if (knowsRegStage(3) && state.registrationProgress === 2) {
    const r3 = getSubmitDisabledReason(3);
    btns += renderBtn("提交撤离配额", "submit_3", !!r3, r3, "reg");
  }
  btns += renderBtn("离开登记处", "leave_registry", false, "", "action");
  return `<div class="action-list inner-actions">${btns}</div>`;
}

function renderLocActions(locId) {
  const loc = LOCATIONS[locId];
  if (locId === "inn") {
    const noAct = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    return `
      <div class="action-list inner-actions">
        ${renderBtn("休息一会｜消耗 1 行动", "rest", !!noAct, noAct, "rest")}
        ${renderBtn("翻找房间｜消耗 1 行动", "search_room", !!noAct, noAct, "explore")}
      </div>`;
  }
  if (locId === "registry") {
    return renderRegistryActions();
  }
  if (locId === "trader") {
    return `
      <div class="action-list inner-actions">
        <button type="button" class="btn btn-game btn-trade btn-block" data-action="enter_trader">进入交易小店</button>
      </div>`;
  }
  if (locId === "laundry") {
    const noAct = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    return `
      <div class="action-list inner-actions">
        ${renderBtn("搜索失物柜｜消耗 1 行动", "search_locker", !!noAct, noAct, "explore")}
        ${renderBtn("翻找烘干机｜消耗 1 行动", "search_dryer", !!noAct, noAct, "explore")}
      </div>`;
  }
  if (locId === "back_warehouse") {
    const rN = state.traderTrust < 2 ? "需信任≥2" : "";
    const rAct = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    return `
      <div class="action-list inner-actions">
        ${renderBtn("正常进入后仓", "normal_enter", !!(rN || rAct), rN || rAct)}
        ${renderBtn("付费进入（100）", "pay_enter", !!rAct, rAct)}
        ${renderBtn("夜间强行闯入", "force_enter", !!rAct, rAct)}
      </div>`;
  }
  if (locId === "alley" && state.flags.catAtAlley) {
    const noAct = state.actionsLeft <= 0 ? "本时段行动已用完" : "";
    const cantExit = state.health < 3 ? "健康过低，不宜撤离" : "";
    return `
      <div class="action-list inner-actions">
        <p class="loc-cat-note">野猫蹲在这里。信任 ${state.catTrust}（仅引路，无掷骰加成）</p>
        ${renderBtn("喂食物", "cat_feed", !!noAct, noAct, "action")}
        ${renderBtn("用猫罐头喂", "cat_can", !noAct && countItem("cat_food_can") > 0, noAct || "需要猫罐头", "action")}
        ${renderBtn("走猫撤离路线｜D20｜1 行动", "alley_exit_roll", !!(noAct || cantExit), noAct || cantExit, "explore")}
      </div>`;
  }
  const acts = loc.actions || [{ id: "search", label: "搜索 / 翻找", roll: true }];
  if (loc.explore && !loc.actions) {
    const ex = canExploreAtLocation(locId);
    return renderBtn("搜索 / 翻找", "search", !ex.ok, ex.reason);
  }
  return `<div class="action-list inner-actions">${acts
    .map((a) => {
      const ex = a.roll ? canExploreAtLocation(locId) : { ok: state.actionsLeft > 0, reason: "本时段行动已用完" };
      return renderBtn(a.label, a.id, !ex.ok, ex.reason);
    })
    .join("")}</div>`;
}

function renderRollPrepare() {
  const ctx = ui.rollContext;
  if (!ctx || ctx.type !== "explore") {
    return "<div class=\"panel\"><p>无行动数据</p></div>";
  }
  const info = getExplorePrepareInfo(ctx.locId, ctx.actionId);
  const noAct = state.actionsLeft <= 0;
  return `
    <div class="panel roll-panel roll-prepare">
      <h3 class="panel-head">行动确认</h3>
      <dl class="roll-prepare-facts">
        <div><dt>地点</dt><dd>${info.locName}</dd></div>
        <div><dt>行动</dt><dd>${info.actionLabel}</dd></div>
        <div><dt>风险</dt><dd>${info.risk}</dd></div>
        <div><dt>消耗</dt><dd>1 行动</dd></div>
      </dl>
      ${info.note ? `<p class="roll-prepare-note">${info.note}</p>` : ""}
      ${noAct ? '<p class="btn-hint">本时段行动已用完</p>' : ""}
      <button type="button" class="btn btn-game btn-primary btn-block" id="btn-start-roll" ${noAct ? "disabled" : ""}>开始掷骰</button>
      <button type="button" class="btn btn-block" id="btn-cancel-roll">返回地图</button>
    </div>`;
}

function renderRolling() {
  const display = ui.rollingDisplay ?? "—";
  return `
    <div class="panel roll-panel rolling-panel">
      <h3 class="panel-head">D20 判定</h3>
      <p class="rolling-label">掷骰中……</p>
      <div class="dice-stage">
        <div class="dice-shadow"></div>
        <div class="dice-cube is-rolling">
          <div class="dice-face dice-face-front">${display}</div>
          <div class="dice-face dice-face-back">${display}</div>
          <div class="dice-face dice-face-right">${display}</div>
          <div class="dice-face dice-face-left">${display}</div>
          <div class="dice-face dice-face-top">${display}</div>
          <div class="dice-face dice-face-bottom">${display}</div>
        </div>
      </div>
    </div>`;
}

function getRollCollectLabel(roll) {
  if (!roll) return "收下并返回地图";
  if (roll.tier === "fail" || roll.tier === "crit_fail") return "返回地图";
  return "收下并返回地图";
}

function renderRollResult() {
  const roll = ui.pendingRoll;
  if (!roll) return "<div class=\"panel\"><p>无掷骰数据</p><button type=\"button\" class=\"btn btn-block\" id=\"btn-cancel-roll\">返回地图</button></div>";
  const modLines = roll.mods
    .map((m) => `<li><span>${m.label}</span><span>${m.value > 0 ? "+" : ""}${m.value}</span></li>`)
    .join("");
  const modSum = roll.mods.reduce((s, m) => s + m.value, 0);
  return `
    <div class="panel roll-panel ${tierClass(roll.tier)}">
      <h3 class="panel-head">D20 判定</h3>
      <div class="roll-tier-badge ${tierClass(roll.tier)} roll-tier-pop">${rollTierDisplay(roll.tier)}</div>
      <div class="dice-stage">
        <div class="dice-shadow"></div>
        <div class="dice-cube is-final">
          <div class="dice-face dice-face-front">${roll.raw}</div>
          <div class="dice-face dice-face-back">${roll.raw}</div>
          <div class="dice-face dice-face-right">${roll.raw}</div>
          <div class="dice-face dice-face-left">${roll.raw}</div>
          <div class="dice-face dice-face-top">${roll.raw}</div>
          <div class="dice-face dice-face-bottom">${roll.raw}</div>
        </div>
      </div>
      <div class="roll-breakdown">
        <div class="roll-line"><span>原始点数</span><strong>${roll.raw}</strong></div>
        <div class="roll-mods">
          <div class="roll-mods-title">修正项</div>
          <ul>${modLines || "<li>无</li>"}</ul>
          ${modSum !== 0 ? `<div class="roll-mod-total">修正合计 ${modSum > 0 ? "+" : ""}${modSum}</div>` : ""}
        </div>
        <div class="roll-line"><span>最终点数</span><strong>${roll.final}</strong></div>
        <div class="roll-line"><span>结果等级</span><strong class="${tierClass(roll.tier)}">${rollTierDisplay(roll.tier)}</strong></div>
      </div>
      <button type="button" class="btn btn-game btn-primary btn-block archive-btn" id="btn-confirm-roll">${getRollCollectLabel(roll)}</button>
    </div>`;
}

function renderWaterQuestHint() {
  if (
    !state.flags.waterQuestSpotted ||
    !state.flags.waterQuestAvailable ||
    state.flags.waterQuestDone
  ) {
    return "";
  }
  const dis = state.actionsLeft <= 0 ? "disabled" : "";
  return `
    <div class="trader-water-hint">
      <p>门口还有几箱水没有搬进去。</p>
      <button type="button" class="btn btn-sm btn-game" data-water-quest="start" ${dis}>帮他搬水箱</button>
      ${state.actionsLeft <= 0 ? '<span class="btn-hint">本时段行动已用完</span>' : ""}
    </div>`;
}

function getTraderTrustHint() {
  const t = state.traderTrust;
  const fair = state.flags.fairTradeCount || 0;
  if (t >= 4) return "老板很信你，买卖都顺手，也可能愿意替你担保。";
  if (t >= 2) return "可以正常进便利店后仓，不用每次塞进门费。";
  if (t <= -2) return "老板提防你，价钱更狠；少抬价、别硬闯后仓。";
  const ways = [];
  if (state.flags.waterQuestAvailable && !state.flags.waterQuestDone) {
    ways.push("门口搬水箱（+1）");
  }
  if (!state.flags.trustFromFair5) ways.push(`常来买卖（已 ${fair}/5 次，满 5 次 +1）`);
  else if (!state.flags.trustFromFair10) ways.push(`继续交易（已 ${fair}/10 次，满 10 次再 +1）`);
  if (!state.flags.trustFromPaidWarehouse) ways.push("付费进后仓一次（+1）");
  ways.push("抬价谈成时偶尔 +1");
  return `提升信任：${ways.join("；")}。`;
}

function renderTraderMeta() {
  const waterDisc = state.flags.waterBuyDiscount
    ? '<p class="bargain-active">搬水酬劳：下一件水类物资九折（一次）</p>'
    : "";
  return `
    <div class="trader-meta">
      <span>交易者信任：<strong>${state.traderTrust}</strong></span>
      <span>价格状态：<strong>${getTraderPriceLabel()}</strong></span>
      <span>你持有：<strong>${state.money}</strong> 金钱</span>
    </div>
    <p class="trader-trust-hint">${getTraderTrustHint()}</p>
    ${waterDisc}`;
}

function renderTraderIntro() {
  return `
    <div class="panel trade-window trader-intro-panel">
      <h3 class="panel-head">交易小店</h3>
      <div class="trader-intro-actions">
        <button type="button" class="btn btn-game btn-trade btn-block" data-trader-intro="sell">卖出拾荒物</button>
        <button type="button" class="btn btn-game btn-trade btn-block" data-trader-intro="buy">购买物资</button>
        <button type="button" class="btn btn-game btn-block" data-trader-intro="observe">观察店内</button>
        <button type="button" class="btn btn-block" data-trader-intro="leave">离开</button>
      </div>
    </div>`;
}

function renderTraderWaterOffer() {
  const noAct = state.actionsLeft <= 0 ? "disabled" : "";
  return `
    <div class="panel trade-window">
      <h3 class="panel-head">交易小店</h3>
      <div class="trader-water-offer-actions">
        <button type="button" class="btn btn-game btn-block" data-water-quest="start" ${noAct}>帮他搬水箱｜消耗 1 行动</button>
        ${state.actionsLeft <= 0 ? '<span class="btn-hint">本时段行动已用完</span>' : ""}
        <button type="button" class="btn btn-block" data-trader-nav="hub">算了，先交易</button>
      </div>
    </div>`;
}

function renderTraderHub() {
  return `
    <div class="panel trade-window">
      <h3 class="panel-head">交易小店</h3>
      ${renderTraderMeta()}
      <div class="trader-hub-actions">
        <button type="button" class="btn btn-game btn-trade btn-block" data-trader-nav="sell">卖出拾荒物</button>
        <button type="button" class="btn btn-game btn-trade btn-block" data-trader-nav="buy">购买物资</button>
        <button type="button" class="btn btn-block" data-trader-nav="leave">离开</button>
      </div>
      ${renderWaterQuestHint()}
    </div>`;
}

function renderTraderSell() {
  const sellRows = Object.keys(state.inventory)
    .filter((id) => ITEMS[id]?.sellPrice || ITEMS[id]?.moneyLoot)
    .map((id) => {
      const qty = state.inventory[id];
      const unit = getSellUnitPrice(id);
      return `
        <div class="trade-item-card">
          <div class="trade-item-info">
            <strong>${ITEMS[id].name}</strong> <span class="qty">×${qty}</span>
            <div class="trade-price-line">报价：<strong>${unit}</strong> 金钱 / 件 · 共 ${unit * qty}</div>
          </div>
          <div class="trade-item-btns">
            <button type="button" class="btn btn-sm btn-trade" data-sell="${id}" data-qty="1">按报价卖出</button>
            <button type="button" class="btn btn-sm btn-outline" data-haggle-sell="${id}" data-qty="1">尝试抬价｜D20</button>
          </div>
        </div>`;
    })
    .join("");

  return `
    <div class="panel trade-window">
      <h3 class="panel-head">卖出拾荒物</h3>
      <p class="trader-quote">「旧手机八十。屏幕裂成这样，已经很给面子了。」</p>
      ${renderTraderMeta()}
      <div class="trade-list trade-list-cards">${sellRows || '<p class="empty-hint">没有能卖的东西。去翻翻垃圾桶？</p>'}</div>
      <button type="button" class="btn btn-game btn-block" id="btn-sell-all">一键按报价卖出全部</button>
      <button type="button" class="btn btn-block" data-trader-nav="hub">返回柜台</button>
    </div>`;
}

function renderTraderBuy() {
  const buyRows = getTraderBuyIds()
    .filter((id) => getBuyPrice(id) != null)
    .map((id) => {
      const item = ITEMS[id];
      let price = getBuyPrice(id);
      const afford = state.money >= price;
      const hint = getBuyHintForItem(id);
      return `
        <div class="trade-item-card ${afford ? "" : "cant-afford"}">
          <div class="trade-item-info">
            <strong>${item.name}</strong>
            <div class="trade-price-line">售价：<strong>${price}</strong> 金钱</div>
            <span class="trade-use">${hint}</span>
          </div>
          <div class="trade-item-btns">
            <button type="button" class="btn btn-sm btn-trade" data-buy="${id}" ${afford ? "" : "disabled"}>直接购买</button>
            <button type="button" class="btn btn-sm btn-outline" data-haggle-buy="${id}" ${afford ? "" : "disabled"}>尝试压价｜D20</button>
          </div>
          ${!afford ? '<span class="money-hint">钱不够</span>' : ""}
        </div>`;
    })
    .join("");

  return `
    <div class="panel trade-window">
      <h3 class="panel-head">购买物资</h3>
      <p class="trader-quote">「水今天不便宜。雨下得越大，干净水越贵。」</p>
      ${renderTraderMeta()}
      <div class="trade-list trade-list-cards">${buyRows || '<p class="empty-hint">当前货架暂无商品。</p>'}</div>
      <button type="button" class="btn btn-block" data-trader-nav="hub">返回柜台</button>
    </div>`;
}

function renderTrader() {
  const panel = ui.traderPanel || "hub";
  if (!state.flags.traderIntroDone) return renderTraderIntro();
  if (panel === "water_offer" && !state.flags.waterQuestDone) return renderTraderWaterOffer();
  if (panel === "sell") return renderTraderSell();
  if (panel === "buy") return renderTraderBuy();
  return renderTraderHub();
}

function handleTraderIntroChoice(choice) {
  if (choice === "leave") {
    completeTraderIntro();
    ui.view = "map";
    ui.eventText = "你走出交易小店。雨还在下，门口的泡水纸箱仍在滴水。";
    render();
    return;
  }
  if (choice === "observe") {
    completeTraderIntro();
    state.flags.waterQuestSpotted = true;
    state.flags.waterQuestAvailable = true;
    ui.view = "trader";
    ui.traderPanel = "water_offer";
    ui.eventText = getWaterQuestSceneText();
    render();
    return;
  }
  completeTraderIntro();
  ui.view = "trader";
  ui.traderPanel = choice;
  render();
}

function handleTraderNav(nav) {
  if (nav === "leave") {
    ui.view = "map";
    ui.traderPanel = "hub";
    ui.eventText = "交易小店的卷帘门又落下半截。";
    render();
    return;
  }
  ui.traderPanel = nav;
  ui.view = "trader";
  render();
}

function renderRegistryPanel() {
  return `
    <div class="panel registry-room">
      <h3 class="panel-head">登记处柜台</h3>
      <p class="panel-hint">查看要求、提交材料，或离开。材料不足时登记员只会说明还差什么。</p>
      ${renderRegistryActions()}
    </div>`;
}

function renderInventoryPanel() {
  const sections = INV_TABS.map((tab) => {
    const items = Object.keys(state.inventory).filter((id) => ITEMS[id]?.category === tab.id);
    const rows = items
      .map((id) => {
        const item = ITEMS[id];
        const qty = state.inventory[id];
        const hint =
          ITEM_USE_HINT[id] ||
          (item.sellPrice
            ? "可卖给交易者换钱"
            : item.lodging
              ? "交给登记处，证明你住过这里"
              : item.task
                ? "登记处要的配额材料"
                : "探索时有点用");
        const useBtn = item.usable
          ? `<button type="button" class="btn btn-sm" data-use="${id}">使用</button>`
          : "";
        return `
          <div class="pack-item">
            <div class="pack-item-main">
              <strong>${item.name}</strong> <span class="qty">×${qty}</span>
              <div class="pack-meta">用途：${hint}</div>
            </div>
            ${useBtn}
          </div>`;
      })
      .join("");
    const empty = rows ? "" : `<p class="pack-empty">${PACK_EMPTY[tab.id] || "暂无"}</p>`;
    return `
      <section class="pack-section ${items.length ? "" : "is-empty"}">
        <h4 class="pack-cat-title">${tab.label}</h4>
        ${rows || empty}
      </section>`;
  });

  const anyItem = Object.keys(state.inventory).length > 0;

  return `
    <div class="panel pack-panel">
      <h3 class="panel-head">背包</h3>
      ${anyItem ? "" : '<p class="pack-all-empty">你的背包空得很诚实。</p>'}
      <div class="pack-scroll">${sections.join("")}</div>
    </div>`;
}

// 底部单/双行：状态摘要 + 背包摘要 + 最近日志 + 推进按钮
function renderBottomSummary() {
  // 状态
  const statCells = [
    { label: "食物", val: state.food, max: STAT_CAP.food, key: "food" },
    { label: "饮水", val: state.water, max: STAT_CAP.water, key: "water" },
    { label: "健康", val: state.health, max: STAT_CAP.health, key: "health" },
    { label: "清醒", val: state.clarity, max: STAT_CAP.clarity, key: "clarity" },
  ];
  const statLine = statCells
    .map((s) => {
      const low = s.val <= 5;
      return `<span class="bs-stat ${low ? "is-low" : ""}">${s.label}<strong>${s.val}</strong>${s.max ? `/${s.max}` : ""}</span>`;
    })
    .join("<span class=\"bs-sep\">｜</span>");

  // 背包：分类汇总一短行
  const packCounts = INV_TABS.map((tab) => {
    const ids = Object.keys(state.inventory).filter((id) => ITEMS[id]?.category === tab.id);
    if (!ids.length) return null;
    const summary = ids.map((id) => `${ITEMS[id].name}×${state.inventory[id]}`).join("、");
    return summary;
  }).filter(Boolean);
  const packLine = packCounts.length ? packCounts.join(" · ") : "暂无关键物资";

  // 最近日志（取首条）
  const lastLog = state.logs[0] || `第${state.day}日 ${GAME.slotNames[state.timeSlot]}，你开始了。`;

  // 推进按钮
  const order = ["morning", "afternoon", "night"];
  const idx = order.indexOf(state.timeSlot);
  const nextSlot = idx < order.length - 1 ? order[idx + 1] : null;
  const nextLabel = nextSlot
    ? `推进至${GAME.slotNames[nextSlot]}`
    : `推进至第${state.day + 1}日上午`;
  const noActions = state.actionsLeft > 0;
  const advanceDisabled = noActions ? "" : "disabled";
  const advanceHint = noActions ? "" : `<span class="bs-hint">本时段还有 ${state.actionsLeft} 次行动</span>`;

  return `
    <footer class="bottom-summary" aria-label="状态与行动摘要">
      <div class="bs-row bs-row-stats">
        <span class="bs-label">状态</span>
        ${statLine}
      </div>
      <div class="bs-row bs-row-pack">
        <span class="bs-label">背包</span>
        <span class="bs-pack-text">${packLine}</span>
        <span class="bs-label bs-label-2">日志</span>
        <span class="bs-log-text">${lastLog}</span>
        <button type="button" class="bs-advance" id="btn-end-slot" ${advanceDisabled}>${nextLabel} →</button>
        ${advanceHint}
      </div>
    </footer>`;
}

function renderJournalPanel() {
  const lines = state.logs.slice(0, 5);
  return `
    <section class="panel journal-panel" aria-labelledby="journal-heading">
      <h3 class="side-head" id="journal-heading">求生日志</h3>
      <ul class="journal-list">
        ${lines.length ? lines.map((l) => `<li>${formatJournalLine(l)}</li>`).join("") : "<li class=\"journal-empty\">尚无记录</li>"}
      </ul>
    </section>`;
}

function showIntroScreen() {
  const intro = document.getElementById("intro-screen");
  const app = document.getElementById("app");
  if (intro) {
    intro.classList.remove("hidden");
    intro.setAttribute("aria-hidden", "false");
  }
  if (app) app.style.display = "none";
}

function hideIntroScreen() {
  const intro = document.getElementById("intro-screen");
  const app = document.getElementById("app");
  if (intro) {
    intro.classList.add("hidden");
    intro.setAttribute("aria-hidden", "true");
  }
  if (app) app.style.display = "";
}

function startNewGame() {
  hideIntroScreen();
  if (typeof AudioFX !== "undefined") AudioFX.stopAmbient();
  state = createState();
  ui.screen = "play";
  ui.view = "map";
  ui.selectedLoc = null;
  ui.pendingRoll = null;
  ui.rollContext = null;
  ui.rollDone = false;
  ui.rollOutcome = null;
  ui.rollingDisplay = null;
  ui.eventText = "";
  clearRollAnim();
  addLog("你开始了第一天。", "系统");
  addLog("你发现撤离通知。", "地点");
  syncUnlocks();
  unlockByDay();
  // 调试用：?autoselect=inn 启动后自动选中某个节点（截图工具）
  const sel = new URLSearchParams(location.search).get("autoselect");
  if (sel && isLocationUnlocked(sel)) ui.selectedLoc = sel;
  render();

  // 调试用：?autoroll=1 → 4 秒后自动点"翻找房间"（roll_prepare），再 1 秒点"开始掷骰"
  if (location.search.includes("autoroll=1")) {
    setTimeout(() => {
      const btn = document.querySelector('[data-roll-loc="inn"][data-roll-action="search_room"]');
      if (btn) btn.click();
      setTimeout(() => {
        const startBtn = document.getElementById("btn-start-roll");
        if (startBtn) startBtn.click();
      }, 1000);
    }, 2000);
  }

  // 调试用：?testroll=rolling|result-great|result-fail → 强制进入对应视图（绕过 setTimeout 链）
  const testroll = new URLSearchParams(location.search).get("testroll");
  if (testroll === "rolling") {
    ui.selectedLoc = "inn";
    ui.rollContext = { type: "explore", locId: "inn", actionId: "search_room" };
    ui.view = "rolling";
    ui.rollingDisplay = 13;
    render();
    // 模拟 3D 立方体中段旋转（30% 进度：让 chrome 截图能直接看到 3D 立体感）
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const cube = document.querySelector(".dice-cube.is-rolling");
      if (cube) {
        cube.style.transform = "rotateX(324deg) rotateY(432deg) rotateZ(216deg)";
      }
    }));
  } else if (testroll === "result-great") {
    ui.view = "roll_result";
    ui.rollContext = { type: "explore", locId: "inn", actionId: "search_room" };
    ui.pendingRoll = {
      raw: 18, final: 20, tier: "high",
      mods: [{ label: "野猫陪伴", value: 2 }, { label: "雨天", value: -1 }],
    };
    render();
  } else if (testroll === "result-fail") {
    ui.view = "roll_result";
    ui.rollContext = { type: "explore", locId: "inn", actionId: "search_room" };
    ui.pendingRoll = {
      raw: 6, final: 4, tier: "fail",
      mods: [{ label: "夜间高风险", value: -2 }],
    };
    render();
  } else if (testroll === "result-crit") {
    ui.view = "roll_result";
    ui.rollContext = { type: "explore", locId: "inn", actionId: "search_room" };
    ui.pendingRoll = {
      raw: 20, final: 22, tier: "crit",
      mods: [{ label: "野猫陪伴", value: 2 }],
    };
    render();
  }
}

function bindEnding() {
  document.getElementById("btn-restart")?.addEventListener("click", restart);
}

function bindGame() {
  document.querySelectorAll("[data-goto-loc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      ui.rollOutcome = null;
      gotoLocation(btn.dataset.gotoLoc);
    });
  });

  document.querySelectorAll("[data-explore-loc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      ui.rollOutcome = null;
      exploreFromCard(btn.dataset.exploreLoc);
    });
  });

  document.querySelectorAll("[data-loc-detail]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLocDetail(btn.dataset.locDetail);
    });
  });

  // schematic 节点点击：选中 + 渲染 detail 卡
  document.querySelectorAll("[data-loc-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const locId = btn.dataset.locId;
      if (!locId || !isLocationUnlocked(locId)) return;
      ui.selectedLoc = ui.selectedLoc === locId ? null : locId;
      render();
    });
  });

  // detail 卡的 paper action 按钮：roll / non-roll 行动
  document.querySelectorAll("[data-roll-loc]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const locId = btn.dataset.rollLoc;
      const actionId = btn.dataset.rollAction || "search";
      if (state.actionsLeft <= 0) {
        ui.eventText = "本时段行动已用完。";
        render();
        return;
      }
      startExplore(locId, actionId);
    });
  });
  document.querySelectorAll("[data-action-loc]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const locId = btn.dataset.actionLoc;
      const actionId = btn.dataset.actionId;
      // 纯切图/对话 action 不消耗行动点
      const noActionCost = ["register", "open_trader", "view_req", "leave_registry"];
      if (state.actionsLeft <= 0 && !noActionCost.includes(actionId)) {
        ui.eventText = "本时段行动已用完。";
        render();
        return;
      }
      handleLocationAction(locId, actionId);
    });
  });

  document.getElementById("btn-registry-dialogue-ok")?.addEventListener("click", handleRegistryDialogue);

  document.getElementById("btn-mini-event-accept")?.addEventListener("click", acceptMiniEvent);
  document.getElementById("btn-mini-event-skip")?.addEventListener("click", dismissMiniEvent);

  document.getElementById("btn-toast-ok")?.addEventListener("click", dismissToast);

  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      const act = btn.dataset.action;
      if (state.actionsLeft <= 0 && !["view_req", "leave_registry"].includes(act)) return;
      ui.rollOutcome = null;
      handleLocationAction(ui.selectedLoc, act);
    });
  });

  document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => interactCat(btn.dataset.cat));
  });

  document.getElementById("btn-confirm-roll")?.addEventListener("click", confirmRoll);
  document.getElementById("btn-start-roll")?.addEventListener("click", beginRoll);
  document.getElementById("btn-cancel-roll")?.addEventListener("click", cancelRollPrepare);
  document.getElementById("btn-end-slot")?.addEventListener("click", advanceTimeSlot);

  document.getElementById("btn-sell-all")?.addEventListener("click", sellAllSellables);

  document.querySelectorAll("[data-trader-intro]").forEach((btn) => {
    btn.addEventListener("click", () => handleTraderIntroChoice(btn.dataset.traderIntro));
  });

  document.querySelectorAll("[data-trader-nav]").forEach((btn) => {
    btn.addEventListener("click", () => handleTraderNav(btn.dataset.traderNav));
  });

  document.querySelectorAll("[data-sell]").forEach((btn) => {
    btn.addEventListener("click", () => sellItem(btn.dataset.sell, parseInt(btn.dataset.qty, 10)));
  });

  document.querySelectorAll("[data-haggle-sell]").forEach((btn) => {
    btn.addEventListener("click", () =>
      startHaggleSell(btn.dataset.haggleSell, parseInt(btn.dataset.qty, 10))
    );
  });

  document.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", () => buyItem(btn.dataset.buy));
  });

  document.querySelectorAll("[data-haggle-buy]").forEach((btn) => {
    btn.addEventListener("click", () => startHaggleBuy(btn.dataset.haggleBuy));
  });

  document.querySelectorAll("[data-water-quest]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      startWaterQuest();
    });
  });

  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      ui.invTab = btn.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-use]").forEach((btn) => {
    btn.addEventListener("click", () => useConsumable(btn.dataset.use));
  });

  document.querySelector("[data-final='official']")?.addEventListener("click", () => {
    if (state.registrationProgress >= 3 && state.flags.evacPass) {
      endGame("official");
    }
  });
}

// ===== 进入界面初始化（异步执行，避开 TDZ 问题） =====
(function scheduleBoot() {
  if (typeof initIntroScreen !== "function") return;
  setTimeout(() => {
    if (document.getElementById("intro-screen")) {
      try { initIntroScreen(); } catch (e) { console.error("initIntroScreen err:", e); }
    }
    if ((window.__skipIntroOnLoad || location.search.includes("autogame=1")) && typeof startNewGame === "function") {
      try { startNewGame(); } catch (e) { console.error("startNewGame err:", e); }
    }
  }, 0);
})();

/* ============================================================
   ===== 进入界面（深色废墟 + 飘落日记卡） =====
   ============================================================ */

const INTRO_DAY_CARDS = [
  {
    day: 1,
    label: "失去证明",
    tease: "这是暴雨的第一天，我起来发现自己失去了身份证件。那我应该如何证明自己呢？听说有撤离登记处，我应该去那里看看。",
    full: "这是暴雨的第一天。\n我醒来的时候，房间里只剩下潮湿的墙面、断电的插座和一只翻倒的抽屉。身份证件不见了，手机也快没电。\n广播里反复播放撤离登记的消息，可我突然意识到，如果我无法证明自己是谁，就连被救走都需要排队解释。\n听说街口还有一个临时登记处，我应该先去那里看看。",
  },
  {
    day: 2,
    label: "登记小店",
    tease: "我在街角小店找到一张临时登记表。老板说，登记处只认编号、证件和担保人。我没有证件，只能先找能证明我存在的人。",
    full: "我在街角小店找到一张被雨水打湿的临时登记表。\n小店老板说，现在登记处只认编号、证件和担保人。没有这些东西的人，只能先排在「待确认」那一栏。\n我没有证件，也没有能立刻联系上的亲人。\n我第一次觉得，原来一个人是否存在，不只取决于自己还活着，也取决于有没有东西能替自己作证。",
  },
  {
    day: 3,
    label: "桶边的猫",
    tease: "雨没有停。我在垃圾桶旁遇见一只躲雨的猫，也翻到一小袋还能用的电池。广播说，撤离名单会优先考虑『可自持者』。",
    full: "雨没有停。\n我在垃圾桶旁边遇见一只躲雨的猫，它看起来比我更熟悉这片街区。\n我翻到一小袋还能用的电池，还有半包没有受潮的饼干。\n广播说，撤离名单会优先考虑「可自持者」。\n这句话听起来很体面，但我明白它的意思：如果你还想被带走，就先证明你不会成为负担。",
  },
  {
    day: 4,
    label: "旧游客巴士",
    tease: "路边的旧游客巴士成了临时避雨点。我在座椅缝里找到半张车票和一支坏掉的笔。有人说，车站附近可以用物资换排队号码。",
    full: "路边那辆旧游客巴士成了临时避雨点。\n车窗上还贴着过去的旅游广告，蓝色海岸、晴天、笑着拍照的人，像是另一个世界留下的残影。\n我在座椅缝里找到半张车票和一支坏掉的笔。\n有人说，车站附近可以用物资换排队号码。\n我不知道这算不算公平，但至少它给了我一个可以尝试的方向。",
  },
  {
    day: 5,
    label: "后巷回收铺",
    tease: "垃圾点的味道比昨天更重。回收铺老板说，你能带来的东西越多，就越像一个『值得登记的人』。我用旧铜线换到一枚号码牌。",
    full: "垃圾点的味道比昨天更重。\n我带着玻璃瓶、旧铜线、空水壶和几块还算完整的电路板，去了后巷回收铺。\n老板看了很久，最后把一枚号码牌推给我。\n他说，你能带来的东西越多，就越像一个「值得登记的人」。\n我没有反驳。\n只是把号码牌攥在手里，像攥着一小块临时借来的身份。",
  },
  {
    day: 6,
    label: "撤离配额",
    tease: "登记处外排了很长的队。有人拿着病历，有人拿着户口本，有人什么也没有。我开始明白，拾荒不是为了体面，而是为了让系统承认我还在这里。",
    full: "登记处外面排了很长的队。\n有人拿着病历，有人拿着户口本，有人拿着单位证明，也有人和我一样，手里只有几张被雨水泡软的纸。\n工作人员说，撤离配额有限，名单需要核验。\n我开始明白，拾荒不是为了活得体面，而是为了把自己一点点拼回系统能够识别的样子。\n我还在这里。\n我需要他们看见这一点。",
  },
  {
    day: 7,
    label: "撤离日",
    tease: "天亮了。最后一份物资清单递进窗口，我攥着号码牌站在人群后面。名单还没有念到我的名字，但这一次，我至少有了可以被查到的证明。",
    full: "天亮了。\n雨终于小了一点，但街道上的水还没有退。\n我把最后一份物资清单递进窗口，攥着号码牌站在人群后面。\n名单还没有念到我的名字。\n可这一次，我不再只是一个站在雨里的人。\n我有号码，有登记表，有可以交换的物资，也有这些天留下来的记录。\n如果有人问我是谁，我终于能拿出一点东西回答。",
  },
];

/* —— Web Audio 合成音效模块 —— */
const AudioFX = (() => {
  let ctx = null;
  let masterGain = null;
  let ambientNodes = null;
  let muted = false;
  const STORAGE_KEY = "shihuaji_sound_muted";

  function ensureCtx() {
    if (!ctx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }

  function loadMuted() {
    try {
      muted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {}
  }
  function saveMuted() {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    } catch (e) {}
  }
  function isMuted() { return muted; }
  function toggleMuted() {
    muted = !muted;
    saveMuted();
    if (muted && ambientNodes) stopAmbient();
    if (!muted) startAmbient();
    return muted;
  }

  function envTone(freqStart, freqEnd, dur, type = "sine", vol = 0.3) {
    if (muted) return;
    const c = ensureCtx(); if (!c) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + dur);
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    osc.connect(g).connect(masterGain);
    osc.start();
    osc.stop(c.currentTime + dur + 0.05);
  }

  function noise(dur, vol = 0.3, filterFreq = 1000, filterQ = 1) {
    if (muted) return;
    const c = ensureCtx(); if (!c) return;
    const bufSize = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
    const src = c.createBufferSource();
    src.buffer = buf;
    const filt = c.createBiquadFilter();
    filt.type = "bandpass";
    filt.frequency.value = filterFreq;
    filt.Q.value = filterQ;
    const g = c.createGain();
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    src.connect(filt).connect(g).connect(masterGain);
    src.start();
    src.stop(c.currentTime + dur + 0.05);
  }

  // —— 公开音效 ——
  function bulbOn()      { envTone(200, 200, 0.3, "square", 0.08); }
  function cardHover()   { envTone(1200, 1200, 0.05, "sine", 0.15); }
  function cardOpen()    { noise(0.3, 0.2, 3500, 1.5); }
  function buttonPress() { envTone(800, 200, 0.1, "square", 0.15); }
  function chime() {
    if (muted) return;
    const c = ensureCtx(); if (!c) return;
    [400, 600, 800].forEach((f, i) => {
      setTimeout(() => envTone(f, f, 0.3, "sine", 0.15), i * 100);
    });
  }

  // —— 环境音：雨 + 远处雷声 ——
  function startAmbient() {
    if (muted) return;
    const c = ensureCtx(); if (!c) return;
    if (ambientNodes) return;
    const rainBufSize = Math.floor(c.sampleRate * 2);
    const rainBuf = c.createBuffer(1, rainBufSize, c.sampleRate);
    const rd = rainBuf.getChannelData(0);
    for (let i = 0; i < rainBufSize; i++) rd[i] = (Math.random() * 2 - 1);
    const rainSrc = c.createBufferSource();
    rainSrc.buffer = rainBuf;
    rainSrc.loop = true;
    const rainFilt = c.createBiquadFilter();
    rainFilt.type = "bandpass";
    rainFilt.frequency.value = 1500;
    rainFilt.Q.value = 0.5;
    const rainGain = c.createGain();
    rainGain.gain.value = 0.08;
    rainSrc.connect(rainFilt).connect(rainGain).connect(masterGain);
    rainSrc.start();

    // 远处雷声（低频白噪 loop）
    const thunderBufSize = Math.floor(c.sampleRate * 4);
    const thunderBuf = c.createBuffer(1, thunderBufSize, c.sampleRate);
    const td = thunderBuf.getChannelData(0);
    for (let i = 0; i < thunderBufSize; i++) td[i] = (Math.random() * 2 - 1);
    const thunderSrc = c.createBufferSource();
    thunderSrc.buffer = thunderBuf;
    thunderSrc.loop = true;
    const thunderFilt = c.createBiquadFilter();
    thunderFilt.type = "lowpass";
    thunderFilt.frequency.value = 80;
    const thunderGain = c.createGain();
    thunderGain.gain.value = 0.06;
    thunderSrc.connect(thunderFilt).connect(thunderGain).connect(masterGain);
    thunderSrc.start();

    ambientNodes = { rainSrc, rainGain, thunderSrc, thunderGain };
  }
  function stopAmbient() {
    if (!ambientNodes) return;
    try { ambientNodes.rainSrc.stop(); } catch (e) {}
    try { ambientNodes.thunderSrc.stop(); } catch (e) {}
    ambientNodes = null;
  }

  loadMuted();
  return { bulbOn, cardHover, cardOpen, buttonPress, chime, startAmbient, stopAmbient, toggleMuted, isMuted, ensureCtx };
})();

/* 路灯下 7 张日记卡布局（模拟图：远近大小 + 轻微错落） */
const INTRO_CARD_LAYOUT = [
  // 灯光锥内层：靠近灯柱、视觉上"贴在灯光里"
  { x: 0.92, y: 0.18, scale: 0.86, rot: -7, z: 3 },  // Day 1  顶在灯柱下方
  { x: 0.84, y: 0.30, scale: 1.04, rot: 5, z: 5 },   // Day 2  灯柱正下方主卡
  { x: 0.90, y: 0.50, scale: 0.90, rot: -3, z: 2 },  // Day 3  偏下小卡
  // 灯光锥中段：散落
  { x: 0.74, y: 0.22, scale: 0.96, rot: -5, z: 4 },  // Day 4
  { x: 0.79, y: 0.42, scale: 1.02, rot: 6, z: 4 },   // Day 5
  { x: 0.70, y: 0.34, scale: 0.84, rot: 8, z: 2 },   // Day 6  拉近到灯光锥边
  { x: 0.66, y: 0.50, scale: 0.88, rot: -6, z: 3 },  // Day 7
];

let introScreenApi = null;

function resetIntroScreen() {
  introScreenApi?.reset();
}

/* —— 进入界面初始化 —— */
function initIntroScreen() {
  const intro = document.getElementById("intro-screen");
  if (!intro) return;
  if (introScreenApi) {
    introScreenApi.reset();
    return;
  }
  const decorRoot = document.getElementById("intro-decor-papers");
  const entryRoot = document.getElementById("intro-entry-card");
  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ===== 注入 4 张装饰残页（灯柱附近，仅装饰） =====
  const DECOR_LAYOUT = [
    { x: 0.92, y: 0.10, rot: -10, scale: 0.85, z: 3 },
    { x: 0.86, y: 0.16, rot:  8,  scale: 0.75, z: 2 },
    { x: 0.94, y: 0.24, rot: -3,  scale: 0.95, z: 4 },
    { x: 0.88, y: 0.30, rot: 12,  scale: 0.7,  z: 2 },
  ];
  const decorStates = DECOR_LAYOUT.map((layout, i) => {
    const el = document.createElement("div");
    el.className = "paper-residue decor-paper";
    el.style.zIndex = String(layout.z);
    decorRoot.appendChild(el);
    return {
      el,
      baseX: layout.x * viewport.w - 28,
      baseY: layout.y * viewport.h,
      rot: layout.rot,
      scale: layout.scale,
      phase: Math.random() * Math.PI * 2,
      paused: false,
    };
  });
  let entryPaused = false;
  function applyDecorTransform(s, t) {
    if (s.paused) return;
    const swayX = reduceMotion ? 0 : Math.cos(t * 0.6 + s.phase) * 6;
    const swayY = reduceMotion ? 0 : Math.sin(t * 0.7 + s.phase) * 4;
    const wobble = reduceMotion ? 0 : Math.sin(t * 0.9 + s.phase) * 1.6;
    s.el.style.transform = `translate3d(${s.baseX + swayX}px, ${s.baseY + swayY}px, 0) rotate(${s.rot + wobble}deg) scale(${s.scale})`;
  }
  decorStates.forEach((s) => applyDecorTransform(s, 0));
  let decorT0 = 0;
  let decorLastT = performance.now();
  function tickDecor() {
    if (!document.body.contains(decorRoot)) return;
    const now = performance.now();
    const t = (now - decorLastT) / 1000 + decorT0;
    decorT0 = t;
    decorLastT = now;
    for (const s of decorStates) applyDecorTransform(s, t);
    setTimeout(tickDecor, 60);
  }
  setTimeout(tickDecor, 60);

  // ===== 主入口卡（1 张，Day 1）从灯柱飘到中央偏下 =====
  // 入口卡 label 用 "撤离通知"（按 spec），carousel 内 7 张卡仍用 v3 文案
  entryRoot.innerHTML = `
    <div class="entry-card" id="entry-card">
      <div class="paper-residue card-face" style="position:absolute; inset:0;">
        <p class="card-day-num">Day 1</p>
        <p class="card-day-label">撤 离 通 知</p>
        <div class="card-day-rule"></div>
        <p class="card-cta">点击翻阅七日记录</p>
      </div>
      <span class="card-hint-tip">·  点击  ·</span>
    </div>
  `;
  const entryCard = document.getElementById("entry-card");

  // 飘动轨迹：1 秒延迟后开始 → 2.4 秒缓慢飘动（弧线）→ 落地有微下沉
  // 弧线：从右上角路灯光处 → 沿弧线（向上飘一下再下来）→ 画面中央偏下
  const flightStart = { x: viewport.w * 0.92, y: 60, rot: -16, scale: 0.55 };
  const flightEnd   = { x: viewport.w * 0.5 - 84, y: viewport.h * 0.62 - 110, rot: -2, scale: 1.0 };
  // 弧线控制点（向上凸）：让卡片先被风带高一点，再落下来
  const flightCtrlX = (flightStart.x + flightEnd.x) * 0.5 - 80;
  const flightCtrlY = Math.min(flightStart.y, flightEnd.y) * 0.4;

  // 初始：隐藏在右上角（transform 由 CSS 决定）
  // 1 秒后开始飘动（用 setTimeout 链，避免依赖 rAF）
  let landed = false;
  setTimeout(() => {
    entryCard.style.opacity = "1";
    flyEntryCardStep(0);
  }, 1000);

  function flyEntryCardStep(frame) {
    const totalFrames = 60; // ~3s @ 50ms（更慢、湿纸重量感）
    const t = frame / totalFrames;
    // 缓动：开始慢、中段稍快、末段很慢（重物落地的减速感）
    const eased = 1 - Math.pow(1 - t, 2.5);
    // 二次贝塞尔弧线（B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2）
    const omt = 1 - t;
    const x = omt * omt * flightStart.x + 2 * omt * t * flightCtrlX + t * t * flightEnd.x;
    const y = omt * omt * flightStart.y + 2 * omt * t * flightCtrlY + t * t * flightEnd.y;
    // 旋转：开始随弧线倾斜，落地时归正
    const rot = flightStart.rot * (1 - eased) + flightEnd.rot * eased;
    // 缩放：从 0.55 渐变到 1.0
    const scale = flightStart.scale + (flightEnd.scale - flightStart.scale) * eased;
    // 飘动过程：轻微上下摆动（湿纸被风带的"喘息"感）+ 微小左右晃
    const wobbleY = Math.sin(t * Math.PI * 4) * 10;
    const wobbleX = Math.cos(t * Math.PI * 3) * 5;
    const rotWobble = Math.sin(t * Math.PI * 5) * 1.8;
    entryCard.style.transform = `translate3d(${x + wobbleX}px, ${y + wobbleY}px, 0) rotate(${rot + rotWobble}deg) scale(${scale})`;
    if (frame < totalFrames) {
      setTimeout(() => flyEntryCardStep(frame + 1), 50);
    } else {
      // 落地：轻微下沉
      entryCard.classList.add("entered");
      setTimeout(() => {
        entryCard.classList.add("landed");
        landed = true;
        startIdleFloat();
      }, 80);
    }
  }

  function startIdleFloat() {
    let t0 = 0;
    let lastT = performance.now();
    function step() {
      if (!document.body.contains(entryCard) || !landed) return;
      if (entryPaused) {
        lastT = performance.now();
        setTimeout(step, 50);
        return;
      }
      const now = performance.now();
      const t = (now - lastT) / 1000 + t0;
      t0 = t;
      lastT = now;
      const swayY = Math.sin(t * 0.6) * 3;
      const swayX = Math.cos(t * 0.5) * 2;
      const rot = Math.sin(t * 0.7) * 0.6;
      const baseX = viewport.w * 0.5 - 84;
      const baseY = viewport.h * 0.62 - 102;
      entryCard.style.transform = `translate3d(${baseX + swayX}px, ${baseY + swayY}px, 0) rotate(${rot}deg) scale(1)`;
      setTimeout(step, 50);
    }
    setTimeout(step, 50);
  }

  // 点击入口卡 → 打开七日记录
  entryCard.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!landed) return;
    AudioFX.cardOpen();
    openCarousel(0);
  });

  // 调试用：?autocarousel=1 → 飘完自动打开（截图工具，无副作用）
  if (location.search.includes("autocarousel=1")) {
    setTimeout(() => entryCard.click(), 4200);
  }

  // 窗口 resize：重算坐标
  window.addEventListener("resize", () => {
    viewport.w = window.innerWidth;
    viewport.h = window.innerHeight;
    decorStates.forEach((s, i) => {
      s.baseX = DECOR_LAYOUT[i].x * viewport.w - 28;
      s.baseY = DECOR_LAYOUT[i].y * viewport.h;
    });
  });

  // ===== 鼠标视差（仅背景图轻微视差） =====
  const bgEl = document.querySelector(".layer-bg");
  document.addEventListener("mousemove", (e) => {
    const dx = (e.clientX / viewport.w - 0.5) * 2;
    const dy = (e.clientY / viewport.h - 0.5) * 2;
    if (bgEl) bgEl.style.transform = `translate3d(${dx * -2}px, ${dy * -1}px, 0)`;
  });

  // 灯泡亮起音 + 环境音
  setTimeout(() => {
    AudioFX.bulbOn();
    AudioFX.startAmbient();
  }, 600);

  // ===== 七日记录旋转卡组 =====
  const carousel = document.getElementById("day-carousel");
  const carouselTrack = document.getElementById("carousel-track");
  const carouselDots = document.getElementById("carousel-dots");
  const carouselBackdrop = document.getElementById("carousel-backdrop");
  const carouselLeft = document.getElementById("carousel-left");
  const carouselRight = document.getElementById("carousel-right");
  const carouselClose = document.getElementById("carousel-close");
  const cta = document.getElementById("intro-start-btn");
  const ctaHint = cta ? cta.querySelector(".btn-hint") : null;

  let carouselIdx = 0;        // 当前中心主卡索引 (0-6)
  let carouselDragStart = 0;
  let carouselDragDx = 0;
  let carouselIsDragging = false;

  // 注入 7 张卡 + 7 个圆点
  INTRO_DAY_CARDS.forEach((c, i) => {
    const el = document.createElement("div");
    el.className = "carousel-card mini";
    el.dataset.idx = i;
    el.innerHTML = `
      <div class="card-face">
        <p class="card-day-num">Day ${c.day}</p>
        <p class="card-day-label">${escapeHtml(c.label)}</p>
        <div class="card-body"></div>
      </div>`;
    // 主卡 body 注入完整正文（初始隐藏，render 时主卡 body 显示）
    const body = el.querySelector(".card-body");
    body.innerHTML = c.full.split("\n").map(line => `<p>${escapeHtml(line)}</p>`).join("");
    el.addEventListener("click", () => {
      AudioFX.cardHover();
      goCarousel(i);
    });
    carouselTrack.appendChild(el);

    // 圆点
    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    dot.dataset.idx = i;
    dot.addEventListener("click", () => {
      AudioFX.cardHover();
      goCarousel(i);
    });
    carouselDots.appendChild(dot);
  });

  // 渲染单张卡：按 offset 距中心位置算 x、scale、opacity
  // CSS 上 .carousel-card 已是 400×500，JS 不要再加 scale 拉伸（之前 scale(2.1) 适配的是旧 280px 卡片）
  // 副卡只露出一部分，像几张旧纸被风摊开，不是现代轮播
  // 副卡角度：用 idx 算出伪随机旋转，让每张卡"错落"（不要统一 rotation 看着像复制品）
  function renderCarousel() {
    const cards = carouselTrack.querySelectorAll(".carousel-card");
    // 副卡旋转数组（按 idx 0-6 排，每个副卡不同角度，模拟"被风摊开"）
    const miniRots = [0, -4, 5, -2.5, 4.5, -3.5, 2.5];
    cards.forEach((el) => {
      const idx = parseInt(el.dataset.idx, 10);
      const offset = idx - carouselIdx;
      const abs = Math.abs(offset);
      const body = el.querySelector(".card-body");
      if (abs === 0) {
        // 主卡：中心，scale 1，CSS 尺寸 400×500 即为最终大小
        el.className = "carousel-card main";
        el.style.transform = `translate3d(0, 0, 0) scale(1) translateY(0)`;
        el.style.opacity = "1";
        el.style.zIndex = "5";
        el.style.pointerEvents = "auto";
        el.style.filter = "drop-shadow(0 14px 32px rgba(0,0,0,0.65)) drop-shadow(0 0 20px rgba(200, 160, 99, 0.3))";
        if (body) body.style.display = "block";
      } else {
        // 副卡：自然错落，只露出一部分（主卡宽 420，副卡偏移后大部分被遮）
        el.className = "carousel-card mini";
        const xOff = offset > 0 ? 1 : -1;
        // 偏移距离：abs=1 → 露 ~200px，abs=2 → 露 ~190px，abs=3 → 露 ~160px
        const xPos = xOff * (280 + (abs - 1) * 180);
        // 角度错落（按 idx 不同，旋转不同）
        const rot = miniRots[idx] || 0;
        // 略小
        const scale = abs === 1 ? 0.92 : abs === 2 ? 0.86 : 0.80;
        // 透明度提高（让副卡在暗背景下能看见）
        const opacity = abs === 1 ? 0.85 : abs === 2 ? 0.65 : 0.45;
        // Y 偏移自然错落
        const yOff = abs * 6 - 4;
        el.style.transform = `translate3d(${xPos}px, ${yOff}px, 0) rotate(${rot}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(5 - abs);
        el.style.pointerEvents = "auto";
        el.style.filter = `drop-shadow(0 4px 10px rgba(0,0,0,0.55)) brightness(${abs === 1 ? 0.85 : 0.7}) saturate(0.85)`;
        if (body) body.style.display = "none";
      }
    });
    // 圆点激活态
    const dots = carouselDots.querySelectorAll(".carousel-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === carouselIdx));
  }

  // 切换中心主卡
  function goCarousel(i) {
    carouselIdx = ((i % INTRO_DAY_CARDS.length) + INTRO_DAY_CARDS.length) % INTRO_DAY_CARDS.length;
    renderCarousel();
  }

  // 打开/关闭
  function openCarousel(startIdx) {
    carouselIdx = typeof startIdx === "number" ? startIdx : 0;
    renderCarousel();
    carousel.classList.add("open");
    carousel.setAttribute("aria-hidden", "false");
    AudioFX.cardOpen();
    // 暂停首页装饰残页飘动 + 入口卡微浮
    for (const s of decorStates) s.paused = true;
    entryPaused = true;
    carouselOpenedOnce = true;
    updateCTA();
  }
  function closeCarousel() {
    carousel.classList.remove("open");
    carousel.setAttribute("aria-hidden", "true");
    for (const s of decorStates) s.paused = false;
    entryPaused = false;
  }

  // 左右箭头
  carouselLeft.addEventListener("click", (e) => {
    e.stopPropagation();
    AudioFX.cardHover();
    goCarousel(carouselIdx - 1);
  });
  carouselRight.addEventListener("click", (e) => {
    e.stopPropagation();
    AudioFX.cardHover();
    goCarousel(carouselIdx + 1);
  });
  carouselClose.addEventListener("click", closeCarousel);
  carouselBackdrop.addEventListener("click", closeCarousel);

  // 键盘 ← →
  document.addEventListener("keydown", (e) => {
    if (!carousel.classList.contains("open")) return;
    if (e.key === "Escape") { closeCarousel(); return; }
    if (e.key === "ArrowLeft")  { AudioFX.cardHover(); goCarousel(carouselIdx - 1); }
    if (e.key === "ArrowRight") { AudioFX.cardHover(); goCarousel(carouselIdx + 1); }
  });

  // 鼠标拖拽切换
  carouselTrack.addEventListener("mousedown", (e) => {
    carouselIsDragging = true;
    carouselDragStart = e.clientX;
    carouselDragDx = 0;
  });
  window.addEventListener("mousemove", (e) => {
    if (!carouselIsDragging) return;
    carouselDragDx = e.clientX - carouselDragStart;
  });
  window.addEventListener("mouseup", () => {
    if (!carouselIsDragging) return;
    if (Math.abs(carouselDragDx) > 60) {
      AudioFX.cardHover();
      goCarousel(carouselIdx + (carouselDragDx < 0 ? 1 : -1));
    }
    carouselIsDragging = false;
    carouselDragDx = 0;
  });

  function updateCTA() {
    if (!cta) return;
    cta.disabled = false;
    if (!ctaHint) return;
    ctaHint.textContent = carouselOpenedOnce ? "已翻开残页 · 可随时开始拾荒" : "点击中央残页 · 翻阅七日记录";
  }

  // 音效开关
  const soundBtn = document.getElementById("intro-sound");
  if (soundBtn) {
    if (AudioFX.isMuted()) {
      soundBtn.textContent = "🔇";
      soundBtn.classList.add("muted");
    }
    soundBtn.addEventListener("click", () => {
      const m = AudioFX.toggleMuted();
      soundBtn.textContent = m ? "🔇" : "🔊";
      soundBtn.classList.toggle("muted", m);
    });
  }

  if (cta) {
    cta.addEventListener("click", () => {
      if (cta.disabled) return;
      AudioFX.buttonPress();
      setTimeout(() => {
        AudioFX.chime();
        closeCarousel();
        startNewGame();
      }, 220);
    });
  }

  let carouselOpenedOnce = false;

  function resetIntro() {
    carouselIdx = 0;
    carouselOpenedOnce = false;
    closeCarousel();
    for (const s of decorStates) { s.paused = false; }
    entryPaused = false;
    updateCTA();
    renderCarousel();
  }

  introScreenApi = { reset: resetIntro };
  updateCTA();
}

/* ============================================================
   ===== 像素风物品 SVG 库（22 种） =====
   ============================================================ */
const ITEM_SVG = {
  bottle: `<svg viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="0" width="4" height="1" fill="#1a0a05"/>
    <rect x="5" y="1" width="2" height="2" fill="#5a6a3a"/>
    <rect x="4" y="3" width="4" height="1" fill="#3a4a2a"/>
    <rect x="3" y="4" width="6" height="10" fill="#4a5a2a"/>
    <rect x="3" y="4" width="1" height="10" fill="#6a7a4a" opacity="0.5"/>
    <rect x="8" y="4" width="1" height="10" fill="#2a3a1a"/>
    <rect x="4" y="7" width="4" height="3" fill="#c8b478"/>
    <rect x="4" y="7" width="4" height="1" fill="#a8985a"/>
    <rect x="5" y="8" width="2" height="1" fill="#3a2a1a"/>
    <rect x="3" y="13" width="6" height="1" fill="#1a2a0a"/>
    <rect x="3" y="14" width="6" height="2" fill="#4a5a2a"/>
  </svg>`,
  box: `<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <polygon points="1,3 9,3 11,1 3,1" fill="#a8884a"/>
    <polygon points="9,3 11,1 11,9 9,11" fill="#6a4a2a"/>
    <rect x="1" y="3" width="8" height="8" fill="#8a6a3a"/>
    <rect x="1" y="3" width="8" height="1" fill="#a8884a"/>
    <rect x="1" y="10" width="8" height="1" fill="#5a4020"/>
    <rect x="4" y="1" width="4" height="1" fill="#5a4020"/>
    <rect x="4" y="3" width="1" height="8" fill="#5a4020"/>
    <rect x="2" y="5" width="2" height="2" fill="#3a2a1a"/>
    <rect x="2" y="5" width="2" height="1" fill="#5a4020"/>
  </svg>`,
  radio: `<svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2" width="12" height="9" fill="#5a4030"/>
    <rect x="1" y="2" width="12" height="2" fill="#3a2818"/>
    <rect x="1" y="2" width="12" height="1" fill="#7a5840" opacity="0.5"/>
    <rect x="1" y="10" width="12" height="1" fill="#1a0a05"/>
    <circle cx="4" cy="7" r="1.5" fill="#1a0a05"/>
    <circle cx="4" cy="7" r="0.6" fill="#c8a063"/>
    <circle cx="7" cy="7" r="1.5" fill="#1a0a05"/>
    <circle cx="7" cy="7" r="0.6" fill="#c8a063"/>
    <rect x="10" y="4" width="2" height="5" fill="#1a0a05"/>
    <rect x="10" y="5" width="2" height="1" fill="#3a2818"/>
    <rect x="10" y="7" width="2" height="1" fill="#3a2818"/>
    <rect x="2" y="0" width="1" height="2" fill="#3a2818"/>
    <rect x="3" y="-1" width="1" height="2" fill="#3a2818"/>
  </svg>`,
  cloth: `<svg viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="2" width="12" height="6" fill="#5a5a2a"/>
    <rect x="0" y="2" width="12" height="2" fill="#3a3a1a"/>
    <rect x="0" y="6" width="12" height="2" fill="#3a3a1a"/>
    <rect x="4" y="2" width="4" height="1" fill="#2a2a0a"/>
    <rect x="5" y="1" width="2" height="1" fill="#5a5a2a"/>
    <rect x="-1" y="2" width="2" height="4" fill="#5a5a2a"/>
    <rect x="11" y="2" width="2" height="4" fill="#5a5a2a"/>
    <circle cx="5" cy="4" r="0.6" fill="#c8a063"/>
    <circle cx="5" cy="6" r="0.6" fill="#c8a063"/>
  </svg>`,
  coin: `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4" fill="#c8a063"/>
    <circle cx="5" cy="5" r="3" fill="#a8884a"/>
    <circle cx="5" cy="5" r="2" fill="#c8a063"/>
    <rect x="3" y="4" width="4" height="2" fill="#8a6a36"/>
    <rect x="3" y="4" width="4" height="1" fill="#a8884a"/>
  </svg>`,
  camera: `<svg viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="3" width="10" height="6" fill="#3a3028"/>
    <rect x="1" y="3" width="10" height="1" fill="#5a4a3a"/>
    <rect x="1" y="8" width="10" height="1" fill="#1a1008"/>
    <rect x="4" y="1" width="4" height="2" fill="#3a3028"/>
    <rect x="2" y="2" width="2" height="1" fill="#c8a063"/>
    <circle cx="6" cy="6" r="2" fill="#1a0a00"/>
    <circle cx="6" cy="6" r="1.5" fill="#3a2a1a"/>
    <circle cx="6" cy="6" r="0.5" fill="#c8a063"/>
  </svg>`,
  glass: `<svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="0" width="6" height="1" fill="#5a8a8a"/>
    <rect x="3" y="1" width="4" height="1" fill="#3a6a6a"/>
    <rect x="2" y="0" width="1" height="1" fill="#8ababa" opacity="0.6"/>
    <rect x="3" y="2" width="4" height="8" fill="#4a7a7a"/>
    <rect x="3" y="2" width="1" height="8" fill="#6a9a9a" opacity="0.5"/>
    <rect x="6" y="2" width="1" height="8" fill="#2a5a5a"/>
    <rect x="3" y="10" width="4" height="1" fill="#2a5a5a"/>
    <rect x="2" y="11" width="6" height="1" fill="#1a4a4a"/>
  </svg>`,
  wire: `<svg viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="2" width="10" height="1" fill="#c8a063"/>
    <rect x="1" y="3" width="10" height="1" fill="#a8884a"/>
    <rect x="1" y="4" width="10" height="1" fill="#c8a063"/>
    <rect x="1" y="5" width="10" height="1" fill="#a8884a"/>
    <rect x="1" y="6" width="10" height="1" fill="#c8a063"/>
    <rect x="1" y="7" width="10" height="1" fill="#a8884a"/>
    <rect x="0" y="4" width="2" height="2" fill="#c8a063"/>
    <rect x="0" y="5" width="1" height="1" fill="#8a6a36"/>
  </svg>`,
  bag: `<svg viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0 L8 0 L8 3 L4 3 Z" fill="none" stroke="#5a4030" stroke-width="0.8"/>
    <rect x="1" y="3" width="10" height="6" fill="#7a4030"/>
    <rect x="1" y="3" width="10" height="1" fill="#5a2818"/>
    <rect x="1" y="8" width="10" height="1" fill="#3a1810"/>
    <rect x="5" y="4" width="2" height="1" fill="#c8a063"/>
    <rect x="1" y="5" width="10" height="0.4" fill="#3a1810"/>
    <rect x="1" y="7" width="10" height="0.4" fill="#3a1810"/>
  </svg>`,
  paper: `<svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" fill="#d4c8a8"/>
    <rect x="1" y="1" width="6" height="1" fill="#b8a878"/>
    <rect x="1" y="6" width="6" height="1" fill="#8a7a48"/>
    <rect x="3" y="2" width="2" height="1" fill="#a8985a"/>
    <rect x="2" y="4" width="4" height="1" fill="#a8985a"/>
    <rect x="3" y="5" width="2" height="1" fill="#a8985a"/>
    <rect x="5" y="3" width="2" height="2" fill="#a8985a" opacity="0.5"/>
  </svg>`,
  // —— 10 个新物品（按 brief 列表）——
  cable: `<svg viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5 Q3 1 5 5 T9 5 T13 5" stroke="#3a3028" stroke-width="1.2" fill="none"/>
    <path d="M1 5 Q3 1 5 5 T9 5 T13 5" stroke="#5a4a3a" stroke-width="0.4" fill="none"/>
    <rect x="0" y="4" width="2" height="2" fill="#1a1008"/>
    <rect x="12" y="4" width="2" height="2" fill="#1a1008"/>
    <rect x="0" y="4" width="2" height="1" fill="#5a4a3a"/>
    <rect x="12" y="4" width="2" height="1" fill="#5a4a3a"/>
  </svg>`,
  receipt: `<svg viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1 L7 1 L7 11 L5 10 L4 11 L3 10 L1 11 Z" fill="#e8d8b8"/>
    <rect x="2" y="3" width="4" height="0.5" fill="#3a2a1a"/>
    <rect x="2" y="4.5" width="3" height="0.5" fill="#3a2a1a"/>
    <rect x="2" y="6" width="4" height="0.5" fill="#3a2a1a"/>
    <rect x="2" y="7.5" width="2" height="0.5" fill="#3a2a1a"/>
    <rect x="5" y="3" width="1" height="0.5" fill="#b85c4a"/>
    <rect x="1" y="1" width="6" height="1" fill="#c8b478" opacity="0.5"/>
  </svg>`,
  raincoat: `<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1 L10 3 L11 11 L9 11 L9 5 L7 5 L7 11 L5 11 L5 5 L3 5 L3 11 L1 11 L2 3 Z" fill="#4a4a2a"/>
    <path d="M6 1 L10 3 L9 4 L7 3 Z" fill="#5a5a3a"/>
    <rect x="5" y="2" width="2" height="2" fill="#3a3a1a"/>
    <rect x="1" y="11" width="10" height="1" fill="#2a2a0a"/>
  </svg>`,
  pillbox: `<svg viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="10" height="8" fill="#d4d4d4"/>
    <rect x="0" y="0" width="10" height="2" fill="#b8b8b8"/>
    <rect x="0" y="6" width="10" height="2" fill="#8a8a8a"/>
    <rect x="3" y="3" width="1.5" height="2" fill="#ff6644"/>
    <rect x="5" y="3" width="1.5" height="2" fill="#ffaa44"/>
    <rect x="0" y="0" width="10" height="0.5" fill="#ffffff" opacity="0.4"/>
    <text x="5" y="6" font-family="monospace" font-size="1.5" fill="#3a3a3a" text-anchor="middle">+</text>
  </svg>`,
  can: `<svg viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="4" cy="1" rx="3" ry="1" fill="#8a4040"/>
    <ellipse cx="4" cy="1" rx="3" ry="1" fill="#aa5050" opacity="0.5"/>
    <rect x="1" y="1" width="6" height="8" fill="#aa5050"/>
    <rect x="1" y="2" width="6" height="1" fill="#8a4040"/>
    <rect x="1" y="8" width="6" height="1" fill="#6a2828"/>
    <rect x="1" y="1" width="2" height="8" fill="#cc6060" opacity="0.3"/>
    <rect x="2" y="4" width="4" height="2" fill="#f0e8c8" opacity="0.8"/>
    <rect x="3" y="5" width="2" height="0.5" fill="#3a2a1a"/>
  </svg>`,
  battery: `<svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="0" width="2" height="1" fill="#8a8a8a"/>
    <rect x="1" y="1" width="4" height="10" fill="#d4c898"/>
    <rect x="1" y="1" width="4" height="2" fill="#e8d8a8"/>
    <rect x="1" y="9" width="4" height="2" fill="#8a7a48"/>
    <rect x="0" y="3" width="1" height="6" fill="#a8884a"/>
    <rect x="5" y="3" width="1" height="6" fill="#a8884a"/>
    <rect x="1" y="5" width="4" height="3" fill="#c8a063"/>
    <rect x="1" y="5" width="4" height="0.5" fill="#3a2a1a"/>
  </svg>`,
  key: `<svg viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="3" r="2" fill="#c8a063"/>
    <circle cx="2" cy="3" r="1" fill="#0a0807"/>
    <rect x="4" y="2" width="8" height="2" fill="#c8a063"/>
    <rect x="9" y="4" width="1" height="2" fill="#c8a063"/>
    <rect x="11" y="4" width="1" height="2" fill="#c8a063"/>
    <rect x="4" y="2" width="8" height="0.5" fill="#e8c878"/>
  </svg>`,
  regform: `<svg viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="8" fill="#f0e8c8"/>
    <rect x="1" y="1" width="6" height="1.5" fill="#b85c4a"/>
    <rect x="2" y="3.5" width="3" height="0.5" fill="#3a2a1a"/>
    <rect x="2" y="5" width="4" height="0.5" fill="#3a2a1a"/>
    <rect x="2" y="6.5" width="2" height="0.5" fill="#3a2a1a"/>
    <rect x="2" y="8" width="3" height="0.5" fill="#3a2a1a"/>
    <rect x="1" y="1" width="6" height="1" fill="#ffffff" opacity="0.3"/>
    <rect x="5" y="1" width="1.5" height="0.8" fill="#f0e8c8" opacity="0.8"/>
  </svg>`,
  backpack: `<svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3 Q4 0 7 0 Q10 0 10 3" stroke="#3a2a1a" stroke-width="1.2" fill="none"/>
    <rect x="2" y="4" width="10" height="9" fill="#5a4030"/>
    <rect x="2" y="4" width="10" height="1" fill="#7a5840"/>
    <rect x="2" y="12" width="10" height="1" fill="#2a1a0a"/>
    <rect x="4" y="6" width="6" height="0.5" fill="#2a1a0a"/>
    <rect x="4" y="7" width="6" height="3" fill="#3a2818"/>
    <rect x="6" y="8" width="2" height="1" fill="#c8a063"/>
    <rect x="2" y="5" width="1" height="7" fill="#7a5840" opacity="0.4"/>
  </svg>`,
  flashlight: `<svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="4" height="6" fill="#3a3028"/>
    <rect x="1" y="4" width="4" height="2" fill="#5a4a3a"/>
    <rect x="0" y="2" width="6" height="3" fill="#5a4a3a"/>
    <rect x="0" y="1" width="6" height="2" fill="#c8a063"/>
    <circle cx="3" cy="2" r="1" fill="#fff5d8"/>
    <rect x="2" y="9" width="2" height="1" fill="#1a1008"/>
  </svg>`,
  leaf: `<svg viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1 L10 4 L8 9 L4 9 L2 4 Z" fill="#6a5a2a"/>
    <path d="M6 1 L8 4 L6 9 L4 4 Z" fill="#8a7a3a"/>
    <line x1="6" y1="2" x2="6" y2="9" stroke="#4a3a1a" stroke-width="0.4"/>
    <line x1="4" y1="4" x2="8" y2="4" stroke="#4a3a1a" stroke-width="0.3"/>
    <line x1="4" y1="6" x2="8" y2="6" stroke="#4a3a1a" stroke-width="0.3"/>
  </svg>`,
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
