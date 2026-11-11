// Q1. Title case
function toTitleCase(str) {
  const small = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'of', 'in', 'on', 'at', 'to', 'for']);
  return str
    .trim()
    .split(/\s+/)
    .map((word, i) => {
      const w = word.toLowerCase();
      if (i > 0 && small.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

// Q2. camelCase, snake_case and kebab-case
function splitWords(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

function toCamelCase(str) {
  return splitWords(str)
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('');
}

function toSnakeCase(str) {
  return splitWords(str).join('_');
}

function toKebabCase(str) {
  return splitWords(str).join('-');
}

// Q3. Palindromes and character counts
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === [...clean].reverse().join('');
}

function mostFrequentChar(str) {
  const counts = new Map(); // Map keeps insertion order -> "first seen"
  for (const ch of str) {
    if (/\s/.test(ch)) continue;
    counts.set(ch, (counts.get(ch) || 0) + 1);
  }
  let best = null;
  for (const [char, count] of counts) {
    if (best === null || count > best.count) best = { char, count };
  }
  return best;
}

// Q4. Template rendering
function renderTemplate(template, data) {
  return template.replace(/\{\{\s*([^{}\s]+)\s*\}\}/g, (_, path) => {
    const value = path
      .split('.')
      .reduce((obj, key) => (obj == null ? undefined : obj[key]), data);
    return value == null ? '' : String(value);
  });
}

// Q5. Query strings (no URLSearchParams)
function parseQueryString(qs) {
  const result = {};
  const decode = (s) => decodeURIComponent(s.replace(/\+/g, ' '));
  const clean = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!clean) return result;

  for (const part of clean.split('&')) {
    if (!part) continue;
    const idx = part.indexOf('=');
    const key = decode(idx === -1 ? part : part.slice(0, idx));
    const value = idx === -1 ? '' : decode(part.slice(idx + 1));

    if (Object.hasOwn(result, key)) {
      result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
    } else {
      result[key] = value;
    }
  }
  return result;
}

function buildQueryString(params) {
  const enc = encodeURIComponent;
  const parts = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    const values = Array.isArray(value) ? value : [value];
    for (const v of values) parts.push(`${enc(key)}=${enc(String(v))}`);
  }
  return parts.join('&');
}

// Q6. Password strength
function passwordStrength(password) {
  const score = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const strength = score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
  return { score, strength };
}

// Q7. Run-length encoding
function rleEncode(str) {
  return str.replace(/([\s\S])\1*/g, (run, ch) => ch + run.length);
}

function rleDecode(str) {
  return str.replace(/(\D)(\d+)/g, (_, ch, n) => ch.repeat(Number(n)));
}

// Q8. Slugs and email masking
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function maskEmail(email) {
  const at = email.lastIndexOf('@');
  const local = email.slice(0, at);
  const domain = email.slice(at);
  if (local.length <= 1) return '*' + domain;
  if (local.length === 2) return local[0] + '*' + domain;
  return local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] + domain;
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

  // ---------- Q1 toTitleCase ----------
  // sec('Q1 toTitleCase');
  // await check('the lord of the rings', () => toTitleCase('the lord of the rings'), 'The Lord of the Rings');
  // await check('small words stay lower, first word capital', () => toTitleCase('a tale OF two cities'), 'A Tale of Two Cities');

  // ---------- Q2 camelCase, snake_case, kebab-case ----------
  // sec('Q2 toCamelCase, toSnakeCase and toKebabCase');
  // await check('toCamelCase with _ and -', () => toCamelCase('user_first-name'), 'userFirstName');
  // await check('toCamelCase with spaces', () => toCamelCase('Hello World'), 'helloWorld');
  // await check('toSnakeCase', () => toSnakeCase('userFirstName'), 'user_first_name');
  // await check('toKebabCase', () => toKebabCase('User First_Name'), 'user-first-name');

  // // ---------- Q3 isPalindrome and mostFrequentChar ----------
  sec('Q3 isPalindrome and mostFrequentChar');
  await check('palindrome with punctuation', () => isPalindrome('A man, a plan, a canal: Panama'), true);
  await check('not a palindrome', () => isPalindrome('hello'), false);
  await check('mostFrequentChar', () => mostFrequentChar('programming'), { char: 'r', count: 2 });

  // // ---------- Q4 renderTemplate ----------
  // sec('Q4 renderTemplate');
  // await check('nested path and missing key', () => renderTemplate('Hello {{ user.name }}!{{missing}}', { user: { name: 'Ravi' } }), 'Hello Ravi!');
  // await check('0 and false are kept', () => renderTemplate('{{n}} items, done: {{ done }}', { n: 0, done: false }), '0 items, done: false');

  // // ---------- Q5 parseQueryString and buildQueryString ----------
  // sec('Q5 parseQueryString and buildQueryString');
  // await check('parseQueryString full', () => parseQueryString('?q=js%20tips&page=2&tag=a&tag=b&empty=&flag'), { q: 'js tips', page: '2', tag: ['a', 'b'], empty: '', flag: '' });
  // await check('parseQueryString plus sign', () => parseQueryString('q=hello+world'), { q: 'hello world' });
  // await check('parseQueryString empty', () => parseQueryString(''), {});
  // await check('buildQueryString', () => buildQueryString({ q: 'js tips', tag: ['a', 'b'], page: 2, skip: undefined }), 'q=js%20tips&tag=a&tag=b&page=2');

  // // ---------- Q6 passwordStrength ----------
  // sec('Q6 passwordStrength');
  // await check('weak password', () => passwordStrength('abc'), { score: 1, strength: 'weak' });
  // await check('strong password', () => passwordStrength('Abcdefg1!'), { score: 5, strength: 'strong' });

  // // ---------- Q7 rleEncode and rleDecode ----------
  // sec('Q7 rleEncode and rleDecode');
  // await check('rleEncode', () => rleEncode('aaabccdddd'), 'a3b1c2d4');
  // await check('rleEncode empty', () => rleEncode(''), '');
  // await check('rleDecode', () => rleDecode('a3b1c2d4'), 'aaabccdddd');
  // await check('rleDecode two digit count', () => rleDecode('x12y1'), 'xxxxxxxxxxxxy');

  // // ---------- Q8 slugify and maskEmail ----------
  // sec('Q8 slugify and maskEmail');
  // await check('slugify spaces and punctuation', () => slugify('  Hello, World! 2026  '), 'hello-world-2026');
  // await check('slugify dashes and &', () => slugify('JS -- Tips & Tricks'), 'js-tips-tricks');
  // await check('maskEmail', () => maskEmail('nani.vishu@gmail.com'), 'n********u@gmail.com');
  // await check('maskEmail short name', () => maskEmail('ab@x.com'), 'a*@x.com');

  done();
})();