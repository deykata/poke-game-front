export interface Theme {
    name: string;
    properties: any;
}

export const light: Theme = {
    name: "light",
    properties: {
        "--background-light": "#ffffff",
        "--primary-yellow": "#FFCB02",
        "--primary-blue": "#3D5AA6",
        "--text": "#000000"
    }
};

export const dark: Theme = {
    name: "dark",
    properties: {
        "--background-light": "#1a1d2b",
        "--primary-yellow": "#FFCB02",
        "--primary-blue": "#3D5AA6",
        "--text": "#ffffff"
    }
};