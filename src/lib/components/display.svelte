<script lang="ts">
export const title: string = "Temperature"

let temp = 23
</script>

<div>
  <header>{ title }</header>

  <div class="body">
    <p>Inside temperature: {23}℃</p>
  </div>
</div>

<style lang="scss" module="scoped">
.body {
  display: flex;
  flex-direction: column;
}
</style>