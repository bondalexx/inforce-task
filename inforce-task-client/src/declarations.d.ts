declare module '*.png' {
    const value: string;
    export default value;
  }

  declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }