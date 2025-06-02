import 'index.css';
import { mount } from 'svelte';
import ClockFace from 'ClockFace.svelte';

export default mount(ClockFace, { target: document.body });
