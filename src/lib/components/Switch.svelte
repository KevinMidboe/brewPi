<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let checked = false;

  function handleChange() {
    dispatch('change', { checked });
  }
</script>

<div class="switch-wrapper">
  <div class="switch-button-container">
    <input class="switch-checkbox" type="checkbox" bind:checked="{checked}" on:change="{handleChange}" >
    <div class="switch-button">    
      <div class="switch-button-top">
        <svg class="switch-icon on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
          <path d="M19 3h6v38h-6z"/>
        </svg>
        <svg class="switch-icon off" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22ZM5.5 22C5.5 31.1127 12.8873 38.5 22 38.5C31.1127 38.5 38.5 31.1127 38.5 22C38.5 12.8873 31.1127 5.5 22 5.5C12.8873 5.5 5.5 12.8873 5.5 22Z"/>
        </svg>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .switch-wrapper {
    border-radius: 3px;
    padding: 10px;
    width: 100px;
    height: 125px;
    background-image: linear-gradient(to bottom, #414049, #30282c);
    box-shadow:
      0 0 1px #050506,
      inset 0 0 0 2px #050506,
      inset 0 3px 1px #66646c;
  }

  .switch-button-container {
    position: relative;
    border-radius: 3px;
    padding: 3px 2px;
    width: 100%;
    height: 100%;
    background-color: #000;
    box-shadow: 0 0 1px #000;
  }

  .switch-checkbox {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .switch-button {
    position: relative;
    z-index: 0;
    border-radius: 5px 5px 2px 2px / 16px 16px 2px 2px;
    width: 100%;
    height: 100%;
    background-color: #7f070d;
    background-image: 
      linear-gradient(to bottom, rgba(#770505, .6) 40%, rgba(#ff8d93, .6) 60% 75%, rgba(#fff, .9) 90%),
      linear-gradient(to bottom, rgba(#710206, .6), rgba(#d12127, .6))
      ;
    background-size: 100% calc(15% + 1px), 100% 0%;
    background-position: top, bottom;
    background-repeat: no-repeat;
    box-shadow:
      inset 0 -3px 2px rgba(#000, .4),
      inset 0 3px 1px rgba(#000, .8),
      inset 1px 0 0 rgba(#691016, .8),
      inset -1px 0 0 rgba(#691016, .8),
      inset 1px 0 0 rgba(#d6585f, .8),
      inset -1px 0 0 rgba(#d6585f, .8);
    transition: border-radius .4s, background-size .4s;
    overflow: hidden;
    
    .switch-checkbox:checked + & {
      border-radius: 2px 2px 5px 5px / 2px 2px 16px 16px;
      background-size: 100% 0, 100% 15%;
    }
  }

  .switch-button-top {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 15%;
    width: 100%;
    height: 85%;
    background-color: rgba(#770505, .8);
    background-image: radial-gradient(rgba(#900006, .8) 1px, transparent 0);
    background-size: 3px 3px;
    background-position: 50%;
    box-shadow:
      inset 1px 0 0 rgba(#691016, .8),
      inset -1px 0 0 rgba(#691016, .8),
      inset 1px 0 0 rgba(#d6585f, .8),
      inset -1px 0 0 rgba(#d6585f, .8),
      inset 0 -1px 0 rgba(#fff, .2),
      inset 0 1px 0 rgba(#fff, .9);
    transition: all .4s;
    
    .switch-checkbox:checked + .switch-button > & {
      top: 0;
      background-color: rgba(#e30320, .2);
    }
    
    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      background-image: radial-gradient(closest-side at 50% 50%, #ffaf0f 0% 10%, #fc071e 30%, #4b0100);
      opacity: 0;
      
      .switch-checkbox:checked + .switch-button > & {
	opacity: 1;
	animation: flick .2s infinite;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      background-color: rgba(#fdd8d8, .14);
      filter: blur(4px);
      transition: transform .4s, background-color .4s;
      
      .switch-checkbox:checked + .switch-button > & {
	background-color: rgba(#fdd8d8, .2);
	transform: translateY(-100%);
      }
    }
  }

  .switch-icon {
    width: 22px;
    height: 22px;
    fill: #aa9094;
    transition: fill .4s;
    
    .switch-checkbox:checked + .switch-button > .switch-button-top > & {
      fill: #f3d5df;
    }
  }

  @keyframes flick {
    0% {
      opacity: 1;
    }
    80% {
      opacity: .8;
    }
    100% {
      opacity: 1;
    }
  }
</style>
