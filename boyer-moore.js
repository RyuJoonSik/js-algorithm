function buildBadMatchTable(str) {
  let tableObj = {};
  let strLength = str.length;

  for (let i = 0; i < strLength - 1; i++) {
    tableObj[str[i]] = strLength - 1 - i;
  }

  if (!tableObj[str[strLength - 1]]) {
    tableObj[str[strLength - 1]] = strLength;
  }

  return tableObj;
}

function boyerMoore(str, pattern) {
  let badMatchTable = buildBadMatchTable(pattern);
  let offset = 0;
  let patternLastIndex = pattern.length - 1;
  let scanIndex = patternLastIndex;
  let maxOffset = str.length - pattern.length;

  while (offset <= maxOffset) {
    scanIndex = 0;

    while (pattern[scanIndex] === str[scanIndex + offset]) {
      if (scanIndex === patternLastIndex) {
        return offset;
      }

      scanIndex++;
    }

    let badMatchString = str[offset + patternLastIndex];

    if (badMatchTable[badMatchString]) {
      offset += badMatchTable[badMatchString];
    } else {
      offset += 1;
    }
  }

  return -1;
}
console.log(buildBadMatchTable("jam"));
console.log(boyerMoore("jellyjam", "jam"));
console.log(boyerMoore("jellyjam", "jelly"));
console.log(boyerMoore("jellyjam", "sam"));
