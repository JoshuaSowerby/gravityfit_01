// sensorFeedbackService.js

/**
 * Evaluates sensor motion data and returns form feedback + score
 * 
 * @param {Object} motion - { left, right, middle, leftStretch, rightStretch }
 * @param {String} exerciseId - e.g., 'Push-Up', 'Arm Stretch'
 * @returns {Object} { isCorrect, feedbackMessage, score }
 */
exports.analyzeMotion = (motion, exerciseId) => {
  const { left, right, middle, leftStretch, rightStretch } = motion;
  let feedback = [];
  let score = 0;
  let isCorrect = true;

  // ✅ Threshold rules per exercise type
  const thresholds = {
    'Push-Up': {
      left: 0.8,
      right: 0.8,
      middle: 0.9
    },
    'Arm Stretch': {
      leftStretch: 0.75,
      rightStretch: 0.75
    },
    'Jump Squat': {
      middle: 0.6
    },
    // Add more exercises as needed...
  };

  const rules = thresholds[exerciseId] || {};

  // 🔍 Left arm check
  if ('left' in rules && left < rules.left) {
    feedback.push('Bend your left elbow more');
    isCorrect = false;
  } else if ('left' in rules) {
    score++;
  }

  // 🔍 Right arm check
  if ('right' in rules && right < rules.right) {
    feedback.push('Bend your right elbow more');
    isCorrect = false;
  } else if ('right' in rules) {
    score++;
  }

  // 🔍 Middle body alignment
  if ('middle' in rules && middle < rules.middle) {
    feedback.push('Lower yourself more');
    isCorrect = false;
  } else if ('middle' in rules) {
    score++;
  }

  // 🔍 Left stretch range
  if ('leftStretch' in rules && leftStretch < rules.leftStretch) {
    feedback.push('Stretch your left arm further');
    isCorrect = false;
  } else if ('leftStretch' in rules) {
    score++;
  }

  // 🔍 Right stretch range
  if ('rightStretch' in rules && rightStretch < rules.rightStretch) {
    feedback.push('Stretch your right arm further');
    isCorrect = false;
  } else if ('rightStretch' in rules) {
    score++;
  }

  // ✅ Output
  return {
    isCorrect,
    feedbackMessage: isCorrect
      ? 'Good rep! Form looks solid.'
      : feedback.join(', '),
    score
  };
};
