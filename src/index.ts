import { mount } from 'svelte';

import '@/index.css';
import ClockFace from '@/ClockFace.svelte';

export default mount(ClockFace, { target: document.body });
