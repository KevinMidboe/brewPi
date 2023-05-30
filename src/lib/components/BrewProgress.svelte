<script lang="ts">
  interface IStep {
    icon: string;
    name: string;
    date: string;
    state: string;
  }

  interface IBrew {
    name: string;
    by: string;
  }

  const brew: IBrew = {
    name: 'Kveldsbris',
    by: 'Kinn Bryggeri'
  };

  const steps: Array<IStep> = [
    {
      icon: 'M9.94 8.007l3.983 3.983 1.06 1.06 1.06-1.06 6.93-6.93-2.12-2.12-6.93 6.93h2.12l-3.982-3.984-2.12 2.12z',
      name: 'Brew',
      date: 'March 19',
      state: 'completed'
    },
    {
      icon: 'M19.803 5h1.572c.226 0 .443.244.603.404l1.772 1.85c.16.16.25.453.25.68v2.832c0 .015 0 .234-1 .234-.415-.854-1.116-1.287-2.124-1.287-.426 0-1.05.173-1.403.356-.14.072-.473.086-.473-.07V5.803c0-.442.36-.803.803-.803zM9.263 3h7.83c.5 0 .907.406.907.906v6.188c0 .5-.406.906-.906.906h-2.138c-.115 0-.214.206-.26.1-.397-.9-1.297-1.387-2.338-1.387-1.04 0-1.94.418-2.338 1.32-.046.104-.145-.033-.26-.033H8.672c-.37 0-.672-.3-.672-.672V4.265C8 3.57 8.57 3 9.264 3zm11.676 7.978c.828 0 1.5.67 1.5 1.5 0 .828-.672 1.5-1.5 1.5-.83 0-1.5-.672-1.5-1.5 0-.83.67-1.5 1.5-1.5zm-8.582-.07c.828 0 1.5.67 1.5 1.5 0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5c0-.83.672-1.5 1.5-1.5z',
      name: 'Ferment',
      date: 'March 23',
      state: 'completed'
    },
    {
      icon: 'M23.45 10.99c-.162-.307-.54-.42-.84-.257l-4.582 2.45-6.557-11.93H8.62c-.347 0-.62.283-.62.628 0 .346.273.628.62.628h2.118l4.825 8.783c-.037-.006-.074-.006-.112-.006-1.37 0-2.482 1.123-2.482 2.508s1.11 2.508 2.483 2.508c1.038 0 1.92-.64 2.293-1.543l5.445-2.92c.304-.164.422-.54.26-.847zm-8 3.874c-.59 0-1.06-.476-1.06-1.072 0-.596.47-1.072 1.06-1.072.59 0 1.063.476 1.063 1.072 0 .596-.472 1.072-1.062 1.072zm8.994-6.698l-5.848 3.288-2.718-4.93 5.847-3.287 2.72 4.93zm-4.288-5.482l-4.882 2.744-1.48-2.683L18.675 0l1.48 2.684z',
      name: 'Bottle',
      date: 'April 1',
      state: 'in-progress'
    },
    {
      icon: 'M15.623 5.014l-4.29 3.577c-.196.168-.327.362-.327.62v6.206c0 .322.335.584.656.584h2.004c.32 0 .584-.262.584-.584l-.033-3.115c0-.16.13-.29.29-.29h2.918c.16 0 .292.13.292.29l.033 3.116c0 .322.263.584.584.584h2.09c.322 0 .585-.262.585-.584V9.48c0-.257-.172-.626-.37-.792l-4.263-3.674c-.218-.184-.536-.184-.754 0zm7.17 2.374l-5.967-5.046C16.606 2.122 16.312 2 16 2c-.312 0-.606.123-.79.31L9.207 7.388c-.245.208-.276.576-.068.822.115.136.28.206.446.206.133 0 .266-.044.376-.137l5.69-4.847c.208-.155.49-.157.697-.002 1.286.962 5.693 4.85 5.693 4.85.246.206.614.177.822-.07.208-.246.177-.614-.068-.822z',
      name: 'Carbonate',
      date: 'April 14',
      state: ''
    }
  ];
</script>

<div class="card">
  <h1>Brew progress</h1>

  <ol class="os-timeline">
    {#each steps as step}
      <li class="os-timeline-step {step.state}">
        <svg
          width="32"
          height="17"
          xmlns="http://www.w3.org/2000/svg"
          class="os-timeline-step__icon"
          aria-hidden="true"
          focusable="false"
        >
          <path d="{step.icon}"></path>
        </svg>

        <span class="visually-hidden">Past step: </span>
        <span class="os-timeline-step__title">{step.name}</span>
        <span class="os-timeline-step__date">{step.date}</span>
      </li>
    {/each}
  </ol>

  <div class="description">
    <h2>{brew.name} <span class="company">av {brew.by}</span></h2>
  </div>
</div>

<style lang="scss">
  .description {
    margin-top: 1em;
    border-top: 1px solid #d9d9d9;

    .company {
      font-size: 1.25rem;
      opacity: 0.8;
      display: inline-block;
    }
  }

  ol {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin-left: 0;
    padding: 1rem 0;
    padding-left: 0;
    overflow: hidden;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      max-width: 25%;
      position: relative;
      padding-top: 20px;

      &.completed::before {
        background: var(--green) !important;
        z-index: 3;
      }

      &.in-progress:before {
        z-index: 2;
        background: repeating-linear-gradient(
          45deg,
          #e6e6e6,
          #e6e6e6 5%,
          var(--green) 5%,
          var(--green) 10%
        );

        background-size: 150px 150px;
        animation: move-it 12s linear infinite;
      }

      @keyframes move-it {
        0% {
          background-position: initial;
        }
        100% {
          background-position: 150px 0px;
        }
      }

      &::before {
        background: #e6e6e6;
        z-index: 1;
        width: 2000px;
        content: '';
        display: block;
        height: 4px;
        position: absolute;
        top: 8.5px;
        right: 50%;
      }

      &:first-of-type {
        &::after {
          background: #fff;
          left: 0;
          z-index: 4;
          content: '';
          display: block;
          height: 4px;
          position: absolute;
          top: 8.5px;
          right: 50%;
        }
      }

      &.completed svg {
        fill: var(--green);
      }

      svg {
        background: #fff;
        position: absolute;
        top: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        z-index: 5;
        fill: #737373;
      }

      .visually-hidden {
        border: 0;
        clip: rect(0, 0, 0, 0);
        clip: rect(0 0 0 0);
        width: 2px;
        height: 2px;
        margin: -2px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
      }

      .os-timeline-step__title {
        color: var(-green);
        font-weight: 500;
      }

      .os-timeline-step__date {
        display: block;
        font-size: 0.85em;
        color: #737373;
      }
    }
  }
</style>
