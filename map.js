
export const MAP_WIDTH = 15;
export const MAP_HEIGHT = 15;

export let map = [];
export let rooms = [];

// 最小値〜最大値のランダムな整数
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 2つの部屋が重なりすぎていないか調べる
function overlaps(roomA, roomB) {
    const margin = 1;

    return (
        roomA.x - margin < roomB.x + roomB.w &&
        roomA.x + roomA.w + margin > roomB.x &&
        roomA.y - margin < roomB.y + roomB.h &&
        roomA.y + roomA.h + margin > roomB.y
    );
}

// 部屋の中心座標を取得
function getCenter(room) {
    return {
        x: Math.floor(room.x + room.w / 2),
        y: Math.floor(room.y + room.h / 2)
    };
}

// 横方向の通路を作る
function digHorizontal(y, x1, x2, newMap) {
    const start = Math.min(x1, x2);
    const end = Math.max(x1, x2);

    for (let x = start; x <= end; x++) {
        newMap[y][x] = 0;
    }
}

// 縦方向の通路を作る
function digVertical(x, y1, y2, newMap) {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);

    for (let y = start; y <= end; y++) {
        newMap[y][x] = 0;
    }
}

// 新しいマップを生成する
export function changeRandomMap() {
    // 1. マップ全体を壁にする
    const newMap = [];

    for (let y = 0; y < MAP_HEIGHT; y++) {
        newMap.push(Array(MAP_WIDTH).fill(1));
    }

    rooms = [];

    // 2. 重ならない部屋を4つ作る
    const roomCount = 4;
    let attempts = 0;
    const maxAttempts = 200;

    while (rooms.length < roomCount && attempts < maxAttempts) {
        attempts++;

        const w = rand(3, 6);
        const h = rand(3, 6);

        // 外周を壁として残す
        const x = rand(1, MAP_WIDTH - w - 1);
        const y = rand(1, MAP_HEIGHT - h - 1);

        const newRoom = { x, y, w, h };

        // 既存の部屋と近すぎたら作らない
        if (rooms.some(room => overlaps(room, newRoom))) {
            continue;
        }

        rooms.push(newRoom);

        // 部屋の中を床にする
        for (let ry = y; ry < y + h; ry++) {
            for (let rx = x; rx < x + w; rx++) {
                newMap[ry][rx] = 0;
            }
        }
    }

    // 3. 部屋を順番に通路でつなぐ
    for (let i = 1; i < rooms.length; i++) {
        const previous = getCenter(rooms[i - 1]);
        const current = getCenter(rooms[i]);

        // 横→縦のL字型通路
        digHorizontal(
            previous.y,
            previous.x,
            current.x,
            newMap
        );

        digVertical(
            current.x,
            previous.y,
            current.y,
            newMap
        );
    }

    // 4. 生成したマップを反映
    map = newMap;
}

// ゲーム開始時にもマップを生成する
changeRandomMap();
