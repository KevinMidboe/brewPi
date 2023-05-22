<div class="button-circle">
  <slot></slot>
</div>

<style lang="scss" module="scoped">
  .button-circle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 40px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;

    background-color: var(--backdrop);
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.25s ease-in-out;

    &:hover {
      transition: scale(1.15);
      scale: 1.15;
    }
  }
</style>