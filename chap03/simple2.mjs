//simpe ES6 module

let count = 0;
export function next() { return ++count; }
function squared() {return Math.pow(count, 2);}
export function hello() {
    return "Hello, world!";
}
export default function() {return count;}
export const meaning = 43;
export let nocount = -1;
export {squared};