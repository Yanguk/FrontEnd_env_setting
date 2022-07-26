import test from './1app'

function aest() {
  return `
    <div>
      하이룽 테스트 입다다
    </div>
  `
}

// const a: number = '근데 텍스트가 들어가버렸넹?';
// const b:string = 123;

console.log(test);
console.log(process.env.NODE_ENV);
console.log(aest());