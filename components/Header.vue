<template>
  <header class="Header content-paddings">
    <h1>
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </h1>
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
  </header>
</template>

<script lang="ts" setup>
import type { Color } from '~/types/Colors'

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
  --padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  position: sticky;
  top: 0;
  z-index: 20000;
  backdrop-filter: blur(10px);

  & h1 {
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: default;
    user-select: none;

    & img {
      height: 40px;
    }
  }

  & nav {
    padding: 0 var(--padding);
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
          border-bottom: 4px solid transparent;
          color: inherit;

          &.active {
            color: var(--color-main);
            border-bottom-color: var(--color-main);
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
