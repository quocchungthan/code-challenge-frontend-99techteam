/**
 * prerequisites: Nodejs globally installed on the machine.
 * To run the code, use the following command at problem4/:
 * 
 * node math.utils.js
 * 
 * Or copy this code and paste it into the Console/Snippets in the browser
 */

// Complexity of the approach: O(1)
const sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

// Complexity of the approach: O(n)
// Take extra memory to store the array
const sum_to_n_b = function (n) {
  return Array.from({ length: n + 1 })
    .reduce((acc, val, index) => acc + index, 0);
};

// Complexity of the approach: O(1)
// Bitwise operation, no extra memory
const sum_to_n_c = function (n) {
  return (n * (n + 1)) >> 1;
};

const n = 10;
console.log(`With N = ${n}, these are the sums to N`);
console.log("Approach A: ", sum_to_n_a(n));
console.log("Approach B: ", sum_to_n_b(n));
console.log("Approach C: ", sum_to_n_c(n));