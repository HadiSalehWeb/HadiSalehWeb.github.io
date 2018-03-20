// 1 - 10

const last = arr => arr[arr.length - 1];

const butLast = arr => arr[arr.length - 2];

const elementAt = arr => i => arr[i - 1];

const length = arr => arr.length;

const reverse = arr => Array(arr.length).fill(undefined).map((a, i) => arr[arr.length - i - 1]);

const isPalindrome = arr => arr.slice(0, Math.ceil(arr.length * .5)).reduce((acc, curr, i) => acc && curr == arr[arr.length - i - 1], true);

const flatten = arr => arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), [])

const compress = arr => arr.reduce((acc, curr) => curr == last(acc) ? acc : acc.concat(curr), []);

const pack = arr => arr.slice(1).reduce((acc, curr) => last(last(acc)) == curr ? acc.slice(0, acc.length - 1).concat([last(acc).concat(curr)]) : acc.concat([[curr]]), [[arr[0]]]);

const encode = arr => arr.reduce((acc, curr) => Array.isArray(last(acc)) && last(acc)[1] == curr ? acc.slice(0, acc.length - 1).concat([[last(acc)[0] + 1, curr]]) : acc.concat([[1, curr]]), []);

// 11 - 20

const encodeModified = arr => arr.reduce((acc, curr, i) => Array.isArray(last(acc)) && last(acc)[1] == curr ? acc.slice(0, acc.length - 1).concat([[last(acc)[0] + 1, curr]]) : arr[i + 1] == curr ? acc.concat([[1, curr]]) : acc.concat(curr), []);

const decodeModified = arr => arr.reduce((acc, curr) => Array.isArray(curr) ? acc.concat(Array(curr[0]).fill(curr[1])) : acc.concat(curr), []);

