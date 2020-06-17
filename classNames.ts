export type Pattern = null | undefined | string | [boolean, string, string?];

export default function classes(...classesToMerge: Pattern[]) {
  const passedClasses = [];
  for (let i = 0; i < classesToMerge.length; i++) {
    const chunk = classesToMerge[i];
    if (Array.isArray(chunk)) {
      const [condition, className, fallbackClassName] = chunk;
      if (condition && className && typeof className === 'string') {
        const clean = className.trim();
        if (clean) passedClasses.push(clean);
      } else if (!condition && fallbackClassName && typeof fallbackClassName === 'string') {
        const clean = fallbackClassName.trim();
        if (clean) passedClasses.push(clean);
      }
    } else if (typeof chunk === 'string' && chunk) {
      const clean = chunk.trim();
      if (clean) passedClasses.push(clean);
    }
  }
  return passedClasses.join(' ');
}
