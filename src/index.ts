import 'uno.css';
import ClockFace from 'ClockFace.svelte';

const target = document.querySelector('#root');
if (!target) throw new Error('#root element not found');

export default new ClockFace({ target });
