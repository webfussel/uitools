<template>
  <header class="Header full-width">
    <div class="max-width">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
      <nav>
        <ul>
          <li v-for="nav in navElements" :key="nav.name">
            <span v-if="nav.wip" class="badge">WIP</span>
            <NuxtLink :to="nav.to" active-class="active">
              <Icon :name="nav.icon"/>
              <span>{{ nav.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
type NavElement = {
  name: string
  to: string
  icon: string
  wip: boolean
}

const navElements: NavElement[] = [
  {
    name: 'Colors',
    to: '/colors',
    icon: 'solar:pallete-2-broken',
    wip: false,
  },
  {
    name: 'Fonts',
    to: '/sizing',
    icon: 'solar:text-cross-broken',
    wip: true,
  },
  {
    name: 'Spacing',
    to: '/spacing',
    icon: 'solar:align-horizonta-spacing-broken',
    wip: true,
  },
]
</script>

<style scoped>
.Header {
  --padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 20000;
  backdrop-filter: blur(10px);
  border-bottom: var(--hero-line);
  padding: var(--padding) 0;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  & nav {
    font-size: 1rem;
    line-height: 1.5;

    & ul {
      display: flex;
      list-style: none;
      gap: 6rem;
      height: 100%;

      & li {
        position: relative;
        display: flex;

        & a {
          display: flex;
          align-items: center;
          gap: .5rem;
          color: inherit;
          font-weight: bold;

          &.active {
            color: var(--color-main);
          }
        }
      }
    }
  }

  & .toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
