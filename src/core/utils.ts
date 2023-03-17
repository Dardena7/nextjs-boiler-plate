export const getStylesCSSClasses = (
  classNames: string[], 
  styles: { readonly [key: string]: string; }
) => {
  const formattedClassNames = classNames.map((style: string) => styles[style])
  return formattedClassNames.join(" ");
};