// 1-question
// function range(start, end, step = 1) {
//     let ans = []
//     if (end > start) {
//         for (let i = start; i < end; i += step) {
//             ans.push(i)
//         }
//     } else if (end != undefined) {
//         for (let i = start; i >= end; i += step) {
//             ans.push(i)
//         }
//     } else {
//         for (let i = 0; i < start; i++) {
//             ans.push(i)
//         }
//     }
//     return ans;
// }
// function squaresOfEvens(n) {
//     let ans = [];
//     for (let i = 0; i < n; i++) {
//         if (i % 2 == 0) {
//             ans.push(i * i);
//         }
//     }
//     return ans;
// }
//2. question
// function product(...arrays) {
//     let ans = [];
//     const [x, y] = arrays
//     if (x == undefined && y == undefined) {
//         ans.push([])
//         return ans
//     }
//     for (let i = 0; i < x.length; i++) {
//         for (let j = 0; j < y.length; j++) {
//             ans.push([x[i], y[j]])
//         }
//     }
//     return ans;
// }
// function triples(n) {
//     let ans = []
//     for (let i = 1; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             let x = i * i + j * j;
//             let y = Math.sqrt(x)
//             if (Number.isInteger(y) && y <= n) {
//                 ans.push([i, j, y]);
//             }
//         }
//     }
//     return ans;
// }
// // 3. Flatten without .flat()
// function flatten(arr, depth = 1) {
//     if (depth == 0) return arr;
//     let ans = []
//     if (!arr.some(Array.isArray)) return arr;
//     for (let i = 0; i < arr.length; i++) {
//         if (!Array.isArray(arr[i])) {
//             ans.push(arr[i])
//         } else {
//             for (let j = 0; j < arr[i].length; j++) {
//                 ans.push(arr[i][j])
//             }
//         }
//     }
//     return flatten(ans, depth - 1)
// }
// function product(...arrays) {
//     return arrays.reduce((acc, curr) =>
//         acc.flatMap(proto => curr.map(item => [...proto, item])),
//         [[]]
//     );
// }

// 4. Chunk an array 
// function chunk(arr, size) {
//     let ans = []
//     let x = Math.ceil(arr.length / size);
//     let y = 0
//     for (let i = 0; i < x; i++) {
//         let a = size;
//         let b = []
//         while (a) {
//             if (y < arr.length) {
//                 b.push(arr[y])
//             } else {
//                 break
//             }
//             y++;
//             a--;
//         }
//         ans.push(b)
//     }
//     return ans;
// }
// // 5. Count by keys
function countBy(arr, keyFn) {
    return arr.reduce((result, value) => {
        const key = typeof keyFn === 'function' ? keyFn(value) : value[keyFn];
        result[key] = (result[key] || 0) + 1;
        return result;
    }, {});
}
// // 6. Top product by revenue

// function topProductsByRevenue(orders, n = 3) {
//     const resul = {}
//     for (const order of orders) {
//         let x = order.qty * order.price
//         resul[order.product] = (resul[order.product] || 0) + x
//     }
//     const result = Object.keys(resul).map(product => ({
//         product: product,
//         revenue: resul[product]
//     }));
//     result.sort((a, b) => b.revenue - a.revenue)
//     return result.slice(0, n)

// }
// //7. zip and unzip
// function zip(...arrays) {
//     let min = Infinity
//     if (arrays.length === 0) return [];
//     for (let i = 0; i < arrays.length; i++) {
//         if (arrays[i].length < min) min = arrays[i].length

//     }
//     let res = []
//     for (let i = 0; i < min; i++) {
//         let res1 = []
//         for (let j = 0; j < arrays.length; j++) {
//             res1.push(arrays[j][i])
//         }
//         res.push(res1)
//     }
//     return res
// }
// function unzip(pairs) {
//     let a = pairs.length
//     let b = pairs[0].length
//     let res = []
//     for (let i = 0; i < b; i++) {
//         let res1 = []
//         for (let j = 0; j < a; j++) {
//             res1.push(pairs[j][i])
//         }
//         res.push(res1)
//     }
//     return res
// }

// // 8. sliding windows and moving average
function windows(arr, k) {
    if (k > arr.length || k <= 0) return [];
    let res = []
    let res1 = []
    for (let i = 0; i < k; i++) {
        res1.push(arr[i])
    }
    res.push([...res1])
    for (let i = k; i < arr.length; i++) {
        res1.shift()
        res1.push(arr[i])
        res.push([...res1])
    }
    return res
}
function movingAverage(arr, k) {
    if (k > arr.length || k <= 0) return [];
    let res = 0
    let left = 0
    let array = []
    for (let i = 0; i < k; i++) {
        res += arr[i]
    }
    let x = res / k
    array.push(x)
    for (let i = k; i < arr.length; i++) {
        res -= arr[left]
        left++;
        res += arr[i]
        x = res / k
        array.push(x)
    }
    return array
}



// — Checks (don't edit below) —
process.on('unhandledRejection', () => { });
let passed = 0;
let failed = 0;
const isEqual = (a, b) => {
    if (Object.is(a, b)) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a);
    return ka.length === Object.keys(b).length && ka.every((k) => Object.hasOwn(b, k) && isEqual(a[k], b[k]));
};
const show = (v) => {
    try {
        return v === undefined ? 'undefined' : JSON.stringify(v);
    } catch {
        return String(v);
    }
};
const report = (ok, label, detail) => {
    if (ok) passed++;
    else failed++;
    console.log(ok ? `  PASS  ${label}` : `  FAIL  ${label}\n        ${detail}`);
};
async function check(label, getActual, expected) {
    try {
        const actual = await getActual();
        report(isEqual(actual, expected), label, `expected: ${show(expected)}\nreceived: ${show(actual)}`);
    } catch (err) {
        report(false, label, `threw: ${err && err.message}`);
    }
}
async function checkThrows(label, fn, messagePart) {
    try {
        await fn();
        report(false, label, 'expected an error, but nothing was thrown');
    } catch (err) {
        const message = String(err && err.message);
        report(message !== 'TODO' && message.includes(messagePart), label, message === 'TODO' ? 'not implemented yet' : `expected an error containing "${messagePart}", got "${message}"`);
    }
}
// ===== PASTE THIS AT THE VERY BOTTOM of your file (after checkThrows) =====

const section = (title) => console.log(`\n${title}`);
const summary = () => console.log(`\n${passed} passed, ${failed} failed\n`);

// (async () => {
//     section('Q1 range and squaresOfEvens');
//     await check('range(5)', () => range(5), [0, 1, 2, 3, 4]);
//     await check('range(2, 10, 3)', () => range(2, 10, 3), [2, 5, 8]);
//     await check('range(5, 0, -2)', () => range(5, 0, -2), [5, 3, 1]);
//     await check('squaresOfEvens(10)', () => squaresOfEvens(10), [0, 4, 16, 36, 64]);
// (async () => {

// section('Q2 product and triples');
// await check('product of two arrays', () => product([1, 2], ['a', 'b']), [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]);
// await check('product with no arguments', () => product(), [[]]);
// await check('triples(13)', () => triples(13), [[3, 4, 5], [5, 12, 13], [6, 8, 10]]);
// (async () => {

// section('Q3 flatten');
// await check('default depth = 1', () => flatten([1, [2, [3, [4]]]]), [1, 2, [3, [4]]]);
// await check('depth Infinity', () => flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);
// (async () => {
//     section('Q4 chunk');
//     await check('chunk of 5 by 2', () => chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
//     await check('chunk of empty array', () => chunk([], 3), []);
// (async () => {
//     section('Q5 countBy');
//     await check('count by first letter', () => countBy(['apple', 'avocado', 'banana', 'cherry', 'blueberry'], (w) => w[0]), { a: 2, b: 2, c: 1 });
// (async () => {
// section('Q6 topProductsByRevenue');
// await check('revenue, highest first', () => topProductsByRevenue([{ product: 'pen', qty: 10, price: 5 }, { product: 'bag', qty: 1, price: 900 }]), [{ product: 'bag', revenue: 900 }, { product: 'pen', revenue: 50 }]);
// (async () => {
// section('Q7 zip and unzip');
// await check('zip stops at shortest', () => zip([1, 2, 3], ['a', 'b', 'c'], [true, false]), [[1, 'a', true], [2, 'b', false]]);
// await check('unzip', () => unzip([[1, 'a'], [2, 'b']]), [[1, 2], ['a', 'b']]);
(async () => {
    section('Q8 windows and movingAverage');
    await check('windows of 3', () => windows([1, 2, 3, 4, 5], 3), [[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
    await check('window bigger than array', () => windows([1, 2], 3), []);
    await check('movingAverage', () => movingAverage([10, 20, 30, 40], 2), [15, 25, 35]);

    summary();
})();