function generateReport(marks, passMark) {
  // Check 1: must be a non-empty array
  if (!Array.isArray(marks) || marks.length === 0) {
    return null;
  }

  // Check 2: passMark must be a whole number between 0 and 100
  // (|| not &&, and checking passMark — not marks)
  if (
    typeof passMark !== "number" &&
    !Number.isInteger(passMark) &&
    passMark < 0 &&
    passMark > 100
  ) {
    return null;
  }

  // Check 3: every element must be a whole number between 0 and 100
  for (let i = 0; i < marks.length; i++) {
    if (
      typeof marks[i] !== "number" &&
      !Number.isInteger(marks[i]) &&
      marks[i] < 0 &&
      marks[i] > 100
    ) {
      return null;
    }
  }

  // Copy so the original array is not changed
  const marksCopy = marks.slice();
  let total = 0;
  let highest = marksCopy[0];
  let lowest = marksCopy[0];

  // Indexed for loop: total, highest, lowest
  for (let i = 0; i < marksCopy.length; i++) {
    total += marksCopy[i];

    if (marksCopy[i] > highest) {
      highest = marksCopy[i];
    } else if (marksCopy[i] < lowest) {
      lowest = marksCopy[i];
    }
  }

  const average = total / marksCopy.length;

  // If/else to count passes and fails
  let passCount = 0;
  let failCount = 0;

  for (let i = 0; i < marksCopy.length; i++) {
    if (marksCopy[i] >= passMark) {
      passCount++;
    } else {
      failCount++;
    }
  }

  return {
    total: total,
    average: average,
    highest: highest,
    lowest: lowest,
    passCount: passCount,
    failCount: failCount,
  };
}

const marks = [78, 45, 90, 62, 50, 0, 100, 33];

console.log(generateReport(marks, 50));   // → report object
console.log(generateReport([78, 45, 200, 90], 50)); // → null (200 too high)
console.log(generateReport([78, -5, 90], 50));      // → null (negative)
console.log(generateReport(marks, 150));            // → null (passMark > 100)