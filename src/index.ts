import 'uno.css';
import ClockFace from 'ClockFace.svelte';

const App = new ClockFace({
  target: document.querySelector('#root'),
});

export default App;
