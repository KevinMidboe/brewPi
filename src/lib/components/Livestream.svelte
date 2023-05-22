<div class="livestream-container">
  <img src="https://i.imgur.com/T4fCMI5.png" alt="livestream" />

  <div class="pulse"></div>
</div>

<style lang="scss" module="scoped">
.livestream-container {
  position: relative;
  border-radius: 1rem;
  border: 0.5rem solid var(--background);
  transition: border-color var(--color-transition-duration) ease-in-out;
  display: inline-block;
  height: fit-content;

  img {
    border-radius: 0.5rem;
    width: 100%;
    max-width: 860px;
  }

  .pulse {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    border-radius: 50%;
    background-color: rgba(255, 82, 82, 1);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    height: 1.7rem;
    width: 1.7rem;
    transform: scale(1);
    animation: pulse-red 2s infinite;

    @keyframes pulse-red {
      0% {
        transform: scale(0.9);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
      }
      
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 12px rgba(255, 82, 82, 0);
      }
      
      100% {
        transform: scale(0.9);
        box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
      }
    }
  }
}
</style>