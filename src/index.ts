import { mount } from 'svelte';

import '#src/index.css';
import ClockFace from '#src/ClockFace.svelte';

export default mount(ClockFace, { target: document.body });
