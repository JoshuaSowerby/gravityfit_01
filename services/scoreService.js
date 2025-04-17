/**
 * Calculates GravityFit score based on stretch performance
 * @param {Object} motion - Includes left, right, middle, leftStretch, rightStretch
 * @returns {Number} scoreIncrement
 */
exports.calculateGravityFitScore = (motion) => {
  const { left, right, middle, leftStretch, rightStretch } = motion;

  // Only count reps if middle === 1 (simulated rep detection)
  if (middle !== 1) return 0;

  const leftRatio = left / (leftStretch || 600);
  const rightRatio = right / (rightStretch || 600);

  const averageStretch = (leftRatio + rightRatio) / 2;

  // Scoring logic based on percentage of stretch
  if (leftRatio >= 0.9 && rightRatio >= 0.9) return 3;
  if (averageStretch >= 0.7) return 2;
  if (averageStretch >= 0.5) return 1;

  return 0;
};
