export const languageMap = {
  German: 'de',
  Spanish: 'es',
  French: 'fr',
  Dutch: 'nl',
  English: 'en',
  Italian: 'it',
  Chinese: 'zh-CN'
}

/**
 * Computes the proportion between two numbers
 * @param {number} a the total amount of reading time
 * @param {number} b the total amount of exercises time
 */
export function getProportion(a, b) {
  if (!(a === 0 && b === 0)) {
    return (100 * a) / (b + a)
  } else if (a === 0 && b === 0) {
    return 0
  } else if (a === 0) {
    return 0
  } else {
    return 100
  }
}

/**
 * Add normalized time to a student
 * @param {Student} student the student that should have
 * @param {number} maxActivity the max activity compared with the other students
 */
export function addTotalAndNormalizedTime(student, maxActivity) {
  if (maxActivity > 0) {
    return {
      ...student,
      normalized_activity_proportion: (student.total_time / maxActivity) * 100
    }
  } else {
    return student
  }
}
