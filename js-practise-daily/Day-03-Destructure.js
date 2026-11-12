function getUserSummary(user) {
    const {
        profile: { name, address: { city = 'Unknown' } = {} } = {},
        roles: [role = 'guest'] = []
    } = user;

    return `${name} from ${city} (${role})`;
}


function mergeSettings(defaults, ...overrides) {
    const result = { ...defaults }
    for (let i = 0; i < overrides.length; i++) {
        const new_obj = overrides[i]
        if (!new_obj) continue
        const keys = Object.keys(new_obj)
        for (let j = 0; j < keys.length; j++) {
            if (new_obj[keys[j]] !== undefined) {
                result[keys[j]] = new_obj[keys[j]]
            }


        }
    }
    return result
}

function sanitizeUser(user) {
    const { _id, name, email, password, __v } = user
    return {
        id: _id,
        name: name,
        email: email

    }
}
function stats(...nums) {
    if (nums.length === 0) {
        return {
            count: 0,
            min: null,
            max: null,
            sum: 0,
            avg: null
        }
    } else {
        let min = nums[0];
        let max = nums[0];
        let sum = nums[0];
        for (let i = 1; i < nums.length; i++) {
            sum = sum + nums[i];
            min = Math.min(min, nums[i]);
            max = Math.max(max, nums[i]);
        }
        return {
            count: nums.length,
            min: min,
            max: max,
            sum: sum,
            avg: sum / nums.length,

        }
    }
}

function setIn(obj, path, value) {
    if (path.length === 0) {
        return value;
    }

    const [head, ...tail] = path;
    const current = obj != null && typeof obj === 'object' ? obj : {};
    const nextObj = current[head];

    return {
        ...current,
        [head]: setIn(nextObj, tail, value),
    };
}
function parseArgs(argv) {
    let command = null;
    const args = [];
    const flags = {};


    for (const token of argv.slice(2)) {
        if (token.startsWith('--')) {

            const [key, ...valueParts] = token.slice(2).split('=');
            flags[key] = valueParts.length > 0 ? valueParts.join('=') : true;
        } else if (token.startsWith('-') && token.length > 1) {

            const key = token.slice(1);
            flags[key] = true;
        } else {

            if (command === null) {
                command = token;
            } else {
                args.push(token);
            }
        }
    }

    return { command, args, flags };
}
function createUser({
    name,
    email,
    role = 'user',
    tags = [],
    ...meta
} = {}) {
    if (!name) {
        throw new Error('name is required');
    }

    return {
        name,
        email,
        role,
        tags,
        meta,
    };
}
function insertAt(arr, index, ...items) {
    return [
        ...arr.slice(0, index),
        ...items,
        ...arr.slice(index)
    ];
}

function removeAt(arr, index) {
    return [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];
}

function move(arr, from, to) {
    const item = arr[from];
    const withoutItem = removeAt(arr, from);
    return insertAt(withoutItem, to, item);
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




(async () => {
    const sec = (title) => console.log(`\n${title}`);
    const done = () => console.log(`\n${passed} passed, ${failed} failed\n`);

    // ---------- Q1 getUserSummary ----------
    // sec('Q1 getUserSummary');
    // await check('full user', () => getUserSummary({ profile: { name: 'Asha', address: { city: 'Hyderabad' } }, roles: ['admin'] }), 'Asha from Hyderabad (admin)');
    // await check('missing address and empty roles', () => getUserSummary({ profile: { name: 'Ravi' }, roles: [] }), 'Ravi from Unknown (guest)');

    // ---------- Q2 mergeSettings ----------
    // sec('Q2 mergeSettings');
    // const defaults = { theme: 'light', fontSize: 14, autosave: true };
    // await check('later values win, undefined ignored', () => mergeSettings(defaults, { fontSize: 16 }, { theme: 'dark', autosave: undefined }), { theme: 'dark', fontSize: 16, autosave: true });
    // await check('defaults not changed', () => defaults, { theme: 'light', fontSize: 14, autosave: true });

    // // ---------- Q3 sanitizeUser ----------
    // sec('Q3 sanitizeUser');
    // await check('rename _id, remove password and __v', () => sanitizeUser({ _id: 'a1', name: 'Asha', email: 'a@x.com', password: 'hash', __v: 0 }), { id: 'a1', name: 'Asha', email: 'a@x.com' });

    // // ---------- Q4 stats ----------
    // sec('Q4 stats');
    // await check('stats with numbers', () => stats(4, 8, 15, 16, 23, 42), { count: 6, min: 4, max: 42, sum: 108, avg: 18 });
    // await check('stats with no numbers', () => stats(), { count: 0, min: null, max: null, sum: 0, avg: null });

    // // ---------- Q5 setIn ----------
    // sec('Q5 setIn');
    // const obj = { a: { b: { c: 1 }, x: [1] }, y: 2 };
    // await check('sets the nested value', () => setIn(obj, ['a', 'b', 'c'], 99), { a: { b: { c: 99 }, x: [1] }, y: 2 });
    // await check('original is unchanged', () => obj, { a: { b: { c: 1 }, x: [1] }, y: 2 });
    // await check('untouched branch is the same array', () => setIn(obj, ['a', 'b', 'c'], 99).a.x === obj.a.x, true);
    // await check('missing levels are created', () => setIn({}, ['a', 'b'], 5), { a: { b: 5 } });

    // // ---------- Q6 parseArgs ----------
    sec('Q6 parseArgs');
    await check('command, args and flags', () => parseArgs(['node', 'app.js', 'deploy', 'staging', '--env=prod', '--force', '-v']), { command: 'deploy', args: ['staging'], flags: { env: 'prod', force: true, v: true } });
    await check('nothing given', () => parseArgs(['node', 'app.js']), { command: null, args: [], flags: {} });

    // // ---------- Q7 createUser ----------
    // sec('Q7 createUser');
    // await check('defaults and meta', () => createUser({ name: 'Asha', email: 'a@x.com', plan: 'pro' }), { name: 'Asha', email: 'a@x.com', role: 'user', tags: [], meta: { plan: 'pro' } });
    // await checkThrows('createUser() throws', () => createUser(), 'name is required');

    // // ---------- Q8 insertAt, removeAt, move ----------
    // sec('Q8 insertAt, removeAt and move');
    // await check('insertAt', () => insertAt([1, 2, 5], 2, 3, 4), [1, 2, 3, 4, 5]);
    // await check('removeAt', () => removeAt(['a', 'b', 'c'], 1), ['a', 'c']);
    // await check('move', () => move(['a', 'b', 'c', 'd'], 0, 2), ['b', 'c', 'a', 'd']);
    // await check('move does not change the input', () => {
    //     const input = ['a', 'b', 'c', 'd'];
    //     move(input, 0, 2);
    //     return input;
    // }, ['a', 'b', 'c', 'd']);

    done();
})();
