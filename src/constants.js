export const BS = 32 // unit size in pixels
export const origWidth = 900
export const origHeight = 575

export const GAMESTATE = {
    STARTMENU: 0,
    LOADING: 1,
    PLAY: 2,
    GLIDE: 3,
}

export const ENV = {
    PRODUCTION: 0,
    DEVELOPMENT: 1,
}

// maps values in map grid with location of images within sprite sheet
export const itemMap = {
    i: { x: 0, y: 0 },
    ia: {
        x: 0,
        y: 0,
        description: 'A Lantern to light the way. Lasts 5 minutes.',
        type: 'Consumable',
        sellPrice: 16,
        buyPrice: 64,
        maxStack: 50,
    },
    ib: {
        x: 1,
        y: 0,
        description: 'A Torch to light the way. Lasts 2 minutes.',
        type: 'Consumable',
        sellPrice: 8,
        buyPrice: 32,
        maxStack: 50,
    },
    ic: {
        x: 2,
        y: 0,
        description: 'A Candle to light the way. Lasts 1 minutes.',
        type: 'Consumable',
        sellPrice: 2,
        buyPrice: 8,
        maxStack: 50,
    },
    id: {
        x: 3,
        y: 0,
        description: 'Rope to increase durability of an item.',
        type: 'Consumable',
        sellPrice: 16,
        buyPrice: 64,
        maxStack: 50,
    },
    ie: {
        x: 4,
        y: 0,
        description:
            'Red Tome. When used increases users ranged Fire magic skill',
        type: 'Consumable',
        sellPrice: 200,
        buyPrice: 10240,
        maxStack: 50,
    },
    if: {
        x: 5,
        y: 0,
        description:
            'Dark Tome. When used increases users ranged Dark magic skill',
        type: 'Consumable',
        sellPrice: 200,
        buyPrice: 10240,
        maxStack: 50,
    },
    ig: {
        x: 6,
        y: 0,
        description:
            'Green Journal. Return Philips journal to receive your reward in Silver Creak Town.',
        type: 'Quest',
        sellPrice: undefined,
        buyPrice: undefined,
        maxStack: 50,
    },
    ih: {
        x: 7,
        y: 0,
        description: 'Collect 100 Parchment to Craft a Tome of your choice.',
        type: 'Crafting',
        sellPrice: 2,
        buyPrice: undefined,
        maxStack: 100,
    },
    ii: { x: 8, y: 0 },
    ij: { x: 9, y: 0 },
    ik: { x: 10, y: 0 },
    il: { x: 11, y: 0 },
    im: { x: 0, y: 1 },
    in: { x: 1, y: 1 },
    io: { x: 2, y: 1 },
    ip: { x: 3, y: 1 },
    iq: { x: 4, y: 1 },
    ir: { x: 5, y: 1 },
    is: { x: 6, y: 1 },
    it: { x: 7, y: 1 },
    iu: { x: 8, y: 1 },
    iv: { x: 9, y: 1 },
    iw: { x: 10, y: 1 },
    ix: { x: 11, y: 1 },
    iy: { x: 0, y: 2 },
    iz: { x: 1, y: 2 },
}

export const ITEMS = {
    LANTERN: 'ia',
    TORCH: 'ib',
    CANDLE: 'ic',
    ROPE: 'id',
}
