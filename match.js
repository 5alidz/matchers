/**
 * @function
 * @template {(string|number|boolean)} T
 * @param {T} valueToMatch
 * @returns {function(...[T|'_', () => any]): any}
 */
function matches(valueToMatch) {
  return function(...allPossibleCases) {
    // get the default case.
    const defaultCase = allPossibleCases[allPossibleCases.length - 1];
    let defaultCaseValue = null;
    if (Array.isArray(defaultCase) && typeof defaultCase[1] === 'function' && defaultCase[0] === '_') {
      defaultCaseValue = defaultCase[1];
    } else {
      const defaultCaseError = new Error();
      defaultCaseError.name = 'Case Matching Error';
      defaultCaseError.message =
        'Default case not provided, matches(...args) expects the last argument to be a default case handler';
      throw defaultCaseError;
    }
    // find a match in the args.
    let resultValue = null;
    for (let i = 0; i < allPossibleCases.length - 1; i++) {
      const [caseKey, caseValue] = allPossibleCases[i];
      if (Object.is(caseKey, valueToMatch)) {
        resultValue = caseValue;
        break;
      }
    }
    // handle return types e.g. if it's a function execute it
    if (typeof resultValue === 'function') {
      return resultValue();
    } else {
      return defaultCaseValue();
    }
  };
}

module.exports = matches;
