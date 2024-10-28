import 'index.css';
import { mount } from 'svelte';
import ClockFace from 'ClockFace.svelte';

const target = document.querySelector('#root');
if (!target) throw new Error('#root element not found');

export default mount(ClockFace, { target });
