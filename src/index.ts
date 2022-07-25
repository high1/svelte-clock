import 'uno.css';
import Clock from 'Clock.svelte';

const App = new Clock({
  target: document.querySelector('#root'),
});

export default App;
